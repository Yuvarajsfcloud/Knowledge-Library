# Requirements Management

**TOGAF Reference:** Part II, Chapter 14 — Requirements Management (Continuous)  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why Requirements Management matters to you:** As a developer you work from tickets, acceptance criteria, and user stories. These trace to product goals — and some of those goals derive from architectural drivers that nobody has made visible. Requirements Management is the architecture function that makes those traces explicit and bidirectional. It is the architecture equivalent of a living ADR + OKR log: every architectural decision traces back to a requirement; every requirement should trace forward to at least one architectural decision. When someone asks "why is the system designed this way?", Requirements Management is what makes that question answerable. When a requirement changes, Requirements Management is what identifies which architectural decisions must be revisited.

---

## Bloom Layer A — Quick Recall

**At a glance:** Requirements Management is the continuous ADM function that identifies, stores, maintains, and traces requirements to architecture decisions throughout the full ADM lifecycle.

| | |
|---|---|
| **Key outputs** | Requirements Repository; Requirements Traceability Matrix; Architecture Requirements Specification; Architecturally Significant Requirements (ASR) register |
| **TOGAF Chapter** | Part II, Chapter 14 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap14.html) |
| **Continuous function** | Requirements Management is not a single phase — it runs in parallel with every ADM phase |
| **Relationship to phases** | All ADM phases contribute requirements to and receive updated requirements from the Requirements Repository |
| **Developer analogy** | A living ADR + OKR log: every architectural decision traces to a requirement; every requirement traces to at least one architectural decision |

---

## Bloom Layer B — Conceptual Understanding

### Requirements Management as the ADM hub

``` mermaid
flowchart TD
    RM["Requirements Management\n(Continuous — Chapter 14)\n──────────────────────────\nRequirements Repository\nTraceability Matrix\nASR Register"]

    Prelim["Preliminary\n(Principles ← Requirements)"]
    A["Phase A\n(Vision ← Stakeholder requirements)"]
    B["Phase B\n(Business ← Business requirements)"]
    C["Phase C\n(Data + App ← Information requirements)"]
    D["Phase D\n(Technology ← Technology requirements)"]
    E["Phase E\n(Solutions ← Constraints + Gaps)"]
    F["Phase F\n(Migration ← Prioritised requirements)"]
    G["Phase G\n(Governance ← Compliance requirements)"]
    H["Phase H\n(Change ← Requirement change events)"]

    RM <-->|"feeds + receives"| Prelim
    RM <-->|"feeds + receives"| A
    RM <-->|"feeds + receives"| B
    RM <-->|"feeds + receives"| C
    RM <-->|"feeds + receives"| D
    RM <-->|"feeds + receives"| E
    RM <-->|"feeds + receives"| F
    RM <-->|"feeds + receives"| G
    RM <-->|"feeds + receives"| H

    style RM fill:#4F46E5,color:#fff,stroke:none
```

> **Source:** TOGAF 10 Part II §14.1 — "The Requirements Management process is central to all phases of the ADM." §14.2 defines Requirements Management as a continuous, bidirectional function that stores, maintains, and feeds requirements to all ADM phases, and receives updated requirements from them. The hub-and-spoke model reflects §14.3: every phase accesses the Requirements Repository.

**Why Requirements Management is continuous:** Unlike Phases A–H (which have start and end), requirements change continuously. A new regulatory requirement in Month 12 of an 18-month programme may change Phase C Data Architecture outputs that were approved in Month 3. Without continuous Requirements Management, that change is invisible to the architecture function until it is too late.

**Developer analogy extended:** The Requirements Repository is your product's living requirements database — like a combination of your product backlog (functional requirements), your SLO document (non-functional requirements), and your compliance matrix (regulatory requirements). The Traceability Matrix is the `CODEOWNERS` equivalent for requirements — it makes clear which architecture decisions are responsible for which requirements.

---

## Bloom Layer C — Guided Practice (Techniques)

