# Phase H — Architecture Change Management

**TOGAF Reference:** Part II, Chapter 13, §13.3  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why Phase H matters to you:** As a developer you know how a public API ages: you ship v1, the world builds on it, then business requirements force a breaking change. You have two choices — break all consumers without notice, or manage a deprecation process: version the API, notify consumers, run v1 and v2 in parallel for a migration window, then retire v1 cleanly. Phase H is the deprecation management process for your architecture. When the business changes, when technology evolves, or when the current architecture can no longer carry the organisation forward, Phase H determines whether that change is absorbed cleanly through governed evolution — or whether it causes an uncontrolled drift that undermines the investments already made.

---

## Bloom Layer A — Quick Recall

**At a glance:** Phase H manages changes to the established architecture — ensuring that change requests are assessed, classified, and routed appropriately, either absorbed into the current architecture cycle or triggering a new ADM cycle.

| | |
|---|---|
| **Key output** | Updated Architecture Definition Document; updated Architecture Roadmap; change requests resolved or escalated; Architecture Board decisions |
| **TOGAF Chapter** | Part II, Chapter 13 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap13.html) |
| **Runs throughout** | The architecture lifecycle — continuously; not a one-time phase |
| **Triggered by** | Phase G variance log; business change events; technology change events; new compliance requirements |
| **Feeds into** | A new ADM cycle (Phase A) if the change is strategic — or Phase F/G update if tactical |
| **Developer analogy** | API deprecation management: versioning, migration window, controlled retirement — for the architecture itself |

---

## Bloom Layer B — Conceptual Understanding

### Phase H in the ADM lifecycle

``` mermaid
flowchart TD
    G["Phase G\nImplementation Governance\n(Variance triggers)"]
    H["Phase H\nArchitecture Change Management\n─────────────────────────────\nChange Requests assessed\nClassified: Simplification / Incremental / Re-architecting\nArchitecture Board decision\nADM re-entry point determined"]
    A["Phase A (new cycle)\n— strategic change"]
    FG["Phase F/G update\n— tactical change"]
    Prelim["Preliminary Phase\n— structural change"]

    G -->|"Dispensation patterns\nnew requirements"| H
    H -->|"Re-architecting / Strategic"| A
    H -->|"Incremental / Tactical"| FG
    H -->|"Structural / Governance change"| Prelim

    style G fill:#37474f,color:#fff,stroke:none
    style H fill:#4F46E5,color:#fff,stroke:none
    style A fill:#2e7d32,color:#fff,stroke:none
    style FG fill:#795548,color:#fff,stroke:none
    style Prelim fill:#1565c0,color:#fff,stroke:none
```

> **Source:** TOGAF 10 Part II §13.1 — "Phase H provides a means of monitoring whether the architecture is being correctly implemented." §13.3 defines the change management activities. The ADM re-entry points (A, F, Preliminary) are defined in TOGAF 10 §2.4 (ADM Guidelines and Techniques) and §13.3 Step 5.

**Phase H is not a phase in the linear sequence.** It is a permanent, continuously operating governance function. Its job is to determine what to do with change — absorb it, plan it, or trigger a new ADM cycle.

**Developer analogy extended:** Phase H is your RFC (Request for Comments) process for architectural decisions, combined with your semver deprecation policy. Small changes (patch) = absorb in Phase F/G update. Medium changes (minor) = Incremental CR, update ADD. Large changes (major, breaking) = new ADM cycle from Phase A.

---

## Bloom Layer C — Guided Practice (Step-by-Step)

### TOGAF Phase H Step Sequence

Defined in **TOGAF 10 Part II, Chapter 13, §13.3** — the key activities for Architecture Change Management.

