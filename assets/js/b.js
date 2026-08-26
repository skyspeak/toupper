/* Variant B — triage. Blocker first, prose second. */
(function () {
  'use strict';
  var esc = TU.esc, picked = [], open = null, asked = null;
  var $ = function (id) { return document.getElementById(id); };

  $('chips').innerHTML = TU.domains.map(function (d) {
    return '<button class="chip" data-s="' + esc(d.slug) + '" title="' + esc(d.short) + '">' +
      esc(d.chip) + '</button>';
  }).join('');

  /* Compliance and revenue, side by side — the two blockers that need a
     paragraph rather than a chip. */
  $('tracks').innerHTML = TU.tracks.map(function (t) {
    var n = TU.trackExperts(t).length;
    return '<div class="track">' +
      '<span class="eyebrow">' + esc(t.eyebrow) + '</span>' +
      '<h3>' + esc(t.title) + '</h3>' +
      '<p class="tb">' + esc(t.blurb) + '</p>' +
      t.rows.map(function (r) {
        return '<div class="trow"><div class="tk">' + esc(r.k) + '</div>' +
          '<div class="tv">' + esc(r.v) + '</div></div>';
      }).join('') +
      '<div class="cta"><button class="btn btn-sm" data-track="' + esc(t.id) + '">' +
        'Show the ' + n + ' experts</button></div>' +
    '</div>';
  }).join('');

  $('chips').addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    var s = b.getAttribute('data-s'), i = picked.indexOf(s);
    if (i > -1) picked.splice(i, 1); else picked.push(s);
    select(picked.slice(), false);
  });
  $('tracks').addEventListener('click', function (e) {
    var b = e.target.closest('[data-track]'); if (!b) return;
    var t = TU.tracks.filter(function (x) { return x.id === b.getAttribute('data-track'); })[0];
    if (t) select(TU.trackAreas(t), true);
  });
  $('clear').addEventListener('click', function () { select([], false); });

  function select(next, scroll) {
    picked = next;
    Array.prototype.forEach.call(document.querySelectorAll('.chip'), function (c) {
      c.classList.toggle('on', picked.indexOf(c.getAttribute('data-s')) > -1);
    });
    render();
    if (scroll) $('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

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
    if (picked.length) bits.push('Blockers: <b>' + picked.map(TU.name).map(esc).join('</b>, <b>') + '</b>.');
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
        ? '<p class="body small">We would come back with: <b>' + names.map(esc).join('</b>, <b>') + '</b>.</p>' : '');
  });

  render();
})();
