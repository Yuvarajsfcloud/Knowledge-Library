# Requirements Management

**TOGAF Reference:** Part II, Chapter 14 — Requirements Management  
**Role in ADM:** Central, continuous — feeds into and receives from every ADM phase.

> Requirements Management is not a phase — it is the hub of the ADM cycle. Requirements are captured, maintained, and fed to all phases throughout the engagement.

---

## Objectives

1. Manage architecture requirements throughout the ADM cycle.
2. Ensure changes to requirements are managed, assessed for impact, and fed to the relevant phase.
3. Maintain a Requirements Repository as part of the Architecture Repository.

---

## Requirements Flow in the ADM

``` mermaid
flowchart TD
    RM(["Requirements\nManagement\nRepository"])

    A["Phase A\nArchitecture Vision"] <-->|"Identifies initial\nbusiness requirements"| RM
    B["Phase B\nBusiness Architecture"] <-->|"Business requirements\n& constraints"| RM
    C["Phase C\nInformation Systems"] <-->|"Data & application\nrequirements"| RM
    D["Phase D\nTechnology Architecture"] <-->|"Technology &\nNFRs"| RM
    E["Phase E\nOpportunities & Solutions"] <-->|"Prioritised requirements\nfor roadmap"| RM
    F["Phase F\nMigration Planning"] <-->|"Requirements per\nwork package"| RM
    G["Phase G\nGovernance"] <-->|"Compliance against\nrequirements"| RM
    H["Phase H\nChange Mgmt"] <-->|"New / changed\nrequirements"| RM

    style RM fill:#6a1b9a,color:#fff,stroke:none
```

---

## Requirements Classification

### TOGAF Requirement Types

| Type | Description | Phase Origin |
|---|---|---|
| **Business Requirements** | What the business needs to achieve its goals | Phase A, B |
| **Data Requirements** | How data must be managed, governed, and structured | Phase C |
| **Application Requirements** | What application capabilities and interactions are needed | Phase C |
| **Technology Requirements** | Infrastructure, platform, and technology constraints | Phase D |
| **Integration Requirements** | How systems must interoperate | Phase B, C |
| **Transition Requirements** | Constraints on the migration approach | Phase E, F |

### Non-Functional Requirements (NFRs) / Quality Attributes

Classify NFRs using the ISO/IEC 25010 quality model:

| Quality Attribute | Description | Example Requirement |
|---|---|---|
| **Performance Efficiency** | Response time, throughput, resource usage | p95 API latency < 300ms at 10K concurrent users |
| **Reliability** | Maturity, availability, fault tolerance, recoverability | 99.9% availability; RTO < 1h; RPO < 15min |
| **Security** | Confidentiality, integrity, authentication, authorisation | All PII encrypted at rest; MFA for admin access |
| **Maintainability** | Analysability, modifiability, testability | Code coverage ≥ 80%; no circular dependencies |
| **Portability** | Adaptability, installability | Deployable to any AWS region |
| **Compatibility** | Interoperability, co-existence | Must integrate with Okta via OIDC |
| **Usability** | Learnability, operability | Runbook exists for all operational procedures |
| **Functional Suitability** | Completeness, correctness, appropriateness | (Functional requirements — captured separately) |

---

## Requirements Repository Structure

Each requirement has a unique ID, classification, source, and status. Maintain in this repo or a tracking tool (Jira, Confluence).

### Requirements Register Template

| ID | Requirement | Type | Quality Attribute | Priority | Source | Status | Phase |
|---|---|---|---|---|---|---|---|
| REQ-001 | System must support 10K concurrent users at p95 < 300ms | NFR | Performance | Must | SLA / Phase A | Active | C, D |
| REQ-002 | All PII must remain within EU-West AWS regions | NFR | Security / Compliance | Must | GDPR / Legal | Active | C, D |
| REQ-003 | RTO ≤ 1h, RPO ≤ 15min for order processing domain | NFR | Reliability | Must | Business / Phase A | Active | D |
| REQ-004 | System must integrate with existing Okta SSO via OIDC | Functional | Compatibility | Must | IT Policy / Phase A | Active | C |
| REQ-005 | Independent service deployment without cross-squad coordination | NFR | Maintainability | Should | Architecture / Phase A | Active | B, C |
| REQ-006 | No vendor lock-in to single cloud provider for application logic | NFR | Portability | Should | Architecture Principle | Active | D |
| REQ-007 | Audit trail for all order state changes; retained 7 years | Functional | Security | Must | Legal / Finance | Active | C |
| REQ-008 | Payment processing must be PCI-DSS compliant | NFR | Security | Must | Legal | Active | C, D |

