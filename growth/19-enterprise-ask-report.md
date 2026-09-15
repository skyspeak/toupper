# 19 · The Enterprise Ask Report

Publish a short quarterly report on what enterprise customers are asking
startups for right now. Journalists, VCs and newsletter writers quote numbers
like "[X]% of first enterprise deals now include an AI review". A report makes
ToUpper the source of that number, and every mention links back.

**Effort:** 1 survey, 1 report a quarter, about 2 days · **First signal:** week 6 · **Measure:** leads with `campaign = h19_report`, plus mentions

## Where the data comes from

1. **A survey** of founders, sales leads and engineers who've been through an
   enterprise deal in the last 12 months (questions below).
2. **ToUpper's own counts:** which topics people asked about, from
   `node tools/leads.js --terms`. Report these as "most-asked topics on
   ToUpper", never as a survey of the market.
3. **The guide's estimates** for the cost section, which are published anyway.

Aim for 100 survey responses before publishing. Below 50, call it a "pulse"
and say how many people answered.

## Step by step

1. **Build the survey** in Google Forms or Tally with the questions below.
   Don't collect emails unless someone opts in to get the report.
2. **Ask for responses** in founder communities, from hack 15 interviewees,
   hack 16 partners and your own network. Offer the report early to anyone
   who answers.
3. **Close after three weeks.** Count, don't model: percentages of respondents,
   with the number of respondents on every chart.
4. **Write the report** in the format below. One page of findings, one page on
   cost, one page of method.
5. **Send it privately a week early** to 10 writers who cover SaaS and startups,
   with an embargo date. Offer them one finding exclusively.
6. **Publish** as a page and a PDF. Post the three strongest numbers as
   separate posts over the following week.

## Survey (8 questions, 3 minutes)

1. In the last 12 months, did you close or try to close a deal with a company
   of 1,000+ employees? (Closed / Lost / Still in progress / No)
2. Your role (Founder / Sales / Engineering / Product / Security or compliance / Other)
3. Company size (1–10 / 11–50 / 51–200 / 200+)
4. Which did the customer ask for? (tick all: SSO, SCIM, custom roles, audit
   logs, SOC 2, ISO 27001, security questionnaire, DPA or data residency, pen
   test, SLA, single-tenant or self-hosted, usage-based pricing, net terms
   invoicing, AI data use or training, evals or AI accuracy, AI governance
   such as ISO 42001, other)
5. Which of those blocked signing until you had them? (same list)
6. How long from "we'd like to move forward" to signature? (under 4 weeks /
   1–3 months / 3–6 months / 6+ months / didn't sign)
7. What surprised you most? (free text, optional)
8. Want the report? (email, optional)

## Report format

```markdown
# The Enterprise Ask Report, [Quarter Year]

What enterprise customers asked startups for, from [N] people who went
through a deal in the last 12 months.

## Five findings
1. **[X]% were asked for SSO**, and [Y]% said it blocked signing.
2. **[X]% faced an AI review**, up from [Y]% last quarter. [only once you have two quarters]
3. **The most common blocker was [ask]**, not [ask people expect].
4. **Median time from yes to signature: [N] weeks.** [one line on what made it longer]
5. **In their words:** "[best free-text answer]"

## What the common asks cost
If a first enterprise deal asks for SSO, SCIM, custom roles, audit logs, SOC 2,
a security questionnaire, an SLA and enterprise invoicing, ToUpper's rough
estimate is 30–57 engineer-weeks to build it all, or 12–26 buying where a
platform exists. Add evals, AI guardrails and AI data controls and it's
41–79 to build, or 19–40 buying where possible. SOC 2 takes six to nine
months on the calendar either way.

## Method
[N] responses collected [dates] through [channels]. Self-selected, not a
random sample. Percentages are of respondents who answered each question.
Estimates are ToUpper's hand-written ranges, not survey results.
```

## Email to a writer (a week before)

> **Subject:** embargoed: what enterprise customers asked startups for this quarter
>
> Hi [first name],
>
> You wrote about [their recent piece]. I'm publishing a short report on
> [date] based on [N] founders and sales leads who went through an enterprise
> deal this year. The finding I think fits your readers: [finding].
>
> The full draft is attached, under embargo until [date, time, timezone]. The
> method's on page 3, including the limits: it's a self-selected sample.
>
> Happy to share the underlying counts.
>
> [your name]

## What to measure

- Mentions and links (search the report title monthly).
- Leads tagged `h19_report`.
- Survey respondents who opted in. They're next quarter's first responses.
