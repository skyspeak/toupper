# 01 · Answer with a link that's already set up

Founders ask the same questions in public every week: *"Our first enterprise
customer wants SOC 2, how long does that take?"* Most replies are opinions. Yours
can be a real answer plus a link that opens the estimate **already adjusted to
their situation**, because the factors they mentioned travel in the URL.

**Effort:** 15 minutes a day · **First signal:** week 1 · **Measure:** leads with `campaign = h01_answers`

## Step by step

1. **Save these searches** and check them once a day.
   - Reddit: `"SOC 2" first enterprise customer`, `"SSO" enterprise customer asked`, `SCIM okta startup`, `security questionnaire help`, `"do you train on" customer data AI`
   - Hacker News: search [hn.algolia.com](https://hn.algolia.com) for `Ask HN SOC 2`, `Ask HN SSO`, `enterprise customer requirements`
   - LinkedIn: search posts for `"first enterprise customer"` and `"security questionnaire"`, sorted by latest
   - Indie Hackers and any founder Slack or Discord you already belong to
2. **Pick threads with a specific ask.** "Customer wants SCIM by Q3" is good.
   "Thoughts on enterprise?" isn't.
3. **Build their link.** Open the topic at `toupper.vercel.app/what/<topic>`,
   tick the factors they mentioned, choose build or buy, then **Share → Copy
   link**. Add the tag from [`links.csv`](links.csv) for the platform.
4. **Write the answer in the thread first.** Five to eight sentences in your
   own words. The templates below are starting points, not paste-and-go.
5. **Disclose, then link.** One line saying you built it.
6. **Log it.** Thread URL, date, topic. Check back in 48 hours and answer
   follow-up questions.

## Reply templates

Estimates below are exactly what the linked view shows.

### SOC 2, "how long for our first customer?"

> Rough honest answer: the engineering is weeks, the calendar is months.
> With a compliance platform, readiness is roughly 7–14 engineer-weeks if
> you don't have central logging yet and engineers have standing production
> access, which is most early teams. The long pole is the Type II observation
> window, so plan six to nine months end to end.
>
> Two things that save the most time: scope tightly (only the systems your
> customer's data touches), and ask the customer whether a Type I plus a plan
> gets you through procurement while Type II runs. Many will accept it.
>
> I built a guide that breaks this down, including the questions to settle
> before you start. This link is set to your situation:
> [link: soc2, buy, logging + prod access]

### SSO for a customer, existing password users

> The protocol part is smaller than people expect. The migration isn't.
> Linking existing password accounts to SSO, plus letting the customer enforce
> SSO with a break-glass login, puts an in-house build at around 6–11
> engineer-weeks.
>
> Decide early what happens when someone's SSO email doesn't match their
> existing account, because that's where the bugs live. A vendor like WorkOS
> or Auth0 cuts the protocol work but not that decision.
>
> I built a breakdown of this, set to your case: [link: sso, linking + enforcement]

### SCIM, "Okta keeps coming up"

> If you already have SSO, buying SCIM through something like WorkOS, Stytch
> or Merge is about 2–4 engineer-weeks, most of it spent mapping directory
> groups to your own roles. Settle "suspend or delete when someone is removed"
> before you write code; customers will ask on day one.
>
> I made a write-up with the questions to settle first: [link: scim, buy, group mapping]

### Audit log export for a security review

> An internal app log won't pass. Buyers want admin, login and permission
> events, searchable by them and streamed into their SIEM. If events come from
> several services and they want Splunk or Datadog streaming, budget about
> 6–14 engineer-weeks. Counting how many services emit events is the fastest
> way to size it.
>
> Breakdown here (I built it): [link: audit-logs, SIEM + many services]

### Usage-based billing for enterprise contracts

> Billing platforms (Metronome, Orb, Lago) do the rating and invoicing. The
> hard part stays with you: accurate usage events, and contracts mixing
> commits, credits and overage. Add migrating existing seat-based customers
> and it's roughly 6–12 engineer-weeks. Pick the one value metric first;
> everything else follows.
>
> I wrote this up, set to your case: [link: usage-billing, buy, commits + migration]

### "Do you train on our data?" from a buyer's legal team

> Answer it in writing, and make sure the system matches the sentence. That
> means knowing which model providers see prompts and what they retain, and
> giving admins an off switch that actually stops data flowing. The off switch
> plus documentation is around 4–8 engineer-weeks; most of the rest is
> contracts with your providers.
>
> I keep a breakdown with the questions legal will ask: [link: ai-data-controls, off switch]

### Prompt injection in an AI review

> Start by listing everything your AI reads that an outsider could write:
> uploads, emails, web pages. That's the attack surface. Input and output checks
> plus adversarial testing is roughly 6–12 engineer-weeks when the AI reads
> untrusted content, more if it can take actions.
>
> I built a guide on this (link set to your situation): [link: guardrails, untrusted content]

### "Customer wants it in their own VPC"

> Treat it as a pricing decision before an engineering one. If the customer
> runs it rather than you, expect roughly 12–24 engineer-weeks to make the
> product installable, upgradable and supportable blind. Price it at a
> multiple of list, or it will cost more than the deal is worth.
>
> Breakdown, including what to charge for: [link: single-tenant, customer-run]

## Don't

- Post the same reply twice. Communities notice.
- Drop a link in a thread where nobody asked a question.
- Link without answering. If the rules forbid links, answer and leave it there.
