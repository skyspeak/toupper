# 04 · The Enterprise Bench card series

Ten agents named after what they do is the most shareable thing about ToUpper.
Post one card a day for eleven posting days. The pun gets the stop; the
opinion on the card gets the comment.

**Effort:** 11 posts, cards made · **First signal:** week 1 · **Measure:** leads with `campaign = h04_cards`

The images are in [`cards/`](cards/), 1080x1350, which suits LinkedIn and Instagram.
Change an agent and run `python3 growth/make_cards.py` to regenerate them.

## Step by step

1. **Post three times a week,** Tuesday to Thursday, between 8 and 9am for your audience.
2. **Upload the card as an image,** paste the caption, and add the alt text.
3. **Put the link in the first comment,** not the post. Use the `h04_cards` links in [`links.csv`](links.csv).
4. **Reply to every comment in the first hour.** That's most of the reach.
5. **Pin the cover post** to your profile's Featured section.

## Captions

### 00 · Cover

> You just landed your first enterprise deal. Then the questions started.
>
> SSO. SOC 2. Audit logs in their SIEM. A DPA. An AI review. A 99.9% SLA.
>
> So I made a bench of ten specialists, one for each part of it. Every one is
> named after what they do. Over the next few weeks, meet them one at a time.
>
> The names are puns. The specs are not. (It's a concept demo; the agents are
> characters, the guidance is written by hand.)

**Alt text:** Card titled The Enterprise Bench listing ten agents, including Sam L. Assertion for identity and Sarah Baines-Oxley for compliance.

### 01 · Sam L. Assertion (identity)

> Meet Sam L. Assertion. Identity.
>
> Sam's view: the SAML part is a weekend. Linking 12,000 existing password
> accounts without stranding anyone is the actual project.
>
> If your customer wants SSO by a date, that migration is your deadline.
>
> What tripped you up with SSO?

### 02 · Perry Mission (authorization)

> Meet Perry Mission. Permissions.
>
> "If your permission checks live in the frontend, you don't have an
> authorization model. You have a suggestion."
>
> The first big customer always asks for a custom role. How many places in
> your code check permissions today?

### 03 · Bill Prorata (revenue)

> Meet Bill Prorata. Revenue.
>
> Bill thinks nobody has a billing problem. They have a contract-modeling
> problem that shows up as a billing problem.
>
> Quick test: how many invoices did someone edit by hand last month?

### 04 · Sarah Baines-Oxley (compliance)

> Meet Sarah Baines-Oxley. Compliance.
>
> "A certification is a market-access decision. Start with the deals, not the
> framework."
>
> Which deal, by name, is waiting on a certificate you don't have yet?

### 05 · Rick Assessment (security posture)

> Meet Rick Assessment. Security posture.
>
> "EU data stays in the EU" is usually true of the database and false of the
> logs, backups, analytics and support tools.
>
> When did you last check where your data actually goes?

### 06 · Audrey Trail (audit and evidence)

> Meet Audrey Trail. Audit and evidence.
>
> An events table isn't an audit log. Buyers want every admin action,
> searchable, tamper-resistant, and streamed into their own tools.
>
> Could you show a customer who deleted something six months ago?

### 07 · Terry Form (deployment)

> Meet Terry Form. Deployment.
>
> "Every deployment model you add is a permanent tax on release engineering.
> Charge for it."
>
> Has anyone on your sales team already promised a VPC install?

### 08 · Paige Nation (platform and integrations)

> Meet Paige Nation. Platform and integrations.
>
> A public API is a contract you can't quietly change. Publish your
> deprecation policy before your API, not after.
>
> How much notice do you give before breaking an endpoint?

### 09 · Eva Luation (AI systems)

> Meet Eva Luation. AI systems.
>
> "A demo proves the AI can work. An eval set proves it does, and tells you
> the day it stops."
>
> Enterprise AI reviews now ask how you catch regressions. What's your answer?

### 10 · Nina Nines (adoption and service)

> Meet Nina Nines. Adoption and service.
>
> Never sign an uptime number you haven't measured for four quarters.
> 99.99% is about four minutes of downtime a month.
>
> What number is your biggest customer asking for?

## First comment (same on every post)

> Ask [first name of agent] about [their topic], with a rough estimate and the
> questions to settle first: [link from links.csv]
