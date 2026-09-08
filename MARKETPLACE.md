# Building both sides

Demand is humans: startups that just hit the enterprise wall.
Supply is agents: the bench, nine of them, one part of the layer each.

So this is human-to-agent matching. Ten ways to grow each side, and what I'd
do first.

---

## Why this one is shaped differently

In most marketplaces, supply is the hard side. You recruit it, court it, and
watch some of it leave for a competitor. That work never stops.

Here you can ship nine agents on a Tuesday and nine more the Tuesday after.
No recruiting, no churn, no supply cold start at all.

Which moves the difficulty somewhere else:

| | Normal marketplace | Human-to-agent |
|---|---|---|
| Hard side | Supply: recruit, retain, prevent leakage | Demand: nobody arrives until they're blocked |
| Supply cost | Rises with volume | Near-flat |
| Scarce resource | Good suppliers | Trust that the supply is any good |
| Failure mode | Empty directory | A bench nobody believes |

Two problems fall out of that, and neither is "find more supply." You have to
reach people inside a narrow window, and you have to make a bench that cost
nothing to create worth believing.

One aside before the list. Every agent card names the point where it hands off
to a human. That isn't a second supply side. It's a trust feature. An agent
that says "get an auditor for this part" reads as more credible than one
claiming the whole job, and admitting a boundary costs nothing.

---

## Demand: the humans

### 1. Publish what's already written

`data/domains-reference.js` holds eighteen long write-ups nobody has read.
What good looks like, the signals you need help, typical engagements. It's the
material people search for at 11pm after a security review goes badly.

Put each one up as a reference page with the agent that owns it at the bottom.
"What SCIM deprovisioning actually requires." "How to scope SOC 2 so it doesn't
eat two quarters." "Why your EU residency claim is probably false."

Cheapest channel available, because the writing is done. It got cut from the
site for being too heavy, which is what you want in an authority layer.
Watch organic sessions against area-selected: picking an area is
self-identification, and it's the engagement number that matters.

### 2. Show up on the trigger

Nobody wakes up wanting enterprise readiness. They want it the day something
specific happens. An LOI gets signed. A 300-line questionnaire lands. Procurement
rewrites the order form. A pen test comes back ugly.

The "ten weeks after you sign" timeline on the site is already built around
those moments, and distribution should follow the same shape. Be somewhere
findable the week a founder posts *"we just closed our first enterprise deal
and they're asking for SSO."* If people are finding you eight weeks after
signing, they've already panic-hired someone and you're measuring the wrong end.

### 3. Give away one agent doing one job

Free tool: paste your security questionnaire, get back a gap analysis. What you
can already answer, what needs an engineering change, what needs a certificate
you don't hold.

That's Sarah Baines-Oxley doing exactly one job, free, at the worst moment of
someone's month. A questionnaire arrives Friday, is due Tuesday, and lands on
whoever is least able to say no.

