# 03 · Put /toupper in their Slack

When someone types `/toupper soc 2` in a channel, the answer posts for everyone
in that channel. Colleagues see the guide in the place they already argue about
roadmaps, and the button links back with a tag, so every install spreads itself.

**Effort:** half a day, once · **First signal:** week 3 · **Measure:** leads with `source = slack`

The code is already in the repo and tested: `api/slack.js` (answers the
command, verifies Slack's signature on every request) and `api/slack-oauth.js`
(finishes installs in other workspaces).

## Step by step

### 1. Create the Slack app (10 minutes)

1. Go to [api.slack.com/apps](https://api.slack.com/apps) → **Create New App** → **From a manifest**.
2. Pick your own workspace, choose YAML, and paste:

```yaml
display_information:
  name: ToUpper
  description: What a big customer's request involves, what it takes to build, and what to decide first.
  background_color: "#111418"
features:
  bot_user:
    display_name: ToUpper
    always_online: false
  slash_commands:
    - command: /toupper
      url: https://toupper.vercel.app/api/slack
      description: What it is, what it takes to build, what to decide first
      usage_hint: scim · soc 2 · rag
      should_escape: false
oauth_config:
  redirect_urls:
    - https://toupper.vercel.app/api/slack-oauth
  scopes:
    bot:
      - commands
settings:
  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```

3. Click **Create**.

### 2. Give Vercel the app's secrets (5 minutes)

On the app's **Basic Information** page, copy the three values, then:

```bash
cd toupper
vercel env add SLACK_SIGNING_SECRET production
vercel env add SLACK_CLIENT_ID production
vercel env add SLACK_CLIENT_SECRET production
vercel --prod
```

Without the signing secret the command refuses every request, by design.

### 3. Try it in your workspace (5 minutes)

**Install App** → **Install to Workspace**, then in any channel:

```
/toupper scim
/toupper how long does soc 2 take
/toupper help
```

Answers post in the channel. `help` and unknown topics reply only to you.

### 4. Let other companies install it (15 minutes)

1. In the app: **Manage Distribution** → tick the checklist → **Activate Public Distribution**.
2. Your install link is:
   `https://slack.com/oauth/v2/authorize?client_id=YOUR_CLIENT_ID&scope=commands&redirect_uri=https://toupper.vercel.app/api/slack-oauth`
3. Share it with the launch copy below. Listing in the Slack Marketplace is optional
   and needs Slack's review; a direct install link works without it.

## Launch copy

### LinkedIn

> Your team is arguing in Slack about whether the enterprise customer really
> needs SCIM.
>
> Now you can type `/toupper scim` in that thread and get what it is, roughly
> what it takes to build (or buy), and the six questions to settle first,
> posted for everyone.
>
> Works for SOC 2, SSO, RAG, evals, audit logs, BYOK and 22 more.
> Free, and it doesn't read your messages; it only answers when you ask.
>
> Add it to Slack: first comment.

### Post in a founder community (where allowed)

> I built a small Slack command for the "customer wants X" conversations:
> `/toupper soc 2` posts what it is, a rough estimate and the questions to
> settle first. It only sees the text after the command. Install link:
> [link]. Tell me which topics it's missing.

### Message to people who've already used the guide

> You looked up [topic] on ToUpper a while ago. It now works inside Slack:
> `/toupper [topic]` posts the answer in the channel where the discussion is
> happening. Install: [link]

## Privacy line, if anyone asks

The command receives only what's typed after `/toupper`, plus the standard
fields Slack sends with every command, and it doesn't store any of it. When a
workspace installs the app, its name is written to the server log; the access
token Slack returns is thrown away.
