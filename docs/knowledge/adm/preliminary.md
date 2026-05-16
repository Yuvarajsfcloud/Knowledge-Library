# Preliminary Phase — Framework & Principles

**TOGAF Reference:** Part II, Chapter 5 — Preliminary Phase  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why the Preliminary Phase matters to you:** As a lead developer you work within constraints you did not set: coding standards, approved libraries, Git workflow, PR review rules. Someone established those — and if nobody did, every team invented its own. The Preliminary Phase is where that someone does the architectural equivalent: agreeing what principles guide decisions, who has authority to approve them, and where all architecture artefacts live. Without it, every architecture engagement starts from scratch. With it, every engagement builds on a shared foundation.

---

## Bloom Layer A — Quick Recall

**At a glance:** The Preliminary Phase establishes the architecture *capability* — the people, processes, tools, and principles that make all subsequent ADM phases possible.

| | |
|---|---|
| **The five outputs** | Architecture Board · Architecture Principles · Architecture Repository · Architecture Framework definition · Architecture Governance model |
| **TOGAF Chapter** | Part II, Chapter 5 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap05.html) |
| **Runs when** | Once, at the start of an architecture practice — and again whenever the governance model needs a fundamental refresh |
| **Feeds into** | Every subsequent ADM phase; Phase A cannot start until the Preliminary Phase products exist |
| **Developer analogy** | Setting up your monorepo: Git workflow, branch protection rules, coding standards, CODEOWNERS, CI gates. Without this, every team later invents its own and you spend the rest of the programme reconciling them. |

---

## Bloom Layer B — Conceptual Understanding

### What the Preliminary Phase establishes and why it comes first

The Preliminary Phase answers: *in what context will architecture work be done?* It creates the scaffolding that all subsequent phases depend on.

``` mermaid
flowchart LR
    subgraph Pre["Preliminary Phase — Establishes"]
        direction TB
        P["Architecture\nPrinciples"]
        B["Architecture\nBoard"]
        R["Architecture\nRepository"]
        F["Framework\nDefinition"]
        G["Governance\nModel"]
    end
    A["Phase A —\nArchitecture Vision"]
    allPhases["All ADM\nPhases B–H"]

    Pre --> A --> allPhases

    style Pre fill:#37474f,color:#fff,stroke:none
    style A fill:#4F46E5,color:#fff,stroke:none
    style allPhases fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF 10 Part II §5.1 — Preliminary Phase objectives and outputs. The "architecture capability" concept is defined in TOGAF 10 §5.2: "The purpose of the Preliminary Phase is to determine the Architecture Capability desired by the organisation." The five output types are listed in §5.4.

**Why each output is foundational:**

| Output | What breaks without it |
|---|---|
| **Architecture Principles** | Every architecture decision is made ad-hoc; different architects produce incompatible results |
| **Architecture Board** | No authority to approve or reject architecture decisions; governance is informal and inconsistent |
| **Architecture Repository** | Artefacts are scattered across wikis, drives, and email; no single source of truth |
| **Framework Definition** | Teams use different methods; outputs are incompatible; training is impossible |
| **Governance Model** | Decisions made without accountability; no dispensation process; architecture drifts |

**Developer analogy extended:** Architecture Principles = coding standards. Architecture Board = engineering chapter + tech steering committee. Architecture Repository = architecture ADR store + design docs wiki. Framework Definition = which tools and notations are approved. Governance Model = PR approval rules + merge authority.

---

## Bloom Layer C — Guided Practice (Step-by-Step)

### TOGAF Preliminary Phase Step Sequence

Defined in **TOGAF 10 Part II, Chapter 5, §5.3** (Steps 1–8). These are the activities performed to establish the architecture capability, not a phase of the ADM cycle itself.

``` mermaid
flowchart TD
    S1["Step 1: Identify and scope the enterprise\norganisations impacted"] --> S2
    S2["Step 2: Identify key drivers and elements\nin the organisational context"] --> S3
    S3["Step 3: Define scope of architecture\nand confirm feasibility"] --> S4
    S4["Step 4: Confirm governance and\nsupport frameworks (COBIT, ISO 38500)"] --> S5
    S5["Step 5: Define & establish the\narchitecture team and organisation"] --> S6
    S6["Step 6: Identify & establish\nArchitecture Principles"] --> S7
    S7["Step 7: Tailor TOGAF and other\nselected architecture frameworks"] --> S8
    S8["Step 8: Implement architecture tools\nand Architecture Repository"]

    style S1 fill:#37474f,color:#fff,stroke:none
    style S8 fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF Standard 10th Edition, Part II, Chapter 5, §5.3 — Preliminary Phase Steps 1–8. [pubs.opengroup.org/architecture/togaf10-doc/arch/chap05.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap05.html)

