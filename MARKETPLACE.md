# Building both sides

Ten ways to build demand and supply for ToUpper — with the sequencing, what to
measure, and which of these I would not bother with first.

---

## The thing that changed

Classic marketplaces have a chicken-and-egg problem: no buyers without sellers,
no sellers without buyers, and you burn a lot of money solving both at once.

The agent pivot breaks that — but not in the way it first appears. It does not
remove the supply problem. It **splits it into two**, and only one of them has
to exist on day one:

| | What it is | Needed at launch? |
|---|---|---|
| **Diagnostic supply** | The nine agents. Answers the question "what is actually blocking me?" | Yes — and it can be authored, not recruited |
| **Delivery supply** | Humans who take the handoff and do the work | No — only once a diagnosis converts |

Every agent card already names where it stops: *"When your customer's IdP admin
needs to be on a call."* *"The audit itself."* *"Hiring."* Those boundaries are
not disclaimers. **They are the job spec for the human marketplace**, and they
tell you exactly what to recruit and when.

So the honest sequence is demand-first, which is unusual for a marketplace and
is the single biggest strategic advantage here. You can prove demand with zero
humans on the platform, because the diagnostic is genuinely useful on its own.

---

## Demand

### 1. Publish the corpus, not the pitch

`data/domains-reference.js` already holds eighteen deep write-ups — what good
looks like, the signals you need help, typical engagements. That is not
marketing copy, it is the thing people are searching for at 11pm after a
security review went badly.

Publish each as a standalone page. "What SCIM deprovisioning actually requires."
"How to scope SOC 2 so it does not eat two quarters." "Why your EU residency
claim is probably false." Not a blog — reference material, updated, with the
matching agent at the bottom of each page.

This is the cheapest demand channel available because **the content is already
written**. It was cut from the site for being too heavy; it is perfect as an
SEO and authority layer.

*Measure:* organic sessions → chip selection rate. Someone who selects an area
has self-identified. That is the only engagement metric worth watching.

### 2. Ride the trigger, not the persona

Nobody wakes up wanting enterprise readiness. They want it the day a specific
thing happens: an LOI is signed, a 300-line questionnaire lands, procurement
rewrites the order form, a pen test comes back ugly.

The "ten weeks after you sign" timeline on the page is already trigger-shaped —
that structure should drive distribution too. Be present where the trigger
surfaces: founder communities the week someone posts *"we just got our first
enterprise deal and they're asking for SSO"*, sales-engineering forums, the
comment threads under every "we got SOC 2" post.

*Measure:* time from trigger event to first session. If people find you eight
weeks after signing, you are arriving after the panic-hire.

### 3. Give away the questionnaire triage

The single most acute, most time-boxed artifact in enterprise sales is the
security questionnaire. It arrives on a Friday, it is due Tuesday, and it lands
on whoever is least able to refuse it.

Free tool: paste the questionnaire, get back a gap analysis — which answers you
can already give, which need an engineering change, which need a certificate you
do not hold. That is Sarah Baines-Oxley doing exactly one job, for free, at the
moment of maximum pain.

This is the strongest wedge on the list because the pain is acute, dated, and
recurring. It is also the most defensible: an answer library compounds.

*Measure:* tool completion → email capture → return visits. Recurrence is the
signal; a questionnaire is never the last questionnaire.

### 4. Partner with whoever sees the trigger first

Several people know a startup just hit the enterprise wall before we do:

- **VC platform teams**, who field "our portfolio company needs SSO" constantly
  and have no good answer beyond a Slack introduction
- **Compliance automation vendors** (Vanta, Drata and similar), whose customers
  are, by definition, mid-trigger — and whose product stops exactly where the
  engineering work starts
- **Auth and billing infrastructure vendors**, who lose deals when a prospect
  cannot execute the migration
- **Fractional CFOs and outside counsel**, present at the order-form fight

Co-marketing, not affiliate links. These partners have credibility that a
referral fee would cheapen.

*Measure:* partner-attributed sessions, but honestly — judge these on whether
one partner produces a second referral unprompted.

### 5. Make the diagnosis a forwardable artifact

Landing pages do not get forwarded. A readiness assessment with a score, a
ranked gap list and named next steps does — to a board, to a co-founder, to the
buyer's security team as evidence of a plan.

