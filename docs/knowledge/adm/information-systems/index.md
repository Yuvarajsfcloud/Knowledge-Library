# Information Systems Architecture (Phase C)

Phase C of the ADM has two paired sub-phases that are typically developed in parallel:

| Sub-phase | Page | Focus |
|---|---|---|
| Application Architecture | [Application Architecture](application-architecture.md) | Application portfolio, interactions, integration catalogue, application gap analysis |
| Data Architecture | [Data Architecture](data-architecture.md) | Conceptual data model, domain ownership, classification, PII flows, data gap analysis |

Read both pages together — application and data choices constrain each other.

---

## Why Two Sub-Pages?

Application and Data Architecture are intentionally separated in TOGAF Phase C because:

- They are **owned by different domain experts** (application architects vs. data architects / data owners)
- They are **governed by different forums** (architecture review vs. data governance council)
- They are **regulated differently** (data has GDPR/PCI/etc. obligations that don't apply to application code)

But they are paired because:

- **Applications produce and consume data** — the data model determines application contracts
- **Data ownership constrains application boundaries** — domain-owned data implies domain-owned services
- **Gap analyses interact** — moving data ownership often requires moving application boundaries

The artefacts produced in this sub-phase feed into:

- Phase D (Technology Architecture) — what platform runs the apps and stores the data
- Phase E (Opportunities & Solutions) — what work packages close the gaps
