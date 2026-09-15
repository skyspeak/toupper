# 08 · Answer the questionnaire line by line

People don't search for "enterprise readiness". They paste the literal question
they were sent: *"Do you use customer data to train AI models?"* Write one post
per question with how to answer it honestly, and link the topic behind it.

**Effort:** 10 posts · **First signal:** week 4 · **Measure:** leads with `campaign = h08_questions`

## Step by step

1. **Publish one a week** on LinkedIn, and on a blog or newsletter if you have one,
   titled with the question exactly as buyers phrase it.
2. **Structure every post the same way:** the question, what a strong answer
   includes, a model answer, what not to say, the link.
3. **Reuse them in threads** (hack 01) whenever someone asks that question.
4. **Only publish model answers as templates.** The brackets must be filled
   with facts that are true for the reader; say so in the post.

## The ten

### 1. "Do you use customer data to train AI models?"

- **A strong answer includes:** whether you train or fine-tune on customer data
  (yours or your providers'), which AI providers see data, what they retain,
  and whether customers can switch AI features off.
- **Model answer:** "We do not use customer data to train or fine-tune models.
  AI features are processed by [providers], under terms that [do not retain
  data / retain it for N days for abuse monitoring]. Admins can disable AI
  features for their workspace in [settings location]."
- **Don't say:** "Your data is safe with us." It answers nothing.
- **Link:** `/what/ai-data-controls`

### 2. "Do you support SAML-based single sign-on?"

- **Include:** SAML and/or OIDC, which identity providers you've tested, whether
  customers configure it themselves, and whether SSO can be enforced.
- **Model answer:** "Yes. We support SAML 2.0 [and OIDC], tested with [Okta,
  Entra ID, Google Workspace]. Admins configure it in [location], and can require
  SSO for all users with a break-glass account for emergencies."
- **Don't say:** "Yes" alone, if SSO needs your team to set up per customer.
- **Link:** `/what/sso`

### 3. "Do you maintain audit logs of user and administrator activity?"

- **Include:** which events, retention, whether customers can see and export
  them, and whether they're tamper-resistant.
- **Model answer:** "We log authentication, administrative, permission and
  data-export events. Customers can search and export their logs in [location]
  and stream them to [SIEMs]. Logs are retained for [period] and cannot be
  altered by customer or staff accounts."
- **Don't say:** "We have logging." Application logs aren't audit logs.
- **Link:** `/what/audit-logs`

### 4. "When was your last penetration test, and can you share the results?"

- **Include:** date, scope, independent firm, whether critical findings were fixed,
  and what you share (usually a summary under NDA).
- **Model answer:** "Our most recent independent penetration test was completed
  in [month, year] by [firm], covering [scope]. All critical and high findings
  were remediated [and verified by retest]. A summary is available under NDA."
- **Don't say:** anything implying a test covered more than it did.
- **Link:** `/what/pentest`

### 5. "Where is customer data stored and processed?"

- **Include:** regions, including backups, logs and subprocessors, and whether
  customers can choose a region.
- **Model answer:** "Customer data is stored and processed in [region(s)],
  including backups. [Logs and analytics are also processed in region / are
  processed in region X by subprocessor Y.] Our subprocessor list is at [URL]."
- **Don't say:** "EU data stays in the EU" unless that's true of logs and backups too.
- **Link:** `/what/gdpr-residency`

### 6. "What uptime do you commit to, and what happens if you miss it?"

- **Include:** the commitment, how it's measured, service credits, and the status page.
- **Model answer:** "We commit to [99.9]% monthly availability, measured
  [from outside our infrastructure]. If we miss it, customers receive service
  credits of [schedule]. Live status and incident history are at [URL]."
- **Don't say:** a number you haven't measured.
- **Link:** `/what/sla`

### 7. "Do you hold a SOC 2 Type II report?"

- **Include:** type, period covered, auditor, and what to do if it's in progress.
- **Model answer (in progress):** "Our SOC 2 Type II observation period runs
  from [date] to [date], with [auditor]. Our Type I report is available under NDA
  now, along with our control documentation."
- **Don't say:** "SOC 2 compliant" without saying which type and period.
- **Link:** `/what/soc2`

### 8. "Do you support customer-managed encryption keys?"

- **Include:** whether you do, which key services, what's encrypted with the
  customer's key, and what revocation does.
- **Model answer (if not yet):** "Data is encrypted at rest with [AES-256] using
  keys managed in [provider KMS]. Customer-managed keys are [on our roadmap for
  quarter / not currently offered]."
- **Don't say:** "Yes" if it's planned rather than built. It ends up in the contract.
- **Link:** `/what/byok`

### 9. "How do you protect AI features against prompt injection?"

- **Include:** what untrusted content the AI reads, input and output checks,
  what the AI can access or do, and adversarial testing.
- **Model answer:** "Our AI features [only read content from the customer's own
  workspace]. Inputs and outputs pass [checks], and the model [cannot take
  actions / can only take actions after user approval]. We test for prompt
  injection [before each release / quarterly]."
- **Don't say:** "Our model can't be jailbroken." Nobody can promise that.
- **Link:** `/what/guardrails`

### 10. "How are user accounts provisioned and deprovisioned?"

- **Include:** SCIM support, which identity providers, and how fast access is
  removed.
- **Model answer:** "We support SCIM 2.0 provisioning with [Okta, Entra ID].
  When a user is removed in the customer's directory, their access is revoked
  within [minutes] and their data is [retained for admins / transferred]."
- **Don't say:** "Admins can remove users manually" as if that were provisioning.
- **Link:** `/what/scim`

## Post format (copy this)

> **"[The question, exactly as sent]"**
>
> It's in almost every security questionnaire. Here's how to answer it without
> promising something your system doesn't do.
>
> A strong answer covers: [bullets]
>
> A template (fill the brackets only with what's true for you):
> "[model answer]"
>
> Avoid: [don't say]
>
> What it takes to build, if the honest answer is "not yet": [link]
