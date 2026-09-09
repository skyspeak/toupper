/* POST /api/lead — capture an interested party.
 *
 * Same-origin by design: the page fetches this endpoint, so the CSP never has
 * to name a third-party host. No dependencies, no database.
 *
 * Leads are written to a private Vercel Blob store, which is the system of
 * record. BLOB_READ_WRITE_TOKEN is injected automatically by the linked store.
 * Read them back with `node tools/leads.js`.
 *
 * Optional notification on top of the store:
 *   LEAD_WEBHOOK_URL   any endpoint accepting a JSON POST — Slack incoming
 *                      webhook, Zapier catch hook, your CRM, an internal API
 *   LEAD_WEBHOOK_AUTH  optional, sent as the Authorization header
 *
 * A webhook failure never fails the request. With no store configured the
 * endpoint falls back to demo mode and says so plainly.
 */

'use strict';

var MAX_BODY = 8 * 1024;
var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Best-effort throttle. Serverless instances are ephemeral and there may be
   several, so this stops casual hammering, not a determined actor. Kept on
   globalThis so it survives module re-evaluation. */
globalThis.__toupperLeadSeen = globalThis.__toupperLeadSeen || new Map();
var seen = globalThis.__toupperLeadSeen;
var WINDOW_MS = 60 * 1000;
var MAX_PER_WINDOW = 5;

function throttled(key) {
  var now = Date.now();
  var hits = (seen.get(key) || []).filter(function (t) { return now - t < WINDOW_MS; });
  hits.push(now);
  seen.set(key, hits);
  if (seen.size > 5000) seen.clear();
  return hits.length > MAX_PER_WINDOW;
}

function clean(v, max) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function readBody(req) {
  return new Promise(function (resolve, reject) {
    if (req.body) return resolve(req.body);          // Vercel pre-parses JSON
    var raw = '', over = false;
    req.on('data', function (c) {
      if (over) return;                      // drain, but stop accumulating
      raw += c;
      if (raw.length > MAX_BODY) { over = true; raw = ''; }
    });
    req.on('end', function () {
      if (over) return reject(new Error('too_large'));
      try { resolve(raw ? JSON.parse(raw) : {}); } catch (e) { reject(new Error('bad_json')); }
    });
    req.on('error', reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  var body;
  try {
    body = await readBody(req);
  } catch (e) {
    var tooBig = String(e && e.message) === 'too_large';
    return res.status(tooBig ? 413 : 400).json({ ok: false, error: tooBig ? 'too_large' : 'bad_request' });
  }

  /* Bots fill every field they can see, and they fill them instantly. */
  if (clean(body.company_website, 200)) {
    return res.status(200).json({ ok: true, stored: false, note: 'discarded' });
  }
  var elapsed = Number(body.elapsed_ms) || 0;
  if (elapsed > 0 && elapsed < 1200) {
    return res.status(200).json({ ok: true, stored: false, note: 'discarded' });
  }

  var email = clean(body.email, 254).toLowerCase();
  if (!EMAIL.test(email)) {
    return res.status(422).json({ ok: false, error: 'invalid_email' });
  }

  var ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'local';
  if (throttled(ip)) {
    return res.status(429).json({ ok: false, error: 'rate_limited' });
  }

  var lead = {
    kind: clean(body.kind, 24) || 'brief',           // 'brief' | 'shortlist'
    email: email,
    name: clean(body.name, 120),
    situation: clean(body.situation, 4000),
    areas: Array.isArray(body.areas) ? body.areas.slice(0, 24).map(function (a) { return clean(a, 60); }) : [],
    agents: Array.isArray(body.agents) ? body.agents.slice(0, 12).map(function (a) { return clean(a, 60); }) : [],
    variant: clean(body.variant, 24),
    page: clean(body.page, 200),
    at: new Date().toISOString()
  };

  /* The store is the record. A webhook, if configured, is a notification
     on top of it and is never allowed to fail the request. */
  var saved = { ok: false, reason: 'unknown' };
  try {
    saved = await persist(lead);
  } catch (err) {
    saved = { ok: false, reason: String(err && err.message).slice(0, 80) };
  }

  if (saved.ok) {
    console.log('[lead:stored]', lead.kind, lead.email, saved.pathname);
  } else {
    /* Log the whole record so a storage outage never loses a lead. */
    console.error('[lead:unstored]', saved.reason, JSON.stringify(lead));
  }

  var hook = process.env.LEAD_WEBHOOK_URL;
  if (hook) {
    try {
      var headers = { 'Content-Type': 'application/json' };
      if (process.env.LEAD_WEBHOOK_AUTH) headers.Authorization = process.env.LEAD_WEBHOOK_AUTH;
      var out = await fetch(hook, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ text: summarise(lead), lead: lead }),
        signal: AbortSignal.timeout(6000)
      });
      if (!out.ok) throw new Error('webhook ' + out.status);
    } catch (err) {
      console.error('[lead:webhook-failed]', String(err && err.message));
    }
  }

  if (saved.ok) return res.status(200).json({ ok: true, stored: true });
  if (saved.reason === 'no_store') return res.status(200).json({ ok: true, stored: false, demo: true });
  return res.status(200).json({ ok: true, stored: false, deferred: true });
};

/* ------------------------------------------------------------------ *
 * Storage. Vercel Blob, spoken to over its REST API with plain fetch,
 * so the deploy stays dependency-free. The store is private: objects
 * return 403 to anonymous requests and are only readable with the
 * read-write token, which matters because these records hold emails.
 * ------------------------------------------------------------------ */

var BLOB_API = 'https://blob.vercel-storage.com';

function leadKey(at) {
  var stamp = at.replace(/[:.]/g, '-');
  var rand = Math.random().toString(36).slice(2, 8);
  return 'leads/' + stamp + '-' + rand + '.json';
}

async function persist(lead) {
  var token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return { ok: false, reason: 'no_store' };

  var res = await fetch(BLOB_API + '/' + leadKey(lead.at), {
    method: 'PUT',
    headers: {
      authorization: 'Bearer ' + token,
      'x-api-version': '7',
      'x-content-type': 'application/json',
      'x-vercel-blob-access': 'private',
      'x-add-random-suffix': '0'
    },
    body: JSON.stringify(lead),
    signal: AbortSignal.timeout(6000)
  });

  if (!res.ok) {
    var detail = await res.text().catch(function () { return ''; });
    return { ok: false, reason: 'http_' + res.status, detail: detail.slice(0, 200) };
  }
  var body = await res.json();
  return { ok: true, pathname: body.pathname };
}

/* A one-line summary so Slack-style webhooks are readable without unpacking. */
function summarise(lead) {
  var bits = ['New ' + lead.kind + ' — ' + lead.email];
  if (lead.name) bits.push('(' + lead.name + ')');
  if (lead.areas.length) bits.push('· areas: ' + lead.areas.join(', '));
  if (lead.agents.length) bits.push('· agents: ' + lead.agents.join(', '));
  if (lead.situation) bits.push('\n' + lead.situation);
  return bits.join(' ');
}

module.exports.summarise = summarise;
