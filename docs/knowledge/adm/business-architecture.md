# Phase B — Business Architecture

**TOGAF Reference:** Part II, Chapter 7 — Phase B  
**Objective:** Develop the Baseline and Target Business Architecture describing the business strategy, governance, organisation, and key business processes. Perform gap analysis.

**At a glance:** Phase B answers *what the business does, who does it, and how value flows* — independent of systems. The output is a Baseline + Target description, a gap analysis, and candidate roadmap items that feed Phase C.

- **In:** Vision, principles, business goals, RFAW
- **Out:** Capability map, value streams, gap analysis, ADD (Business)
- **Exit when:** Target Business Architecture is endorsed by stakeholders and gaps are classified

---

## Objectives

1. Develop the Target Business Architecture that supports the Architecture Vision agreed in Phase A.
2. Identify candidate Architecture Roadmap components based on gaps between Baseline and Target.
3. Select reference models, viewpoints, and tools appropriate for the business architecture work.
4. Ensure alignment with the Architecture Vision and consistency with business strategy.

---

## Process Flow

``` mermaid
flowchart TD
    A["Select Reference Models,\nViewpoints & Tools"] --> B
    B["Develop Baseline\nBusiness Architecture\nDescription (As-Is)"] --> C
    C["Develop Target\nBusiness Architecture\nDescription (To-Be)"] --> D
    D["Perform Gap Analysis\nBaseline vs Target"] --> E
    E["Define Candidate\nRoadmap Components"] --> F
    F["Resolve Impacts\nAcross Architecture Landscape"] --> G
    G["Conduct Formal\nStakeholder Review"] --> H
    H["Finalise Business\nArchitecture"] --> I
    I["Create Architecture\nDefinition Document"] --> J
    J["Phase B Complete ✓\nEnter Phase C"]

    style A fill:#37474f,color:#fff,stroke:none
    style J fill:#2e7d32,color:#fff,stroke:none
```

---

## Inputs

| Input | Source |
|---|---|
| Architecture Vision & SoAW | Phase A |
| Existing business architecture documentation | Architecture Repository |
| Business principles, goals, drivers | Phase A / Senior Management |
| Architecture Principles | Preliminary Phase |
| Enterprise Continuum | Architecture Repository |
| Request for Architecture Work | Architecture Board |

---

## Core Techniques

**Why this layering matters:** capability → value stream → process → organisation is the conventional order, and it isn't arbitrary. Capabilities are the most stable view (*what*), value streams describe how value reaches a stakeholder, processes detail the steps, and organisation maps ownership. Inverting this order — modelling processes first — is the single most common reason Phase B output ages badly.

### 1. Business Capability Map

A business capability map provides a structured view of what the business does, independent of how (process), who (organisation), or what systems support it. It is the most stable view in business architecture.

``` mermaid
mindmap
  root((E-Commerce\nPlatform))
    Customer Management
      Customer Onboarding
      Identity & Access
      Customer Support
      Loyalty Management
    Product Management
      Catalogue Management
      Pricing & Promotions
      Content Management
    Order Management
      Order Capture
      Order Fulfilment
      Returns & Refunds
    Inventory Management
      Stock Replenishment
      Warehouse Management
      Supplier Management
    Payment & Finance
      Payment Processing
      Fraud Detection
      Financial Reporting
    Analytics & Intelligence
      Customer Analytics
      Operational Reporting
      Data Platform
```

**Capability levels:**
- **Level 1** — Major capability domain (e.g., Order Management)
- **Level 2** — Capability (e.g., Order Fulfilment)
- **Level 3** — Sub-capability (e.g., Pick & Pack, Last-mile Delivery)

Heat-map your capability map in Phase A. Expand detail only for capabilities in the scope of this architecture work.

---

### 2. Value Stream Mapping

A value stream describes the end-to-end sequence of activities that deliver value to a stakeholder.

``` mermaid
flowchart LR
    A([Customer\nPlaces Order]) --> B[Order\nValidation]
    B --> C[Payment\nAuthorisation]
    C --> D[Inventory\nReservation]
    D --> E[Fulfilment\n& Dispatch]
    E --> F[Delivery\nTracking]
    F --> G([Customer\nReceives Order])

    B -.->|Trigger| C
    C -.->|Trigger| D
    D -.->|Trigger| E

    style A fill:#4051b5,color:#fff,stroke:none
    style G fill:#2e7d32,color:#fff,stroke:none
```

