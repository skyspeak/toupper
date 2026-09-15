# 02 · Email the companies hiring for it

A company posting "first GRC hire (SOC 2)" or "identity engineer (SAML, SCIM)"
has told the world what's blocking them, and roughly when. You're not guessing
at demand; you're answering a job description.

**Effort:** 30 minutes a day · **First signal:** week 2 · **Measure:** leads with `campaign = h02_jobposts`

## Step by step

1. **Search job boards once a day** by hand, ten companies at a time.
   - LinkedIn Jobs, Wellfound, [YC Work at a Startup](https://www.workatastartup.com), company careers pages
   - The monthly *Ask HN: Who is hiring?* thread (search the page for SOC 2, SAML, SCIM)

   | If the post mentions | Send them |
   |---|---|
   | SAML, SSO, identity engineer, Okta, Entra | `/what/sso` |
   | SCIM, provisioning, directory sync | `/what/scim` |
   | SOC 2, GRC, compliance lead, ISO 27001 | `/what/soc2` |
   | First enterprise AE, "selling to enterprise" | `/what/security-questionnaire` |
   | Billing engineer, usage-based pricing, Metronome, Orb | `/what/usage-billing` |
   | AI governance, responsible AI, ISO 42001 | `/what/ai-governance` |
   | LLM evaluation, AI quality, evals | `/what/evals` |

2. **Find one right person.** Founder, CTO or head of engineering at companies
   under about 200 people. Use an address they publish (their site, a blog,
   a GitHub profile) or send a LinkedIn message. Don't guess or scrape emails.
3. **Send email 1.** Short, about their post, one link from [`links.csv`](links.csv).
4. **Log it** in the tracker (below). Follow up on day 4 and day 10, then stop.
5. **Answer replies within a day,** even the "not now" ones.

## Emails

### Email 1 — the job post (SOC 2 example)

> **Subject:** your GRC hire
>
> Hi [first name],
>
> Saw [company] is hiring a [job title]. That usually means a deal is waiting
> on SOC 2, so in case it's useful before the hire starts:
>
> With a compliance platform, readiness tends to run 3–6 engineer-weeks plus
> whatever gaps you find, and the Type II observation window makes it six to
> nine months end to end. The thing that saves the most time is scoping to the
> systems your customer's data actually touches.
>
> I built a short breakdown with the six questions to settle first:
> [link]
>
> No pitch attached. If it's not useful, reply "no" and I won't email again.
>
> [Your name]
> [Your title], ToUpper · [city]

**For SSO or SCIM posts**, swap the middle paragraph:

> The protocol is the quick part. Linking existing password accounts, and
> deciding what happens when an SSO email doesn't match, is where teams lose
> the most time.

**For AI governance or evals posts**:

> The first thing enterprise reviewers ask is how you know the AI got better,
> not worse, after a change. A small eval set from real cases answers that
> faster than any policy document.

### Email 2 — day 4, add something new

> **Subject:** Re: your [job title] hire
>
> One more thing from people who've done this: [a specific, useful point from
> the topic's questions list, e.g. "decide whether Type I first is enough for
> the customer's procurement team; many accept it while Type II runs"].
>
> The full list is in the link from before. Happy to talk it through if helpful.
>
> [Your name]

### Email 3 — day 10, close the loop

> **Subject:** Re: your [job title] hire
>
> Last note from me. If [the topic] is still open after the hire starts and you
> want a second pair of eyes on scope, reply and I'll set up a call. Otherwise
> good luck with the search.
>
> [Your name]

## Tracker columns

`date, company, job title, trigger, person, channel (email/LinkedIn), link sent, email 1, email 2, email 3, reply, outcome`

## Staying on the right side of email rules

- Business addresses only, one relevant message, a clear opt-out, and stop when asked.
- In the US that covers CAN-SPAM for this kind of one-to-one outreach; in the UK
  and EU you're relying on legitimate interest, so keep it tightly relevant to
  their job post and honour opt-outs immediately.
- Never add these people to a newsletter.
