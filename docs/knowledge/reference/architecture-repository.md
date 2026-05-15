# Architecture Repository

**TOGAF Reference:** Part V, Chapter 41 — Architecture Repository  
**Purpose:** The Architecture Repository is the structured store for all architecture artifacts, decisions, standards, and governance records. It is the single source of truth for the architecture practice.

**Quick recall:** four logical sections — *Reference* (standards), *Solutions* (reusable patterns), *Landscape* (current state), *Governance* (decisions, dispensations). Anything not in one of these is not really a managed architecture asset.

---

## Repository Structure

``` mermaid
mindmap
  root((Architecture\nRepository))
    Architecture Metamodel
      Ontology of entity types used
      Relationships between entities
    Architecture Landscape
      Strategic Architecture
      Segment Architecture
      Capability Architecture
    Standards Information Base
      Technology Standards Catalogue
      Architecture Principles
      Industry standards referenced
    Reference Library
      Reference architectures
      Patterns library
      External resources
    Governance Log
      Architecture Decisions
      Architecture Contracts
      Compliance Reviews
      Dispensations
      Change Requests
    Solutions Landscape
      Building Blocks
      Deployed solutions
      Transition states
```

---

## Folder Structure for This Repository

```
docs/
├── togaf/                    ← TOGAF ADM (this section)
├── architecture/             ← Architecture Notes (patterns, principles)
├── phases/                   ← Engagement process guides
├── adrs/                     ← Architecture Decision Records (Governance Log)
├── case-studies/             ← Architecture experience (Reference Library)
├── playbooks/                ← Operational guides
├── archimate/                ← Notation reference
├── governance/               ← Architecture Board + governance
└── reference/                ← Frameworks comparison

# Also at repo root:
standards/                    ← Technology Standards Catalogue (Phase D)
patterns/                     ← Reusable patterns library
```

---

## Architecture Landscape

The Architecture Landscape organises architectures by level of granularity:

| Level | Scope | Description | Example |
|---|---|---|---|
| **Strategic Architecture** | Enterprise-wide | Long-horizon; aligns IT to business strategy; 3–5 year view | Enterprise capability roadmap |
| **Segment Architecture** | Business domain or programme | Medium horizon; aligns a business segment; 1–3 year view | E-commerce platform architecture |
| **Capability Architecture** | Individual project or service | Short horizon; specific capability; months | Order Service architecture |

Maintain all three levels in the repository. Capability architectures derive from segment; segment from strategic.

---

## Standards Information Base

See [Phase D — Technology Architecture](../adm/technology-architecture.md) for the full Technology Standards Catalogue.

**Standard entry format:**

```markdown
## STD-NNN: {Technology / Standard Name}

**Category:** Platform | Language | Data Store | Networking | Security | Integration | Observability
**Status:** Adopt | Trial | Assess | Hold | Retire
**Approved:** YYYY-MM-DD
**Reviewed:** YYYY-MM-DD
**Owner:** {Architecture Board / Domain Architect}

### Description
{What this standard covers}

### Approved Usage
{Where and how this technology may be used}

### Constraints
{Any conditions or restrictions on use}

### Rationale
{Why this standard was approved — link to ADR if applicable}

### Related Standards
{Other standards this interacts with}
```

---

## Architecture Principles Register

From the [Preliminary Phase](../adm/preliminary.md). Principles are maintained here as the canonical record.

| ID | Principle | Status | Approved | Last Reviewed |
|---|---|---|---|---|
| P1 | Business Continuity | Active | 2024-01-15 | 2025-01-15 |
| P2 | Data Is an Asset | Active | 2024-01-15 | 2025-01-15 |
| P3 | Technology Independence | Active | 2024-01-15 | 2025-01-15 |
| P4 | Common Use of Components | Active | 2024-01-15 | 2025-01-15 |
| P5 | Compliance with Law | Active | 2024-01-15 | 2025-01-15 |
| P6 | Security by Design | Active | 2024-01-15 | 2025-01-15 |
| P7 | Single Source of Truth | Active | 2024-01-15 | 2025-01-15 |
| P8 | Maximise Benefit to the Enterprise | Active | 2024-01-15 | 2025-01-15 |

---

## Reference Library

Reference architectures and patterns relevant to this practice:

| Resource | Type | Domain | Notes |
|---|---|---|---|
| [AWS Well-Architected](https://aws.amazon.com/architecture/well-architected/) | Reference Architecture | Cloud | Six pillars; use for Phase D review |
| [AWS Reference Architectures](https://aws.amazon.com/architecture/) | Reference Architecture | Cloud | Pre-built patterns for common workloads |
| [C4 Model examples](https://c4model.com/examples/) | Notation Examples | Architecture modelling | Use for Phases B–D diagrams |
| [CNCF Cloud-Native Landscape](https://landscape.cncf.io/) | Reference | Cloud-native | Technology assessment; Phase D |
| [12-Factor App](https://12factor.net/) | Pattern | Application | Application architecture baseline |
| [OWASP Top 10](https://owasp.org/www-project-top-ten/) | Reference | Security | Mandatory review for all Phase C/D work |
| [Microsoft Azure Architecture Center](https://docs.microsoft.com/en-us/azure/architecture/) | Reference Architecture | Cloud | Patterns applicable beyond Azure |

---

## Governance Log

All governance decisions are recorded here. See also [Governance Framework](governance-framework.md).

| Record Type | Location | Format |
|---|---|---|
| Architecture Decision Records | `docs/knowledge/decision-records/` | Markdown ADR (see [ADR index](../decision-records/index.md)) |
| Architecture Contracts | `docs/governance/contracts/` | Markdown contract (see Phase G template) |
| Compliance Reviews | `docs/governance/compliance/` | Markdown checklist result |
| Dispensations | `docs/governance/dispensations/` | Dispensation request form |
| Architecture Change Requests | `docs/governance/change-requests/` | ACR form (see Phase H template) |
| Architecture Board Minutes | `docs/governance/board-minutes/` | Meeting notes |

---

## Repository Maintenance

| Activity | Frequency | Owner |
|---|---|---|
| ADR updates (post-decision) | Immediate | Decision-making architect |
| Technology Standards review | Quarterly | Architecture Board |
| Architecture Principles review | Annual | Architecture Board |
| Architecture Landscape update | Per programme milestone | Lead Architect |
| Governance Log audit | Quarterly | Architecture Practice Manager |
| Reference Library review | Semi-annual | Domain Architects |

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part V, Chapter 41: Architecture Repository
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap41.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap41.html)
