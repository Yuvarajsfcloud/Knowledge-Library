# Phase A — Architecture Vision

**TOGAF Reference:** Part II, Chapter 6 — Phase A  
**Objective:** Develop a high-level, aspirational view of the target architecture. Obtain approval from stakeholders to proceed. Produce the Statement of Architecture Work that formally defines and scopes the architecture project.

---

## Objectives

1. Develop a high-level view of the target Business, Information Systems, and Technology Architecture that addresses the business goals and strategic drivers.
2. Obtain formal approval to proceed via the **Statement of Architecture Work (SoAW)**.
3. Ensure the architecture work is aligned with the enterprise's strategic direction.
4. Identify the stakeholders, their concerns, and architecture viewpoints needed to address them.

---

## Process Flow

``` mermaid
flowchart TD
    A["Step 1\nEstablish Architecture Project"] --> B
    B["Step 2\nIdentify Stakeholders,\nConcerns & Business Requirements"] --> C
    C["Step 3\nConfirm & Elaborate Business\nGoals, Drivers & Constraints"] --> D
    D["Step 4\nEvaluate Capabilities\nBaseline Assessment"] --> E
    E["Step 5\nAssess Readiness for\nBusiness Transformation"] --> F
    F["Step 6\nDefine Scope"] --> G
    G["Step 7\nConfirm Architecture Principles\nincluding Business Principles"] --> H
    H["Step 8\nDevelop Architecture Vision"] --> I
    I["Step 9\nDefine Target Architecture\nValue Propositions & KPIs"] --> J
    J["Step 10\nIdentify Transformation Risks\n& Mitigation Activities"] --> K
    K["Step 11\nDevelop Statement of\nArchitecture Work — Get Approval"] --> L

    L["Phase A Complete ✓\nEnter Phase B"]

    style A fill:#37474f,color:#fff,stroke:none
    style L fill:#2e7d32,color:#fff,stroke:none
```

---

## Inputs

| Input | Source |
|---|---|
| Architecture Reference Materials | Preliminary Phase / Architecture Repository |
| Request for Architecture Work | Architecture Board / Sponsor / Business |
| Business principles, goals, drivers | Senior management |
| Capability assessment | Internal / Preliminary Phase |
| Organisational Model for Enterprise Architecture | Preliminary Phase |
| Existing architecture documentation (if any) | Architecture Repository |

---

## Key Techniques

### Stakeholder Map & Concerns Matrix

Identify every stakeholder and their primary architecture concerns. Each concern maps to an architecture viewpoint.

| Stakeholder | Role | Primary Concerns | Viewpoints Needed |
|---|---|---|---|
| CEO / Board | Sponsor | Business outcomes, risk, investment | Business motivation, strategic roadmap |
| CTO / CIO | Authority | Technology direction, standards, debt | Technology landscape, integration |
| CISO | Authority | Security, compliance, data residency | Security, compliance |
| Product Owner | Consumer | Feature delivery speed, API stability | Application, API |
| Engineering Lead | Implementer | Technology choices, constraints, NFRs | Technology, deployment |
| Operations | Consumer | SLOs, runbooks, supportability | Operational, deployment |
| Legal / Compliance | Constraint | Regulatory adherence, data governance | Compliance, data |

---

### Business Motivation Model

Align the architecture with business strategy using TOGAF's Business Motivation Model concepts:

``` mermaid
flowchart LR
    subgraph Ends["Ends — What we want"]
        Vision["Vision\n(aspirational)"]
        Goal["Goals\n(long-term)"]
        Objective["Objectives\n(SMART, measurable)"]
    end
    subgraph Means["Means — How we get there"]
        Mission["Mission\n(what we do)"]
        Strategy["Strategies\n(course of action)"]
        Tactic["Tactics\n(specific actions)"]
    end
    subgraph Influencers["Influencers"]
        Driver["Business Drivers\n(internal)"]
        External["External Factors\n(regulation, market, tech)"]
    end

    Influencers --> Means
    Means --> Ends

    style Ends fill:#e3f2fd,stroke:#1565c0
    style Means fill:#e8f5e9,stroke:#2e7d32
    style Influencers fill:#fff3e0,stroke:#e65100
```

---

### Business Capability Assessment (Heat Map)

Score current business capabilities for strategic importance vs. current performance:

``` mermaid
quadrantChart
    title Business Capability Heat Map
    x-axis Low Performance --> High Performance
    y-axis Low Strategic Importance --> High Strategic Importance
    quadrant-1 Invest & Differentiate
    quadrant-2 Transform — Critical Gap
    quadrant-3 Consider Outsourcing
    quadrant-4 Maintain / Automate
    Order Management: [0.3, 0.9]
    Customer 360: [0.25, 0.85]
    Inventory Management: [0.6, 0.8]
    Payments Processing: [0.5, 0.7]
    HR Systems: [0.7, 0.2]
    Finance & Reporting: [0.65, 0.3]
    Data Analytics: [0.2, 0.75]
```

