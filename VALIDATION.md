# Finding out whether anyone wants this

Ten ways to test demand, cheapest first. None of them require the agents to
work yet.

The assumption everything rests on: **a startup blocked on enterprise
requirements will hand the problem to an agent rather than hire a person,
ignore it, or paste it into a general assistant.** Every test below is aimed at
some part of that sentence, and most of them can come back negative in under a
fortnight.

---

## 1. Fake-door the button that doesn't exist

The site has a bench, a filter, and a form. What it has never had is a "run this
agent" button. Add one. It selects the agent, collects an email, and says the
agent is in private testing.

An afternoon's work, and it separates browsing from intent, which is the
distinction the current lead capture can't see. Someone who selects three areas
and leaves is curious. Someone who clicks "run Sam L. Assertion" wants the work
done.

Kill signal: fewer than one in twenty area-selectors click it.

## 2. Do it by hand for ten people

Post in two or three founder communities: send me your security questionnaire
and I'll send back a gap analysis within 24 hours, free. Then produce it
yourself, with whatever tools you like. Nobody needs to know an agent wasn't
involved, because at this stage there isn't one.

This tests something a landing page can't: whether the pain is bad enough that a
stranger gets handed a sensitive document. It also generates the first real
grounding corpus and the first eval set, so a negative result still leaves you
better off.

If nobody sends one in two weeks, either the channel is wrong or the pain isn't
where you think it is.

## 3. Count the trigger in public

Search Reddit, Hacker News, indie founder Slacks and LinkedIn for the moment
itself. "First enterprise customer", "they want SCIM", "SOC 2 blocking a deal",
"security questionnaire help". Log every instance for a month with the date and
the company stage.

Free, and it produces three things: a volume estimate, the actual language
people use when they're stuck (which is not the language on the site), and a
list of people to talk to for #7.

## 4. Email fifty companies in the window

The trigger leaves public traces. Companies announcing their first large
customer, posting a job for an enterprise AE, or advertising for a contractor to
"implement SSO". Find fifty, email them, offer the thing from #2.

Reply rate here separates a real trigger from a plausible story. A cold email
about enterprise readiness sent to a company that isn't blocked gets ignored,
correctly. Sent inside the window, it should do unusually well. If both convert
the same, the trigger model is wrong and the whole "ten weeks after you sign"
framing needs rethinking.

## 5. Buy the 11pm searches

A few hundred pounds against the exact phrases from #1 of the marketplace doc.
"SCIM deprovisioning", "SOC 2 scope", "SAML for existing users", "enterprise
readiness checklist".

Two answers come back. Whether the search volume exists at all, and what it
costs to reach someone in that moment. Both are load-bearing for any plan that
depends on organic content later, because paid CPC sets the ceiling on what
organic is worth.

Kill signal: cost per lead lands above what the eventual engagement could
plausibly be worth. Better to learn that for £300 than after six months of
writing.

## 6. Read twelve months of job ads

Desk research, free, one afternoon. How many companies posted for contract SSO
or SCIM implementation, fractional compliance help, or "enterprise readiness"
work in the past year?

This tells you whether the budget line exists and where it currently goes. A
market that hires contractors has money moving through it. A market that quietly
assigns the work to whichever engineer is free has a real problem and no budget,
which is a much harder business.

## 7. Ask fifteen people what they actually did

Interviews, from the list #3 produced. Not "would you use this", which people
answer politely and inaccurately. Ask what happened: what blocked the deal, who
they called, what it cost, how long it took, what they'd do differently.

Three answers matter. What they spent, because that's your price ceiling. Who
they called, because that's your competitor. And whether they'd do it the same
way again, because a market full of people who were satisfied is a market with
no opening in it.

## 8. Pre-sell a diagnosis

The only validation that really counts. Offer a fixed-price readiness diagnosis,
delivered in five days, for a real number. Take the money.

Then deliver it by hand, the same way as #2. You'll learn what the work actually
involves, which is the input #6 and #7 of the marketplace doc both need, and
you'll have revenue that proves willingness to pay rather than willingness to
express interest.

Kill signal: twenty qualified conversations and no takers. That's a clear no,
and it arrives much faster than building the product would.

## 9. Run the bake-off you'd lose

Take ten real questionnaires from #2. Answer each twice: once through a
general-purpose assistant with a plain prompt, once through your grounded
version. Strip the labels. Give both to a practitioner who has done this work
and ask which is better and why.

This tests the defensibility claim directly, and it's the test most likely to
come back badly, which is why it's worth running early. If a plain assistant
matches a grounded agent on this work, the product isn't the agent. It might
still be the taxonomy, the workflow, or the distribution, but you'd want to know
before building a bench.

## 10. Ask one partner for one referral

Pick a single VC platform person or compliance-vendor account manager. Ask them
to forward one real request from their portfolio or customer base.

n=1, and that's the point. If a warm, motivated partner can't produce a single
live example in a fortnight, the channel described in #4 of the marketplace doc
is theoretical. If they send three without being asked twice, it's the best
channel you have.

---

## Running order

Week one: #1, #3 and #6. All cheap, none require talking to anyone, and between
them they tell you whether there's volume, language and budget.

Week two: #2 and #4, which is where you find out if the pain is real. Start #7
with whoever replies.

After that, #8 and #9 together. Pre-sell the diagnosis, deliver it by hand, and
use the material to run the bake-off. Those two decide whether this is a
business and whether agents are the right shape for it, which are separate
questions worth separating.

#5 and #10 fit anywhere and answer channel questions rather than demand
questions.

## What a no looks like

Worth deciding in advance, because otherwise every result reads as encouraging.

A no is: people select areas but never click through to work being done, nobody
sends a questionnaire to a stranger, the trigger doesn't lift reply rates, and
the general-purpose assistant does the job about as well. Any two of those
together should stop the build.

A softer signal, which is more likely: the pain is real, people pay, and they'd
rather have a person. That version doesn't kill the business. It kills the
agent framing, and points at the human directory this repo started as.
