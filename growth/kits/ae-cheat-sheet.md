# "Do you support…?" A cheat sheet for sales reps

For the call where an enterprise prospect asks about something your product
doesn't have yet. Rough build times are for your planning, not for promising.

**The rule:** never say yes to something that isn't built. Say where you are,
when you'll know more, and offer to put it in writing.

| They ask | What it means | Say this today | Never say | Build / buy |
|---|---|---|---|---|
| **SSO** | Their staff log in with their company account (Okta, Entra ID, Google) instead of a password | "Not yet. Which identity provider do you use? I'll get you a date from engineering this week." | "It's just a login button" | 3–5 wks / 1–2 wks |
| **SCIM** | Their IT adds and removes your users automatically when people join or leave | "We don't provision automatically yet. How many users, and how often do they change?" | "You can upload a CSV" (for a security team, that's a no) | 3–6 wks / 1–2 wks |
| **Custom roles** | Their admins decide who can see and do what | "Tell me the roles you'd set up. If our current three cover it, we can show you today." | "Everyone's an admin for now" | 4–8 wks / 2–4 wks |
| **Audit logs** | A record of who did what, which their security team can export | "We record [events]. Which events and which tool (Splunk, Datadog) do you need them in?" | "We keep logs" (they mean customer-visible ones) | 3–6 wks / 1–3 wks |
| **SOC 2** | An independent audit of your security controls | "We're [not started / in our observation period until date]. I can share our controls now under NDA." | "We're basically compliant" | 6–9 months end to end |
| **Security questionnaire** | A long list of security questions, often due in days | "Send it over with the due date. We'll tell you in 48 hours which answers need a follow-up call." | "Can we skip it?" | 2–4 wks the first time |
| **Data residency** | Their data stays in a country or region, often the EU | "Where does it need to live, and does that include backups and support tools?" | "Our cloud provider is GDPR compliant" | 4–8 wks |
| **SLA** | Written uptime and support response promises, with credits if you miss | "Our current uptime is [x]. What target and response times does your team need?" | "We've never had an outage" | 3–6 wks / 1–3 wks |
| **Single-tenant / self-hosted** | Your product runs in their cloud or a dedicated copy | "Is that a hard requirement, or would a dedicated region and customer-managed keys work?" | "Sure, we'll send you a Docker image" | 8–16 wks / 4–8 wks |
| **Do you train on our data?** | Whether your AI learns from their content | "[No, and our model provider doesn't retain prompts beyond N days.] I'll send it in writing." | "The AI is fully secure" | 3–6 wks to add admin controls |
| **Evals** | How you measure your AI's answer quality | "We test against [N] reviewed examples before each release. What would good look like for your team?" | "It's very accurate" | 4–8 wks / 2–4 wks |

## Three things that always help

1. **Ask for the exact wording.** "SSO" on a call and "SAML 2.0 with SP-initiated
   login and JIT provisioning" in a contract are different amounts of work.
2. **Ask if it blocks signing or rollout.** Many asks can land in the first
   90 days after signature, written into the order form.
3. **Offer a roadmap letter.** A short signed note with what you're building and
   by when often gets a deal through procurement.

## Send engineering the details

Each topic has a full write-up with the estimate adjusted to your situation,
and the questions your team should answer first:

toupper.vercel.app/what?utm_source=cheatsheet&utm_medium=pdf&utm_campaign=h14_cheatsheet

---

*Rough ranges, written by hand. Buy estimates assume a platform like WorkOS,
Vanta or Metronome. Free to share. Made by ToUpper.*
