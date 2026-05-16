# Phase F — Migration Planning

**TOGAF Reference:** Part II, Chapter 11, §11.3  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why Phase F matters to you:** In sprint planning you take a backlog of user stories, size them, prioritise by value and risk, and commit to a sprint. Phase F Migration Planning is that same exercise scaled to a programme of work spanning 18–36 months, multiple teams, and potentially tens of millions of pounds of investment. The inputs come from Phase E (what to do), and the output is a costed, resourced, risk-sequenced Implementation and Migration Plan that the organisation can fund and staff. The Architecture Contract you produce here is the commitment both the architecture function and the delivery organisation make to each other.

---

## Bloom Layer A — Quick Recall

**At a glance:** Phase F converts Phase E's work packages and Architecture Roadmap into an Implementation and Migration Plan — a costed, prioritised, resource-aligned delivery commitment backed by an Architecture Contract.

| | |
|---|---|
| **Key output** | Implementation and Migration Plan; Architecture Contract; updated Architecture Roadmap |
| **TOGAF Chapter** | Part II, Chapter 11 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap11.html) |
| **Runs after** | Phase E (Opportunities & Solutions) — which produced the work packages and initial roadmap |
| **Feeds into** | Phase G (Implementation Governance) — which uses the Architecture Contract to govern delivery |
| **Developer analogy** | Programme-level sprint planning: converting the Phase E backlog into a costed, resourced, dated delivery commitment with explicit Architecture Contracts |

---

## Bloom Layer B — Conceptual Understanding

### Phase F in the ADM flow

``` mermaid
flowchart LR
    E["Phase E\nOpportunities & Solutions\n(Work Packages, Candidate Roadmap)"]
    F["Phase F\nMigration Planning\n─────────────────────────\nPrioritised Roadmap\nImplementation & Migration Plan\nArchitecture Contract"]
    G["Phase G\nImplementation Governance\n(Compliance reviews, Architecture Contract use)"]

    E --> F --> G

    style E fill:#37474f,color:#fff,stroke:none
    style F fill:#4F46E5,color:#fff,stroke:none
    style G fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF 10 Part II §11.1 — "The objective of Phase F is to finalise a ranked Implementation and Migration Plan in co-operation with the portfolio and project managers." §11.2 defines the Architecture Contract as the primary Phase F output. The ADM flow sequence (E → F → G) is defined in TOGAF 10 §2.3 (Phase sequence overview).

**Phase E vs. Phase F:**
- **Phase E** answers: *what* should we do, in what groups (work packages), and in what approximate order?
- **Phase F** answers: *when*, *how much*, *who*, *what are the dependencies*, and *what do we commit to?*

**Developer analogy extended:** Phase E was the product backlog refinement session — deciding what exists in the backlog and roughly grouping items. Phase F is sprint planning with the engineering manager — assigning story points, checking team capacity, identifying critical path, and committing to a timeline the business can fund.

---

## Bloom Layer C — Guided Practice (Step-by-Step)

### TOGAF Phase F Step Sequence

Defined in **TOGAF 10 Part II, Chapter 11, §11.3** — the 7-step sequence for Migration Planning.

``` mermaid
flowchart TD
    S1["Step 1: Confirm management framework\ninteractions for Migration Planning"] --> S2
    S2["Step 2: Assign business value\nto each work package"] --> S3
    S3["Step 3: Estimate resource requirements,\nproject timings, and availability / delivery vehicle"] --> S4
    S4["Step 4: Prioritise migration projects —\ncost/benefit assessment and risk validation"] --> S5
    S5["Step 5: Confirm Architecture Roadmap\nand update Architecture Definition Document"] --> S6
    S6["Step 6: Generate the Implementation\nand Migration Plan"] --> S7
    S7["Step 7: Complete the architecture\ndevelopment cycle; document lessons learned"]

    style S1 fill:#37474f,color:#fff,stroke:none
    style S7 fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF Standard 10th Edition, Part II, Chapter 11, §11.3 — Phase F Migration Planning Steps 1–7. [pubs.opengroup.org/architecture/togaf10-doc/arch/chap11.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap11.html)

#### Risks when steps are skipped

