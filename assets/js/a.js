/* Variant A — story-led. The narrative doubles as the filter. */
(function () {
  'use strict';
  var esc = TU.esc, picked = [], open = null, asked = null;
  var $ = function (id) { return document.getElementById(id); };

  /* Five beats of the same deal; each selects the areas that week is about. */
  var BEATS = [
    { w: 'Week 1',  t: '<b>Their IT team asks how SSO works</b>, and whether you support SCIM. Your accounts are all email-and-password.',
      a: ['sso', 'scim'] },
    { w: 'Week 2',  t: '<b>A 300-line security questionnaire lands</b>, followed by a request for your SOC 2 report and last pen test.',
      a: ['procurement', 'security', 'compliance'] },
    { w: 'Week 4',  t: '<b>Legal wants a DPA</b> with EU residency. Their admin wants audit log export into Splunk, and custom roles for three regions.',
      a: ['privacy', 'audit-logs', 'rbac'] },
    { w: 'Week 6',  t: '<b>Procurement rewrites the order form</b>: three-year ramp, quarterly true-up, net 60, 99.9% uptime with credits.',
      a: ['billing-revops', 'pricing-packaging', 'sla-support'] },
    { w: 'Week 10', t: '<b>Signed.</b> Now roll out to 12,000 people across four business units who have never seen your product.',
      a: ['onboarding', 'team-management', 'admin-console'] }
  ];

  function sameSet(a) {
    return picked.length === a.length && a.every(function (s) { return picked.indexOf(s) > -1; });
  }

  /* ------------------------------------------------------------- story */
  $('beats').innerHTML = BEATS.map(function (b, i) {
    return '<button class="beat" data-i="' + i + '">' +
      '<span class="bw">' + esc(b.w) + '</span>' +
      '<span class="bt">' + b.t +
        '<span class="ba">' + b.a.map(function (s) { return esc(TU.chip(s)); }).join('  ·  ') + '</span>' +
      '</span></button>';
  }).join('');

  $('beats').addEventListener('click', function (e) {
    var b = e.target.closest('.beat'); if (!b) return;
    var a = BEATS[Number(b.getAttribute('data-i'))].a;
    select(sameSet(a) ? [] : a.slice(), !sameSet(a));
  });

  /* --------------------------------------------- compliance & revenue */
  $('tracks').innerHTML = TU.tracks.map(function (t) {
    var n = TU.trackExperts(t).length;
    return '<div class="track" id="track-' + esc(t.id) + '">' +
      '<span class="eyebrow">' + esc(t.eyebrow) + '</span>' +
      '<h3>' + esc(t.title) + '</h3>' +
      '<p class="tb">' + esc(t.blurb) + '</p>' +
      t.rows.map(function (r) {
        return '<div class="trow"><div class="tk">' + esc(r.k) + '</div>' +
          '<div class="tv">' + esc(r.v) + '</div></div>';
      }).join('') +
      '<div class="cta">' +
        '<button class="btn btn-sm" data-track="' + esc(t.id) + '">Show the ' + n + ' experts</button>' +
        '<span class="tiny muted">' + esc(TU.trackAreas(t).map(TU.chip).join(' · ')) + '</span>' +
      '</div></div>';
  }).join('');

  $('tracks').addEventListener('click', function (e) {
    var b = e.target.closest('[data-track]'); if (!b) return;
    var t = TU.tracks.filter(function (x) { return x.id === b.getAttribute('data-track'); })[0];
    if (t) select(TU.trackAreas(t), true);
  });

  /* ------------------------------------------------------------- chips */
  $('chips').innerHTML = TU.domains.map(function (d) {
    return '<button class="chip" data-s="' + esc(d.slug) + '" title="' + esc(d.short) + '">' +
      esc(d.chip) + '</button>';
  }).join('');

  $('chips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    var s = b.getAttribute('data-s'), i = picked.indexOf(s);
    if (i > -1) picked.splice(i, 1); else picked.push(s);
    select(picked.slice(), false);
  });
  $('clear').addEventListener('click', function () { select([], false); });

  function select(next, scroll) {
    picked = next;
    sync();
    render();
    if (scroll) $('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function sync() {
    Array.prototype.forEach.call(document.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('on', picked.indexOf(c.getAttribute('data-s')) > -1);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.beat'), function (el) {
      el.classList.toggle('on', sameSet(BEATS[Number(el.getAttribute('data-i'))].a));
    });
  }

  /* ----------------------------------------------------------- experts */
  function render() {
    var list = TU.filter(picked);
    $('count').textContent = TU.summary(picked, list.length);
    $('clear').classList.toggle('hide', !picked.length);
    $('people').innerHTML = list.length
      ? list.map(function (x) { return TU.personRow(x, picked, open === x.id); }).join('')
      : '<div class="empty">No experts listed for that yet. Describe it below and we will go looking.</div>';
    TU.paintAvatars($('people'));
  }

  $('people').addEventListener('click', function (e) {
    var intro = e.target.closest('[data-intro]');
    if (intro) { askFor(intro.getAttribute('data-intro')); return; }
    var head = e.target.closest('.phead'); if (!head) return;
    var id = head.getAttribute('data-id');
    open = open === id ? null : id;
    render();
  });

  /* ----------------------------------------------------------- contact */
  function askFor(id) {
    asked = id;
    paintContext();
    $('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
    $('what').focus({ preventScroll: true });
  }
  function paintContext() {
    var bits = [];
    if (asked) {
      var x = TU.experts.filter(function (e) { return e.id === asked; })[0];
      if (x) bits.push('Intro requested with <b>' + esc(x.name) + '</b>.');
    }
    if (picked.length) bits.push('Areas: <b>' + picked.map(TU.name).map(esc).join('</b>, <b>') + '</b>.');
    $('context').innerHTML = bits.length ? '<p class="note">' + bits.join(' ') + '</p>' : '';
  }

  $('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var what = $('what').value.trim();
    if (!what) { $('what').focus(); return; }

    var names = TU.filter(picked).slice(0, 3).map(function (x) { return x.name; });
    if (asked) {
      var who = TU.experts.filter(function (x) { return x.id === asked; })[0];
      if (who) names = [who.name].concat(names.filter(function (n) { return n !== who.name; })).slice(0, 3);
    }

    this.outerHTML =
      '<p class="note accent">Nothing was sent — this is a demo. On the live site a person reads this and replies inside two business days.</p>' +
      '<div class="facts mt-2">' + esc(what) + '</div>' +
      (picked.length || asked
        ? '<p class="body small">We would come back with: <b>' + names.map(esc).join('</b>, <b>') + '</b>.</p>'
        : '');
  });

  render();
})();
