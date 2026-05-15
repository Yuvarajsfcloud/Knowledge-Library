# Phase G & H — Governance & Architecture Change Management

**TOGAF Reference:** Part II, Chapters 12 & 13 — Phases G and H  
**Phase G Objective:** Ensure conformance to the Target Architecture throughout implementation. Provide architectural oversight, manage Architecture Contracts, and handle dispensation requests.  
**Phase H Objective:** Manage changes to the architecture and determine whether a new ADM cycle is needed.

---

## Phase G — Implementation Governance

### Objectives

1. Ensure the implementation project(s) conform to the agreed Target Architecture.
2. Establish and govern Architecture Contracts between the architecture practice and delivery squads.
3. Perform Compliance Reviews against the architecture at key milestones.
4. Manage dispensation requests where teams need to deviate from the architecture.
5. Identify when architecture changes are needed (triggers for Phase H).

---

### Process Flow — Phase G

``` mermaid
flowchart TD
    A["Confirm Scope &\nPriorities with Development\nManagement"] --> B
    B["Identify Deployment Resources\n& Skills Required"] --> C
    C["Guide Development of\nSolutions Deployment"] --> D
    D["Perform Enterprise Architecture\nCompliance Reviews"] --> E
    E["Implement Business &\nIT Operations"] --> F
    F["Perform Post-implementation\nReview"] --> G
    G["Close the Architecture\nContract — Phase G Complete ✓"]

    style A fill:#37474f,color:#fff,stroke:none
    style G fill:#2e7d32,color:#fff,stroke:none
```

---

### Architecture Contract

The Architecture Contract is the agreement between the architecture practice and the delivering squad. It documents what will be built, what constraints apply, and how conformance will be measured.

```markdown
## Architecture Contract

**Contract ID:** AC-NNN
**Work Package:** WP-NNN — {Title}
**Squad:** {Squad name}
**Lead Architect:** {Name}
**Effective Date:** {YYYY-MM-DD}
**Review Date:** {YYYY-MM-DD}

### 1. Architectural Requirements
{Key architectural requirements this work package must satisfy — cross-reference ASRs}

### 2. Architectural Standards & Principles to Apply
| Principle / Standard | Reference | Mandatory? |
|---|---|---|
| Service deployed to ECS Fargate | Technology Standards Catalogue | Yes |
| Secrets via AWS Secrets Manager only | Technology Standards Catalogue | Yes |
| Structured JSON logging with correlation ID | Observability Architecture | Yes |
| OpenTelemetry tracing | Observability Architecture | Yes |
| ADR for any new architectural decision | ADR process | Yes |

### 3. Accepted Deviations (Dispensations)
{List any approved deviations from standards, with justification}

### 4. Definition of Done — Architecture
- [ ] All architecture gates pass in CI/CD pipeline
- [ ] Fitness functions established and passing
- [ ] ADRs written for all new decisions
- [ ] Service added to service catalogue
- [ ] Runbook created
- [ ] Post-deployment smoke test passing

### 5. Compliance Review Schedule
| Milestone | Review Type | Date |
|---|---|---|
| Design complete | Architecture review | {date} |
| Sprint 3 demo | Lightweight check-in | {date} |
| Pre-production | Full compliance review | {date} |

### 6. Escalation Path
{Who to escalate to when architecture questions cannot be resolved at squad level}

### Signatures
| Role | Name | Date |
|---|---|---|
| Sponsoring Architect | | |
| Squad Tech Lead | | |
```

---

### Architecture Compliance Review

Run a formal compliance review at key milestones. The review verifies that implementation conforms to the Architecture Contract and Reference Architecture.

**Compliance Review Checklist:**

=== "Design Conformance"
    - [ ] Architecture Definition Document (ADD) has been consulted
    - [ ] All ASRs addressed in the design
    - [ ] No prohibited patterns used
    - [ ] ADRs written for all significant decisions
    - [ ] Threat model (STRIDE) completed for the work package scope

=== "Implementation Conformance"
    - [ ] Service deployed in private subnet; not directly internet-accessible
    - [ ] Secrets managed via AWS Secrets Manager
    - [ ] No PII in logs
    - [ ] Structured JSON logging with correlation ID
    - [ ] OpenTelemetry tracing instrumented
    - [ ] RED metrics exposed
    - [ ] IaC used for all infrastructure (no manual provisioning)
    - [ ] CI pipeline gates all passing (lint, tests, CVE scan, coupling check)

=== "Integration Conformance"
    - [ ] Integration pattern matches approved standard (REST or SQS/SNS only)
    - [ ] No direct cross-domain DB access
    - [ ] Event schemas registered and versioned
    - [ ] Consumer idempotency implemented and tested
    - [ ] API versioned (URL versioning or content negotiation)

=== "Operations Conformance"
    - [ ] Runbook published in `docs/playbooks/`
    - [ ] Alerts configured (SLO breach, DLQ depth, error rate)
    - [ ] Dashboard created for service (RED metrics)
    - [ ] DR test conducted; RTO/RPO validated

**Compliance outcomes:**

| Outcome | Definition | Action |
|---|---|---|
| **Fully compliant** | All criteria met | Approve for production |
| **Conditionally compliant** | Minor gaps with agreed remediation | Approve with remediation backlog |
| **Non-compliant — dispensation** | Intentional deviation; formally approved | Document dispensation; approve |
| **Non-compliant — block** | Material gap that must be fixed | Block production deployment; remediate and re-review |

---

### Dispensation Process

When a squad needs to deviate from an architectural standard, they must apply for a dispensation.

