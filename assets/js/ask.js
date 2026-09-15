/* ToUpper — Ask our Agents.
 *
 * A chat that answers from the hand-written glossary: what a feature is, what
 * it takes to build (with the factors that move the estimate), and the
 * questions an org has to answer first. Each answer comes from the agent on
 * the bench who owns that area.
 *
 * TU.askChat(root, opts) mounts it anywhere:
 *   page mode    the full /what page. Every answer gets its own URL, and the
 *                estimate choices travel in it, so a forwarded link opens
 *                exactly what the sender was looking at.
 *   panel mode   the pop-up on the main site. Shorter answers, no URL changes,
 *                and a link out to the full page for sharing.
 *
 * Capture always comes after the answer, never before it.
 */
(function () {
  'use strict';

  var G = window.TOUPPER_GLOSSARY || [];
  var M = window.TU_MATCH;
  var IDX = M.index(G);
  var esc = TU.esc;
  var ORDER = ['Product', 'Engineering', 'Security', 'Sales', 'Finance', 'Legal', 'Support'];
  var STARTERS = ['scim', 'sso', 'rbac', 'soc2', 'audit-logs', 'usage-billing', 'byok', 'gdpr-residency'];
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = window.matchMedia && matchMedia('(hover: none)').matches;
  var states = {}, seq = 0;

  function byId(id) { return G.filter(function (g) { return g.id === id; })[0]; }
  function agentFor(t) { return TU.agentsFor(t.areas[0])[0] || null; }
  function range(lo, hi) { return lo === hi ? String(lo) : lo + '–' + hi; }

  /* "Metronome, Orb or Lago" for plain-text contexts. */
  function optionNames(t) {
    var n = t.buy.options.map(function (o) { return o.name; });
    return n.length > 1 ? n.slice(0, -1).join(', ') + ' or ' + n[n.length - 1] : n[0];
  }

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
    var how = e.buy ? 'using ' + optionNames(t) : 'to build in-house';
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

  /* ------------------------------------------------------------ fragments */
  function estInner(t, st) {
    var e = estimate(t, st);
    var html = '<div class="est-range"><b>' + range(e.lo, e.hi) + '</b> engineer-weeks</div>';
    html += '<p class="est-sub">' + esc(t.calendar ||
      'Roughly ' + range(e.calLo, e.calHi) + ' calendar weeks with two engineers on it.') + '</p>';
    html += e.buy
      ? '<p class="est-scope">Platforms worth a look:</p><div class="vendors">' +
          t.buy.options.map(function (o) {
            return '<a class="vendor" href="' + esc(o.url) + '" target="_blank" rel="noopener noreferrer">' +
              esc(o.name) + '<span aria-hidden="true">\u2197</span><span class="vh"> (opens in a new tab)</span></a>';
          }).join('') + '</div>'
      : '<p class="est-scope">' + esc(t.build.scope) + '</p>';
    if (t.extra) html += '<p class="est-extra">' + esc(t.extra) + '</p>';
    return html;
  }

  function byline(a) {
    return a
      ? '<div class="ans-by">' + TU.mark(a) + '<span><b>' + esc(a.name) + '</b><span class="ans-by-t">' + esc(a.title) + '</span></span></div>'
      : '';
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

  /* ------------------------------------------------------------- the card */
  function answerHtml(cid, t, st, compact) {
    var a = agentFor(t);
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

    /* The panel shows the first three questions and links to the rest. */
    var ordered = [];
    ORDER.forEach(function (w) { t.questions.forEach(function (q) { if (q.who === w) ordered.push(q); }); });
    var shown = compact ? ordered.slice(0, 3) : ordered;
    var groups = ORDER.filter(function (w) { return shown.some(function (q) { return q.who === w; }); });

    var questions = '<span class="eyebrow">Answer these first</span>' +
      '<p class="q-lede">' + (compact
        ? 'The first three of ' + t.questions.length + ', by who usually owns the answer.'
        : t.questions.length + ' questions, grouped by who usually owns the answer.') + '</p>' +
      groups.map(function (w) {
        return '<div class="qg"><h3 class="qg-h">' + esc(w) + '</h3><ul class="qg-l">' +
          shown.filter(function (q) { return q.who === w; }).map(function (q) {
            return '<li><span class="q-q">' + esc(q.q) + '</span><span class="q-why">' + esc(q.why) + '</span></li>';
          }).join('') + '</ul></div>';
      }).join('') +
      (compact ? '<a class="q-more" data-full href="' + esc(pathFor(t, st)) + '">See all ' + t.questions.length + ' questions →</a>' : '');

    var opener = a
      ? '<div class="ans-agent"><p>Before you start, I’d ask you this: <em>“' + esc(a.opens) + '”</em>' +
        (compact ? '' : ' <a href="/">Meet the other agents</a>') + '</p></div>'
      : '';

    var share = compact
      ? '<div class="ans-act" role="group" aria-label="Share this answer">' +
          '<a class="act act-primary" data-full href="' + esc(pathFor(t, st)) + '">Open the full answer</a>' +
          '<button type="button" class="act" data-act="link">Copy link</button>' +
          '<button type="button" class="act" data-act="slack">Copy for Slack</button>' +
        '</div>'
      : '<div class="ans-act" role="group" aria-label="Share this answer">' +
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

    return byline(a) +
      '<article class="ans' + (compact ? ' compact' : '') + '" id="' + cid + '" data-term="' + esc(t.id) + '">' +
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
        opener + share + capture +
      '</article>' + follow;
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

  window.addEventListener('afterprint', function () {
    document.body.classList.remove('printing');
    Array.prototype.forEach.call(document.querySelectorAll('.print-target'), function (el) { el.classList.remove('print-target'); });
  });

  /* ============================================================== mount */
  TU.askChat = function (root, opts) {
    opts = opts || {};
    var page = !!opts.page;
    var thread = root.querySelector('[data-ask-thread]');
    var form = root.querySelector('[data-ask-form]');
    var input = root.querySelector('[data-ask-input]');
    var scroller = opts.scroller || null;

    function push(cls, html) {
      var el = document.createElement('div');
      el.className = 'msg ' + cls;
      el.innerHTML = html;
      thread.appendChild(el);
      TU.paintMarks(el);
      return el;
    }

    function reveal(el) {
      if (scroller) {
        scroller.scrollTo({ top: el.offsetTop - 10, behavior: reduced ? 'auto' : 'smooth' });
      } else if (!reduced) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }

    /* Show who is answering while they "type". */
    function thinking(agent, then, instant) {
      if (instant || reduced) { then(); return; }
      var who = agent
        ? '<span class="typing-who">' + TU.mark(agent) + esc(agent.name) + '</span>'
        : '<span class="typing-who">The bench</span>';
      var dots = push('bot', '<div class="typing" role="status">' + who +
        '<span class="dots" aria-hidden="true"><span></span><span></span><span></span></span></div>');
      if (scroller) scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
      setTimeout(function () { dots.remove(); then(); }, 560);
    }

    function greet() {
      push('bot greet', (opts.greeting ? '<p>' + opts.greeting + '</p>' : '') +
        '<p class="unk-l">The ones that come up most:</p>' + chips(STARTERS));
    }

    function syncUrl(t, st) {
      if (!page) return;
      history.replaceState(null, '', pathFor(t, st));
      document.title = t.name + ': what it is and what it takes — Ask our Agents';
    }

    function answer(t, st, o) {
      o = o || {};
      var cid = 'c' + (++seq);
      states[cid] = st;
      thinking(agentFor(t), function () {
        var el = push('bot', answerHtml(cid, t, st, !page));
        el.classList.add('fresh');
        syncUrl(t, st);
        if (!o.instant) reveal(el);
      }, o.instant);
    }

    function unknown(query, suggestions, o) {
      o = o || {};
      var id = 'miss-' + (++seq);
      thinking(null, function () {
        var el = push('bot', '<div class="unk">' +
          (suggestions.length
            ? '<p><b>“' + esc(query) + '”</b> could mean a few things. Did you mean one of these?</p>' +
              chips(suggestions.map(function (s) { return s.id; }))
            : '<p>None of us has a write-up for <b>“' + esc(query) + '”</b> yet.</p>' +
              '<p class="unk-l">Here’s what we can cover right now:</p>' + chips(STARTERS)) +
          '<form class="capture acap" data-miss="' + esc(query) + '" novalidate>' +
            '<h3>Tell us what you’re trying to build</h3>' +
            '<p class="acap-p">We write up what people actually ask for. Leave a work email and we’ll come back to you on “' + esc(query) + '”.</p>' +
            honeypot() +
            '<div class="crow"><label class="vh" for="' + id + '">Work email</label>' +
              '<input class="input" id="' + id + '" name="email" type="email" placeholder="you@company.com" autocomplete="email">' +
              '<button class="btn" type="submit" data-label="Send">Send</button></div>' +
            '<p class="tiny muted cnote">One email about this, no list. <span class="cerr" role="status"></span></p>' +
          '</form></div>');
        if (page) {
          document.title = 'Ask our Agents — ToUpper';
          history.replaceState(null, '', '/what?q=' + encodeURIComponent(query));
        }
        if (!o.instant) reveal(el);
      }, o.instant);
    }

    function ask(text, o) {
      o = o || {};
      text = String(text || '').trim().slice(0, 160);
      if (!text) return;
      push('user', '<p>' + esc(text) + '</p>');
      var r = M.match(G, text, IDX);
      if (r.term) answer(r.term, { mode: 'build', on: {} }, o);
      else unknown(text, r.suggestions, o);
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
      Array.prototype.forEach.call(card.querySelectorAll('[data-full]'), function (l) { l.setAttribute('href', pathFor(t, st)); });
      syncUrl(t, st);
    }

    /* ------------------------------------------------------------ events */
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

    /* -------------------------------------------------------------- boot */
    if (page) {
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
      } else if (params.get('q')) {
        ask(params.get('q'), { instant: true });
      } else {
        greet();
      }
    } else {
      greet();
    }

    return { ask: ask, focus: function () { input.focus({ preventScroll: true }); } };
  };

  /* The full page mounts itself. The panel is mounted by ask-widget.js. */
  var pageRoot = document.querySelector('[data-ask-page]');
  if (pageRoot) TU.askChat(pageRoot, { page: true });
})();
