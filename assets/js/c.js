/* Variant C — index. A reference table, minimal prose. */
(function () {
  'use strict';
  var esc = TU.esc, group = null;
  var $ = function (id) { return document.getElementById(id); };
  var GROUPS = window.TOUPPER_GROUPS || [];

  var bench = TU.bench({ onSelect: paintAreas });

  $('groups').innerHTML = '<button class="chip on" data-g="">All</button>' +
    GROUPS.map(function (g) {
      return '<button class="chip" data-g="' + esc(g.name) + '">' + esc(g.name) + '</button>';
    }).join('');

  function paintAreas() {
    var picked = bench.state.picked;
    $('areas').innerHTML = TU.domains
      .filter(function (d) { return !group || d.group === group; })
      .map(function (d) {
        var who = TU.agentsFor(d.slug).map(function (a) { return a.code; }).join(' ');
        return '<button class="arow' + (picked.indexOf(d.slug) > -1 ? ' on' : '') +
          '" data-s="' + esc(d.slug) + '">' +
          '<span><span class="an">' + esc(d.name) + '</span>' +
            '<span class="ad">' + esc(d.short) + '</span></span>' +
          '<span class="ag">' + esc(d.group) + '</span>' +
          '<span class="ac mono">' + esc(who) + '</span>' +
        '</button>';
      }).join('');
  }

  $('groups').addEventListener('click', function (e) {
    var b = e.target.closest('[data-g]'); if (!b) return;
    group = b.getAttribute('data-g') || null;
    Array.prototype.forEach.call($('groups').children, function (c) { c.classList.toggle('on', c === b); });
    paintAreas();
  });

  $('areas').addEventListener('click', function (e) {
    var b = e.target.closest('[data-s]'); if (!b) return;
    var s = b.getAttribute('data-s'), picked = bench.state.picked.slice(), i = picked.indexOf(s);
    if (i > -1) picked.splice(i, 1); else picked.push(s);
    bench.select(picked, false);
  });

  $('tracks').innerHTML = TU.tracks.map(function (t) {
    var who = TU.trackAgents(t).map(function (x) { return x.code; }).join(' · ');
    return '<details><summary>' + esc(t.eyebrow) +
      '<span class="sd">' + esc(t.title) + '</span></summary>' +
      '<div class="dbody"><p class="tb">' + esc(t.blurb) + '</p>' +
      t.rows.map(function (r) {
        return '<div class="trow"><div class="tk">' + esc(r.k) + '</div>' +
          '<div class="tv">' + esc(r.v) + '</div></div>';
      }).join('') +
      '<div class="cta"><button class="btn btn-sm" data-track="' + esc(t.id) + '">Select these areas</button>' +
        '<span class="tiny muted mono">' + esc(who) + '</span></div></div></details>';
  }).join('');

  $('tracks').addEventListener('click', function (e) {
    var b = e.target.closest('[data-track]'); if (!b) return;
    var t = TU.tracks.filter(function (x) { return x.id === b.getAttribute('data-track'); })[0];
    if (t) bench.select(TU.trackAreas(t), true);
  });

  paintAreas();
  bench.render();
})();
