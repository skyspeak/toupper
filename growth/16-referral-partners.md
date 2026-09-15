# 16 · Referral links for fractional CTOs and advisors

Fractional CTOs, security consultants, startup lawyers and sales advisors meet
startups the week an enterprise deal gets serious. They're asked "what does
SSO involve?" constantly and would rather send a good link than write it out
again. Give each one a personal link and a monthly note on how many people it
helped. They get a reference to send; you get warm, dated leads.

**Effort:** 15 emails, then 30 minutes a month · **First signal:** week 3 · **Measure:** leads with `campaign = h16_partners`

## Who to ask

| Partner | Where they are | What they get asked |
|---|---|---|
| Fractional CTOs | LinkedIn, fractional networks, founder Slack groups | SSO, SCIM, RBAC, single-tenant |
| Security and compliance consultants | vCISO directories, compliance platform partner lists | SOC 2, questionnaires, pen tests |
| Startup lawyers | Law firms' emerging-company practices | DPAs, data residency, AI terms |
| Sales advisors and fractional CROs | Sales communities, LinkedIn | SLAs, invoicing, questionnaires |
| AI engineering consultants | LLM meetups, consultancy sites | RAG, evals, guardrails, AI data controls |

## Step by step

1. **Pick 15 people** across the table. Favour ones who post useful content;
   they're used to sharing links.
2. **Send the email below.**
3. **For each yes, make their link:** add a row to `links.csv` with
   `utm_source=partner_<name>` and `utm_campaign=h16_partners`. If they work
   mostly on one topic, point it at that topic (`/what/soc2?...`).
4. **Monthly, send their numbers** (template below) from
   `node tools/leads.js --sources`.
5. **Pass leads back** when a lead needs hands-on help in their area and says
   so. That's what keeps partners sending.

## Rules for this one

- **No commissions unless disclosed.** If you ever pay a referral fee, the
  partner has to tell their clients, and you say so on the site.
- **Only pass on a lead with the lead's permission.** Ask first: "Want me to
  introduce you to someone who does this hands-on?"
- **Partners aren't endorsed.** Don't list them as "ToUpper certified" or similar.

## Email

> **Subject:** a link for when clients ask about SSO/SOC 2
>
> Hi [first name],
>
> I've seen your posts about [their topic]; [one specific thing you found useful].
>
> I build ToUpper, a free guide to what enterprise customers ask startups for.
> For each item (SSO, SCIM, SOC 2, audit logs, RAG, evals and 22 more) it
> explains what it is, gives a rough build-or-buy estimate that adjusts to the
> startup's situation, and lists the questions to answer before starting.
>
> If clients ask you these things, you're welcome to send them there instead of
> writing it out again. I'll give you your own link and tell you each month how
> many people it helped. When someone needs hands-on help in your area and
> asks for it, I'll introduce them to you.
>
> No fee either way. Interested?
>
> [your name]

## Monthly note

> Hi [first name], your ToUpper link for [month]:
>
> - [N] people opened it
> - most read: [topic], [topic], [topic]
> - [N] asked for hands-on help; [N] said yes to an introduction, which I've sent
>
> If your clients keep asking something that isn't covered, tell me and I'll
> add it.

## Introduction (with the lead's permission)

> **Subject:** [lead first name] ↔ [partner first name]: [topic]
>
> [Lead first name], meet [partner first name], who [one line on what they do].
> [Partner first name], [lead first name] is [one line on their situation and deadline].
>
> I'll leave you to it.

## What to measure

- Active partners (at least one visit in the month).
- Leads by `source = partner_*`. Compare time-to-reply with other leads; partner
  leads are usually further along.
- Introductions made. Partners who get introductions send more.
