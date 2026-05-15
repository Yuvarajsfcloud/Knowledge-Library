# Phase 1 — Discovery & Scoping

**Goal:** Establish a shared, documented understanding of *why* the architecture work is happening, *who* is affected, *what* constraints are non-negotiable, and *what* the current state looks like.

> *"The most dangerous assumption in architecture is an undiscovered constraint."*

---

## Process Flow

``` mermaid
flowchart TD
    A[Kick-off with Sponsor] --> B[Stakeholder Identification]
    B --> C[Interviews & Workshops]
    C --> D[Document Current State]
    D --> E[Identify Constraints & Risks]
    E --> F{Sufficient\nclarity?}
    F -- No --> C
    F -- Yes --> G[Discovery Brief / Scope Statement]
    G --> H[Phase 1 Complete ✓\nEnter Phase 2]

    style A fill:#4051b5,color:#fff,stroke:none
    style H fill:#2e7d32,color:#fff,stroke:none
    style F fill:#e65100,color:#fff,stroke:none
```

---

## Inputs

| Input | Source |
|---|---|
| Business initiative or problem statement | Sponsor / Product Owner |
| Existing architecture documentation (if any) | Architecture repository |
| Previous post-mortems or incident reports | Engineering teams |
| Organisational strategy / OKRs | Leadership |
| Compliance and regulatory requirements | Legal, Security, Risk |

---

## Key Activities

### 1. Stakeholder Identification & Mapping

Map every stakeholder by **interest** and **influence** using a power/interest grid.

``` mermaid
quadrantChart
    title Stakeholder Power / Interest Grid
    x-axis Low Interest --> High Interest
    y-axis Low Power --> High Power
    quadrant-1 Manage Closely
    quadrant-2 Keep Satisfied
    quadrant-3 Monitor
    quadrant-4 Keep Informed
    CTO: [0.85, 0.9]
    Product Owner: [0.8, 0.6]
    Security Team: [0.5, 0.75]
    Engineering Lead: [0.75, 0.5]
    End Users: [0.7, 0.2]
    Compliance Officer: [0.3, 0.7]
```

**Engagement strategy by quadrant:**

| Quadrant | Action |
|---|---|
| Manage Closely (high power, high interest) | Involve in all major decisions; review outputs |
| Keep Satisfied (high power, low interest) | Regular executive summary updates; escalate blockers |
| Keep Informed (low power, high interest) | Share outputs; create feedback channels |
| Monitor (low power, low interest) | Document; revisit if context changes |

---

### 2. Stakeholder Interview Template

Use this structure for every interview. Time-box to 45 minutes.

```
STAKEHOLDER INTERVIEW — {Name}, {Role}
Date: {YYYY-MM-DD}

1. What problem are we trying to solve from your perspective?
2. What does success look like in 6 months? In 2 years?
3. What constraints are absolutely non-negotiable? (budget, timeline, technology, compliance)
4. What would make this initiative fail?
5. What existing systems, teams, or processes must we integrate with or not disrupt?
6. Who else should I speak with?
```

---

### 3. Current-State Architecture

Capture the current state using the **C4 Model Level 1 (System Context)** and **Level 2 (Container)**.

!!! tip "C4 Model — Simon Brown"
    Use the [C4 Model](https://c4model.com/) notation for all architecture diagrams. Start at Level 1 (context) and zoom in only as far as the audience needs.

**Example System Context (C4 L1):**

``` mermaid
C4Context
    title System Context — Current State
    Person(user, "End User", "Uses the platform via browser or mobile")
    System(system, "Target System", "The system under investigation")
    System_Ext(ext1, "External Payment Provider", "Handles payment processing")
    System_Ext(ext2, "Identity Provider", "SSO / OAuth2")
    System_Ext(legacy, "Legacy ERP", "Source of record for product data")

    Rel(user, system, "Uses")
    Rel(system, ext1, "Calls", "HTTPS/REST")
    Rel(system, ext2, "Authenticates via", "OIDC")
    Rel(system, legacy, "Reads product data", "SFTP batch / nightly")
```

---

### 4. Constraint Inventory

Classify every constraint. Unclassified constraints become hidden assumptions.

| ID | Constraint | Type | Source | Negotiable? | Impact if violated |
|---|---|---|---|---|---|
| C-01 | Must be hosted in EU region | Regulatory | GDPR / Legal | No | Data residency breach |
| C-02 | Must integrate with existing Okta SSO | Technical | IT Policy | Low | Forces custom auth — high risk |
| C-03 | Go-live within 9 months | Business | Board commitment | Low | Budget/political |
| C-04 | Budget cap: £X | Financial | Finance | No | Programme stop |
| C-05 | No new SaaS vendors requiring data export | Security | CISO | No | Security exception required |

**Constraint types:** `Regulatory` · `Technical` · `Business` · `Financial` · `Security` · `Organisational`

---

### 5. Risk Register (Initial)

| ID | Risk | Likelihood | Impact | Rating | Mitigation |
|---|---|---|---|---|---|
| R-01 | Legacy system unavailable for integration | Medium | High | High | Spike integration in Phase 3 |
| R-02 | Key stakeholder unavailable for decisions | Medium | Medium | Medium | Nominate deputy decision-makers |
| R-03 | Compliance requirements unclear | High | High | Critical | Engage Legal in Phase 1 |
| R-04 | Scope creep from adjacent teams | High | Medium | High | Define scope boundary explicitly |

**Rating matrix:**

``` mermaid
quadrantChart
    title Risk Rating Matrix
    x-axis Low Likelihood --> High Likelihood
    y-axis Low Impact --> High Impact
    quadrant-1 Critical — Act Now
    quadrant-2 High — Mitigate
    quadrant-3 Low — Monitor
    quadrant-4 Medium — Watch
```

---

## Output Artifacts (Phase 1 Exit Criteria)

- [ ] Stakeholder map (power/interest grid) — documented and reviewed
- [ ] Interview notes for all Manage Closely stakeholders
- [ ] Current-state diagram (C4 L1 minimum)
- [ ] Constraint inventory — all constraints classified and confirmed
- [ ] Initial risk register
- [ ] Problem statement — agreed and signed off by sponsor
- [ ] Scope boundary — what is in and out of scope, explicitly stated
- [ ] Discovery Brief (1–2 page summary of the above)

---

## Tools

| Purpose | Tool Options |
|---|---|
| Diagramming | [draw.io](https://draw.io), [Mermaid](https://mermaid.js.org/), [Structurizr](https://structurizr.com/) (C4-native) |
| Stakeholder tracking | Spreadsheet, Miro board |
| Interview notes | Markdown in this repo |
| Risk register | Spreadsheet or Jira |
| Workshop facilitation | Miro, Mural, FigJam |

---

## Common Pitfalls

!!! failure "Skipping the constraint inventory"
    Constraints discovered in Phase 4 cost 10x more to accommodate than constraints discovered in Phase 1. Dedicate time to this.

!!! warning "Conflating current state with future state"
    Document what exists today without judgment. Future-state discussion belongs in Phase 2.

!!! warning "Interviewing only technical stakeholders"
    Architecture decisions with no business, security, or compliance input consistently create problems later. Interview across the stakeholder map.

---

## Reference Sources

- TOGAF ADM Phase A (Architecture Vision) — [opengroup.org/togaf](https://www.opengroup.org/togaf)
- IEEE 42010:2011 — Stakeholder concerns and architecture viewpoints
- *Fundamentals of Software Architecture* — Richards & Ford, Ch. 2–3
- C4 Model — [c4model.com](https://c4model.com/)
