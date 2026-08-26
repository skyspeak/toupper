# ToUpper

> `smb.toUpper() → enterprise`

A one-page bench of **nine specialist agents** for the enterprise layer — the
product work a company has to ship before a large customer will sign: SSO,
directory provisioning, custom roles, audit logs, contract billing, SOC 2, VPC
deployment, an SLA someone can actually staff.

The thesis: these problems repeat almost identically from company to company.
That is exactly what makes them a good fit for a narrow agent — one that carries
the specs, the vendor quirks and the post-mortems for a single area, asks the
question a practitioner would ask first, and says plainly where it stops.

**This is a concept demo.** The nine agents are a design fiction. They are
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
| **C · Index** | `variant-c.html` | Utilitarian reference. All eighteen areas as a table with group and expert count, filterable by group, compliance and revenue as collapsed reference blocks. For teams who already know what they need. |

All three share `data/*.js` and `assets/js/lib.js` (filtering, ranking, row
rendering); each has its own thin controller in `assets/js/{a,b,c}.js`.

## The nine agents

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
| **Nina Nines** | Onboarding, SLA & support | Signature to activation, and promises you can staff |

Yes, the names are puns — SAML assertion, permission, pro rata, Sarbanes-Oxley,
risk assessment, audit trail, Terraform, pagination, nine nines. The joke is
load-bearing: the names are the most memorable thing about a bench of nine, and
the contrast with a completely straight spec underneath is the tone the whole
page is going for.

Nine agents cover all eighteen practice areas. Each publishes the same five
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
shows the question that agent would open with. Nothing is transmitted.

All three share `data/*.js` and `assets/js/lib.js` — including `TU.bench()`, one
controller handling list rendering, expansion, briefing and the form, so each
variant only wires its own way of choosing areas.

## The practice areas

Adapted from the twelve chapters of [enterpriseready.io](https://www.enterpriseready.io/)
— Replicated's study of fifty leading SaaS applications — and split further where
the market has produced genuine specialists rather than generalists:

- **Money** — packaging, pricing, billing & revenue operations, procurement
- **Identity & Access** — SSO, provisioning, permissions, multi-tenancy
- **Trust & Compliance** — audit logs, security posture, compliance, privacy & residency
- **Operations & Scale** — deployment, admin console, API & integrations, reporting
- **Service & Adoption** — SLA & support, onboarding & migration

Splitting billing out of packaging, and provisioning out of SSO, is the main
departure from the source: those are where people actually specialise.

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

Then open <http://localhost:4321>. No build step, no dependencies.

```
toupper/
├── index.html          variant A — story
├── variant-b.html      variant B — triage
├── variant-c.html      variant C — index
├── assets/
│   ├── css/app.css     design system, all three variants
│   └── js/
│       ├── lib.js      shared data access, filtering, row rendering
│       └── a.js b.js c.js   per-variant controllers
├── data/
│   ├── domains.js      18 practice areas in 5 groups
│   ├── agents.js       9 agent specs, incl. written transcripts
│   └── tracks.js       compliance and revenue content
├── vercel.json         static deploy config, no build
└── serve.js            zero-dependency local server
```

Data lives in `data/*.js` as globals rather than JSON so the page also works
opened straight from the filesystem.

## Hardening

There is no inline JavaScript and no `style=""` attribute anywhere on the site,
which lets `vercel.json` serve a CSP with **no `unsafe-inline` at all**:

```
default-src 'none'; script-src 'self';
style-src 'self' https://fonts.googleapis.com;
font-src https://fonts.gstatic.com; img-src 'self' data:;
form-action 'none'; base-uri 'none'; frame-ancestors 'none';
object-src 'none'; upgrade-insecure-requests
```

`default-src 'none'` means anything not named above — XHR, websockets, workers,
frames, media — is refused outright. Avatar colours are applied through the
CSSOM (`el.style.backgroundColor`), which `style-src` does not govern, rather
than through style attributes. Alongside it: HSTS with preload, `nosniff`,
`X-Frame-Options: DENY`, `Referrer-Policy: no-referrer`, a `Permissions-Policy`
denying camera/mic/geolocation/payment/USB, and COOP/CORP set to `same-origin`.

Every value interpolated into markup — including our own data — goes through
`esc()`. `serve.js` and this README are excluded from the deployment via
`.vercelignore`. The policy was verified in-browser against all three variants
with zero violations.

## Deploying

Vercel, zero-config — `vercel.json` sets `framework: null` and serves the repo
root as static files. Either import the repo at
[vercel.com/new](https://vercel.com/new), or run `npx vercel` from this directory.

## If this were built for real

1. Real vetted profiles and an intake queue behind the form.
2. Track which chips get selected — the demand distribution across practice areas
   is the most valuable thing this page could learn.
3. Make one agent real end to end — Sam L. Assertion is the best candidate,
   because the output (an IdP matrix, a migration plan) is checkable by a human
   expert who knows the domain.
4. Publish the corpus behind each agent. For a claim like this, showing the
   grounding is the marketing.

## History

Earlier revisions in git history include a multi-page version (separate
directory, per-area pages, expert profiles, and an eighteen-question readiness
scorecard) at commit `a2c89e9`, and the human-expert directory that preceded the
agent bench at `d073005`, should any of it be worth reviving.