The eighteen-question scorecard built earlier in this repo (commit `a2c89e9`)
did exactly this and was cut for being heavy. It should come back, not as the
front door but as the **output**: something generated after the agents have
looked at your situation, that carries your logo and travels without you.

*Measure:* artifacts generated → unique viewers per artifact. Anything above
1.0 is free distribution.

---

## Supply

### 6. Recruit people to author agents, not to join a directory

"Join our directory" is a low-status ask. It reads as lead-gen, it competes with
every marketplace that has ever emailed a consultant, and the good people ignore
it.

"Define what Sam L. Assertion knows about SAML migrations" is a completely
different proposition. It is high status, bounded, one-time, and it produces a
durable artifact with the expert's name attached. Pay for the grounding work
directly — it is real work, and paying for it sets the tone that this is not a
lead-gen scheme.

This is also the only way to solve the credibility problem. An agent is worth
what its grounding is worth, and right now the grounding is a design fiction.

*Measure:* how many authors say yes without being paid the second time.

### 7. Sell the handoff, not the lead

The offer to a delivery expert is not "we will send you leads." It is:

> Here is a client who already has a diagnosis, a scoped problem, an IdP
> compatibility matrix, and a draft migration plan. The discovery you normally
> do for free is done. Start at the interesting part.

That is a genuinely better deal than any directory listing, and it justifies a
real take rate rather than a referral fee. The agent does the unpaid
qualification work that independent consultants hate doing.

Every handoff boundary already written into the nine agents is a job posting.
Recruit against them literally.

*Measure:* handoff → engagement conversion. If a diagnosed lead does not convert
better than a cold one, the whole thesis is wrong and you should know early.

### 8. Reviewer of record

Put a named human against each agent: *"Grounding reviewed by —, who has done
this at three companies."* The expert gets visible status and a credential;
the agent gets credibility it cannot manufacture; the buyer gets a name to
check on LinkedIn.

Status is the currency here, not money. This is how you get people who would
never join a marketplace to attach themselves to one.

*Risk, stated plainly:* this is hard to sell before you have a brand. Nobody
lends their name to an unknown. Probably the third or fourth supply move, not
the first.

### 9. Turn today's demand into next year's supply

The person who used Sam L. Assertion to ship SSO under deadline is, eighteen
months later, exactly the practitioner qualified to ground the next version of
it. They have the scar tissue, and they already trust the product.

Instrument this deliberately: track who came in blocked, shipped, and stayed.
Ask them to author. It is the cheapest supply channel you will ever have and it
compounds — every cohort of demand seeds the next cohort of supply.

*Measure:* graduation rate — users who return as authors or reviewers.

### 10. Do not build delivery supply until diagnosis converts

The temptation, having built a marketplace shell, is to fill it. Resist it.

Nine agents can launch cold and produce something genuinely useful. Use them to
prove that people arrive, self-identify a blocker, and ask for help. **Only
then** recruit humans — and recruit them against the specific boundaries that
are actually generating requests, rather than trying to cover all eighteen
areas because the taxonomy says so.

The failure mode is a directory of people waiting for demand that never arrives.
The agent model lets you avoid it entirely: your supply cost is zero until your
demand is real.

---

## What I would do first

1. **#1 (publish the corpus)** and **#3 (questionnaire triage)**. Both are
   demand, both use assets that already exist, and both are measurable within
   weeks. #3 is the sharper wedge; #1 is the compounding one.
2. **#6 (author an agent)** with three people, not thirty — one each for
   identity, compliance and billing. Enough to replace the fiction with
   something real in the three areas that block the most deals.
3. **#7 (sell the handoff)** only once #3 is producing qualified requests you
   cannot answer with an agent alone. That is the signal to open delivery supply.

Everything else waits.

## The honest risks

- **The fiction has a shelf life.** Right now the page says three times that the
  agents are a design fiction. That is fine for a concept and untenable the
  moment someone pays. #6 is not a growth tactic, it is a prerequisite.
- **The diagnosis may not be the bottleneck.** It is possible people already
  know they need SCIM and simply cannot hire anyone good. If so, the value is
  entirely in #7 and the agents are a marketing surface, not the product. The
  handoff conversion rate tells you which world you are in.
- **Compliance vendors are the obvious acquirer and the obvious competitor.**
  Vanta and Drata already own the trigger moment and are moving toward
  remediation. The defensible position is the engineering work they do not
  touch — identity, billing, deployment — not the certification they do.
