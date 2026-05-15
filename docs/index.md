# Architecture Knowledge Library

> A private, comprehensive reference for architecture work — TOGAF-aligned, practitioner-grade, built to last.

The library is organised in two **tracks**:

| Track | Purpose | Use it when… |
|---|---|---|
| [**Knowledge Library**](knowledge/index.md) | Reference content organised by TOGAF ADM phase | You want to *understand* — concepts, trade-offs, what good looks like |
| [**Playbook**](playbook/index.md) | Practical, step-by-step operating manual | You want to *do* — start an engagement, run a review, respond to an incident |

Each Playbook page links into the relevant Knowledge page when you need depth.

---

## Quick Navigation

### Knowledge Library — by ADM phase

| Phase | Page |
|---|---|
| Preliminary | [Preliminary](knowledge/adm/preliminary.md) |
| A — Architecture Vision | [Architecture Vision](knowledge/adm/architecture-vision.md) |
| B — Business Architecture | [Business Architecture](knowledge/adm/business-architecture.md) |
| C — Application | [Application Architecture](knowledge/adm/information-systems/application-architecture.md) |
| C — Data | [Data Architecture](knowledge/adm/information-systems/data-architecture.md) |
| D — Technology Architecture | [Technology Architecture](knowledge/adm/technology-architecture.md) |
| E — Opportunities & Solutions | [Opportunities & Solutions](knowledge/adm/opportunities-and-solutions.md) |
| F — Migration Planning | [Migration Planning](knowledge/adm/migration-planning.md) |
| G — Implementation Governance | [Implementation Governance](knowledge/adm/implementation-governance.md) |
| H — Architecture Change Management | [Change Management](knowledge/adm/change-management.md) |
| Continuous | [Requirements Management](knowledge/adm/requirements-management.md) |

### Knowledge Library — reference

| Topic | Page |
|---|---|
| Architecture Repository | [Architecture Repository](knowledge/reference/architecture-repository.md) |
| Enterprise Continuum | [Enterprise Continuum](knowledge/reference/enterprise-continuum.md) |
| Views & Viewpoints | [Views & Viewpoints](knowledge/reference/views-viewpoints.md) |
| Building Blocks | [Building Blocks](knowledge/reference/building-blocks.md) |
| ArchiMate 3.2 | [ArchiMate Quick Reference](knowledge/reference/archimate.md) |
| Frameworks Comparison | [Frameworks](knowledge/reference/frameworks.md) |
| Patterns | [Patterns](knowledge/reference/patterns.md) |
| Tech Radar | [Tech Radar](knowledge/reference/tech-radar.md) |
| Governance Framework | [Governance Framework](knowledge/reference/governance-framework.md) |
| Glossary | [Glossary](knowledge/reference/glossary.md) |

### Knowledge Library — applied

| Topic | Page |
|---|---|
| Architecture Notes | [Architecture Notes](knowledge/architecture-notes/index.md) |
| Decision Records (ADRs) | [ADR Index](knowledge/decision-records/index.md) |
| Case Studies | [Case Studies](knowledge/case-studies/index.md) |

### Playbook

| Section | Page |
|---|---|
| Engagement Phases | [Engagement Phases](playbook/engagement/index.md) |
| Operational Playbooks | [Operational Playbooks](playbook/operational/index.md) |
| Checklists | [Checklists](playbook/checklists/index.md) |
| Templates | [Templates](playbook/templates/index.md) |

---

## TOGAF ADM at a Glance

``` mermaid
flowchart LR
    PRE([Preliminary]) --> A([A\nVision]) --> B([B\nBusiness]) --> C([C\nInfo Systems]) --> D([D\nTechnology]) --> E([E\nOppty.]) --> F([F\nMigration]) --> G([G\nImpl. Gov.]) --> H([H\nChange]) --> A

    style PRE fill:#37474f,color:#fff,stroke:none
    style A fill:#4051b5,color:#fff,stroke:none
    style B fill:#4051b5,color:#fff,stroke:none
    style C fill:#4051b5,color:#fff,stroke:none
    style D fill:#4051b5,color:#fff,stroke:none
    style E fill:#2e7d32,color:#fff,stroke:none
    style F fill:#2e7d32,color:#fff,stroke:none
    style G fill:#e65100,color:#fff,stroke:none
    style H fill:#e65100,color:#fff,stroke:none
```

---

## Conventions

- **ADRs** — immutable. Once Accepted, create a new ADR to supersede, never edit.
- **Architecture Notes** — evergreen reference knowledge; update freely.
- **Case Studies** — written after project completion; include lessons learned.
- **Playbook pages** — short and action-oriented; link to Knowledge for depth.
- **Knowledge pages** — follow a consistent section ordering (Foundations → Concepts → Execution → Analysis → Decision Frameworks → Target Outputs → Visuals → Tools → AI Acceleration → Common Mistakes → Related).
- **TOGAF pages** — cite the specific TOGAF chapter for every reference.

---

## Adding New Content

1. Decide which **track** the content belongs to:
    - *Conceptual / reference / evergreen* → `docs/knowledge/...`
    - *Step-by-step / how-to / operational* → `docs/playbook/...`
2. Add the file in the correct sub-folder.
3. Add it to `nav:` in `mkdocs.yml`.
4. For decisions → use the [ADR template](knowledge/decision-records/index.md).
5. Run `mkdocs serve` locally to preview before committing.

---

*Library source: TOGAF Standard 10th Edition — The Open Group · ArchiMate 3.2 — The Open Group · AWS Well-Architected · Google SRE Book · DORA · ThoughtWorks Tech Radar · COBIT 2019 · ITIL 4*