| If you skip … | Downstream risk |
|---|---|
| Step 1 (management framework) | Migration Plan conflicts with programme management, portfolio governance, or procurement processes; Architecture Contract has no legal basis |
| Step 2 (business value) | Prioritisation is based on technical preference, not business benefit; wrong things delivered first |
| Step 3 (resources) | Plan is aspirational, not deliverable; teams commit to dates without checking capacity or skill availability |
| Step 4 (prioritisation/risk) | High-risk items may be scheduled too early (before mitigations exist) or too late (blocking other streams) |
| Step 5 (roadmap confirmation) | Phase G receives an unconfirmed roadmap; Architecture Contract is based on a provisional baseline |
| Step 6 (Migration Plan) | No formal plan exists; Phase G governance has no document to enforce |
| Step 7 (lessons learned) | Patterns that cause difficulties are repeated in the next ADM cycle |

---

### Technique 1 — Work Package Prioritisation

Prioritise each work package using a weighted scoring model. The formula balances business value, risk reduction, and effort.

$$
\text{Priority Score} = \frac{\text{Business Value} + \text{Risk Reduction}}{\text{Effort}}
$$

| Factor | Scale | Notes |
|---|---|---|
| **Business Value** | 1–5 | Revenue enabled, cost reduced, compliance met, customer experience improved |
| **Risk Reduction** | 1–5 | How much does completing this work reduce programme risk? (technical debt, regulatory exposure, dependency) |
| **Effort** | 1–5 | 1 = low effort (< 1 month, 1 team); 5 = high effort (> 12 months, multiple teams) |

**Example prioritisation:**

| Work Package | Business Value | Risk Reduction | Effort | Score | Recommended sequence |
|---|---|---|---|---|---|
| PCI-DSS Remediation (Payment Service) | 4 (compliance mandatory) | 5 (removes regulatory risk) | 3 | **3.0** | **1st — regulatory obligation** |
| Identity Provider upgrade | 3 | 4 | 2 | **3.5** | **1st — security foundation** |
| ERP Cloud Migration | 5 (cost reduction) | 2 | 5 | **1.4** | 3rd — high effort, lower risk urgency |
| Loyalty Platform (new build) | 4 (revenue) | 1 | 3 | **1.7** | 2nd — revenue driver; can parallel-track |
| Analytics Modernisation | 3 | 2 | 4 | **1.25** | 4th — lower urgency; depends on ERP data |
| Legacy Data Warehouse retirement | 2 | 3 | 2 | **2.5** | 2nd — enables analytics modernisation |

---

### Technique 2 — Risk-Based Sequencing

Not all sequencing is about priority score. Some work packages must be sequenced by dependency or risk:

