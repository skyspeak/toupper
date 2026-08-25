/* ------------------------------------------------------------------------- *
 * SAMPLE DATA — every practitioner, company, and engagement below is
 * fictional, written to demonstrate the directory. No real person or
 * company is represented. Replace with real, consented profiles before
 * putting this in front of buyers.
 * ------------------------------------------------------------------------- */

window.TOUPPER_SAMPLE_DATA = true;

window.TOUPPER_EXPERTS = [
  {
    id: "rk-01", name: "Rina Kessel", headline: "Usage-based billing for infrastructure companies",
    location: "Lisbon, PT", tz: "UTC+1", years: 14, rate: 3, avail: "2 days/week from Sep",
    domains: ["billing-revops", "pricing-packaging", "product-assortment"],
    modes: ["Fractional", "Project"],
    focus: "Metering pipelines and the move from seats to consumption",
    bio: "Spent nine years owning billing and monetization at two infrastructure companies, the second through a per-seat to consumption migration across 4,000 accounts. Now works with Series B+ teams who have sold a usage-based contract and need the meter to be right before the first invoice goes out.",
    proof: [
      "Rebuilt metering at Halden Cloud: 11 usage meters, event replay, month-end close cut from 9 days to 1.",
      "Led the seats→consumption migration at Portwell with zero net revenue loss and a published grandfathering policy.",
      "Wrote the billing RFP that took a 40-person team from spreadsheets to a platform in one quarter."
    ],
    quote: "Nobody has a billing problem. They have a contract-modeling problem that shows up as a billing problem.",
    engagements: 23
  },
  {
    id: "dm-02", name: "Devon Marchetti", headline: "SSO and provisioning retrofits",
    location: "Denver, CO", tz: "UTC-7", years: 12, rate: 3, avail: "Booked until Oct",
    domains: ["sso", "scim", "rbac"],
    modes: ["Project", "Advisory"],
    focus: "Adding federated identity to products that started with email and password",
    bio: "Built identity three times: once badly, once with a vendor, once properly. Specializes in the migration — linking existing accounts to an IdP without stranding users or creating duplicates — and in the build-vs-buy call that teams usually make on instinct.",
    proof: [
      "SAML + OIDC + SCIM shipped at Marrow Analytics in 10 weeks, unblocking $2.1M in stalled pipeline.",
      "Migrated 90,000 password accounts onto enterprise SSO at Tallgrass with a 0.4% support contact rate.",
      "Okta and Entra ID certification for two products in the same quarter."
    ],
    quote: "The protocol is a weekend. The account-linking migration is the project.",
    engagements: 31
  },
  {
    id: "ao-03", name: "Amara Odiaka", headline: "SOC 2 and ISO 27001 without stopping the roadmap",
    location: "London, UK", tz: "UTC+0", years: 16, rate: 3, avail: "1 day/week",
    domains: ["compliance", "security", "audit-logs"],
    modes: ["Fractional", "Advisory"],
    focus: "Certification sequencing tied to actual pipeline",
    bio: "Former security program lead who has taken five companies through SOC 2 Type II and three through ISO 27001. Most of the work is saying no to scope: certifying the systems that deals depend on, and leaving the rest out on purpose.",
    proof: [
      "SOC 2 Type II at Verrick in 5 months with under 0.5 FTE of engineering time.",
      "Scoped an ISO 27001 program to three systems instead of the eleven originally proposed.",
      "Talked two companies out of FedRAMP; helped a third start it with a sponsoring agency in hand."
    ],
    quote: "A certification is a market-access decision. Start with the deals, not the framework.",
    engagements: 19
  },
  {
    id: "js-04", name: "Julian Sotomayor", headline: "Authorization models that survive the second rewrite",
    location: "Buenos Aires, AR", tz: "UTC-3", years: 11, rate: 2, avail: "Available now",
    domains: ["rbac", "team-management", "admin-console"],
    modes: ["Project", "Embedded"],
    focus: "RBAC → ReBAC migrations and custom roles",
    bio: "Works on the least glamorous, most load-bearing part of enterprise software: who is allowed to do what. Has consolidated permission logic out of frontends, jobs, and integrations onto a single enforcement layer at four companies, twice under an active deal deadline.",
    proof: [
      "Custom roles and resource-scoped permissions at Brightside Labs, replacing 3 hardcoded roles.",
      "Permission inventory at Cadenza: 1,400 scattered checks reduced to 62 documented permissions.",
      "Zanzibar-style authorization rollout with a dual-write migration and no downtime."
    ],
    quote: "If permission checks live in the frontend, you don't have an authorization model. You have a suggestion.",
    engagements: 17
  },
  {
    id: "hl-05", name: "Hana Lindqvist", headline: "Packaging and pricing for the move upmarket",
    location: "Stockholm, SE", tz: "UTC+1", years: 15, rate: 3, avail: "Q4 availability",
    domains: ["product-assortment", "pricing-packaging", "reporting"],
    modes: ["Advisory", "Project"],
    focus: "The first Enterprise tier, and what goes in it",
    bio: "Product leader who has designed the enterprise edition for companies crossing from self-serve into direct sales. The work is equal parts research, entitlement architecture, and convincing a sales team to stop inventing tiers in the order form.",
    proof: [
      "Designed the three-tier structure at Nimbus Reach; enterprise ASP rose 2.4x in four quarters.",
      "Built an entitlements service that ended per-deal feature toggles at two companies.",
      "Ran willingness-to-pay research across 60 enterprise buyers in a regulated vertical."
    ],
    quote: "Your packaging is a promise about who you serve. Most teams make it by accident.",
    engagements: 26
  },
  {
    id: "tb-06", name: "Theo Bankole", headline: "Shipping software into customer-run environments",
    location: "Toronto, ON", tz: "UTC-5", years: 13, rate: 3, avail: "2 days/week",
    domains: ["deployment", "security", "sla-support"],
    modes: ["Fractional", "Project"],
    focus: "BYOC, single-tenant, and air-gapped delivery",
    bio: "Spent six years building the self-managed distribution of a data platform — Helm charts, licensing, offline installs, and the support model that makes it survivable. Now helps teams decide whether they should take that on at all, and price it properly if they do.",
    proof: [
      "BYOC offering at Steelhead Data: 14 customer VPC deployments on one release train.",
      "Air-gapped install path for a defense customer, including offline license validation.",
      "Unit-economics model that priced single-tenant at 3.1x list — and made it profitable."
    ],
    quote: "Every deployment model you add is a permanent tax on release engineering. Charge for it.",
    engagements: 15
  },
  {
    id: "cm-07", name: "Claudia Mireles", headline: "Audit logging and evidence customers can use",
    location: "Mexico City, MX", tz: "UTC-6", years: 10, rate: 2, avail: "Available now",
    domains: ["audit-logs", "compliance", "integrations-api"],
    modes: ["Project"],
    focus: "Event taxonomies, SIEM streaming, retention",
    bio: "Builds the audit surface that security reviewers ask for: a documented event taxonomy, full coverage of admin and data-access actions, customer-facing search, and streaming into Splunk or Datadog without a support ticket.",
    proof: [
      "Audit log product at Fennwick shipped in 7 weeks, closing 4 blocked enterprise deals.",
      "Coverage analysis across 9 services that found 40% of admin actions were unlogged.",
      "Tamper-evident retention design accepted by three separate customer security teams."
    ],
    quote: "An events table is not an audit log. Immutability and coverage are the whole product.",
    engagements: 12
  },
  {
    id: "ns-08", name: "Nikhil Sreenivasan", headline: "Public API and webhook platforms",
    location: "Bengaluru, IN", tz: "UTC+5:30", years: 12, rate: 2, avail: "3 days/week",
    domains: ["integrations-api", "admin-console", "reporting"],
    modes: ["Fractional", "Project"],
    focus: "Versioning, deprecation policy, and webhook reliability",
    bio: "Ran the platform team at a workflow company through the transition from an internal API to a public one with third-party developers on it. Strong opinions about deprecation windows, rate limits that reflect real capacity, and webhook delivery you can prove.",
    proof: [
      "Public API v2 at Orrery with a published 12-month deprecation policy and zero forced migrations.",
      "Webhook redelivery and customer-visible delivery logs; support tickets down 60%.",
      "Partner integration program that shipped 22 listings in its first year."
    ],
    quote: "A public API is a contract you cannot unilaterally change. Price that in before you publish it.",
    engagements: 20
  },
  {
    id: "eg-09", name: "Elin Gunnarsdóttir", headline: "GDPR, DPAs, and EU data residency",
    location: "Reykjavík, IS", tz: "UTC+0", years: 14, rate: 3, avail: "1–2 days/week",
    domains: ["privacy", "compliance", "deployment"],
    modes: ["Advisory", "Project"],
    focus: "Making residency claims that are actually true",
    bio: "Privacy engineering lead turned advisor. Works on the gap between what the DPA says and what the system does — deletion that reaches backups and analytics, subprocessor inventories that stay current, and regional isolation that holds up when a reviewer asks about logs.",
    proof: [
      "EU-region isolation at Kestrel Systems covering primary data, logs, backups, and 6 subprocessors.",
      "DSR workflow reduced from 11 manual steps across 5 systems to one automated pipeline.",
      "Published subprocessor program with 30-day notification adopted by legal and engineering."
    ],
    quote: "\"EU data stays in the EU\" is usually true of the database and false of everything else.",
    engagements: 18
  },
  {
    id: "mp-10", name: "Marcus Pettibone", headline: "Enterprise support, SLAs, and escalation",
    location: "Austin, TX", tz: "UTC-6", years: 18, rate: 2, avail: "Available now",
    domains: ["sla-support", "onboarding", "deployment"],
    modes: ["Fractional", "Advisory"],
    focus: "Turning support into a priced product with real margins",
    bio: "Built and ran enterprise support organizations at two companies from first premium contract to 200-plus accounts. Focuses on what a company can actually commit to — measured, staffed, and modeled for credit exposure — before signing it.",
    proof: [
      "Support tiering at Ridgeline that turned a giveaway into a 9% revenue line.",
      "SLA credit-exposure model that repriced a 99.99% commitment down to a defensible 99.9%.",
      "24/7 sev-1 escalation staffed across three regions without a follow-the-sun headcount doubling."
    ],
    quote: "Never sign an availability number you have not measured for four quarters.",
    engagements: 34
  },
  {
    id: "yw-11", name: "Yuki Watanabe", headline: "Admin consoles and per-tenant change control",
    location: "Tokyo, JP", tz: "UTC+9", years: 11, rate: 2, avail: "2 days/week",
    domains: ["admin-console", "team-management", "rbac"],
    modes: ["Project", "Embedded"],
    focus: "Self-service administration and staged rollouts",
    bio: "Design-minded product lead who consolidates the scattered settings pages, internal tools, and support-only toggles into one admin surface — then adds the per-tenant flagging that lets large customers control when a change reaches their users.",
    proof: [
      "Admin console consolidation at Lanternfish: 7 settings surfaces and 2 internal tools into one.",
      "Per-tenant rollout controls with an opt-out window; enterprise change complaints down 80%.",
      "Every admin action exposed via API alongside the UI, on the same permission model."
    ],
    quote: "Enterprise admins don't want a better settings page. They want to run your product without you.",
    engagements: 14
  },
  {
    id: "gf-12", name: "Gabriel Fontaine", headline: "Security reviews and pre-sales technical trust",
    location: "Montréal, QC", tz: "UTC-5", years: 15, rate: 3, avail: "Booked until Sep",
    domains: ["security", "procurement", "compliance"],
    modes: ["Fractional", "Advisory"],
    focus: "Getting through someone else's security review",
    bio: "Former head of security who now sits on the vendor side of the review. Builds the trust center, the answer library, and the threat model documentation that turns a six-week security review into a two-week one.",
    proof: [
      "Trust center at Hollowbrook that self-served 78% of incoming questionnaires.",
      "Threat model and architecture docs that cleared review at two banks and a health system.",
      "Cut average security-review cycle time from 41 days to 16 across 30 deals."
    ],
    quote: "Every questionnaire you answer by hand is a product you failed to build.",
    engagements: 28
  },
  {
    id: "pr-13", name: "Priya Raghunathan", headline: "Customer-facing analytics and renewal evidence",
    location: "Seattle, WA", tz: "UTC-8", years: 13, rate: 2, avail: "Available now",
    domains: ["reporting", "integrations-api", "onboarding"],
    modes: ["Project", "Advisory"],
    focus: "Proving value to a buyer who never logs in",
    bio: "Analytics product lead focused on the reporting layer enterprises use to justify renewal: adoption and outcome dashboards for admins, scheduled exports, and warehouse sync for the analysts who want the raw data anyway.",
    proof: [
      "Admin analytics at Wayfarer tied to the three outcomes named in the sales deck; GRR up 6 pts.",
      "Snowflake and BigQuery share-based sync replacing 40 hand-built CSV exports.",
      "Metric dictionary that ended a two-year argument between two dashboards."
    ],
    quote: "The person who renews you has never opened the product. Report to them.",
    engagements: 21
  },
  {
    id: "ab-14", name: "Adaeze Balogun", headline: "Enterprise onboarding and migration at scale",
    location: "Lagos, NG", tz: "UTC+1", years: 12, rate: 2, avail: "1 day/week",
    domains: ["onboarding", "sla-support", "admin-console"],
    modes: ["Fractional", "Advisory"],
    focus: "Signed-to-activated for 10,000-seat rollouts",
    bio: "Built the implementation function at a company whose deals routinely covered tens of thousands of users. The work is migration tooling, admin enablement, and change management inside the customer — plus a professional services line that pays for itself.",
    proof: [
      "Time-to-first-value at Ambergate cut from 94 days to 31 across enterprise cohorts.",
      "Bulk import and validation tooling that removed solutions engineers from 80% of rollouts.",
      "Professional services offering scoped and priced; attached to 60% of new enterprise contracts."
    ],
    quote: "Churn is usually decided in the first 60 days, by an admin nobody trained.",
    engagements: 16
  },
  {
    id: "sk-15", name: "Soren Kaplan", headline: "Multi-tenancy and org hierarchy redesign",
    location: "Berlin, DE", tz: "UTC+1", years: 17, rate: 3, avail: "Q4 availability",
    domains: ["team-management", "deployment", "rbac"],
    modes: ["Project", "Advisory"],
    focus: "When a flat workspace model meets a 30,000-person customer",
    bio: "Architect who has taken three products from flat workspaces to parent-child org hierarchies with delegated administration and per-unit policy — including the migrations, which are always harder than the design.",
    proof: [
      "Hierarchy redesign at Cobalt Row supporting a 40-subsidiary global parent on one contract.",
      "Workspace merge and split tooling that turned a six-week manual project into a self-serve action.",
      "Tenant isolation documentation that cleared review at two financial institutions."
    ],
    quote: "The first true enterprise logo will ask your schema for something it cannot express.",
    engagements: 13
  },
  {
    id: "lc-16", name: "Lena Chukwu", headline: "Deal desk, discounting, and price-book discipline",
    location: "Chicago, IL", tz: "UTC-6", years: 14, rate: 2, avail: "Available now",
    domains: ["pricing-packaging", "billing-revops", "procurement"],
    modes: ["Fractional", "Advisory"],
    focus: "Ending the spreadsheet of pricing exceptions",
    bio: "RevOps leader who builds the connective tissue between what sales sells and what billing can invoice: a real price book, approval guardrails that hold in the last week of a quarter, and order forms that map cleanly to contract data.",
    proof: [
      "Deal desk at Trellis Point: bespoke deal structures down from 71% to 12% of enterprise contracts.",
      "Order form → billing data model that eliminated manual invoice edits entirely.",
      "Discount guardrails that raised enterprise net ASP 18% in three quarters."
    ],
    quote: "If every deal is custom, you don't have pricing. You have negotiation.",
    engagements: 25
  },
  {
    id: "vt-17", name: "Viktor Tanaka", headline: "SCIM, directory sync, and deprovisioning",
    location: "Vancouver, BC", tz: "UTC-8", years: 9, rate: 2, avail: "3 days/week",
    domains: ["scim", "sso", "audit-logs"],
    modes: ["Project"],
    focus: "Sync that survives replays, renames, and partial failures",
    bio: "Implementation specialist for the least forgiving integration in enterprise software. Directory sync fails quietly and gets discovered by an auditor; the work is idempotency, reconciliation, and group-to-role mapping that admins can reason about.",
    proof: [
      "SCIM 2.0 at Duskwood certified against Okta, Entra ID, and Google Workspace in 8 weeks.",
      "Reconciliation job that surfaced 2,300 drifted memberships on first run.",
      "Immediate-suspend deprovisioning with retained audit trail, accepted in two SOC 2 audits."
    ],
    quote: "Provisioning is a convenience. Deprovisioning is a security control — and that's the one they test.",
    engagements: 11
  },
  {
    id: "mr-18", name: "Maya Rosenthal", headline: "Entitlements architecture across product and billing",
    location: "Tel Aviv, IL", tz: "UTC+3", years: 13, rate: 3, avail: "2 days/week",
    domains: ["product-assortment", "billing-revops", "rbac"],
    modes: ["Fractional", "Project"],
    focus: "One service that answers \"is this customer allowed to do that?\"",
    bio: "Works the seam between packaging, billing, and permissions — the place where most scaling companies accumulate their worst technical debt. Designs the entitlements service and the migration that gets feature checks out of the codebase.",
    proof: [
      "Entitlements service at Northgate consolidating 380 scattered feature checks.",
      "Contract terms modeled as entitlement grants, so sales changes stopped requiring deploys.",
      "Tier moves executed without customer migrations at two companies."
    ],
    quote: "Packaging, billing, and permissions are three views of one question. Most teams build them three times.",
    engagements: 22
  },
  {
    id: "of-19", name: "Oscar Fennimore", headline: "First enterprise deal readiness for seed and Series A",
    location: "New York, NY", tz: "UTC-5", years: 16, rate: 2, avail: "Available now",
    domains: ["procurement", "security", "sso", "sla-support"],
    modes: ["Advisory", "Fractional"],
    focus: "The 90-day sprint before your first six-figure contract",
    bio: "Generalist for early teams that just got pulled upmarket by an inbound deal. Triages what genuinely blocks the contract versus what can be committed to on a roadmap, then sequences the work so the deal closes without a year of platform investment.",
    proof: [
      "Took a 22-person team from \"no SSO, no SOC 2\" to a signed $340K contract in 11 weeks.",
      "Roadmap-commitment language that deferred four features without losing the deal.",
      "Standing answer library built once, reused across the next nine pursuits."
    ],
    quote: "Most of what a first enterprise buyer asks for is negotiable. Knowing which part isn't is the job.",
    engagements: 37
  },
  {
    id: "ih-20", name: "Ingrid Halvorsen", headline: "Change management and deprecation for enterprise users",
    location: "Oslo, NO", tz: "UTC+1", years: 12, rate: 2, avail: "1 day/week",
    domains: ["admin-console", "integrations-api", "onboarding"],
    modes: ["Advisory", "Project"],
    focus: "Shipping changes to customers who plan quarters in advance",
    bio: "Focuses on the discipline that self-serve companies never needed: telling customers what is changing, when, and giving them a way to control it. Deprecation windows, staged rollouts, opt-out policy, and the communications program behind them.",
    proof: [
      "Deprecation policy at Marlin Grove that retired 14 API endpoints without an escalation.",
      "Staged rollout program with admin-controlled opt-out across 600 enterprise tenants.",
      "Change-communication cadence adopted by product, support, and customer success."
    ],
    quote: "A delightful surprise for a self-serve user is a broken training deck for an enterprise admin.",
    engagements: 18
  },
  {
    id: "rd-21", name: "Rafael Duarte", headline: "Revenue recognition and audit-ready billing data",
    location: "São Paulo, BR", tz: "UTC-3", years: 19, rate: 3, avail: "Q4 availability",
    domains: ["billing-revops", "compliance", "reporting"],
    modes: ["Fractional", "Advisory"],
    focus: "Billing that ties out for finance, audit, and the customer",
    bio: "Finance-systems veteran who works with engineering rather than around it. Builds the path from usage event to invoice line to recognized revenue so that all three agree — including months later, when someone asks.",
    proof: [
      "Order-to-cash rebuild at Ferndale ahead of a first external audit; no material findings.",
      "Usage-to-invoice lineage that let support explain any line item in under five minutes.",
      "ASC 606 treatment for ramped multi-year contracts, agreed with auditors before signing."
    ],
    quote: "If you cannot rebuild last March's invoice from events, you do not have a billing system.",
    engagements: 24
  },
  {
    id: "an-22", name: "Aisha Nkemdirim", headline: "Regulated-industry readiness: health and financial services",
    location: "Boston, MA", tz: "UTC-5", years: 15, rate: 3, avail: "Booked until Nov",
    domains: ["compliance", "privacy", "security", "deployment"],
    modes: ["Fractional", "Advisory"],
    focus: "HIPAA, PCI, and the architectural changes they force",
    bio: "Advisor to teams entering healthcare and financial services, where compliance is not a certificate but a set of constraints on the architecture. Helps decide whether the segment is worth the change, then plans the change.",
    proof: [
      "HIPAA readiness at Bellwether including BAA program and PHI data-flow segmentation.",
      "PCI scope reduction that removed cardholder data from 11 services.",
      "Segment-entry analysis that delayed a healthcare push by two quarters — and saved it."
    ],
    quote: "In regulated markets, compliance isn't a document you produce. It's a shape your system has to take.",
    engagements: 20
  },
  {
    id: "km-23", name: "Kwame Mensah", headline: "Platform reliability and the numbers behind an SLA",
    location: "Accra, GH", tz: "UTC+0", years: 14, rate: 2, avail: "2 days/week",
    domains: ["sla-support", "deployment", "reporting"],
    modes: ["Fractional", "Project"],
    focus: "Measuring what you are about to promise",
    bio: "Reliability lead who instruments availability the way a customer experiences it, not the way a dashboard reports it — then models what a proposed SLA would have cost over the last two years before anyone signs it.",
    proof: [
      "Customer-experienced availability measurement at Silverpine; real uptime was 99.7%, not 99.95%.",
      "Status page and incident comms program that ended three at-risk renewals.",
      "Error-budget policy connecting reliability work to contractual credit exposure."
    ],
    quote: "Your uptime dashboard measures your infrastructure. Your SLA is about their experience.",
    engagements: 17
  },
  {
    id: "cb-24", name: "Camille Beaufort", headline: "Enterprise product strategy and roadmap sequencing",
    location: "Paris, FR", tz: "UTC+1", years: 18, rate: 3, avail: "1 day/week",
    domains: ["product-assortment", "admin-console", "team-management", "onboarding"],
    modes: ["Advisory", "Fractional"],
    focus: "Deciding what to build first when everything is blocking a deal",
    bio: "Former CPO who has run the upmarket transition twice. Works with product leadership on sequencing: which enterprise capabilities are genuinely gating revenue, which are noise from a single account, and how to fund the platform work without stalling the core roadmap.",
    proof: [
      "Enterprise roadmap at Quillon that unblocked $6M in pipeline over three quarters.",
      "Killed four requested features traced to a single non-representative account.",
      "Platform-vs-features funding split that survived two planning cycles."
    ],
    quote: "One loud customer is not a market. The job is telling the difference before you build.",
    engagements: 29
  }
];

/* Rate bands, deliberately coarse — real rates get negotiated. */
window.TOUPPER_RATES = {
  2: { label: "$$",  range: "$200–350/hr · $12–25k typical project" },
  3: { label: "$$$", range: "$350–600/hr · $25–60k typical project" }
};
