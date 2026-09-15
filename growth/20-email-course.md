# 20 · A five-day email course: "You just landed an enterprise deal"

Most visitors aren't ready to ask for help today, but they will be in a month
when the questionnaire arrives. A free five-day email course captures them now
and teaches them what's coming, one email a day. Courses get forwarded to
cofounders, and the last email asks for the reply that becomes a lead.

**Effort:** set up once in 2 hours, runs by itself · **First signal:** week 2 · **Measure:** signups tagged `h20_course`, and replies to day 5

## Step by step

1. **Pick a newsletter tool with automations.** Buttondown, Kit or Loops all
   send a sequence to each new subscriber, and all have free tiers to start.
2. **Create the five emails below** as an automation: day 0 on signup, then one
   a day. Send at 8am in the subscriber's time zone if the tool supports it.
3. **Make a signup page** in the tool with the landing copy below. Turn on
   double opt-in.
4. **Link to it** from your posts (hacks 04, 05, 08), your email signature and
   the thank-you reply you send leads. Use the tagged links in `links.csv`.
5. **Read every reply to day 5** and answer within a day. That's the lead.
6. **Every month,** check which email loses the most people and rewrite that one.

## Rules for this one

- **Only people who signed up themselves.** Don't import leads or contacts
  into the course. Someone who asked for help on one topic didn't ask for
  five emails.
- **Unsubscribe link in every email.** The tools add it; don't remove it.

## Signup page

> **You just landed an enterprise deal. Here's what happens next.**
>
> A free five-day email course for startups selling to their first big
> customer. One short email a day:
>
> 1. The six asks that arrive first
> 2. Which asks block the signature, and which can wait
> 3. Surviving the security questionnaire
> 4. The AI review
> 5. Building vs buying, and what to decide first
>
> [email] [Send me day 1]
>
> No sales pitch. Unsubscribe any time.

## Day 1 · The six asks that arrive first

> **Subject:** the asks that arrive first
>
> Hi,
>
> Congrats on the deal. Here's what usually shows up in the next few weeks, in
> roughly this order:
>
> 1. **SSO.** Their staff want to log in with their company account.
> 2. **A security questionnaire.** 100 to 300 questions, often due in days.
> 3. **Your SOC 2 report,** or a date when you'll have one.
> 4. **A DPA,** sometimes with a requirement to keep data in a region.
> 5. **An AI review,** if your product has AI features.
> 6. **Order form changes:** net 60, ramps, an uptime commitment.
>
> You don't need all six before you sign. Tomorrow: how to tell which ones
> you do.
>
> [your name]

## Day 2 · Block or defer?

> **Subject:** which ones actually block the deal
>
> Hi,
>
> Most asks fall into one of three groups:
>
> - **Blocks signing.** Usually the security questionnaire and the DPA. Legal
>   and security have to approve before procurement will.
> - **Blocks rollout.** Usually SSO and SCIM. They'll sign, but IT won't let
>   12,000 people in without them.
> - **Nice to have.** Custom roles, audit log exports and API access are often
>   asked for and can be written into the order form as "within 90 days".
>
> Ask your champion one question: "Which of these would stop you signing,
> and which would stop you rolling out?" They'll usually tell you.
>
> Tomorrow: the questionnaire.

## Day 3 · The security questionnaire

> **Subject:** 300 questions due Tuesday
>
> Hi,
>
> Three things make the questionnaire manageable:
>
> 1. **Sort before you answer.** Go through once and mark each question: can
>    answer now, needs an engineering change, needs a certificate we don't have.
> 2. **Answer the gaps honestly.** "Not yet; planned for Q3" is fine. A "yes"
>    you can't back up comes out in the audit, and that can end the deal.
> 3. **Save every answer.** The next questionnaire will be 70% the same.
>
> If a line item doesn't make sense, this explains the common ones, with what
> each takes to build: [tagged /what/security-questionnaire link]
>
> Tomorrow: the AI review, which is newer and catches more people out.

## Day 4 · The AI review

> **Subject:** "does your model train on our data?"
>
> Hi,
>
> If your product uses AI, expect three questions:
>
> 1. **Do you train on our data?** Have a written answer that covers your
>    model provider too, including how long they keep prompts.
> 2. **How do you know it's accurate?** They're asking about evals: a set of
>    reviewed examples you test against before each release.
> 3. **What stops prompt injection?** Especially if the AI reads emails,
>    documents or web pages, or can take actions.
>
> Admins will also want a switch to turn AI features off for their company.
> That one's usually quick to build, and it gets you through a lot of reviews.
>
> More on each: [tagged /what/evals link]
>
> Tomorrow: build or buy.

## Day 5 · Build, buy, and what to decide first

> **Subject:** before anyone writes code
>
> Hi,
>
> For most asks there's a platform that does the hard part. SSO takes about
> 3–5 engineer-weeks to build or 1–2 to integrate; SCIM, 3–6 or 1–2; audit
> logs, 3–6 or 1–3. Buying usually wins for a small team, but not always.
>
> Whichever you choose, decide these first. They change the estimate more than
> the code does:
>
> - **Who sets it up:** your team, or the customer's admin by themselves?
> - **What happens to existing users** and their data?
> - **Is this one customer's requirement,** or what the next ten will ask for?
>
> That's the course. One last thing: **reply and tell me what your customer
> asked for.** I read every reply and I'll tell you what I'd do first.
>
> [your name]
>
> PS. Every topic, with estimates you can adjust: [tagged /what link]

## What to measure

- Signups by source (most tools record the referring page; also tag the
  signup link `utm_campaign=h20_course`).
- Open rate by day. Below 40% on day 2 means the subject lines need work.
- Replies to day 5. That reply rate is the number that matters.