``` mermaid
flowchart TD
    S1["Step 1: Establish value criterion\n(what triggers a change request?)"] --> S2
    S2["Step 2: Deploy monitoring tools\n(technology watch, business change sensing)"] --> S3
    S3["Step 3: Manage risks\n(identify change-driven risks before they materialise)"] --> S4
    S4["Step 4: Assess and manage\nchange requests to the architecture"] --> S5
    S5["Step 5: Implement change in\nthe enterprise architecture\n(update ADD, update Roadmap, re-enter ADM)"] --> S6
    S6["Step 6: Update the enterprise\narchitecture baseline"]

    style S1 fill:#37474f,color:#fff,stroke:none
    style S6 fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF Standard 10th Edition, Part II, Chapter 13, §13.3 — Phase H Change Management Activities. [pubs.opengroup.org/architecture/togaf10-doc/arch/chap13.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap13.html)

#### Risks when activities are skipped

| If you skip … | Downstream risk |
|---|---|
| Step 1 (value criterion) | No consistent definition of what constitutes a change request; all changes are treated the same |
| Step 2 (monitoring) | Architecture does not sense when the business or technology context changes; governance is reactive not proactive |
| Step 3 (risk management) | Changes are assessed individually; cumulative risk from multiple small changes is invisible |
| Step 4 (assess change requests) | Changes are implemented without architectural oversight; architecture drifts uncontrolled |
| Step 5 (implement change) | Architecture documentation is updated without a defined update process; ADD diverges from reality |
| Step 6 (update baseline) | Architecture baseline becomes stale; the next ADM cycle starts from wrong assumptions |

---

### Technique 1 — Change Classification Model

Not all change requests are equal. The 3-class model routes each change to the appropriate response.

| Class | Definition | ADM re-entry | Examples |
|---|---|---|---|
| **Class 1: Simplification** | Change reduces complexity, removes waste, or retires a component. Low risk, uncontroversial. | Phase F/G update — absorb into current cycle | Retire end-of-life component; remove duplicate integration; simplify API surface |
| **Class 2: Incremental** | Change modifies the architecture within its current direction and scope. Medium risk; bounded impact. | Phase D, E, or F — update relevant ADD chapter | Add a new service to an existing domain; introduce an approved technology not previously used; update an NFR target |
| **Class 3: Re-architecting** | Change requires a fundamentally new direction, major new capability, or addresses an organisation-wide strategic shift. High risk; broad impact. | Phase A (new ADM cycle) — new Architecture Vision required | Acquisition integration; regulatory-driven re-architecture; strategic platform shift (e.g., cloud-native move) |

> **Source:** TOGAF 10 Part II §13.3 Step 4 — change classification and ADM re-entry point determination. The Class 1/2/3 terminology is adapted from TOGAF guidance on change magnitude and architecture scope impact.

---

### Technique 2 — Change Request Template

---

**ARCHITECTURE CHANGE REQUEST**

**Reference:** CR-2026-027  
**Date:** 2026-05-22  
**Requestor:** Data Engineering Team  
**Programme:** Digital Platform Modernisation  
**Priority:** High  
**Status:** Under Review

---

**Change Description:**  
The current Analytics Platform architecture requires a nightly batch export from the ERP system and the Order Management Service to the Data Warehouse. The business intelligence team requires near-real-time analytics (< 1 hour latency) to support dynamic pricing decisions. The current batch architecture cannot meet this requirement.

**Trigger:**  
Business requirement change (dynamic pricing OKR approved by Executive Committee, 2026-05-15).

**Impacted Architecture Areas:**

| Architecture Domain | Component | Impact |
|---|---|---|
| Application | Analytics Platform | Replace batch ingestion with event streaming |
| Application | Order Management Service | Emit events to message broker (new integration) |
| Data | Data Architecture | Update data flow diagram; OMS data domain adds streaming output |
| Technology | Message Broker | Introduce Apache Kafka or AWS MSK (not currently in approved stack) |
| Technology | Streaming processing | Introduce Apache Flink or AWS Kinesis (not currently in approved stack) |

**Change Class:** Class 2 — Incremental (modifies architecture within current direction; does not require new Phase A)

**ADM re-entry:** Phase D (update Technology Architecture chapter to include message broker and stream processing) → Phase F (update Migration Plan, add new work package) → Phase G (compliance review before go-live)

**Architecture risks:**

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Introducing Kafka/MSK creates operational complexity without platform readiness | Medium | High | Require SRE capability assessment before Phase D technology decision |
| OMS event emission adds latency to existing synchronous flows | Low | Medium | Async emission via outbox pattern; no change to synchronous API path |
| Data consistency: near-real-time vs. batch consumers see different data temporarily | High | Medium | Documented tolerance: BI team accepts eventual consistency; financial reporting remains batch |

**Recommendation to Architecture Board:**  
Approve as Class 2 Incremental. Proceed to Phase D update for message broker technology selection. Add streaming platform to Technology Standards Catalogue evaluation (Phase D → Standards update). New work package for Analytics Modernisation acceleration to be added to Phase F Migration Plan.

**Architecture Board decision:**  
☐ Approved (Class 2 — Phase D re-entry)  ☐ Escalated to Class 3  ☐ Rejected  ☐ Deferred

**Signed:** _____________________ (Chief Architect)  **Date:** ___________

---

### Technique 3 — Architecture Board Governance

The Architecture Board is the decision authority for Phase H change requests and Phase G dispensations.

``` mermaid
flowchart TD
    CR["Change Request raised\n(by delivery team, CTO, or Phase G variance)"]
    Arch["Chief Architect\nInitial triage (Class 1/2/3)"]
    Class1["Class 1: Simplification\n→ Chief Architect approves\n→ Phase F/G update"]
    Class2["Class 2: Incremental\n→ Architecture Board review\n→ Phase D/E/F re-entry"]
    Class3["Class 3: Re-architecting\n→ Architecture Board formal session\n→ Phase A (new ADM cycle)"]

    CR --> Arch
    Arch --> Class1
    Arch --> Class2
    Arch --> Class3

    style Class1 fill:#2e7d32,color:#fff,stroke:none
    style Class2 fill:#4F46E5,color:#fff,stroke:none
    style Class3 fill:#c0392b,color:#fff,stroke:none
