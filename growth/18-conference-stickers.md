# 18 · Name-tag stickers at SaaS conferences

Conference badges say "Hello, my name is". The stickers say "Hello, my name is
Sarah Baines-Oxley. Ask me about SOC 2." People put them on laptops, trade them
at booths, and scan the QR code to see what the joke is about. It's the cheapest
thing you can hand out that people keep, and each scan is tagged.

**Effort:** half a day to print, 1 event · **First signal:** event day · **Measure:** leads with `campaign = h18_stickers`

The sheet is ready: [`stickers/sheet-letter.png`](stickers/sheet-letter.png),
US Letter at 300 dpi with twelve 2.5-inch stickers (ten agents and two general
ones). Each QR code opens that agent's topic. Regenerate after editing agents:

```bash
pip3 install qrcode
python3 growth/make_stickers.py
```

## Step by step

1. **Test the codes.** Print one sheet on plain paper and scan every sticker
   with a phone. Each should open the right `/what/` page.
2. **Order stickers.** Either print at home on 2.5-inch square sticker sheets,
   or upload the individual stickers to an online sticker printer (search
   "custom square stickers 2.5 inch"). 250 of each agent is about right for a
   mid-sized event.
3. **Pick an event** where early-stage founders and sales people go: SaaS
   conferences, startup weeks, local founder meetups, accelerator demo days.
   Check the event allows handouts; many don't allow them at other companies'
   booths.
4. **Bring the full set of ten** and let people pick. "Which one are you?" starts
   the conversation. Most people pick the one that's their current problem, which
   tells you what they're dealing with.
5. **Carry a small card** with the offer below for people with a live deal.
6. **Write down what people picked** at the end of each day. That's a free
   survey of what's on founders' minds.

## What to say

> "They're enterprise specialists. Each one's named after what they do. Which
> one's your problem this quarter?"

If they pick one:

> "Scan it. It tells you what that takes to build, and what to decide before
> you start. If you've got a deal waiting on it, tell me about it."

If they ask whether the agents are real:

> "They're characters. The names are jokes; the estimates are written by hand
> and they're real."

## Card for people with a live deal (business card size, back of your card)

> **Deal stuck on SSO, SOC 2 or a questionnaire?**
> Email me what they asked for. I'll reply within a day with what's a real
> blocker and what isn't.
> [your email]

## Post after the event

> Handed out [N] stickers at [event]. People picked the specialist for their
> biggest problem right now. The count:
>
> 1. [agent], [topic]: [n]
> 2. [agent], [topic]: [n]
> 3. [agent], [topic]: [n]
>
> [One sentence on what surprised you.]
>
> All ten, and what their topics take to build: [tagged link]

## What to measure

- Leads tagged `h18_stickers`, and page views from the QR links in the week after.
- Your tally of which sticker people picked. Compare it with
  `node tools/leads.js --terms`; if they disagree, the tally is closer to what
  people feel and the leads are closer to what they'll act on.
