# 13 · Get the buyers to send it

Every other hack reaches the startup. This one reaches the enterprise security
and procurement people who send startups the questionnaire in the first place.
They spend hours chasing vendors who don't understand the questions. Give them
a link to paste into their vendor emails, and every startup they review
arrives at ToUpper with a deadline.

**Effort:** 20 emails, 1 post · **First signal:** week 4 · **Measure:** leads with `campaign = h13_buyers`

## Why a buyer would do this

- Vendors who understand the question answer faster and more accurately.
- It's free, neutral and doesn't sell anything to the buyer's vendors.
- It makes the buyer look helpful to startups they actually want to work with.

## Step by step

1. **Find 20 people** whose job is vendor security review: titles like "Third
   Party Risk", "Vendor Security", "GRC Analyst", "IT Procurement". LinkedIn
   search works. Only contact people through LinkedIn or a published work
   address; no guessed emails.
2. **Send the note below.** One message, one follow-up after a week.
3. **Give anyone who says yes their own link** from `links.csv`
   (`utm_source=buyer_<company>` on the h13 row), so you can tell them later
   how many vendors used it.
4. **Post once** to the third-party risk crowd (LinkedIn, the GRC and TPRM
   communities that allow resources) with the post below.
5. **After a month,** send each buyer their numbers. That report is what gets
   the link added to their standard vendor email template.

## Message to a vendor security reviewer

> Hi [first name],
>
> Quick one from the other side of your questionnaires. I build ToUpper, a
> free guide that explains to startups what enterprise reviewers are asking
> for: SSO, SCIM, audit logs, SOC 2, data residency, AI data use and so on,
> with what each one takes to put in place.
>
> It might be useful to link in your vendor emails, so small vendors stop
> replying "what's SCIM?" three days before the deadline. If that would save
> you chasing, here's a link you're welcome to use: [their tagged link]
>
> It doesn't sell anything to your vendors and there's no signup. If a
> question comes up a lot that it doesn't cover, tell me and I'll write it up.
>
> [your name]

## Line they can paste into a vendor email

> New to enterprise security reviews? This free guide explains the common
> requirements (SSO, SCIM, audit logs, SOC 2, AI data use) and what each takes:
> [link]. It's not affiliated with [Company].

## Post

> For the people who send security questionnaires:
>
> How much of your review time goes on vendors who don't understand the
> question yet?
>
> I made a free guide for the vendor side. It explains SSO, SCIM, audit logs,
> SOC 2, data residency, AI data controls and 22 other common asks, what each
> takes to put in place, and what the vendor needs to decide first.
>
> If you want to link it in your vendor emails, go ahead. No signup, nothing
> sold to your vendors. [link]

## Follow-up report (a month later)

> Hi [first name], a quick update since you started linking the guide.
> [N] people opened it from your link, and the most-read topics were [top 3,
> from `node tools/leads.js --terms` filtered to their source].
>
> If it's useful, those three are probably where your vendors struggle most.
> I'm happy to write up anything else they keep getting stuck on.

## What to measure

- Buyers who agree to link it. Two out of twenty is a strong result.
- Leads by `source = buyer_*`. These leads have a live review and a deadline,
  so reply to them the same day.
