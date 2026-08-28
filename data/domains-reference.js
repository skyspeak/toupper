/* ToUpper — long-form reference for each practice area.
 * NOT loaded by any page. This is the material an agent would be grounded in,
 * and the source for any future per-area writing. Keyed by slug. */

window.TOUPPER_DOMAIN_DETAIL = {
  "product-assortment": {
    blurb: "The first thing that breaks when you move upmarket is the shape of the product. One SKU that worked for self-serve becomes a negotiation surface: which features are in Enterprise, what is an add-on, what is a platform fee. Packaging decisions leak into entitlements, billing, and the roadmap for years.",
    good: ["A written packaging thesis: what each tier is for, and which buyer it serves.","Feature entitlements enforced by one service, not by scattered if-statements.","Add-ons and platform fees modeled explicitly instead of hand-priced per deal.","A repeatable process for moving a feature between tiers without a migration."],
    signals: ["Sales asks for a one-off tier for a single logo — and engineering says yes.","Nobody can answer \"is this customer entitled to X?\" without reading code.","Your pricing page and your billing system disagree about what exists."],
    engagements: ["Packaging teardown and 3-tier redesign (4–6 weeks)","Entitlements service design and rollout plan","Enterprise SKU definition ahead of a first six-figure deal"],
    related: ["pricing-packaging","billing-revops","rbac"]
  },
  "pricing-packaging": {
    blurb: "Enterprise buyers do not buy seats the way teams do. They buy committed spend, platform access, and consumption with a floor. Getting the value metric right — and instrumenting it before you sell it — is the difference between a repeatable price book and a spreadsheet of exceptions.",
    good: ["One value metric you can meter accurately and explain in a sentence.","Published discounting bands and an approval path that holds under pressure.","Price changes that ship with a grandfathering policy, not an incident.","Usage instrumented in product before it appears on an invoice."],
    signals: ["Every enterprise deal has a bespoke pricing structure in the order form.","You cannot forecast next quarter's revenue from the current contract base.","Finance reconciles usage by hand at month end."],
    engagements: ["Value-metric selection and meter instrumentation spec","Price book, discount guardrails, and deal-desk playbook","Migration plan from per-seat to hybrid consumption"],
    related: ["product-assortment","billing-revops","reporting"]
  },
  "billing-revops": {
    blurb: "Self-serve billing is a checkout. Enterprise billing is a system of record: multi-year contracts with ramps, quarterly true-ups, POs and net-60 terms, credit memos, entity-level consolidation, and an auditor who wants to trace an invoice line back to a usage event. Most teams discover this the week after signing their first large customer.",
    good: ["Contract terms modeled as data — ramps, commits, overages, true-up cadence.","Invoices reproducible from usage events, line by line, months later.","Proration, mid-term upgrades, and cancellations handled without manual credits.","Clean handoff into revenue recognition that survives an audit."],
    signals: ["Someone edits invoices by hand every month.","A customer disputes a line item and it takes two days to explain it.","You are on your third billing vendor and the data still does not tie out."],
    engagements: ["Billing platform selection and migration (Stripe / Metronome / Zuora / in-house)","Usage metering pipeline design with replay and reconciliation","Order-to-cash process build with finance and RevOps"],
    related: ["pricing-packaging","product-assortment","procurement"]
  },
  "procurement": {
    blurb: "The last mile of an enterprise deal is not product — it is paperwork. A 300-line security questionnaire, a redlined MSA, a vendor risk review, an insurance certificate, an accessibility conformance report. Teams that treat this as a fire drill lose quarters to it. Teams that productize it close faster than their competitors.",
    good: ["A trust center that answers 80% of questionnaires without a human.","Pre-approved MSA fallback positions, so redlines take days not weeks.","A standing answer library kept current by the people who own the systems.","Known lead times for VPAT, pen test reports, and insurance certificates."],
    signals: ["Engineering leadership spends a week per quarter on questionnaires.","Deals slip on legal and security review, not on the buying decision.","Every RFP response starts from a blank document."],
    engagements: ["Trust center and answer-library build","Security questionnaire response system and ownership model","RFP/RFI response playbook for a first public-sector pursuit"],
    related: ["compliance","security","sla-support"]
  },
  "sso": {
    blurb: "SSO is the most common hard blocker on an enterprise deal, and the most commonly underestimated. The protocol is the easy part. The hard part is retrofitting federated identity onto an app that assumed email-and-password: linking existing accounts, handling domains you do not control, supporting several IdPs per customer, and keeping a break-glass path when the IdP is down.",
    good: ["SAML 2.0 and OIDC both supported, with per-connection configuration self-served by the customer admin.","Domain verification and account linking handled without support tickets.","Enforcement policy per organization: SSO-only, SSO-optional, allowed exceptions.","A documented break-glass path that security will actually approve."],
    signals: ["\"Do you support SSO?\" is answered with \"it's on the roadmap.\"","Each new IdP integration takes an engineer two weeks.","Users end up with duplicate accounts after SSO is switched on."],
    engagements: ["SSO implementation review and IdP compatibility matrix","Account-linking and migration plan for an existing user base","Build-vs-buy analysis (WorkOS / Auth0 / Okta / in-house)"],
    related: ["scim","rbac","team-management"]
  },
  "scim": {
    blurb: "SSO gets a user in the door. Provisioning decides who exists at all. IT admins want to grant and revoke access from their directory and have it reflected in your product within minutes — especially the revoke. Deprovisioning is a security control, and it is the one auditors test.",
    good: ["SCIM 2.0 for users and groups, certified against the IdPs your customers use.","Deprovisioning that suspends access immediately and preserves the audit trail.","Directory groups mapped to in-product roles, managed by the customer.","Idempotent sync that survives replays, partial failures, and renames."],
    signals: ["Offboarded employees still have access days later.","Group membership drifts between the IdP and your app.","IT asks for SCIM and the answer is a CSV import."],
    engagements: ["SCIM 2.0 implementation and IdP certification (Okta, Entra ID, Google)","Group-to-role mapping model and admin UX","Deprovisioning and data-retention policy design"],
    related: ["sso","rbac","audit-logs"]
  },
  "rbac": {
    blurb: "Small customers accept admin-or-member. Large ones bring an org chart, a separation-of-duties policy, and a security team that wants least privilege. Retrofitting a real authorization model onto a product with permission checks scattered across the codebase is one of the most expensive projects a scaling company takes on — and one of the easiest to get wrong twice.",
    good: ["A single authorization layer every surface calls — UI, API, jobs, and integrations.","Custom roles composed from documented, stable permissions.","Resource-scoped access (this project, this region, this business unit), not just global roles.","Permission changes that are testable, auditable, and explainable to a customer."],
    signals: ["Permission logic lives in the frontend as well as the backend.","\"Can custom roles be added?\" turns into a quarter of work.","Support regularly grants admin because the model has no middle ground."],
    engagements: ["Authorization model design (RBAC vs ReBAC vs ABAC) and migration path","Permission inventory and consolidation onto one enforcement point","Custom-roles feature design with admin UX and API"],
    related: ["sso","scim","audit-logs","admin-console"]
  },
  "team-management": {
    blurb: "A 30,000-person customer is not one account. It is a hierarchy: a global parent, regional subsidiaries, business units that want their own data boundaries but one contract. If your data model assumes a flat workspace, the first true enterprise logo will bend it — usually by asking for something your schema cannot express.",
    good: ["An org hierarchy that supports parent-child accounts and delegated administration.","Tenant isolation you can describe precisely to a security reviewer.","Cross-workspace moves, merges, and splits handled as supported operations.","Per-unit settings and policy inheritance with sane overrides."],
    signals: ["A customer asks to merge two workspaces and the answer is \"export and re-import.\"","Policy has to be set identically in twelve places.","One noisy tenant degrades everyone else."],
    engagements: ["Tenancy model review and hierarchy redesign","Workspace merge/split migration tooling","Isolation architecture documentation for security review"],
    related: ["rbac","deployment","admin-console"]
  },
  "audit-logs": {
    blurb: "Audit logs show up in every enterprise security review and in most compliance frameworks. The bar is higher than an events table: complete coverage of administrative and data-access actions, immutability, retention that matches the contract, and streaming into the customer's own SIEM. Retrofitting coverage after the fact is archaeology.",
    good: ["A defined, documented event taxonomy with stable schemas and versioning.","Coverage of admin, auth, permission, data-access, and integration events.","Customer-facing search plus export and SIEM streaming (Splunk, Datadog, S3).","Retention configurable per contract, with tamper-evident storage."],
    signals: ["The security questionnaire asks for audit log export and the answer is a support ticket.","Different services log the same action three different ways.","You cannot answer \"who deleted this?\" for something six months old."],
    engagements: ["Audit event taxonomy and coverage gap analysis","Customer-facing audit log UI and export/streaming build","Retention and immutability design for SOC 2 evidence"],
    related: ["security","compliance","rbac"]
  },
  "security": {
    blurb: "Enterprise security review is a product requirement, not a checkbox. Buyers want a threat model, a vulnerability SLA, evidence of pen testing, encryption and key management answers, and a named human who owns it. The goal is not perfect security — it is a defensible, documented posture that survives someone else's reviewer.",
    good: ["Documented threat model kept current with the architecture.","Vulnerability management with severity-based SLAs and public disclosure policy.","Encryption in transit and at rest, with a clear key-management story (BYOK where sold).","Annual third-party pen test with a shareable summary report."],
    signals: ["Security review findings are tracked in a spreadsheet nobody owns.","Nobody can produce last year's pen test report.","Customer-managed encryption keys were promised in a deal before being scoped."],
    engagements: ["Pre-review posture assessment and remediation roadmap","Threat model workshop and architecture documentation","BYOK / customer-managed key feasibility and design"],
    related: ["compliance","privacy","audit-logs","procurement"]
  },
  "compliance": {
    blurb: "Certifications unlock segments, and each one has a different cost curve. SOC 2 Type II is table stakes. ISO 27001 opens Europe. HIPAA and PCI change your architecture. FedRAMP is a multi-year, multi-million-dollar program that reshapes your roadmap. The expensive mistake is starting the wrong one at the wrong time, or scoping it far wider than the deals require.",
    good: ["A certification roadmap tied to named market segments and revenue.","Scope drawn deliberately — systems in, systems out, documented rationale.","Controls automated and evidenced continuously, not gathered before an audit.","One owner who is not the CTO doing it at night."],
    signals: ["A deal is blocked on a certification nobody has started.","Audit prep consumes engineering for a month each year.","FedRAMP is being discussed without a sponsoring agency."],
    engagements: ["SOC 2 Type II readiness and audit-firm selection","Certification roadmap and scoping tied to pipeline","FedRAMP / StateRAMP feasibility assessment"],
    related: ["security","privacy","audit-logs","procurement"]
  },
  "privacy": {
    blurb: "Privacy obligations arrive as contract clauses. A DPA commits you to deletion timelines, subprocessor notification, and data subject requests — all of which are engineering work. Data residency goes further: an EU-only or in-country deployment touches every service, every backup, and every third-party vendor in your stack.",
    good: ["Data inventory and flow map covering every subprocessor.","Deletion and export honored end-to-end, including backups and analytics.","Regional isolation options with a truthful description of what stays where.","A DPA and subprocessor list you can publish without a legal review each time."],
    signals: ["A deletion request requires a manual pass across five systems.","\"EU data stays in the EU\" is true for the primary database and nothing else.","Nobody knows the full subprocessor list without asking three teams."],
    engagements: ["Data map, DSR workflow, and deletion implementation review","EU / in-region residency architecture and rollout plan","DPA and subprocessor program setup"],
    related: ["security","compliance","deployment"]
  },
  "deployment": {
    blurb: "Some buyers will not put data in your cloud. Meeting them means shipping software you do not operate — into a customer VPC, a private cluster, or an air-gapped facility. Every deployment model you add multiplies your release, support, and observability burden. The decision is commercial before it is technical.",
    good: ["A deliberate, priced menu of deployment models — not one per deal.","One artifact and one release process across every model.","Customer-side upgrades that do not require your on-call engineer.","Support and observability that work when you cannot see the environment."],
    signals: ["A single-tenant deployment was promised as \"just our stack, but theirs.\"","Customer environments run releases from six months ago.","Every VPC install involves a shared screen and a senior engineer."],
    engagements: ["Deployment strategy and unit-economics analysis","Self-managed / BYOC packaging (Helm, Replicated, Terraform modules)","Release, upgrade, and support model for customer-run environments"],
    related: ["security","privacy","team-management","sla-support"]
  },
  "admin-console": {
    blurb: "Enterprise admins want to run your product without you: manage users, set policy, configure integrations, and control when their organization gets a change. That last one surprises people. A UI change that delights self-serve users can break a customer's internal training material, and they will ask for a way to opt out and a schedule they can plan around.",
    good: ["One admin surface covering identity, policy, billing, and integrations.","Per-tenant feature flags with a documented rollout and opt-out policy.","Advance notice for breaking changes, with a published deprecation window.","Every admin action available via API as well as UI."],
    signals: ["Common admin tasks require a support ticket or an internal tool.","Customers find out about UI changes from their own users.","Rollouts are all-or-nothing across the customer base."],
    engagements: ["Admin console design and consolidation","Per-tenant flagging and staged-rollout infrastructure","Deprecation policy and customer change-communication program"],
    related: ["rbac","team-management","integrations-api"]
  },
  "integrations-api": {
    blurb: "Enterprises buy into ecosystems. Your product has to move data to the systems they already run, and let their internal teams build on top of it. That means a versioned public API with real rate limits, reliable webhooks with replay, and — eventually — a decision about whether you are running a platform with third-party developers on it.",
    good: ["A versioned public API with a deprecation policy and honest rate limits.","Webhooks with signing, retries, replay, and a delivery log the customer can see.","First-party integrations for the systems your segment actually runs.","Sandbox environments and credentials customers can self-provision."],
    signals: ["Your API is whatever your web client happens to call.","Webhook failures are discovered by customers.","Every integration request becomes a roadmap item."],
    engagements: ["Public API strategy, versioning, and deprecation policy","Webhook delivery infrastructure with replay and observability","Integration portfolio prioritization and partner/marketplace plan"],
    related: ["admin-console","reporting","rbac"]
  },
  "reporting": {
    blurb: "Enterprise renewals are argued with data. The economic buyer, who may never log in, needs to see adoption, outcomes, and ROI. Meanwhile their analysts want the raw data in their own warehouse. Reporting is the feature most often deferred and most often cited in a churn post-mortem.",
    good: ["Admin-facing adoption and outcome dashboards mapped to the value you sold.","Scheduled exports and a warehouse sync (Snowflake, BigQuery, S3).","Custom reporting that does not require your team to build each one.","Metric definitions documented and stable across releases."],
    signals: ["QBR decks are assembled by hand from internal queries.","Customers ask for raw data and get a CSV from support.","Two dashboards disagree about the same number."],
    engagements: ["Customer-facing analytics strategy and metric definitions","Embedded dashboards and warehouse sync build","QBR / value-realization reporting package"],
    related: ["integrations-api","pricing-packaging","admin-console"]
  },
  "sla-support": {
    blurb: "An SLA is a financial commitment written in engineering terms. Before signing one, you need to know what you actually deliver, how you measure it, what the credits cost, and who wakes up at 3am. Support tiering is the other half: premium support and named technical contacts are real products with real margins, not a promise made in a deal.",
    good: ["Published uptime SLA backed by measured, historical availability.","Severity definitions, response targets, and an escalation path that is staffed.","Support tiers priced and delivered as products, with capacity planning.","A status page and incident communication process customers trust."],
    signals: ["An SLA was signed before anyone measured actual uptime.","Escalations route to whoever the account executive can reach.","Sev-1 response times are aspirational rather than staffed."],
    engagements: ["SLA design, measurement, and credit-exposure modeling","Support tier and escalation model design","Incident communication and status page program"],
    related: ["deployment","procurement","onboarding"]
  },
  "onboarding": {
    blurb: "The gap between a signed enterprise contract and an activated one is where logos are quietly lost. Rolling out to 10,000 users means data migration, admin training, change management inside the customer, and a professional services motion you may not have built yet. Time-to-first-value is a renewal metric, not an onboarding vanity metric.",
    good: ["A standard implementation plan with named milestones and owners on both sides.","Bulk import, data migration, and validation tooling that customers can run.","A professional services offering scoped and priced, not given away.","Adoption tracked against the outcome the customer bought."],
    signals: ["Large accounts sit at low activation months after signature.","Implementations depend on one heroic solutions engineer.","Migration tooling is a set of internal scripts."],
    engagements: ["Enterprise onboarding program design and time-to-value instrumentation","Migration tooling and bulk-admin capability build","Professional services offering definition and pricing"],
    related: ["sla-support","reporting","admin-console"]
  }
};
