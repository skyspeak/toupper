# Growth playbook

Twenty growth hacks built around what ToUpper already has: a guide people forward,
estimates that change with their situation, ten agents with names people
remember, and a lead store that records where each lead came from.

Each file below is a step-by-step guide with the copy written and ready to use.
Swap anything in `[brackets]` for your own details before sending.

| # | Hack | Why it works here | Effort | First signal |
|---|---|---|---|---|
| 01 | [Answer with a link that's already set up](01-community-answers.md) | Estimate links carry the asker's own situation | 15 min a day | Week 1 |
| 02 | [Email the companies hiring for it](02-job-post-triggers.md) | A job post for "SOC 2 lead" is a public admission of the problem | 30 min a day | Week 2 |
| 03 | [Put /toupper in their Slack](03-slack-command.md) | Every answer is posted where the whole team sees it | Half a day, once | Week 3 |
| 04 | [The Enterprise Bench card series](04-bench-cards.md) | Puns get shared; the specs underneath get read | 11 posts, cards made | Week 1 |
| 05 | [Estimate wars](05-estimate-wars.md) | A number people disagree with, and a link to prove theirs | 6 posts | Week 1 |
| 06 | [Tell the vendors they're listed](06-youre-listed.md) | 55 companies already benefit from being linked | 2 hours | Week 2 |
| 07 | [VC platform office hours](07-vc-office-hours.md) | One partner reaches a whole portfolio at the trigger moment | 1 email, 1 session | Week 3 |
| 08 | [Answer the questionnaire line by line](08-questionnaire-answers.md) | People search the literal question they were sent | 10 posts | Week 4 |
| 09 | [An honest Show HN](09-show-hn.md) | "The agents are fake, the estimates aren't" is the hook | 1 day | Launch day |
| 10 | [The Friday questionnaire rescue](10-questionnaire-rescue.md) | Hand-done work becomes case studies and proof | 10 rescues | Week 2 |
| 11 | [Open the data on GitHub](11-open-dataset.md) | Awesome lists and docs link to open datasets for years | 2 hours, dataset built | Week 2 |
| 12 | [Give away a security page template](12-security-page-template.md) | Every copy with the credit link points reviewers back | Done, 3 posts | Week 2 |
| 13 | [Get the buyers to send it](13-buyer-side.md) | One security reviewer reaches every vendor they assess | 20 messages | Week 4 |
| 14 | [The sales rep's cheat sheet](14-ae-cheat-sheet.md) | Reps hear "do you support SCIM?" first, and forward it to the CTO | Done, 2 posts | Week 2 |
| 15 | ["How we closed our first enterprise deal"](15-first-deal-interviews.md) | Founders share stories about themselves | 1 interview a week | Week 3 |
| 16 | [Referral links for fractional CTOs and advisors](16-referral-partners.md) | They meet startups the week the deal gets serious | 15 emails | Week 3 |
| 17 | [The podcast and newsletter guest circuit](17-podcast-circuit.md) | Hosts need a specific topic, and the puns make it memorable | 20 pitches | Week 5 |
| 18 | [Name-tag stickers at SaaS conferences](18-conference-stickers.md) | "Hello, my name is Sarah Baines-Oxley" gets kept and scanned | Sheet made, 1 event | Event day |
| 19 | [The Enterprise Ask Report](19-enterprise-ask-report.md) | Writers quote numbers and link to the source | 2 days a quarter | Week 6 |
| 20 | [A five-day email course](20-email-course.md) | Catches people a month before they need help | 2 hours, once | Week 2 |

## Before you start (30 minutes)

**1. Get told about leads the moment they arrive.** Create a Slack incoming
webhook (Slack, Apps, Incoming Webhooks, add to a private channel), then:

```bash
cd toupper && vercel env add LEAD_WEBHOOK_URL production
```

Paste the webhook URL, then redeploy with `vercel --prod`. Leads are stored
either way; this just pings you.

**2. Only share tracked links.** Every link these guides use is in
[`links.csv`](links.csv), tagged by hack. Leads record the tag, so once a week run:

```bash
node tools/leads.js --sources   # which hack each lead came from
node tools/leads.js --terms     # what people asked about
```

Double down on whatever is producing leads, and drop whatever isn't after
three weeks.

**3. Read the rules below once.** They protect the one asset these hacks all
spend: people's trust that ToUpper is useful rather than promotional.

## The first 30 days

| Week | Do | Why this order |
|---|---|---|
| 1 | 04 cards (3 a week), 05 estimate wars (2 posts), 01 answers daily | Builds a visible body of posts before you reach out to anyone |
| 2 | 02 job-post emails (10 a day), 06 vendor emails, 10 open rescue slots | Outreach lands better when your profile already shows the work |
| 3 | 03 Slack command live, 07 first VC pitch | Needs a few people who've used the guide to vouch for it |
| 4 | 08 questionnaire posts, 09 Show HN once the rescues give you stories to tell | Launch with proof, not just a link |

## Days 31 to 60

| Week | Do | Why this order |
|---|---|---|
| 5 | 20 email course live, 11 dataset repo, 12 template post | Gives every later hack somewhere to send people who aren't ready yet |
| 6 | 14 cheat sheet, 16 first 15 partner emails, 15 first interview | Different audiences, same week, so you learn which one replies |
| 7 | 13 buyer messages, 17 podcast pitches, 19 survey opens | Buyers and hosts respond better once there's a repo, a template and interviews to point to |
| 8 | 18 stickers at the nearest event, 19 report written from the survey | The report needs three weeks of responses; the event gives you a tally to add to it |

## Rules, not suggestions

- **Always say you built it.** In communities, emails and comments: "I built
  this" in the same message as the link. No second accounts, no asking friends
  to post it as if they found it.
- **Answer in full, then link.** The reply has to be useful if nobody clicks.
- **Be straight about what ToUpper is.** The agents are characters and the
  guide is written by hand. Don't describe them as working AI agents, and
  don't present the estimates as more than rough ranges.
- **Email like a person.** Real name, one relevant message, an easy opt-out,
  no scraped or guessed personal addresses. Stop after three emails.
- **Never sell a listing quietly.** If a vendor ever pays for placement, it
  gets labelled as sponsored on the page.
- **Stay within each community's rules.** Many subreddits and Slack groups ban
  self-promotion outright. Read the rules before posting, and where links
  aren't allowed, answer without one.

## What's in this folder

- `01`–`20` — the hacks, each with steps, copy, and what to measure
- `cards/` — 11 ready-to-post PNGs for hack 04 (1080x1350)
- `make_cards.py` — regenerates the cards after you edit an agent
- `dataset/` — the open dataset for hack 11 (`node tools/export-dataset.js` rebuilds it)
- `kits/security-page.html` — the security page template for hack 12
- `kits/ae-cheat-sheet.md` — the sales rep one-pager for hack 14
- `stickers/sheet-letter.png` — printable sticker sheet for hack 18 (`python3 growth/make_stickers.py` rebuilds it)
- `links.csv` — every tracked link, by hack
