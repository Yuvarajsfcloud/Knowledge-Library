# Case Studies

A retrospective record of how architectural thinking was applied in real situations — capturing context, decisions, trade-offs, and what was learned.

---

## What this layer is

Case Studies are **retrospective** accounts of completed architecture work. They are not project documentation, not prescriptive guides, and not repeatable templates.

```
Real engagement or problem
         │
         ▼
[Case Studies layer]  ← you are here
         │   context, decisions, outcomes, learning
         ▼
[Knowledge Library]  ← principles and patterns informed by experience
         │
         ▼
[Playbook]  ← practice refined by outcomes
```

They exist to answer: *"What happened, what did we decide, did it work, and what would we do differently?"*

---

## Index

| Case Study | Domain | Architecture type | Outcome | Year |
|---|---|---|---|---|
| *(add entries as case studies are completed)* | | | | |

---

## Categories

Cases are organised by the dominant architectural concern — not by industry or client.

| Category | What belongs here |
|---|---|
| [Decomposition](decomposition/index.md) | Monolith decomposition, service extraction, strangler fig migrations |
| [Integration](integration/index.md) | Event-driven integration, API gateway adoption, legacy system integration |
| [Data](data/index.md) | Data platform modernisation, data mesh adoption, governance programmes |
| [Governance](governance/index.md) | Architecture practice establishment, governance model rollout, ADM adoption |
| [Cloud Migration](cloud-migration/index.md) | Cloud strategy, lift-and-shift, re-platforming, cloud-native rebuild |
| [Security](security/index.md) | Security architecture, compliance-driven re-architecture, zero-trust |

---

## Rules (short form)

Full rules are in the [Governance rules](#governance-rules) section below.

1. Case studies are retrospective — only write them after the work is complete or a clear decision point has passed.
2. No confidential client names, PII, or commercially sensitive data.
3. A case study describes what happened and what was learned. It does not prescribe what to do next time.
4. Every case study must reference the Knowledge Library or Playbook content it relates to — not restate it.
5. A case study that has generated a reusable insight must be linked from the relevant Knowledge Library page.

---

## Governance rules

**Rule 1 — Retrospective only.**  
Write case studies after the fact. Do not start writing a case study during an active engagement — notes go to [Inputs & Evidence](../inputs/index.md) instead.

**Rule 2 — Anonymised by default.**  
Use no client names, no PII, no commercially sensitive project names or financial figures. Use descriptive labels: "a UK retail bank", "a logistics company with 4 acquired platforms". Exact numbers may be used only when publicly disclosed.

**Rule 3 — Descriptive, not prescriptive.**  
A case study describes what was decided and why it worked or did not work *in that context*. It does not tell the reader what to do. Reusable lessons belong in the Knowledge Library or Playbook — linked from the case study, not restated in it.

**Rule 4 — One case, one folder.**  
Each case study has its own folder: `case-studies/<category>/<kebab-name>/`. No flat files in the category root.

**Rule 5 — Mandatory reference links.**  
Every case study must have a `references.md` that links to the relevant Knowledge Library and Playbook pages. A case study with no outbound links is not integrated into the library — it is an isolated document.

**Rule 6 — Lessons feed upward.**  
If a case study produces a lesson that is generally applicable, that lesson must be added to the Knowledge Library (a new page, an ADR, or a Judgment table entry) and the case study's `lessons-learned.md` must link to it. The case study is the evidence; the Knowledge Library is the conclusion.

**Rule 7 — Status is mandatory.**  
Every case study `index.md` must have a `status` field: `draft` / `review` / `published` / `archived`. Unpublished (`draft` / `review`) case studies may be committed but will not appear in the nav until promoted.
