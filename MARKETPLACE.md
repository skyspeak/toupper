# Building both sides

**Demand: humans.** Startups and scaleups that just hit the enterprise wall.

**Supply: agents.** The bench. Nine today, each owning one part of the layer.

This is human-to-agent matching. Ten ways to grow each side, what to measure,
and what I would do first.

---

## Why this marketplace is not shaped like the others

In a normal marketplace, supply is the hard side. You recruit it, you court it,
it leaves for a competitor, and it takes years to build. That is the whole game.

Here, **supply is manufactured**. You can ship nine agents on a Tuesday, and
nine more the Tuesday after. There is no recruiting, no churn, no cold start on
the supply side at all.

That inverts where the difficulty sits:

| | Normal marketplace | Human-to-agent |
|---|---|---|
| Hard side | Supply — recruit, retain, prevent leakage | **Demand** — nobody arrives until they are blocked |
| Supply cost | Rises with volume | Near-flat |
| Scarce resource | Good suppliers | **Trust that the supply is any good** |
| Failure mode | Empty directory | A bench nobody believes |

So there are two real problems, and neither of them is "find more supply":

1. **Reach humans at the moment they are blocked** — a narrow, bursty window.
2. **Make the agents provably worth using** — because supply that costs nothing
   to create is supply nobody assumes is good.

Everything below serves one of those two.

*A note on the "hands to a human" line on every agent card: that is not a second
supply side. It is a trust feature. An agent that says "get an auditor for this
part" is more credible than one that claims everything, and it costs nothing to
be honest about a boundary.*

---

## Demand — the humans

### 1. Publish the corpus, not the pitch

`data/domains-reference.js` already holds eighteen deep write-ups: what good
looks like, the signals you need help, typical engagements. That is not
marketing copy — it is what people search at 11pm after a security review went
badly.

Publish each as a standalone reference page, with the agent that owns it at the
bottom. "What SCIM deprovisioning actually requires." "How to scope SOC 2 so it
does not eat two quarters." "Why your EU residency claim is probably false."

Cheapest channel available, because the writing is already done. It was cut
from the site for being too heavy; it is exactly right as an authority layer.

*Measure:* organic sessions → area selected. Selecting an area is
self-identification, and it is the only engagement metric that matters here.

### 2. Ride the trigger, not the persona

Nobody wakes up wanting enterprise readiness. They want it the day a specific
thing happens: an LOI is signed, a 300-line questionnaire lands, procurement
rewrites the order form, a pen test comes back ugly.

The "ten weeks after you sign" timeline is already trigger-shaped. Distribution
should be too — be present where the trigger surfaces, the week someone posts
*"we just closed our first enterprise deal and they're asking for SSO."*

*Measure:* days from trigger event to first session. Arrive eight weeks late and
they have already panic-hired someone.

### 3. Give away one agent doing one job

Free tool: paste your security questionnaire, get back a gap analysis — what you
can already answer, what needs an engineering change, what needs a certificate
you do not hold.

That is Sarah Baines-Oxley doing exactly one job, free, at the moment of maximum
pain. The questionnaire is the most acute, most time-boxed artifact in
enterprise sales: it arrives Friday, it is due Tuesday, and it lands on whoever
is least able to refuse it.

Sharpest wedge on this list, and it doubles as supply-side proof — see #8.

*Measure:* completions, then **return visits**. A questionnaire is never the
last questionnaire; recurrence is the signal.

### 4. Partner with whoever sees the trigger first

Several people know a startup hit the wall before we do:

- **VC platform teams**, who field "our portfolio company needs SSO" constantly
  and have nothing to offer beyond a Slack introduction
- **Compliance automation vendors** — their customers are by definition
  mid-trigger, and their product stops precisely where the engineering starts
- **Auth and billing infrastructure vendors**, who lose deals when a prospect
  cannot execute the migration
- **Outside counsel and fractional CFOs**, present at the order-form fight

Co-marketing, not affiliate links.

*Measure:* honestly, whether any partner sends a second referral unprompted.

### 5. Make the output forwardable

Landing pages do not get forwarded. A diagnosis does — to a board, a co-founder,
or the buyer's security team as evidence there is a plan.

The eighteen-question scorecard built earlier in this repo (commit `a2c89e9`)
did this and was cut for weight. It should return as the **output** rather than
the front door: something the agents produce after looking at your situation,
that travels without you.

