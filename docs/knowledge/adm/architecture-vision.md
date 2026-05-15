# Phase A — Architecture Vision

**TOGAF Reference:** Part II, Chapter 6 — Phase A  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why Phase A matters to you:** As a lead developer you are used to receiving a brief and delivering against it. Phase A is where that brief is *created*. Without a well-formed Architecture Vision, every design decision downstream is made without an agreed target — teams optimise locally, scope drifts, and the architecture review in Phase G has nothing to validate against. Phase A is the discipline of getting alignment *before* building, not during.

---

## Bloom Layer A — Quick Recall

**At a glance:** Phase A defines *what success looks like* for the architecture engagement and gets formal approval to proceed.

| | |
|---|---|
| **In** | Request for Architecture Work (RFAW), business principles/goals/drivers, capability assessment, existing architecture docs |
| **Out** | Architecture Vision document, Statement of Architecture Work (SoAW), stakeholder map, updated risk register |
| **Exit when** | SoAW is formally signed off by the Architecture Board and business sponsor |
| **Feeds into** | Phase B (Business Architecture) — the vision is the anchor for all downstream phases |
| **TOGAF Chapter** | Part II, Chapter 6 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap06.html) |

---

## Bloom Layer B — Conceptual Understanding

### What Phase A establishes and why it comes first

Phase A produces two artefacts that govern the entire ADM cycle:

``` mermaid
flowchart LR
    AV["📄 Architecture Vision\nThe 'what' — aspirational\ntarget state at high level"]
    SoAW["📋 Statement of Architecture Work\nThe 'contract' — scope, resources,\ntimeline, approval, acceptance criteria"]
    RFAW["📥 Request for\nArchitecture Work\n(trigger)"]
    PhaseB["Phase B\nBusiness Architecture"]

    RFAW --> AV
    RFAW --> SoAW
    AV --> PhaseB
    SoAW --> PhaseB

    style RFAW fill:#37474f,color:#fff,stroke:none
    style AV fill:#4F46E5,color:#fff,stroke:none
    style SoAW fill:#7C3AED,color:#fff,stroke:none
    style PhaseB fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF 10 Part II §6.3 — Phase A inputs and outputs. The relationship between RFAW → Architecture Vision → SoAW → Phase B is defined in the ADM content framework (§6.2.3).

**Why this sequencing matters:** The Architecture Vision is intentionally *high-level*. It is not a design. Its purpose is to get *agreement on direction* before spending time on detailed architecture work. The SoAW converts that agreement into a formal commitment with scope, timeline, and acceptance criteria.

**Developer analogy:** The Architecture Vision is your Epic / initiative brief. The SoAW is the signed project charter. Phase B–D is the sprint/delivery work. Without the signed charter, every decision gets re-litigated mid-sprint.

---

## Bloom Layer C — Guided Practice (Step-by-Step)

### TOGAF Phase A Step Sequence

The following sequence is defined in **TOGAF 10 Part II, Chapter 6, §6.3** (Steps 1–11). All steps are required; skipping steps creates gaps that surface during Phase G governance review.

``` mermaid
flowchart TD
    S1["Step 1: Establish Architecture Project\n(set up governance, team, repository)"] --> S2
    S2["Step 2: Identify Stakeholders,\nConcerns & Business Requirements"] --> S3
    S3["Step 3: Confirm & Elaborate\nBusiness Goals, Drivers & Constraints"] --> S4
    S4["Step 4: Evaluate Capabilities\n(baseline assessment)"] --> S5
    S5["Step 5: Assess Readiness for\nBusiness Transformation"] --> S6
    S6["Step 6: Define Scope"] --> S7
    S7["Step 7: Confirm Architecture Principles\n(including Business Principles)"] --> S8
    S8["Step 8: Develop Architecture Vision"] --> S9
    S9["Step 9: Define Target Architecture\nValue Propositions & KPIs"] --> S10
    S10["Step 10: Identify Transformation Risks\n& Mitigation Activities"] --> S11
    S11["Step 11: Develop Statement of\nArchitecture Work — Get Approval"]

    style S1 fill:#37474f,color:#fff,stroke:none
    style S11 fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF Standard 10th Edition, Part II, Chapter 6, §6.3 — Phase A Steps 1–11. [pubs.opengroup.org/architecture/togaf10-doc/arch/chap06.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap06.html)

