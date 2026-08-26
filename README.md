# ToUpper

> `smb.toUpper() → enterprise`

A one-page directory for finding independent experts in the **enterprise layer** —
the product work a company has to ship before a large customer will sign: SSO,
directory provisioning, custom roles, audit logs, contract billing, SOC 2, VPC
deployment, an SLA someone can actually staff.

The thesis: a generation of product and platform leaders spent years shipping
exactly this inside scaling companies, and many now work independently. The
problems repeat almost identically from company to company, which makes that
expertise portable — and worth finding fast when a deal is on the line.

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
expert list (an expert matching *any* selected area is shown, ranked by how many
they cover, then by who is free). Any expert expands in place — bio, track
record, areas, rate band. "Request an intro" carries their name and your
selected areas into the form at the bottom, which renders a preview of what
would be sent, including the names we would come back with. Nothing is
transmitted.

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

## Data is fictional

Every expert, company, engagement and outcome in `data/experts.js` is invented to
demonstrate the interface, and the page says so. Replace with real, consented
profiles before showing this to buyers.

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
│   ├── experts.js      24 sample profiles (fictional)
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
3. Add engagement outcomes to ranking (today it is area overlap and availability).
4. Let experts publish written teardowns per area; for a directory like this the
   writing generates the demand, not the listings.

## History

Earlier revisions in git history include a multi-page version (separate
directory, per-area pages, expert profiles, and an eighteen-question readiness
scorecard) at commit `a2c89e9`, should any of it be worth reviving.