---

## Key Deliverables

### 1. Architecture Vision Document

**Structure:**

```
1. Problem description
   - Situation, opportunity, or problem being addressed
   - Business goals and objectives being supported

2. Objectives, goals, and strategic drivers
   - Specific objectives the architecture must achieve
   - How success will be measured

3. Stakeholder map (power/interest grid)

4. Constraints and assumptions
   - Non-negotiable constraints (regulatory, technical, financial, time)

5. Baseline description (high-level)
   - Current state summary — not a full architecture, just enough context

6. Target architecture (high-level)
   - Future state vision — system context diagram (C4 L1 or ArchiMate)
   - Key architecture decisions anticipated

7. Business scenarios (if applicable)
   - User journeys or business processes the architecture must support

8. Proposed architecture work scope
   - What will be produced in Phases B–D

9. Time, resource, and cost estimate (high level)

10. Risks and dependencies
```

---

### 2. Statement of Architecture Work (SoAW)

The SoAW is the **formal contract** between the sponsor and the architecture team. It governs the entire architecture engagement.

```markdown
## Statement of Architecture Work

**Project:** {Name}
**Version:** 1.0
**Date:** {YYYY-MM-DD}
**Sponsor:** {Name, Role}
**Lead Architect:** {Name}
**Approved by:** {Architecture Board Chair}

### 1. Title and Scope of Architecture Work
{Describe what architecture work will be done and for which part of the enterprise}

### 2. Architecture Vision Summary
{One paragraph summary of the target architecture vision}

### 3. Overview of Business Architecture
{High-level statement of key business processes and capabilities affected}

### 4. Overview of Information Systems Architecture
{High-level statement of affected applications and data}

### 5. Overview of Technology Architecture
{High-level statement of technology environments affected}

### 6. Roles, Responsibilities & Deliverables
| Role | Person | Responsibilities |
|---|---|---|
| Architecture Sponsor | | Funding, decisions, escalations |
| Lead Architect | | Overall delivery, stakeholder engagement |
| Domain Architects | | Phases B/C/D delivery |

### 7. Acceptance Criteria & KPIs
{How we will know the architecture is successful}

### 8. Resource Requirements
{Team, budget, timeline}

### 9. Constraints & Assumptions
{Non-negotiable constraints; key assumptions}

### 10. Risks
| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|

### 11. Governance Requirements
{Review points, approval gates, escalation path}

### 12. Approval
| Role | Name | Signature | Date |
|---|---|---|---|
| Architecture Board Chair | | | |
| Business Sponsor | | | |
```

---

## Output Artifacts (Phase A Exit Criteria)

- [ ] Stakeholder map and concerns matrix — complete
- [ ] Business motivation model / goals aligned
- [ ] Capability assessment / heat map — complete
- [ ] Architecture Vision document — reviewed and agreed by sponsor
- [ ] Confirmed and refined Architecture Principles (from Preliminary)
- [ ] Statement of Architecture Work — signed off by Architecture Board and sponsor
- [ ] Architecture repository updated with Phase A outputs
- [ ] Risk register — initialised
- [ ] Communications plan — agreed

---

## Transformation Readiness Assessment

Before committing to Phase B, assess the organisation's readiness to absorb change:

| Readiness Factor | Assessment Questions | Score (1–5) |
|---|---|---|
| **Vision** | Is the change clearly articulated and understood? | |
| **Desire / Willingness** | Is there genuine desire to change? Who might resist? | |
| **Need** | Is the need to change urgent and widely recognised? | |
| **Business Case** | Is there a compelling business case? | |
| **Funding** | Is sufficient funding committed? | |
| **Sponsorship** | Is there committed executive sponsorship? | |
| **Capacity** | Does the organisation have capacity to change alongside BAU? | |
| **Capability** | Does the organisation have the skills to deliver? | |
| **IT Capacity** | Can IT deliver while maintaining existing operations? | |

**Scoring:** 1 = Not ready · 3 = Partially ready · 5 = Fully ready

Overall readiness < 3 in any factor = risk that must be mitigated before proceeding.

---

## Common Mistakes

!!! failure "Architecture Vision with no measurable success criteria"
    A vision that cannot be measured cannot be validated. Define KPIs in the SoAW that can be objectively assessed at the end of Phase G.

!!! warning "SoAW not formally signed off"
    Without a signed SoAW, scope creep is inevitable and the architect has no protection when stakeholders change direction. Always get formal approval.

!!! warning "Skipping the capability heat map"
    Treating all business capabilities as equally important leads to over-engineering low-value areas. The heat map focuses architectural investment where it matters.

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part II, Chapter 6: Phase A
- Business Motivation Model: TOGAF Part III, Chapter 21
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap06.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap06.html)
