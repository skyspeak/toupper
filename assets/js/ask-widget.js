/* ToUpper — the "Ask our Agents" pop-up on the main pages.
 *
 * Up front this only draws a launcher and an empty panel. The guide (about
 * 60 KB), the matcher and the chat engine load the first time someone opens
 * it, so visitors who never ask pay nothing for it.
 *
 * Opens from the launcher, from any .askcta link on the page, or from #ask in
 * the URL, so the pop-up itself can be linked to.
 */
(function () {
  'use strict';

  if (document.querySelector('[data-ask-page]')) return;   /* the full page is already the chat */

  var esc = TU.esc;
  var FACES = ['sam', 'bill', 'sarah'];
  var chat = null, loading = null;
  var touch = window.matchMedia && matchMedia('(hover: none)').matches;

  function faces() {
    return FACES.map(TU.agent).filter(Boolean).map(function (a) { return TU.mark(a); }).join('');
  }

  var launch = document.createElement('button');
  launch.type = 'button';
  launch.className = 'aoa-launch';
  launch.setAttribute('aria-haspopup', 'dialog');
  launch.setAttribute('aria-expanded', 'false');
  launch.setAttribute('aria-controls', 'aoaPanel');
  launch.innerHTML = '<span class="aoa-faces" aria-hidden="true">' + faces() + '</span><span class="aoa-label">Ask our Agents</span>';

  var panel = document.createElement('section');
  panel.className = 'aoa-panel';
  panel.id = 'aoaPanel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'aoaTitle');
  panel.hidden = true;
  panel.innerHTML =
    '<header class="aoa-head">' +
      '<span class="aoa-faces" aria-hidden="true">' + faces() + '</span>' +
      '<div class="aoa-title"><b id="aoaTitle">Ask our Agents</b>' +
        '<span>Ten specialists, one area each</span></div>' +
      '<button type="button" class="aoa-close" aria-label="Close Ask our Agents">×</button>' +
    '</header>' +
    '<div class="aoa-body" data-ask-root>' +
      '<div class="aoa-scroll"><div class="thread" data-ask-thread role="log" aria-live="polite"></div></div>' +
      '<form class="askbar aoa-bar" data-ask-form novalidate>' +
        '<label class="vh" for="aoaInput">Ask our Agents about an enterprise feature</label>' +
        '<input class="input" id="aoaInput" data-ask-input type="text" autocomplete="off" enterkeyhint="send" ' +
          'placeholder="Try “SCIM” or “Okta login”" maxlength="160">' +
        '<button class="btn" type="submit">Ask</button>' +
      '</form>' +
      '<p class="aoa-foot">The agents are a design fiction, and answers come from a hand-written guide. ' +
        '<a href="/what">Open the full page</a></p>' +
    '</div>';

  document.body.appendChild(launch);
  document.body.appendChild(panel);
  TU.paintMarks(launch);
  TU.paintMarks(panel);

  function load(src) {
    return new Promise(function (resolve, reject) {
      if (document.querySelector('script[src="' + src + '"]')) { resolve(); return; }
      var s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = function () { reject(new Error('could not load ' + src)); };
      document.body.appendChild(s);
    });
  }

  function ensure() {
    if (chat) return Promise.resolve(chat);
    if (loading) return loading;
    var thread = panel.querySelector('[data-ask-thread]');
    thread.innerHTML = '<div class="msg bot"><p class="unk-l">Getting the agents…</p></div>';
    loading = load('/data/glossary.js')
      .then(function () { return load('/assets/js/ask-match.js'); })
      .then(function () { return load('/assets/js/ask.js'); })
      .then(function () {
        /* A browser can hold an older engine from before a deploy. If what
           loaded doesn't match this page, fetch a fresh copy past the cache. */
        if (typeof TU.askChat === 'function' && window.TU_MATCH && window.TOUPPER_GLOSSARY) return;
        var v = '?v=' + Date.now();
        return load('/data/glossary.js' + v)
          .then(function () { return load('/assets/js/ask-match.js' + v); })
          .then(function () { return load('/assets/js/ask.js' + v); })
          .then(function () { if (typeof TU.askChat !== 'function') throw new Error('stale engine'); });
      })
      .then(function () {
        thread.innerHTML = '';
        chat = TU.askChat(panel.querySelector('[data-ask-root]'), {
          page: false,
          scroller: panel.querySelector('.aoa-scroll'),
          greeting: 'Name what a big customer asked for, and the agent who owns it will answer.'
        });
        return chat;
      })
      .catch(function () {
        loading = null;
        thread.innerHTML = '<div class="msg bot"><p>The agents didn’t load. <a href="/what">Try the full page</a>.</p></div>';
      });
    return loading;
  }

  function open() {
    if (!panel.hidden) return;
    panel.hidden = false;
    launch.setAttribute('aria-expanded', 'true');
    document.documentElement.classList.add('aoa-open');
    ensure().then(function (c) { if (c && !touch) c.focus(); });
  }

  function close() {
    if (panel.hidden) return;
    panel.hidden = true;
    launch.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('aoa-open');
    launch.focus({ preventScroll: true });
  }

  /* Open straight into a topic: used by "Ask Sam L. about SSO" on the bench. */
  TU.openAsk = function (topicId) {
    open();
    ensure().then(function (c) { if (c && topicId) c.askId(topicId); });
  };

  launch.addEventListener('click', open);
  panel.querySelector('.aoa-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  /* In-page "Ask our Agents" links open the pop-up instead of leaving. */
  Array.prototype.forEach.call(document.querySelectorAll('.askcta, [data-open-ask]'), function (a) {
    a.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;   /* let "open in new tab" work */
      e.preventDefault();
      open();
    });
  });

  if (location.hash === '#ask') open();
})();
