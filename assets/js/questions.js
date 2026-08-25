/* One question per practice area. Wording is deliberately concrete —
   people over-rate themselves on abstractions like "do you have RBAC?". */
window.TOUPPER_QUESTIONS = {
  "product-assortment": {
    q: "Can you say which tier a given feature belongs to, without asking an engineer?",
    s: "Entitlements defined once and enforced centrally, rather than per-deal toggles.",
    a: ["Feature access is decided deal by deal", "Tiers exist, enforcement is scattered", "One entitlements source of truth"]
  },
  "pricing-packaging": {
    q: "Is there a price book with discount guardrails that survives the last week of a quarter?",
    s: "A published structure and approval path, not a spreadsheet of exceptions.",
    a: ["Every enterprise deal is bespoke", "Guidelines exist, often overridden", "Price book and approvals hold"]
  },
  "billing-revops": {
    q: "Could you rebuild last quarter's largest invoice from raw usage events today?",
    s: "Contract terms modeled as data; invoices traceable line by line.",
    a: ["Invoices get edited by hand", "Mostly automated, some manual credits", "Fully reproducible and reconciled"]
  },
  "procurement": {
    q: "What happens when a 300-question security questionnaire arrives on a Friday?",
    s: "A trust center and answer library that absorbs most of it without engineers.",
    a: ["Engineering leadership drops everything", "One person owns it, it takes weeks", "Trust center answers most of it"]
  },
  "sso": {
    q: "Can a customer admin configure SAML or OIDC themselves, today, without your help?",
    s: "Self-serve IdP setup, domain verification, and an enforcement policy per org.",
    a: ["No SSO, or it's on the roadmap", "We configure it manually per customer", "Self-serve, both protocols"]
  },
  "scim": {
    q: "When someone is offboarded in the customer's directory, how fast do they lose access?",
    s: "SCIM provisioning and — more importantly — immediate deprovisioning.",
    a: ["Manually, if someone tells us", "Within a day via a sync we run", "Minutes, via SCIM"]
  },
  "rbac": {
    q: "Could a customer build a custom role tomorrow — read-only for one region, say?",
    s: "One authorization layer, composable permissions, resource-scoped access.",
    a: ["Two or three hardcoded roles", "Fixed roles, no customisation", "Custom roles with scoping"]
  },
  "team-management": {
    q: "Can one customer hold multiple business units under a single contract, with separate data boundaries?",
    s: "Parent-child hierarchy, delegated admin, and policy inheritance.",
    a: ["Flat workspaces only", "Workarounds using multiple accounts", "Real org hierarchy"]
  },
  "audit-logs": {
    q: "Can a customer export or stream their own audit log into their SIEM?",
    s: "Documented event taxonomy, full admin coverage, export and streaming.",
    a: ["We have application logs, not audit logs", "Audit data exists, export is a support ticket", "Self-serve export and streaming"]
  },
  "security": {
    q: "Is there a current threat model and a third-party pen test you can share?",
    s: "A documented posture with vulnerability SLAs and a named owner.",
    a: ["Neither exists yet", "One or the other, somewhat stale", "Both current and shareable"]
  },
  "compliance": {
    q: "Do you hold the certifications the deals in your pipeline actually require?",
    s: "A certification roadmap tied to named segments — and deliberately scoped.",
    a: ["No certifications yet", "In progress, or scope unclear", "Held, with continuous evidence"]
  },
  "privacy": {
    q: "If a customer demanded full deletion, would it reach backups, logs and analytics?",
    s: "A data map, working DSR workflow, and honest residency claims.",
    a: ["It would be a manual scramble", "Primary systems yes, the long tail no", "End to end, and documented"]
  },
  "deployment": {
    q: "Could you serve a buyer who refuses to put their data in your cloud?",
    s: "A priced menu of deployment models on one release train.",
    a: ["Multi-tenant SaaS only", "We've done one-offs painfully", "Productised single-tenant or BYOC"]
  },
  "admin-console": {
    q: "Can enterprise admins do the common administrative tasks without contacting support?",
    s: "One admin surface, API parity, and per-tenant control over changes.",
    a: ["Most admin work goes through us", "A settings page plus internal tools", "Full self-serve console with API"]
  },
  "integrations-api": {
    q: "Is your public API versioned, with a deprecation policy and reliable webhooks?",
    s: "A stable contract, signed webhooks with replay, and a delivery log.",
    a: ["The API is whatever our client calls", "Public API, no formal policy", "Versioned, with deprecation policy"]
  },
  "reporting": {
    q: "Can the economic buyer — who never logs in — see the value they bought?",
    s: "Admin dashboards mapped to sold outcomes, plus exports and warehouse sync.",
    a: ["We assemble QBR decks by hand", "Basic usage dashboards", "Outcome reporting and data export"]
  },
  "sla-support": {
    q: "Have you measured the availability number you are willing to sign?",
    s: "Measured uptime, staffed severity tiers, and modeled credit exposure.",
    a: ["We'd sign what the customer asks for", "We have a number, loosely measured", "Measured, staffed, and modeled"]
  },
  "onboarding": {
    q: "How long from signature to a large customer actually using the product?",
    s: "A standard implementation plan, migration tooling, and tracked time-to-value.",
    a: ["Months, and it depends who runs it", "Repeatable but very hands-on", "Standardised and instrumented"]
  }
};
