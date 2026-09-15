# ToUpper

> `smb.toUpper() → enterprise`

A one-page bench of **ten specialist agents** for the enterprise layer — the
product work a company has to ship before a large customer will sign: SSO,
directory provisioning, custom roles, audit logs, contract billing, SOC 2, VPC
deployment, an SLA someone can actually staff.

The thesis: these problems repeat almost identically from company to company.
That is exactly what makes them a good fit for a narrow agent — one that carries
the specs, the vendor quirks and the post-mortems for a single area, asks the
question a practitioner would ask first, and says plainly where it stops.

**This is a concept demo.** The ten agents are a design fiction. They are
archetypes assembled from bodies of public practice — specs, RFCs, audit
frameworks, published post-mortems — not portraits of, or claims about, any
real practitioner. Every transcript in `data/agents.js` is written by hand;
nothing is generated at runtime.

## Three variants

The same content and logic, three directions. Switch between them from the bar
at the top of any page.

| | | |
|---|---|---|
| **A · Story** | `index.html` | Narrative-led. Opens on the moment — a startup that just signed its first enterprise contract — then walks the ten weeks after signature. Each beat is clickable and selects the practice areas that week is really about, so the story doubles as the filter. |
| **B · Triage** | `variant-b.html` | Deal-desk tone, dark hero, no warm-up. "Which part of the deal is stuck?" — name the blocker, get the bench. Compliance and revenue sit side by side below the results. |
| **C · Index** | `variant-c.html` | Utilitarian reference. All twenty areas as a table with group and expert count, filterable by group, compliance and revenue as collapsed reference blocks. For teams who already know what they need. |

All three share `data/*.js` and `assets/js/lib.js` (filtering, ranking, row
rendering); each has its own thin controller in `assets/js/{a,b,c}.js`.

## The ten agents

| Agent | Covers | Mandate |
|---|---|---|
| **Sam L. Assertion** | SSO, provisioning | Email-and-password to federated identity without stranding a user |
| **Perry Mission** | Permissions, multi-tenancy | Three hardcoded roles into a model that survives the org chart |
| **Bill Prorata** | Billing, pricing, packaging | Contracts as data, so invoices reconcile |
| **Sarah Baines-Oxley** | Compliance, procurement | Certification sequencing, and the questionnaire machine |
| **Rick Assessment** | Security, privacy & residency | The posture that survives someone else's review |
| **Audrey Trail** | Audit logs, reporting | Everything that happened, provable months later |
| **Terry Form** | Deployment, admin console | Software into environments you do not operate |
| **Paige Nation** | API & integrations | A public contract you can stand behind |
| **Eva Luation** | RAG & evals, AI governance | AI features a buyer's security team will approve |
| **Nina Nines** | Onboarding, SLA & support | Signature to activation, and promises you can staff |

Yes, the names are puns — SAML assertion, permission, pro rata, Sarbanes-Oxley,
risk assessment, audit trail, Terraform, pagination, evaluation, nine nines. The joke is
load-bearing: the names are the most memorable thing about a bench of ten, and
the contrast with a completely straight spec underneath is the tone the whole
page is going for.

Ten agents cover all twenty practice areas. Each publishes the same five
things, which is what makes the claim inspectable rather than decorative:

- **Grounded in** — the body of practice it encodes
- **Gives you back** — four concrete artifacts, not "advice"
- **Opens with** — the diagnostic question it always asks first
- **Hands to a human** — the honest limit, stated up front
- **A session, roughly** — a written transcript showing the shape of the work

## Compliance and revenue

The two places enterprise deals actually die get their own section on every
variant, sourced from `data/tracks.js`:

- **Compliance** — SOC 2 Type II, ISO 27001, HIPAA & PCI, FedRAMP, GDPR &
  residency, the security questionnaire, audit evidence.
- **Revenue** — packaging, the value metric, contract shapes (ramps, commits,
  true-ups), order to cash, revenue recognition, deal desk.

Every line links to the practice areas it depends on, and each section has a
"show the N experts" control that selects those areas and jumps to the bench.

## Interaction model

Common to all three variants: selecting any number of practice areas narrows the
bench (an agent covering *any* selected area is shown, ranked by overlap; with
nothing selected the bench keeps its authored order, which follows the deal).
Any agent expands in place to its full spec. "Brief AGENT" carries its name and
your selected areas into the form at the bottom, which routes the brief and
shows the question that agent would open with.

