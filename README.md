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

## How the page works

One screen, no navigation. It opens on the situation it exists for — a startup
that just signed its first enterprise contract and started getting questions
nobody on the team has answered before.

1. **The ten weeks after you sign.** Five beats of the same deal: the IT team
   asking about SCIM, the security questionnaire, the DPA, procurement rewriting
   the order form, the 12,000-user rollout. Each beat is clickable and selects
   the practice areas that week is actually about — the story is the input
   mechanism, not decoration.
2. **Or pick your own.** Eighteen practice areas as chips. Selecting any number
   narrows the list below (an expert matching *any* selected area is shown,
   ranked by how many they cover, then by who is free).
3. **Read and reach out.** Any expert expands in place — bio, track record,
   practice areas, rate band. "Request an intro" carries their name and your
   selected areas into the brief form at the bottom.

The form renders a preview of what would be sent, including the two or three
names we would come back with. Nothing is transmitted.

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
├── index.html          the whole site — markup plus ~130 lines of vanilla JS
├── assets/css/app.css  design system
├── data/
│   ├── domains.js      18 practice areas in 5 groups
│   └── experts.js      24 sample profiles (fictional)
├── vercel.json         static deploy config, no build
└── serve.js            zero-dependency local server
```

Data lives in `data/*.js` as globals rather than JSON so the page also works
opened straight from the filesystem.

## Deploying

Vercel, zero-config — `vercel.json` sets `framework: null` and serves the repo
root as static files, with a CSP and cache headers. Either import the repo at
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
