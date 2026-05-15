# TOGAF ADM — Architecture Development Method

**Standard:** TOGAF Standard, 10th Edition (2022) | The Open Group  
**Predecessor:** TOGAF 9.2 (2018) — widely still in use  
**Certification:** TOGAF Foundation (Level 1) + Practitioner (Level 2)

> TOGAF is the world's most widely adopted enterprise architecture framework. The ADM is its core — a repeatable, phase-based process for developing and managing enterprise architectures.

---

## The ADM Cycle

``` mermaid
flowchart TD
    RM(["Requirements\nManagement\n(Central)"])

    PRE([Preliminary\nFramework &\nPrinciples]) --> A
    A([Phase A\nArchitecture\nVision]) --> B
    B([Phase B\nBusiness\nArchitecture]) --> C
    C([Phase C\nInformation\nSystems]) --> D
    D([Phase D\nTechnology\nArchitecture]) --> E
    E([Phase E\nOpportunities\n& Solutions]) --> F
    F([Phase F\nMigration\nPlanning]) --> G
    G([Phase G\nImplementation\nGovernance]) --> H
    H([Phase H\nArchitecture\nChange Mgmt]) --> A

    RM <--> A
    RM <--> B
    RM <--> C
    RM <--> D
    RM <--> E
    RM <--> F
    RM <--> G
    RM <--> H

    style PRE fill:#37474f,color:#fff,stroke:none
    style A fill:#4051b5,color:#fff,stroke:none
    style B fill:#4051b5,color:#fff,stroke:none
    style C fill:#4051b5,color:#fff,stroke:none
    style D fill:#4051b5,color:#fff,stroke:none
    style E fill:#2e7d32,color:#fff,stroke:none
    style F fill:#2e7d32,color:#fff,stroke:none
    style G fill:#e65100,color:#fff,stroke:none
    style H fill:#e65100,color:#fff,stroke:none
    style RM fill:#6a1b9a,color:#fff,stroke:none
```

---

## Phase Summary

| Phase | Name | Primary Goal | Key Output |
|---|---|---|---|
| [Preliminary](preliminary.md) | Framework & Principles | Establish architecture capability | Architecture Principles, Architecture Framework, Tools |
| [A](phase-a-vision.md) | Architecture Vision | Agree scope, stakeholders, and high-level vision | Architecture Vision, Statement of Architecture Work |
| [B](phase-b-business.md) | Business Architecture | Baseline → Target business architecture; gap analysis | Business Architecture Document |
| [C](phase-c-information.md) | Information Systems | Data and application architecture baseline → target | Data & Application Architecture Documents |
| [D](phase-d-technology.md) | Technology Architecture | Technology baseline → target; standards | Technology Architecture Document |
| [E](phase-ef-migration.md) | Opportunities & Solutions | Initial implementation and migration planning | Architecture Roadmap, Work Packages |
| [F](phase-ef-migration.md) | Migration Planning | Finalise migration plan; prioritise work packages | Migration Plan, Architecture Roadmap (final) |
| [G](phase-gh-governance.md) | Implementation Governance | Oversee implementation; ensure compliance | Architecture Contracts, Compliance Assessments |
| [H](phase-gh-governance.md) | Architecture Change Management | Manage changes; determine if new ADM cycle needed | Change Requests, Updated Architecture |
| [RM](requirements-management.md) | Requirements Management | Capture, store, and feed requirements to all phases | Requirements Repository |

---

## Key TOGAF Concepts

``` mermaid
mindmap
  root((TOGAF\nCore Concepts))
    ADM
      Nine phases + Requirements Mgmt
      Iterative and cyclic
      Adapted to context
    Architecture Repository
      Architecture Metamodel
      Architecture Landscape
      Standards Information Base
      Reference Library
      Governance Log
    Enterprise Continuum
      Architecture Continuum
      Solutions Continuum
      Foundation → Common Systems → Industry → Organisation
    Architecture Capability
      Architecture Board
      Architecture Principles
      Architecture Contracts
      Architecture Compliance
    Deliverables
      Architecture Vision
      Architecture Definition Document
      Architecture Requirements Specification
      Architecture Roadmap
      Architecture Contract
      Statement of Architecture Work
```

---

## TOGAF Architecture Domains (BDAT)

TOGAF organises architecture work across four domains, developed in Phases B, C, and D:

