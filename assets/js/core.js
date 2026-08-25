/* ToUpper — shared chrome, helpers, and matching logic. */
(function () {
  'use strict';

  var D = window.TOUPPER_DOMAINS || [];
  var E = window.TOUPPER_EXPERTS || [];
  var RATES = window.TOUPPER_RATES || {};

  /* ------------------------------------------------------------- helpers */
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
    /* Deterministic avatar colour from the id, so profiles look stable. */
    hue: function (id) {
      var h = 0;
      for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
      return h;
    },
    /* opts: true for large, or {size:px, ring:bool} for inline stacks */
    avatar: function (x, opts) {
      var big = opts === true || (opts && opts.big);
      var size = opts && opts.size;
      var h = T.hue(x.id);
      var css = 'background:linear-gradient(140deg,hsl(' + h + ' 62% 44%),hsl(' + ((h + 42) % 360) + ' 58% 32%))';
      if (size) css += ';width:' + size + 'px;height:' + size + 'px;font-size:' + Math.round(size * 0.36) + 'px';
      if (opts && opts.ring) css += ';box-shadow:0 0 0 2px var(--paper)';
      return '<div class="avatar' + (big ? ' avatar-lg' : '') + '" aria-hidden="true" style="' + css + '">' +
        T.esc(T.initials(x.name)) + '</div>';
    },
    rateLabel: function (n) { return (RATES[n] || {}).label || ''; },
    rateRange: function (n) { return (RATES[n] || {}).range || ''; },
    availTone: function (a) {
      if (/available now/i.test(a)) return 'pill-good';
      if (/booked/i.test(a)) return 'pill-warn';
      return '';
    },

    /* ------------------------------------------------ shortlist (local) */
    shortlist: function () {
      try { return JSON.parse(localStorage.getItem('toupper.shortlist') || '[]'); }
      catch (e) { return []; }
    },
    toggleShortlist: function (id) {
      var s = T.shortlist(), i = s.indexOf(id);
      if (i > -1) s.splice(i, 1); else s.push(id);
      try { localStorage.setItem('toupper.shortlist', JSON.stringify(s)); } catch (e) {}
      T.paintShortlistCount();
      return s.indexOf(id) > -1;
    },
    paintShortlistCount: function () {
      var n = T.shortlist().length;
      Array.prototype.forEach.call(document.querySelectorAll('[data-shortlist-count]'), function (el) {
        el.textContent = n ? ' (' + n + ')' : '';
      });
    },

    /* ------------------------------------------------ assessment results */
    saveScores: function (obj) {
      try { localStorage.setItem('toupper.scores', JSON.stringify(obj)); } catch (e) {}
    },
    loadScores: function () {
      try { return JSON.parse(localStorage.getItem('toupper.scores') || 'null'); }
      catch (e) { return null; }
    },

    /* ---------------------------------------------------------- matching */
    /* Rank experts against a set of weighted domain gaps.
       Score = sum of gap weight for each overlapping domain, with a small
       bonus for depth (fewer domains = more specialist) and availability. */
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

  /* -------------------------------------------------------- expert card */
  T.expertCard = function (x, opts) {
    opts = opts || {};
    var doms = x.domains.slice(0, 3).map(function (d) {
      var on = opts.highlight && opts.highlight.indexOf(d) > -1;
      return '<span class="pill' + (on ? ' pill-accent' : '') + '">' + T.esc(T.domainName(d)) + '</span>';
    }).join('');
    var more = x.domains.length > 3 ? '<span class="pill">+' + (x.domains.length - 3) + '</span>' : '';
    return '' +
      '<a class="card expert-card" href="expert.html?id=' + encodeURIComponent(x.id) + '">' +
        '<div class="top">' + T.avatar(x) +
          '<div style="min-width:0">' +
            '<h3>' + T.esc(x.name) + (opts.badge ? ' <span class="match-badge">' + T.esc(opts.badge) + '</span>' : '') + '</h3>' +
            '<div class="head">' + T.esc(x.headline) + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="pills">' + doms + more + '</div>' +
        '<p class="quote">' + T.esc(x.quote) + '</p>' +
        '<div class="meta">' +
          '<span>' + T.esc(x.location) + '</span>' +
          '<span>' + x.years + ' yrs</span>' +
          '<span class="mono">' + T.esc(T.rateLabel(x.rate)) + '</span>' +
          '<span style="margin-left:auto" class="' + (/available now/i.test(x.avail) ? 'mono' : 'mono muted') + '">' + T.esc(x.avail) + '</span>' +
        '</div>' +
      '</a>';
  };

  /* ------------------------------------------------------------- chrome */
  var NAV = [
    { href: 'domains.html', label: 'Readiness map' },
    { href: 'directory.html', label: 'Find an expert' },
    { href: 'assessment.html', label: 'Scorecard' },
    { href: 'apply.html', label: 'For experts' }
  ];

  function header() {
    var here = location.pathname.split('/').pop() || 'index.html';
    var links = NAV.map(function (n) {
      var on = n.href === here || (here === 'domain.html' && n.href === 'domains.html') ||
               (here === 'expert.html' && n.href === 'directory.html');
      return '<a href="' + n.href + '"' + (on ? ' class="on"' : '') + '>' + n.label + '</a>';
    }).join('');
    return '' +
      '<div class="demo-bar">Demo build — <b>all expert profiles are fictional sample data</b>. Nothing here is a real person, firm, or engagement.</div>' +
      '<header class="site-head"><div class="wrap inner">' +
        '<a class="logo" href="index.html">ToUpper<span class="paren">()</span><span class="dot">.</span></a>' +
        '<button class="menu-btn" id="menuBtn" aria-label="Menu" aria-expanded="false">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
        '</button>' +
        '<nav class="nav" id="nav">' + links +
          '<a class="btn btn-accent btn-sm nav-cta" href="brief.html">Post a brief<span data-shortlist-count></span></a>' +
        '</nav>' +
      '</div></header>';
  }

  function footer() {
    var top = D.slice(0, 6).map(function (d) {
      return '<li><a href="domain.html?d=' + d.slug + '">' + T.esc(d.name) + '</a></li>';
    }).join('');
    return '' +
      '<footer class="site-foot"><div class="wrap">' +
        '<div class="foot-grid">' +
          '<div>' +
            '<a class="logo" href="index.html" style="color:#fff">ToUpper<span class="paren">()</span><span class="dot">.</span></a>' +
            '<p class="small" style="margin-top:14px;max-width:34ch;color:#9AA1AE">Independent operators who have already built the enterprise layer — matched to the part of it you are missing.</p>' +
          '</div>' +
          '<div><h4>Browse</h4><ul>' +
            '<li><a href="domains.html">Readiness map</a></li>' +
            '<li><a href="directory.html">All experts</a></li>' +
            '<li><a href="assessment.html">Readiness scorecard</a></li>' +
            '<li><a href="brief.html">Post a brief</a></li>' +
          '</ul></div>' +
          '<div><h4>Practices</h4><ul>' + top + '</ul></div>' +
          '<div><h4>For experts</h4><ul>' +
            '<li><a href="apply.html">Join the directory</a></li>' +
            '<li><a href="apply.html#how">How vetting works</a></li>' +
            '<li><a href="apply.html#fees">Fees</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="foot-bot">' +
          '<span>ToUpper — a demo concept. Sample data throughout.</span>' +
          '<span class="mono">Taxonomy adapted from <a href="https://www.enterpriseready.io/" rel="noopener">enterpriseready.io</a></span>' +
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
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    T.paintShortlistCount();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
