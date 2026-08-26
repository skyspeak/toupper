/* The two places enterprise deals actually die. Rendered by every variant,
   each row linked to the practice areas it really depends on. */

window.TOUPPER_TRACKS = [
  {
    id: "compliance",
    eyebrow: "Compliance",
    title: "The certificate you don't have is the deal you don't close.",
    blurb: "Every certification is a market-access decision with a different cost curve, and the expensive mistake is starting the wrong one at the wrong time — or scoping it far wider than the deals in front of you require.",
    rows: [
      { k: "SOC 2 Type II", v: "Table stakes above six figures. Four to six months, and the scope you draw is the whole cost.", a: ["compliance"] },
      { k: "ISO 27001", v: "What European buyers ask for instead. Overlaps SOC 2 by roughly 60% — sequence them, don't run them twice.", a: ["compliance"] },
      { k: "HIPAA & PCI", v: "Not certificates so much as constraints on your architecture: BAAs, PHI segmentation, cardholder scope reduction.", a: ["compliance", "security"] },
      { k: "FedRAMP", v: "Multi-year and multi-million, and close to pointless without a sponsoring agency already at the table.", a: ["compliance", "deployment"] },
      { k: "GDPR & residency", v: "Contract clauses that become engineering work: deletion that reaches backups, an EU region that is genuinely EU.", a: ["privacy"] },
      { k: "The questionnaire", v: "Three hundred lines, arriving on a Friday. A trust center answers most of it without an engineer.", a: ["procurement", "security"] },
      { k: "Audit evidence", v: "Immutable logs, exportable into their SIEM, retained for the term of the contract.", a: ["audit-logs"] }
    ]
  },
  {
    id: "revenue",
    eyebrow: "Revenue",
    title: "Enterprise contracts do not fit through a checkout.",
    blurb: "Self-serve billing is a payment flow. Enterprise billing is a system of record — and the month after your first large contract signs is a bad time to discover the difference.",
    rows: [
      { k: "Packaging", v: "What sits in Enterprise, what is an add-on, what is a platform fee — decided once, not renegotiated per deal.", a: ["product-assortment"] },
      { k: "The value metric", v: "Seats stop working upmarket. Whatever you meter instead has to be right before it appears on an invoice.", a: ["pricing-packaging"] },
      { k: "Contract shapes", v: "Three-year ramps, annual commits, quarterly true-ups, overage. Modeled as data, or reconciled by hand forever.", a: ["billing-revops"] },
      { k: "Order to cash", v: "POs, net-60, credit memos, entity consolidation. Invoices reproducible from usage events months later.", a: ["billing-revops"] },
      { k: "Revenue recognition", v: "ASC 606 on ramped multi-year contracts, agreed with your auditors before you countersign.", a: ["billing-revops", "compliance"] },
      { k: "Deal desk", v: "Published discount bands and an approval path that still holds in the last week of a quarter.", a: ["pricing-packaging", "procurement"] }
    ]
  }
];
