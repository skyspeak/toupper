/* ToUpper — the "what is this thing" knowledge base.
 *
 * Twenty-one enterprise features a large customer tends to ask for. Each entry
 * has a plain explanation, a rough build estimate with the factors that move
 * it, and the questions an org has to answer before starting.
 *
 * Estimates are deliberately ranges, in engineer-weeks, for a Series A–C B2B
 * SaaS team on a modern web stack. They are for scoping conversations, not
 * quotes. Drivers add to the range; a driver with no buyAdd costs the same
 * whether you build or buy, and buyAdd [0,0] means a vendor absorbs it.
 *
 * Loaded as a browser global and require()-able from the /what function,
 * which uses it to write per-term link previews.
 */
(function (root) {
  var GLOSSARY = [

  /* ------------------------------------------------ identity & access */
  {
    id: "sso", name: "SSO", aka: "Single sign-on with SAML and OIDC", areas: ["sso"],
    aliases: ["sso", "single sign on", "single sign-on", "saml", "saml 2.0", "saml sso", "oidc", "openid connect",
      "okta", "okta login", "okta sso", "azure ad", "entra id", "microsoft entra", "google workspace login", "onelogin",
      "ping identity", "idp", "identity provider", "federated login", "federated identity", "jit provisioning",
      "just in time provisioning", "enterprise login", "sso enforcement", "login with okta"],
    what: "Single sign-on lets a customer's employees log into your product with their company identity, from Okta, Microsoft Entra ID or Google Workspace, instead of a separate password. Two protocols matter. SAML 2.0 is what most enterprise IT teams still default to, and OIDC is newer and simpler. Either way, your product trusts the customer's identity provider to vouch for who someone is.",
    why: "IT teams want one place to grant and revoke access. Without SSO, every employee who leaves keeps a working password to your product, and that is usually a hard blocker in security review.",
    build: { weeks: [3, 5], scope: "SAML and OIDC against the major identity providers, set up by your team for each customer." },
    buy: { weeks: [1, 2], vendors: "WorkOS, Auth0, Stytch or Clerk", note: "A vendor handles the protocols and each identity provider's quirks. Linking existing accounts and deciding enforcement policy are still your work." },
    drivers: [
      { label: "Customers set it up themselves, without your team", add: [2, 3], buyAdd: [0, 0] },
      { label: "Existing password users need their accounts linked", add: [2, 4] },
      { label: "SSO must be enforceable per org, with a break-glass login", add: [1, 2] },
      { label: "Some customers need more than one identity provider", add: [1, 2], buyAdd: [0, 0] }
    ],
    questions: [
      { who: "Product", q: "Is SSO part of a paid tier, or a separate add-on?", why: "Decides whether this is revenue or a cost of doing business." },
      { who: "Product", q: "When a customer turns SSO on, does password login switch off for their users?", why: "Enforcement is what security teams actually ask for, and it changes the migration." },
      { who: "Engineering", q: "How do we match an SSO login to an existing account, and what happens when the emails don't match?", why: "Account linking is where most of the effort and most of the bugs live." },
      { who: "Engineering", q: "Do we build it or buy it?", why: "The gap is roughly a month of engineering, plus ongoing maintenance per identity provider." },
      { who: "Security", q: "What is the break-glass path if a customer's identity provider goes down?", why: "Someone has to be able to get in, and it can't be a backdoor." },
      { who: "Sales", q: "Which identity providers do the deals in our pipeline actually use?", why: "Tells you whether to start with SAML, OIDC or one specific provider." },
      { who: "Support", q: "Who helps a customer's IT admin when setup fails?", why: "SSO setup is one of the most common first-week enterprise tickets." }
    ],
    related: ["scim", "rbac", "audit-logs"]
  },
  {
    id: "scim", name: "SCIM", aka: "System for Cross-domain Identity Management", areas: ["scim"],
    aliases: ["scim", "scim 2.0", "provisioning", "user provisioning", "deprovisioning", "de-provisioning", "directory sync",
      "dsync", "user sync", "automatic provisioning", "auto provisioning", "okta provisioning", "azure provisioning",
      "entra provisioning", "offboarding", "group sync", "user lifecycle", "lifecycle management"],
    what: "SCIM is a standard API that lets a customer's identity provider create, update and remove users in your product automatically. When IT adds someone to the right group in Okta or Entra ID, they appear in your app. When that person leaves the company, their access goes with them, and nobody has to file a ticket.",
    why: "Removing access is a security control. Auditors check that departed employees lose access quickly, and doing it by hand doesn't pass.",
    build: { weeks: [3, 6], scope: "SCIM 2.0 user and group endpoints, with sync that is safe to replay, and deprovisioning." },
    buy: { weeks: [1, 2], vendors: "WorkOS, Stytch or Merge", note: "Vendors absorb the differences between identity providers. What a removed user means for their data in your product is still your call." },
    drivers: [
      { label: "Directory groups need to map to roles in your product", add: [1, 2] },
      { label: "It must be certified with Okta, Entra ID and Google", add: [1, 3], buyAdd: [0, 0] },
      { label: "Removed users' data has retention or transfer rules", add: [1, 2] },
      { label: "SSO isn't built yet, and usually comes first", add: [3, 5], buyAdd: [1, 2] }
    ],
    questions: [
      { who: "Product", q: "When someone is deprovisioned, do we suspend them or delete them?", why: "Suspending keeps their work and audit trail. Deleting can break things customers care about." },
      { who: "Product", q: "Who owns content created by a user who has been removed?", why: "Customers will ask the day it first happens." },
      { who: "Engineering", q: "How do directory groups map to roles in our product?", why: "Group mapping is what makes SCIM useful beyond creating accounts." },
      { who: "Engineering", q: "What happens when a sync replays or arrives out of order?", why: "Identity providers retry, so sync has to be safe to run twice." },
      { who: "Security", q: "How fast must access be removed after someone is offboarded?", why: "Minutes is the expectation, and auditors may test it." },
      { who: "Sales", q: "Is SCIM a hard requirement in current deals, or a nice-to-have?", why: "Decides whether this is this quarter's work." }
    ],
    related: ["sso", "rbac", "admin-console"]
  },
  {
    id: "rbac", name: "RBAC", aka: "Role-based access control", areas: ["rbac"],
    aliases: ["rbac", "roles", "user roles", "custom roles", "permissions", "permission model", "access control",
      "role based access control", "role-based access control", "abac", "rebac", "authorization", "authz",
      "least privilege", "fine grained permissions", "fine-grained access", "read only role", "admin roles", "access levels"],
    what: "Role-based access control decides what each user is allowed to do. Instead of everyone being an admin or a member, users get roles, and each role carries specific permissions. Enterprise customers usually want to define their own roles, and to limit access to parts of the product, such as one region or one project.",
    why: "Large companies run on least privilege and separation of duties. If your only options are admin and member, their security team will ask you to change that.",
    build: { weeks: [4, 8], scope: "A central authorization layer, a permission model and role management." },
    buy: { weeks: [2, 4], vendors: "Oso, Permit.io, Cerbos or SpiceDB", note: "An authorization service gives you the engine. Finding and replacing the permission checks already in your code is still most of the work." },
    drivers: [
      { label: "Permission checks are scattered across the codebase today", add: [4, 10] },
      { label: "Access must be scoped to resources, like projects or regions", add: [3, 6], buyAdd: [1, 3] },
      { label: "Customers create their own roles in the UI", add: [2, 3] },
      { label: "Every permission change must be audited", add: [1, 2] }
    ],
    questions: [
      { who: "Product", q: "Which roles do customers actually need on day one?", why: "Starting from real requests beats designing a perfect model nobody asked for." },
      { who: "Product", q: "Can customers create custom roles, or only choose from ours?", why: "Custom roles roughly double the scope." },
      { who: "Engineering", q: "Where do permission checks live today: backend, frontend, background jobs?", why: "If they're scattered, the inventory is the project." },
      { who: "Engineering", q: "Do we need access scoped to specific resources, or only global roles?", why: "Scoping is the expensive half, and hard to retrofit." },
      { who: "Security", q: "Who can grant admin, and is that change logged?", why: "Privilege escalation is the first thing a reviewer tests." },
      { who: "Sales", q: "What exact access request is blocking the current deal?", why: "One concrete request keeps the design honest." }
    ],
    related: ["multi-tenancy", "audit-logs", "sso"]
  },
  {
    id: "multi-tenancy", name: "Org hierarchy", aka: "Multi-tenancy, workspaces and parent-child accounts", areas: ["org-hierarchy"],
    aliases: ["multi tenancy", "multi-tenancy", "multitenancy", "tenant isolation", "workspaces", "organizations",
      "organisations", "org hierarchy", "parent child accounts", "parent-child accounts", "sub accounts", "subaccounts",
      "subsidiaries", "business units", "delegated admin", "enterprise accounts", "account hierarchy", "merge workspaces"],
    what: "Most products start with flat workspaces: one account, one set of users. A large company is a hierarchy instead, with a parent organisation, subsidiaries and business units that want their own data and admins under one contract. Supporting that means your data model can express parents, children and settings that pass down between them.",
    why: "The biggest customers buy once and roll out many times. If each business unit needs its own separate account, you lose central admin and consolidated billing, and often the deal.",
    build: { weeks: [6, 12], scope: "Parent-child organisations, delegated administration and inherited settings." },
    buy: null,
    drivers: [
      { label: "Your data model assumes one flat workspace", add: [4, 8] },
      { label: "Customers need to merge or split existing workspaces", add: [2, 4] },
      { label: "Tenants need hard isolation, with separate databases or schemas", add: [4, 10] }
    ],
    questions: [
      { who: "Product", q: "Does a child org inherit settings from its parent, and can it override them?", why: "Inheritance rules decide almost every other design choice." },
      { who: "Product", q: "Is billing consolidated at the parent, or per business unit?", why: "Billing and tenancy are easier to design together than to reconcile later." },
      { who: "Engineering", q: "How many places in the code assume a user belongs to exactly one workspace?", why: "That assumption is the migration." },
      { who: "Engineering", q: "What does tenant isolation mean for us: rows, schemas or databases?", why: "Each step up costs more and is harder to change later." },
      { who: "Security", q: "Can a parent-org admin see data inside child orgs?", why: "Customers will ask, and the answer has legal consequences." },
      { who: "Sales", q: "Which prospect has the hierarchy, and what does it actually look like?", why: "Designing against a real org chart beats a hypothetical one." }
    ],
    related: ["rbac", "admin-console", "single-tenant"]
  },

  /* ----------------------------------------------- trust & compliance */
  {
    id: "soc2", name: "SOC 2", aka: "SOC 2 Type II audit report", areas: ["compliance"],
    aliases: ["soc 2", "soc2", "soc ii", "soc 2 type ii", "soc 2 type 2", "soc 2 type i", "soc 2 type 1", "type ii report",
      "type 2 report", "soc 2 audit", "soc report", "aicpa", "trust services criteria", "compliance report", "soc 2 report"],
    what: "SOC 2 is an audit report showing that your security controls exist and actually work. An independent CPA firm checks areas like access control, change management, monitoring and incident response against the AICPA's Trust Services Criteria. Type I looks at how the controls are designed at a single point in time. Type II checks that they operated over a period, usually three to twelve months, and Type II is the one enterprise buyers want.",
    why: "It is the default proof of security when selling to US companies. Without it you'll answer long security questionnaires by hand, and some deals won't start.",
    build: { weeks: [6, 12], scope: "Readiness work: policies, access reviews, logging, change management and evidence collection." },
    buy: { weeks: [3, 6], vendors: "Vanta, Drata or Secureframe", note: "Automation platforms collect evidence and track controls. They don't fix the gaps they find, and you still need an audit firm." },
    calendar: "Plan for six to nine months end to end. The Type II observation window is the long pole, not the engineering.",
    extra: "Budget beyond engineering time: the audit itself commonly runs $15k to $50k, and automation platforms $10k to $25k a year.",
    drivers: [
      { label: "No centralised logging or alerting today", add: [2, 4] },
      { label: "Engineers have broad, standing access to production", add: [2, 4] },
      { label: "No device management on company laptops", add: [1, 2], buyAdd: [0, 1] },
      { label: "No written offboarding or access review process", add: [1, 2], buyAdd: [0, 1] }
    ],
    questions: [
      { who: "Sales", q: "Which deals, by name, are waiting on SOC 2?", why: "Ties the work and its cost to revenue." },
      { who: "Engineering", q: "Which systems are in scope, and which do we deliberately leave out?", why: "Tight scope is the biggest lever on effort." },
      { who: "Engineering", q: "Who has production access today, and how is it granted?", why: "Access control is the most common audit finding." },
      { who: "Security", q: "Who owns compliance day to day?", why: "If the answer is the CTO in their evenings, it slips." },
      { who: "Finance", q: "Type I first, or straight to Type II?", why: "Type I is faster to show buyers. Type II is what they actually want." },
      { who: "Legal", q: "Which audit firm, and when does the observation window start?", why: "The window sets the earliest date a report can exist." }
    ],
    related: ["security-questionnaire", "pentest", "iso27001"]
  },
  {
    id: "iso27001", name: "ISO 27001", aka: "International information security certification", areas: ["compliance"],
    aliases: ["iso 27001", "iso27001", "iso/iec 27001", "iso certification", "isms", "iso 27701",
      "information security management system", "iso"],
    what: "ISO 27001 is an international certification for how you manage information security. Instead of auditing individual controls the way SOC 2 does, it certifies a management system: how you assess risk, choose controls and keep improving them. An accredited certification body issues it on a three-year cycle, with a smaller surveillance audit each year.",
    why: "It is the certification buyers in Europe and much of Asia expect. Many global enterprises accept either ISO 27001 or SOC 2, and some insist on ISO.",
    build: { weeks: [8, 14], scope: "A risk assessment, the management system documentation, controls and internal audit." },
    buy: { weeks: [4, 8], vendors: "Vanta, Drata or Secureframe", note: "If you already have SOC 2, most controls overlap. The risk assessment and the management-system paperwork are the new parts." },
    calendar: "Typically four to nine months to certification, depending on how much already exists.",
    extra: "Certification body fees commonly run $10k to $30k for the initial audit, plus the yearly surveillance audits.",
    drivers: [
      { label: "You already hold SOC 2 (this reduces effort)", add: [-3, -6], buyAdd: [-2, -3] },
      { label: "No documented risk assessment yet", add: [2, 3] },
      { label: "The company operates in several countries", add: [1, 3] }
    ],
    questions: [
      { who: "Sales", q: "Do our buyers require ISO specifically, or would SOC 2 do?", why: "Doing both before you need to is expensive." },
      { who: "Engineering", q: "What is the scope: the product, or the whole company?", why: "Scope drives both effort and audit fees." },
      { who: "Security", q: "Do we have a documented risk assessment and treatment plan?", why: "It's the core of ISO, and the part SOC 2 doesn't force." },
      { who: "Security", q: "Who is the named owner of the management system?", why: "Certification bodies expect one accountable person." },
      { who: "Finance", q: "Can SOC 2 and ISO evidence run through one platform?", why: "Overlapping controls should only be collected once." },
      { who: "Legal", q: "Which accredited certification body will we use?", why: "Accreditation matters to buyers, and good bodies book up months ahead." }
    ],
    related: ["soc2", "gdpr-residency", "security-questionnaire"]
  },
  {
    id: "audit-logs", name: "Audit logs", aka: "A customer-facing audit trail", areas: ["audit-logs"],
    aliases: ["audit log", "audit logs", "audit trail", "activity log", "activity history", "event log", "siem",
      "siem export", "splunk", "datadog export", "log streaming", "log export", "who did what", "admin activity log", "access logs"],
    what: "An audit log is a record of who did what, and when, inside your product: logins, permission changes, data exports, settings edits. Enterprise customers need to see it themselves, search it, export it and stream it into their own security tools, such as Splunk or Datadog. It has to be complete, hard to tamper with and kept for as long as their contract says.",
    why: "Security teams investigate incidents with it, and auditors ask for it. Your internal application logs don't count, because customers can't see them and they aren't complete.",
    build: { weeks: [3, 6], scope: "An event schema, capture across admin and data-access actions, a search view and export." },
    buy: { weeks: [1, 3], vendors: "WorkOS Audit Logs, Retraced or Pangea", note: "Vendors store and display events. Deciding what to log, and emitting those events from every service, is still yours." },
    drivers: [
      { label: "Events must stream into the customer's SIEM", add: [1, 3], buyAdd: [0, 1] },
      { label: "Events come from many different services", add: [2, 5] },
      { label: "Retention must be configurable per contract", add: [1, 2], buyAdd: [0, 1] }
    ],
    questions: [
      { who: "Product", q: "Which actions must be logged on day one?", why: "Admin, login, permission and export events cover most requests." },
      { who: "Engineering", q: "How many services would need to emit events?", why: "Coverage across services is the effort, not the storage." },
      { who: "Engineering", q: "Do events have a stable, versioned schema?", why: "Customers build alerts on it, so changes break them." },
      { who: "Security", q: "How long must logs be kept, and can anyone alter them?", why: "Retention and immutability are what auditors check." },
      { who: "Sales", q: "Do buyers want a UI, an export, or a SIEM stream?", why: "Those are three different amounts of work." },
      { who: "Support", q: "Who explains a log entry when a customer asks?", why: "If events aren't self-explanatory, support pays for it." }
    ],
    related: ["soc2", "rbac", "data-export"]
  },
  {
    id: "security-questionnaire", name: "Security questionnaire", aka: "The vendor security review", areas: ["procurement", "security"],
    aliases: ["security questionnaire", "questionnaire", "vendor questionnaire", "security review", "vendor risk assessment",
      "vendor risk", "third party risk", "third-party risk", "sig questionnaire", "sig lite", "caiq", "vsaq", "hecvat",
      "trust center", "trust page", "security review process"],
    what: "A security questionnaire is the list of questions a buyer's security team sends before approving you as a vendor. Standard ones include SIG, CAIQ and HECVAT, and many companies send their own spreadsheet of a few hundred questions. They cover encryption, access control, incident response, subprocessors and more.",
    why: "It sits between a verbal yes and a signed contract. Slow or inconsistent answers delay deals, and a wrong answer can end up written into the contract.",
    build: { weeks: [2, 4], scope: "An answer library, a public trust page, and an owner and process to keep them current." },
    buy: { weeks: [1, 2], vendors: "Vanta Trust, SafeBase, Conveyor or Loopio", note: "Tools draft answers from a library and host a trust center. Someone who knows the systems still has to write and maintain the answers they draw on." },
    drivers: [
      { label: "More than one questionnaire arrives each month", add: [1, 2], buyAdd: [0, 1] },
      { label: "Some answers depend on controls you haven't built yet", add: [2, 6] },
      { label: "Public sector or regulated buyers with their own forms", add: [1, 3] }
    ],
    questions: [
      { who: "Sales", q: "How many questionnaires arrived last quarter, and how long did each take?", why: "Volume decides whether this needs a tool or a spreadsheet." },
      { who: "Security", q: "Who is allowed to answer, and who approves the answers?", why: "Wrong answers become contractual commitments." },
      { who: "Security", q: "Which answers are currently 'no' or 'planned'?", why: "Those gaps are the real security roadmap." },
      { who: "Engineering", q: "Can we publish a trust page with our policies and reports?", why: "A good trust page answers many questions before they're sent." },
      { who: "Legal", q: "What can we share under NDA, and what can be public?", why: "Pen test and SOC 2 reports usually need an NDA." },
      { who: "Product", q: "Which questions keep coming back that a product change would answer?", why: "Repeated questions point at missing features." }
    ],
    related: ["soc2", "pentest", "gdpr-residency"]
  },
  {
    id: "gdpr-residency", name: "Data residency", aka: "GDPR, DPAs and keeping data in-region", areas: ["privacy"],
    aliases: ["gdpr", "data residency", "eu data residency", "eu hosting", "data localisation", "data localization",
      "dpa", "data processing agreement", "dsr", "data subject request", "right to be forgotten", "data deletion",
      "subprocessors", "subprocessor list", "schrems", "uk gdpr", "ccpa", "privacy compliance", "eu region"],
    what: "Data residency means guaranteeing that a customer's data is stored and processed in a specific region, usually the EU. GDPR adds obligations on top: a data processing agreement, a published list of subprocessors, and handling requests to see or delete personal data. The hard part is that data rarely lives only in your main database. Logs, backups, analytics and support tools all hold copies.",
    why: "European buyers often can't sign without a DPA, and some require EU hosting. A residency promise that turns out to be false is a breach of contract.",
    build: { weeks: [4, 8], scope: "A data map, a deletion and access-request workflow, and handling for subprocessors." },
    buy: null,
    extra: "Tools like Transcend or DataGrail can run access and deletion requests, but a regional deployment of the product is infrastructure work either way.",
    drivers: [
      { label: "You need a separate EU deployment of the product", add: [4, 10] },
      { label: "Personal data sits in many third-party tools", add: [2, 4] },
      { label: "Deletion must reach backups and analytics", add: [1, 3] }
    ],
    questions: [
      { who: "Legal", q: "Do we offer a DPA today, and what does it already promise?", why: "It may commit you to things the system doesn't do yet." },
      { who: "Engineering", q: "Where does customer data actually live, including logs, backups and analytics?", why: "The data map is the foundation for every residency claim." },
      { who: "Engineering", q: "Does 'EU residency' mean the database, or everything?", why: "Buyers mean everything. Most systems only move the database." },
      { who: "Security", q: "How do we handle a deletion request from start to finish?", why: "It has to reach every copy, within the legal deadline." },
      { who: "Product", q: "Which subprocessors would we have to disclose?", why: "Adding one later means notifying customers." },
      { who: "Sales", q: "Which deals need EU hosting, and which only need a DPA?", why: "A DPA is paperwork. EU hosting is infrastructure." }
    ],
    related: ["single-tenant", "security-questionnaire", "byok"]
  },
  {
    id: "hipaa", name: "HIPAA", aka: "US health data compliance", areas: ["compliance", "privacy"],
    aliases: ["hipaa", "baa", "business associate agreement", "phi", "protected health information", "hitech",
      "healthcare compliance", "hitrust", "health data"],
    what: "HIPAA is the US law governing protected health information. If your product stores or processes health data for healthcare customers, you're a business associate: you sign a business associate agreement and meet the Security Rule's safeguards for access control, encryption, audit logging and breach notification. There is no official HIPAA certification. Buyers look at your controls, your BAA, and often a SOC 2 or HITRUST report.",
    why: "Healthcare organisations legally can't share patient data with a vendor that won't sign a BAA.",
    build: { weeks: [6, 12], scope: "Safeguards for health data, a BAA program, and keeping that data contained." },
    buy: { weeks: [3, 6], vendors: "Aptible, Vanta or Drata with a HIPAA framework", note: "HIPAA-ready hosting and compliance platforms cover infrastructure and evidence. Keeping health data out of logs, analytics and support tools is still your work." },
    calendar: "Usually three to six months before you can sign a BAA with confidence.",
    drivers: [
      { label: "Health data flows into logs, analytics or support tools", add: [2, 4] },
      { label: "Not all of your cloud services and vendors offer BAAs", add: [1, 3] },
      { label: "Buyers also want HITRUST certification", add: [6, 12] }
    ],
    questions: [
      { who: "Legal", q: "Will we sign BAAs, and on what terms?", why: "It is the legal gate for every healthcare deal." },
      { who: "Engineering", q: "Which systems would touch protected health information?", why: "Keeping that footprint small is the cheapest control." },
      { who: "Engineering", q: "Do all our vendors and cloud services sign BAAs with us?", why: "Any vendor that touches health data needs one." },
      { who: "Security", q: "How would we detect and report a breach?", why: "Notification has legal deadlines." },
      { who: "Product", q: "Do we actually need health data, or can the product work without it?", why: "Not storing it is the best compliance strategy there is." },
      { who: "Sales", q: "Are buyers asking for HITRUST, or is a BAA plus SOC 2 enough?", why: "HITRUST is a much bigger program." }
    ],
    related: ["soc2", "byok", "audit-logs"]
  },
  {
    id: "byok", name: "BYOK", aka: "Bring your own key, or customer-managed encryption keys", areas: ["security"],
    aliases: ["byok", "bring your own key", "customer managed keys", "customer-managed keys", "cmk", "cmek",
      "encryption keys", "key management", "kms", "hyok", "encryption at rest", "envelope encryption",
      "tenant encryption", "customer encryption keys"],
    what: "BYOK lets a customer control the key that encrypts their data inside your product, usually held in their own AWS KMS, Google Cloud KMS or Azure Key Vault. Your system uses their key to encrypt and decrypt, and if they revoke it, their data becomes unreadable, including to you. It is typically built with envelope encryption: per-tenant data keys, wrapped by the customer's master key.",
    why: "Banks, healthcare companies and large enterprises want the ability to cut off access to their data, including from their vendors.",
    build: { weeks: [6, 12], scope: "Per-tenant envelope encryption, integration with a cloud KMS, and key rotation and revocation handling." },
    buy: { weeks: [3, 6], vendors: "a cloud KMS plus a library such as the AWS Encryption SDK or Tink", note: "Libraries handle the cryptography. Deciding which data to encrypt, and what the product does when a key is revoked, is design work you can't outsource." },
    drivers: [
      { label: "Support for more than one cloud KMS", add: [2, 4] },
      { label: "Search or analytics must still work over encrypted data", add: [3, 8] },
      { label: "Existing data must be re-encrypted", add: [2, 4] }
    ],
    questions: [
      { who: "Product", q: "What happens to the product when a customer revokes their key?", why: "Revocation has to fail safely, without corrupting data." },
      { who: "Engineering", q: "Which data is encrypted with the customer's key: everything, or specific fields?", why: "Scope decides both effort and performance cost." },
      { who: "Engineering", q: "Which key management services do our buyers use?", why: "Each one is its own integration." },
      { who: "Security", q: "How are keys rotated, and who can trigger it?", why: "Rotation is where designs quietly break." },
      { who: "Sales", q: "Has BYOK already been promised in a contract?", why: "Promised before it was scoped is a common trap." },
      { who: "Finance", q: "Is BYOK an enterprise add-on?", why: "It has real ongoing cost, and is usually priced." }
    ],
    related: ["single-tenant", "gdpr-residency", "security-questionnaire"]
  },
  {
    id: "pentest", name: "Penetration test", aka: "Independent security testing", areas: ["security"],
    aliases: ["pen test", "pentest", "penetration test", "penetration testing", "pen testing", "security testing",
      "vulnerability assessment", "red team", "bug bounty", "appsec review", "security assessment"],
    what: "A penetration test is an authorised attack on your product by an outside security firm, looking for weaknesses before someone else finds them. The firm tests your application, APIs and infrastructure, then delivers a report of findings ranked by severity. Enterprise buyers usually ask for a summary letter or report from a test in the last twelve months.",
    why: "It is independent evidence that your security holds up, and a standard item in both security questionnaires and SOC 2 audits.",
    build: { weeks: [2, 4], scope: "Your team's time: scoping, supporting the testers and fixing findings. The firm does the testing." },
    buy: null,
    calendar: "Book two to six weeks ahead. The test itself takes one to three weeks, and fixing findings takes as long as it takes.",
    extra: "The test itself commonly costs $10k to $40k, depending on scope.",
    drivers: [
      { label: "Findings include high or critical issues to fix", add: [2, 6] },
      { label: "Scope includes mobile apps or infrastructure", add: [1, 2] },
      { label: "Buyers want a retest letter showing fixes", add: [1, 1] }
    ],
    questions: [
      { who: "Security", q: "What's in scope: web app, APIs, infrastructure, mobile?", why: "Scope drives both price and usefulness." },
      { who: "Engineering", q: "Who is free to fix findings in the weeks afterwards?", why: "An unfixed critical finding is worse than no report." },
      { who: "Security", q: "Do we test production, or a staging copy?", why: "Staging is safer and production is more honest. Decide on purpose." },
      { who: "Legal", q: "What do we share with customers: the full report, a summary or a letter?", why: "Most companies share a summary under NDA." },
      { who: "Sales", q: "Which deals need the report, and by when?", why: "Firms book up, so the deadline sets the timeline." },
      { who: "Finance", q: "Once a year, or continuous testing and a bug bounty?", why: "Different costs, and a different signal to buyers." }
    ],
    related: ["soc2", "security-questionnaire", "byok"]
  },

  /* ------------------------------------------------------------- money */
  {
    id: "usage-billing", name: "Usage-based billing", aka: "Metered and consumption pricing", areas: ["billing-revops", "pricing-packaging"],
    aliases: ["usage based billing", "usage-based billing", "usage billing", "metered billing", "metering", "consumption billing",
      "consumption pricing", "pay as you go", "usage pricing", "usage based pricing", "overage", "overages",
      "credits billing", "prepaid credits", "api billing"],
    what: "Usage-based billing charges customers for what they use: API calls, active seats, compute, messages. It needs a metering pipeline that records usage accurately, rates it against each customer's contract, and turns it into invoices. Enterprise contracts often combine usage with a committed minimum, prepaid credits and overage rates.",
    why: "Buyers want to pay in line with value, and their finance teams want to forecast. Both depend on meters you can trust and invoices you can explain.",
    build: { weeks: [8, 14], scope: "Metering, a rating engine, invoice generation and reconciliation." },
    buy: { weeks: [3, 6], vendors: "Metronome, Orb, Lago or Stripe Billing", note: "Billing platforms rate and invoice. Sending accurate usage events from your product, and reconciling them, stays with you." },
    drivers: [
      { label: "Contracts mix commits, credits and overage", add: [2, 4], buyAdd: [1, 2] },
      { label: "Customers see their usage in near real time", add: [2, 3], buyAdd: [1, 2] },
      { label: "Existing customers are migrating off seat-based pricing", add: [2, 4] }
    ],
    questions: [
      { who: "Product", q: "What is the one value metric we charge on?", why: "Every other design choice follows from it." },
      { who: "Engineering", q: "Can we rebuild any invoice line from raw usage events?", why: "Disputes and audits both require it." },
      { who: "Engineering", q: "What happens if usage events are late, duplicated or lost?", why: "Meters need replay and deduplication to be trusted." },
      { who: "Finance", q: "How do commits, credits and overages show up on invoices and in revenue?", why: "Finance has to recognise the revenue correctly." },
      { who: "Sales", q: "What will we let sales discount or customise?", why: "Bespoke deal structures break billing systems." },
      { who: "Support", q: "How does a customer see their current usage?", why: "Surprise bills cause churn." }
    ],
    related: ["enterprise-invoicing", "entitlements", "data-export"]
  },
  {
    id: "enterprise-invoicing", name: "Enterprise invoicing", aka: "Contracts, purchase orders and net terms", areas: ["billing-revops"],
    aliases: ["enterprise invoicing", "invoicing", "invoice billing", "invoices", "net 30", "net 60", "net terms",
      "purchase order", "purchase orders", "po number", "annual contract", "multi year contract", "multi-year contract",
      "ramp deal", "ramps", "true up", "true-up", "order form", "contract billing", "quote to cash", "order to cash",
      "cpq", "wire transfer", "ach payment"],
    what: "Self-serve products charge a card on a subscription. Enterprise customers pay invoices instead: annual or multi-year contracts, purchase order numbers, net 30 or net 60 terms, payment by bank transfer, and pricing that changes over time with ramps and true-ups. Billing has to model the contract, not just the plan.",
    why: "Enterprise procurement often can't pay by card at all. And contracts your billing can't represent end up managed in spreadsheets, which is where invoices go wrong.",
    build: { weeks: [6, 10], scope: "Contract modelling, invoice generation, a collections workflow and accounting sync." },
    buy: { weeks: [2, 4], vendors: "Stripe Billing, Chargebee, Maxio or Salesforce CPQ", note: "Platforms handle invoices, terms and collections. Getting sales, billing and product entitlements to agree on what was sold is still an internal process." },
    drivers: [
      { label: "Multi-year deals with ramps or quarterly true-ups", add: [2, 4], buyAdd: [1, 2] },
      { label: "Invoices must sync to your accounting system", add: [1, 3], buyAdd: [0, 1] },
      { label: "Mid-term upgrades need proration", add: [1, 2], buyAdd: [0, 1] }
    ],
    questions: [
      { who: "Finance", q: "Which contract terms do we actually sell today?", why: "Model the real ones first, not every possible one." },
      { who: "Finance", q: "Who edits invoices by hand, and how often?", why: "Manual edits show exactly where the model is missing something." },
      { who: "Sales", q: "What can sales change in an order form without approval?", why: "Every exception becomes a billing edge case." },
      { who: "Engineering", q: "How does a signed contract switch on features in the product?", why: "Billing and entitlements drift apart without a link." },
      { who: "Legal", q: "Do our terms support purchase orders, net terms and auto-renewal?", why: "Procurement will redline them otherwise." },
      { who: "Support", q: "Who answers when a customer disputes a line on an invoice?", why: "Explaining an invoice needs data behind every line." }
    ],
    related: ["usage-billing", "entitlements", "sla"]
  },
  {
    id: "entitlements", name: "Entitlements", aka: "Plans, tiers and feature access", areas: ["packaging"],
    aliases: ["entitlements", "entitlement service", "plans", "pricing tiers", "tiers", "packaging", "enterprise tier",
      "enterprise plan", "feature gating", "feature access", "plan limits", "feature flags by plan", "add ons", "add-ons",
      "editions", "sku", "skus"],
    what: "Entitlements decide which features and limits each customer has, based on what they bought. A good entitlement system is one source of truth that the product checks, instead of plan names hardcoded throughout the code. It lets you create an enterprise tier, sell add-ons and give one customer a custom limit without a code deploy.",
    why: "Enterprise deals come with custom packaging. Without entitlements, every deal turns into an engineering ticket.",
    build: { weeks: [3, 6], scope: "An entitlement model, a check the product calls, and admin tools to grant and override." },
    buy: { weeks: [1, 3], vendors: "Stigg, Schematic or LaunchDarkly with plan targeting", note: "Vendors provide the model and the checks. Replacing the plan checks already in your code is still internal work." },
    drivers: [
      { label: "Plan checks are hardcoded across the codebase", add: [2, 6] },
      { label: "Contracts grant custom limits or features per customer", add: [1, 2], buyAdd: [0, 1] },
      { label: "Entitlements must stay in sync with billing", add: [1, 2], buyAdd: [0, 1] }
    ],
    questions: [
      { who: "Product", q: "What's in each tier, and what's an add-on?", why: "Write the packaging down before building the thing that enforces it." },
      { who: "Product", q: "How do we move a feature from one tier to another?", why: "It will happen, and it shouldn't need a migration." },
      { who: "Engineering", q: "Where does the product check plans today?", why: "Scattered checks are the migration." },
      { who: "Sales", q: "How often do deals include custom limits?", why: "Frequent exceptions justify self-serve overrides." },
      { who: "Finance", q: "Is billing or the entitlement system the source of truth?", why: "Two sources of truth eventually disagree." },
      { who: "Support", q: "Can support see what a customer is entitled to?", why: "Otherwise every access question needs an engineer." }
    ],
    related: ["usage-billing", "rbac", "admin-console"]
  },

  /* ------------------------------------------------ operations & scale */
  {
    id: "single-tenant", name: "Single-tenant deployment", aka: "Dedicated, VPC, bring-your-own-cloud and on-prem", areas: ["deployment"],
    aliases: ["single tenant", "single-tenant", "dedicated instance", "dedicated tenant", "vpc deployment", "vpc",
      "private cloud", "byoc", "bring your own cloud", "on prem", "on-prem", "on premise", "on premises", "on-premises",
      "self hosted", "self-hosted", "air gapped", "air-gapped", "customer hosted", "private deployment",
      "dedicated deployment", "helm chart", "kubernetes install"],
    what: "Some customers won't use a shared, multi-tenant service. Single-tenant options range from a dedicated instance you run for one customer, to deploying into the customer's own cloud account, to on-premises or fully air-gapped installs you never see. Each step moves more operational work into environments you don't control.",
    why: "Regulated industries, governments and large enterprises often require data to stay inside their environment. For them, shared SaaS is a non-starter.",
    build: { weeks: [8, 16], scope: "Packaging the product to install anywhere, an upgrade path, licensing, and support for environments you can't see." },
    buy: { weeks: [4, 8], vendors: "Distr, Omnistrate or Northflank", note: "Distribution platforms handle packaging, licensing and updates. Making the product itself installable and supportable is still engineering work." },
    drivers: [
      { label: "The customer runs it, not you", add: [4, 8], buyAdd: [2, 4] },
      { label: "Fully air-gapped, with offline installs and licensing", add: [4, 8], buyAdd: [2, 4] },
      { label: "Several targets: AWS, GCP, Azure or bare metal", add: [2, 6], buyAdd: [1, 3] }
    ],
    questions: [
      { who: "Product", q: "Is this one deal, or a product line we'll sell again?", why: "One-offs rarely pay for their ongoing cost." },
      { who: "Finance", q: "What do we charge for it?", why: "Dedicated deployments usually price at a multiple of list, and need to." },
      { who: "Engineering", q: "Can every deployment ship from one artifact and one release train?", why: "Forked versions are the long-term cost." },
      { who: "Engineering", q: "How do upgrades happen without one of our engineers on a call?", why: "Customer-run environments drift behind otherwise." },
      { who: "Support", q: "How do we debug an environment we can't access?", why: "Support needs logs and diagnostics built in from the start." },
      { who: "Security", q: "What does the customer's security team require of the install?", why: "Their requirements set the architecture." }
    ],
    related: ["byok", "gdpr-residency", "sla"]
  },
  {
    id: "admin-console", name: "Admin console", aka: "Self-service enterprise administration", areas: ["admin-console"],
    aliases: ["admin console", "admin panel", "admin dashboard", "admin settings", "org settings", "organization settings",
      "workspace settings", "user management", "manage users", "bulk user management", "domain verification",
      "tenant settings", "rollout controls", "change management"],
    what: "An admin console is where a customer's administrators run your product for their company without contacting you: managing users and roles, configuring SSO, setting security policies and viewing usage and billing. Enterprise admins also expect some control over change, such as advance notice of updates and the ability to delay a rollout to their users.",
    why: "Large customers can't file a support ticket for every admin task. Self-service administration is what makes the product manageable at their size.",
    build: { weeks: [4, 8], scope: "One admin area for users, roles, security settings and usage, with an API behind it." },
    buy: null,
    drivers: [
      { label: "Admin tasks run through internal tools or support tickets today", add: [2, 4] },
      { label: "Customers need per-org control over feature rollouts", add: [2, 4] },
      { label: "Every admin action must also be available through the API", add: [1, 3] }
    ],
    questions: [
      { who: "Product", q: "Which admin tasks create the most support tickets?", why: "That's your priority order." },
      { who: "Product", q: "Do customers need to delay or schedule product changes?", why: "Change control is a common enterprise request that's easy to miss." },
      { who: "Engineering", q: "Can we build the console on the same API customers would use?", why: "It gets you API parity for free." },
      { who: "Security", q: "Which admin actions need extra confirmation or logging?", why: "Admin consoles are a high-value target." },
      { who: "Support", q: "What can support do on a customer's behalf, and is it logged?", why: "Acting as a customer needs clear limits." },
      { who: "Sales", q: "What does the buyer's IT team expect to manage themselves?", why: "Their checklist is usually specific." }
    ],
    related: ["rbac", "sso", "audit-logs"]
  },
  {
    id: "public-api", name: "Public API", aka: "API, webhooks and integrations", areas: ["integrations-api"],
    aliases: ["public api", "rest api", "api", "graphql api", "webhooks", "webhook", "api versioning", "api keys",
      "api tokens", "rate limits", "rate limiting", "integrations", "zapier integration", "developer platform", "sdk",
      "oauth apps", "api access"],
    what: "A public API lets customers automate your product and connect it to their other systems. For enterprise use that means stable, versioned endpoints, authentication with scoped tokens, documented rate limits, and webhooks that tell their systems when something changes. Once customers build on it, changing it breaks them, so the API becomes a long-term commitment.",
    why: "Enterprises run dozens of tools and expect them to connect. Integrations and automation are often part of the evaluation, not an afterthought.",
    build: { weeks: [6, 12], scope: "A versioned API for core workflows, token auth, rate limits, webhooks and documentation." },
    buy: { weeks: [4, 8], vendors: "Speakeasy or Stainless for SDKs, and Svix or Hookdeck for webhooks", note: "Tooling covers SDKs, docs and webhook delivery. Choosing which resources and workflows to expose is still the main work." },
    drivers: [
      { label: "Your app's internal endpoints would need redesigning first", add: [3, 6] },
      { label: "Webhooks need retries, signing and replay", add: [2, 3], buyAdd: [0, 1] },
      { label: "Customers need OAuth apps, not just API keys", add: [2, 4] }
    ],
    questions: [
      { who: "Product", q: "Which five workflows do customers most want to automate?", why: "Start with those, not with everything." },
      { who: "Product", q: "What's our deprecation policy?", why: "Enterprise customers expect around twelve months' notice." },
      { who: "Engineering", q: "Are we exposing internal endpoints, or designing a separate surface?", why: "Internal endpoints change with your UI, and break customers when they do." },
      { who: "Engineering", q: "What rate limits reflect our real capacity?", why: "Limits should protect you without surprising customers." },
      { who: "Security", q: "How are tokens scoped, rotated and revoked?", why: "API tokens are credentials with broad reach." },
      { who: "Sales", q: "Which integrations come up in deals most often?", why: "Tells you what to build yourselves." }
    ],
    related: ["data-export", "audit-logs", "rbac"]
  },
  {
    id: "data-export", name: "Data export", aka: "Reporting, analytics and warehouse sync", areas: ["customer-reporting"],
    aliases: ["data export", "export data", "csv export", "reporting", "reports", "analytics", "dashboards",
      "usage reports", "warehouse sync", "data warehouse", "snowflake", "bigquery", "redshift", "databricks",
      "s3 export", "data sharing", "bi integration", "looker", "tableau", "qbr report", "roi report"],
    what: "Enterprise customers want two things from their data in your product: reports that show the value they're getting, and a way to get raw data into their own warehouse. The first means dashboards for admins and executives. The second means scheduled exports or direct syncs into Snowflake, BigQuery or S3 that their analysts can build on.",
    why: "Renewals are argued with data. The executive who signs off on the renewal rarely logs in, so the reporting has to reach them.",
    build: { weeks: [4, 8], scope: "Admin reporting on adoption and outcomes, scheduled exports and a warehouse sync." },
    buy: { weeks: [2, 4], vendors: "Prequel, Bobsled or Snowflake data sharing", note: "Warehouse sync tools handle delivery. Defining metrics customers trust stays with you." },
    drivers: [
      { label: "Customers want direct warehouse syncs, not CSV files", add: [2, 4], buyAdd: [0, 1] },
      { label: "Reports need custom metrics per customer", add: [2, 4] },
      { label: "Data volumes are large, or needed in near real time", add: [2, 5], buyAdd: [1, 2] }
    ],
    questions: [
      { who: "Product", q: "What outcome did the customer buy, and how do we measure it?", why: "Reports should prove the value that was sold." },
      { who: "Product", q: "Who reads the reports: admins, analysts or executives?", why: "Each needs a different format." },
      { who: "Engineering", q: "Which warehouses do our customers use?", why: "Snowflake and BigQuery cover most, but check." },
      { who: "Engineering", q: "Are our metric definitions written down and stable?", why: "Two dashboards that disagree destroy trust." },
      { who: "Security", q: "What data is allowed to leave our systems in an export?", why: "Exports are a data-loss path, and customers ask about it." },
      { who: "Sales", q: "What data do customers ask for in business reviews today?", why: "It's a ready-made spec." }
    ],
    related: ["public-api", "usage-billing", "audit-logs"]
  },

  /* ------------------------------------------------ service & adoption */
  {
    id: "sla", name: "SLA", aka: "Service level agreement: uptime and support commitments", areas: ["uptime-support"],
    aliases: ["sla", "service level agreement", "uptime", "uptime guarantee", "99.9", "99.9%", "99.95", "99.99", "99.99%",
      "three nines", "four nines", "availability", "service credits", "status page", "incident response", "support sla",
      "response times", "severity levels", "premium support", "24/7 support"],
    what: "An SLA is a contractual promise about your service: usually an uptime percentage, support response times by severity, and credits if you miss them. 99.9% uptime allows about 43 minutes of downtime a month, and 99.99% allows about four. Behind the number you need monitoring that measures uptime the way customers experience it, and a support team staffed to meet the response times.",
    why: "Enterprises depend on your product for their own work. An SLA shows you'll stand behind it, and procurement often won't sign without one.",
    build: { weeks: [3, 6], scope: "Availability monitoring from the customer's side, a status page, an incident process and support severity tiers." },
    buy: { weeks: [1, 3], vendors: "Better Stack, Datadog Synthetics, Statuspage or incident.io", note: "Tools handle monitoring, status pages and incident workflows. Deciding what you can honestly promise, and staffing to it, doesn't come in a box." },
    drivers: [
      { label: "Promising 99.99% or higher, which means multi-region failover", add: [6, 12] },
      { label: "24/7 response for top-severity issues", add: [2, 4] },
      { label: "Service credits calculated and applied automatically", add: [1, 2] }
    ],
    questions: [
      { who: "Engineering", q: "What has our availability actually been, measured from the customer's side?", why: "Never sign a number you haven't measured." },
      { who: "Finance", q: "What would the proposed credits have cost us over the last year?", why: "Replaying real history shows the true exposure." },
      { who: "Support", q: "Who responds to a severity-one issue at 3am?", why: "Response times need a staffed rota, not a promise." },
      { who: "Product", q: "What counts as downtime: a full outage, degraded service, or one feature failing?", why: "Definitions decide whether you owe credits." },
      { who: "Legal", q: "Are credits the only remedy, and are they capped?", why: "Uncapped liability is a common redline." },
      { who: "Sales", q: "What number are buyers asking for, and would 99.9% do?", why: "Buyers accept 99.9% more often than teams expect." }
    ],
    related: ["enterprise-onboarding", "single-tenant", "security-questionnaire"]
  },
  {
    id: "enterprise-onboarding", name: "Enterprise onboarding", aka: "Implementation, migration and rollout", areas: ["onboarding"],
    aliases: ["enterprise onboarding", "onboarding", "implementation", "customer implementation", "migration",
      "data migration", "bulk import", "import users", "rollout", "time to value", "professional services",
      "customer success plan", "go live", "go-live", "training"],
    what: "Enterprise onboarding is everything between a signed contract and thousands of people actually using the product: migrating data from the tool you're replacing, importing users in bulk, configuring SSO and roles, training admins and rolling out in phases. It usually runs as a project with milestones on both sides, and is sometimes sold as professional services.",
    why: "Large accounts that stall after signing don't renew. Whether a customer sees value is decided in roughly the first sixty days.",
    build: { weeks: [4, 8], scope: "Bulk import and migration tooling, an implementation playbook and adoption tracking." },
    buy: null,
    drivers: [
      { label: "Data must be migrated from a competitor's product", add: [2, 5] },
      { label: "Rollout covers thousands of users across business units", add: [2, 4] },
      { label: "You plan to sell implementation as paid services", add: [1, 3] }
    ],
    questions: [
      { who: "Product", q: "What does a successful first sixty days look like, in numbers?", why: "Without a target, onboarding never finishes." },
      { who: "Product", q: "What do the customer's admins need to be trained on?", why: "Admins who don't understand the product can't roll it out." },
      { who: "Engineering", q: "Can customers import and check their own data?", why: "Self-service tooling keeps engineers out of every rollout." },
      { who: "Support", q: "Who owns the implementation plan on our side?", why: "Enterprise rollouts need a named owner." },
      { who: "Sales", q: "What did we promise about timelines and support during the sale?", why: "Implementation inherits every promise." },
      { who: "Finance", q: "Is implementation included, or sold as services?", why: "Unpriced services quietly eat margin." }
    ],
    related: ["sso", "admin-console", "sla"]
  }

  ];

  if (typeof module !== 'undefined' && module.exports) module.exports = GLOSSARY;
  else root.TOUPPER_GLOSSARY = GLOSSARY;
})(typeof window !== 'undefined' ? window : globalThis);