#### Risks when steps are skipped

| If you skip … | Downstream risk |
|---|---|
| Step 1 (scope) | Architecture work starts in the wrong organisational boundary; Phase A stakeholder map is wrong |
| Step 2 (organisational context) | Principles are written in isolation and conflict with existing governance frameworks |
| Step 4 (governance frameworks) | Architecture governance duplicates or conflicts with IT governance (COBIT, ISO 38500) |
| Step 5 (team) | No named architects for Phase A; engagements start without defined roles or authorities |
| Step 6 (principles) | Phase A decisions are arbitrary; different architects apply different criteria |
| Step 7 (tailoring) | TOGAF applied verbatim; overhead disproportionate to organisation's maturity |
| Step 8 (repository) | Phase A outputs have nowhere to go; artefacts scatter across personal wikis and drives |

---

### Inputs

| Input | Source | Developer translation |
|---|---|---|
| TOGAF and other framework descriptions | The Open Group / external | "The methodology reference — the standard we are tailoring" |
| Board strategies, business plans, drivers | Senior management | "Product strategy, OKRs, strategic direction" |
| Major frameworks in use (IT governance, security, HR) | Internal | "Existing processes we must not duplicate or conflict with" |
| Architecture capability assessment | Self-assessment / external review | "How mature is our architecture practice today?" |
| Partnership and contract agreements | Legal / Procurement | "External constraints on what we can decide independently" |

---

### Technique 1 — Architecture Scope Dimensions

Before writing a single principle, define what the architecture practice will and will not cover.

| Scope Dimension | Options | Example decision |
|---|---|---|
| **Enterprise scope** | One BU / whole enterprise / specific geographies | All UK business units; excluding JVs |
| **Architecture domains** | All four (Business + Application + Data + Technology) or subset | All four |
| **Governance authority** | Advisory (recommends) / Consultative (reviewed) / Mandating (approved or blocked) | Mandating for new programmes; advisory for BAU |
| **Engagement model** | Project-driven / programme-driven / continuous | Programme-driven (new ADM per strategic programme) |
| **Relationship to IT governance** | Feeds IT governance / operates within it / overlaps with it | Architecture feeds COBIT APO03 |

---

### Technique 2 — Architecture Principles

Architecture principles encode the organisation's values and strategic intent into actionable guidance. Defined in TOGAF 10 Part III Chapter 20.

**Principle template (TOGAF standard):**

```
Principle Name:    {Short, memorable — 2–4 words}
Statement:         {One sentence — what is true or required}
Rationale:         {Why this principle exists — the business reason}
Implications:      {What this principle requires or constrains in practice — specific}
```

> **Source:** TOGAF 10 Part III §20.2 — Characteristics of Good Architecture Principles and the four-component template (Name, Statement, Rationale, Implications). Eight example principles below are adapted from TOGAF 10 §20.6.

#### Sample Enterprise Architecture Principle Set

| # | Name | Statement | Rationale | Implications |
|---|---|---|---|---|
| P1 | **Business Continuity** | Enterprise operations must be maintained despite any system disruption. | IT availability is critical to revenue and reputation. | Requires DR planning, RTO/RPO targets, and failover capability for all critical systems. |
| P2 | **Data Is an Asset** | Data is a shared enterprise asset, managed throughout its lifecycle. | Data-driven decisions require trusted, governed, accessible data. | Requires data ownership, classification, retention policies, and a data governance framework. |
| P3 | **Technology Independence** | Applications are independent of specific technology choices. | Vendor lock-in reduces flexibility and increases long-term cost. | Requires abstraction layers; vendor-specific APIs must not be embedded in business logic. |
| P4 | **Common Use of Components** | Shared, reusable services are preferred over duplication. | Reduces maintenance overhead and inconsistency. | Requires a service catalogue and a process for proposing new shared components. |
| P5 | **Compliance with Law** | All IT systems must comply with applicable laws and regulations. | Legal and regulatory obligations are non-negotiable constraints. | Requires a compliance catalogue; all architectures must pass legal/compliance review. |
| P6 | **Security by Design** | Security is a design-time concern, not a post-deployment addition. | Retrofitting security is expensive and incomplete. | All architectures must include a threat model; security sign-off is a Phase G gate. |
| P7 | **Single Source of Truth** | Each data entity has one authoritative source. | Multiple masters create inconsistency and reconciliation burden. | Requires source-of-record designation per entity; consumers reference, not duplicate. |
| P8 | **Maximise Enterprise Benefit** | Architecture decisions maximise benefit across the enterprise, not individual units. | Sub-optimisation at unit level destroys enterprise value. | Requires enterprise-wide impact assessment for all significant decisions. |

