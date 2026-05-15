# Phase E & F — Opportunities, Solutions & Migration Planning

**TOGAF Reference:** Part II, Chapters 10 & 11 — Phases E and F  
**Phase E Objective:** Identify delivery vehicles — projects, programmes, work packages — that will deliver the Target Architecture. Create the initial Architecture Roadmap.  
**Phase F Objective:** Finalise the Architecture Roadmap and Migration Plan. Ensure it is agreed with business and IT leadership before handing over to implementation governance.

---

## Objectives

### Phase E — Opportunities & Solutions
1. Generate the initial, complete version of the Architecture Roadmap.
2. Determine whether an incremental approach is required via Transition Architectures.
3. Define and prioritise Work Packages.
4. Identify the major implementation projects and estimate resource requirements.

### Phase F — Migration Planning
1. Finalise the Architecture Roadmap.
2. Create the Implementation and Migration Plan.
3. Ensure all stakeholders and the Architecture Board agree to the plan.
4. Enable transition to implementation governance (Phase G).

---

## Process Flow

``` mermaid
flowchart TD
    subgraph E["Phase E — Opportunities & Solutions"]
        E1["Determine / Confirm Key\nCorporate Change Attributes"] --> E2
        E2["Determine Business\nConstraints for Implementation"] --> E3
        E3["Review & Consolidate\nGap Analysis Results\nfrom B, C, D"] --> E4
        E4["Review Consolidated\nRequirements across\nBusiness Functions"] --> E5
        E5["Consolidate & Reconcile\nInteroperability Requirements"] --> E6
        E6["Refine & Validate\nDependencies"] --> E7
        E7["Confirm Readiness &\nRisk for Implementation"] --> E8
        E8["Formulate Implementation &\nMigration Strategy"] --> E9
        E9["Identify & Group Work\nPackages"] --> E10
        E10["Identify Transition\nArchitectures"] --> E11
        E11["Create Architecture\nRoadmap & Migration Plan\n(initial)"] --> F1
    end

    subgraph F["Phase F — Migration Planning"]
        F1["Prioritise Migration Projects\nvia Cost / Benefit / Risk"] --> F2
        F2["Confirm Management\nFramework Interactions"] --> F3
        F3["Generate Architecture\nRoadmap (final)"] --> F4
        F4["Generate Implementation &\nMigration Plan (final)"] --> F5
        F5["Complete the Architecture\nDefinition Document"] --> F6
        F6["Phase F Complete ✓\nEnter Phase G"]
    end

    style E1 fill:#37474f,color:#fff,stroke:none
    style F6 fill:#2e7d32,color:#fff,stroke:none
```

---

## Migration Strategy Patterns

Choose the migration strategy per workload based on the 7R framework (AWS, Gartner):

| Strategy | Description | When to Use |
|---|---|---|
| **Retire** | Decommission — no business value remains | Legacy system replaced entirely |
| **Retain** | Keep as-is for now | Too risky or costly to change; revisit next cycle |
| **Rehost** | Lift & shift to cloud without modification | Quick migration; modernise later |
| **Replatform** | Lift, tinker, shift — minor optimisations | Swap runtime (e.g., replace Oracle with RDS) with minimal code change |
| **Repurchase** | Move to a SaaS product | HR system → Workday; CRM → Salesforce |
| **Refactor / Re-architect** | Redesign and rebuild for cloud / microservices | Core business domains that must be differentiated |
| **Relocate** | Move infrastructure to different cloud region / AZ | Data residency; latency |

**Workload migration strategy register:**

| Workload | Current State | Strategy | Target State | Complexity | Priority |
|---|---|---|---|---|---|
| Monolith — Order module | On-prem Java 8 | Refactor | ECS Fargate + PostgreSQL | High | P1 |
| Monolith — Auth | On-prem custom | Repurchase | Okta SSO | Low | P1 |
| Oracle Database | On-prem Oracle | Replatform | AWS RDS PostgreSQL | High | P1 |
| HR System | On-prem legacy HR | Repurchase | Workday | Medium | P3 |
| Static marketing site | On-prem Apache | Rehost → Replatform | S3 + CloudFront | Low | P2 |
| Batch reporting | On-prem SQL Server | Refactor | Redshift + dbt + Grafana | Medium | P2 |

---

## Transition Architectures

When a direct move from baseline to target is too risky, define intermediate states.

``` mermaid
flowchart LR
    BL["**Baseline**\nMonolith + Oracle\nOn-prem\nManual deploy"]
    T1["**Transition 1**\n(Month 3)\nAPI Gateway live\nAuth migrated to Okta\nOrder Service extracted"]
    T2["**Transition 2**\n(Month 6)\nInventory Service extracted\nOracle → RDS PostgreSQL\nCI/CD automated"]
    TGT["**Target**\n(Month 9)\nAll services on ECS\nOracle decommissioned\nFull observability"]

    BL --> T1 --> T2 --> TGT

    style BL fill:#c62828,color:#fff,stroke:none
    style T1 fill:#e65100,color:#fff,stroke:none
    style T2 fill:#1565c0,color:#fff,stroke:none
    style TGT fill:#2e7d32,color:#fff,stroke:none
```

Each Transition Architecture must be a stable, operable state — not a half-built system.

---

## Work Package Definition

A Work Package is a cohesive, deliverable-focused unit of implementation work. It maps to a project or sprint epic.