#### Risks when steps are skipped

| If you skip … | Downstream risk |
|---|---|
| Step 2 (stakeholders) | Architecture views produced for the wrong concerns; rework in review |
| Step 3 (goals/drivers) | Phase B capability map has no strategic anchor; everything looks equally important |
| Step 4 (capability assessment) | No baseline → no gap analysis possible → Phase B target becomes a wish-list |
| Step 5 (readiness) | Architecture approved but organisation cannot absorb the change; Phase G fails |
| Step 9 (KPIs) | No way to validate success in Phase G/H; compliance reviews have nothing to measure |
| Step 11 (SoAW sign-off) | Scope creep is inevitable; architect has no protection when priorities shift |

---

### Inputs

| Input | Source | Developer translation |
|---|---|---|
| Request for Architecture Work | Architecture Board / Sponsor | "The problem statement / initiative brief" |
| Architecture Reference Materials | Preliminary Phase / Repository | "Existing ADRs, coding standards, design patterns in use" |
| Business principles, goals, drivers | Senior management | "Product strategy, OKRs, strategic bets" |
| Capability assessment | Preliminary Phase / internal | "Domain model maturity, tech debt inventory" |
| Organisational Model for EA | Preliminary Phase | "How the architecture function is set up and its authority" |
| Existing architecture docs | Architecture Repository | "Previous design docs, C4 diagrams, RFCs" |

---

### Technique 1 — Stakeholder Map & Concerns Matrix

**What it is:** A structured inventory of every stakeholder, their primary concerns, and the architecture viewpoints needed to address those concerns. Defined in TOGAF 10 §24 (Architecture Views and Viewpoints).

**Developer analogy:** Writing API consumer documentation before implementing — you identify who will consume the architecture and what they care about before designing the structure.

| Stakeholder | Role | Primary Concerns | Viewpoints Needed |
|---|---|---|---|
| CEO / Board | Sponsor | Business outcomes, risk, ROI | Business motivation, strategic roadmap |
| CTO / CIO | Authority | Technology direction, standards, debt | Technology landscape, integration |
| CISO | Authority | Security, compliance, data residency | Security, compliance |
| Product Owner | Consumer | Feature delivery speed, API stability | Application, API |
| Engineering Lead | Implementer | Technology choices, constraints, NFRs | Technology, deployment |
| Operations | Consumer | SLOs, runbooks, supportability | Operational, deployment |
| Legal / Compliance | Constraint | Regulatory adherence, data governance | Compliance, data |

> **Source:** Stakeholder categorisation adapted from TOGAF 10 Part III §24.3 (Stakeholders and Concerns) and ISO/IEC/IEEE 42010:2011 §4 (Architecture Description). The four concern categories — functional, quality, constraint, business — are from IEEE 42010.

**For each stakeholder, capture:**
- What is their **primary concern** (functional, quality, constraint, or business)?
- What **viewpoint** addresses that concern?
- What **view** (diagram or model) do they need to see?
- What **approval** do they hold over the architecture?

---

### Technique 2 — Business Motivation Model

**What it is:** A structured relationship between strategic *ends* (what the organisation wants) and *means* (how it will get there), surfacing the business drivers that justify the architecture work.

**Developer analogy:** Connecting a feature request to the OKR it addresses. Without this link, architecture decisions have no justification when challenged.

``` mermaid
flowchart LR
    subgraph Ends["🎯 Ends — What we want"]
        Vision["Vision\n(aspirational future state)"]
        Goal["Goals\n(long-term outcomes)"]
        Objective["Objectives\n(SMART, measurable)"]
    end
    subgraph Means["⚙️ Means — How we get there"]
        Mission["Mission\n(what we do)"]
        Strategy["Strategies\n(courses of action)"]
        Tactic["Tactics\n(specific activities)"]
    end
    subgraph Influencers["🌐 Influencers"]
        Driver["Business Drivers\n(internal pressures)"]
        External["External Factors\n(regulation, competition, technology)"]
    end

    Influencers --> Means
    Means --> Ends

    style Ends fill:#e3f2fd,stroke:#1565c0
    style Means fill:#e8f5e9,stroke:#2e7d32
    style Influencers fill:#fff3e0,stroke:#e65100
```

