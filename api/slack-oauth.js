/* GET /api/slack-oauth — completes "Add to Slack" for other workspaces.
 *
 * Slack redirects here with ?code= after someone approves the install. The
 * code is exchanged to finish the installation. The token that comes back is
 * deliberately not stored: /toupper only answers slash commands, which never
 * need it.
 *
 * Needs SLACK_CLIENT_ID and SLACK_CLIENT_SECRET (Slack app, Basic Information).
 * Setup: growth/03-slack-command.md
 */
'use strict';

function page(res, status, title, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end('<!doctype html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">' +
    '<title>' + title + ' — ToUpper</title><link rel="stylesheet" href="/assets/css/app.css"></head>' +
    '<body><main class="wrap"><section class="hero"><h1>' + title + '</h1><p>' + body + '</p>' +
    '<p class="mt-1"><a class="btn" href="/">Back to ToUpper</a></p></section></main></body></html>');
}

module.exports = async function handler(req, res) {
  var url = new URL(req.url, 'http://localhost');
  var id = process.env.SLACK_CLIENT_ID, secret = process.env.SLACK_CLIENT_SECRET;

  if (!id || !secret) return page(res, 503, 'Not set up yet', 'The Slack app isn’t configured on this deployment.');
  if (url.searchParams.get('error')) return page(res, 200, 'Install cancelled', 'Nothing was added to your Slack. You can try again any time.');

  var code = url.searchParams.get('code');
  if (!code || code.length > 256) return page(res, 400, 'Something went wrong', 'That install link was incomplete. Try adding ToUpper to Slack again.');

  try {
    var out = await fetch('https://slack.com/api/oauth.v2.access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: id, client_secret: secret, code: code,
        redirect_uri: 'https://toupper.vercel.app/api/slack-oauth'
      }).toString(),
      signal: AbortSignal.timeout(8000)
    });
    var j = await out.json();
    if (!j.ok) throw new Error(j.error || 'oauth_failed');
    console.log('[slack:installed]', j.team && j.team.name);
    return page(res, 200, 'ToUpper is in your Slack',
      'Try <code>/toupper scim</code>, <code>/toupper soc 2</code> or <code>/toupper rag</code> in any channel.');
  } catch (e) {
    console.error('[slack:install-failed]', String(e && e.message));
    return page(res, 502, 'Install didn’t finish', 'Slack didn’t confirm the install. Try adding ToUpper to Slack again.');
  }
};