``` mermaid
flowchart TD
    IDP["Identity Provider Upgrade\n[Security foundation — all systems depend on auth]"]
    PCI["PCI-DSS Remediation\n[Regulatory deadline drives sequence]"]
    OMS["Order Management Service\n[Depends on Payment Service decoupling]"]
    Pay["Payment Service decoupling\n[Depends on tokenisation from PCI work]"]
    Loyalty["Loyalty Platform\n[Parallel — no critical dependency]"]
    ERP["ERP Migration\n[High effort — parallel stream, phased]"]
    Analytics["Analytics Modernisation\n[Depends on ERP data availability]"]

    IDP --> Pay
    PCI --> Pay
    Pay --> OMS
    Loyalty -.->|"parallel track"| OMS
    ERP --> Analytics

    style IDP fill:#c0392b,color:#fff,stroke:none
    style PCI fill:#c0392b,color:#fff,stroke:none
    style Pay fill:#4F46E5,color:#fff,stroke:none
    style Analytics fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** Dependency sequencing approach drawn from TOGAF 10 §11.3 Step 4 — risk-based prioritisation and Step 3 — resource and timing estimation. The rolling-wave planning concept (commit near term, plan far term at lower resolution) is consistent with TOGAF 10 §11.2 Approach guidance: "The Implementation and Migration Plan is a high-level schedule showing the full duration of the migration, with detailed planning for the near term."

---

### Technique 3 — Cost/Benefit Estimation

| Work Package | Cost estimate (1yr) | Business benefit (1yr) | NPV (5yr) | Confidence | Risk |
|---|---|---|---|---|---|
| PCI-DSS Remediation | £350k | £800k (avoids potential fine + reduced audit cost) | £1.9m | Medium | Regulatory timeline fixed; effort estimate ±30% |
| Identity Provider upgrade | £180k | £250k (reduced breach risk, SSO productivity) | £0.9m | High | Well-scoped; team capacity available |
| ERP Cloud Migration | £2.1m | £1.4m/yr (infrastructure + licence savings) | £4.9m | Low | Complex; estimate uncertainty ±50%; scope risk high |
| Loyalty Platform | £600k | £2.2m/yr (revenue attribution) | £9.4m | Low | Revenue projection uncertain; market validation needed |
| Analytics Modernisation | £450k | £600k/yr (reduced data engineering, faster decisions) | £2.5m | Medium | Depends on ERP migration completion |

**Confidence levels explained:**

- **High:** Well-understood work; similar delivery in the team's history; estimate uncertainty ±15%
- **Medium:** Known approach; some novel elements; estimate uncertainty ±30%
- **Low:** Novel technology or domain; high uncertainty; estimate ±50% or more; plan for contingency

**Rolling-wave planning principle:** Commit to detailed plans only for the near term (next 3–6 months). Plan the medium term (6–18 months) at sprint/quarter level. Show direction for the far term (18–36 months) as a roadmap, not a commitment. Attempting to plan at fine granularity beyond 6 months in a complex programme produces false precision that harms decision-making.

---

### Technique 4 — Architecture Contract

The Architecture Contract is the formal agreement between the architecture function, the programme/project management function, and the business sponsor. It defines what will be built, to what architectural standards, with what governance.

---

**ARCHITECTURE CONTRACT**

**Contract reference:** AC-2026-001  
**Programme:** Digital Platform Modernisation Programme  
**Version:** 1.0 — DRAFT FOR REVIEW  
**Date:** 2026-01-15  
**Owner:** Chief Architect  
**Sponsor:** Chief Technology Officer

---

**1. Purpose and Scope**

This Architecture Contract governs the delivery of the Digital Platform Modernisation Programme. It defines the architecture standards that must be met, the constraints that must be respected, the governance checkpoints that must be passed, and the escalation process for deviations.

---

**2. Architecture Standards (Mandatory)**

| Domain | Standard | Reference |
|---|---|---|
| Security | All new services must implement OAuth 2.0 / OIDC via the approved Identity Provider | Architecture Principle P6; Security Architecture Standard SEC-001 |
| Cloud | AWS is the approved cloud provider; approved regions: eu-west-1 (primary), eu-west-2 (DR) | Technology Architecture Standard TECH-003 |
| API | All inter-service APIs must use REST over HTTPS (TLS 1.3 minimum) or async via approved message broker | Integration Standard INT-001 |
| Data | PII must reside only in CRM (Salesforce) as source of record; other services hold Customer ID reference only | Data Architecture Standard DATA-001; GDPR Article 30 |
| Deployment | All services must be deployed via CI/CD pipeline; no manual production deployments | DevOps Standard DEV-001 |
| Observability | All services must emit health metrics, structured logs, and distributed traces to the approved observability platform | Architecture Principle P2 |

---

**3. Architecture Constraints (Non-negotiable)**

- PCI-DSS v4.0 compliance for all payment-related components: no PAN stored at rest; card tokenisation mandatory
- GDPR Article 30 records of processing activities must be updated before any system handling PII goes live
- No new deployments to on-premises infrastructure; cloud-first principle applies to all new work packages
- Legacy ERP may not be extended; only migration work packages targeting its replacement are in scope

---

**4. Governance Checkpoints (Architecture Review Board gates)**

| Gate | When | Criteria |
|---|---|---|
| **G1 — Architecture Compliance Review** | Pre-development: solution design reviewed before development begins | Architecture standards met; no unapproved deviations; interfaces match ADD |
| **G2 — Non-Functional Review** | During development: performance, security, scalability tested before UAT | NFR targets met; security sign-off; DR plan validated |
| **G3 — Pre-Production Review** | Before go-live: full compliance check | Architecture Contract requirements all met; dispensations approved; rollback plan validated |

---

**5. Dispensation Process**

Where a delivery team cannot meet a mandatory standard, a formal dispensation request must be submitted to the Architecture Review Board (see [Implementation Governance](../implementation-governance.md#dispensation-process)). Dispensations must:

- State the specific standard that cannot be met
- Justify the deviation
- Propose a time-bound mitigation
- Be approved by the Chief Architect before development begins

---

**6. Signatures**

| Role | Name | Date | Signature |
|---|---|---|---|
| Chief Architect (Architecture function) | | | |
| Programme Manager (Delivery function) | | | |
| CTO (Business sponsor) | | | |

---

### Technique 5 — Implementation and Migration Plan (Summary)

The Migration Plan translates the prioritised work packages, dependencies, and resource estimates into a time-phased delivery schedule.

``` mermaid
gantt
    title Digital Platform Modernisation — Implementation and Migration Plan
    dateFormat  YYYY-MM
    axisFormat  %b %Y
    section Security Foundation
    Identity Provider upgrade     :done,  idp, 2026-01, 2026-03
    section Regulatory
    PCI-DSS Remediation           :active, pci, 2026-02, 2026-05
    section Platform Core
    Payment Service (decoupled)   :        pay, 2026-05, 2026-08
    Order Management refactor     :        oms, 2026-07, 2026-10
    section New Capabilities
    Loyalty Platform (build)      :        loy, 2026-04, 2026-09
    section Data
    Legacy Data Warehouse retire  :        dw,  2026-06, 2026-09
    Analytics Modernisation       :        ana, 2026-09, 2027-03
    section Major Migrations
    ERP Cloud Migration (Tranche 1):       erp, 2026-10, 2027-06
