# 11 · Open the data on GitHub

Publish the guide as a free, openly licensed dataset: 28 enterprise asks, with
estimates, 55 platforms and the questions to decide first. Developers star
lists like this, link to them from their own docs and include them in
"awesome" lists. Each of those links is a permanent way in.

**Effort:** 2 hours, then 1 pull request a week · **First signal:** week 2 · **Measure:** leads with `campaign = h11_dataset`, plus GitHub stars

The collateral is already built: `node tools/export-dataset.js` writes
[`dataset/enterprise-asks.json`](dataset/enterprise-asks.json) and
[`dataset/enterprise-asks.csv`](dataset/enterprise-asks.csv) straight from
`data/glossary.js`, so the numbers always match the site. Every row links back
with the `h11_dataset` tag.

## Step by step

1. **Create a public repo** called `enterprise-asks` under your GitHub account.
2. **Run the export** and copy the two files in:

   ```bash
   node tools/export-dataset.js
   cp growth/dataset/enterprise-asks.* ../enterprise-asks/
   ```

3. **Add the README below** and a `LICENSE` file with the CC BY 4.0 text (GitHub's
   "Add file → Create new file → LICENSE" picker doesn't offer it; copy it from
   creativecommons.org/licenses/by/4.0/legalcode.txt).
4. **Set the repo topics:** `enterprise`, `saas`, `soc2`, `sso`, `scim`, `startup`, `llm`, `dataset`.
5. **Open one pull request a week** to a relevant awesome list (targets below).
   Follow each list's contributing guide exactly. Most reject anything that looks promotional.
6. **Re-export monthly** and tag a release ("[Month]: added agent permissions").
   Releases notify people who watch the repo.

## README

```markdown
# Enterprise asks

What enterprise customers ask startups for, what each one takes to build or
buy, and what to decide before starting.

28 items: SSO, SCIM, RBAC, SOC 2, ISO 27001, audit logs, data residency, HIPAA,
BYOK, usage-based billing, single-tenant deployment, SLAs, RAG, evals,
AI guardrails, agent permissions and more.

Each item has:

- a plain-language description, and why enterprise buyers ask for it
- a rough build estimate in engineer-weeks, and a buy-and-integrate estimate
- three platforms worth a look, where buying is realistic
- the things that make it take longer
- 6–7 questions to answer before starting, with who should answer each

## Files

- `enterprise-asks.json` — everything
- `enterprise-asks.csv` — one row per item, for spreadsheets

## Caveats

The estimates are rough ranges, written by hand from experience. They are not
measurements. Your codebase will disagree with them; open an issue when it does.

No vendor paid to be listed.

## Browse it

Each item has a readable page, with the estimate adjusted to your situation:
https://toupper.vercel.app/what

## License

CC BY 4.0. Use it anywhere, including commercially, with a link back.
```

## Where to submit it

Check each list is still maintained (a merged PR in the last three months)
before you spend time on it.

| List type | Search GitHub for | Section to suggest |
|---|---|---|
| SaaS and B2B | `awesome saas`, `awesome b2b` | Resources, Enterprise |
| Security and compliance | `awesome compliance`, `awesome soc2` | Guides |
| Identity | `awesome identity`, `awesome iam`, `awesome sso` | Learning resources |
| Startup and founder | `awesome startup`, `awesome indie` | Selling to enterprises |
| LLM engineering | `awesome llmops`, `awesome llm apps` | Evaluation, Production |
| Datasets | `awesome public datasets` | Business |

## Pull request text

> **Add Enterprise asks (open dataset)**
>
> Adds a CC BY 4.0 dataset of 28 things enterprise customers ask SaaS vendors
> for (SSO, SCIM, SOC 2, audit logs, RAG, evals and so on), with rough
> build/buy estimates and the questions to answer before starting.
>
> Disclosure: I made it. It's free, with no signup and no paid placements.
> Happy to move it to a different section or reword the line.

## Launch post (once, when the repo is live)

> I've open-sourced the thing I kept rewriting in Slack threads: what enterprise
> customers ask for, and what each one actually takes.
>
> 28 items, from SSO and SCIM to evals and agent permissions. Rough build
> estimates, buy estimates, platforms worth a look, and the questions to answer
> before anyone writes code. JSON and CSV, CC BY 4.0.
>
> The estimates are opinions. If yours was faster or slower, open an issue and
> say why. That's the part I want.
>
> [github link]

## What to measure

- Stars and forks after 30 days (GitHub Insights → Traffic also shows referrers).
- `node tools/leads.js --sources` for `github` / `h11_dataset`.
- Issues that dispute an estimate. Each one is a reason to reply publicly,
  update the guide and thank the person in the release notes.
