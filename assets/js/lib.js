/* ToUpper — shared data access, filtering and agent rendering.
   No inline script and no style attributes anywhere on the site, so the CSP
   can refuse unsafe-inline. Everything interpolated into markup, including
   our own data, goes through esc(). */
(function () {
  'use strict';

  var D = window.TOUPPER_DOMAINS || [];
  var A = window.TOUPPER_AGENTS || [];
  var TRACKS = window.TOUPPER_TRACKS || [];

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  var TU = window.TU = {
    domains: D, agents: A, tracks: TRACKS, esc: esc,

    domain: function (slug) { return D.filter(function (d) { return d.slug === slug; })[0]; },
    name: function (slug) { var d = TU.domain(slug); return d ? d.name : slug; },
    chip: function (slug) { var d = TU.domain(slug); return d ? d.chip : slug; },
    agent: function (id) { return A.filter(function (a) { return a.id === id; })[0]; },
    agentsFor: function (slug) { return A.filter(function (a) { return a.areas.indexOf(slug) > -1; }); },

    hits: function (a, picked) {
      return picked.filter(function (s) { return a.areas.indexOf(s) > -1; });
    },

    /* Any selected area matches; more overlap ranks higher. With nothing
       picked the bench keeps its authored order, which follows the deal. */
    filter: function (picked) {
      if (!picked.length) return A.slice();
      return A.filter(function (a) { return TU.hits(a, picked).length; })
        .sort(function (x, y) {
          return TU.hits(y, picked).length - TU.hits(x, picked).length ||
                 A.indexOf(x) - A.indexOf(y);
        });
    },

    summary: function (picked, n) {
      if (!picked.length) return 'All ' + n + ' agents — pick an area to narrow it down';
      var labels = picked.map(function (s) { return TU.chip(s).toLowerCase(); });
      var said = labels.length > 3
        ? labels.slice(0, 3).join(', ') + ' and ' + (labels.length - 3) + ' more'
        : labels.join(', ');
      return n + (n === 1 ? ' agent covers ' : ' agents cover ') + said;
    },

    hue: function (id) {
      var h = 0;
      for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 360;
      return h;
    },

    mark: function (a) {
      return '<span class="mark-sq" aria-hidden="true" data-hue="' + TU.hue(a.id) + '">' +
        esc(a.initials) + '</span>';
    },

    /* One agent, collapsed to a scannable row. */
    agentRow: function (a, picked, open) {
      var areas = a.areas.map(function (s) {
        var on = picked.indexOf(s) > -1;
        return '<span class="ax' + (on ? ' on' : '') + '">' + esc(TU.chip(s)) + '</span>';
      }).join('');
      return '<div class="agent' + (open ? ' open' : '') + '">' +
        '<button class="ahead" data-id="' + esc(a.id) + '" aria-expanded="' + (open ? 'true' : 'false') + '">' +
          TU.mark(a) +
          '<span class="ab">' +
            '<span class="ac-row"><span class="acode">' + esc(a.name) + '</span>' +
              '<span class="atitle">' + esc(a.title) + '</span></span>' +
            '<span class="amandate">' + esc(a.mandate) + '</span>' +
            '<span class="axs">' + areas + '</span>' +
          '</span>' +
          '<span class="caret">' + (open ? '–' : '+') + '</span>' +
        '</button>' +
        (open ? TU.agentDetail(a) : '') +
      '</div>';
    },

    agentDetail: function (a) {
      var turns = a.sample.map(function (t) {
        var body = Array.isArray(t.text)
          ? t.text.map(function (l) { return '<p>' + esc(l) + '</p>'; }).join('')
          : '<p>' + esc(t.text) + '</p>';
        return '<div class="turn ' + (t.role === 'you' ? 'you' : 'bot') + '">' +
          '<span class="who">' + (t.role === 'you' ? 'You' : esc(a.short)) + '</span>' +
          '<div class="said">' + body + '</div></div>';
      }).join('');

      return '<div class="adetail">' +
        '<p class="aopinion">“' + esc(a.opinion) + '”</p>' +

        '<div class="acols">' +
          '<div><span class="eyebrow">Grounded in</span><ul class="list">' +
            a.grounding.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') +
          '</ul></div>' +
          '<div><span class="eyebrow">Gives you back</span><ul class="list">' +
            a.produces.map(function (p) { return '<li>' + esc(p) + '</li>'; }).join('') +
          '</ul></div>' +
        '</div>' +

        '<div class="aqa">' +
          '<div><span class="eyebrow">Opens with</span><p class="aq">' + esc(a.opens) + '</p></div>' +
          '<div><span class="eyebrow">Hands to a human</span><p class="ah">' + esc(a.handoff) + '</p></div>' +
        '</div>' +

        '<div class="transcript">' +
          '<span class="eyebrow">A session, roughly</span>' +
          '<div class="turns">' + turns + '</div>' +
          '<p class="tiny muted">Written by hand to show the shape of a session. Nothing is generated here.</p>' +
        '</div>' +

        '<button class="btn btn-sm" data-brief="' + esc(a.id) + '">Brief ' + esc(a.short) + '</button>' +
      '</div>';
    },

    trackAgents: function (track) {
      var areas = TU.trackAreas(track);
      return A.filter(function (a) {
        return a.areas.some(function (s) { return areas.indexOf(s) > -1; });
      });
    },
    trackAreas: function (track) {
      var out = [];
      track.rows.forEach(function (r) {
        r.a.forEach(function (s) { if (out.indexOf(s) === -1) out.push(s); });
      });
      return out;
    },



    /* Colour is applied through the CSSOM, which style-src does not govern,
       so no style attribute is ever parsed from markup. */
    paintMarks: function (root) {
      var els = (root || document).querySelectorAll('[data-hue]');
      Array.prototype.forEach.call(els, function (el) {
        if (el.dataset.painted) return;
        el.style.backgroundColor = 'hsl(' + Number(el.getAttribute('data-hue')) + ' 30% 38%)';
        el.dataset.painted = '1';
      });
    }
  };
  /* ------------------------------------------------------------------ *
   * Shared bench controller. All three variants render the same list,
   * expand the same way, and feed the same brief form; they differ only
   * in how you choose areas. Each variant wires its own selector and
   * calls bench.select().
   * ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ *
   * Lead capture. Same-origin POST to /api/lead, so the CSP never has to
   * name a third-party host. Two entry points share this: the brief form
   * (high intent) and the shortlist block below the bench (low friction).
   * ------------------------------------------------------------------ */
  var LOADED_AT = Date.now();

  TU.variant = function () {
    var c = document.body.className || '';
    return c.indexOf('vb') > -1 ? 'b' : c.indexOf('vc') > -1 ? 'c' : 'a';
  };

  TU.validEmail = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim()); };

  TU.capture = function (payload) {
    payload.variant = TU.variant();
    payload.page = location.pathname;
    payload.elapsed_ms = Date.now() - LOADED_AT;
    return fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) {
      return r.json().then(function (j) { return { status: r.status, body: j }; });
    });
  };

  /* One honest sentence per outcome — never claim delivery that did not happen. */
  TU.captureMessage = function (res) {
    if (res.status === 429) return { ok: false, text: 'That is a lot of submissions in a minute. Try again shortly.' };
    if (res.status === 422) return { ok: false, text: 'That email address does not look right.' };
    if (!res.body || res.body.ok !== true) return { ok: false, text: 'Something went wrong sending that. Try again?' };
    if (res.body.stored) return { ok: true, text: 'Got it — we will come back within two business days.' };
    if (res.body.deferred) return { ok: true, text: 'Received. Delivery to the configured destination failed, so it is sitting in the server log.' };
    return { ok: true, text: 'Captured — though this build has no destination configured, so nothing was actually delivered. Set LEAD_WEBHOOK_URL to make it real.' };
  };

  /* The low-friction block: one field, and copy that knows what you picked. */
  TU.captureBlock = function (getContext) {
    var box = document.getElementById('capture');
    if (!box) return { refresh: function () {} };

    function copy() {
      var ctx = getContext();
      if (ctx.areas.length && ctx.agents.length) {
        var names = ctx.agents.slice(0, 3).map(function (a) { return a.short; });
        var more = ctx.agents.length > 3 ? ' and ' + (ctx.agents.length - 3) + ' more' : '';
        return {
          h: 'Not ready to brief anyone?',
          p: 'Get this shortlist — ' + names.join(', ') + more +
             ' — plus the readiness checklist for ' +
             ctx.areas.map(TU.chip).map(function (c) { return c.toLowerCase(); }).join(', ') + '.'
        };
      }
      return {
        h: 'Not ready to brief anyone?',
        p: 'Get the enterprise readiness checklist — the eighteen things large buyers ask for, and the order most teams end up doing them in.'
      };
    }

    function paint(state) {
      var c = copy();
      if (state && state.done) {
        box.innerHTML = '<div class="capture done"><p class="cdone">' + esc(state.text) + '</p></div>';
        return;
      }
      box.innerHTML =
        '<div class="capture">' +
          '<div class="ctext"><h3>' + esc(c.h) + '</h3><p>' + esc(c.p) + '</p></div>' +
          '<form class="crow" id="captureForm" novalidate>' +
            '<label class="hp" aria-hidden="true">Company website' +
              '<input type="text" id="capHp" tabindex="-1" autocomplete="off"></label>' +
            '<label class="vh" for="capEmail">Work email</label>' +
            '<input class="input" id="capEmail" type="email" placeholder="you@company.com" autocomplete="email">' +
            '<button class="btn" type="submit">Send it</button>' +
          '</form>' +
          '<p class="tiny muted cnote">One email, no list, no follow-up sequence.' +
            (state && state.error ? ' <span class="cerr">' + esc(state.error) + '</span>' : '') + '</p>' +
        '</div>';

      document.getElementById('captureForm').addEventListener('submit', function (e) {
        e.preventDefault();
        var email = document.getElementById('capEmail').value;
        if (!TU.validEmail(email)) { paint({ error: 'That email address does not look right.' }); return; }
        var btn = this.querySelector('button');
        btn.disabled = true; btn.textContent = 'Sending…';
        var ctx = getContext();
        TU.capture({
          kind: 'shortlist',
          email: email,
          company_website: document.getElementById('capHp').value,
          areas: ctx.areas.map(TU.name),
          agents: ctx.agents.map(function (a) { return a.name; })
        }).then(function (res) {
          var m = TU.captureMessage(res);
          if (m.ok) paint({ done: true, text: m.text }); else paint({ error: m.text });
        }).catch(function () {
          paint({ error: 'Could not reach the server. Try again?' });
        });
      });
    }

    paint();
    return { refresh: function () { if (!box.querySelector('.done')) paint(); } };
  };

  TU.bench = function (cfg) {
    cfg = cfg || {};
    var $ = function (id) { return document.getElementById(id); };
    var state = { picked: [], open: null, briefed: null };
    var capture = TU.captureBlock(function () {
      return { areas: state.picked, agents: TU.filter(state.picked).slice(0, 4) };
    });

    function render() {
      var list = TU.filter(state.picked);
      var count = $('count'), clear = $('clear');
      if (count) count.textContent = TU.summary(state.picked, list.length);
      if (clear) clear.classList.toggle('hide', !state.picked.length);
      $('agents').innerHTML = list.length
        ? list.map(function (a) { return TU.agentRow(a, state.picked, state.open === a.id); }).join('')
        : '<div class="empty">No agent covers that yet. Describe it below and a human will pick it up.</div>';
      TU.paintMarks($('agents'));
    }

    function select(next, scroll) {
      state.picked = next;
      if (cfg.onSelect) cfg.onSelect(state.picked);
      render();
      if (capture) capture.refresh();
      if (scroll && $('results')) $('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    $('agents').addEventListener('click', function (e) {
      var brief = e.target.closest('[data-brief]');
      if (brief) { briefFor(brief.getAttribute('data-brief')); return; }
      var head = e.target.closest('.ahead'); if (!head) return;
      var id = head.getAttribute('data-id');
      state.open = state.open === id ? null : id;
      render();
    });

    var clearBtn = $('clear');
    if (clearBtn) clearBtn.addEventListener('click', function () { select([], false); });

    function briefFor(id) {
      state.briefed = id;
      paintContext();
      $('contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('what').focus({ preventScroll: true });
    }

    function paintContext() {
      var bits = [];
      if (state.briefed) {
        var a = TU.agent(state.briefed);
        if (a) bits.push('Briefing <b>' + esc(a.name) + '</b> — ' + esc(a.title.toLowerCase()) + '.');
      }
      if (state.picked.length) {
        bits.push('Areas: <b>' + state.picked.map(TU.name).map(esc).join('</b>, <b>') + '</b>.');
      }
      var box = $('context');
      if (box) box.innerHTML = bits.length ? '<p class="note">' + bits.join(' ') + '</p>' : '';
    }

    function routed() {
      var picks = TU.filter(state.picked).slice(0, 3);
      if (state.briefed) {
        var a = TU.agent(state.briefed);
        if (a) picks = [a].concat(picks.filter(function (x) { return x.id !== a.id; })).slice(0, 3);
      }
      return picks;
    }

    var form = $('form');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var what = $('what').value.trim();
      var email = ($('email') || {}).value || '';
      var err = $('formError');

      if (!what) { $('what').focus(); return; }
      if (!TU.validEmail(email)) {
        if (err) err.textContent = 'We need a work email to come back to.';
        if ($('email')) $('email').focus();
        return;
      }
      if (err) err.textContent = '';

      var btn = this.querySelector('button[type=submit]');
      btn.disabled = true; btn.textContent = 'Sending…';
      var picks = routed();
      var self = this;

      TU.capture({
        kind: 'brief',
        email: email,
        name: ($('name') || {}).value || '',
        situation: what,
        company_website: ($('hp') || {}).value || '',
        areas: state.picked.map(TU.name),
        agents: picks.map(function (x) { return x.name; })
      }).then(function (res) {
        var m = TU.captureMessage(res);
        if (!m.ok) {
          btn.disabled = false; btn.textContent = 'Route this brief';
          if (err) err.textContent = m.text;
          return;
        }
        self.outerHTML =
          '<p class="note accent">' + esc(m.text) + '</p>' +
          '<div class="facts mt-2">' + esc(what) + '</div>' +
          (picks.length
            ? '<p class="body small mt-1">Routed to <b>' +
              picks.map(function (x) { return esc(x.name); }).join('</b>, <b>') +
              '</b>, opening with: <em>' + esc(picks[0].opens) + '</em></p>'
            : '');
      }).catch(function () {
        btn.disabled = false; btn.textContent = 'Route this brief';
        if (err) err.textContent = 'Could not reach the server. Try again?';
      });
    });

    return { render: render, select: select, state: state };
  };
})();
