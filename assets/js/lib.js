/* ToUpper — shared data access, filtering and row rendering.
   No inline script anywhere on the site, so the CSP can refuse
   script-src 'unsafe-inline'. Everything interpolated into HTML
   goes through esc(), including our own data. */
(function () {
  'use strict';

  var D = window.TOUPPER_DOMAINS || [];
  var E = window.TOUPPER_EXPERTS || [];
  var R = window.TOUPPER_RATES || {};
  var TRACKS = window.TOUPPER_TRACKS || [];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var TU = window.TU = {
    domains: D, experts: E, rates: R, tracks: TRACKS, esc: esc,

    domain: function (slug) { return D.filter(function (d) { return d.slug === slug; })[0]; },
    name: function (slug) { var d = TU.domain(slug); return d ? d.name : slug; },
    chip: function (slug) { var d = TU.domain(slug); return d ? d.chip : slug; },
    openNow: function (a) { return /available now/i.test(a); },
    initials: function (n) {
      return n.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase();
    },
    hue: function (id) {
      var h = 0;
      for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
      return h;
    },

    hits: function (x, picked) {
      return picked.filter(function (s) { return x.domains.indexOf(s) > -1; });
    },

    /* Any selected area matches; more overlap ranks higher, then availability. */
    filter: function (picked) {
      var list = E.filter(function (x) { return !picked.length || TU.hits(x, picked).length; });
      return list.sort(function (a, b) {
        var d = TU.hits(b, picked).length - TU.hits(a, picked).length;
        if (d) return d;
        if (TU.openNow(a.avail) !== TU.openNow(b.avail)) return TU.openNow(a.avail) ? -1 : 1;
        return b.engagements - a.engagements;
      });
    },

    summary: function (picked, n) {
      if (!picked.length) return 'All ' + n + ' experts — pick an area to narrow it down';
      var labels = picked.map(function (s) { return TU.chip(s).toLowerCase(); });
      var said = labels.length > 3
        ? labels.slice(0, 3).join(', ') + ' and ' + (labels.length - 3) + ' more'
        : labels.join(', ');
      return n + (n === 1 ? ' expert works' : ' experts work') + ' on ' + said;
    },

    avatar: function (x, cls) {
      return '<span class="' + (cls || 'avatar') + '" aria-hidden="true" data-hue="' + TU.hue(x.id) + '">' +
        esc(TU.initials(x.name)) + '</span>';
    },

    /* One expert as a row. `open` renders the expanded detail. */
    personRow: function (x, picked, open) {
      var lead = TU.hits(x, picked)[0] || x.domains[0];
      var more = x.domains.length > 1
        ? ' <span class="muted">+' + (x.domains.length - 1) + ' more</span>' : '';
      return '<div class="person">' +
        '<button class="phead" data-id="' + esc(x.id) + '" aria-expanded="' + (open ? 'true' : 'false') + '">' +
          TU.avatar(x) +
          '<span class="pb">' +
            '<span class="pn">' + esc(x.name) + '</span>' +
            '<span class="ph">' + esc(x.headline) + '</span>' +
            '<span class="pm">' + esc(TU.name(lead)) + more + ' &nbsp;·&nbsp; ' + esc(x.location) +
              ' &nbsp;·&nbsp; ' + (TU.openNow(x.avail) ? '<b>Available now</b>' : esc(x.avail)) + '</span>' +
          '</span>' +
          '<span class="caret">' + (open ? '–' : '+') + '</span>' +
        '</button>' +
        (open ? TU.personDetail(x) : '') +
      '</div>';
    },

    personDetail: function (x) {
      return '<div class="pdetail">' +
        '<p>' + esc(x.bio) + '</p>' +
        '<ul class="list">' + x.proof.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') + '</ul>' +
        '<div class="facts">' +
          esc(x.domains.map(TU.name).join(' · ')) + '<br>' +
          esc(x.years + ' years · ' + x.modes.join(', ') + ' · ' + ((R[x.rate] || {}).range || '')) +
        '</div>' +
        '<button class="btn btn-sm" data-intro="' + esc(x.id) + '">Request an intro</button>' +
      '</div>';
    },

    /* Experts covering any area named by a track. */
    trackExperts: function (track) {
      var areas = TU.trackAreas(track);
      return E.filter(function (x) {
        return x.domains.some(function (d) { return areas.indexOf(d) > -1; });
      });
    },
    trackAreas: function (track) {
      var out = [];
      track.rows.forEach(function (r) {
        r.a.forEach(function (s) { if (out.indexOf(s) === -1) out.push(s); });
      });
      return out;
    },

    /* Avatars carry a data-hue rather than an inline style, so the CSP can
       also refuse style-src 'unsafe-inline'. */
    paintAvatars: function (root) {
      var els = (root || document).querySelectorAll('[data-hue]');
      Array.prototype.forEach.call(els, function (el) {
        if (el.dataset.painted) return;
        el.style.backgroundColor = 'hsl(' + Number(el.getAttribute('data-hue')) + ' 34% 42%)';
        el.dataset.painted = '1';
      });
    }
  };
})();