Requirements Management has no numbered steps (it is a continuous function), but it has defined techniques and artefacts.

### Technique 1 — Requirements Classification

| Type | Definition | Examples | Primary ADM phase(s) |
|---|---|---|---|
| **Functional (FR)** | What the system must do | "System must process a payment in ≤ 3 seconds" | Phase B, C, E |
| **Non-Functional (NFR)** | How well the system does it | "99.9% availability; P95 response time ≤ 200ms" | Phase C, D |
| **Architectural Constraint** | Hard limits that constrain architectural choices | "Must comply with PCI-DSS v4.0; cloud provider is AWS only" | All phases |
| **Business Driver** | Strategic imperative that generates requirements | "Increase customer lifetime value by 15% (OKR)"; "Reduce infrastructure cost by 30%" | Phase A, B |
| **Regulatory Requirement** | Legal or compliance obligation | "GDPR Article 30 records of processing"; "FCA SYSC resilience requirements" | Phase C (Data), D, G |
| **Architecturally Significant Requirement (ASR)** | A requirement that has a material impact on the architecture — drives major design decisions | "99.99% availability for payment processing"; "Data must not leave EU" | All phases — flagged in ASR register |

> **Source:** Requirements classification adapted from TOGAF 10 §14.3 (Requirements Management process) and Bass, Clements & Kazman, *Software Architecture in Practice* (3rd ed. — SEI Series in Software Engineering, 2013) — Chapter 16: "Architecturally Significant Requirements are those that have a large influence on the structure of the architecture." The ISO 25010:2023 quality model provides the NFR taxonomy.

---

### Technique 2 — Requirements Register

The Requirements Register is the single source of truth for all architecture-level requirements.

| Req ID | Type | Description | Source | Priority | Status | Phase | ADR / Decision link |
|---|---|---|---|---|---|---|---|
| REQ-001 | NFR — Availability | Payment processing must achieve 99.99% availability (4-nines) | SLA with payment network | Must-have | Approved | Phase D | ADR-005 |
| REQ-002 | Regulatory | All customer PII must reside within EU boundaries (GDPR Article 44 — data transfer) | GDPR Article 44; DPO | Must-have | Approved | Phase C (Data), D | ADR-003 |
| REQ-003 | NFR — Performance | Customer-facing APIs must return P95 ≤ 200ms under peak load (2× average) | Business requirement | Should-have | Approved | Phase D | ADR-007 |
| REQ-004 | Architectural Constraint | All new services must authenticate via the approved Identity Provider (OAuth 2.0 / OIDC) | Architecture Principle P6 | Must-have | Approved | All phases | Architecture Contract AC-2026-001 |
| REQ-005 | Functional | Loyalty platform must support real-time points calculation per transaction | Product OKR | Should-have | In Review | Phase C (App) | Pending |
| REQ-006 | Business Driver | Reduce infrastructure cost by 30% over 3 years | CFO strategic objective | Want | Approved | Phase D, F | Architecture Roadmap |
| REQ-007 | NFR — Recovery | RTO ≤ 4 hours; RPO ≤ 1 hour for all Tier 1 systems | Business Continuity Policy | Must-have | Approved | Phase D | ADR-008 |
| REQ-008 | Regulatory | PCI-DSS v4.0 compliance for all components handling cardholder data | PCI-DSS v4.0; QSA | Must-have | In Progress | Phase C (Data), D, G | ADR-006; DR-2026-014 |

**Status values:**

| Status | Meaning |
|---|---|
| **Proposed** | Raised; not yet assessed by architecture team |
| **In Review** | Being assessed; not yet approved |
| **Approved** | Accepted into Architecture Requirements Specification; traceable to architectural decision |
| **Deferred** | Not in current ADM cycle scope; logged for future consideration |
| **Rejected** | Not accepted; reason documented |
| **Superseded** | Replaced by a newer requirement (previous version archived) |

---