```

> **Source:** Architecture Board structure and authority levels from TOGAF 10 Part VI §44.3 — Architecture Governance Board. Quorum and decision rules are organisation-defined; the Class 1/2/3 escalation pattern reflects §13.3 Step 4 guidance.

**Architecture Board composition (typical):**

| Role | Responsibility in Phase H |
|---|---|
| Chief Architect (Chair) | Triage; Class 1 approve/reject; Board facilitation |
| Domain Architects (Business, Application, Data, Technology) | Impact assessment for their domain; ADR drafting |
| CTO or VP Engineering | Strategic authority; Class 3 sponsor |
| Security Architect | Security impact assessment for all CRs |
| Programme Manager | Delivery impact assessment; Phase F Plan update |
| Finance Business Partner | Cost impact assessment for Class 2/3 |

**Quorum rules:**
- Class 1: Chief Architect only
- Class 2: Chief Architect + 2 Domain Architects (impacted domains must be represented)
- Class 3: Full Board + CTO sign-off

---

### Technique 4 — Triggers for a New ADM Cycle (Class 3)

The following conditions indicate that a new ADM cycle (Phase A) is required rather than a Phase H change request update:

| Trigger | Example | Why a new cycle is needed |
|---|---|---|
| **Strategic pivot** | Organisation shifts from B2C to B2B2C | Entire business architecture changes; Phase B must be redone |
| **Major acquisition or merger** | Acquire a competitor with 200 applications | Phase C/D scope doubles; integration architecture is entirely new |
| **Regulatory-driven re-architecture** | DORA (Digital Operational Resilience Act); Basel IV capital requirements | Regulatory architecture mandates cannot be absorbed incrementally |
| **Platform generation change** | Move from on-premises to cloud-native | Technology Architecture (Phase D) is fully replaced; phased through Phase A |
| **Architecture has drifted beyond repair** | Variance log shows 50+ unresolved dispensations across all domains | The baseline no longer reflects reality; a new cycle resets the baseline |
| **Business model change** | Subscription model replacing transaction model | Revenue recognition, product, customer journey all change in Phase B |

---

### Technique 5 — Phase H Mini-ADM Reference

When a Class 2 or Class 3 change is approved, Phase H determines the re-entry point into the ADM. Not all phases need to be repeated.

| Change type | Likely re-entry point | Phases to re-run |
|---|---|---|
| New technology in the approved stack | Phase D | D → E → F → G |
| New business capability added | Phase B | B → C → D → E → F → G |
| New regulatory requirement (data) | Phase C (Data) | C(Data) → D → E → F → G |
| Acquisition integration | Phase A (new cycle) | Full ADM cycle A–H |
| Infrastructure platform change | Phase D | D → E → F → G |
| Architecture Contract revision only | Phase F | F → G |
| New architecture principle | Preliminary | Preliminary → review impact on A–H |

> **Source:** ADM re-entry points are defined in TOGAF 10 Part II §2.4 (Applying Iteration to the ADM) and §13.3 Step 5. The "mini-ADM" concept reflects §2.4 guidance that "each phase of the ADM can be entered from any direction, and can be exited to any direction."

---

## Bloom Layer D — Tools

### Change Management Tools

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **Jira (Issue tracker)** | Change request tracking, workflow management | Familiar to delivery teams; audit trail; customisable workflow | No architecture context; change requests are just tickets | Basic free; Premium ~$17/user/mo | [atlassian.com/software/jira](https://www.atlassian.com/software/jira) |
| **Confluence** | Architecture Decision Records, CR documentation, Board minutes | Version history; comment trails; accessible | No structured model; can drift to unstructured notes | Free (up to 10 users); from $5.75/user/mo | [atlassian.com/software/confluence](https://www.atlassian.com/software/confluence) |
| **LeanIX** | Architecture roadmap management; change impact assessment across application landscape | Enterprise-grade; impact analysis tooling; stakeholder dashboards | Enterprise pricing; complex | Enterprise ($$$$) | [leanix.net](https://www.leanix.net) |
| **ADRS (Markdown ADR tooling)** | Lightweight Architecture Decision Records — change decisions as code | Git-native; versioned; developer-friendly; low overhead | No structured model; no impact analysis | Free (OSS — adr-tools, Log4brains) | [adr.github.io](https://adr.github.io) |
| **ServiceNow (ITSM)** | ITSM change management integration — links architecture CRs to ITSM change records | Enterprise integration; CMDB linkage; audit trail | ITSM change ≠ architecture change; conflation is common | Enterprise ($$$$) | [servicenow.com](https://www.servicenow.com) |

### Standards for Change Management

| Standard / Framework | Purpose in Phase H | Link |
|---|---|---|
| **ITIL 4** | Change enablement: planned change, normal change, emergency change types | [axelos.com/certifications/itil](https://www.axelos.com/certifications/itil) |
| **ISO/IEC 42010:2022** | Architecture description: how to manage changes to architecture descriptions | [iso.org/standard/74393](https://www.iso.org/standard/74393.html) |
| **TOGAF 10 Chapter 13** | Phase H authoritative reference | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap13.html) |

---

## Bloom Layer E — Decision Frameworks

| Change decision | Lean towards when | Lean away when | Risk if wrong |
|---|---|---|---|
| **Class 1 vs. Class 2** | Class 1: change removes something; reduces scope; no new capability | Class 2: change adds or modifies capability; technology change involved | Misclassify up: Board overhead for simple removal; misclassify down: significant change implemented without Board visibility |
| **Class 2 vs. Class 3** | Class 2: change is within current strategic direction; bounded scope | Class 3: change requires new Architecture Vision; scope spans all four domains; multi-year | Misclassify Class 3 as Class 2: architecture evolves without a coherent new vision; incremental updates accumulate into strategic drift |
| **Trigger new cycle vs. update ADD** | New cycle: strategic, > 1 domain, requires new Phase A vision | Update ADD: incremental, bounded, < 1 domain significantly changed | No new cycle when needed: architecture becomes incoherent; new cycle for every change: governance overhead paralyses delivery |
| **Emergency CR process vs. standard** | Emergency: safety, security, regulatory deadline < 48 hours | Standard: all other CRs — never shortcut standard process for convenience | Emergency overused: every change becomes an emergency; standard process misapplied to emergencies: regulatory breach or security incident unaddressed |
| **Architecture Board: monthly vs. ad-hoc** | Monthly: active programme with multiple CRs | Ad-hoc only: post-programme; very low change volume | Monthly in stable environment: overhead; ad-hoc in active programme: CRs queue; delivery teams wait |

---

## Bloom Layer E — Judgment & Trade-offs

| Question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Approve CR-2026-027 (streaming/Kafka)** | Business value clear; Class 2 scope bounded; technology risk manageable with SRE capability check | Reject only if SRE capability is genuinely absent and risk is unmitigatable | Approve without SRE capacity: Kafka operational complexity causes production incidents; reject: dynamic pricing OKR missed |
| **Class 3 for acquisition vs. Class 2 incremental integration** | Class 3: if acquired company's architecture is materially different and integration touches all 4 domains | Class 2: if acquisition is small, bounded, and can be absorbed as a new application in the existing portfolio | Class 2 for large acquisition: no new vision; integration architecture emerges without direction; technical debt accumulates |
| **Emergency change: bypass Board vs. retrospective approval** | Bypass: genuine security incident, production outage, regulatory breach — document everything; Board retrospective within 24 hours | Standard: everything else — "business urgency" is not an emergency | Bypass without retrospective: emergency becomes precedent; standard for production incident: breach unmitigated for hours |
| **ADR: create for every CR vs. only for significant decisions** | Every CR that changes a Phase C/D/E artefact should produce or update an ADR | Do not create ADRs for Class 1 simplifications — the decision is obvious | ADR for everything: noise; no ADR for significant decisions: future architects cannot understand why the architecture is the way it is |
| **Retire architecture vs. maintain legacy** | Retire: Phase F roadmap item exists; migration path funded; business risk of maintaining is growing | Maintain: migration path unfunded; business risk of change > risk of maintaining | Retire without funded migration: capability gap; maintain beyond viable: ever-increasing maintenance cost and security risk |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** A major UK retailer has completed 18 months of a 24-month architecture programme. The programme is governed by an Architecture Contract (AC-2026-001). Three significant change events have occurred in the past 6 weeks:
1. **Acquisition:** The retailer has acquired a fashion e-commerce competitor with 15 microservices, 3 databases, and 200k monthly active users.
2. **Regulatory:** The FCA has issued guidance that the retailer's new buy-now-pay-later (BNPL) product requires a consumer credit authorisation architecture that is not in the current ADD.
3. **Technology:** The retailer's cloud provider (AWS) has announced end-of-life for the message broker (Amazon MQ) they use; the recommended replacement is Amazon MSK (Kafka).

1. **Recall:** Classify each of the three events (Class 1 / Class 2 / Class 3) and state which ADM phase you would re-enter for each. Justify your classification.
2. **Comprehension:** Explain why two of the three events may require different Architecture Board quorum levels — and what happens if the wrong quorum is applied.
3. **Application:** Write a Change Request for the Amazon MQ end-of-life (Event 3). Use the CR template. Include: change description, trigger, impacted architecture areas, change class, ADM re-entry, risks (at least 3), and Board recommendation.
4. **Analysis:** The acquisition (Event 1) and the BNPL regulation (Event 2) both require significant architecture work. The PMO wants to handle both as Class 2 incremental updates to the existing Architecture Contract. Analyse the risk of that approach — and define what evidence would change your recommendation from Class 3 to Class 2.
5. **Evaluation:** The CTO proposes running all three changes in parallel (three concurrent Phase D updates). Evaluate the risks of concurrent partial ADM cycles and recommend whether they should be run in parallel, sequenced, or merged into a new Class 3 cycle.
6. **Synthesis:** Design a "Phase H Response Plan" for this scenario. Include: classification table for all three events, Board action plan with quorum requirements, provisional ADM re-entry points, dependencies between the three changes, and criteria for deciding whether to merge them into a new full ADM cycle.

> Architecture change management is not about resisting change. It is about ensuring that every change is understood, classified, governed, and absorbed at the right level — so that the architecture remains a coherent whole rather than a patchwork of uncoordinated decisions.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Change classification** | "Given this change event [describe], classify it as Class 1 (Simplification), Class 2 (Incremental), or Class 3 (Re-architecting) per TOGAF Phase H criteria. Justify the classification and recommend the ADM re-entry point." | May over-simplify strategic changes; always apply your own judgment on Class 3 triggers |
| **Change Request draft** | "Draft an Architecture Change Request for: [describe change]. Include: change description, trigger, impacted architecture areas (4 domains), change class, ADM re-entry, at least 3 architecture risks with likelihood/impact/mitigation, and Board recommendation." | Generic risks that don't reflect your specific architecture; use as a starting template |
| **ADM re-entry mapping** | "Given this approved Phase H change request [describe], which ADM phases need to be re-run? List each phase, what must be updated, and what the key outputs are." | May recommend re-running all phases for small changes; challenge against the change class |
| **New ADM cycle trigger assessment** | "Analyse whether the following changes [list] individually or collectively warrant triggering a new ADM cycle (Phase A) or can be absorbed as Phase H incremental updates. Apply the TOGAF Class 1/2/3 model." | May be inconsistent; the key criterion is whether a new Architecture Vision is needed |
| **Architecture Board agenda** | "Generate an Architecture Board agenda for a Phase H session with these change requests: [list]. For each, include: classification, quorum requirement, decision required, and architectural risks to discuss." | Generic agenda items; tailor to your specific CRs and organisational context |

!!! warning "Bias to watch"
    LLMs will classify almost any change as Class 2 (Incremental) — the classification that requires least governance overhead — because they optimise for plausibility without understanding your organisation's strategic context. Class 3 (Re-architecting) decisions require human judgment about strategic significance that an LLM cannot possess. Always apply the Class 3 trigger criteria independently.

---

## Common Mistakes

!!! danger "Treating Phase H as optional at programme close"
    Some programmes close Phase G, declare success, and never formally hand over to Phase H. Without an active Phase H function, architecture changes accumulate as informal decisions, the ADD diverges from reality, and the next programme starts from a false baseline.

!!! failure "Classifying everything as Class 2"
    If every change request is Class 2 (Incremental), the Class 3 threshold effectively doesn't exist. Strategic changes absorbed as incremental updates accumulate into strategic drift — where no individual decision looks unreasonable, but the cumulative effect is an architecture that no longer supports the business strategy.

!!! warning "Architecture Board without a defined quorum"
    A Board that meets without quorum (required roles absent) cannot make enforceable decisions. Define quorum requirements in the Architecture Board charter — and if quorum cannot be met for a Class 3 change, escalate to CTO rather than proceeding without it.

!!! tip "Architecture Decision Records as Phase H outputs"
    Every approved Phase H change request should produce or update an Architecture Decision Record (ADR). ADRs make the history of change decisions traceable — which is critical when future architects ask "why is it this way?" Phase H without ADRs produces a clean Architecture Contract update and an invisible decision history.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 13 | Primary standard | Authoritative Phase H activities, triggers, and ADM re-entry | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap13.html) |
| TOGAF 10 Part VI Chapter 44 | Standard | Architecture Governance: Board, authority levels, change management | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap44.html) |
| ITIL 4 (Axelos) | Framework | Change enablement: planned, normal, and emergency change types | [axelos.com/certifications/itil](https://www.axelos.com/certifications/itil) |
| Architecture Decision Records (Nygard) | Blog/Method | How to record architecture decisions; template for ADR | [cognitect.com/blog/2011/11/15/documenting-architecture-decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) |
| Building Evolutionary Architectures (Ford, Parsons, Kua — 2017) | Book | Architecture fitness functions; how to detect when architecture is drifting | [oreilly.com](https://www.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/) |
| ISO/IEC 42010:2022 | Standard | Architecture description — how to manage changes to architecture descriptions | [iso.org/standard/74393](https://www.iso.org/standard/74393.html) |
| Team Topologies (Skelton & Pais — 2019) | Book | Team API and architecture evolution; Conway's Law in change management | [teamtopologies.com](https://teamtopologies.com) |
