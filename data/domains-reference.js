/* ToUpper — long-form notes for each practice area, keyed by slug.
 * NOT loaded by any page. This is the material an agent would be grounded in,
 * and the source for any future per-area writing. */

window.TOUPPER_DOMAIN_DETAIL = {
  "packaging": {
    blurb: "Selling to a large company forces a question self-serve never asks: what exactly is in the box? An enterprise plan, add-ons, usage limits and custom terms all have to be expressed somewhere. When that somewhere is scattered plan checks and one-off deals, every sale becomes an engineering ticket.",
    good: ["A written packaging thesis: what each tier is for, and which buyer it serves.","Feature entitlements enforced by one service, not by scattered if-statements.","Add-ons and platform fees modeled explicitly instead of hand-priced per deal.","A repeatable process for moving a feature between tiers without a migration."],
    signals: ["Sales asks for a one-off tier for a single logo — and engineering says yes.","Nobody can answer \"is this customer entitled to X?\" without reading code.","Your pricing page and your billing system disagree about what exists."],
    engagements: ["Packaging teardown and 3-tier redesign (4–6 weeks)","Entitlements service design and rollout plan","Enterprise SKU definition ahead of a first six-figure deal"],
    related: ["pricing-packaging","billing-revops","rbac"]
  },
  "pricing-packaging": {
    blurb: "Big customers rarely buy per seat. They commit to annual spend, buy platform access, or pay for consumption above a floor. Picking the unit you charge on, and measuring it accurately before it shows up on an invoice, is what separates a repeatable price book from a folder of exceptions.",
    good: ["One value metric you can meter accurately and explain in a sentence.","Published discounting bands and an approval path that holds under pressure.","Price changes that ship with a grandfathering policy, not an incident.","Usage instrumented in product before it appears on an invoice."],
    signals: ["Every enterprise deal has a bespoke pricing structure in the order form.","You cannot forecast next quarter's revenue from the current contract base.","Finance reconciles usage by hand at month end."],
    engagements: ["Value-metric selection and meter instrumentation spec","Price book, discount guardrails, and deal-desk playbook","Migration plan from per-seat to hybrid consumption"],
    related: ["packaging","billing-revops","customer-reporting"]
  },
  "billing-revops": {
    blurb: "A checkout page charges a card. An enterprise contract has a multi-year ramp, quarterly true-ups, purchase orders, net 60 terms and credits, and finance needs every invoice line to trace back to something real. Most teams find this out the week after their first large contract signs.",
    good: ["Contract terms modeled as data — ramps, commits, overages, true-up cadence.","Invoices reproducible from usage events, line by line, months later.","Proration, mid-term upgrades, and cancellations handled without manual credits.","Clean handoff into revenue recognition that survives an audit."],
    signals: ["Someone edits invoices by hand every month.","A customer disputes a line item and it takes two days to explain it.","You are on your third billing vendor and the data still does not tie out."],
    engagements: ["Billing platform selection and migration (Stripe / Metronome / Zuora / in-house)","Usage metering pipeline design with replay and reconciliation","Order-to-cash process build with finance and RevOps"],
    related: ["pricing-packaging","packaging","procurement"]
  },
  "procurement": {
    blurb: "The last stretch of an enterprise deal is paperwork, not product: a long security questionnaire, a marked-up MSA, a vendor risk review, proof of insurance. Teams that improvise it lose weeks every quarter. Teams that prepare for it close faster than the competition.",
    good: ["A trust center that answers 80% of questionnaires without a human.","Pre-approved MSA fallback positions, so redlines take days not weeks.","A standing answer library kept current by the people who own the systems.","Known lead times for VPAT, pen test reports, and insurance certificates."],
    signals: ["Engineering leadership spends a week per quarter on questionnaires.","Deals slip on legal and security review, not on the buying decision.","Every RFP response starts from a blank document."],
    engagements: ["Trust center and answer-library build","Security questionnaire response system and ownership model","RFP/RFI response playbook for a first public-sector pursuit"],
    related: ["compliance","security","uptime-support"]
  },
  "sso": {
    blurb: "Single sign-on is the requirement that most often stops a deal cold. The protocols are well understood. The hard part is adding company logins to a product built around email and password: linking existing accounts, supporting several identity providers, and keeping a way in when a provider goes down.",
    good: ["SAML 2.0 and OIDC both supported, with per-connection configuration self-served by the customer admin.","Domain verification and account linking handled without support tickets.","Enforcement policy per organization: SSO-only, SSO-optional, allowed exceptions.","A documented break-glass path that security will actually approve."],
    signals: ["\"Do you support SSO?\" is answered with \"it's on the roadmap.\"","Each new IdP integration takes an engineer two weeks.","Users end up with duplicate accounts after SSO is switched on."],
    engagements: ["SSO implementation review and IdP compatibility matrix","Account-linking and migration plan for an existing user base","Build-vs-buy analysis (WorkOS / Auth0 / Okta / in-house)"],
    related: ["scim","rbac","org-hierarchy"]
  },
  "scim": {
    blurb: "Signing in is only half of it. IT teams also want to decide who has an account at all, from their own directory, and to see access disappear within minutes of someone leaving. Removing access is a security control, and it is the part auditors check.",
    good: ["SCIM 2.0 for users and groups, certified against the IdPs your customers use.","Deprovisioning that suspends access immediately and preserves the audit trail.","Directory groups mapped to in-product roles, managed by the customer.","Idempotent sync that survives replays, partial failures, and renames."],
    signals: ["Offboarded employees still have access days later.","Group membership drifts between the IdP and your app.","IT asks for SCIM and the answer is a CSV import."],
    engagements: ["SCIM 2.0 implementation and IdP certification (Okta, Entra ID, Google)","Group-to-role mapping model and admin UX","Deprovisioning and data-retention policy design"],
    related: ["sso","rbac","audit-logs"]
  },
  "rbac": {
    blurb: "Small teams live with admin and member. A large customer arrives with an org chart, separation-of-duties rules and a security team that wants least privilege. Rebuilding authorisation in a product with permission checks spread across the codebase is one of the costliest projects a growing company takes on.",
    good: ["A single authorization layer every surface calls — UI, API, jobs, and integrations.","Custom roles composed from documented, stable permissions.","Resource-scoped access (this project, this region, this business unit), not just global roles.","Permission changes that are testable, auditable, and explainable to a customer."],
    signals: ["Permission logic lives in the frontend as well as the backend.","\"Can custom roles be added?\" turns into a quarter of work.","Support regularly grants admin because the model has no middle ground."],
    engagements: ["Authorization model design (RBAC vs ReBAC vs ABAC) and migration path","Permission inventory and consolidation onto one enforcement point","Custom-roles feature design with admin UX and API"],
    related: ["sso","scim","audit-logs","admin-console"]
  },
  "org-hierarchy": {
    blurb: "A 30,000-person customer is several organisations under one contract: a parent, regional subsidiaries, business units that want their own data and admins. A data model built around one flat workspace bends under that, usually when the first real hierarchy asks for something it cannot represent.",
    good: ["An org hierarchy that supports parent-child accounts and delegated administration.","Tenant isolation you can describe precisely to a security reviewer.","Cross-workspace moves, merges, and splits handled as supported operations.","Per-unit settings and policy inheritance with sane overrides."],
    signals: ["A customer asks to merge two workspaces and the answer is \"export and re-import.\"","Policy has to be set identically in twelve places.","One noisy tenant degrades everyone else."],
    engagements: ["Tenancy model review and hierarchy redesign","Workspace merge/split migration tooling","Isolation architecture documentation for security review"],
    related: ["rbac","deployment","admin-console"]
  },
  "audit-logs": {
    blurb: "Customers' security teams want a complete, tamper-resistant record of what happened inside your product, kept as long as the contract says, and streamed into their own tools. Internal application logs don't qualify, and adding coverage after the fact means digging through every service.",
    good: ["A defined, documented event taxonomy with stable schemas and versioning.","Coverage of admin, auth, permission, data-access, and integration events.","Customer-facing search plus export and SIEM streaming (Splunk, Datadog, S3).","Retention configurable per contract, with tamper-evident storage."],
    signals: ["The security questionnaire asks for audit log export and the answer is a support ticket.","Different services log the same action three different ways.","You cannot answer \"who deleted this?\" for something six months old."],
    engagements: ["Audit event taxonomy and coverage gap analysis","Customer-facing audit log UI and export/streaming build","Retention and immutability design for SOC 2 evidence"],
    related: ["security","compliance","rbac"]
  },
  "security": {
    blurb: "A security review is really a product requirement. Buyers want a current threat model, evidence of independent testing, clear answers on encryption and key management, and a named owner. The goal is a documented position that holds up when a stranger reads it.",
    good: ["Documented threat model kept current with the architecture.","Vulnerability management with severity-based SLAs and public disclosure policy.","Encryption in transit and at rest, with a clear key-management story (BYOK where sold).","Annual third-party pen test with a shareable summary report."],
    signals: ["Security review findings are tracked in a spreadsheet nobody owns.","Nobody can produce last year's pen test report.","Customer-managed encryption keys were promised in a deal before being scoped."],
    engagements: ["Pre-review posture assessment and remediation roadmap","Threat model workshop and architecture documentation","BYOK / customer-managed key feasibility and design"],
    related: ["compliance","privacy","audit-logs","procurement"]
  },
  "compliance": {
    blurb: "Each certification opens a different market and carries a different cost. SOC 2 Type II is expected in the US. ISO 27001 matters in Europe. HIPAA and PCI change how systems are built. FedRAMP is a multi-year programme. The costly mistake is starting the wrong one, or scoping it far beyond what the deals require.",
    good: ["A certification roadmap tied to named market segments and revenue.","Scope drawn deliberately — systems in, systems out, documented rationale.","Controls automated and evidenced continuously, not gathered before an audit.","One owner who is not the CTO doing it at night."],
    signals: ["A deal is blocked on a certification nobody has started.","Audit prep consumes engineering for a month each year.","FedRAMP is being discussed without a sponsoring agency."],
    engagements: ["SOC 2 Type II readiness and audit-firm selection","Certification roadmap and scoping tied to pipeline","FedRAMP / StateRAMP feasibility assessment"],
    related: ["security","privacy","audit-logs","procurement"]
  },
  "privacy": {
    blurb: "Privacy commitments arrive as contract clauses: deletion timelines, subprocessor notices, access requests. Each one is engineering work. Keeping data in one region goes further, because it has to hold for logs, backups, analytics and every vendor in the stack, not just the main database.",
    good: ["Data inventory and flow map covering every subprocessor.","Deletion and export honored end-to-end, including backups and analytics.","Regional isolation options with a truthful description of what stays where.","A DPA and subprocessor list you can publish without a legal review each time."],
    signals: ["A deletion request requires a manual pass across five systems.","\"EU data stays in the EU\" is true for the primary database and nothing else.","Nobody knows the full subprocessor list without asking three teams."],
    engagements: ["Data map, DSR workflow, and deletion implementation review","EU / in-region residency architecture and rollout plan","DPA and subprocessor program setup"],
    related: ["security","compliance","deployment"]
  },
  "deployment": {
    blurb: "Some customers will not put their data in your cloud. Serving them means running software you do not operate, inside their account, a private cluster or an air-gapped site. Each option you add multiplies release, support and monitoring work, so it is a pricing decision before it is a technical one.",
    good: ["A deliberate, priced menu of deployment models — not one per deal.","One artifact and one release process across every model.","Customer-side upgrades that do not require your on-call engineer.","Support and observability that work when you cannot see the environment."],
    signals: ["A single-tenant deployment was promised as \"just our stack, but theirs.\"","Customer environments run releases from six months ago.","Every VPC install involves a shared screen and a senior engineer."],
    engagements: ["Deployment strategy and unit-economics analysis","Self-managed and customer-cloud packaging (Helm charts, Terraform modules)","Release, upgrade, and support model for customer-run environments"],
    related: ["security","privacy","org-hierarchy","uptime-support"]
  },
  "admin-console": {
    blurb: "Enterprise admins want to run your product for their company without calling you: manage people, set policy, connect integrations, and choose when changes reach their users. That last one catches teams out, because a change that delights small customers can break a large customer's training and internal docs.",
    good: ["One admin surface covering identity, policy, billing, and integrations.","Per-tenant feature flags with a documented rollout and opt-out policy.","Advance notice for breaking changes, with a published deprecation window.","Every admin action available via API as well as UI."],
    signals: ["Common admin tasks require a support ticket or an internal tool.","Customers find out about UI changes from their own users.","Rollouts are all-or-nothing across the customer base."],
    engagements: ["Admin console design and consolidation","Per-tenant flagging and staged-rollout infrastructure","Deprecation policy and customer change-communication program"],
    related: ["rbac","org-hierarchy","integrations-api"]
  },
  "integrations-api": {
    blurb: "Large companies connect everything. Your product needs a versioned API with honest rate limits, webhooks that retry and can be replayed, and a clear policy for retiring old versions. Once customers build on it, it is a promise you can't quietly change.",
    good: ["A versioned public API with a deprecation policy and honest rate limits.","Webhooks with signing, retries, replay, and a delivery log the customer can see.","First-party integrations for the systems your segment actually runs.","Sandbox environments and credentials customers can self-provision."],
    signals: ["Your API is whatever your web client happens to call.","Webhook failures are discovered by customers.","Every integration request becomes a roadmap item."],
    engagements: ["Public API strategy, versioning, and deprecation policy","Webhook delivery infrastructure with replay and observability","Integration portfolio prioritization and partner/marketplace plan"],
    related: ["admin-console","customer-reporting","rbac"]
  },
  "customer-reporting": {
    blurb: "Renewals are won with evidence. The executive who approves the budget may never log in, so adoption and outcomes have to reach them in a report, while their analysts want raw data in their own warehouse. Reporting is often postponed, and often named when an account churns.",
    good: ["Admin-facing adoption and outcome dashboards mapped to the value you sold.","Scheduled exports and a warehouse sync (Snowflake, BigQuery, S3).","Custom reporting that does not require your team to build each one.","Metric definitions documented and stable across releases."],
    signals: ["QBR decks are assembled by hand from internal queries.","Customers ask for raw data and get a CSV from support.","Two dashboards disagree about the same number."],
    engagements: ["Customer-facing analytics strategy and metric definitions","Embedded dashboards and warehouse sync build","QBR / value-realization reporting package"],
    related: ["integrations-api","pricing-packaging","admin-console"]
  },
  "uptime-support": {
    blurb: "An uptime commitment is money written in engineering terms. Before signing one, you need to know what availability you actually deliver, how it is measured, what credits would cost, and who responds at 3am. Premium support is a real product with real costs, not a line added to close a deal.",
    good: ["Published uptime SLA backed by measured, historical availability.","Severity definitions, response targets, and an escalation path that is staffed.","Support tiers priced and delivered as products, with capacity planning.","A status page and incident communication process customers trust."],
    signals: ["An SLA was signed before anyone measured actual uptime.","Escalations route to whoever the account executive can reach.","Sev-1 response times are aspirational rather than staffed."],
    engagements: ["SLA design, measurement, and credit-exposure modeling","Support tier and escalation model design","Incident communication and status page program"],
    related: ["deployment","procurement","onboarding"]
  },
  "onboarding": {
    blurb: "The gap between a signed contract and people actually using the product is where large accounts quietly stall. Rolling out to thousands of users means migrating data, training admins, and running a project inside the customer's organisation. How fast they see value decides the renewal.",
    good: ["A standard implementation plan with named milestones and owners on both sides.","Bulk import, data migration, and validation tooling that customers can run.","A professional services offering scoped and priced, not given away.","Adoption tracked against the outcome the customer bought."],
    signals: ["Large accounts sit at low activation months after signature.","Implementations depend on one heroic solutions engineer.","Migration tooling is a set of internal scripts."],
    engagements: ["Enterprise onboarding program design and time-to-value instrumentation","Migration tooling and bulk-admin capability build","Professional services offering definition and pricing"],
    related: ["uptime-support","customer-reporting","admin-console"]
  },
  "ai-quality": {
    blurb: "Enterprise buyers have moved past asking whether you have AI. They ask whether it's accurate on their data, how you know, and what stops someone turning it against them. Answering takes grounded retrieval, an evaluation set that runs on every change, guardrails sized to what the AI can do, and traces that explain a bad answer.",
    good: ["Answers grounded in the customer's own content, with citations a user can check.", "An evaluation set drawn from real cases that runs on every change.", "Prompt injection tested on purpose, and the AI given only the access it needs.", "Every AI interaction traceable, with cost and quality tracked per customer."],
    signals: ["Quality is judged by trying a few prompts after each change.", "A security questionnaire asks about prompt injection and nobody owns the answer.", "An AI answer went wrong and nobody could reconstruct why."],
    engagements: ["Evaluation set and regression gate for an existing AI feature", "Prompt injection and data-leak review ahead of a security assessment", "Retrieval redesign for permission-aware, per-tenant search"],
    related: ["ai-governance", "security", "integrations-api"]
  },
  "ai-governance": {
    blurb: "AI now has its own line of questions in procurement: is our data used for training, which providers see it, can we turn it off, and how is all of this governed. Behind them sit contracts with model providers, per-customer settings, and increasingly a formal management system such as ISO 42001, especially for regulated buyers or those covered by the EU AI Act.",
    good: ["A written position on training, retention and providers that legal will sign.", "Admin controls to switch AI features off or keep processing in-region.", "A current inventory of which models and versions each feature uses.", "Risk assessments and human oversight documented for each AI feature."],
    signals: ["The answer to 'do you train on our data' depends on who you ask.", "AI model providers are missing from the subprocessor list.", "A regulated buyer asked about ISO 42001 and nobody knew what it was."],
    engagements: ["AI data-use policy, provider review and DPA updates", "ISO 42001 readiness alongside an existing ISO 27001 programme", "EU AI Act classification of current and planned AI features"],
    related: ["ai-quality", "compliance", "privacy"]
  }
};