**Status values:** `Active` · `Deferred` · `Rejected` · `Superseded` · `Implemented`  
**Priority:** `Must` (TOGAF: Binding) · `Should` (Important) · `Could` (Nice to have) · `Won't` (Excluded)

---

## Requirements Traceability Matrix

Trace each requirement to the architecture components that satisfy it:

| Requirement | Business Arch (B) | Application Arch (C) | Technology Arch (D) | Validation (Phase E/G) |
|---|---|---|---|---|
| REQ-001: p95 < 300ms | — | Order Service SLA | ECS auto-scaling, ElastiCache | FF-01: k6 load test |
| REQ-002: EU-West PII | — | PII data flow map | AWS eu-west-1 only; VPC | AWS Config rule |
| REQ-003: RTO ≤ 1h | — | — | Multi-AZ RDS, ECS replicas | Chaos test + DR drill |
| REQ-004: Okta OIDC | — | Auth integration design | Kong OIDC plugin | Integration test |
| REQ-007: Audit trail | Order audit capability | Event sourcing / audit log service | CloudTrail + DynamoDB | Audit log test |

---

## Requirements Change Management

When a requirement changes during the ADM cycle:

``` mermaid
flowchart TD
    A["New or Changed\nRequirement Identified"] --> B["Log in Requirements\nRepository"]
    B --> C["Assess Impact\nAcross ADM Phases"]
    C --> D{Material\nArchitectural Impact?}
    D -- No --> E["Update requirement\nstatus; no phase change"]
    D -- Yes --> F["Raise Architecture\nChange Request (ACR)"]
    F --> G["Architecture Board\nDecision"]
    G --> H["Update affected\nPhase outputs and ADRs"]

    style A fill:#37474f,color:#fff,stroke:none
    style D fill:#e65100,color:#fff,stroke:none
    style G fill:#6a1b9a,color:#fff,stroke:none
```

---

## Architecturally Significant Requirements (ASRs)

ASRs are the subset of requirements with the greatest structural influence on the architecture. Identify them explicitly — they drive design decisions and fitness functions.

**Criteria for ASR classification (Bass, Clements, Kazman — *Software Architecture in Practice*):**
1. Does this requirement significantly affect the system's structure?
2. Would ignoring this requirement result in a fundamentally different architecture?
3. Is this requirement difficult or expensive to address after the architecture is established?

If yes to any two → it's an ASR.

**ASR Register:**

| ASR-ID | Requirement | Impact | Architectural Decision |
|---|---|---|---|
| ASR-01 | p95 < 300ms at 10K concurrent users | Service granularity, caching, async | Microservices; ElastiCache; async for non-critical paths |
| ASR-02 | EU-West data residency | Service deployment topology | Single AWS region; no cross-region data replication |
| ASR-03 | RTO < 1h, RPO < 15min | Database and compute design | Multi-AZ RDS; ECS replicas; auto-failover |
| ASR-04 | Independent deployability per squad | Service boundaries | Domain-aligned microservices; database-per-service |
| ASR-05 | PCI-DSS compliance for payments | Payment service isolation | Dedicated payment service; no PAN in order service |

---

## Output Artifacts

- [ ] Requirements Repository — maintained throughout all phases
- [ ] Requirements Traceability Matrix — complete and current
- [ ] ASR Register — identified and linked to architecture decisions
- [ ] Requirements Change Log — all changes tracked

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part II, Chapter 14: Requirements Management
- ISO/IEC 25010 — System and Software Quality Models
- *Software Architecture in Practice* — Bass, Clements, Kazman (ASR concept)
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap14.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap14.html)
