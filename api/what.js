/* GET /what/:term — the ask page, with link previews written for that term.
 *
 * Slack, LinkedIn and email clients don't run JavaScript, so a forwarded
 * /what/scim link would otherwise preview as the generic page. This serves the
 * same ask.html with the title, description and Open Graph tags rewritten for
 * the term, plus a plain-HTML version of the answer inside <noscript>. The
 * browser then renders the full interactive answer from the same URL.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var GLOSSARY = require('../data/glossary.js');

var ORIGIN = 'https://toupper.vercel.app';
var template = null;

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function range(a) { return a[0] === a[1] ? String(a[0]) : a[0] + '–' + a[1]; }

function plain(t) {
  var q = t.questions.map(function (x) { return '<li>' + esc(x.who) + ': ' + esc(x.q) + '</li>'; }).join('');
  return '<article class="ssr"><h2>' + esc(t.name) + '</h2><p>' + esc(t.aka) + '</p>' +
    '<h3>What it is</h3><p>' + esc(t.what) + '</p><p>' + esc(t.why) + '</p>' +
    '<h3>What it takes</h3><p>About ' + range(t.build.weeks) + ' engineer-weeks to build in-house' +
      (t.buy ? ', or ' + range(t.buy.weeks) + ' using ' + t.buy.options.map(function (o) {
        return '<a href="' + esc(o.url) + '" rel="noopener noreferrer">' + esc(o.name) + '</a>'; }).join(', ') : '') + '.</p>' +
    (t.calendar ? '<p>' + esc(t.calendar) + '</p>' : '') +
    '<h3>Answer these first</h3><ul>' + q + '</ul></article>';
}

function setMeta(html, attr, key, value) {
  var re = new RegExp('(<meta ' + attr + '="' + key.replace('.', '\\.') + '" content=")[^"]*(")');
  return html.replace(re, '$1' + esc(value) + '$2');
}

module.exports = function handler(req, res) {
  if (!template) template = fs.readFileSync(path.join(__dirname, '..', 'ask.html'), 'utf8');

  var url = new URL(req.url, 'http://localhost');
  var slug = (url.searchParams.get('term') || url.pathname.replace(/^\/what\/?/, '') || '')
    .toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 60);
  var t = GLOSSARY.filter(function (g) { return g.id === slug; })[0];

  var html = template;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!t) {
    /* Unknown term: same page, which offers suggestions and a capture form,
       but tell crawlers and scrapers the truth. */
    html = html.replace('<meta name="viewport"', '<meta name="robots" content="noindex">\n<meta name="viewport"');
    res.statusCode = 404;
    res.setHeader('Cache-Control', 'no-store');
    return res.end(html);
  }

  var title = t.name + ': what it is and what it takes — Ask our Agents';
  var desc = t.aka + '. ' + t.what.split('. ')[0] + '. About ' + range(t.build.weeks) +
    ' engineer-weeks to build, and ' + t.questions.length + ' questions to answer first.';
  var canonical = ORIGIN + '/what/' + t.id;

  html = html.replace(/<title>[^<]*<\/title>/, '<title>' + esc(title) + '</title>');
  html = setMeta(html, 'name', 'description', desc);
  html = setMeta(html, 'property', 'og:title', title);
  html = setMeta(html, 'property', 'og:description', desc);
  html = setMeta(html, 'property', 'og:url', canonical);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, '$1' + canonical + '$2');
  html = html.replace('<!--SSR-->', plain(t));

  res.statusCode = 200;
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.setHeader('CDN-Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  return res.end(html);
};
