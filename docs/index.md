# Architecture Knowledge Library

> A private, comprehensive reference for architecture work — TOGAF-aligned, practitioner-grade, built to last.

---

## Quick Navigation

| Section | Purpose | Start Here |
|---|---|---|
| [TOGAF ADM](togaf/index.md) | Full Architecture Development Method — all phases, deliverables, and templates | [ADM Overview](togaf/index.md) |
| [Architecture Concepts](togaf/architecture-repository.md) | Repository, Continuum, Views, Building Blocks | [Architecture Repository](togaf/architecture-repository.md) |
| [ArchiMate 3.2](archimate/index.md) | Modelling language quick reference — all layers and relationships | [ArchiMate Reference](archimate/index.md) |
| [Architecture Governance](governance/index.md) | Architecture Board, contracts, compliance, dispensations | [Governance Framework](governance/index.md) |
| [Frameworks Reference](reference/frameworks.md) | TOGAF, Zachman, COBIT, ITIL, SABSA, C4, DORA compared | [Frameworks](reference/frameworks.md) |
| [Engagement Phases](phases/index.md) | Practical 5-phase guide for architecture engagements | [Phases Overview](phases/index.md) |
| [Architecture Notes](architecture/index.md) | Evergreen patterns, trade-offs, and design thinking | [Notes](architecture/index.md) |
| [Case Studies](case-studies/index.md) | Real-world project analyses and outcome capture | [Case Studies](case-studies/index.md) |
| [Playbooks](playbooks/index.md) | Step-by-step operational and engineering runbooks | [Playbooks](playbooks/index.md) |
| [ADRs](adrs/index.md) | Architecture Decision Records — all decisions, immutable | [ADR Index](adrs/index.md) |

---

## TOGAF ADM at a Glance

``` mermaid
flowchart LR
    PRE([Preliminary]) --> A([A\nVision]) --> B([B\nBusiness]) --> C([C\nInfo Systems]) --> D([D\nTechnology]) --> E([E-F\nMigration]) --> G([G-H\nGovernance]) --> A

    style PRE fill:#37474f,color:#fff,stroke:none
    style A fill:#4051b5,color:#fff,stroke:none
    style B fill:#4051b5,color:#fff,stroke:none
    style C fill:#4051b5,color:#fff,stroke:none
    style D fill:#4051b5,color:#fff,stroke:none
    style E fill:#2e7d32,color:#fff,stroke:none
    style G fill:#e65100,color:#fff,stroke:none
```

---

## What's in This Library

### TOGAF ADM (complete)
Full coverage of every ADM phase — objectives, process flows, techniques, templates, and deliverables checklists:
[Preliminary](togaf/preliminary.md) · [Phase A](togaf/phase-a-vision.md) · [Phase B](togaf/phase-b-business.md) · [Phase C](togaf/phase-c-information.md) · [Phase D](togaf/phase-d-technology.md) · [Phase E–F](togaf/phase-ef-migration.md) · [Phase G–H](togaf/phase-gh-governance.md) · [Requirements Management](togaf/requirements-management.md)

### Architecture Concepts
[Architecture Repository](togaf/architecture-repository.md) · [Enterprise Continuum](togaf/enterprise-continuum.md) · [Views & Viewpoints](togaf/views-viewpoints.md) · [Building Blocks (ABB/SBB)](togaf/building-blocks.md)

### Modelling & Notation
[ArchiMate 3.2 Quick Reference](archimate/index.md) — all layers, elements, relationships, and viewpoints

### Governance
[Architecture Board](governance/index.md) · Architecture Contracts · Dispensations · Compliance Reviews · Change Requests

### Practical Tools
[Incident Response Playbook](playbooks/incident-response.md) · [Technology Evaluation Playbook](playbooks/technology-evaluation.md) · [ADR Templates](adrs/index.md)

### Knowledge Capture
[Architecture Notes](architecture/index.md) — evergreen patterns · [Case Studies](case-studies/index.md) — project experience

---

## Conventions

- **ADRs** — immutable. Once Accepted, create a new ADR to supersede, never edit.
- **Architecture Notes** — evergreen reference knowledge; update freely.
- **Case Studies** — written after project completion; include lessons learned.
- **Playbooks** — include a "Last reviewed" date; review annually minimum.
- **TOGAF pages** — cite the specific TOGAF chapter for every reference.

---

## Adding New Content

1. Create a Markdown file in the appropriate `docs/<section>/` folder.
2. Add it to `nav:` in `mkdocs.yml`.
3. For decisions → use the [ADR template](adrs/index.md).
4. For new playbooks → copy the structure from an existing playbook.
5. Run `mkdocs serve` locally to preview before committing.

---

*Library source: TOGAF Standard 10th Edition — The Open Group · ArchiMate 3.2 — The Open Group · AWS Well-Architected · Google SRE Book · DORA · ThoughtWorks Tech Radar · COBIT 2019 · ITIL 4*