``` mermaid
flowchart LR
    B["**Business Architecture**\nBusiness strategy, governance,\norganisation, key business processes"]
    DA["**Data Architecture**\nStructure of logical and\nphysical data assets & management"]
    AA["**Application Architecture**\nBlueprint of individual applications,\ninteractions, relationships to business"]
    TA["**Technology Architecture**\nHardware, software, network\ninfrastructure needed to support"]

    B --> DA
    B --> AA
    DA --> TA
    AA --> TA

    style B fill:#1565c0,color:#fff,stroke:none
    style DA fill:#4051b5,color:#fff,stroke:none
    style AA fill:#4051b5,color:#fff,stroke:none
    style TA fill:#37474f,color:#fff,stroke:none
```

---

## Architecture State Model

Every ADM engagement produces baseline and target architectures with gap analysis:

``` mermaid
flowchart LR
    A["**Baseline Architecture**\n(As-Is)\nCurrent state — documented\nbefore any change"]
    G["**Gap Analysis**\nWhat's missing, what needs\nto change, what to retire"]
    T["**Target Architecture**\n(To-Be)\nDesired future state\nthat satisfies the drivers"]
    TA["**Transition Architectures**\n(optional)\nIntermediate states if\ndirect migration is not feasible"]

    A --> G --> T
    A --> TA --> T

    style A fill:#37474f,color:#fff,stroke:none
    style G fill:#e65100,color:#fff,stroke:none
    style T fill:#2e7d32,color:#fff,stroke:none
    style TA fill:#6a1b9a,color:#fff,stroke:none
```

---

## Core Deliverables Map

| Deliverable | Produced In | Used In |
|---|---|---|
| **Statement of Architecture Work (SoAW)** | Phase A | All phases — governs the engagement |
| **Architecture Principles** | Preliminary | All phases — arbitrates decisions |
| **Architecture Vision** | Phase A | B, C, D (shapes scope and direction) |
| **Architecture Definition Document (ADD)** | B, C, D | E, F, G — the detailed architecture |
| **Architecture Requirements Specification (ARS)** | RM → B, C, D | E, F — what the architecture must satisfy |
| **Architecture Roadmap** | E, F | G, H — sequenced work packages |
| **Transition Architecture(s)** | E, F | G — intermediate states |
| **Architecture Contract** | G | G, H — governs implementation |
| **Architecture Compliance Review** | G | H — verifies adherence |
| **Architecture Change Request** | H | A (triggers new cycle) |

---

## ADM Iteration Patterns

TOGAF explicitly supports iterating the ADM at multiple levels:

| Pattern | Scope | When Used |
|---|---|---|
| **Architecture capability** | Preliminary | Establishing or maturing the EA practice itself |
| **Architecture context** | A → D | Developing the architecture for a programme or initiative |
| **Transition planning** | E → F | Planning multiple transition states |
| **Architecture governance** | G → H | Managing an architecture under implementation |

---

## Adapting TOGAF to Your Context

TOGAF is a framework — it must be adapted. Common adaptations:

| Context | Adaptation |
|---|---|
| Small organisation / startup | Streamline: combine Preliminary + A; use lightweight SoAW |
| Agile programme | Run B, C, D in iteration 0 of each release; integrate ADRs as lightweight architecture decisions |
| Cloud migration | Emphasise Phase D (technology) and Phase F (migration sequencing); use Well-Architected review |
| Application architecture (not enterprise) | Focus on Phases B–D; use C4 Model for architecture description; ADRs for decisions |
| Regulated industry | Emphasise governance (G, H); maintain full Architecture Repository; formal compliance review |

---

## TOGAF + Other Frameworks

| Framework | Relationship to TOGAF |
|---|---|
| **ArchiMate 3.1** | The modelling language for TOGAF — use for all architecture diagrams |
| **Zachman Framework** | Complementary classification scheme — TOGAF tells you *how*, Zachman tells you *what to classify* |
| **COBIT 2019** | IT governance layer — TOGAF Phase G aligns with COBIT governance objectives |
| **ITIL 4** | Service management — aligns with TOGAF Phase G/H for ongoing operations |
| **SABSA** | Security architecture — plugs into TOGAF as a domain-specific method for security viewpoints |
| **C4 Model** | Lightweight notation for software architecture — practical replacement for UML in Phases C/D |

See [Frameworks Reference](../reference/frameworks.md) for a full comparison.

---

## The Open Group Resources

| Resource | Link |
|---|---|
| TOGAF Standard (requires free registration) | [opengroup.org/togaf](https://www.opengroup.org/togaf) |
| TOGAF Library | [pubs.opengroup.org/architecture/togaf10-doc/arch](https://pubs.opengroup.org/architecture/togaf10-doc/arch/) |
| TOGAF ADM online | Free to browse at The Open Group |
| Certification (TOGAF Foundation + Practitioner) | Exam via Pearson VUE or Prometric |
| ArchiMate 3.2 Specification | [opengroup.org/archimate3](https://www.opengroup.org/archimate3) |
