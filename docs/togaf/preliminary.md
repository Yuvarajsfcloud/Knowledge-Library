# Preliminary Phase — Framework & Principles

**TOGAF Reference:** Part II, Chapter 5 — Preliminary Phase  
**Objective:** Establish the architecture capability — the people, processes, tools, and principles needed to operate architecture within the organisation before any architecture project begins.

> *"Before you can architect anything, you must architect the architecture practice itself."*

---

## Objectives

1. Determine the **architecture capability** the organisation wants and needs.
2. Establish the **architecture capability** through: Architecture Board, Architecture Framework, Architecture Principles, Architecture Repository, and Architecture Governance.
3. Select and customise the architecture framework and tools.
4. Define and establish architecture principles.

---

## Process Flow

``` mermaid
flowchart TD
    A[Identify Organisational Context\nScope, structure, stakeholders] --> B[Identify Key Drivers\n& Business Context]
    B --> C[Define Scope\nof Architecture Practice]
    C --> D[Define & Establish\nArchitecture Team & Governance]
    D --> E[Identify & Establish\nArchitecture Principles]
    E --> F[Select Reference Frameworks\nTOGAF + tailoring]
    F --> G[Implement Architecture Tools\n& Repository]
    G --> H[Preliminary Phase\nComplete — Ready for Phase A]

    style A fill:#37474f,color:#fff,stroke:none
    style H fill:#2e7d32,color:#fff,stroke:none
```

---

## Inputs

| Input | Source |
|---|---|
| TOGAF and other architecture framework descriptions | External / The Open Group |
| Board strategies, business plans, business drivers | Senior management |
| Major frameworks in use: IT governance, security, HR | Internal |
| Architecture capability assessment | Self-assessment / external review |
| Partnership and contract agreements | Legal / Procurement |

---

## Steps (TOGAF ADM Standard)

### Step 1 — Scope the Organisations Impacted

Define which parts of the enterprise the architecture practice will cover. Be explicit about what is in scope and what is not.

| Scope Dimension | Decision |
|---|---|
| **Enterprise scope** | Which business units, geographies, divisions? |
| **Architecture domains** | All four (B+D+A+T) or subset? |
| **Governance authority** | Advisory, consultative, or mandating? |
| **Engagement model** | Project-driven, programme-driven, or continuous? |

---

### Step 2 — Confirm Governance & Support Frameworks

| Framework | Purpose in Preliminary |
|---|---|
| **Architecture Board** | Decision-making body; owns architecture principles and dispensations |
| **Architecture Governance** | Policies and processes for managing architectures |
| **IT Governance** (COBIT, ISO 38500) | Aligns architecture to broader IT oversight |
| **Risk Management** (ISO 31000) | Integrates architecture risk with enterprise risk |
| **Security** (SABSA, ISO 27001) | Security architecture viewpoint integration |

---

### Step 3 — Define & Establish Architecture Team

| Role | Responsibilities |
|---|---|
| **Chief Architect / EA Lead** | Overall architecture vision; Architecture Board membership |
| **Domain Architect (Business)** | Business architecture; liaison with strategy and business stakeholders |
| **Domain Architect (Data)** | Data architecture; data governance integration |
| **Domain Architect (Application)** | Application portfolio; integration architecture |
| **Domain Architect (Technology)** | Technology standards; infrastructure and cloud |
| **Architecture Practice Manager** | Repository management; process; tooling |

---

### Step 4 — Identify & Establish Architecture Principles

Architecture principles are the **foundation of all architecture decisions**. They encode the organisation's values and strategic intent into actionable guidance for architects.

#### Principle Template (TOGAF Standard)

```
Principle Name:    {Short, memorable name}
Statement:         {One sentence — what is true or required}
Rationale:         {Why this principle exists — the business reason}
Implications:      {What this principle requires or constrains in practice}
```

#### Sample Principle Set — Applications Architecture

