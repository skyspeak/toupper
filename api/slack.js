/* POST /api/slack — the /toupper slash command.
 *
 *   /toupper scim            posts the answer in the channel, for everyone
 *   /toupper help            usage, visible only to you
 *
 * The answer lands in the channel on purpose: everyone who reads it sees the
 * guide, which is the point of putting it in Slack.
 *
 * Every request must carry Slack's signature. Set SLACK_SIGNING_SECRET (from
 * the Slack app's Basic Information page) in the Vercel project, or the
 * endpoint refuses to answer. Setup steps: growth/03-slack-command.md.
 */
'use strict';

var crypto = require('crypto');
var fs = require('fs');
var path = require('path');
var vm = require('vm');
var GLOSSARY = require('../data/glossary.js');
var MATCH = require('../assets/js/ask-match.js');

var ORIGIN = 'https://toupper.vercel.app';
var ORDER = ['Product', 'Engineering', 'Security', 'Sales', 'Finance', 'Legal', 'Support'];
var IDX = MATCH.index(GLOSSARY);
var STARTERS = ['SCIM', 'SSO', 'SOC 2', 'RAG', 'Evals', 'usage-based billing'];

/* agents.js and domains.js are written for the browser; read them in a sandbox. */
function browserData(file, key) {
  var sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', 'data', file), 'utf8'), sandbox);
  return sandbox.window[key] || [];
}
var AGENTS = browserData('agents.js', 'TOUPPER_AGENTS');

function range(a) { return a[0] === a[1] ? String(a[0]) : a[0] + '–' + a[1]; }
function names(opts) {
  var n = opts.map(function (o) { return o.name; });
  return n.length > 1 ? n.slice(0, -1).join(', ') + ' or ' + n[n.length - 1] : n[0];
}
function firstSentences(text, max) {
  var out = '', parts = text.split(/(?<=\.)\s+/);
  for (var i = 0; i < parts.length && (out + parts[i]).length <= max; i++) out += (out ? ' ' : '') + parts[i];
  return out || text.slice(0, max);
}
/* Slack mrkdwn treats these three characters as control characters. */
function mrk(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function readRaw(req) {
  return new Promise(function (resolve, reject) {
    var chunks = [], size = 0;
    req.on('data', function (c) { size += c.length; if (size > 16 * 1024) { reject(new Error('too_large')); return; } chunks.push(c); });
    req.on('end', function () { resolve(Buffer.concat(chunks).toString('utf8')); });
    req.on('error', reject);
  });
}

function verified(req, raw, secret) {
  var ts = req.headers['x-slack-request-timestamp'];
  var sig = req.headers['x-slack-signature'];
  if (!ts || !sig) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 60 * 5) return false;          /* replay window */
  var mine = 'v0=' + crypto.createHmac('sha256', secret).update('v0:' + ts + ':' + raw).digest('hex');
  var a = Buffer.from(mine), b = Buffer.from(String(sig));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function answerBlocks(t) {
  var agent = AGENTS.filter(function (a) { return a.areas.indexOf(t.areas[0]) > -1; })[0];
  var link = ORIGIN + '/what/' + t.id + '?utm_source=slack&utm_medium=slash_command&utm_campaign=toupper_command';
  var qs = [];
  ORDER.forEach(function (w) { t.questions.forEach(function (q) { if (q.who === w) qs.push(q); }); });

  var fields = [{ type: 'mrkdwn', text: '*Build in-house*\n' + range(t.build.weeks) + ' engineer-weeks' }];
  if (t.buy) fields.push({ type: 'mrkdwn', text: '*Buy and integrate*\n' + range(t.buy.weeks) + ' weeks with ' + mrk(names(t.buy.options)) });

  var blocks = [
    { type: 'section', text: { type: 'mrkdwn', text: '*' + mrk(t.name) + '*  ·  ' + mrk(t.aka) } },
    { type: 'section', text: { type: 'mrkdwn', text: mrk(firstSentences(t.what, 420)) } },
    { type: 'section', fields: fields }
  ];
  if (t.calendar) blocks.push({ type: 'context', elements: [{ type: 'mrkdwn', text: mrk(t.calendar) }] });
  blocks.push({ type: 'section', text: { type: 'mrkdwn', text: '*Decide first*\n' +
    qs.slice(0, 3).map(function (q) { return '• _' + q.who + ':_ ' + mrk(q.q); }).join('\n') } });
  blocks.push({ type: 'actions', elements: [{ type: 'button', text: { type: 'plain_text', text: 'All ' + t.questions.length + ' questions and the estimate' }, url: link }] });
  blocks.push({ type: 'context', elements: [{ type: 'mrkdwn', text:
    (agent ? 'Answered by ' + mrk(agent.name) + ', ' + mrk(agent.title.toLowerCase()) + '. ' : '') +
    'Rough ranges from a hand-written guide; ToUpper is a concept demo.' }] });

  return { response_type: 'in_channel', text: t.name + ': ' + t.aka, blocks: blocks };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { ok: false }); }

  var secret = process.env.SLACK_SIGNING_SECRET;
  if (!secret) return send(res, 503, { ok: false, error: 'slack_not_configured' });

  var raw;
  try { raw = await readRaw(req); } catch (e) { return send(res, 413, { ok: false }); }
  if (!verified(req, raw, secret)) return send(res, 401, { ok: false, error: 'bad_signature' });

  var text = (new URLSearchParams(raw).get('text') || '').trim().slice(0, 160);

  if (!text || /^help$/i.test(text)) {
    return send(res, 200, { response_type: 'ephemeral', text:
      'Ask what a big customer’s request involves:\n`/toupper scim`  `/toupper soc 2`  `/toupper rag`\n' +
      'You get what it is, a rough estimate, and what to decide first, posted in the channel.' });
  }

  var r = MATCH.match(GLOSSARY, text, IDX);
  if (r.term) return send(res, 200, answerBlocks(r.term));

  var tries = (r.suggestions.length ? r.suggestions.map(function (s) { return s.name; }) : STARTERS).slice(0, 4);
  return send(res, 200, { response_type: 'ephemeral', text:
    'No write-up for “' + mrk(text) + '” yet. Try ' + tries.map(function (x) { return '`/toupper ' + x.toLowerCase() + '`'; }).join(', ') + '.' });
};