*Measure:* unique viewers per artifact. Anything above 1.0 is free distribution.

---

## Supply — the agents

### 6. Depth beats headcount

Nine agents that produce real artifacts beat thirty that produce descriptions.
Right now each agent lists four things it "gives you back" — an IdP compatibility
matrix, a contract data model, a gap analysis. None of those are actually
generated yet.

Making one agent genuinely produce its four artifacts is worth more than adding
nine more names to the bench. Sam L. Assertion is the right first candidate,
because the output is checkable: an IdP matrix is either right about Okta's
quirks or it is not.

*Measure:* artifacts produced per session. Zero today. That is the number.

### 7. Grounding is the raw material problem

An agent is worth exactly what its corpus is worth, and right now the corpus is
a design fiction. Real grounding comes from: published specs and RFCs, vendor
quirk documentation, audit frameworks, public post-mortems — and eventually the
transcripts of engagements the platform itself has seen.

Practitioners matter here, but as **curators of grounding**, not as labour on
the platform. Pay someone who has done six SCIM migrations to spend two days
saying what the agent must know and where it goes wrong. That is a bounded,
high-status piece of work, and it is completely different from asking them to
join a directory.

*Measure:* how many curators come back for a second area unprompted.

### 8. Evals are how supply earns demand

When supply is free to create, nobody assumes it is good. The replacement for
reputation is **published evaluation**: a fixed set of real tasks per agent, a
visible pass rate, and the failures shown rather than hidden.

*"Sam L. Assertion: 47 IdP configuration scenarios, 91% correct, fails on
IdP-initiated flows with legacy Ping."* That sentence does more for trust than
any amount of design.

This is the single highest-leverage supply investment, because it converts the
one structural weakness of manufactured supply — nobody believes it — into a
published number.

*Measure:* the pass rate itself, in public, per agent, per release.

### 9. Let demand decide the next agent

Which areas do people select and then get nothing useful for? That is the
build queue, and the site is already instrumented to capture it — every lead
carries the areas selected.

Nine agents cover eighteen areas by doubling up. Some of those pairings are
lazy: Rick Assessment holds both security posture and privacy/residency, which
are genuinely different jobs. Split the ones where demand data says the shared
agent is thin, not the ones the taxonomy says are separate.

*Measure:* selected-area frequency against session-to-brief conversion by area.
Low conversion on a high-frequency area is an agent that is not good enough.

### 10. Open the bench to outside builders

The end state where this becomes a real two-sided marketplace rather than a
product: publish the taxonomy as a schema, and let other people ship agents
against it.

Someone who has spent a decade on FedRAMP can build a better FedRAMP agent than
we ever will. The eighteen areas are the shelf; the evals in #8 are the quality
bar; the demand from #1–#5 is the reason to build for it rather than alone.

That is the flywheel: demand attracts agent builders, more agents deepen
coverage, better coverage attracts demand. But it only works **after** #8 — an
open bench without a published quality bar is a store full of junk.

*Measure:* third-party agents that pass evals. Zero is fine for a year.

---

## What I would do first

1. **#3 (free questionnaire triage)** and **#6 (make one agent produce real
   output)** — the same project, from two directions. The questionnaire tool is
   the wedge; Sarah Baines-Oxley actually doing it is the proof.
2. **#1 (publish the corpus)** in parallel. It compounds slowly, so start early,
   and the writing already exists.
3. **#8 (evals)** the moment anything real ships. Not later — the first public
   pass rate is what separates this from every "AI agent" landing page.

Everything else waits on those.

## The honest risks

- **The fiction has a shelf life.** The page says three times that the agents
  are a design fiction. That is fine for a concept and untenable the moment
  someone pays. #6 and #7 are not growth tactics, they are prerequisites.
- **Free supply is a trap as well as an advantage.** If anyone can ship nine
  agents, the moat is not the bench — it is the taxonomy, the corpus and the
  eval record. Invest there, not in agent count.
- **The general-purpose model is the competitor.** A founder can already paste
  their questionnaire into a general assistant. The answer has to be that a
  narrow, evaluated, grounded agent is measurably better on this specific work
  — which is exactly what #8 forces you to prove, and why it is not optional.
- **Compliance vendors own the trigger moment.** The defensible ground is the
  engineering work they do not touch — identity, billing, deployment — not the
  certification they do.
