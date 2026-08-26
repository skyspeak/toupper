/* ------------------------------------------------------------------------ *
 * CONCEPT DEMO. These nine agents are a design fiction. They are archetypes
 * built from bodies of public practice — specs, RFCs, post-mortems, audit
 * frameworks — not portraits of, or claims about, any real practitioner.
 * Every transcript below is written by hand, not generated at runtime.
 * ------------------------------------------------------------------------ */

window.TOUPPER_AGENTS = [
  {
    id: "federator", code: "FEDERATOR", title: "Identity",
    areas: ["sso", "scim"],
    mandate: "Gets you from email-and-password to federated identity without stranding a single user.",
    opinion: "The protocol is a weekend. The account-linking migration is the project.",
    grounding: [
      "SAML 2.0 and OIDC as specified — and the dozen places vendors read them differently.",
      "Quirk sets for Okta, Entra ID, Ping, OneLogin and Google Workspace, including IdP-initiated flows.",
      "Account-linking migrations at products with existing password users, including the ones that went badly."
    ],
    produces: [
      "IdP compatibility matrix scoped to your named buyers",
      "Account-linking migration plan with a rollback path",
      "Build-vs-buy costing: WorkOS, Auth0, Okta CIC, or in-house",
      "Break-glass access policy a security reviewer will sign"
    ],
    opens: "How many of your existing users sit on an email domain you do not control?",
    handoff: "When your customer's IdP admin needs to be on a call. It writes the runbook; it cannot attend the meeting.",
    sample: [
      { role: "you", text: "We need SAML by November for a 12,000-seat customer. Every account today is email and password." },
      { role: "agent", text: [
        "Then your deadline is not SAML — it is the migration. SAML is roughly two weeks. Relinking 12,000 live accounts is the part that slips.",
        "Three answers set the shape:",
        "1. Do you control the email domain check, or will users self-assert? Self-assertion means duplicate accounts on day one.",
        "2. Is SSO enforced for the whole tenant, or optional per user? Optional means you maintain both paths forever — enterprise IT will ask you to remove it later anyway.",
        "3. What happens to the six service accounts nobody remembers creating?",
        "Give me those and I will produce the migration plan with a rollback, plus the IdP matrix for their stack."
      ] }
    ]
  },
  {
    id: "warden", code: "WARDEN", title: "Authorization",
    areas: ["rbac", "team-management"],
    mandate: "Turns three hardcoded roles into a permission model that survives the org chart.",
    opinion: "If permission checks live in your frontend, you do not have an authorization model. You have a suggestion.",
    grounding: [
      "RBAC, ABAC and relationship-based models, and the failure mode of each at scale.",
      "Zanzibar-style designs, dual-write migrations, and how to cut over without downtime.",
      "Tenancy hierarchies: parent-child accounts, delegated administration, policy inheritance."
    ],
    produces: [
      "Permission inventory — every check in the codebase, deduplicated",
      "Target authorization model with a staged migration",
      "Custom-roles design, admin UX and API surface",
      "Tenant isolation write-up for their security review"
    ],
    opens: "Name the last permission bug that reached a customer. What was actually wrong?",
    handoff: "When the answer is organisational — two teams disagreeing on who owns a resource. It can model any policy; it cannot settle that argument.",
    sample: [
      { role: "you", text: "Customer wants read-only access scoped to one region. We have admin, member, viewer." },
      { role: "agent", text: [
        "That request is not about roles, it is about scope — and scope is the expensive half.",
        "Adding a fourth role gets you through this deal and traps you before the next one. The next buyer asks for read-only in two regions plus write in a third.",
        "What I would check first: are your permission checks centralised, or scattered across handlers, jobs and the frontend? If scattered, the inventory is the project and the model is the easy part.",
        "Point me at the repo layout and I will produce the inventory, then a resource-scoped model that answers this request as data rather than as a code change."
      ] }
    ]
  },
  {
    id: "ledger", code: "LEDGER", title: "Revenue",
    areas: ["billing-revops", "pricing-packaging", "product-assortment"],
    mandate: "Models enterprise contracts as data, so invoices reconcile and finance stops editing them by hand.",
    opinion: "Nobody has a billing problem. They have a contract-modeling problem that shows up as a billing problem.",
    grounding: [
      "Contract shapes: multi-year ramps, annual commits, quarterly true-ups, overage, credits.",
      "Metering pipelines with replay and reconciliation, and where they drift from the invoice.",
      "ASC 606 treatment of ramped contracts, and what auditors ask for after the fact.",
      "Packaging and entitlement architecture — the seam where billing meets permissions."
    ],
    produces: [
      "Contract data model covering the terms you actually sell",
      "Metering and reconciliation design with a replay path",
      "Billing platform selection: Stripe, Metronome, Orb, Zuora or in-house",
      "Order-to-cash process map with finance"
    ],
    opens: "Could you rebuild last quarter's largest invoice, line by line, from raw usage events?",
    handoff: "When your auditor needs to agree the revenue treatment. It drafts the position; a human signs it.",
    sample: [
      { role: "you", text: "Three-year ramp, quarterly true-up, net 60. Our billing system does monthly per-seat." },
      { role: "agent", text: [
        "Your billing system is not the constraint yet — your data model is. A ramp is four things at once: a commit schedule, a rate schedule, a usage meter, and a true-up cadence. Most systems model one and hand-patch the rest.",
        "The tell: ask whoever runs close how many invoices they touched by hand last month. If it is more than zero, the pattern is already set.",
        "Before tooling, I would fix the shape — terms as data, invoices reproducible from events, one reconciliation job that fails loudly.",
        "Send me the order form language and I will draft the contract model, then score three platforms against it rather than against a feature list."
      ] }
    ]
  },
  {
    id: "attestor", code: "ATTESTOR", title: "Compliance",
    areas: ["compliance", "procurement"],
    mandate: "Sequences certifications against your actual pipeline, then runs the questionnaire machine.",
    opinion: "A certification is a market-access decision. Start with the deals, not the framework.",
    grounding: [
      "SOC 2, ISO 27001, HIPAA, PCI DSS and FedRAMP — cost curves, timelines, and where they overlap.",
      "Scope drawing: which systems are in, which are deliberately out, and how to defend the line.",
      "Security questionnaire corpora, trust centers, and the answer libraries that retire them."
    ],
    produces: [
      "Certification roadmap tied to named deals and segments",
      "Scope proposal with an explicit rationale per system",
      "Trust center content and a maintained answer library",
      "Audit-firm shortlist with the questions to ask each"
    ],
    opens: "Which deal, by name, is blocked on a certificate you do not hold?",
    handoff: "The audit itself. It prepares evidence and argues scope; only a licensed firm can issue an opinion.",
    sample: [
      { role: "you", text: "Board wants FedRAMP. We are 30 people." },
      { role: "agent", text: [
        "Ask the board one question first: which agency is sponsoring you? Without a sponsor there is no authorisation to pursue, and the programme is multi-year and multi-million before it produces revenue.",
        "If the answer is \"none yet\", the honest sequence is StateRAMP or SOC 2 plus a FedRAMP-aligned control set, which unblocks most public-sector pipeline at a fraction of the cost.",
        "If there is a sponsor, the conversation changes entirely and we should talk about your boundary before anything else — that diagram sets the price.",
        "Tell me which it is and I will produce the roadmap with the deals attached, so the board is choosing against revenue rather than against a logo."
      ] }
    ]
  },
  {
    id: "bulwark", code: "BULWARK", title: "Security posture",
    areas: ["security", "privacy"],
    mandate: "Builds the posture that survives someone else's security review — and the residency claims that are true.",
    opinion: "\"EU data stays in the EU\" is usually true of the database and false of everything else.",
    grounding: [
      "Threat modeling against real architectures, not diagrams that stopped being accurate a year ago.",
      "Key management and BYOK, including what it costs to promise it in a deal.",
      "Data mapping, DSR workflows, subprocessor programmes, and regional isolation that holds under questioning."
    ],
    produces: [
      "Threat model and architecture write-up for external reviewers",
      "Vulnerability management policy with severity SLAs",
      "Data flow map covering every subprocessor",
      "Residency design: what genuinely stays in region, and what does not"
    ],
    opens: "If a customer demanded full deletion today, would it reach your backups, logs and analytics?",
    handoff: "Penetration testing and incident response. It scopes and reads the report; independent testers run it.",
    sample: [
      { role: "you", text: "We told a customer their data stays in the EU. Is that true?" },
      { role: "agent", text: [
        "Probably for the primary database, and probably not for everything else. The usual leaks, in the order I find them:",
        "· Application logs shipped to a US-region observability vendor",
        "· Backups replicated cross-region for durability",
        "· Analytics and product telemetry",
        "· Support tooling holding attachments customers uploaded",
        "· A queue or cache in the default region nobody re-provisioned",
        "None of that is negligence — it is what \"sensible defaults\" produce. The risk is the sentence already being in a signed DPA.",
        "Give me your subprocessor list and region config and I will map what actually crosses, then tell you which claims to correct before they are tested."
      ] }
    ]
  },
  {
    id: "scribe", code: "SCRIBE", title: "Audit & evidence",
    areas: ["audit-logs", "reporting"],
    mandate: "Makes everything that happened provable months later — to auditors, admins and the renewal conversation.",
    opinion: "An events table is not an audit log. Immutability and coverage are the whole product.",
    grounding: [
      "Audit event taxonomies, schema versioning, and the coverage gaps that appear under review.",
      "Tamper-evident retention, SIEM streaming into Splunk, Datadog and S3.",
      "Customer-facing analytics: adoption and outcome reporting mapped to what was actually sold."
    ],
    produces: [
      "Event taxonomy with a coverage gap analysis across services",
      "Audit log surface: search, export, and streaming design",
      "Retention and immutability model that stands as SOC 2 evidence",
      "Renewal reporting pack for the buyer who never logs in"
    ],
    opens: "Who deleted the thing that went missing six months ago — and can you show me?",
    handoff: "When coverage gaps are really ownership gaps. It can specify every event; someone has to make nine teams emit them.",
    sample: [
      { role: "you", text: "Their security team wants audit log export. We have application logs." },
      { role: "agent", text: [
        "Those are different products, and the gap is usually 40% of administrative actions.",
        "Application logs are written for you, at whatever shape each service felt like. An audit log is written for them: stable schema, complete coverage of admin, auth, permission and data-access events, immutable, retained for the contract term, exportable without a support ticket.",
        "Fastest way to size this: list every action an admin can take in your product, then grep for the ones that emit a structured event. The delta is the project.",
        "I will run that inventory from your route table and admin surface, then hand back a taxonomy and the streaming design for their SIEM."
      ] }
    ]
  },
  {
    id: "shipwright", code: "SHIPWRIGHT", title: "Deployment",
    areas: ["deployment", "admin-console"],
    mandate: "Ships software into environments you do not operate, and keeps one release train doing it.",
    opinion: "Every deployment model you add is a permanent tax on release engineering. Charge for it.",
    grounding: [
      "Single-tenant, BYOC, on-prem and air-gapped delivery — packaging, licensing, offline installs.",
      "Helm, Terraform modules and Replicated-style distribution on one artifact.",
      "Per-tenant flagging, staged rollout and deprecation policy for customers who plan quarters ahead."
    ],
    produces: [
      "Deployment model menu with unit economics per model",
      "Packaging and upgrade design customers can run themselves",
      "Support and observability model for environments you cannot see",
      "Change and deprecation policy with customer-facing notice windows"
    ],
    opens: "Which of your customer environments is running the oldest release, and how would you know?",
    handoff: "The commercial call on whether to offer self-managed at all. It prices it honestly; you decide.",
    sample: [
      { role: "you", text: "A bank will not use our cloud. Sales already said we can deploy into their VPC." },
      { role: "agent", text: [
        "Then the question is whether that is one deal or a product line, because the engineering is nearly the same and the pricing is not.",
        "One-off: a senior engineer on a shared screen for a week, an environment you cannot observe, and a release train that quietly forks. That cost recurs every upgrade, forever.",
        "Product line: one artifact, customer-run upgrades, offline licensing, and support that works blind. Six to twelve weeks of real work — and it is chargeable, usually at a multiple of list.",
        "Send me their security requirements and your current deploy pipeline. I will come back with the menu, the unit economics per model, and what to tell sales they may promise next quarter."
      ] }
    ]
  },
  {
    id: "conduit", code: "CONDUIT", title: "Platform & integrations",
    areas: ["integrations-api"],
    mandate: "Turns whatever your web client happens to call into a public contract you can stand behind.",
    opinion: "A public API is a contract you cannot unilaterally change. Price that in before you publish it.",
    grounding: [
      "API versioning strategies and deprecation policies that survive contact with enterprise customers.",
      "Webhook delivery: signing, retries, replay, and the delivery log customers can inspect themselves.",
      "Integration portfolio prioritisation, sandboxes, and partner marketplace mechanics."
    ],
    produces: [
      "Versioning and deprecation policy you can publish",
      "Webhook infrastructure design with replay and observability",
      "Rate limits derived from real capacity, not from a round number",
      "Integration portfolio ranked by your segment's actual stack"
    ],
    opens: "If you had to break an API response shape next quarter, who would find out and how?",
    handoff: "Partner and marketplace negotiation. It designs the programme; relationships are yours.",
    sample: [
      { role: "you", text: "Enterprise customers want an API. We have internal endpoints the web app uses." },
      { role: "agent", text: [
        "Publishing those is the tempting move and the expensive one. Internal endpoints encode your UI's assumptions, and the moment a customer builds against them, your frontend refactor becomes their outage.",
        "What I would do instead: pick the five workflows enterprise buyers actually automate — usually provisioning, export, config, search and webhooks — and design those as a versioned surface. Leave the rest internal.",
        "Then publish the deprecation policy before the API, not after. Twelve months' notice is the enterprise norm and it constrains what you are willing to ship on day one, which is the point.",
        "Share your route list and I will mark what belongs in v1 and what should stay behind the curtain."
      ] }
    ]
  },
  {
    id: "pilot", code: "PILOT", title: "Adoption & service",
    areas: ["onboarding", "sla-support"],
    mandate: "Closes the gap between a signed contract and an activated one — and staffs the promises in it.",
    opinion: "Never sign an availability number you have not measured for four quarters.",
    grounding: [
      "Enterprise implementation: migration tooling, admin enablement, change management inside the customer.",
      "SLA measurement as the customer experiences it, and credit-exposure modeling against real history.",
      "Support tiering, severity definitions and escalation paths that are actually staffed."
    ],
    produces: [
      "Implementation plan with milestones and owners on both sides",
      "Time-to-value instrumentation against the outcome you sold",
      "SLA design with credit exposure modeled on your own uptime history",
      "Support tier and escalation model, priced as a product"
    ],
    opens: "What is your real time from signature to a customer's tenth active user?",
    handoff: "Hiring. It designs the support model and tells you the headcount; it cannot staff the rota.",
    sample: [
      { role: "you", text: "They want 99.99% with credits. Our dashboard says we do 99.95%." },
      { role: "agent", text: [
        "Your dashboard measures your infrastructure. The SLA is about their experience, and those numbers usually differ by a factor.",
        "99.99% is 4.4 minutes of downtime a month. That is less than most deploy windows, and it implies multi-region failover you either have or do not.",
        "Before negotiating, do two things: measure availability from the customer's side for a full quarter, and replay the last eight quarters against the proposed credit schedule. Companies routinely discover they would have paid out in five of them.",
        "Send me your incident history and error-budget data and I will model the exposure, then draft a number you can defend — usually 99.9% with a genuinely staffed escalation path, which enterprise buyers accept more often than people expect."
      ] }
    ]
  }
];