For each step, document:
- **Time** (elapsed / wait time)
- **Pain points** in the baseline
- **Improvement** in the target

---

### 3. Organisation Map

``` mermaid
flowchart TD
    CEO["CEO"] --> CTO & CMO & CFO & COO
    CTO --> EA["Architecture\nPractice"]
    CTO --> ENG["Engineering\nDivision"]
    ENG --> SQ1["Orders Squad"] & SQ2["Fulfilment Squad"] & SQ3["Platform Squad"]
    COO --> OPS["Operations"] & CS["Customer Support"]

    style CEO fill:#37474f,color:#fff,stroke:none
```

---

### 4. Business Process Model

Model key processes at Level 2 (BPMN-style flow). Not every process — only those affected by the architecture.

``` mermaid
sequenceDiagram
    actor Customer
    participant OMS as Order Service
    participant Pay as Payment Service
    participant Inv as Inventory Service
    participant Notify as Notification Service

    Customer->>OMS: Place Order
    OMS->>Pay: Authorise Payment
    Pay-->>OMS: Payment Authorised
    OMS->>Inv: Reserve Stock
    Inv-->>OMS: Stock Reserved
    OMS->>Notify: Trigger Confirmation
    Notify-->>Customer: Order Confirmed (email/push)
    OMS-->>Customer: Order Reference
```

---

### 5. Gap Analysis — Baseline vs Target

The gap analysis identifies what must change to move from baseline to target architecture.

| Capability / Process | Baseline State | Target State | Gap | Action |
|---|---|---|---|---|
| Order Management | Monolith; 3-week deployment cycle | Independent microservice; same-day deploy | Extract service; define event contracts | Phase B → Roadmap |
| Customer Analytics | Manual SQL reports; 1-day lag | Real-time dashboard; < 5min lag | Build streaming pipeline; replace batch | New initiative |
| Payment Processing | Custom-built payment logic | PCI-compliant SaaS (Stripe) | Migrate and decommission legacy code | Phase E |
| Identity Management | Home-built session auth | Okta OIDC SSO | Integrate Okta; retire legacy auth | Phase C (Application) |

**Gap categories:**
- `Add` — new capability needed
- `Change` — existing capability needs to be improved or modified
- `Retire` — existing capability to be decommissioned
- `Retain` — keep as-is; no change needed

---

## Architecture Definition Document (Business) — Structure

```
1. Introduction
   - Scope, objectives, constraints from SoAW and Phase A

2. Architecture Principles applied

3. Baseline Business Architecture
   - Business Capability Map (current state)
   - Value Streams (current state)
   - Organisation Map (relevant parts)
   - Key Business Processes (relevant, current state)

4. Target Business Architecture
   - Business Capability Map (target state, with heat map)
   - Value Streams (target state, with improvements annotated)
   - Key Business Processes (target state)
   - Business Interactions with External Parties

5. Gap Analysis
   - Gap table (Baseline → Target → Action)
   - Impact assessment

6. Candidate Architecture Roadmap Components
   - Work packages at business architecture level

7. Architecture Views
   - Stakeholder-specific views (reference Views & Viewpoints)

8. Open Issues & Constraints
```

---

## Output Artifacts (Phase B Exit Criteria)

- [ ] Business Capability Map — baseline and target, with heat map
- [ ] Value Stream Map — for key in-scope processes
- [ ] Organisation Map — relevant scope
- [ ] Business Process Models — for impacted processes
- [ ] Gap Analysis — baseline vs target, classified
- [ ] Architecture Definition Document (Business) — drafted
- [ ] Candidate Architecture Roadmap components — identified
- [ ] Updated Risk Register
- [ ] Architecture Repository updated

---

## Key Tools & Notations

