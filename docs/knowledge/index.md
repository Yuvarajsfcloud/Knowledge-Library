# Knowledge Library

> **Track A — Reference Knowledge.** TOGAF-aligned, evergreen, organised by ADM phase. Use this side when you want to *understand* an architectural concept, see worked examples, or check what good looks like.
>
> When you want a *step-by-step process to do work*, switch to the **[Playbook](../playbook/index.md)**.

---

## Architecture Development Method (TOGAF ADM)

Every TOGAF ADM phase has a dedicated page with foundations, execution guidance, decision frameworks, target outputs, decision guides, tools, AI-acceleration notes, and common mistakes.

| Phase | Page | Pairs With |
|---|---|---|
| Preliminary | [Preliminary](adm/preliminary.md) | — |
| A | [Architecture Vision](adm/architecture-vision.md) | — |
| B | [Business Architecture](adm/business-architecture.md) | — |
| C (Application) | [Application Architecture](adm/information-systems/application-architecture.md) | Data Architecture |
| C (Data) | [Data Architecture](adm/information-systems/data-architecture.md) | Application Architecture |
| D | [Technology Architecture](adm/technology-architecture.md) | — |
| E | [Opportunities & Solutions](adm/opportunities-and-solutions.md) | Migration Planning |
| F | [Migration Planning](adm/migration-planning.md) | Opportunities & Solutions |
| G | [Implementation Governance](adm/implementation-governance.md) | Change Management |
| H | [Architecture Change Management](adm/change-management.md) | Implementation Governance |
| Continuous | [Requirements Management](adm/requirements-management.md) | All phases |

---

## Reference

Cross-cutting reference material that supports all ADM phases:

| Page | Purpose |
|---|---|
| [Architecture Repository](reference/architecture-repository.md) | What goes where; reference vs. solutions |
| [Enterprise Continuum](reference/enterprise-continuum.md) | Foundation → Common Systems → Industry → Organisation-Specific |
| [Views & Viewpoints](reference/views-viewpoints.md) | ISO/IEC/IEEE 42010 alignment; stakeholder concerns |
| [Building Blocks (ABB / SBB)](reference/building-blocks.md) | Architecture vs. Solution Building Blocks |
| [ArchiMate 3.2 Quick Reference](reference/archimate.md) | All layers, elements, relationships, viewpoints |
| [Frameworks Comparison](reference/frameworks.md) | TOGAF, Zachman, COBIT, ITIL, SABSA, C4, DORA |
| [Patterns](reference/patterns.md) | Catalogue of architecture patterns |
| [Tech Radar](reference/tech-radar.md) | Adopt / Trial / Assess / Hold |
| [Governance Framework](reference/governance-framework.md) | Architecture Board, Contracts, Compliance |
| [Glossary](reference/glossary.md) | Common terms with TOGAF-aligned definitions |

---

## Architecture Notes

Evergreen analysis of architectural patterns and trade-offs:

- [Architecture Notes Index](architecture-notes/index.md)
- [Event-Driven Architecture](architecture-notes/event-driven-architecture.md)

---

## Decision Records (ADRs)

Immutable records of significant architectural decisions:

- [ADR Index](decision-records/index.md)

---

## Case Studies

Project post-mortems and real-world worked examples:

- [Case Studies Index](case-studies/index.md)
- [Microservices Migration](case-studies/microservices-migration.md)

---

## Conventions on Knowledge Pages

Every Knowledge page uses a consistent section ordering so you can scan them the same way:

1. **Foundations** — what & why; quick recall material
2. **Concepts & Relationships** — how the page's topic relates to other ADM artefacts
3. **Execution Guidance** — guided practice; how to *do* the thing
4. **Analysis & Insights** — deeper reasoning; common failure modes
5. **Decision Frameworks** — judgment & trade-offs (when to lean which way)
6. **Target Outputs** — checklist of artefacts produced; ends with a synthesis exercise
7. **Decision Guides & Visuals** — flowcharts and diagrams
8. **Tools & Credible Sources** — vendor-neutral references
9. **Acceleration Using AI** — what LLMs help with, plus bias warnings
10. **Common Mistakes** — failure-mode admonitions
11. **Related** — cross-links

This is the **implicit Bloom's spine**: recall → comprehension → application → analysis → evaluation → synthesis. The Bloom layer is *how the content is framed*, not how the page is structured.
