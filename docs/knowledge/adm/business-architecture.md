# Phase B — Business Architecture

**TOGAF Reference:** Part II, Chapter 7 — Phase B  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why Phase B matters to you:** As a lead developer you already think in systems and services. Phase B adds one critical layer: *before any system exists there is a business capability that justifies it.* Every microservice, API, and data model you have ever built exists to serve a business capability. Phase B makes that relationship explicit, stable, and auditable. Once you can read a capability map you will never again design a system without knowing why it exists.

---

## Bloom Layer A — Quick Recall

**At a glance:** Phase B answers *what the business does, who does it, and how value flows* — independent of systems, technology, or organisational structures.

| | |
|---|---|
| **In** | Architecture Vision (Phase A), Statement of Architecture Work, business principles, goals, drivers, RFAW |
| **Out** | Capability map (baseline + target), value streams, gap analysis, ADD (Business), candidate roadmap components |
| **Exit when** | Target Business Architecture is reviewed and formally endorsed by stakeholders; gaps are classified as Add / Change / Retire / Retain |
| **Feeds into** | Phase C (Application Architecture & Data Architecture) |
| **TOGAF Chapter** | Part II, Chapter 7 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap07.html) |

---

## Bloom Layer B — Conceptual Understanding

### What Phase B produces and why it is ordered this way

Business Architecture rests on four views, ordered by stability:

``` mermaid
flowchart LR
    A["🏛️ Capability\n(What the business does)\nMost stable — changes with strategy"]
    B["🌊 Value Stream\n(How value reaches a stakeholder)\nChanges with experience design"]
    C["🔄 Business Process\n(Steps in a capability)\nChanges with operational improvement"]
    D["🏢 Organisation\n(Who is accountable)\nChanges with structure"]

    A --> B --> C --> D
    style A fill:#4F46E5,color:#fff,stroke:none
    style B fill:#7C3AED,color:#fff,stroke:none
    style C fill:#A855F7,color:#fff,stroke:none
    style D fill:#EC4899,color:#fff,stroke:none
```

> **Source:** Layering sequence based on TOGAF 10 Part II §7 and BIZBOK Guide (Business Architecture Guild, 2023) — capabilities are explicitly the most stable view; process models are lower-level representations of capability execution.

**Why this layering matters:** Start with capabilities (*what*), add value streams (*to whom and in what order*), then processes (*how*), then org (*who owns it*). Inverting this — modelling processes first — is the single most common reason Phase B output ages badly. Processes change every quarter; capabilities change every strategy cycle.

