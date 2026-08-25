/* ToUpper — shared chrome, helpers, and matching. */
(function () {
  'use strict';

  var D = window.TOUPPER_DOMAINS || [];
  var E = window.TOUPPER_EXPERTS || [];
  var RATES = window.TOUPPER_RATES || {};

  var T = window.T = {
    domains: D,
    experts: E,
    rates: RATES,
    domain: function (slug) { return D.filter(function (d) { return d.slug === slug; })[0]; },
    domainName: function (slug) { var d = T.domain(slug); return d ? d.name : slug; },
    expert: function (id) { return E.filter(function (x) { return x.id === id; })[0]; },
    expertsFor: function (slug) { return E.filter(function (x) { return x.domains.indexOf(slug) > -1; }); },
    param: function (k) { return new URLSearchParams(location.search).get(k); },
    esc: function (s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
    },
    initials: function (name) {
      return name.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
    },
    hue: function (id) {
      var h = 0;
      for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
      return h;
    },
    avatar: function (x, big) {
      var h = T.hue(x.id);
      return '<div class="avatar' + (big ? ' avatar-lg' : '') + '" aria-hidden="true" ' +
        'style="background:hsl(' + h + ' 34% 42%)">' + T.esc(T.initials(x.name)) + '</div>';
    },
    rateLabel: function (n) { return (RATES[n] || {}).label || ''; },
    rateRange: function (n) { return (RATES[n] || {}).range || ''; },

    shortlist: function () {
      try { return JSON.parse(localStorage.getItem('toupper.shortlist') || '[]'); }
      catch (e) { return []; }
    },
    toggleShortlist: function (id) {
      var s = T.shortlist(), i = s.indexOf(id);
      if (i > -1) s.splice(i, 1); else s.push(id);
      try { localStorage.setItem('toupper.shortlist', JSON.stringify(s)); } catch (e) {}
      return s.indexOf(id) > -1;
    },

    saveScores: function (obj) {
      try { localStorage.setItem('toupper.scores', JSON.stringify(obj)); } catch (e) {}
    },
    loadScores: function () {
      try { return JSON.parse(localStorage.getItem('toupper.scores') || 'null'); }
      catch (e) { return null; }
    },

    /* Rank experts against weighted domain gaps: overlap, then specialism,
       then a nudge toward whoever is free. */
    rank: function (gaps) {
      var slugs = Object.keys(gaps);
      return E.map(function (x) {
        var hits = x.domains.filter(function (d) { return slugs.indexOf(d) > -1; });
        var score = hits.reduce(function (a, d) { return a + gaps[d]; }, 0);
        if (!score) return null;
        var specialism = 1 + (0.12 * (hits.length / x.domains.length));
        var open = /available now/i.test(x.avail) ? 1.08 : /booked/i.test(x.avail) ? 0.94 : 1;
        return { expert: x, hits: hits, score: score * specialism * open };
      }).filter(Boolean).sort(function (a, b) { return b.score - a.score; });
    }
  };

  /* One expert, as a rule-separated row. Meta line: the practice area that
     matters here, where they are, and whether they are free. */
  T.person = function (x, opts) {
    opts = opts || {};
    var lead = opts.lead && x.domains.indexOf(opts.lead) > -1 ? opts.lead : x.domains[0];
    var extra = x.domains.length > 1 ? ' <span class="muted">+' + (x.domains.length - 1) + ' more</span>' : '';
    var avail = /available now/i.test(x.avail) ? '<b>Available now</b>' : T.esc(x.avail);
    return '<a class="person" href="expert.html?id=' + encodeURIComponent(x.id) + '">' +
      T.avatar(x) +
      '<div class="pb">' +
        '<div class="pn">' + T.esc(x.name) + '</div>' +
        '<div class="ph">' + T.esc(x.headline) + '</div>' +
        '<div class="pm">' + T.esc(T.domainName(lead)) + extra +
          ' &nbsp;·&nbsp; ' + T.esc(x.location) + ' &nbsp;·&nbsp; ' + avail + '</div>' +
      '</div></a>';
  };

  /* ------------------------------------------------------------- chrome */
  var NAV = [
    { href: 'domains.html', label: 'Practice areas' },
    { href: 'directory.html', label: 'Experts' },
    { href: 'assessment.html', label: 'Scorecard' }
  ];

  function header() {
    var here = location.pathname.split('/').pop() || 'index.html';
    var links = NAV.map(function (n) {
      var on = n.href === here || (here === 'domain.html' && n.href === 'domains.html') ||
               (here === 'expert.html' && n.href === 'directory.html');
      return '<a href="' + n.href + '"' + (on ? ' class="on"' : '') + '>' + n.label + '</a>';
    }).join('');
    return '' +
      '<div class="demo-bar">Demo — every expert profile is fictional sample data.</div>' +
      '<header class="site-head"><div class="wrap inner">' +
        '<a class="logo" href="index.html">ToUpper<span class="paren">()</span></a>' +
        '<button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false">' +
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
        '</button>' +
        '<nav class="nav" id="nav">' + links +
          '<a class="btn btn-sm" href="brief.html">Post a brief</a>' +
        '</nav>' +
      '</div></header>';
  }

  function footer() {
    return '<footer class="site-foot"><div class="wrap inner">' +
      '<a class="logo" href="index.html">ToUpper<span class="paren">()</span></a>' +
      '<span class="tiny muted">Sample data throughout. Taxonomy adapted from ' +
        '<a href="https://www.enterpriseready.io/" rel="noopener">enterpriseready.io</a>.</span>' +
      '<div class="foot-links">' +
        '<a href="domains.html">Practice areas</a>' +
        '<a href="directory.html">Experts</a>' +
        '<a href="assessment.html">Scorecard</a>' +
        '<a href="apply.html">For experts</a>' +
      '</div>' +
    '</div></footer>';
  }

  function mount() {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if (h) h.innerHTML = header();
    if (f) f.innerHTML = footer();
    var btn = document.getElementById('menuBtn');
    if (btn) btn.addEventListener('click', function () {
      var nav = document.getElementById('nav');
      btn.setAttribute('aria-expanded', String(nav.classList.toggle('open')));
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