> **Source:** OMG Business Motivation Model (BMM) Specification v1.3, §7 (Ends, Means, Influencers). [omg.org/spec/BMM](https://www.omg.org/spec/BMM/). TOGAF 10 Part III §21 references BMM as the recommended technique for capturing business motivation in Phase A.

---

### Technique 3 — Business Capability Heat Map

**What it is:** A quadrant view of all in-scope capabilities scored by *strategic importance* (y-axis) and *current performance* (x-axis). The quadrant position drives architecture investment priorities.

**Developer analogy:** A technical debt matrix — high-risk / high-business-value = fix now; low-risk / low-business-value = tolerate.

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

> **Source:** Quadrant structure adapted from Gartner's IT Score / Capability Assessment methodology and the BIZBOK Guide (Business Architecture Guild) capability heat-mapping technique. Strategic Importance axis aligns with TOGAF 10 §6.3 Step 4 — Evaluate Capabilities.

**How to read each quadrant:**

| Quadrant | Interpretation | Architecture action |
|---|---|---|
| Transform — Critical Gap (high importance, low performance) | The organisation depends on this; it is failing | Highest priority; Phase B scope |
| Invest & Differentiate (high importance, high performance) | Working well — protect and extend | Maintain architecture standards; avoid disruption |
| Consider Outsourcing (low importance, low performance) | Low value, poor performance — don't invest | Investigate buy/SaaS options in Phase E |
| Maintain / Automate (low importance, high performance) | Stable; low strategic value | Automate; reduce cost; avoid bespoke investment |

---

### Key Deliverable 1 — Architecture Vision Document

The Architecture Vision is a *high-level view*, not a detailed design. If it contains component diagrams or API contracts, scope has crept into Phase C.

```
1. Problem description
   - Situation, opportunity, or problem being addressed
   - Business goals and objectives being supported

2. Objectives, goals, and strategic drivers
   - Specific objectives the architecture must achieve
   - How success will be measured (KPIs)

3. Stakeholder map (power/interest grid)

4. Constraints and assumptions
   - Non-negotiable constraints (regulatory, technical, financial, time)
   - Key assumptions and their risk if wrong

5. Baseline description (high-level)
   - Current state summary — enough context, not a full architecture
   - Capability heat map reference

6. Target architecture (high-level)
   - Future state vision — system context diagram (C4 L1 or ArchiMate context view)
   - Key architecture decisions anticipated (not yet made)

7. Business scenarios (if applicable)
   - User journeys or business processes the architecture must support

8. Proposed architecture work scope
   - What will be produced in Phases B–D
   - What is explicitly out of scope

9. Time, resource, and cost estimate (high level)

10. Risks and dependencies
    - Top 5 risks identified; initial mitigation approach
```

---

### Key Deliverable 2 — Statement of Architecture Work (SoAW)

The SoAW is the **formal contract** between the sponsor and the architecture team. It governs the entire engagement. Without a signed SoAW, scope creep is structurally inevitable.

```markdown
## Statement of Architecture Work

**Project:** {Name}
**Version:** 1.0
**Date:** {YYYY-MM-DD}
**Sponsor:** {Name, Role}
**Lead Architect:** {Name}
**Approved by:** {Architecture Board Chair}

### 1. Title and Scope of Architecture Work
{What architecture work will be done and for which part of the enterprise}

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
{Measurable criteria that define success — validated in Phase G}

### 8. Resource Requirements
{Team, budget, timeline}

### 9. Constraints & Assumptions
{Non-negotiable constraints; key assumptions and risk if wrong}

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

### Technique 4 — Transformation Readiness Assessment

**What it is:** A structured assessment of the organisation's capacity to absorb the architecture change. Defined in TOGAF 10 §6.3 Step 5.

**Why it matters:** An architecture that is technically correct but organisationally undeliverable will fail in Phase F/G. Surface readiness risks in Phase A, not after contracts are signed.

| Readiness Factor | Assessment Questions | Score (1–5) |
|---|---|---|
| **Vision** | Is the change clearly articulated and understood by the people who must deliver it? | |
| **Desire / Willingness** | Is there genuine desire to change? Who might resist, and why? | |
| **Need** | Is the urgency widely recognised — or only by the sponsor? | |
| **Business Case** | Is the ROI compelling and validated? | |
| **Funding** | Is sufficient funding committed (not just allocated in a plan)? | |
| **Sponsorship** | Is there active executive sponsorship — not just sign-off? | |
| **Capacity** | Can the organisation change alongside BAU without degrading operations? | |
| **Capability** | Do the delivery teams have the skills to execute the target architecture? | |
| **IT Capacity** | Can IT deliver the architecture changes while maintaining existing operations? | |

> **Source:** TOGAF 10 Part II §6.3 Step 5 — Assess Readiness for Business Transformation. Readiness factors adapted from the TOGAF Business Transformation Readiness Assessment technique (§33).

**Scoring:** 1 = Not ready · 3 = Partially ready · 5 = Fully ready  
Any factor scoring < 3 is a Phase A risk that must be mitigated or accepted before the SoAW is signed.

---

## Output Artifacts — Phase A Exit Criteria

- [ ] Stakeholder map and concerns matrix — every key stakeholder identified with concern and viewpoint
- [ ] Business motivation model — goals and drivers documented and linked to architecture scope
- [ ] Capability heat map — in-scope capabilities scored for strategic importance × performance
- [ ] Architecture Vision document — reviewed and agreed by sponsor
- [ ] Architecture Principles confirmed (from Preliminary Phase) or new ones proposed
- [ ] Transformation Readiness Assessment — complete with risk mitigations for any factor < 3
- [ ] Statement of Architecture Work — formally signed off by Architecture Board and business sponsor
- [ ] Architecture Repository updated with Phase A outputs
- [ ] Risk register initialised
- [ ] Communications plan agreed

---

## Bloom Layer D — Tools & Notations

### Modelling & Notation Standards

| Tool / Standard | Purpose in Phase A | Pros | Cons | Cost | Primary link |
|---|---|---|---|---|---|
| **OMG BMM v1.3** | Business Motivation Model — linking strategy to architecture | Open standard; aligns with TOGAF §21; rigorous cause-effect | Complex; rarely used outside large enterprise programs | Free (open standard) | [omg.org/spec/BMM](https://www.omg.org/spec/BMM/) |
| **ArchiMate 3.2 — Motivation layer** | Stakeholder, driver, goal, principle, constraint modelling | Integrated with TOGAF; full traceability from motivation → architecture | Requires ArchiMate tooling; steep learning curve | Free spec; tools vary | [pubs.opengroup.org/architecture/archimate3-doc](https://pubs.opengroup.org/architecture/archimate3-doc/) |
| **ISO/IEC/IEEE 42010:2011** | Architecture Description standard — views, viewpoints, stakeholders | International standard; underpins TOGAF viewpoint framework | Abstract; not prescriptive on notation | Free via national standards bodies | [iso.org/standard/50508.html](https://www.iso.org/standard/50508.html) |

### Diagramming & Collaboration Tools

| Tool | Best for | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **Miro** | Stakeholder mapping, capability heat-map workshops | Real-time collaboration; easy for non-architects; templates | Not standards-compliant; no export to ArchiMate | Free tier; paid from ~$8/user/mo | [miro.com](https://miro.com) |
| **draw.io / diagrams.net** | System context diagrams, stakeholder maps, BMM | Free; offline; Git-friendly; no vendor lock-in | No repository; no auto-analysis | Free | [diagrams.net](https://www.diagrams.net) |
| **Sparx Enterprise Architect** | ArchiMate motivation layer, full TOGAF ADM traceability | Deep TOGAF/ArchiMate support; built-in templates | Heavy; expensive; steep learning curve | ~$229/user/yr | [sparxsystems.com](https://sparxsystems.com) |
| **LeanIX** | Enterprise capability map with strategic overlay | Architecture repository built-in; roadmap integration; heat-map native | Enterprise pricing; complex setup | Enterprise ($$$$) | [leanix.net](https://www.leanix.net) |
| **Confluence / Notion** | Architecture Vision and SoAW documentation | Accessible; stakeholders can comment; version history | No modelling; diagrams are attachments | Free/paid tiers | [confluence.atlassian.com](https://www.atlassian.com/software/confluence) |
| **Mermaid (this site)** | Diagrams as code embedded in Markdown | Diff-friendly; version-controlled; free | Limited layout control; no BPMN lane support | Free (open source) | [mermaid.js.org](https://mermaid.js.org) |

---

## Bloom Layer E — Decision Frameworks

**Which technique leads?** Pick based on the dominant uncertainty at the start of Phase A.

| If the primary uncertainty is … | Lead with … | Then add … |
|---|---|---|
| Stakeholder alignment / politics | Stakeholder map → power/interest grid → concerns matrix | BMM to show how each stakeholder's concern links to strategy |
| Strategic clarity (goals are vague) | Business Motivation Model (ends/means) | Capability heat map to translate strategy into capability gaps |
| Readiness / organisational risk | Transformation Readiness Assessment first | Architecture Vision after — scope it to what the org can absorb |
| Scope definition (too broad or contested) | Define scope explicitly (Step 6) before developing the vision | SoAW as the formal constraint document |
| Legacy complexity / baseline unknown | Capability assessment (Step 4) before building target vision | Risk register to capture baseline unknowns |

---

## Bloom Layer E — Judgment & Trade-offs

| Architectural question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Broad scope vs. narrow** | Strategic transformation; multi-domain change; executive mandate | Tactical capability uplift; tight timeline | Broad scope without capacity → everything stalls; narrow scope on strategic programme → rework when gaps emerge |
| **Many stakeholder concerns vs. focused set** | Multi-domain change; regulatory programme | Single capability change; fast tactical delivery | Too many concerns → views proliferate; stakeholders can't prioritise; vision loses clarity |
| **Long horizon vs. short (12m vs. 3y)** | Foundational platform rebuild; new business model | Incremental improvement; BAU enhancement | Long horizon with weak governance → drift; short horizon on a foundational programme → Phase B surprises are not planned for |
| **Architecture Vision as slide vs. as structured document** | Exploratory / early alignment; C-suite audiences | Architecture Board approval; formal ADM cycle | Slides accepted instead of a Vision document → no acceptance criteria → nothing to validate in Phase G |
| **SoAW detail: light vs. thorough** | Well-understood scope; experienced team; low risk | New team; novel domain; regulatory constraints | Light SoAW → scope creep; thorough SoAW on a fast cycle → overhead without value |
| **Capability heat map now vs. defer to Phase B** | When there are >10 in-scope capabilities | Single-capability programme | No heat map → Phase B models everything with equal priority → ADD is unfocused |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** You are the lead architect for a fintech startup that has grown from 3 to 300 engineers in 3 years. The CTO has been asked by the board to "get the architecture under control" before a Series C raise. There is no current architecture practice.

1. **Recall:** Name the two primary Phase A output artefacts and state their relationship to each other.
2. **Comprehension:** Explain why the Transformation Readiness Assessment (Step 5) must precede the Architecture Vision (Step 8) in the TOGAF sequence.
3. **Application:** Build a stakeholder map for this fintech scenario. Identify at least 6 stakeholders with their primary concern and required viewpoint.
4. **Analysis:** Score the fintech's readiness against the 9 factors. Which three factors are most at risk? What evidence would you need to verify each score?
5. **Evaluation:** The CTO wants to skip the SoAW ("too much paperwork") and move straight to Phase B. Make the case for and against. What minimal SoAW would you propose?
6. **Synthesis:** Draft the Architecture Vision document structure (headings + one sentence per section) for this fintech. Define 3 measurable KPIs that the Architecture Board can use to validate success at Phase G.

> The architecture vision is not the architecture — it is the agreement that makes the architecture possible.

---

## Acceleration Using AI

LLMs are useful for structuring reasoning and stress-testing assumptions — not for generating artefacts.

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Stakeholder concern elicitation** | "Given this system context [describe], list 8 stakeholder types, their primary architectural concerns, and the viewpoints that address them." | Missing domain-specific stakeholders; generic concern lists |
| **BMM structured capture** | "Given this business description [describe], identify: Vision, Goals, Objectives, Mission, Strategies, Tactics, and top 3 external influencers." | Fabricated objectives; vague strategies without clear action |
| **SoAW first-draft** | "Draft a Statement of Architecture Work for [programme description]. Include: scope, KPIs, constraints, top 5 risks." | Hallucinated KPIs that aren't measurable; scope that's too broad |
| **Scope boundary testing** | "Here is our proposed scope: [describe]. What is most likely to be contested by stakeholders? What is most likely to be missed?" | Surface-level concerns; misses organisation-specific political dynamics |
| **Readiness gap identification** | "Here are our readiness factor scores: [paste table]. For any score ≤3, suggest 2 mitigation actions and 1 diagnostic question." | Generic mitigations; may miss structural org constraints |

!!! warning "Bias to watch"
    LLMs will produce confident-sounding Architecture Visions and SoAW documents for programmes they know nothing about. The output *looks* professional but has no grounding in your stakeholders, constraints, or political context. Use AI output as a checklist prompt, not as a draft to refine.

---

## Common Mistakes

!!! danger "Failure patterns to watch"
    - **Architecture Vision = detailed design** — if the Vision contains API contracts, data models, or technology choices, Phase C has already started without a Phase B foundation.
    - **SoAW without KPIs** — a vision with no measurable success criteria cannot be validated in Phase G; the architecture will be declared successful by whoever shouts loudest.
    - **Stakeholder map never updated** — stakeholders change during a programme; an outdated map means architecture views are produced for people who no longer have influence.
    - **Capability heat map skipped** — treating all capabilities as equally important leads to over-engineering low-value areas and under-serving critical gaps.
    - **Readiness ignored** — an architecture approved by a sponsor who cannot fund or resource delivery is not approved; it is deferred.

!!! failure "Architecture Vision with no measurable success criteria"
    A vision that cannot be measured cannot be validated. Define KPIs in the SoAW that can be objectively assessed at the end of Phase G — not subjective measures like "stakeholders are happy."

!!! warning "SoAW not formally signed off"
    Without a signed SoAW, scope creep is inevitable and the architect has no protection when stakeholders change direction. A verbal agreement in a meeting is not a SoAW.

!!! warning "Skipping the capability heat map"
    Treating all business capabilities as equally important leads to over-engineering low-value areas. The heat map focuses architectural investment where it creates the most strategic value.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 6 | Primary standard | Authoritative Phase A steps, inputs, outputs, techniques | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap06.html) |
| OMG Business Motivation Model v1.3 | Standard | Ends/Means/Influencers framework; strategy-to-architecture traceability | [omg.org/spec/BMM](https://www.omg.org/spec/BMM/) |
| ISO/IEC/IEEE 42010:2011 | Standard | Architecture Description — views, viewpoints, stakeholders, concerns | [iso.org/standard/50508.html](https://www.iso.org/standard/50508.html) |
| ArchiMate 3.2 — Motivation Aspect | Standard | Stakeholder, driver, assessment, goal, principle, constraint elements | [pubs.opengroup.org/architecture/archimate3-doc](https://pubs.opengroup.org/architecture/archimate3-doc/) |
| TOGAF 10 §33 — Transformation Readiness | Technique | Readiness assessment factors and scoring approach | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap33.html) |
| Accelerate (Forsgren, Humble, Kim — 2018) | Book | DORA metrics; measurable capability KPIs for technology programmes | [itrevolution.com/accelerate-book](https://itrevolution.com/accelerate-book/) |
| The Art of Business Value (Schwartz — 2016) | Book | Why business value framing matters for architecture sponsors | [itrevolution.com](https://itrevolution.com/the-art-of-business-value/) |
| Competing on Analytics (Davenport & Harris — 2007) | Book | Capability maturity framing; strategic importance of analytical capability | [hbr.org](https://hbr.org/2006/01/competing-on-analytics) |