**Developer analogy:** A capability is like a bounded context in Domain-Driven Design. A value stream is a user journey across bounded contexts. A process is a sequence diagram within one context. An organisation map is your team topology (Conway's Law territory).

---

## Bloom Layer C — Guided Practice (Step-by-Step)

### TOGAF Phase B Step Sequence

The following sequence is defined in **TOGAF 10 Part II, Chapter 7, §7.3** (Steps 1–9). Every step is required; skipping steps creates traceability gaps that surface in Phase G governance.

``` mermaid
flowchart TD
    S1["Step 1: Select reference models,\nviewpoints and tools"] --> S2
    S2["Step 2: Develop Baseline Business\nArchitecture description (As-Is)"] --> S3
    S3["Step 3: Develop Target Business\nArchitecture description (To-Be)"] --> S4
    S4["Step 4: Perform gap analysis\n(Baseline vs Target)"] --> S5
    S5["Step 5: Define candidate\nArchitecture Roadmap components"] --> S6
    S6["Step 6: Resolve impacts across\nthe Architecture Landscape"] --> S7
    S7["Step 7: Conduct formal\nstakeholder review"] --> S8
    S8["Step 8: Finalise the\nBusiness Architecture"] --> S9
    S9["Step 9: Create Architecture\nDefinition Document (Business Chapter)"]

    style S1 fill:#37474f,color:#fff,stroke:none
    style S9 fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF Standard 10th Edition, Part II, Chapter 7, §7.3 Steps — [pubs.opengroup.org/architecture/togaf10-doc/arch/chap07.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap07.html)

#### Why the sequence matters (common deviation risks)

| If you skip … | The downstream risk is … |
|---|---|
| Step 1 (viewpoints) | Stakeholders get views that don't answer their concerns; rework in review |
| Step 2 (baseline) | No gap analysis is possible; Target is invented not derived |
| Step 6 (landscape impacts) | Phase B decisions conflict with previously agreed architecture |
| Step 7 (stakeholder review) | Phase C work builds on unapproved foundations |

---

### Inputs

| Input | Source | Developer translation |
|---|---|---|
| Architecture Vision & SoAW | Phase A | "The charter/scope for this design spike" |
| Existing business architecture docs | Architecture Repository | "Previous ADRs, domain model docs" |
| Business principles, goals, drivers | Phase A / Senior Management | "Product strategy & OKRs" |
| Architecture Principles | Preliminary Phase | "Engineering principles / coding standards at architecture level" |
| Enterprise Continuum | Architecture Repository | "Reuse catalogue — what patterns already exist" |
| RFAW (Request for Architecture Work) | Architecture Board | "The brief / problem statement that kicked off this work" |

---

### Technique 1 — Business Capability Map

**What it is:** A decomposition of *what* the business does, independent of process, people, or systems. The most reusable artefact in enterprise architecture.

**Developer analogy:** Think domain model / bounded context map. The difference is capabilities describe business functions, not software components.

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

> **Source:** Structure based on TOGAF 10 §7 and BIZBOK Guide capability mapping methodology (Business Architecture Guild). Levels 1–3 naming convention aligns with BIZBOK's capability decomposition standard.

**Capability levels:**

| Level | Scope | Owner | Use in Phase B |
|---|---|---|---|
| Level 1 | Major domain (e.g. Order Management) | C-level / VP | Heat-map for strategic importance |
| Level 2 | Capability (e.g. Order Fulfilment) | Director / Head | Gap analysis, roadmap |
| Level 3 | Sub-capability (e.g. Pick & Pack) | Team lead | Only model what is in scope |

**Heat-mapping:** after building the map, colour each Level-2 capability by strategic importance × current maturity. The high-importance / low-maturity intersection is your Phase B focus.

---

### Technique 2 — Value Stream Mapping

**What it is:** An end-to-end sequence of value-adding steps that delivers an outcome to a stakeholder. Defined in TOGAF 10 §20.2 as a value stream element in the ArchiMate Motivation Aspect.

**Developer analogy:** A user journey / happy path across microservices, but described from the stakeholder's perspective, not the system's.

``` mermaid
flowchart LR
    A([🧑 Customer\nPlaces Order]) --> B[Order\nValidation]
    B --> C[Payment\nAuthorisation]
    C --> D[Inventory\nReservation]
    D --> E[Fulfilment\n& Dispatch]
    E --> F[Delivery\nTracking]
    F --> G([✅ Customer\nReceives Order])

    style A fill:#4F46E5,color:#fff,stroke:none
    style G fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** Value stream notation and stages based on TOGAF 10 Business Architecture content metamodel and BIZBOK Guide §3 (Value Streams). The "Order-to-Cash" pattern is a standard reference value stream in both frameworks.

**For each step, capture:**

| Attribute | Baseline | Target |
|---|---|---|
| Trigger | What starts this step? | Same or changed? |
| Duration | How long does it take? | Target SLA |
| Pain points | What breaks, delays, or frustrates? | Resolved by what capability change? |
| Capability | Which Level-2 capability executes this? | Same or different? |

---

### Technique 3 — Organisation Map

**What it is:** A simplified view of *who is accountable* for the capabilities in scope. This is not the full org chart — only the parts that intersect the architecture work.

**Why it matters:** Every capability that lacks a clear accountable owner is a delivery risk in Phase G. Surface this in Phase B, not Phase F.

**Conway's Law connection:** the system boundaries you define in Phase C will be pressured to match this org map. If the org is misaligned with the target capability model, note it as a constraint.

``` mermaid
flowchart TD
    CEO["🏢 CEO"] --> CTO & CMO & CFO & COO
    CTO --> EA["Architecture\nPractice"]
    CTO --> ENG["Engineering\nDivision"]
    ENG --> SQ1["Orders Squad\n(Order Mgmt)"] & SQ2["Fulfilment Squad\n(Inventory Mgmt)"] & SQ3["Platform Squad\n(Identity, Analytics)"]
    COO --> OPS["Operations\n(Fulfilment ops)"] & CS["Customer Support\n(Customer Mgmt)"]

    style CEO fill:#37474f,color:#fff,stroke:none
```

> **Source:** Org modelling approach aligned with ArchiMate 3.2 Organisation viewpoint (The Open Group, 2019) and Conway's Law (Conway, 1968). Team-capability alignment shown here reflects Team Topologies stream-aligned team pattern (Skelton & Pais, 2019).

---

### Technique 4 — Business Process Model

**What it is:** A BPMN-level view of *how* a specific capability executes — the steps, actors, and handoffs. Only model processes that are directly affected by the architecture work.

**Developer analogy:** A sequence diagram across services — but written from the business actor perspective, not the API perspective.

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

> **Source:** BPMN 2.0 notation (OMG Standard, 2011) — [omg.org/spec/BPMN/2.0](https://www.omg.org/spec/BPMN/2.0/). Sequence diagram here approximates BPMN pool/lane behaviour using UML Sequence Diagram notation for readability.

---

### Technique 5 — Gap Analysis

**What it is:** A structured comparison of Baseline and Target, classifying every material difference as Add / Change / Retire / Retain. This is the primary input to the Architecture Roadmap.

> **Source:** Gap analysis categories (Add, Change, Retire, Retain) are defined in TOGAF 10 Part III, §31.2.3 Gap Analysis technique.

| Capability / Process | Baseline | Target | Gap Type | Action | Phase |
|---|---|---|---|---|---|
| Order Management | Monolith; 3-week deploy | Microservice; same-day deploy | Change | Extract service; define event contracts | C/D |
| Customer Analytics | Manual SQL; 1-day lag | Real-time; <5 min lag | Change | Build streaming pipeline | C (Data) |
| Payment Processing | Custom-built payment logic | PCI-compliant SaaS gateway | Change → Retire | Migrate; decommission legacy | E |
| Identity Management | Home-built session auth | OIDC/OAuth2 SSO | Change | Integrate standards-based IdP; retire auth code | C (App) |
| Returns Portal | Not in scope today | New self-serve returns capability | Add | New build | E |
| Legacy Pricing Engine | Rules engine; vendor end-of-life | Modern pricing microservice | Retire + Add | Replace; data migration | F |

**Gap categories:**

| Type | Meaning | Roadmap implication |
|---|---|---|
| `Add` | New capability required — does not exist today | New project / workstream |
| `Change` | Capability exists but must be improved | Refactor / uplift |
| `Retire` | Capability to be decommissioned | Decommission workstream |
| `Retain` | No change required in this cycle | No action needed |

---

## Architecture Definition Document — Business Chapter Structure

The ADD is the primary Phase B deliverable. The structure below maps to **TOGAF 10 §37.2 Architecture Definition Document** content:

```
1. Introduction
   1.1 Scope and Constraints (from SoAW and Phase A)
   1.2 Architecture Principles applied

2. Baseline Business Architecture (As-Is)
   2.1 Business Capability Map — current state with heat map
   2.2 Value Streams — current state
   2.3 Organisation Map — in-scope parts
   2.4 Key Business Processes — current state (BPMN-level)
   2.5 Business Interactions with External Parties

3. Target Business Architecture (To-Be)
   3.1 Business Capability Map — target state with strategic importance overlay
   3.2 Value Streams — target state with improvements annotated
   3.3 Key Business Processes — target state
   3.4 New/Changed Business Interactions

4. Gap Analysis
   4.1 Gap table (Baseline → Target → Type → Action)
   4.2 Impact assessment on stakeholders and existing architecture

5. Candidate Architecture Roadmap Components
   5.1 Work packages identified at business architecture level

6. Architecture Views
   6.1 Stakeholder-specific views (see Views & Viewpoints reference page)

7. Open Issues, Assumptions, and Constraints
```

---

## Output Artifacts — Phase B Exit Criteria

- [ ] Business Capability Map — baseline and target, with strategic heat map
- [ ] Value Stream Map — for key in-scope stakeholder journeys
- [ ] Organisation Map — relevant scope with capability ownership noted
- [ ] Business Process Models — for impacted processes (BPMN level)
- [ ] Gap Analysis — baseline vs target, classified (Add/Change/Retire/Retain)
- [ ] Architecture Definition Document (Business chapter) — drafted and reviewed
- [ ] Candidate Architecture Roadmap components — identified with phase assignment
- [ ] Updated Risk Register — owner-less capabilities and Conway conflicts logged
- [ ] Architecture Repository updated with new artefacts

---

## Bloom Layer D — Tools & Notations

> For each tool: purpose, pros, cons, cost, and link to the primary standard or resource.

### Modelling & Notation Standards

| Tool / Standard | Purpose in Phase B | Pros | Cons | Cost | Primary link |
|---|---|---|---|---|---|
| **BIZBOK Guide** | Capability mapping, value stream notation | Definitive BA standard; aligns with TOGAF | Not freely downloadable in full; dense | Free summary; paid full guide | [businessarchitectureguild.org](https://www.businessarchitectureguild.org/) |
| **BPMN 2.0** (OMG) | Business process modelling | Universal standard; tool-agnostic; widely understood | Steep learning curve for lane/pool syntax | Free (open standard) | [omg.org/spec/BPMN/2.0](https://www.omg.org/spec/BPMN/2.0/) |
| **ArchiMate 3.2** | End-to-end modelling (capability, value stream, org) | Integrated with TOGAF; rich metamodel | Complex; requires training | Free spec (Open Group member); tools vary | [pubs.opengroup.org/architecture/archimate3-doc](https://pubs.opengroup.org/architecture/archimate3-doc/) |
| **OMG BMM** | Business Motivation Model (goals → means) | Links strategy to architecture; rigorous | Rarely used outside large enterprise | Free (open standard) | [omg.org/spec/BMM](https://www.omg.org/spec/BMM/) |

### Diagramming & Drawing Tools

| Tool | Best for | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **Miro** | Collaborative capability mapping workshops | Real-time collaboration; templates for BCM; easy for non-architects | Not standards-compliant; no ArchiMate export | Free tier; paid from ~$8/user/mo | [miro.com](https://miro.com) |
| **LeanIX** | Enterprise capability map management | Architecture repository built-in; roadmap integration | Enterprise pricing; complex setup | Enterprise ($$$$) | [leanix.net](https://www.leanix.net) |
| **Ardoq** | Business & application architecture with org integration | Strong capability-to-app-to-org traceability | Learning curve; cost | Enterprise | [ardoq.com](https://ardoq.com) |
| **draw.io / diagrams.net** | Lightweight BPMN, org charts, process flows | Free; offline; no vendor lock-in; Git-friendly | No repository; no auto-analysis | Free | [diagrams.net](https://www.diagrams.net) |
| **bpmn.io** | BPMN 2.0 process modelling | Standards-compliant BPMN 2.0; free; exports XML | BPMN only; no capability mapping | Free | [bpmn.io](https://bpmn.io) |
| **Sparx Enterprise Architect** | Full ArchiMate + BPMN + TOGAF ADM in one tool | Deep TOGAF/ArchiMate support; repository | Heavy; expensive; steep learning curve | ~$229/user/yr | [sparxsystems.com](https://sparxsystems.com) |
| **Mermaid (this site)** | Code-as-diagram — version-controlled diagrams in Markdown | Diff-friendly; lives with docs; free | Limited layout control; no BPMN pool/lane | Free (open source) | [mermaid.js.org](https://mermaid.js.org) |

---

## Bloom Layer E — Decision Frameworks

**Which view leads?** Pick the one that matches the dominant stakeholder concern, then layer in the others.

| Stakeholder concern | Lead with | Then layer in | Why |
|---|---|---|---|
| Strategic alignment / portfolio rationalisation | Capability map (heat-mapped) | Value streams to stress-test strategic importance ratings | Capability map is readable by CxO without architecture training |
| Customer experience / journey redesign | Value stream | Capabilities that underpin each step | Journey is the change driver; capabilities show what must change |
| Cost reduction / accountability / org redesign | Organisation map × capability ownership | Processes only where ownership is contested | Conway's Law — org and system structure will co-evolve |
| Operational efficiency / throughput | Business process (BPMN) | Capabilities to validate this isn't a local optimisation | Risk: optimising one process at the expense of the overall capability |
| Regulatory / compliance change | Gap analysis of impacted capabilities | Process models for audit trail | Auditors need traceability, not strategy diagrams |

---

## Bloom Layer E — Judgment & Trade-offs

| Architectural question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Capability map vs. process map as primary artefact** | Long-lived enterprise model; stable strategy | Process re-engineering is the explicit goal | Process-first maps rot quickly; capabilities built on them lose strategic meaning |
| **3 levels vs. 4 levels of capability decomposition** | Mid-size org; ~80–150 Level-2 capabilities | Small org (4 levels = overkill); very large org (4th level emerges naturally) | Over-decomposition → maintenance burden; under-decomposition → gaps in Phase C |
| **Model baseline, then target (sequential)** | Established business; modernisation programme | Net-new business model (no meaningful baseline) | Without baseline, gap analysis becomes a wish-list |
| **Top-down capability discovery** | Stable, well-documented strategy | Customer-experience programme (outside-in better) | Missing emergent capabilities that only appear when you trace journeys |
| **Capability-first vs. value-stream-first** | Long-lived reference model | Programme bounded by a single customer journey | Capability-first without a journey anchor may produce a technically complete but unstakeholdered model |
| **Full BPMN vs. swim-lane sketch** | Regulated process; handoff disputes likely | Exploratory / discovery phase | Investing in BPMN syntax before the process is agreed wastes time |
| **Scope creep into Phase C now** | Never justified in Phase B | — | Premature system design before business architecture is agreed; foundation shifts under Phase C work |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** You are the lead architect for a retail bank migrating from a monolithic core banking system to a microservices platform.

1. **Recall:** Name the four views of business architecture and their correct order of modelling.
2. **Comprehension:** Explain why modelling the Organisation Map *before* the Capability Map is a risk.
3. **Application:** Sketch a Level-1 capability map for a retail bank (5–7 domains). Heat-map two capabilities as "high importance / low maturity."
4. **Analysis:** For one of those heat-mapped capabilities, build a value stream with 5–7 steps. For each step, identify what breaks in the baseline.
5. **Evaluation:** Your CFO wants to outsource "Payment Processing" to a third-party SaaS. Using the gap analysis categories, classify this change. What risks does this introduce in Phase C?
6. **Synthesis:** Draft the Gap Analysis table for the migration (at least 6 rows, all four gap types represented). Which three gaps have the highest cross-architecture impact and why?

> A solution architect is not someone who knows the right answer — they are someone who can structure the question, surface the trade-offs, and earn the decision.

---

## Acceleration Using AI

LLMs are useful for reasoning scaffolding, not for generating deliverables.

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Capability map first-draft** | "Generate a Level-1/2 capability map for [business description in 5+ specifics]. Use noun-phrase naming (no verbs)." | Generic output; fabricated sub-capabilities; capabilities named as systems |
| **Gap-classification review** | "Here is my gap table [paste]. For each row, flag where the Gap Type does not logically follow from the Baseline→Target change." | Model may agree with your classification rather than challenge it |
| **Stakeholder lens swap** | "Re-read this target architecture description from the perspective of [CFO / COO / Product Owner]. What is missing or unclear?" | Hallucinated stakeholder concerns; may miss domain-specific regulatory constraints |
| **Naming hygiene** | "Scan this capability list. Flag any names that are: (a) verbs not nouns, (b) system names not business functions, (c) too granular for Level-2." | Misclassifications; may flag valid names |
| **Conway's Law check** | "Here is our org map and our target capability map. Where do capability boundaries and team boundaries misalign? What are the delivery risks?" | Model has no visibility into real team dynamics — treat output as prompts to verify |

!!! warning "Bias to watch"
    LLMs default to generic, consultancy-flavoured output. They will produce a plausible capability map for a business they know nothing about. Always anchor prompts with real business specifics before trusting any output. Never submit AI-generated architecture artefacts without expert review.

---

## Common Mistakes

!!! danger "Failure patterns to watch"
    - **Capability sprawl** — pushing past Level-3 by default; detail proliferates without improving decisions.
    - **Capability = process** — naming capabilities as verbs ("Process Returns" not "Returns Management"); the map becomes a process map and loses stability.
    - **Owner-less capabilities** — no accountable executive means no funding, no delivery. Treat *no owner* as a Phase B risk, not a Phase E one.
    - **Map without heat** — baseline + target without a maturity or strategic-importance overlay produces no roadmap signal.
    - **Org-chart fidelity** — modelling the full org chart instead of only the parts that intersect in-scope capabilities adds noise and slows reviews.
    - **Scope creep into Phase C** — designing systems (which APIs, which databases) during Phase B; the business architecture foundation is not yet approved.

!!! failure "Describing processes instead of capabilities"
    Processes change; capabilities are stable. Build the capability map first — it is the anchor for business architecture across multiple ADM cycles.

!!! warning "Ignoring the organisation dimension"
    Architecture that doesn't account for organisational ownership will fail during implementation. Conway's Law applies: systems mirror the communication structures of the teams that build them. Identify misalignments in Phase B, not Phase G.

!!! tip "BIZBOK for deep business architecture"
    The Business Architecture Guild's BIZBOK Guide is the de facto reference standard for business architecture practice. It provides notations and techniques that complement TOGAF's Phase B. [businessarchitectureguild.org](https://www.businessarchitectureguild.org/)

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 7 | Primary standard | Authoritative Phase B steps, inputs, outputs | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap07.html) |
| BIZBOK Guide (Business Architecture Guild) | Primary BA standard | Capability mapping, value streams, information maps | [businessarchitectureguild.org](https://www.businessarchitectureguild.org/) |
| OMG Business Motivation Model (BMM) | Standard | Links strategic motivation to architecture | [omg.org/spec/BMM](https://www.omg.org/spec/BMM/) |
| BPMN 2.0 (OMG) | Standard | Business process modelling notation | [omg.org/spec/BPMN/2.0](https://www.omg.org/spec/BPMN/2.0/) |
| ArchiMate 3.2 (The Open Group) | Standard | Integrated EA modelling including value streams | [pubs.opengroup.org/architecture/archimate3-doc](https://pubs.opengroup.org/architecture/archimate3-doc/) |
| Team Topologies (Skelton & Pais, 2019) | Book | Org-to-system alignment; stream-aligned teams | [teamtopologies.com](https://teamtopologies.com) |
| Conway's Law (Conway, 1968) | Foundational paper | Organisation structure → system structure | [melconway.com/Home/Conways_Law.html](http://www.melconway.com/Home/Conways_Law.html) |
| Implementing Domain-Driven Design (Vernon, 2013) | Book | Bounded context → capability analogy for developers | [vaughnvernon.com](https://vaughnvernon.com) |
