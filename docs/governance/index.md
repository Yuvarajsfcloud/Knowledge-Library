[:material-home: KB Home](../index.html){ .md-button .md-button--primary } &nbsp; [ADRs](../adr.html){ .md-button } &nbsp; [Templates](../templates.html){ .md-button }

# Architecture Governance

**TOGAF Reference:** Part VI — Architecture Governance  
**Purpose:** The framework for managing, monitoring, and controlling architecture across the enterprise — ensuring architectures are implemented as intended and remain fit for purpose.

---

## Governance Model Overview

``` mermaid
flowchart TD
    subgraph Corp["Corporate Governance"]
        BOD["Board of Directors\n& Executive"]
    end
    subgraph IT["IT Governance (COBIT)"]
        CIO["CIO / IT Steering\nCommittee"]
    end
    subgraph EA["Architecture Governance"]
        CAB["Architecture Board"]
        CA["Chief Architect /\nEA Lead"]
        DA["Domain Architects\n(Business, Data, App, Tech)"]
    end
    subgraph PD["Project / Delivery Governance"]
        PM["Programme Manager"]
        TL["Tech Leads / Squads"]
    end

    Corp --> IT --> EA --> PD

    style Corp fill:#37474f,color:#fff,stroke:none
    style IT fill:#4051b5,color:#fff,stroke:none
    style EA fill:#2e7d32,color:#fff,stroke:none
    style PD fill:#6a1b9a,color:#fff,stroke:none
```

---

## Architecture Board

### Charter

The Architecture Board is the governance body responsible for maintaining and administering architecture principles, standards, and frameworks.

| Aspect | Definition |
|---|---|
| **Authority** | Mandating — can block non-compliant architectures from production |
| **Chair** | Chief Architect (or delegate) |
| **Members** | Chief Architect, Domain Architects (Business, Data, App, Technology), CISO representative, CTO delegate |
| **Quorum** | 3 members including Chair |
| **Meeting cadence** | Monthly (standing); ad-hoc for urgent matters |
| **Decisions by** | Consensus; escalation to CTO if deadlocked |

### Responsibilities

| Responsibility | Description |
|---|---|
| **Principles governance** | Approve, update, and communicate architecture principles |
| **Standards governance** | Approve technology standards; manage the Standards Information Base |
| **ADR review** | Review and formally accept high-impact ADRs |
| **Compliance oversight** | Review compliance reports; issue remediation directives |
| **Dispensation decisions** | Approve or reject requests to deviate from standards |
| **Change management** | Decide on Architecture Change Requests |
| **Architecture Programme** | Oversee architecture work; approve Statements of Architecture Work |

### RACI Matrix — Architecture Governance

| Decision | Architecture Board | Chief Architect | Domain Architect | Squad Tech Lead |
|---|---|---|---|---|
| Architecture Principles (new / change) | **A** | **R** | C | I |
| Technology Standard (new / change) | **A** | C | **R** | C |
| ADR (significant) | **A** | **R** | R | C |
| Architecture Contract | **A** | **R** | R | I |
| Dispensation | **A** | R | C | **R** (initiates) |
| Architecture Change Request | **A** | R | C | I |
| Compliance Review result | **A** | **R** | R | I |
| Statement of Architecture Work | **A** | **R** | C | I |

**R** = Responsible · **A** = Accountable · **C** = Consulted · **I** = Informed

---

## Governance Processes

### 1. Architecture Contract Lifecycle

``` mermaid
flowchart LR
    A["Architecture\nBrief / ADD\ncomplete"] --> B["Draft\nContract"]
    B --> C["Review with\nSquad Lead"]
    C --> D["Board\nApproval"]
    D --> E["Contract\nSigned"]
    E --> F["Implementation\nBegins"]
    F --> G["Compliance\nReview\n(mid-point)"]
    G --> H{"Compliant?"}
    H -- Yes --> I["Compliance\nReview\n(pre-prod)"]
    I --> J["Contract\nClosed"]
    H -- No --> K["Remediation\nPlan"]
    K --> G

    style A fill:#37474f,color:#fff,stroke:none
    style J fill:#2e7d32,color:#fff,stroke:none
    style H fill:#e65100,color:#fff,stroke:none
```

---

### 2. Dispensation Lifecycle