```

> **Source:** Implementation and Migration Plan format aligned with TOGAF 10 §11.3 Step 6 output requirements. Gantt chart represents rolling-wave planning principle: near term (Q1–Q2) at sprint level; medium term (Q3–Q4) at quarter level; far term (2027) at tranche level.

---

## Bloom Layer D — Tools

### Migration Planning Tools

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **Jira Advanced Roadmaps** | Programme-level roadmap, dependency mapping, capacity planning | Integrates with Jira; cross-team dependency tracking; timeline view | Expensive; complexity overhead for small teams | Requires Premium plan: ~$17/user/mo | [atlassian.com/software/jira](https://www.atlassian.com/software/jira) |
| **Miro / Mural** | Visual dependency mapping, Migration Plan workshop facilitation | Fast; accessible; good for co-located workshops | No formal plan output; diagrams only | Free (limited); Miro from $10/user/mo | [miro.com](https://www.miro.com) |
| **LeanIX** | Architecture roadmap and migration planning; application lifecycle management | Enterprise-grade; integrates APM with roadmap; stakeholder dashboards | Enterprise pricing; complex | Enterprise ($$$$) | [leanix.net](https://www.leanix.net) |
| **Smartsheet / MS Project** | Gantt-based Migration Plan, resource planning | Familiar to PMO; resource tracking; critical path | Architecture-unaware; diagrams are static | Smartsheet from $7/user/mo | [smartsheet.com](https://www.smartsheet.com) |
| **Azure DevOps (Delivery Plans)** | Delivery plans across teams; sprint alignment | Integrates with Azure Boards; multi-team visibility | Microsoft-ecosystem only; limited architecture context | Azure DevOps Basic ~$6/user/mo | [azure.microsoft.com/products/devops](https://azure.microsoft.com/products/devops) |

---

## Bloom Layer E — Decision Frameworks

| Migration decision | Lean towards when | Lean away when | Risk if wrong |
|---|---|---|---|
| **Big bang vs. phased migration** | Big bang: small scope; clean cut-over feasible; rollback possible | Phased: large scope; business continuity required; risk of partial states | Big bang for large scope → catastrophic rollback required; phased without clear transition architecture → inconsistent state for months |
| **Pilot / tranche vs. full rollout** | Pilot: high uncertainty; new technology; learning needed first | Full rollout: proven approach; time pressure; high volume of similar units | No pilot: first failure is in production at scale; over-piloting: pilot never becomes production |
| **In-house vs. SI partner for delivery** | In-house: team capability; IP retention; no procurement delay | SI partner: skills gap; time pressure; well-defined scope | SI for ambiguous scope: cost overrun; in-house without skills: quality risk |
| **Parallel run vs. cutover** | Parallel run: high-risk systems; data reconciliation needed; financial systems | Cutover: low risk; testing sufficient; parallel run unaffordable | Parallel run too short: errors only found after cutover; no parallel run for financial system: undetected discrepancies |
| **Architecture Contract: detailed vs. lightweight** | Detailed: large programme; multiple SI partners; regulated | Lightweight: single team; agile; low formality context | No contract: no basis for Phase G compliance reviews; over-specified contract: constrains valid delivery decisions |

---

## Bloom Layer E — Judgment & Trade-offs

| Question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Commit to detailed plan vs. rolling wave** | Rolling wave: always for programmes > 6 months; future state uncertain | Detailed plan for short, well-scoped work (< 3 months, 1 team) | Detailed long-term plan: false precision; decisions made on wrong assumptions; cost overruns treated as surprises |
| **Architecture Contract: prescriptive vs. principles-based** | Principles-based: agile delivery; high-trust teams; experienced architects | Prescriptive: SI partners; fixed-price contracts; regulated delivery | Prescriptive with immature team: contract becomes a ceiling not a floor; principles-based with untrusted partner: anything goes |
| **Prioritise by business value vs. by risk** | Risk-first: regulatory deadline; security dependency; critical path | Value-first: no urgent risks; all options viable; board wants visible revenue | Value-first when risk is blocking: delivers capability on a broken or non-compliant foundation; risk-first in all cases: perceived slow value delivery |
| **Lessons learned: formal document vs. team retrospective** | Formal document: programme close-out; feeds next ADM cycle architecture decisions | Retrospective: small programme; fast cycle; lightweight practice | No lessons learned: same mistakes next programme; over-formal without organisational uptake: document filed and forgotten |
| **Migration Plan granularity** | Quarter-level for 6–18 months; sprint-level for next 3 months | Never produce sprint-level plans beyond 3 months — accuracy collapses | Over-granular long-term plan: constant re-planning; under-granular near-term plan: team has no sprint targets |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** A logistics company (£500m revenue, 800 IT staff, 4 acquired legacy systems) has completed Phase E and produced a set of 12 work packages for a 2-year "Platform Re-architecture Programme." The CFO wants a funded business case with NPV, the CTO wants an Architecture Contract, and the PMO wants a Gantt. The Architecture Board has 6 weeks to produce Phase F outputs.

1. **Recall:** Name the 7 Phase F steps. For each, state what you would produce in a real programme (artefact or decision).
2. **Comprehension:** Explain the difference between a "Phase E Architecture Roadmap" and a "Phase F Implementation and Migration Plan." What additional information does Phase F add?
3. **Application:** From the 12 work packages in Phase E, take 5 and score them using the `(Business Value + Risk Reduction) / Effort` formula. Show the scoring, the final ranking, and justify your top-3 sequencing recommendation.
4. **Analysis:** The PMO has told you that two of your highest-priority work packages (regulatory compliance + legacy system retirement) require the same team, but your Gantt shows them running in parallel. Analyse the resource conflict and propose how to resolve it without changing the regulatory delivery date.
5. **Evaluation:** The CFO wants a 5-year NPV for each work package with ±10% confidence. You have Low confidence estimates for 8 of 12 packages. Evaluate whether producing a ±10% NPV is intellectually honest — and propose how to present uncertainty without losing stakeholder confidence in the plan.
6. **Synthesis:** Draft the Architecture Contract for this programme. Include: scope statement, 5 mandatory architecture standards, 3 non-negotiable constraints, 3 governance checkpoints with criteria, and a dispensation process. Make it specific enough that a Phase G compliance review could use it to approve or reject delivery team work products.

> Phase F is where architectural decisions become financial commitments. The quality of the Migration Plan directly determines whether the organisation invests in the right things, in the right order, with the right constraints — or whether it discovers eighteen months later that the plan was aspirational.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Work package scoring** | "Given these work packages [list with descriptions], score each using the formula: (Business Value + Risk Reduction) / Effort. Scale each factor 1–5. Justify each score and produce a ranked table." | Scores based on description quality not organisational context; challenge any score that lacks concrete justification |
| **Architecture Contract first-draft** | "Draft an Architecture Contract for a [programme description]. Include: purpose, architecture standards (5 mandatory), constraints (3 non-negotiable), governance checkpoints (3 gates with criteria), and dispensation process." | Generic standards (e.g., "use best practices"); every standard must name a specific constraint |
| **Cost/benefit table** | "Generate a cost/benefit estimation table for these work packages [list]. Columns: cost estimate, business benefit, NPV (5yr), confidence (High/Medium/Low), key risk. Use realistic but illustrative numbers for a [industry, company size]." | Made-up numbers that look precise; label all AI-generated financials as "illustrative, requires validation" |
| **Gantt roadmap (Mermaid)** | "Generate a Mermaid Gantt chart for a 2-year migration programme with these work packages [list]. Show dependencies. Use YYYY-MM date format." | Mermaid Gantt syntax errors; validate in a live renderer before publishing |
| **Lessons learned template** | "Generate a Phase F lessons learned document for a cloud migration programme. Sections: what worked well, what did not, root causes, recommendations for next ADM cycle." | Generic lessons; use only as a template for a real retrospective |

!!! warning "Bias to watch"
    LLMs consistently under-estimate effort (they have no experience of organisational resistance, procurement lead time, or team ramp-up) and over-estimate business value (they pattern-match to optimistic case studies). All AI-generated cost, benefit, and NPV estimates should be treated as illustrative prompts for a real estimation exercise — not as inputs to a business case.

---

## Common Mistakes

!!! danger "Producing a Migration Plan without an Architecture Contract"
    A Gantt without an Architecture Contract is a schedule. A schedule without architectural governance has no basis for Phase G compliance reviews. The Architecture Contract is what gives Phase G its authority to approve or reject delivery.

!!! failure "False precision in long-term estimates"
    Producing sprint-level Gantt charts for work 18 months away signals confidence you do not have. Use rolling-wave planning: commit at sprint level for the next 3 months, quarter level for 6–18 months, roadmap level for beyond. Stakeholders respect honest uncertainty more than false precision.

!!! warning "Prioritising by effort rather than value/risk"
    "Let's do the easy stuff first" is a common anti-pattern. Small, easy, low-value work packages done first consume team capacity and budget before the high-risk items are addressed. Prioritise by business value and risk reduction — sequence by dependency.

!!! tip "Get PMO alignment before Architecture Contract sign-off"
    The Architecture Contract must be co-signed by the Programme Manager and business sponsor — not just the Chief Architect. An architecture-only document has no enforcement mechanism in Phase G. Governance without business sponsorship is theatre.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 11 | Primary standard | Authoritative Phase F steps, Architecture Contract, Migration Plan | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap11.html) |
| TOGAF 10 Part VI Chapter 48 | Standard | Architecture Contracts: structure, content, and management | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap48.html) |
| Managing Successful Programmes (MSP 5th ed.) | Framework | Programme-level benefit realisation, governance, risk management | [axelos.com/certifications/msp](https://www.axelos.com/certifications/msp) |
| PRINCE2 7th edition | Framework | Project management methodology; integrates with TOGAF Architecture Contract governance | [axelos.com/certifications/prince2](https://www.axelos.com/certifications/prince2) |
| Cloud Migration Patterns (AWS / Azure docs) | Reference | 7R migration strategies; practical sequencing and risk patterns | [docs.aws.amazon.com/prescriptive-guidance](https://docs.aws.amazon.com/prescriptive-guidance/) |
| Site Reliability Engineering (Beyer et al. — Google, 2016) | Book | SLO/SLA for migration gates; error budget as migration risk signal | [sre.google/books](https://sre.google/books/) |
| Accelerate (Forsgren, Humble, Kim — 2018) | Book | DORA metrics as NFR targets in the Architecture Contract | [itrevolution.com/accelerate-book](https://itrevolution.com/accelerate-book/) |