**Work package template:**

```markdown
## WP-NNN: {Short title}

**Delivers toward:** Transition Architecture {N} / Target
**Business value:** {One sentence — what business outcome this enables}
**Dependencies:** {Other work packages that must complete first}
**Estimated effort:** {T-shirt size: S/M/L/XL or story points}
**Squad(s):** {Responsible squads}
**ADRs:** {Any ADRs governing this work package}

### Scope
- {What will be built / migrated / decommissioned}

### Out of scope
- {Explicitly exclude to prevent scope creep}

### Exit criteria
- [ ] {Measurable outcome 1}
- [ ] {Measurable outcome 2}
```

---

## Architecture Roadmap

The Architecture Roadmap sequences Work Packages across time. Visualise it as a Gantt or swimlane:

``` mermaid
gantt
    title Architecture Roadmap — 9-Month Programme
    dateFormat  YYYY-MM
    axisFormat  %b %Y
    todayMarker off

    section Foundations
    API Gateway & Kong setup          :done,    wp01, 2024-03, 2024-04
    Okta SSO integration              :done,    wp02, 2024-03, 2024-04
    CI/CD pipeline (GitHub Actions)   :active,  wp03, 2024-04, 2024-05
    VPC & networking (Terraform)      :         wp04, 2024-04, 2024-05

    section Transition 1 — Order Domain
    Order Service extraction          :         wp05, 2024-05, 2024-07
    Order DB → RDS PostgreSQL         :         wp06, 2024-06, 2024-07
    Payment integration (Stripe)      :         wp07, 2024-06, 2024-07

    section Transition 2 — Inventory & Data
    Inventory Service extraction      :         wp08, 2024-07, 2024-09
    Inventory DB → RDS PostgreSQL     :         wp09, 2024-07, 2024-09
    SNS/SQS event bus wiring          :         wp10, 2024-07, 2024-08
    Observability (OTel + dashboards) :         wp11, 2024-08, 2024-09

    section Target State
    Oracle decommission               :         wp12, 2024-09, 2024-11
    Monolith retirement               :         wp13, 2024-10, 2024-12
    Notification Service build        :         wp14, 2024-09, 2024-10
```

---

## Implementation & Migration Plan Structure

```
1. Executive Summary
   - Programme objective
   - Timeline and key milestones
   - Resource and budget summary

2. Migration Strategy
   - 7R classification per workload
   - Selected approach and rationale

3. Transition Architectures
   - Description and exit criteria for each transition state

4. Work Package Register
   - All work packages, dependencies, owners, effort

5. Architecture Roadmap (Gantt / swimlane)

6. Resource Plan
   - Squad assignments, hiring needs, contractor requirements

7. Risk Register (Programme level)
   - Risks to migration; mitigations; owners

8. Governance Approach
   - Architecture reviews cadence
   - Phase G engagement plan

9. Benefits Realisation Plan
   - KPIs from Phase A mapped to milestones
   - Measurement approach

10. Dependencies & Constraints
    - External dependencies; fixed dates; regulatory milestones
```

---

## Prioritisation Model — Work Package Scoring

Score each work package to build the roadmap sequence:

| Work Package | Business Value (1–5) | Architectural Risk if Delayed (1–5) | Dependency Unblocking (1–5) | Effort (inverse, 1–5) | **Score** |
|---|---|---|---|---|---|
| API Gateway | 4 | 5 | 5 | 4 | **4.5** |
| Okta SSO | 5 | 4 | 4 | 4 | **4.25** |
| Order Service extraction | 5 | 5 | 3 | 2 | **3.75** |
| CI/CD pipeline | 4 | 3 | 5 | 3 | **3.75** |
| Oracle decommission | 3 | 4 | 2 | 1 | **2.5** |

Higher score = earlier in roadmap.

---

## Output Artifacts (Phase E–F Exit Criteria)

- [ ] 7R Migration Strategy register — all in-scope workloads classified
- [ ] Work Package register — all work packages defined with dependencies
- [ ] Transition Architectures — defined, stable, and documented
- [ ] Architecture Roadmap — sequenced, time-bound, agreed
- [ ] Implementation & Migration Plan — complete
- [ ] Resource plan — agreed with delivery lead
- [ ] Risk register updated (programme-level)
- [ ] Benefits Realisation Plan — KPIs mapped to milestones
- [ ] Architecture Repository updated
- [ ] Stakeholder sign-off on roadmap and plan

---

## Common Mistakes

!!! failure "Roadmap without transition architectures"
    A roadmap that goes directly from baseline to target in one step, for anything non-trivial, is a fiction. Define intermediate stable states — each must be operable.

!!! warning "Work packages without exit criteria"
    Without measurable exit criteria, work packages are never "done" — scope creep is inevitable. Every work package must have a binary done/not-done test.

!!! tip "7R as a conversation tool"
    Use the 7R framework in workshops with engineering leads and product owners. It forces honest conversations about what can realistically be migrated, and on what timeline.

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part II, Chapter 10: Phase E
- TOGAF Standard 10th Edition — Part II, Chapter 11: Phase F
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap10.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap10.html)
- AWS Migration Strategies (7Rs): [aws.amazon.com/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud](https://aws.amazon.com/blogs/enterprise-strategy/6-strategies-for-migrating-applications-to-the-cloud/)
