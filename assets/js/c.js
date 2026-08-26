/* Variant C — index. A reference table, minimal prose. */
(function () {
  'use strict';
  var esc = TU.esc, picked = [], open = null, asked = null, group = null;
  var $ = function (id) { return document.getElementById(id); };
  var GROUPS = window.TOUPPER_GROUPS || [];

  $('groups').innerHTML = '<button class="chip on" data-g="">All</button>' +
    GROUPS.map(function (g) {
      return '<button class="chip" data-g="' + esc(g.name) + '">' + esc(g.name) + '</button>';
    }).join('');

  function paintAreas() {
    $('areas').innerHTML = TU.domains
      .filter(function (d) { return !group || d.group === group; })
      .map(function (d) {
        var n = TU.experts.filter(function (x) { return x.domains.indexOf(d.slug) > -1; }).length;
        return '<button class="arow' + (picked.indexOf(d.slug) > -1 ? ' on' : '') +
          '" data-s="' + esc(d.slug) + '">' +
          '<span><span class="an">' + esc(d.name) + '</span>' +
            '<span class="ad">' + esc(d.short) + '</span></span>' +
          '<span class="ag">' + esc(d.group) + '</span>' +
          '<span class="ac">' + n + '</span>' +
        '</button>';
      }).join('');
  }

  $('groups').addEventListener('click', function (e) {
    var b = e.target.closest('[data-g]'); if (!b) return;
    group = b.getAttribute('data-g') || null;
    Array.prototype.forEach.call($('groups').children, function (c) {
      c.classList.toggle('on', c === b);
    });
    paintAreas();
  });

  $('areas').addEventListener('click', function (e) {
    var b = e.target.closest('[data-s]'); if (!b) return;
    var s = b.getAttribute('data-s'), i = picked.indexOf(s);
    if (i > -1) picked.splice(i, 1); else picked.push(s);
    paintAreas();
    render();
  });

  /* Compliance and revenue as collapsed reference blocks. */
  $('tracks').innerHTML = TU.tracks.map(function (t) {
    var n = TU.trackExperts(t).length;
    return '<details><summary>' + esc(t.eyebrow) +
      '<span class="sd">' + esc(t.title) + '</span></summary>' +
      '<div class="dbody"><p class="tb">' + esc(t.blurb) + '</p>' +
      t.rows.map(function (r) {
        return '<div class="trow"><div class="tk">' + esc(r.k) + '</div>' +
          '<div class="tv">' + esc(r.v) + '</div></div>';
      }).join('') +
      '<div class="cta"><button class="btn btn-sm" data-track="' + esc(t.id) + '">' +
        'Select these ' + TU.trackAreas(t).length + ' areas (' + n + ' experts)</button></div>' +
      '</div></details>';
  }).join('');

  $('tracks').addEventListener('click', function (e) {
    var b = e.target.closest('[data-track]'); if (!b) return;
    var t = TU.tracks.filter(function (x) { return x.id === b.getAttribute('data-track'); })[0];
    if (!t) return;
    picked = TU.trackAreas(t);
    paintAreas();
    render();
    $('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  $('clear').addEventListener('click', function () {
    picked = []; paintAreas(); render();
  });

  function render() {
    var list = TU.filter(picked);
    $('count').textContent = TU.summary(picked, list.length);
    $('clear').classList.toggle('hide', !picked.length);
    $('people').innerHTML = list.length
      ? list.map(function (x) { return TU.personRow(x, picked, open === x.id); }).join('')
      : '<div class="empty">No experts listed for that yet.</div>';
    TU.paintAvatars($('people'));
  }

  $('people').addEventListener('click', function (e) {
    var intro = e.target.closest('[data-intro]');
    if (intro) { asked = intro.getAttribute('data-intro'); paintContext();
      $('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('what').focus({ preventScroll: true }); return; }
    var head = e.target.closest('.phead'); if (!head) return;
    var id = head.getAttribute('data-id');
    open = open === id ? null : id;
    render();
  });

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
      '<p class="note accent">Nothing was sent — this is a demo.</p>' +
      '<div class="facts mt-2">' + esc(what) + '</div>' +
      (picked.length || asked
        ? '<p class="body small">We would come back with: <b>' + names.map(esc).join('</b>, <b>') + '</b>.</p>' : '');
  });

  paintAreas();
  render();
})();
