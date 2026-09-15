/* ToUpper — "what is this thing?"
 *
 * A chat that answers from the hand-written glossary: what a feature is, what
 * it takes to build (with the factors that move the estimate), and the
 * questions an org has to answer first. Every answer has its own URL, and the
 * estimate choices travel in it, so a forwarded link opens exactly what the
 * sender was looking at. Capture comes after the value, never before it.
 */
(function () {
  'use strict';

  var G = window.TOUPPER_GLOSSARY || [];
  var M = window.TU_MATCH;
  var IDX = M.index(G);
  var esc = TU.esc;
  var thread = document.getElementById('thread');
  var form = document.getElementById('askForm');
  var input = document.getElementById('askInput');
  var ORDER = ['Product', 'Engineering', 'Security', 'Sales', 'Finance', 'Legal', 'Support'];
  var STARTERS = ['scim', 'sso', 'rbac', 'soc2', 'audit-logs', 'usage-billing', 'byok', 'gdpr-residency'];
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia && matchMedia('(hover: none)').matches;
  var states = {}, seq = 0;

  function byId(id) { return G.filter(function (g) { return g.id === id; })[0]; }
  function agentFor(t) { return TU.agentsFor(t.areas[0])[0] || null; }
  function range(lo, hi) { return lo === hi ? String(lo) : lo + '–' + hi; }

  /* ------------------------------------------------------------ estimate */
  function estimate(t, st) {
    var buy = st.mode === 'buy' && !!t.buy;
    var base = buy ? t.buy.weeks : t.build.weeks;
    var lo = base[0], hi = base[1];
    t.drivers.forEach(function (d, i) {
      if (!st.on[i]) return;
      var add = buy && d.buyAdd ? d.buyAdd : d.add;
      lo += add[0]; hi += add[1];
    });
    lo = Math.max(1, lo); hi = Math.max(lo, hi);
    return { lo: lo, hi: hi, calLo: Math.ceil(lo / 2), calHi: Math.ceil(hi / 2), buy: buy };
  }

  function addLabel(d, st, t) {
    var buy = st.mode === 'buy' && !!t.buy;
    var add = buy && d.buyAdd ? d.buyAdd : d.add;
    if (add[0] === 0 && add[1] === 0) return 'vendor covers it';
    if (add[1] < 0) return 'saves ' + range(-add[0], -add[1]) + ' wks';
    return '+' + range(add[0], add[1]) + ' wks';
  }

  function onList(t, st) { return t.drivers.filter(function (d, i) { return st.on[i]; }); }

  /* "SSO isn't built" must keep its acronym; only soften a leading ordinary word. */
  function softStart(label) {
    var first = label.split(' ')[0];
    return first.length > 1 && first === first.toUpperCase() ? label : label.charAt(0).toLowerCase() + label.slice(1);
  }

  /* ------------------------------------------------------ links and text */
  function pathFor(t, st) {
    var p = new URLSearchParams();
    if (st.mode === 'buy' && t.buy) p.set('mode', 'buy');
    var on = t.drivers.map(function (d, i) { return st.on[i] ? i : -1; }).filter(function (i) { return i > -1; });
    if (on.length) p.set('d', on.join(','));
    var qs = p.toString().replace(/%2C/g, ',');
    return '/what/' + t.id + (qs ? '?' + qs : '');
  }
  function linkFor(t, st) { return location.origin + pathFor(t, st); }

  function effortSentence(t, st) {
    var e = estimate(t, st);
    var how = e.buy ? 'using ' + t.buy.vendors : 'to build in-house';
    var cal = t.calendar ? ' ' + t.calendar : ', roughly ' + range(e.calLo, e.calHi) + ' calendar weeks with two engineers.';
    return range(e.lo, e.hi) + ' engineer-weeks ' + how + cal;
  }

  function slackText(t, st) {
    var lines = ['*' + t.name + '*: ' + t.aka, t.what, '', '*What it takes:* ' + effortSentence(t, st)];
    var on = onList(t, st);
    if (on.length) lines.push('Assuming: ' + on.map(function (d) { return softStart(d.label); }).join('; ') + '.');
    lines.push('', '*Answer these first:*');
    ORDER.forEach(function (w) {
      t.questions.filter(function (q) { return q.who === w; }).forEach(function (q) { lines.push('• ' + w + ': ' + q.q); });
    });
    lines.push('', 'Full breakdown: ' + linkFor(t, st));
    return lines.join('\n');
  }

  function emailHref(t, st) {
    var body = [
      t.name + ': ' + t.aka, '', t.what, '',
      'What it takes: ' + effortSentence(t, st), '',
      'A few questions to answer before starting:'
    ].concat(t.questions.slice(0, 4).map(function (q) { return '- ' + q.q; }))
     .concat(['', 'The full breakdown, with all ' + t.questions.length + ' questions:', linkFor(t, st)]).join('\n');
    return 'mailto:?subject=' + encodeURIComponent('What it takes to build ' + t.name) +
      '&body=' + encodeURIComponent(body);
  }

  /* ------------------------------------------------------------ rendering */
  function estInner(t, st) {
    var e = estimate(t, st);
    var html = '<div class="est-range"><b>' + range(e.lo, e.hi) + '</b> engineer-weeks</div>';
    html += '<p class="est-sub">' + esc(t.calendar ||
      'Roughly ' + range(e.calLo, e.calHi) + ' calendar weeks with two engineers on it.') + '</p>';
    html += e.buy
      ? '<p class="est-scope">Using ' + esc(t.buy.vendors) + '. ' + esc(t.buy.note) + '</p>'
      : '<p class="est-scope">' + esc(t.build.scope) + '</p>';
    if (t.extra) html += '<p class="est-extra">' + esc(t.extra) + '</p>';
    return html;
  }

  function answerHtml(cid, t, st) {
    var a = agentFor(t);
    var groups = ORDER.filter(function (w) { return t.questions.some(function (q) { return q.who === w; }); });

    var seg = t.buy
      ? '<div class="seg" role="group" aria-label="Build or buy">' +
          '<button type="button" data-mode="build" aria-pressed="' + (st.mode !== 'buy') + '">Build in-house</button>' +
          '<button type="button" data-mode="buy" aria-pressed="' + (st.mode === 'buy') + '">Buy and integrate</button>' +
        '</div>'
      : '';

    var drivers = '<fieldset class="drv"><legend>Does any of this apply to you?</legend>' +
      t.drivers.map(function (d, i) {
        return '<label class="drv-row"><input type="checkbox" data-drv="' + i + '"' + (st.on[i] ? ' checked' : '') + '>' +
          '<span class="drv-l">' + esc(d.label) + '</span>' +
          '<span class="drv-a" data-drva="' + i + '">' + esc(addLabel(d, st, t)) + '</span></label>';
      }).join('') + '</fieldset>';

    var questions = '<span class="eyebrow">Answer these first</span>' +
      '<p class="q-lede">' + t.questions.length + ' questions, grouped by who usually owns the answer.</p>' +
      groups.map(function (w) {
        return '<div class="qg"><h3 class="qg-h">' + esc(w) + '</h3><ul class="qg-l">' +
          t.questions.filter(function (q) { return q.who === w; }).map(function (q) {
            return '<li><span class="q-q">' + esc(q.q) + '</span><span class="q-why">' + esc(q.why) + '</span></li>';
          }).join('') + '</ul></div>';
      }).join('');

    var agent = a
      ? '<div class="ans-agent">' + TU.mark(a) + '<p><b>' + esc(a.name) + '</b> covers this on the bench, and would open by asking: ' +
        '<em>“' + esc(a.opens) + '”</em> <a href="/">Meet the agents</a></p></div>'
      : '';

    var share = '<div class="ans-act" role="group" aria-label="Share this answer">' +
      '<button type="button" class="act" data-act="link">Copy link</button>' +
      '<button type="button" class="act" data-act="slack">Copy for Slack</button>' +
      '<a class="act" data-act="email" href="' + esc(emailHref(t, st)) + '">Email it</a>' +
      (navigator.share ? '<button type="button" class="act" data-act="share">Share</button>' : '') +
      '<button type="button" class="act" data-act="print">Save as PDF</button>' +
    '</div>';

    var capture = '<form class="capture acap" data-card="' + cid + '" novalidate>' +
      '<h3>Want a hand scoping ' + esc(t.name) + ' for your team?</h3>' +
      '<p class="acap-p">Leave a work email and we’ll come back within two business days with how we’d approach it for you.</p>' +
      timing() + honeypot() +
      '<div class="crow"><label class="vh" for="' + cid + '-email">Work email</label>' +
        '<input class="input" id="' + cid + '-email" name="email" type="email" placeholder="you@company.com" autocomplete="email">' +
        '<button class="btn" type="submit" data-label="Get help">Get help</button></div>' +
      '<p class="tiny muted cnote">One email about this, no list. <span class="cerr" role="status"></span></p>' +
    '</form>';

    var follow = '<div class="fu"><span class="fu-l">Often asked next</span>' +
      t.related.map(byId).filter(Boolean).map(function (r) {
        return '<button type="button" class="chip" data-id="' + esc(r.id) + '">' + esc(r.name) + '</button>';
      }).join('') + '</div>';

    return '<article class="ans" id="' + cid + '" data-term="' + esc(t.id) + '">' +
        '<section class="ans-s">' +
          '<span class="eyebrow">What it is</span>' +
          '<h2 class="ans-name">' + esc(t.name) + '</h2>' +
          '<p class="ans-aka">' + esc(t.aka) + '</p>' +
          '<p class="ans-body">' + esc(t.what) + '</p>' +
          '<p class="ans-why"><b>Why buyers ask.</b> ' + esc(t.why) + '</p>' +
        '</section>' +
        '<section class="ans-s"><span class="eyebrow">What it takes</span>' + seg +
          '<div class="est" data-est aria-live="polite">' + estInner(t, st) + '</div>' + drivers + '</section>' +
        '<section class="ans-s">' + questions + '</section>' +
        agent + share + capture +
      '</article>' + follow;
  }

  function timing() {
    return '<div class="acap-when" role="group" aria-label="When do you need it?">' +
      ['This month', 'This quarter', 'Just exploring'].map(function (w) {
        return '<button type="button" class="chip" data-when="' + w + '" aria-pressed="false">' + w + '</button>';
      }).join('') + '</div>';
  }

  function honeypot() {
    return '<label class="hp" aria-hidden="true">Company website' +
      '<input type="text" name="company_website" tabindex="-1" autocomplete="off"></label>';
  }

  function chips(ids) {
    return '<div class="starters">' + ids.map(byId).filter(Boolean).map(function (t) {
      return '<button type="button" class="chip" data-id="' + esc(t.id) + '">' + esc(t.name) + '</button>';
    }).join('') + '</div>';
  }

  /* -------------------------------------------------------------- thread */
  function push(cls, html) {
    var el = document.createElement('div');
    el.className = 'msg ' + cls;
    el.innerHTML = html;
    thread.appendChild(el);
    TU.paintMarks(el);
    return el;
  }

  function reveal(el) {
    if (!reduced) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function thinking(then, instant) {
    if (instant || reduced) { then(); return; }
    var dots = push('bot', '<div class="typing" aria-label="Thinking"><span></span><span></span><span></span></div>');
    setTimeout(function () { dots.remove(); then(); }, 520);
  }

  function greet() {
    push('bot greet', '<p>The ones that come up most:</p>' + chips(STARTERS));
  }

  function answer(t, st, opts) {
    opts = opts || {};
    var cid = 'c' + (++seq);
    states[cid] = st;
    thinking(function () {
      var el = push('bot', answerHtml(cid, t, st));
      el.classList.add('fresh');
      syncUrl(t, st);
      if (!opts.instant) reveal(el);
    }, opts.instant);
  }

  function unknown(query, suggestions, opts) {
    opts = opts || {};
    thinking(function () {
      var el = push('bot', '<div class="unk">' +
        (suggestions.length
          ? '<p><b>“' + esc(query) + '”</b> could mean a few things. Did you mean one of these?</p>' +
            chips(suggestions.map(function (s) { return s.id; }))
          : '<p>I don’t have a write-up for <b>“' + esc(query) + '”</b> yet.</p>' +
            '<p class="unk-l">Here’s what I can cover right now:</p>' + chips(STARTERS)) +
        '<form class="capture acap" data-miss="' + esc(query) + '" novalidate>' +
          '<h3>Tell us what you’re trying to build</h3>' +
          '<p class="acap-p">We write up what people actually ask for. Leave a work email and we’ll come back to you on “' + esc(query) + '”.</p>' +
          honeypot() +
          '<div class="crow"><label class="vh" for="miss-' + seq + '">Work email</label>' +
            '<input class="input" id="miss-' + (seq++) + '" name="email" type="email" placeholder="you@company.com" autocomplete="email">' +
            '<button class="btn" type="submit" data-label="Send">Send</button></div>' +
          '<p class="tiny muted cnote">One email about this, no list. <span class="cerr" role="status"></span></p>' +
        '</form></div>');
      document.title = 'What is this thing? — ToUpper';
      history.replaceState(null, '', '/what?q=' + encodeURIComponent(query));
      if (!opts.instant) reveal(el);
    }, opts.instant);
  }

  function ask(text, opts) {
    opts = opts || {};
    text = String(text || '').trim().slice(0, 160);
    if (!text) return;
    if (!opts.silent) push('user', '<p>' + esc(text) + '</p>');
    var r = M.match(G, text, IDX);
    if (r.term) answer(r.term, { mode: 'build', on: {} }, opts);
    else unknown(text, r.suggestions, opts);
  }

  function syncUrl(t, st) {
    history.replaceState(null, '', pathFor(t, st));
    document.title = t.name + ': what it is and what it takes — ToUpper';
  }

  function refresh(card) {
    var t = byId(card.dataset.term), st = states[card.id];
    card.querySelector('[data-est]').innerHTML = estInner(t, st);
    Array.prototype.forEach.call(card.querySelectorAll('[data-drva]'), function (el) {
      el.textContent = addLabel(t.drivers[Number(el.getAttribute('data-drva'))], st, t);
    });
    Array.prototype.forEach.call(card.querySelectorAll('[data-mode]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-mode') === (st.mode === 'buy' ? 'buy' : 'build')));
    });
    var mail = card.querySelector('[data-act="email"]');
    if (mail) mail.setAttribute('href', emailHref(t, st));
    syncUrl(t, st);
  }

  /* ----------------------------------------------------------- utilities */
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.className = 'vh';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove();
      if (ok) resolve(); else reject(new Error('copy failed'));
    });
  }

  function flash(btn, text) {
    var was = btn.getAttribute('data-was') || btn.textContent;
    btn.setAttribute('data-was', was);
    btn.textContent = text;
    btn.classList.add('ok');
    setTimeout(function () { btn.textContent = was; btn.classList.remove('ok'); }, 1700);
  }

  /* -------------------------------------------------------------- events */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value;
    if (!text.trim()) { input.focus(); return; }
    input.value = '';
    if (touch) input.blur();
    ask(text);
  });

  thread.addEventListener('click', function (e) {
    var chip = e.target.closest('[data-id]');
    if (chip && !chip.closest('form')) {
      var t = byId(chip.getAttribute('data-id'));
      if (t) { push('user', '<p>' + esc(t.name) + '</p>'); answer(t, { mode: 'build', on: {} }); }
      return;
    }

    var when = e.target.closest('[data-when]');
    if (when) {
      var f = when.closest('form');
      var same = f.dataset.when === when.getAttribute('data-when');
      f.dataset.when = same ? '' : when.getAttribute('data-when');
      Array.prototype.forEach.call(f.querySelectorAll('[data-when]'), function (b) {
        var on = !same && b === when;
        b.classList.toggle('on', on);
        b.setAttribute('aria-pressed', String(on));
      });
      return;
    }

    var mode = e.target.closest('[data-mode]');
    if (mode) {
      var card = mode.closest('.ans');
      states[card.id].mode = mode.getAttribute('data-mode');
      refresh(card);
      return;
    }

    var act = e.target.closest('[data-act]');
    if (!act || act.getAttribute('data-act') === 'email') return;
    var c = act.closest('.ans'), term = byId(c.dataset.term), st = states[c.id];
    var kind = act.getAttribute('data-act');

    if (kind === 'link') copy(linkFor(term, st)).then(function () { flash(act, 'Link copied'); }, function () { flash(act, 'Copy failed'); });
    if (kind === 'slack') copy(slackText(term, st)).then(function () { flash(act, 'Copied for Slack'); }, function () { flash(act, 'Copy failed'); });
    if (kind === 'share') {
      navigator.share({ title: 'What it takes to build ' + term.name, text: term.aka, url: linkFor(term, st) }).catch(function () {});
    }
    if (kind === 'print') {
      document.body.classList.add('printing');
      c.classList.add('print-target');
      window.print();
    }
  });

  window.addEventListener('afterprint', function () {
    document.body.classList.remove('printing');
    Array.prototype.forEach.call(document.querySelectorAll('.print-target'), function (el) { el.classList.remove('print-target'); });
  });

  thread.addEventListener('change', function (e) {
    var box = e.target.closest('[data-drv]');
    if (!box) return;
    var card = box.closest('.ans');
    states[card.id].on[Number(box.getAttribute('data-drv'))] = box.checked;
    refresh(card);
  });

  thread.addEventListener('submit', function (e) {
    var f = e.target.closest('form.acap');
    if (!f) return;
    e.preventDefault();

    var email = f.querySelector('[name=email]').value;
    var err = f.querySelector('.cerr');
    if (!TU.validEmail(email)) { err.textContent = 'That email address does not look right.'; return; }
    err.textContent = '';

    var btn = f.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Sending…';

    var payload = {
      email: email,
      timing: f.dataset.when || '',
      company_website: f.querySelector('[name=company_website]').value
    };

    if (f.dataset.miss) {
      payload.kind = 'ask-missing';
      payload.term = f.dataset.miss;
      payload.situation = 'Asked about something not in the guide: ' + f.dataset.miss;
    } else {
      var card = document.getElementById(f.dataset.card);
      var t = byId(card.dataset.term), st = states[card.id], est = estimate(t, st), a = agentFor(t);
      payload.kind = 'ask';
      payload.term = t.name;
      payload.estimate = (est.buy ? 'buy' : 'build') + ', ' + range(est.lo, est.hi) + ' wks';
      payload.situation = onList(t, st).map(function (d) { return d.label; }).join('; ');
      payload.areas = t.areas.map(TU.name);
      payload.agents = a ? [a.name] : [];
    }

    TU.capture(payload).then(function (res) {
      var m = TU.captureMessage(res);
      if (m.ok) {
        f.outerHTML = '<div class="capture done"><p class="cdone">' + esc(m.text) + '</p></div>';
      } else {
        btn.disabled = false; btn.textContent = btn.getAttribute('data-label');
        err.textContent = m.text;
      }
    }).catch(function () {
      btn.disabled = false; btn.textContent = btn.getAttribute('data-label');
      err.textContent = 'Could not reach the server. Try again?';
    });
  });

  /* ---------------------------------------------------------------- boot */
  (function boot() {
    var m = location.pathname.match(/^\/what\/([a-z0-9-]+)\/?$/);
    var params = new URLSearchParams(location.search);

    if (m) {
      var t = byId(m[1]);
      if (t) {
        var on = {};
        (params.get('d') || '').split(',').forEach(function (s) {
          var i = parseInt(s, 10);
          if (i >= 0 && i < t.drivers.length) on[i] = true;
        });
        answer(t, { mode: params.get('mode') === 'buy' && t.buy ? 'buy' : 'build', on: on }, { instant: true });
      } else {
        var q = m[1].replace(/-/g, ' ');
        var r = M.match(G, q, IDX);
        if (r.term) answer(r.term, { mode: 'build', on: {} }, { instant: true });
        else unknown(q, r.suggestions, { instant: true });
      }
      return;
    }

    if (params.get('q')) { ask(params.get('q'), { instant: true }); return; }
    greet();
  })();
})();