| # | Name | Statement | Rationale | Implications |
|---|---|---|---|---|
| P1 | **Business Continuity** | Enterprise operations must be maintained despite any system disruptions. | Availability of IT systems is critical to business revenue and reputation. | Requires DR planning, RTO/RPO targets, and failover capability for all critical systems. |
| P2 | **Data Is an Asset** | Data is a shared enterprise asset, managed throughout its lifecycle. | Data-driven decisions require trusted, governed, accessible data. | Requires data ownership, classification, retention policies, and a data governance framework. |
| P3 | **Technology Independence** | Applications are independent of specific technology choices. | Vendor lock-in reduces flexibility and increases cost long-term. | Requires abstraction layers; avoid embedding vendor-specific APIs deep in business logic. |
| P4 | **Common Use of Components** | Shared, reusable services and components are preferred over duplication. | Reduces maintenance overhead and inconsistency. | Requires a service catalogue and a process for proposing new shared components. |
| P5 | **Compliance with Law** | Enterprise IT must comply with applicable laws and regulations. | Legal, regulatory, and contractual obligations are non-negotiable. | Requires a compliance catalogue; all architectures must pass legal/compliance review. |
| P6 | **Security by Design** | Security is a design-time concern, not a post-deployment addition. | Retrofitting security is expensive and incomplete. | All architectures must include a threat model (STRIDE); security sign-off is a gate. |
| P7 | **Single Source of Truth** | Each data entity has one authoritative source; others reference it. | Multiple masters create inconsistency and reconciliation burden. | Requires master data management strategy and source-of-record designation per entity. |
| P8 | **Maximise Benefit to the Enterprise** | Architecture decisions are made to maximise benefit across the enterprise, not individual units. | Sub-optimisation at unit level destroys enterprise value. | Requires enterprise-wide impact assessment for significant decisions. |

---

### Step 5 — Select & Tailor Architecture Framework

TOGAF is a starting point, not a straitjacket. Tailor it by:

- **Selecting relevant ADM phases** — not all programmes need all phases equally.
- **Integrating domain-specific methods** — SABSA for security, ArchiMate for notation, C4 for software.
- **Calibrating deliverable depth** — a startup needs a 2-page Architecture Vision; a regulated enterprise needs a formal document.

| Tailoring Decision | Options |
|---|---|
| Architecture notation | ArchiMate 3.2, UML, C4 Model, free-form diagrams |
| ADR management | Lightweight Markdown ADRs (this repo) vs. formal tool (Sparx EA) |
| Repository | This MkDocs knowledge base + Git vs. dedicated EA tool |
| Governance formality | Advisory (recommended) → Consultative (reviewed) → Mandating (approved) |

---

### Step 6 — Implement Architecture Repository

The Architecture Repository is the structured store for all architecture artifacts. See [Architecture Repository](architecture-repository.md) for the full structure.

**Minimum viable repository (for small practices):**

```
architecture-repo/
├── principles/          ← Architecture Principles (this page)
├── architecture/        ← Domain architectures (BDAT)
├── standards/           ← Technology Standards Catalogue
├── adrs/                ← Architecture Decision Records
├── patterns/            ← Reusable architecture patterns
└── governance/          ← Board decisions, dispensations, compliance reviews
```

---

## Output Artifacts

- [ ] **Architecture Principles document** — agreed by Architecture Board and business sponsors
- [ ] **Architecture Framework definition** — which frameworks, adapted how
- [ ] **Architecture team structure** — roles, responsibilities, RACI
- [ ] **Architecture governance model** — Board charter, decision rights, escalation path
- [ ] **Architecture Repository** — set up and accessible to all architects
- [ ] **Architecture tools** — selected, configured, and documented

---

## Common Mistakes

!!! failure "Skipping the Preliminary Phase entirely"
    Jumping straight to Phase A without establishing principles, governance, or a repository means every engagement re-invents the wheel. The Preliminary Phase pays compound interest.

!!! warning "Principles as platitudes"
    Principles like "be agile" or "use best practices" provide no decision guidance. A good principle must have specific, testable implications — if it doesn't constrain choices, it's not a principle.

!!! warning "Architecture Board without authority"
    An Architecture Board that can only advise but never block will be ignored. Define the governance model's authority level explicitly and get executive sponsorship.

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part II, Section 5: Preliminary Phase
- TOGAF Standard — Chapter 20: Architecture Principles
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap05.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap05.html)