### Technique 3 — ISO 25010:2023 NFR Quality Attributes

ISO 25010:2023 provides the taxonomy for non-functional quality characteristics. Use these as the structure for NFR elicitation.

| Quality Characteristic | Sub-characteristics | Architecture impact |
|---|---|---|
| **Functional Suitability** | Completeness, Correctness, Appropriateness | Phase B (capability coverage); Phase C (application portfolio gaps) |
| **Performance Efficiency** | Time behaviour (latency), Resource utilisation, Capacity | Phase D (infrastructure sizing); load testing targets |
| **Compatibility** | Co-existence, Interoperability | Phase C (integration catalogue); Phase D (integration standards) |
| **Interaction Capability** | Learnability, Operability, Accessibility | Phase C (user-facing components); Phase G (operability checklist) |
| **Reliability** | Availability, Fault Tolerance, Recoverability, Maturity | Phase D (HA design); Phase G (RTO/RPO compliance review) |
| **Security** | Confidentiality, Integrity, Non-repudiation, Accountability, Authenticity, Resistance | Phase C (PII flows); Phase D (network security); Phase G (OWASP) |
| **Maintainability** | Modularity, Reusability, Analysability, Modifiability, Testability | Phase C (service coupling); Phase D (deployment model) |
| **Portability** | Adaptability, Installability, Replaceability | Phase D (cloud portability); Architecture Principle P3 (technology independence) |