All three share `data/*.js` and `assets/js/lib.js` — including `TU.bench()`, one
controller handling list rendering, expansion, briefing and the form, so each
variant only wires its own way of choosing areas.

## The practice areas

Twenty areas in six groups, organised around who inside a vendor usually owns
the work when a large customer asks for it:

- **Money** — packaging and tiers, pricing, billing and revenue operations, procurement
- **Identity & Access** — SSO, provisioning, permissions, org hierarchy and tenancy
- **Trust & Compliance** — audit logs, security posture, certifications, privacy and residency
- **Operations & Scale** — private deployment, admin console, public API, customer reporting
- **Service & Adoption** — uptime and support commitments, onboarding and migration
- **AI & Agents** — AI quality, RAG and guardrails; AI governance and data controls

The split is deliberately finer than "security" or "identity", because that is
where the specialists are: billing is a different job from packaging, and
provisioning a different job from single sign-on.

### AI & Agents

Enterprise procurement now runs a separate line of questions for AI features.
Is our data used for training? How do you measure hallucinations? What stops
prompt injection? Who approves what an agent does? Those get their own group,
their own agent (Eva Luation), a Week 5 beat in the story ("their AI review
arrives"), and seven topics in Ask our Agents: RAG, evals, AI guardrails, LLM
observability, AI data controls, AI governance (ISO 42001, the EU AI Act, NIST
AI RMF) and agent permissions.

## What is real and what is not

Real: the taxonomy, the compliance and revenue content, and the substance of
what each agent claims to know — those reflect how this work actually goes.

Not real: the agents themselves. There is no model behind them, no retrieval,
no session. The transcripts are hand-written illustrations of the *shape* a
session would take. Every page says so, in the header and under each transcript.

If this were built, the honest version of the claim would be: a narrow agent per
area, grounded in a curated corpus, that produces the four named artifacts and
escalates at the stated boundary.

## Running it

```bash
node serve.js 4321
```

Then open <http://localhost:4321>. No build step, no dependencies. `serve.js`
runs the `/api` functions the same way Vercel does, so lead capture works
locally — set `LEAD_WEBHOOK_URL` in the environment to test real delivery.

```
toupper/
├── index.html          variant A — story
├── variant-b.html      variant B — triage
├── variant-c.html      variant C — index
├── assets/
│   ├── css/app.css     design system, all three variants
│   └── js/
│       ├── lib.js      shared data access, filtering, row rendering
│       ├── ask.js      the chat engine, mountable as page or pop-up
│       ├── ask-widget.js  the Ask our Agents pop-up on the main pages
│       ├── ask-faces.js   agent marks in the full page header
│       ├── ask-match.js  resolves free text to a glossary term
│       └── a.js b.js c.js   per-variant controllers
├── 404.html            not-found page
├── data/
│   ├── domains.js      18 practice areas — only the fields pages read (4 KB)
│   ├── domains-reference.js  long-form corpus, deliberately NOT loaded (20 KB)
│   ├── agents.js       9 agent specs, incl. written transcripts
│   ├── glossary.js     21 features: explainer, estimate model, questions
│   └── tracks.js       compliance and revenue content
├── ask.html            the "what is this thing?" chat
├── sitemap.xml robots.txt
├── api/
│   ├── lead.js         lead capture endpoint (Vercel function)
│   └── what.js         per-term link previews for /what/:term
├── tools/
│   └── leads.js        read the leads back out of the store
├── vercel.json         static deploy config, no build
└── serve.js            local server — serves static files and runs /api
```

Data lives in `data/*.js` as globals rather than JSON so the page also works
opened straight from the filesystem.

## Lead capture

Two entry points, at different levels of commitment, both posting to
`POST /api/lead` — a same-origin Vercel function, so the CSP never has to name
a third-party host.

1. **The shortlist block**, directly under the bench. One email field, and copy
   that knows what you selected: *"Get this shortlist — Sam L., Bill — plus the
   readiness checklist for sso, billing."* This is the one that catches people
   who are researching rather than buying.
2. **The brief form**, at the bottom. Higher intent: situation, name, work
   email, routed to the agents that own it.

Every lead carries the context that makes it worth having — selected areas,
matched agents, which variant the visitor was on, and the page. Which areas get
selected is the most valuable thing this site could learn.

### Where leads go

A private [Vercel Blob](https://vercel.com/docs/vercel-blob) store called
`toupper-leads` is the system of record. One JSON object per lead, keyed by
timestamp so they sort chronologically. `BLOB_READ_WRITE_TOKEN` is injected
automatically because the store is linked to the project.

Private matters here: these records hold email addresses, and objects in the
store return `403` to anonymous requests. Only the read-write token can read
them.

The endpoint talks to the Blob REST API with plain `fetch`, so the deploy stays
dependency-free and needs no build step.

Read them back locally:

```
node tools/leads.js           # newest first
node tools/leads.js --areas   # which practice areas people actually pick
node tools/leads.js --csv     # export
```

That is a local script rather than an API route on purpose. No read endpoint
means no read endpoint to secure.

Optionally, set `LEAD_WEBHOOK_URL` (and `LEAD_WEBHOOK_AUTH`) to also fire a
notification at a Slack hook, Zapier, or a CRM. The payload carries a
pre-rendered one-line summary. A webhook failure never fails the request,
because the store already has the record.

If no store is configured at all, the endpoint falls back to demo mode, and the
UI says plainly that nothing was delivered. It never claims a delivery that did
not happen.

### Abuse handling

A honeypot field (`company_website`, positioned off-screen) and a minimum
time-on-form of 1.2s silently discard bot submissions — returning success, so
the bot learns nothing. Per-IP throttling allows five submissions a minute,
kept on `globalThis` so it survives module re-evaluation. Bodies are capped at
8KB (413 beyond), emails are validated server-side (422), and every field is
length-clamped before it leaves the process. A failed webhook still returns
success to the visitor and logs the full lead, so a downstream outage never
loses one.

## Weight

The whole of variant A is ~66 KB uncompressed, including all data and fonts
excluded. `data/domains.js` carries only the five fields the pages actually
read; the long-form material for each area (blurb, what-good-looks-like,
signals, engagements) lives in `data/domains-reference.js`, which no page
loads. It is the corpus an agent would be grounded in and the source for any
future writing — worth keeping, not worth shipping to every visitor.

## Accessibility

Every interactive control is a real `<button>` or `<a>`. Agent rows are proper
disclosures: `aria-expanded` on the trigger, `aria-controls` pointing at a
`role="region"` panel labelled with the agent's name. Each page opens with a
skip link to the bench. Focus rings are defined with `:focus-visible` at
element+pseudo specificity so they cannot lose the cascade to a class rule.

## Hardening

There is no inline JavaScript and no `style=""` attribute anywhere on the site,
which lets `vercel.json` serve a CSP with **no `unsafe-inline` at all**:

```
default-src 'none'; script-src 'self';
style-src 'self' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';
form-action 'none'; base-uri 'none'; frame-ancestors 'none';
object-src 'none'; upgrade-insecure-requests
```

`default-src 'none'` means anything not named above — websockets, workers,
frames, media — is refused outright. `connect-src 'self'` permits exactly one
thing: the lead POST back to our own origin. `form-action 'none'` still stands,
because capture goes through `fetch`, so no form may natively POST anywhere. Avatar colours are applied through the
CSSOM (`el.style.backgroundColor`), which `style-src` does not govern, rather
than through style attributes. Alongside it: HSTS with preload, `nosniff`,
`X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, a `Permissions-Policy`
denying camera/mic/geolocation/payment/USB, and COOP/CORP set to `same-origin`.

Every value interpolated into markup — including our own data — goes through
`esc()`. `serve.js` and this README are excluded from the deployment via
`.vercelignore`. The policy was verified in-browser against all three variants
with zero violations.

## Deployed

Live at **<https://toupper.vercel.app>**.

Zero-config: `vercel.json` sets `framework: null`, serves the repo root as
static files, and runs `api/lead.js` as a function. Redeploy with:

```
vercel --prod --scope skyspeak-gmailcoms-projects
```

Pushes to `main` deploy automatically; the GitHub repo is connected to the
project.

No custom domain yet. `toupper.com` is taken. `.io`, `.ai`, `.dev`, `.co`,
`.app` and `.sh` were all available when checked, between $10 and $160 a year,
and none of them are worth buying while the agents are still a design fiction.

## If this were built for real

1. Real vetted profiles and an intake queue behind the form.
2. Track which chips get selected — the demand distribution across practice areas
   is the most valuable thing this page could learn.
3. Make one agent real end to end — Sam L. Assertion is the best candidate,
   because the output (an IdP matrix, a migration plan) is checkable by a human
   expert who knows the domain.
4. Publish the corpus behind each agent. For a claim like this, showing the
   grounding is the marketing.

## Ask our Agents

A lead engine in the shape of a chat, in two places:

- **The pop-up** on every page of the main site. The launcher sits bottom-right;
  the in-page "Ask our Agents" link opens it too, and so does `#ask` on any URL.
  It goes full screen on phones. Only the launcher loads up front: the guide,
  matcher and engine (about 70 KB) load the first time someone opens it.
- **The full page** at **<https://toupper.vercel.app/what>**, where every answer
  has its own shareable URL. The pop-up links out to it for sharing.

Each answer comes from the agent who owns that area. Sam L. Assertion answers
SSO and SCIM, Sarah Baines-Oxley answers SOC 2, and so on, and the typing
indicator shows who is about to reply. The agents are still a design fiction,
and both surfaces say so.
Someone types what a big customer asked for, in whatever words they have ("we
need Okta login", "soc2", "scmi"), and the owning agent gives three things back:

1. **What it is**, in plain language, and why enterprise buyers ask for it.
2. **What it takes**: a rough range in engineer-weeks, a build-or-buy toggle
   that links three platforms worth a look, and a short list of "does this apply to you?" factors
   that move the estimate live.
3. **Answer these first**: six or seven questions, grouped by who in the org
   usually owns the answer, each with a line on why it matters.

In the pop-up, answers are shorter: the first three questions with a link to
the rest, and the estimate, factors and capture form intact.

It answers from `data/glossary.js`, a hand-written guide to twenty-eight
features, rather than a model generating text. That was a deliberate choice:
an estimate is only useful if it's the same every time someone asks, and a
generative answer that drifts would undermine the one thing the page is for.
The matcher (`assets/js/ask-match.js`) handles phrasing, acronyms and typos,
and was tested against 38 real-world queries before any UI existed.

### Built to be forwarded

- Every answer has its own URL, like `/what/scim`, and the estimate choices
  travel in it: `/what/scim?mode=buy&d=0,3` reopens exactly that view.
- `api/what.js` rewrites the title, description and Open Graph tags per term,
  so a pasted link previews properly in Slack and email, which don't run
  JavaScript. It also puts a plain version of the answer in `<noscript>`.
- **Copy for Slack** produces paste-ready text with the estimate and the
  questions; **Email it** opens a pre-written message; **Save as PDF** prints
  just that answer, with the checked factors only.
- `sitemap.xml` lists every term, so the guide is indexable. It is generated
  from the glossary, so it can't drift.

### As a lead engine

The full answer is free and never gated, because gating kills forwarding.
Capture comes after the value, at the bottom of each answer: a work email and
an optional timeline. Each lead arrives unusually well qualified:

```
ask   jane@acme.com
  asked:  SCIM · buy, 3–6 wks · needs it this quarter
  areas:  Provisioning & Directory Sync
  agents: Sam L. Assertion
  "Directory groups need to map to roles; SSO isn't built yet"
```

When someone asks about something the guide doesn't cover, they get the
closest matches plus a "tell us what you're building" form, logged as
`ask-missing`. That doubles as a demand signal for what to write next:

```
node tools/leads.js --terms
```

Entry points sit on all three variants of the main page.

## Strategy notes

[`VALIDATION.md`](VALIDATION.md) — ten ways to test whether anyone wants this,
cheapest first, none of which need the agents to work yet. Everything rests on
one assumption: that a blocked startup will hand the problem to an agent rather
than hire a person or paste it into a general assistant. Most of the tests can
come back negative inside a fortnight.

[`MARKETPLACE.md`](MARKETPLACE.md) — ten ways to grow each side once demand is
proven. Demand is humans, supply is agents. Because supply is manufactured
rather than recruited, the hard side flips: reaching people in the narrow window
when they're blocked, and proving a bench that cost nothing to create is worth
using.

## History

Earlier revisions in git history include a multi-page version (separate
directory, per-area pages, expert profiles, and an eighteen-question readiness
scorecard) at commit `a2c89e9`, and the human-expert directory that preceded the
agent bench at `d073005`, should any of it be worth reviving.