**Principle quality test:** if a principle's Implications column is empty or vague, it does not constrain choices — it is a platitude, not a principle. Every principle must make certain decisions easier to make and others harder to justify.

---

### Technique 3 — Architecture Team Structure

| Role | Responsibilities |
|---|---|
| **Chief Architect / EA Lead** | Overall vision; Architecture Board chair; escalation path |
| **Domain Architect — Business** | Phase B; liaison with strategy and business stakeholders |
| **Domain Architect — Data** | Phase C (Data); data governance integration |
| **Domain Architect — Application** | Phase C (Application); integration architecture |
| **Domain Architect — Technology** | Phase D; technology standards; cloud and infrastructure |
| **Architecture Practice Manager** | Repository management; process; tooling; onboarding |

---

### Technique 4 — Framework Tailoring

TOGAF is a starting point, not a straitjacket. Tailor by:

- **Selecting relevant ADM phases** — not all programmes need every phase at full depth
- **Integrating domain-specific methods** — SABSA for security, ArchiMate 3.2 for notation, C4 Model for software, BPMN 2.0 for process
- **Calibrating deliverable depth** — a startup needs a 2-page Architecture Vision; a regulated enterprise needs a formal TOGAF document
- **Selecting governance formality** — Advisory → Consultative → Mandating

| Tailoring decision | Options |
|---|---|
| Architecture notation | ArchiMate 3.2 (formal), C4 Model (developer-friendly), free-form diagrams |
| ADR management | Lightweight Markdown ADRs (this repo) vs. dedicated EA tool (Sparx EA, LeanIX) |
| Repository | MkDocs + Git (this site) vs. enterprise EA tooling |
| Governance formality | Advisory / Consultative / Mandating — choose per risk and maturity |

> **Source:** TOGAF tailoring guidance from TOGAF 10 Part II §5.3 Step 7 and Part I §2.3. The Advisory/Consultative/Mandating governance authority model is described in TOGAF 10 Part VI §44.3.

---

### Technique 5 — Architecture Repository (Minimum Viable)

The Architecture Repository is the structured store for all architecture artefacts. Full structure in [Architecture Repository](../reference/architecture-repository.md).

**Minimum viable structure for a small practice:**

```
architecture-repo/
├── principles/          ← Architecture Principles (this page)
├── architecture/        ← Domain architectures (Business, Application, Data, Technology)
├── standards/           ← Technology Standards Catalogue (Phase D)
├── adrs/                ← Architecture Decision Records
├── patterns/            ← Reusable architecture patterns
└── governance/          ← Board decisions, dispensations, compliance reviews
```

---

## Output Artifacts — Preliminary Phase Exit Criteria

- [ ] Architecture Principles document — agreed by Architecture Board and business sponsors
- [ ] Architecture Framework definition — which frameworks, tailored how
- [ ] Architecture team structure — roles, responsibilities, RACI
- [ ] Architecture governance model — Board charter, decision rights, escalation path
- [ ] Architecture Repository — set up and accessible to all architects
- [ ] Architecture tools — selected, configured, and documented
- [ ] Architecture Practice Charter — one page; scope, authority, principles, day-one guide

---

## Bloom Layer D — Tools