```markdown
## Dispensation Request

**Request ID:** DISP-NNN
**Applicant Squad:** {Squad}
**Date:** {YYYY-MM-DD}

### Deviation Requested
{Describe exactly what standard or principle is being deviated from}

### Justification
{Why the deviation is necessary — technical constraint, time, cost, etc.}

### Risk Assessment
{What risk does this deviation introduce?}

### Proposed Mitigation
{How will the risk be mitigated?}

### Duration
[ ] Permanent (update standard)
[ ] Temporary — target remediation date: {YYYY-MM-DD}

### Decision
[ ] Approved — by Architecture Board on {date}
[ ] Rejected — reason: {reason}
[ ] Deferred — pending: {action}
```

---

## Phase H — Architecture Change Management

### Objectives

1. Ensure that the architecture continues to meet its business intent as the environment evolves.
2. Monitor changes to the technology environment, business environment, and architecture.
3. Determine whether a new ADM cycle (Phase A) is needed or whether a minor update to the current architecture is sufficient.

---

### Process Flow — Phase H

``` mermaid
flowchart TD
    A["Establish Value\nRealisation Process"] --> B
    B["Deploy Monitoring Tools"] --> C
    C["Manage Risks"] --> D
    D["Provide Analysis\nfor Architecture Change\nManagement"] --> E
    E["Develop Change\nRequirements to Meet\nPerformance Targets"] --> F
    F["Manage Governance\nProcess"] --> G
    G{"Change Type?"}

    G -->|"Minor — update\narchitecture baseline"| H["Update Architecture\nDocuments & ADRs\nNo new ADM cycle"]
    G -->|"Significant — new\nproject/programme"| I["Initiate New ADM Cycle\nBack to Phase A"]
    G -->|"Simplification\nor re-use only"| J["Re-use existing\nbuilding blocks\nNo new ADM cycle"]

    style A fill:#37474f,color:#fff,stroke:none
    style H fill:#1565c0,color:#fff,stroke:none
    style I fill:#2e7d32,color:#fff,stroke:none
    style J fill:#37474f,color:#fff,stroke:none
    style G fill:#e65100,color:#fff,stroke:none
```

---

### Change Request

```markdown
## Architecture Change Request

**Request ID:** ACR-NNN
**Submitted by:** {Name / Squad}
**Date:** {YYYY-MM-DD}
**Priority:** Critical | High | Medium | Low

### Change Description
{What needs to change and why}

### Driver for Change
[ ] Business change (new product, acquisition, strategic pivot)
[ ] Technology change (EOL, new platform capability, security vulnerability)
[ ] Performance / reliability issue (SLO breach, capacity)
[ ] Regulatory / compliance change
[ ] Architecture simplification

### Impact Assessment
| Domain | Impact | Notes |
|---|---|---|
| Business Architecture | None / Low / Medium / High | |
| Data Architecture | None / Low / Medium / High | |
| Application Architecture | None / Low / Medium / High | |
| Technology Architecture | None / Low / Medium / High | |

### Recommended Action
[ ] Minor update — update architecture documents, no new ADM cycle
[ ] New ADM iteration — trigger Phase A for the affected scope
[ ] Re-use — apply existing building block; no change needed

### Architecture Board Decision
[ ] Approved: {date} — Action: {action}
[ ] Rejected: {date} — Reason: {reason}
```

---

### Architecture Board — Governance Model

| Aspect | Definition |
|---|---|
| **Members** | Chief Architect (Chair), Domain Architects, CTO representative, CISO representative |
| **Quorum** | 3 members including Chair |
| **Meeting cadence** | Monthly (standing); ad-hoc for urgent dispensations or ACRs |
| **Decision rights** | Architecture Principles (unanimous); Dispensations (majority); Change Requests (majority) |
| **Escalation** | Board deadlocks escalate to CTO/CIO |
| **Record keeping** | All decisions logged in Architecture Repository — Governance Log |

---

## Output Artifacts (Phase G–H Exit Criteria)

**Phase G:**
- [ ] Architecture Contract — issued per work package; signed
- [ ] Compliance Review reports — filed at each milestone
- [ ] Dispensation log — all approved deviations recorded
- [ ] Architecture Repository updated (all implementation-time decisions)
- [ ] Post-implementation review — complete

**Phase H (ongoing):**
- [ ] Change Request log — all ACRs recorded and decided
- [ ] Architecture Board meeting minutes — all decisions logged
- [ ] Architecture baseline — updated to reflect approved changes
- [ ] ADRs updated or superseded as required
- [ ] Trigger criteria evaluated quarterly — new ADM cycle initiated if warranted

---

## Common Mistakes

!!! failure "No Architecture Contracts"
    Without a contract, implementation squads are free to deviate from the architecture without accountability. Contracts provide the governance mechanism — not bureaucracy, but clarity.

!!! warning "Compliance reviews only at the end"
    End-of-project compliance reviews discover problems too late to fix cheaply. Schedule lightweight check-ins during implementation; reserve the full review for pre-production.

!!! failure "Architecture Board as a rubber stamp"
    An Architecture Board that approves everything without scrutiny provides no governance value. Define what the board will block, and what the escalation path is when it does.

!!! tip "Lightweight governance for agile teams"
    In an agile context, adapt Phase G: replace heavyweight compliance documents with the Architecture Compliance Checklist in the Definition of Done. Use ADRs for governance records instead of formal documents.

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part II, Chapter 12: Phase G
- TOGAF Standard 10th Edition — Part II, Chapter 13: Phase H
- TOGAF Architecture Governance: Part VI
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap12.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap12.html)