> **Source:** ISO/IEC 25010:2023 — Systems and Software Quality Requirements and Evaluation (SQuaRE). The quality model provides the standard taxonomy for non-functional requirements. The 2023 edition updates the 2011 version with revised characteristics. [iso.org/standard/35733.html](https://www.iso.org/standard/35733.html)

---

### Technique 4 — Architecturally Significant Requirements (ASRs)

Not all requirements are equal. An ASR is a requirement that materially shapes the structure of the architecture — it cannot be satisfied without making a significant architectural decision.

**ASR identification criteria (from Bass, Clements & Kazman):**
1. The requirement is a quality attribute goal (NFR) that conflicts with another quality attribute (e.g., performance vs. security)
2. Meeting the requirement significantly constrains the technology choices
3. Failure to meet the requirement has material business consequences (financial, regulatory, reputational)
4. The requirement will drive the system decomposition (service boundaries, data ownership, integration pattern)

**ASR Register:**

| ASR ID | Requirement | Why architecturally significant | Architecture decisions driven | Risk if unmet |
|---|---|---|---|---|
| ASR-01 | 99.99% availability for payment processing (REQ-001) | Requires multi-region active-active; no single point of failure in payment path; drives Phase D infrastructure | ADR-005: active-active in eu-west-1 + eu-west-2 | Payment network contract breach; revenue loss; regulatory report |
| ASR-02 | PII must not leave EU (REQ-002) | Constrains cloud region selection, DR strategy, third-party processors, CDN configuration | ADR-003: EU-only cloud regions; DPA reviews for all processors | GDPR Article 44 violation; ICO enforcement action |
| ASR-03 | P95 ≤ 200ms customer-facing (REQ-003) | Drives caching strategy, CDN use, API gateway design, database query optimisation approach | ADR-007: CDN for static assets; Redis cache for session; API gateway rate limiting | Customer experience degradation; NPS impact; SLA breach |
| ASR-04 | OAuth 2.0 / OIDC via approved IdP (REQ-004) | All services must integrate with single Identity Provider; drives token validation architecture | Architecture Contract AC-2026-001 §2 | Security inconsistency; identity sprawl; Phase G compliance failure |
| ASR-05 | RTO ≤ 4 hours; RPO ≤ 1 hour (REQ-007) | Requires synchronous replication; automated failover; DR playbooks; backup frequency architecture | ADR-008: synchronous replication for Tier 1; async for Tier 2 | Business Continuity Plan failure; audit finding; regulator notification |

> **Source:** ASR concept and identification criteria from Bass, Clements & Kazman, *Software Architecture in Practice* (3rd ed. — SEI, 2013), Chapter 16. The ASR format (ID, requirement, why significant, decisions driven, risk) is adapted from the SEI Quality Attribute Workshop (QAW) method.

---

### Technique 5 — Requirements Traceability Matrix

The Traceability Matrix maps each requirement to the architecture decision(s) that address it, and the delivery artefact(s) that implement it.

| Req ID | Requirement (summary) | ADM Phase | Architecture Decision | Delivery Artefact | Status |
|---|---|---|---|---|---|
| REQ-001 | 99.99% payment availability | Phase D | ADR-005: multi-region active-active | Platform Architecture design; DR runbook | Implemented |
| REQ-002 | PII in EU only | Phase C (Data), D | ADR-003: EU regions only; DPA for all processors | Data residency policy; Salesforce DPA | Implemented |
| REQ-003 | P95 ≤ 200ms | Phase D | ADR-007: CDN + Redis | CDN configuration; cache implementation | In Progress |
| REQ-004 | OAuth 2.0 / OIDC | All phases | AC-2026-001 Architecture Contract | IdP integration guide; all service auth implementations | Implemented |
| REQ-005 | Real-time loyalty points | Phase C (App) | Pending Phase C decision | Not yet | Pending |
| REQ-006 | 30% cost reduction | Phase D, F | Architecture Roadmap | Cloud cost report; roadmap milestones | In Progress |
| REQ-007 | RTO ≤ 4h; RPO ≤ 1h | Phase D | ADR-008: sync replication | DR test results; BCP documentation | Implemented |
| REQ-008 | PCI-DSS v4.0 | Phase C (Data), D, G | ADR-006; DR-2026-014 (dispensation) | PCI QSA assessment; remediation plan | In Progress |

**Traceability completeness check:** Every row in the Requirements Register must have at least one Architecture Decision reference. A requirement without a decision reference is an architectural blind spot — the requirement is known but not addressed.

---

### Technique 6 — Requirements Change Management

When a requirement changes (business pivot, new regulation, stakeholder re-prioritisation), the impact must be assessed across the traceability chain.

``` mermaid
flowchart TD
    Change["Requirement change event\n(new regulation, business pivot,\nstakeholder decision)"]
    Assess["Assess impact on\nRequirements Register\n(which requirements are affected?)"]
    Trace["Trace to Architecture Decisions\nvia Traceability Matrix\n(which decisions must be revisited?)"]
    Phase["Identify ADM re-entry point\n(which phases must be updated?)"]
    H["Raise Phase H\nChange Request if significant"]
    Update["Update Requirements Register\n+ Traceability Matrix\n+ affected architecture artefacts"]

    Change --> Assess --> Trace --> Phase
    Phase -->|"Class 2 or 3"| H
    Phase -->|"Class 1"| Update
    H --> Update

    style Change fill:#c0392b,color:#fff,stroke:none
    style H fill:#4F46E5,color:#fff,stroke:none
    style Update fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** Requirements change flow derived from TOGAF 10 §14.3 — "When requirements change, the Requirements Management process assesses the impact on the architecture." The Class 1/2/3 decision point links to TOGAF 10 Chapter 13 (Phase H Change Management) ADM re-entry criteria.

---

## Bloom Layer D — Tools

### Requirements Management Tools

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **Jira** | Requirements as epics/stories; traceability via links | Familiar to delivery teams; integrates with development workflow | No formal traceability; requirements easily confused with user stories | Basic free; Premium ~$17/user/mo | [atlassian.com/software/jira](https://www.atlassian.com/software/jira) |
| **Confluence** | Requirements documentation, register, traceability matrix | Version history; accessible; comment trails | No structured model; requirements drift to unstructured prose | Free (up to 10 users); from $5.75/user/mo | [atlassian.com/software/confluence](https://www.atlassian.com/software/confluence) |
| **Sparx Enterprise Architect** | Full TOGAF/TOGAF requirements management; formal traceability; ArchiMate integration | Native TOGAF support; formal traceability; requirement types | Expensive; steep learning curve | ~$229/user/yr | [sparxsystems.com](https://sparxsystems.com) |
| **IBM DOORS Next** | Enterprise requirements management; traceability; baselining | Industry standard for regulated environments; formal baselining | Very expensive; heavyweight; primarily aerospace/defence oriented | Enterprise ($$$$$) | [ibm.com/products/requirements-management](https://www.ibm.com/products/requirements-management) |
| **Markdown + Git (lightweight)** | Requirements as Markdown tables in the architecture repository | Free; version-controlled; diff-able; developer-friendly | No graph/analysis; no impact analysis tooling | Free | [git-scm.com](https://git-scm.com) |
| **Azure DevOps (Work Items)** | Requirements as work items with traceability links | Integrates with Azure Boards; test linkage; Microsoft ecosystem | Microsoft-only; limited architecture context | Azure DevOps Basic ~$6/user/mo | [azure.microsoft.com/products/devops](https://azure.microsoft.com/products/devops) |

### Standards for Requirements

| Standard / Framework | Purpose in Requirements Management | Link |
|---|---|---|
| **ISO 25010:2023** | NFR quality attributes taxonomy — the definitive NFR classification model | [iso.org/standard/35733](https://www.iso.org/standard/35733.html) |
| **ISO/IEC/IEEE 29148:2018** | Systems and software requirements engineering — elicitation, analysis, specification | [iso.org/standard/72089](https://www.iso.org/standard/72089.html) |
| **TOGAF 10 Chapter 14** | Requirements Management: authoritative ADM hub description | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap14.html) |
| **TOGAF 10 Part III Chapter 22** | Architecture Requirements Specification artefact structure | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap22.html) |

---

## Bloom Layer E — Decision Frameworks

| Requirements decision | Lean towards when | Lean away when | Risk if wrong |
|---|---|---|---|
| **Architecturally Significant vs. standard NFR** | ASR: requirement materially constrains technology or drives decomposition | Standard NFR: requirement is a target measurable within the existing architecture | Misclassify standard as ASR: over-engineering; misclassify ASR as standard: requirement not addressed at architecture level |
| **Must-have vs. should-have NFR** | Must-have: failure has regulatory, contractual, or safety consequences | Should-have: business preference; can be traded against cost | Wrong tier: must-have treated as should-have → compliance failure; should-have as must-have → over-investment |
| **Requirements Register in architecture tool vs. Jira** | Architecture tool (Sparx EA, LeanIX): formal traceability required; large programme; regulated | Jira/Confluence: small programme; agile; low formality | Architecture tool without process: expensive, unused; Jira without traceability discipline: requirements lost in the backlog |
| **Functional vs. architectural decision** | Architectural: the decision drives system structure, technology choice, or cross-team boundaries | Functional: the decision is about what the system does for a user, within the existing architecture | Wrong distinction: functional decisions escalated to Architecture Board waste Board time; architectural decisions made without board lose governance |
| **Requirements baseline: formal baseline vs. living document** | Formal baseline: regulated programme; fixed-price contract; audit required | Living document: agile; small team; continuous delivery | Baseline for agile programme: overhead; living document in regulated context: no audit trail |

---

## Bloom Layer E — Judgment & Trade-offs

| Question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Trace every requirement vs. trace only ASRs** | Trace every requirement: regulated programme; compliance audit required | Trace only ASRs: small team; agile; pragmatic; full traceability overhead too high | Trace everything without discipline: traceability matrix out of date within weeks; trace nothing: architecture decisions cannot be justified |
| **Requirements elicitation: workshops vs. interviews** | Workshops: multiple stakeholders; cross-cutting requirements; conflict resolution needed | Interviews: sensitive political context; executive stakeholder; individual perspective needed | Workshops only: quiet stakeholders never contribute; interviews only: inconsistent vocabulary; requirements not reconciled |
| **NFR targets: aspirational vs. contractual** | Contractual (SLA): customer-facing; regulated; payment processing | Aspirational: internal systems; exploratory; early-stage | Aspirational treated as contractual: team commits to targets without architecture to support them; contractual with no enforcement: SLA is fiction |
| **Requirements change: absorb vs. Phase H** | Absorb: requirement change is within scope; no architecture decision changes | Phase H: requirement change requires new architecture decision or changes an approved ADR | Absorb when Phase H is needed: architecture drifts; Phase H for trivial changes: governance overhead blocks agility |
| **ASR register: formal document vs. ADR labels** | Formal ASR register: enterprise architecture practice; multiple architects | ADR labels (tag ASRs in ADR metadata): small team; developer-centric practice | Formal register without maintenance: stale; ADR labels without register: no consolidated ASR view for stakeholder reporting |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** A financial services firm (600 engineers, GDPR applicable, FCA regulated, ISO 27001 certified) is beginning Phase A of a new ADM cycle for a "Real-Time Payments Modernisation" programme. The architecture team has inherited three years of informal requirements spread across: a Confluence wiki (unstructured), Jira epics (no formal type classification), and a Word document called "NFR targets v2 FINAL UPDATED.docx" that has not been updated in 18 months.

1. **Recall:** Name the 6 requirement types in the Requirements Classification table. For this payments programme, give one example of each type that would be credible in this context.
2. **Comprehension:** Explain why Requirements Management is described as a "continuous" ADM function rather than a phase — and give three concrete examples from this scenario where a requirement change during Phase C or D would require the Requirements Repository to be updated.
3. **Application:** From the scenario, identify at least 3 likely Architecturally Significant Requirements. For each, complete all 5 fields of the ASR register (ID, requirement, why significant, architecture decisions driven, risk if unmet).
4. **Analysis:** The team has 200 informal requirements in Confluence, Jira, and the Word document. Analyse the process for consolidating them into a formal Requirements Register. What criteria would you use to classify, prioritise, and discard requirements? How would you handle conflicts between sources?
5. **Evaluation:** The programme manager wants to use Jira stories as the Requirements Register ("we already have Jira"). Evaluate this approach against the criteria for Requirements Management (traceability, classification, ASR identification, change impact assessment). What must be added to Jira to make it adequate — and what can Jira never do that a formal requirements tool can?
6. **Synthesis:** Design a "Requirements Management Plan" for this programme. Include: the artefacts you will produce (register, ASR register, traceability matrix), the tools you will use (justified), the process for requirements elicitation (workshops and interviews — who, when), the process for requirements change (how a changed regulation triggers a Phase H CR), and how you will demonstrate compliance with FCA resilience requirements through the traceability chain.

> Good Requirements Management is not about capturing everything everyone has ever said. It is about making explicit the small number of requirements that matter architecturally — and ensuring that every architecture decision can be traced back to why it exists.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Requirements classification** | "Given this list of requirements [paste], classify each as: Functional, Non-Functional, Architectural Constraint, Business Driver, Regulatory Requirement, or ASR. For ASRs, explain why each materially shapes the architecture." | May misclassify regulatory requirements as functional; may identify too many ASRs (every NFR) or too few |
| **ASR identification** | "Given this description of a [system/programme], identify 5 Architecturally Significant Requirements. For each: state the requirement, explain why it is architecturally significant (constrains technology choices or drives decomposition), and describe the architecture decisions it drives." | Generic ASRs (e.g., "must be secure") without specificity; challenge any ASR that doesn't constrain technology choices |
| **Requirements Register first-draft** | "Generate a Requirements Register table for a [programme type]. Columns: Req ID, Type, Description, Source, Priority (Must/Should/Want), Status, Phase, ADR/Decision link. Include at least 2 examples of each type." | Invented regulatory requirements; verify all regulatory requirements against actual applicable standards |
| **Traceability Matrix** | "Given this Requirements Register [paste] and these architecture decisions [list ADRs], produce a Requirements Traceability Matrix. Flag any requirements with no decision reference as 'gaps'." | May create false traces; validate that the decision actually addresses the requirement |
| **NFR elicitation** | "Using the ISO 25010:2023 quality model, generate an NFR elicitation checklist for a [system type]. For each quality characteristic, generate 2 questions an architect should ask stakeholders, and 1 sample NFR target." | Generic questions; tailor to your system type and stakeholder vocabulary |

!!! warning "Bias to watch"
    LLMs routinely conflate requirements with design decisions. A requirement states *what is needed* (e.g., "99.99% availability"); a design decision states *how it will be achieved* (e.g., "multi-region active-active deployment"). If an AI-generated requirement contains a technology choice, it is a design decision masquerading as a requirement — extract the underlying requirement and move the technology choice to an ADR.

---

## Common Mistakes

!!! danger "Requirements as user stories only"
    Jira user stories capture functional requirements from a user perspective. They do not capture NFRs, architectural constraints, regulatory requirements, or ASRs. A requirements register built entirely from Jira stories will miss every NFR and every regulatory obligation. This is one of the most common causes of NFR failures discovered at Phase G compliance review.

!!! failure "No traceability — requirements without decisions"
    A requirements register without a traceability matrix is a list, not a governance artefact. If you cannot trace from a requirement to an architecture decision, you cannot demonstrate that the requirement has been addressed. This fails TOGAF Phase G compliance review and regulatory audit alike.

!!! warning "Duplicating the Judgment & Trade-offs section"
    A common Requirements Management document anti-pattern: the Judgment & Trade-offs section is copy-pasted or repeated within the document. Each governance topic must appear exactly once. If you find duplication in an architecture document, treat it as a content review finding and remove the duplicate.

!!! tip "Start with ASRs, not with all requirements"
    Beginning a new ADM cycle by eliciting all requirements from scratch is overwhelming and produces noise. Start by identifying the 5–10 Architecturally Significant Requirements — those that will drive the most important architecture decisions. Once ASRs are clear, the full requirements elaboration has context and direction.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 14 | Primary standard | Authoritative Requirements Management: process, artefacts, ADM integration | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap14.html) |
| TOGAF 10 Part III Chapter 22 | Standard | Architecture Requirements Specification artefact — structure and content | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap22.html) |
| ISO 25010:2023 | Standard | NFR quality attributes taxonomy — the definitive classification model | [iso.org/standard/35733](https://www.iso.org/standard/35733.html) |
| ISO/IEC/IEEE 29148:2018 | Standard | Requirements engineering — elicitation, analysis, specification, verification | [iso.org/standard/72089](https://www.iso.org/standard/72089.html) |
| Software Architecture in Practice (Bass, Clements & Kazman — 3rd ed. 2013) | Book | ASR concept; Quality Attribute Workshop (QAW) method; quality attribute scenarios | [sei.cmu.edu](https://www.sei.cmu.edu/our-work/publications/index.cfm?customel_datapageid_4791=21376) |
| Designing Software Architectures (Cervantes & Kazman — 2016) | Book | ADD method; ASR-driven architecture design; attribute-driven design | [sei.cmu.edu](https://www.sei.cmu.edu/our-work/publications/index.cfm?customel_datapageid_4791=21383) |
| The Art of Requirements Elicitation (Robertson & Robertson — 2012) | Book | Volere requirements process; NFR template; elicitation techniques | [volere.org](https://www.volere.org) |
| DAMA DMBOK 2nd Ed. | Reference | Data requirements management — data quality requirements, data governance requirements | [dama.org/cpages/body-of-knowledge](https://www.dama.org/cpages/body-of-knowledge) |