### Architecture Repository & Practice Tools

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **MkDocs Material + Git** | Architecture repository as a docs site (this site) | Free; version-controlled; diff-able; developer-friendly | No graph/analysis; limited query | Free (OSS) | [squidfunk.github.io/mkdocs-material](https://squidfunk.github.io/mkdocs-material/) |
| **Sparx Enterprise Architect** | Full TOGAF/ArchiMate repository; principles, models, decisions | Deep TOGAF support; built-in principle templates; ArchiMate 3.2 | Expensive; steep learning curve; Windows-centric | ~$229/user/yr | [sparxsystems.com](https://sparxsystems.com) |
| **LeanIX** | Enterprise architecture SaaS repository | Native capability maps; standards catalogue; tech radar; dashboards | Enterprise pricing; complex setup | Enterprise ($$$$) | [leanix.net](https://www.leanix.net) |
| **Confluence** | Principles documentation, Board minutes, team structure | Accessible; comment trails; version history | No structure enforcement; principles drift | Free (up to 10 users); from ~$5.75/user/mo | [atlassian.com/software/confluence](https://www.atlassian.com/software/confluence) |
| **Backstage (Spotify OSS)** | Software catalogue that makes principles visible at point of use | Developer portal; standards visible in context; plugin ecosystem | Requires platform team investment | Free (OSS) | [backstage.io](https://backstage.io) |

### Governance & Principles Standards

| Standard / Framework | Purpose in Preliminary | Link |
|---|---|---|
| **COBIT 2019** | IT governance objectives; APO03 = Managed Enterprise Architecture | [isaca.org/resources/cobit](https://www.isaca.org/resources/cobit) |
| **ISO/IEC 38500:2015** | IT governance principles (Responsibility, Strategy, Acquisition, Performance, Conformance, Human Behaviour) | [iso.org/standard/62816.html](https://www.iso.org/standard/62816.html) |
| **TOGAF 10 Chapter 20** | Architecture Principles: template, quality criteria, example set | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap20.html) |
| **ArchiMate 3.2** | Modelling notation for architecture artefacts in the repository | [pubs.opengroup.org/architecture/archimate3-doc](https://pubs.opengroup.org/architecture/archimate3-doc/) |

---

## Bloom Layer E — Decision Frameworks

| Preliminary decision | Lean towards when | Lean away when | Risk if wrong |
|---|---|---|---|
| **Mandating governance vs. advisory** | Repeated bypass of architecture decisions; regulatory environment; large number of teams | Strong cultural respect for architecture; small trusted team | Mandating without executive support → ignored; advisory in regulated context → compliance gap |
| **Heavy vs. light governance** | Many teams; high risk; regulated programme | Single team; greenfield product; early discovery | Too heavy: architects are bypassed; too light: no consistency |
| **Full TOGAF vs. tailored** | Multi-BU enterprise; standardisation matters; procurement requirement | Single team; startup; product-led organisation | Untailored TOGAF on a small team → overhead that kills adoption |
| **Many principles vs. few** | Mature practice; principles cited daily; large team | New practice — start with 6–8 and add as the practice matures | Too many: nobody remembers them; too few: gaps filled by ad-hoc decisions |
| **Centralised repository vs. distributed** | Compliance audit; multi-team; cross-domain artefacts | Small team; single domain; high velocity | Centralised without tooling → unused; distributed → artefacts never reconciled |

---

## Bloom Layer E — Judgment & Trade-offs

| Question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Architecture Board: internal vs. external chair** | Internal: authority is established; organisation trusts the practice | External: new practice; no internal credibility yet | Wrong chair: Board decisions are ignored or challenged on authority grounds |
| **Principles: prescriptive vs. guiding** | Prescriptive: regulated; large team; many junior decisions | Guiding: experienced team; high trust; speed matters | Too prescriptive: architects feel constrained; too guiding: every decision re-opens the principle |
| **Repository: tooling-first vs. process-first** | Process-first: always — tools without process produce structured noise | Never buy a tool before the process is clear | Tool-first: expensive EA tool sits empty; process-first: content lives in prose, easy to evolve |
| **Governance authority: advisory vs. mandating** | Always start advisory; earn the right to mandate through demonstrated value | Don't mandate before credibility and sponsorship are established | Mandate without credibility → shadow architecture; advisory forever → no real governance |
| **Tailoring: deep vs. shallow** | Shallow tailoring early; add depth as the practice matures | Avoid verbatim TOGAF application without assessing organisational fit | Too deep: architects spend more time on process than architecture; too shallow: no consistency |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** A mid-size retailer (500 engineers, 8 product squads, 3 acquired legacy platforms) has just hired its first Chief Architect. No architecture governance exists. The CTO has given a 6-month window to "get architecture organised" before a major cloud migration programme starts.

1. **Recall:** Name the five Preliminary Phase outputs and state what goes wrong if each is missing at the start of Phase A.
2. **Comprehension:** Explain why the Preliminary Phase is described as establishing "architecture capability" rather than "architecture" — and why this distinction matters.
3. **Application:** Write a complete Architecture Principle for "Security by Design" for this retailer. Fill in all four fields (Name, Statement, Rationale, Implications). Test your Implications column: does it constrain at least two specific decisions?
4. **Analysis:** The retailer has two existing IT governance processes (COBIT APO03 for EA, and a separate Risk & Compliance framework). Analyse how the Preliminary Phase should integrate with — not duplicate — these. What risks arise if they are treated independently?
5. **Evaluation:** The CTO wants to start Phase A immediately ("we need a vision document for the board next month, not governance"). Evaluate the risk. Under what conditions would you agree to proceed to Phase A without completing the Preliminary Phase? What minimum Preliminary outputs would you insist on?
6. **Synthesis:** Draft a one-page "Architecture Practice Charter" for this retailer. Include: scope, governance authority (with justification), the six most important principles (with Implications filled in), team structure, and a "day one" guide for a new architect joining the practice.

> Before you can architect anything, you must architect the architecture practice itself. The Preliminary Phase is not a formality — it is the investment that makes every subsequent hour of architecture work more valuable.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Architecture Principles first-draft** | "Draft 8 architecture principles for a [org type/size] organisation with [describe strategic context]. Use the TOGAF 4-component template: Name, Statement, Rationale, Implications." | Generic platitudes in the Implications column; principles that don't constrain anything |
| **Principle quality review** | "Here are our architecture principles: [paste]. For each, test whether the Implications column makes at least two specific decisions easier and two harder. Flag any that are platitudes." | May over-approve weak principles; check yourself |
| **Governance model design** | "Design an Architecture Board charter for a [describe organisation]. Include: scope, authority level (Advisory/Consultative/Mandating), membership, quorum, decision types, meeting cadence, and escalation path." | Board without real authority; no escalation path defined |
| **Framework tailoring** | "I am establishing a TOGAF-based architecture practice for [describe org]. Recommend how to tailor TOGAF: which phases to emphasise, which to lighten, and which domain-specific methods to integrate (security, data, cloud)." | May recommend full TOGAF verbatim; always ask for a scaled-down option |
| **Repository structure** | "Design a minimum viable Architecture Repository structure for a [team size] architecture team using Git + MkDocs. Include: principles, standards, ADRs, patterns, governance." | Over-complex structures that nobody maintains |

!!! warning "Bias to watch"
    LLMs produce Architecture Principles that sound authoritative but have no grounding in your organisation's actual strategic context, political constraints, or regulatory environment. Principles written by AI without organisational input are decorative — they will not be cited in real decisions.

---

## Common Mistakes

!!! danger "Skipping the Preliminary Phase entirely"
    Jumping to Phase A without principles, governance, or a repository means every engagement re-invents the wheel. Every hour saved skipping the Preliminary Phase is paid back with interest across every subsequent engagement.

!!! failure "Principles as platitudes"
    Principles like "be agile" or "use best practices" provide no decision guidance. A good principle must have testable implications. If a principle does not make some choices harder to justify, it is not a principle.

!!! warning "Architecture Board without authority"
    An Architecture Board that can only advise but never block will be ignored over time. Define the governance model's authority level explicitly and secure executive sponsorship before the first Board meeting.

!!! warning "Repository tool before process"
    Buying an enterprise architecture tool before the process is clear produces an expensive, structured empty database. Define what you will put in the repository and why before selecting the tool.

!!! tip "Start small, earn authority"
    A new architecture practice should start advisory, demonstrate value through well-reasoned decisions and quality artefacts, and earn the right to become mandating. Mandating governance imposed before trust is established will be routed around.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 5 | Primary standard | Authoritative Preliminary Phase steps and outputs | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap05.html) |
| TOGAF 10 Part III Chapter 20 | Standard | Architecture Principles: template, quality criteria, enterprise example set | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap20.html) |
| COBIT 2019 | Framework | IT governance objectives — APO03 (Managed Enterprise Architecture) | [isaca.org/resources/cobit](https://www.isaca.org/resources/cobit) |
| ISO/IEC 38500:2015 | Standard | Six IT governance principles; foundation for Architecture Board authority | [iso.org/standard/62816.html](https://www.iso.org/standard/62816.html) |
| ArchiMate 3.2 | Standard | Notation for architecture repository artefacts | [pubs.opengroup.org/architecture/archimate3-doc](https://pubs.opengroup.org/architecture/archimate3-doc/) |
| Team Topologies (Skelton & Pais — 2019) | Book | Architecture team structure; platform team as architecture enabler; cognitive load | [teamtopologies.com](https://teamtopologies.com) |
| Building Evolutionary Architectures (Ford, Parsons, Kua — 2017) | Book | Architecture principles as fitness functions; how to make principles testable | [oreilly.com](https://www.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/) |
| Accelerate (Forsgren, Humble, Kim — 2018) | Book | Organisational capability metrics; validates architecture practice investment | [itrevolution.com/accelerate-book](https://itrevolution.com/accelerate-book/) |