Sharpest wedge on this list, and it doubles as proof for the supply side (#8).
Count completions first, then return visits, because nobody's questionnaire is
ever their last one.

### 4. Partner with whoever sees the trigger first

A few people know a startup hit the wall before we do.

- **VC platform teams** field "our portfolio company needs SSO" constantly and
  have nothing to offer beyond a Slack introduction
- **Compliance automation vendors** have customers who are by definition
  mid-trigger, and a product that stops where the engineering starts
- **Auth and billing infrastructure vendors** lose deals when a prospect can't
  execute the migration
- **Outside counsel and fractional CFOs** are in the room for the order-form fight

Co-marketing, not affiliate links. The only honest measure here is whether a
partner sends a second referral without being asked.

### 5. Make the output forwardable

Landing pages don't get forwarded. A diagnosis does, to a board, a co-founder,
or the buyer's security team as evidence there's a plan.

The eighteen-question scorecard built earlier in this repo (commit `a2c89e9`)
did that job and got cut for weight. It should come back as the output rather
than the front door: something the agents produce once they've seen your
situation, that travels without you. If unique viewers per artifact goes above
one, you're getting distribution for free.

---

## Supply: the agents

### 6. Depth before headcount

Nine agents that produce real artifacts beat thirty that produce descriptions.
Every agent currently lists four things it "gives you back," an IdP compatibility
matrix, a contract data model, a gap analysis. None of them are generated yet.

Getting one agent to produce its four is worth more than adding nine names.
Sam L. Assertion is the right first candidate, because you can check the work:
an IdP matrix is either right about Okta's quirks or it isn't. Artifacts per
session is currently zero, which makes it the easiest number on the list to
move.

### 7. Grounding is the raw material

An agent is worth what its corpus is worth, and right now the corpus is fiction.
Real grounding comes from published specs and RFCs, vendor quirk documentation,
audit frameworks, public post-mortems, and eventually transcripts of engagements
the platform has seen itself.

Practitioners matter here as curators, not as labour on the platform. Pay
someone who has done six SCIM migrations to spend two days writing down what the
agent must know and where it tends to go wrong. Bounded work, high status, and
nothing like being asked to join a directory. If curators come back for a second
area unprompted, the ask is landing.

### 8. Evals are how free supply earns trust

When supply costs nothing to create, nobody assumes it's any good. Reputation
has to be replaced with published evaluation: a fixed set of real tasks per
agent, a visible pass rate, failures shown rather than buried.

*"Sam L. Assertion: 47 IdP configuration scenarios, 91% correct, fails on
IdP-initiated flows with legacy Ping."*

One sentence like that does more for trust than any amount of design work. It's
the highest-leverage thing on the supply side, because it turns the structural
weakness of manufactured supply into a number you can publish per agent, per
release.

### 9. Let demand pick the next agent

Which areas do people select and then get nothing useful for? That's your build
queue, and the site already captures it, since every lead carries the selected
areas.

Nine agents cover eighteen areas by doubling up, and some of the pairings are
lazy. Rick Assessment holds security posture and privacy/residency, which are
different jobs. Split the ones where the data says the shared agent is thin,
rather than the ones the taxonomy says are separate. High selection frequency
with low brief conversion is an agent that isn't good enough yet.

### 10. Open the bench

This becomes a genuine two-sided market at the point where you publish the
taxonomy as a schema and let other people ship agents against it.

Someone who has spent a decade on FedRAMP will build a better FedRAMP agent
than we will. The eighteen areas are the shelf, the evals in #8 are the quality
bar, and the demand from #1 to #5 is the reason to build for it rather than
alone. Demand attracts builders, more agents deepen coverage, better coverage
attracts demand.

It only works after #8 though. An open bench without a published quality bar is
a store full of junk. Zero third-party agents for the first year is a fine
result.

---

## What I'd do first

Run #3 and #6 as one project from two directions. The questionnaire tool is the
wedge, and Sarah Baines-Oxley actually doing the work is the proof. Start #1 in
parallel, since it compounds slowly and the writing already exists. Then #8 the
moment anything real ships, because a published pass rate is the whole
difference between this and every other AI agent landing page.

Everything else waits.

## Risks worth stating

The fiction has a shelf life. The site says three times that the agents are a
design fiction, which is fine for a concept and untenable the moment someone
pays. That makes #6 and #7 prerequisites rather than growth work.

Free supply cuts both ways. If anyone can ship nine agents, the bench can't be
the moat. Put the investment into the taxonomy, the corpus and the eval record
instead of into agent count.

The general-purpose model is the competitor. A founder can paste their
questionnaire into any assistant today. The answer has to be that a narrow,
grounded, evaluated agent measurably beats it on this specific work, which is
what #8 forces you to prove.

Compliance vendors already own the trigger moment. The ground you can defend is
the engineering work they don't touch: identity, billing, deployment. Not the
certification they do.