| Technique | Standard / Tool |
|---|---|
| Business Capability Map | Custom; aligns with TOGAF, BIZBOK |
| Value Stream Mapping | Lean / TOGAF; ArchiMate value stream element |
| Business Process Modelling | BPMN 2.0 (OMG Standard); [bpmn.io](https://bpmn.io/) |
| Organisation modelling | ArchiMate; org chart tools |
| Business Motivation Model | TOGAF / OMG BMM specification |
| Business Architecture body of knowledge | [BIZBOK Guide](https://www.businessarchitectureguild.org/) (Business Architecture Guild) |

---

## Decision Frameworks

**Which view leads?** Different stakeholders read business architecture through different lenses. Pick the lead view that matches the dominant concern, then layer the others in for triangulation.

| If your stakeholder cares most about … | Lead with … | Then layer in … |
|---|---|---|
| Strategic alignment / portfolio rationalisation | Capability map (heat-mapped) | Value streams to test the heat |
| Customer experience / journey transformation | Value stream | Capabilities that enable each step |
| Cost / accountability / org change | Organisation map crossed with capabilities | Processes only where ownership is contested |
| Operational efficiency | Process model (BPMN) | Capabilities to check this isn't a local optimisation |

---

## Judgment & Trade-offs

**Judgment & trade-offs:** when modelling business capabilities:

| Question | Lean towards … when | Lean away when |
|---|---|---|
| **Capability map vs. process map** | Stable strategy; long-life model | Process re-engineering is the main intent |
| **Three levels vs. four** | Mid-size enterprise; ~80–150 capabilities | Small; or so large that level-4 emerges naturally |
| **Map current vs. target** | Modernisation programme | Net-new business model |
| **Top-down vs. outside-in capability discovery** | Stable strategy known | Customer-experience programme; capabilities emerge from value streams |
| **Capability-first vs. value-stream-first** | Long-lived enterprise model | Programme bounded by a customer journey |

**Synthesis exercise:** sketch the level-1 capability map of an organisation you know. For each capability, name its current owner and one capability gap. Anywhere the owner is unclear is where future delivery will stall.

---

## Acceleration Using AI

LLMs help most where reasoning is checklist-shaped — use them as a *peer-review prompt*, not as content to ship.

- **Capability map first-draft** — generate a strawman Level-1/Level-2 from a business description; use only as a prompt to challenge thinking, never as a deliverable.
- **Gap-classification rationale** — paste your Add/Change/Retire/Retain table; ask the model to find rows where the *Action* column doesn't logically follow from the gap.
- **Stakeholder lens swap** — ask the model to re-read the target architecture from the perspective of a CFO, COO, and product owner; surfaces missing concerns.
- **Naming hygiene** — flag capabilities named as verbs (process leakage) or as systems (technology leakage).

!!! warning "Bias to watch"
    LLMs default to consultancy-flavoured generic capability maps. They will happily produce a plausible map for a business they know nothing about. Always anchor the prompt with at least 3–5 *real* business specifics before trusting any output.

---

## Common Mistakes

!!! danger "Failure patterns to watch"
    - **Capability sprawl** — pushing the map past Level-3 by default; detail proliferates without decisions improving.
    - **Capability = process** — naming capabilities as verbs ("Process Returns" instead of "Returns Management"); the map becomes a process map and loses stability.
    - **Owner-less capabilities** — capabilities with no accountable executive will not be funded and will not deliver. Treat *no owner* as a Phase B risk, not a Phase E one.
    - **Map without heat** — baseline + target with no maturity or strategic-importance overlay produces no roadmap signal.
    - **Org-chart fidelity** — modelling the full org chart instead of just the parts that intersect the in-scope capabilities adds noise.

!!! failure "Describing processes instead of capabilities"
    Processes change; capabilities are stable. Build the capability map first — it is the anchor for business architecture across multiple ADM cycles.

!!! warning "Ignoring the organisation dimension"
    Architecture that doesn't account for organisational ownership and accountability will fail during implementation. Conway's Law applies: systems mirror the communication structures of the teams that build them.

!!! tip "BIZBOK for deep business architecture"
    The Business Architecture Guild's BIZBOK Guide is the reference standard for business architecture. It provides notations and techniques that complement TOGAF's Phase B. Freely available summary at [businessarchitectureguild.org](https://www.businessarchitectureguild.org/).

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part II, Chapter 7: Phase B
- Business Motivation Model — OMG: [omg.org/spec/BMM](https://www.omg.org/spec/BMM/)
- BIZBOK Guide — Business Architecture Guild
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap07.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap07.html)
