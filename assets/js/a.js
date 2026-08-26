/* Variant A — story-led. The narrative doubles as the selector. */
(function () {
  'use strict';
  var esc = TU.esc;
  var $ = function (id) { return document.getElementById(id); };

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

  var bench = TU.bench({ onSelect: sync });

  function sameSet(a, picked) {
    return picked.length === a.length && a.every(function (s) { return picked.indexOf(s) > -1; });
  }

  $('beats').innerHTML = BEATS.map(function (b, i) {
    var who = agentsForAreas(b.a).map(function (x) { return x.short; }).join(' · ');
    return '<button class="beat" data-i="' + i + '">' +
      '<span class="bw">' + esc(b.w) + '</span>' +
      '<span class="bt">' + b.t + '<span class="ba">' + esc(who) + '</span></span>' +
    '</button>';
  }).join('');

  function agentsForAreas(areas) {
    return TU.agents.filter(function (x) {
      return x.areas.some(function (s) { return areas.indexOf(s) > -1; });
    });
  }

  $('beats').addEventListener('click', function (e) {
    var b = e.target.closest('.beat'); if (!b) return;
    var a = BEATS[Number(b.getAttribute('data-i'))].a;
    var same = sameSet(a, bench.state.picked);
    bench.select(same ? [] : a.slice(), !same);
  });

  $('tracks').innerHTML = TU.tracks.map(function (t) {
    var who = TU.trackAgents(t).map(function (x) { return x.short; }).join(' · ');
    return '<div class="track" id="track-' + esc(t.id) + '">' +
      '<span class="eyebrow">' + esc(t.eyebrow) + '</span>' +
      '<h3>' + esc(t.title) + '</h3>' +
      '<p class="tb">' + esc(t.blurb) + '</p>' +
      t.rows.map(function (r) {
        return '<div class="trow"><div class="tk">' + esc(r.k) + '</div>' +
          '<div class="tv">' + esc(r.v) + '</div></div>';
      }).join('') +
      '<div class="cta"><button class="btn btn-sm" data-track="' + esc(t.id) + '">Show the agents</button>' +
        '<span class="tiny muted mono">' + esc(who) + '</span></div>' +
    '</div>';
  }).join('');

  $('tracks').addEventListener('click', function (e) {
    var b = e.target.closest('[data-track]'); if (!b) return;
    var t = TU.tracks.filter(function (x) { return x.id === b.getAttribute('data-track'); })[0];
    if (t) bench.select(TU.trackAreas(t), true);
  });

  $('chips').innerHTML = TU.domains.map(function (d) {
    return '<button class="chip" data-s="' + esc(d.slug) + '" title="' + esc(d.short) + '">' +
      esc(d.chip) + '</button>';
  }).join('');

  $('chips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    var s = b.getAttribute('data-s'), picked = bench.state.picked.slice(), i = picked.indexOf(s);
    if (i > -1) picked.splice(i, 1); else picked.push(s);
    bench.select(picked, false);
  });

  function sync(picked) {
    Array.prototype.forEach.call(document.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('on', picked.indexOf(c.getAttribute('data-s')) > -1);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.beat'), function (el) {
      el.classList.toggle('on', sameSet(BEATS[Number(el.getAttribute('data-i'))].a, picked));
    });
  }

  bench.render();
})();
