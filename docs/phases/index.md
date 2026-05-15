# Architecture Engagement Phases

A repeatable, phase-based model for delivering architectural work — from first stakeholder conversation to steady-state operations. Aligned with **TOGAF ADM**, **IEEE 42010**, and **AWS Well-Architected** practices.

---

## Lifecycle Overview

``` mermaid
flowchart LR
    P1([Phase 1\nDiscovery]) --> P2([Phase 2\nDesign])
    P2 --> P3([Phase 3\nValidation])
    P3 --> P4([Phase 4\nImplementation])
    P4 --> P5([Phase 5\nOperate & Evolve])
    P5 -->|Trigger: change\nor new initiative| P1

    style P1 fill:#4051b5,color:#fff,stroke:none
    style P2 fill:#4051b5,color:#fff,stroke:none
    style P3 fill:#4051b5,color:#fff,stroke:none
    style P4 fill:#4051b5,color:#fff,stroke:none
    style P5 fill:#4051b5,color:#fff,stroke:none
```

---

## Phase Summary

| Phase | Goal | Primary Output |
|---|---|---|
| [1 — Discovery](01-discovery.md) | Understand context, constraints, and stakeholder needs | Stakeholder map, current-state diagram, constraint inventory |
| [2 — Design](02-design.md) | Produce a candidate architecture with documented decisions | C4 diagrams, ADRs, RFC / Architecture Brief |
| [3 — Validation](03-validation.md) | Stress-test the design against risks and requirements | Trade-off matrix, PoC results, fitness functions |
| [4 — Implementation](04-implementation.md) | Guide engineering teams during build | Reference architecture, runbooks, guardrails, definition of done |
| [5 — Operate & Evolve](05-operate.md) | Monitor health, manage tech debt, trigger next cycle | SLOs, post-mortems, tech radar, fitness function results |

---

## Key Principles

1. **Architecture is a continuous activity** — not a one-time gate. Phases loop.
2. **Decisions outlive diagrams** — always capture the *why* in an ADR, not just the *what*.
3. **Just enough architecture** — produce only the artifacts the situation genuinely needs.
4. **Fitness functions over opinions** — define measurable criteria before validating.
5. **Constraint-first thinking** — discover non-negotiable constraints in Phase 1; never let them surface as surprises in Phase 4.

---

## Artifact Map

``` mermaid
mindmap
  root((Architecture\nWork))
    Discovery
      Stakeholder Map
      Current-State Diagram
      Constraint Inventory
      Risk Register
    Design
      C4 Model Diagrams
      Architecture Decision Records
      RFC / Architecture Brief
      Data Flow Diagrams
    Validation
      Trade-off Matrix
      PoC / Spike Results
      Fitness Functions
      Threat Model
    Implementation
      Reference Architecture
      IaC Templates
      Definition of Done
      Runbooks
    Operate & Evolve
      SLOs / Error Budgets
      Post-mortems
      Tech Debt Backlog
      Technology Radar
```

---

## Sources & Frameworks

| Framework | Relevance |
|---|---|
| [TOGAF ADM (The Open Group)](https://www.opengroup.org/togaf) | Overall phase structure and governance |
| [IEEE 42010:2011](https://www.iso.org/standard/50508.html) | Architecture description standard — viewpoints, decisions |
| [C4 Model — Simon Brown](https://c4model.com/) | Diagram hierarchy (Context → Container → Component → Code) |
| [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/) | Six pillars for design quality review |
| [Google SRE Book](https://sre.google/sre-book/table-of-contents/) | Operate phase: SLOs, error budgets, post-mortems |
| [Building Evolutionary Architectures — Ford, Parsons, Kua](https://evolutionaryarchitecture.com/) | Fitness functions, evolutionary design |
| [DORA Metrics](https://dora.dev/) | Delivery performance benchmarks |
| [ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar) | Technology assessment and adoption signals |
