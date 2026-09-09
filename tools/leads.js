#!/usr/bin/env node
/* Read the leads out of the private Blob store.
 *
 *   node tools/leads.js            list, newest first
 *   node tools/leads.js --csv      export to CSV on stdout
 *   node tools/leads.js --json     raw records
 *   node tools/leads.js --areas    which practice areas people actually pick
 *
 * Needs BLOB_READ_WRITE_TOKEN. It is in .env.local after `vercel blob
 * create-store`, or run `vercel env pull` to refresh it. Deliberately a local
 * script rather than an API route: no read endpoint means no read endpoint to
 * secure, and these records hold email addresses.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const API = 'https://blob.vercel-storage.com';

function token() {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const envFile = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envFile)) {
    const m = fs.readFileSync(envFile, 'utf8').match(/^BLOB_READ_WRITE_TOKEN="?([^"\n]+)"?/m);
    if (m) return m[1];
  }
  console.error('No BLOB_READ_WRITE_TOKEN. Run: vercel env pull');
  process.exit(1);
}

async function api(url, tok) {
  const r = await fetch(url, { headers: { authorization: 'Bearer ' + tok, 'x-api-version': '7' } });
  if (!r.ok) throw new Error(url + ' -> ' + r.status + ' ' + (await r.text()).slice(0, 120));
  return r;
}

async function all(tok) {
  const out = [];
  let cursor = null;
  do {
    const u = API + '/?prefix=leads/&limit=500' + (cursor ? '&cursor=' + encodeURIComponent(cursor) : '');
    const page = await (await api(u, tok)).json();
    out.push(...page.blobs.filter(b => !b.pathname.includes('_smoketest')));
    cursor = page.cursor || null;
  } while (cursor);

  const records = await Promise.all(out.map(async b => {
    try { return await (await api(b.downloadUrl || b.url, tok)).json(); }
    catch { return null; }
  }));
  return records.filter(Boolean).sort((a, b) => String(b.at).localeCompare(String(a.at)));
}

function csv(rows) {
  const cols = ['at', 'kind', 'email', 'name', 'variant', 'areas', 'agents', 'situation'];
  const cell = v => {
    const s = Array.isArray(v) ? v.join('; ') : (v == null ? '' : String(v));
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
  };
  return [cols.join(','), ...rows.map(r => cols.map(c => cell(r[c])).join(','))].join('\n');
}

(async () => {
  const tok = token();
  const rows = await all(tok);
  const arg = process.argv[2];

  if (arg === '--json') return console.log(JSON.stringify(rows, null, 2));
  if (arg === '--csv') return console.log(csv(rows));

  if (arg === '--areas') {
    const tally = {};
    rows.forEach(r => (r.areas || []).forEach(a => { tally[a] = (tally[a] || 0) + 1; }));
    const ranked = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    if (!ranked.length) return console.log('No areas recorded yet.');
    console.log('Practice areas by how often they are selected\n');
    const width = Math.max(...ranked.map(([a]) => a.length));
    ranked.forEach(([a, n]) => console.log('  ' + a.padEnd(width) + '  ' + '█'.repeat(n) + ' ' + n));
    return;
  }

  if (!rows.length) return console.log('No leads yet.');
  console.log(rows.length + (rows.length === 1 ? ' lead\n' : ' leads\n'));
  rows.forEach(r => {
    console.log('  ' + r.at + '   ' + r.kind + '   ' + r.email + (r.name ? '  (' + r.name + ')' : ''));
    if (r.areas && r.areas.length) console.log('    areas:  ' + r.areas.join(', '));
    if (r.agents && r.agents.length) console.log('    agents: ' + r.agents.join(', '));
    if (r.situation) console.log('    "' + r.situation.slice(0, 120) + (r.situation.length > 120 ? '…' : '') + '"');
    console.log('');
  });
})().catch(e => { console.error(e.message); process.exit(1); });
