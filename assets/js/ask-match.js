/* ToUpper — resolve whatever someone typed to a glossary term.
 *
 * People don't type "SCIM". They type "we need okta provisioning", "soc2",
 * or "scmi". Scoring, highest wins:
 *
 *   exact alias            1000 + length
 *   alias inside the query  100 + length x 2   (longer, more specific wins)
 *   near-miss spelling       40 + length       (one edit, two for long words)
 *
 * Both sides are normalised the same way: case, punctuation, hyphens, and a
 * light plural strip, so "audit logs" and "Audit-log" meet in the middle.
 * Pure functions, so it runs in the browser and under Node for tests.
 */
(function (root) {
  'use strict';

  var STOP = ' what is are a an the how do does we i to build need our for it take takes much long of and with add ' +
             'implement get us my can you about tell me explain they them their customer customers want wants asked ' +
             'asking require requires required support supporting in on at be this that thing mean means ';

  function stem(t) {
    return t.length > 3 && t.slice(-1) === 's' && t.slice(-2) !== 'ss' ? t.slice(0, -1) : t;
  }

  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/[’']/g, '')
      .replace(/[-_/]/g, ' ')
      .replace(/[^a-z0-9%. &+]/g, ' ')
      .replace(/\.(?!\d)/g, ' ')              /* keep 99.9, drop sentence full stops */
      .split(/\s+/).filter(Boolean).map(stem).join(' ');
  }

  /* Optimal string alignment distance: a transposition ("scmi") costs one. */
  function dist(a, b) {
    if (Math.abs(a.length - b.length) > 2) return 99;
    var d = [], i, j;
    for (i = 0; i <= a.length; i++) { d[i] = [i]; }
    for (j = 0; j <= b.length; j++) { d[0][j] = j; }
    for (i = 1; i <= a.length; i++) {
      for (j = 1; j <= b.length; j++) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
        }
      }
    }
    return d[a.length][b.length];
  }

  function index(glossary) {
    return glossary.map(function (g) {
      var als = g.aliases.concat([g.name, g.id]).map(norm).filter(Boolean);
      return { term: g, aliases: als.filter(function (a, i) { return als.indexOf(a) === i; }) };
    });
  }

  function score(entry, q, tokens) {
    var best = 0, padded = ' ' + q + ' ';
    entry.aliases.forEach(function (a) {
      var s = 0;
      if (q === a) s = 1000 + a.length;
      else if (padded.indexOf(' ' + a + ' ') > -1) s = 100 + a.length * 2;
      else if (a.indexOf(' ') === -1 && a.length >= 3) {
        tokens.forEach(function (t) {
          if (t.length < 3) return;
          var limit = a.length >= 7 ? 2 : 1;
          if (dist(t, a) <= limit) s = Math.max(s, 40 + a.length);
        });
      }
      if (s > best) best = s;
    });
    return best;
  }

  function match(glossary, input, idx) {
    idx = idx || index(glossary);
    var q = norm(input);
    if (!q) return { term: null, query: '', suggestions: [] };
    var tokens = q.split(' ').filter(function (t) { return STOP.indexOf(' ' + t + ' ') === -1; });

    var ranked = idx.map(function (e) { return { term: e.term, s: score(e, q, tokens) }; })
      .filter(function (r) { return r.s > 0; })
      .sort(function (a, b) { return b.s - a.s; });

    if (ranked.length && ranked[0].s >= 40) {
      return { term: ranked[0].term, query: input, suggestions: [] };
    }

    /* No confident match: suggest terms whose aliases contain a typed word. */
    var partial = idx.map(function (e) {
      var hits = 0;
      tokens.forEach(function (t) {
        if (t.length < 3) return;
        if (e.aliases.some(function (a) { return a.indexOf(t) > -1; })) hits++;
      });
      return { term: e.term, hits: hits };
    }).filter(function (r) { return r.hits; })
      .sort(function (a, b) { return b.hits - a.hits; })
      .slice(0, 4).map(function (r) { return r.term; });

    return { term: null, query: input, suggestions: partial };
  }

  var api = { match: match, index: index, norm: norm, dist: dist };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.TU_MATCH = api;
})(typeof window !== 'undefined' ? window : globalThis);
