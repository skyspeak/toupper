/* Variant B — triage. Blocker first, prose second. */
(function () {
  'use strict';
  var esc = TU.esc;
  var $ = function (id) { return document.getElementById(id); };

  var bench = TU.bench({ onSelect: sync });

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

  $('tracks').innerHTML = TU.tracks.map(function (t) {
    var who = TU.trackAgents(t).map(function (x) { return x.code; }).join(' · ');
    return '<div class="track">' +
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

  function sync(picked) {
    Array.prototype.forEach.call(document.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('on', picked.indexOf(c.getAttribute('data-s')) > -1);
    });
  }

  bench.render();
})();
