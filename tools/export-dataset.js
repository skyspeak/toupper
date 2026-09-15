/* Export the guide as an open dataset (growth hack 11).
 *
 *   node tools/export-dataset.js
 *
 * Writes growth/dataset/enterprise-asks.json and enterprise-asks.csv from
 * data/glossary.js, so the published numbers always match the site.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var G = require('../data/glossary.js');

var OUT = path.join(__dirname, '..', 'growth', 'dataset');
var ORIGIN = 'https://toupper.vercel.app';

function link(id) { return ORIGIN + '/what/' + id + '?utm_source=github&utm_medium=dataset&utm_campaign=h11_dataset'; }

var rows = G.map(function (t) {
  return {
    id: t.id,
    name: t.name,
    aka: t.aka,
    what: t.what,
    why_enterprises_ask: t.why,
    build_engineer_weeks: t.build.weeks,
    buy_weeks: t.buy ? t.buy.weeks : null,
    platforms: t.buy ? t.buy.options : [],
    calendar_note: t.calendar || null,
    cost_drivers: t.drivers.map(function (d) { return { label: d.label, adds_weeks: d.add, adds_weeks_if_buying: t.buy ? (d.buyAdd || d.add) : null }; }),
    decide_first: t.questions.map(function (q) { return { owner: q.who, question: q.q, why: q.why }; }),
    related: t.related || [],
    url: link(t.id)
  };
});

function csvCell(v) {
  var s = v == null ? '' : String(v);
  return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}
function range(a) { return a ? a[0] + '-' + a[1] : ''; }

var header = ['id', 'name', 'aka', 'build_engineer_weeks', 'buy_weeks', 'platforms', 'questions', 'calendar_note', 'url'];
var csv = [header.join(',')].concat(rows.map(function (r) {
  return [r.id, r.name, r.aka, range(r.build_engineer_weeks), range(r.buy_weeks),
    r.platforms.map(function (p) { return p.name; }).join('; '), r.decide_first.length, r.calendar_note, r.url].map(csvCell).join(',');
})).join('\n') + '\n';

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'enterprise-asks.json'), JSON.stringify({
  name: 'Enterprise asks',
  description: 'What enterprise customers ask startups for, what each takes to build or buy, and what to decide first.',
  license: 'CC BY 4.0',
  source: ORIGIN + '/what',
  note: 'Estimates are rough ranges written by hand, not measurements.',
  items: rows
}, null, 2) + '\n');
fs.writeFileSync(path.join(OUT, 'enterprise-asks.csv'), csv);
console.log('wrote', rows.length, 'items to', OUT);
