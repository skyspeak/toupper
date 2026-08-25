# ToUpper

> `smb.toUpper() → enterprise`

A directory for finding independent experts in **enterprise readiness** — the layer of
product work that a SaaS company has to build before a large customer will sign:
single sign-on, directory provisioning, custom roles, audit logs, contract billing,
SOC 2, VPC deployment, an SLA someone can actually staff.

The thesis: a generation of mid- and late-career product and platform leaders spent
years shipping exactly this inside scaling companies, and many now work independently.
The problems repeat almost identically from company to company, which makes that
expertise unusually portable — and worth finding quickly when a deal is on the line.

## What is here

| Page | What it does |
|---|---|
| `index.html` | Landing page — thesis, the readiness map, featured experts |
| `domains.html` | The full readiness map: 18 practice areas in 5 groups |
| `domain.html?d=<slug>` | One practice area: what good looks like, signals you need help, typical engagements, the bench |
| `directory.html` | Filterable expert directory (practice area, availability, free-text search) |
| `expert.html?id=<id>` | Expert profile: track record, practice areas, rate band, shortlist toggle |
| `assessment.html` | **Readiness scorecard** — 18 questions, one per practice area, in 5 steps. Produces a score, the three widest gaps, matched experts, and a per-area breakdown behind a disclosure |
| `brief.html` | Post a brief. Carries over scorecard gaps and your saved shortlist |
| `apply.html` | For practitioners: vetting, fees, and an application form |

## The taxonomy

The practice areas start from the twelve chapters of
[enterpriseready.io](https://www.enterpriseready.io/) — Replicated's study of fifty
leading SaaS applications — and split further where the market has produced genuine
specialists rather than generalists:

- **Money** — product assortment & packaging, pricing & monetization, billing & revenue operations, procurement & deal enablement
- **Identity & Access** — single sign-on, provisioning & directory sync, roles & entitlements, teams/orgs & multi-tenancy
- **Trust & Compliance** — audit logs, product security posture, compliance & certifications, data privacy & residency
- **Operations & Scale** — deployment options, admin console & change management, integrations & API platform, reporting & analytics
- **Service & Adoption** — SLA/support/success, onboarding, migration & implementation

Splitting billing out of "product assortment", and provisioning out of "single sign-on",
is the main departure from the source: those are where people actually specialise.

## Design

One page, one job. The site leans on whitespace and hairline rules rather than
boxes, badges and colour: practice areas and experts are rule-separated list
rows, not cards. There is a single accent (blue) plus one highlight in the hero,
and each page carries three or four blocks at most. Detail that only some
readers want — the full eighteen-area breakdown on the scorecard, the per-option
wording in the quiz — is one disclosure or tooltip away rather than always on
screen.

## Assumptions made

- **Marketplace, not agency.** Individual operators keep their own rates and contracts.
  Fee model shown is 10% of billings on matched engagements for twelve months, nothing
  on the expert's own pipeline.
- **Vetting by reference.** A call about one project plus two reference checks — stated
  on `apply.html` because a directory is only worth what its worst profile is worth.
- **The scorecard is the front door.** It converts "something is blocking our enterprise
  deals" into a ranked list of named practice areas, which is the only useful input to a
  match. It is also the reason someone would return to the site.
- **Narrow profiles beat broad ones.** Experts list at most three practice areas; the
  matching function rewards specialists over generalists and nudges toward whoever is
  available now.

## Data is fictional

Every expert, company name, engagement and outcome in `data/experts.js` is invented to
demonstrate the interface. A banner says so on every page, and profile pages repeat it
next to the track record. Replace with real, consented profiles before showing this to
buyers.

## Running it

```bash
node serve.js 4321
```

Then open <http://localhost:4321>. There is no build step and no dependencies — plain
HTML, one stylesheet, and vanilla JS. Data lives in `data/*.js` as global objects rather
than JSON so the pages also work when opened directly from the filesystem.

```
toupper/
├── index.html  domains.html  domain.html  directory.html
├── expert.html assessment.html  brief.html  apply.html
├── assets/
│   ├── css/app.css          design system
│   └── js/core.js           shared chrome, helpers, matching
│       └── questions.js     one scorecard question per practice area
├── data/
│   ├── domains.js           18 practice areas + 5 groups
│   └── experts.js           24 sample profiles (fictional)
└── serve.js                 zero-dependency static server
```

## State

Shortlist and scorecard answers persist in `localStorage` only. No backend: the brief
and application forms render a preview of what would be submitted and stop there.

## If this were built for real

1. Replace sample data with vetted profiles and a real intake queue behind the forms.
2. Instrument the scorecard — the per-area answer distribution is a genuinely valuable
   dataset, and the best argument for the taxonomy being right or wrong.
3. Add engagement outcomes back into ranking (currently ranking uses domain overlap,
   specialisation, and availability only).
4. Give experts a way to publish written teardowns per practice area — the strongest
   demand generator for this kind of directory is the writing, not the listings.