``` mermaid
flowchart LR
    A["Squad identifies\nrequired deviation"] --> B["Submit\nDispensation\nRequest"]
    B --> C["Board reviews\nat next meeting\n(or urgent slot)"]
    C --> D{Decision}
    D -- Approved --> E["Log dispensation\nRecord in Governance Log\nSet review date"]
    D -- Rejected --> F["Squad must comply\nor escalate"]
    D -- Conditional --> G["Approve with\ntime limit &\nremediation plan"]

    E --> H{Temporary?}
    H -- Yes --> I["Review at\nexpiry date"]
    I --> D
    H -- No --> J["Update standard\nvia normal process"]

    style A fill:#37474f,color:#fff,stroke:none
    style E fill:#2e7d32,color:#fff,stroke:none
    style F fill:#c62828,color:#fff,stroke:none
    style D fill:#e65100,color:#fff,stroke:none
```

---

### 3. Architecture Review Cadence

| Review Type | Frequency | Scope | Participants |
|---|---|---|---|
| Architecture Office Hours | Weekly (30 min) | Open questions, unblock decisions | Architect + Tech Leads |
| Architecture Board | Monthly | Principles, standards, ACRs, dispensations | Board members |
| Compliance Review (mid-implementation) | Per work package milestone | Conformance to contract | Lead Architect + Squad Lead |
| Compliance Review (pre-production) | Per production release | Full compliance checklist | Lead Architect + Squad + CISO |
| Architecture Health Review | Quarterly | SLOs, DORA, tech debt, radar | Architecture team + Engineering leads |
| Annual Architecture Review | Annual | Principles review, standards refresh, landscape update | Board + CTO |

---

## Governance Log

Maintain a complete, immutable log of all governance decisions:

```
docs/governance/
├── board-minutes/
│   └── YYYY-MM-DD-board-meeting.md
├── contracts/
│   └── AC-NNN-{service-name}.md
├── compliance/
│   └── COMP-NNN-{service-name}-{date}.md
├── dispensations/
│   └── DISP-NNN-{description}.md
└── change-requests/
    └── ACR-NNN-{description}.md
```

**Board Minutes Template:**

```markdown
## Architecture Board Meeting — {YYYY-MM-DD}

**Chair:** {Name}
**Present:** {Names}
**Apologies:** {Names}
**Quorum:** Yes / No

### Agenda Items

#### 1. {Item}
**Decision:** {Approved / Rejected / Deferred}
**Rationale:** {Brief reason}
**Action:** {Who does what by when}

### Actions from Previous Meeting
| Action | Owner | Status |
|---|---|---|

### Next Meeting
{Date, time, location / link}
```

---

## Architecture Maturity Model

Assess and track the maturity of the architecture practice using a capability maturity model:

| Level | Name | Description | Indicators |
|---|---|---|---|
| **1** | Initial | Ad-hoc; no repeatable process | No principles, no governance, heroics |
| **2** | Managed | Some processes defined; inconsistently applied | Principles exist; not consistently applied |
| **3** | Defined | Consistent, documented, practised | Principles + standards + ADRs + contracts |
| **4** | Quantitatively Managed | Measured; fitness functions in use | DORA metrics + SLOs + fitness functions |
| **5** | Optimising | Continuously improving; evolutionary | Architectural fitness functions in CI; automatic feedback loops |

**Target:** Level 3 is the minimum for a well-run architecture practice. Level 4 is achievable with reasonable investment in tooling.

---

## Common Governance Anti-Patterns

!!! failure "Architecture police"
    Governance that is purely punitive — catching violations and blocking releases — destroys trust and creates adversarial dynamics. Governance should be enabling: help teams succeed within the architecture, not catch them failing.

!!! failure "Standards that no one knows about"
    A standards catalogue that is not actively communicated, embedded in tooling (CI gates, templates), and explained in onboarding is not a standard — it is an unfair gotcha.

!!! warning "Board without business representation"
    Architecture governance without a business voice produces technically correct but strategically misaligned architectures. The Architecture Board must include or have direct access to business leadership.

!!! tip "Automate governance where possible"
    The most effective governance is built into the CI/CD pipeline: coupling checks, CVE scans, fitness functions. Automated gates catch issues at the point of introduction — not 3 months later in a compliance review.

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part VI: Architecture Governance
- COBIT 2019 — IT governance framework: [isaca.org/cobit](https://www.isaca.org/resources/cobit)
- ISO/IEC 38500 — IT Governance Standard
- Free TOGAF: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap44.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap44.html)
