# Architecture Governance

**TOGAF Reference:** Part VI, Chapters 44–48 — Architecture Governance  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why governance matters to you:** You already practice governance as a developer — every pull request, code review, branch protection rule, and CI gate is a governance mechanism. Architecture governance applies the same discipline at the decision-making layer above code: *Who can approve a new technology standard? How is an exception recorded? What happens when a team's architecture deviates from the approved design?* Without governance, architecture is opinion. With governance, it is policy — and policy has consequences, accountability, and an appeal process.

---

## Bloom Layer A — Quick Recall

**At a glance:** Architecture Governance is the framework for managing, monitoring, and controlling architecture across the enterprise to ensure architectures are implemented as intended and remain fit for purpose.

| | |
|---|---|
| **The four operational artefacts** | Architecture Contract · Compliance Review · Dispensation · Architecture Board |
| **TOGAF chapters** | Part VI Ch 44 (Overview), Ch 45 (Framework), Ch 46 (Governance Processes) — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap44.html) |
| **Governance without all four** | Theatre — decisions are made but not enforced; deviations are not recorded; the architecture drifts from its intended target |
| **Developer analogy** | Architecture Contract = PR description + acceptance criteria; Compliance Review = code review; Dispensation = exception request via tech debt ticket; Architecture Board = engineering chapter or technical steering committee |
| **Related frameworks** | COBIT 2019 (IT governance), ISO/IEC 38500 (IT governance principles), TOGAF Architecture Compliance (Ch 48) |

---

## Bloom Layer B — Conceptual Understanding

### How governance fits into the TOGAF ADM

Architecture Governance is not a single phase — it runs in parallel with all ADM phases (primarily operationalised in Phases G and H). It is the system that ensures architecture decisions *made* in Phases A–F are *implemented* and *maintained* in delivery.

``` mermaid
flowchart LR
    subgraph Corp["Corporate Governance\n(Board / Executive)"]
        direction TB
        BOD["Board of Directors\n& Executive"]
    end
    subgraph IT["IT Governance\n(COBIT / ISO 38500)"]
        direction TB
        CIO["CIO / IT Steering\nCommittee"]
    end
    subgraph EA["Architecture Governance\n(TOGAF Part VI)"]
        direction TB
        CAB["Architecture Board"]
        CA["Chief Architect /\nEA Lead"]
        DA["Domain Architects\n(Business, Data, App, Tech)"]
        CA --> DA
    end
    subgraph PD["Project / Delivery\nGovernance"]
        direction TB
        PM["Programme Manager"]
        TL["Tech Leads / Squads"]
    end

    Corp --> IT --> EA --> PD

    style Corp fill:#37474f,color:#fff,stroke:none
    style IT fill:#4051b5,color:#fff,stroke:none
    style EA fill:#2e7d32,color:#fff,stroke:none
    style PD fill:#6a1b9a,color:#fff,stroke:none
```

> **Source:** Governance hierarchy adapted from TOGAF 10 Part VI §44.3 (Governance Framework). Corporate → IT → Architecture → Project cascade reflects the TOGAF Architecture Governance definition: "the practice and orientation by which Enterprise Architectures and other architectures are managed and controlled." IT Governance tier aligns with COBIT 2019 governance domain (ISACA).

**Why this hierarchy matters:** Architecture governance is *delegated* from corporate governance. This means:

1. Architecture decisions have real authority — they are not suggestions
2. The Architecture Board can be overruled — but only through the escalation path, not by ignoring it
3. Governance decisions must be documented — they create an audit trail up to corporate

**Developer analogy:** Branch protection rules are enforced by the repository platform (corporate governance). The engineering chapter sets the rules (architecture governance). The squad follows them (project governance). Any exception goes through a documented process — not a Slack message.

---

## Bloom Layer C — Guided Practice

### The Architecture Board

The Architecture Board is the governance body responsible for maintaining and administering architecture principles, standards, and frameworks. Defined in TOGAF 10 Part VI §44.4.

| Aspect | Definition |
|---|---|
| **Authority** | Mandating — can block non-compliant architectures from production |
| **Chair** | Chief Architect (or delegate) |
| **Members** | Chief Architect, Domain Architects (Business, Data, App, Technology), CISO, CTO delegate |
| **Quorum** | 3 members including Chair |
| **Meeting cadence** | Monthly (standing); ad-hoc for urgent decisions |
| **Decisions by** | Consensus; escalation to CTO if deadlocked |

#### Board Responsibilities

| Responsibility | Description |
|---|---|
| **Principles governance** | Approve, update, and communicate architecture principles |
| **Standards governance** | Approve technology standards; manage the Standards Information Base |
| **ADR review** | Review and formally accept high-impact Architecture Decision Records |
| **Compliance oversight** | Review compliance reports; issue remediation directives |
| **Dispensation decisions** | Approve or reject requests to deviate from standards |
| **Change management** | Decide on Architecture Change Requests |
| **Architecture Programme** | Oversee architecture work; approve Statements of Architecture Work |

#### RACI Matrix

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

> **Source:** RACI model for architecture governance decisions adapted from TOGAF 10 Part VI §44.4 and COBIT 2019 RACI chart for APO03 (Managed Enterprise Architecture). The four RACI roles follow the COBIT 2019 governance and management objectives model.

---

### Process 1 — Architecture Contract Lifecycle

**What it is:** The Architecture Contract is the joint agreement between development partners and sponsors on the deliverables, quality, and fitness-for-purpose of an architecture. It formalises the accountability for implementation.

**Developer analogy:** A merge checklist + automated CI gate combo — the squad agrees upfront what definition-of-done means, the architect countersigns, and no production deployment goes out without the compliance review passing.

``` mermaid
flowchart LR
    A["Architecture\nBrief / ADD\ncomplete"] --> B["Draft Contract\n(architect + squad)"]
    B --> C["Review with\nSquad Lead"]
    C --> D["Board Approval\n& Signature"]
    D --> E["Implementation\nBegins"]
    E --> F["Compliance Review\n(mid-point)"]
    F --> G{"Compliant?"}
    G -- Yes --> H["Compliance Review\n(pre-production)"]
    H --> I["Contract Closed\n✓ Architecture\nRemedied"]
    G -- No --> J["Remediation Plan\n(time-boxed)"]
    J --> F

    style A fill:#37474f,color:#fff,stroke:none
    style I fill:#2e7d32,color:#fff,stroke:none
    style G fill:#e65100,color:#fff,stroke:none
    style J fill:#c62828,color:#fff,stroke:none
```

> **Source:** Architecture Contract process from TOGAF 10 Part VI §46.3 (Architecture Contracts). Compliance Review trigger points (mid-point and pre-production) align with TOGAF Architecture Compliance §48.2.

**Architecture Contract — minimum content:**

```markdown
## Architecture Contract — {AC-NNN}

**Project / Work Package:** {Name}
**Version:** 1.0
**Lead Architect:** {Name}
**Squad Tech Lead:** {Name}
**Approved by Architecture Board:** {Date}

### 1. Architecture Summary
{One paragraph describing the approved architecture}

### 2. Technology Standards Referenced
{List approved standards this work package must conform to}

### 3. Architecture Principles Applied
{List of principles from the Architecture Principles catalogue}

### 4. Non-Functional Requirements
{SLOs, RTO/RPO, security requirements — measurable}

### 5. Compliance Checkpoints
| Review Type | Trigger | Reviewer |
|---|---|---|
| Mid-point compliance review | {Milestone} | Lead Architect |
| Pre-production compliance review | {Release gate} | Lead Architect + CISO |

### 6. Dispensations
{Any approved deviations from standards — reference dispensation number}

### 7. Accepted Risks
{Risks accepted at time of approval — with owner}

### Signatures
| Role | Name | Date |
|---|---|---|
| Lead Architect | | |
| Squad Tech Lead | | |
| Architecture Board Chair | | |
```

---

### Process 2 — Dispensation Lifecycle

**What it is:** A dispensation is a formal, time-limited exception to an architecture standard. It is *not* a bypass — it is a recorded, approved deviation with an owner, rationale, and expiry.

**Developer analogy:** A technical debt ticket with an SLA — "we're doing X instead of the standard Y because of Z constraint; this exception is approved until {date}; {owner} is responsible for remediation."

``` mermaid
flowchart LR
    A["Squad identifies\nrequired deviation"] --> B["Submit Dispensation\nRequest\n(form + rationale)"]
    B --> C["Board review\nat next meeting\n(or urgent slot)"]
    C --> D{Decision}
    D -- Approved --> E["Log dispensation\nRecord in Governance Log\nSet review date"]
    D -- Rejected --> F["Squad must comply\nor escalate to CTO"]
    D -- Conditional --> G["Approve with time limit\n& remediation plan\n(most common outcome)"]

    E --> H{Temporary?}
    H -- Yes --> I["Review at\nexpiry date"]
    I --> D
    H -- No --> J["Propose standard update\nvia normal change process"]

    style A fill:#37474f,color:#fff,stroke:none
    style E fill:#2e7d32,color:#fff,stroke:none
    style F fill:#c62828,color:#fff,stroke:none
    style D fill:#e65100,color:#fff,stroke:none
    style G fill:#4051b5,color:#fff,stroke:none
```

> **Source:** Dispensation process from TOGAF 10 Part VI §46.4 (Architecture Dispensations). Conditional approval with time-limit pattern (most common real-world outcome) reflects the TOGAF guidance that "permanent dispensations should be avoided."

---

### Process 3 — Architecture Review Cadence

| Review Type | Frequency | Scope | Participants |
|---|---|---|---|
| Architecture Office Hours | Weekly (30 min) | Open Q&A; unblock decisions | Architect + Tech Leads |
| Architecture Board | Monthly | Principles, standards, ACRs, dispensations | Board members |
| Compliance Review — mid-implementation | Per work package milestone | Conformance to contract | Lead Architect + Squad Lead |
| Compliance Review — pre-production | Per production release | Full compliance checklist | Lead Architect + Squad + CISO |
| Architecture Health Review | Quarterly | SLOs, DORA, tech debt, technology radar | Architecture team + Engineering leads |
| Annual Architecture Review | Annual | Principles refresh, standards update, landscape review | Board + CTO |

---

### Governance Log Structure

Maintain a complete, immutable log of all governance decisions. Without this log, governance is unauditable and cannot be escalated.

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

#### {n}. {Item title}
**Presented by:** {Name}
**Summary:** {Brief description}
**Decision:** {Approved / Rejected / Deferred / Conditional}
**Rationale:** {Why}
**Action:** {Who does what by when}

### Actions from Previous Meeting
| Action | Owner | Due | Status |
|---|---|---|---|

### Next Meeting
{Date, time, dial-in link}
```

---

### Architecture Maturity Model

| Level | Name | Description | Indicators |
|---|---|---|---|
| **1** | Initial | Ad-hoc; no repeatable process | No principles, no governance, heroics dominate |
| **2** | Managed | Processes exist; inconsistently applied | Principles documented; not enforced; ADRs informal |
| **3** | Defined | Consistent, documented, practised | Principles + standards + ADRs + contracts in use |
| **4** | Quantitatively Managed | Measured; fitness functions running | DORA metrics + SLO dashboards + automated gates |
| **5** | Optimising | Continuously improving; self-correcting | Fitness functions in CI; automatic deviation feedback |

> **Source:** Maturity model levels adapted from CMMI Institute Maturity Level definitions (CMMI v2.0) and TOGAF 10 Architecture Governance maturity guidance. DORA metrics at Level 4 from *Accelerate* (Forsgren, Humble, Kim — 2018). Fitness functions at Level 5 from *Building Evolutionary Architectures* (Ford, Parsons, Kua — 2017).

**Target:** Level 3 is the minimum for a well-run architecture practice. Level 4 requires investment in tooling and measurement culture. Level 5 is aspirational for most organisations.

---

## Output Artifacts — Governance Cadence Outputs

- [ ] Architecture Board meeting minutes — per meeting, stored in governance log
- [ ] Architecture Contracts — per approved work package
- [ ] Compliance Review reports — per contract, at mid-point and pre-production
- [ ] Dispensation register — all approved deviations with owner and expiry
- [ ] Architecture Change Request log — all accepted changes with rationale
- [ ] Architecture Maturity Assessment — quarterly or annual
- [ ] Governance metrics report — dispensation rate, compliance pass rate, time-to-decision

---

## Bloom Layer D — Tools

### Architecture Repository & Governance Tools

| Tool | Purpose in governance | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **LeanIX** | Enterprise Architecture repository — standards catalogue, dispensation tracking, health monitoring | Built-in governance workflows; compliance dashboard; technology radar native; integration with Jira | Enterprise pricing; complex setup; can become a management reporting tool rather than an architect's tool | Enterprise ($$$$) | [leanix.net](https://www.leanix.net) |
| **Confluence** | Architecture Decision Records, board minutes, contract templates, governance log | Accessible to all stakeholders; comment trails; version history; free tier | No structure enforcement; documents drift unless templates are mandated | Free (Cloud Starter up to 10 users); from ~$5.75/user/mo | [atlassian.com/software/confluence](https://www.atlassian.com/software/confluence) |
| **ADR Tools (adr-tools / log4brains)** | Lightweight ADR management in Git | Git-native; diffs in PRs; zero tooling cost; developer-friendly | No formal workflow; no board approval tracking | Free (open source) | [github.com/npryce/adr-tools](https://github.com/npryce/adr-tools) |
| **ServiceNow (EA module)** | Enterprise governance at scale — CMDB, change control, compliance | Integrates with ITSM; audit trail; risk management | Very expensive; requires admin resource; overkill for most organisations | Enterprise ($$$$$) | [servicenow.com](https://www.servicenow.com) |
| **Backstage (Spotify OSS)** | Developer-facing software catalogue with standards visibility | Standards visible to developers at point of use; plugin ecosystem; free | Requires platform team investment to maintain; steep initial setup | Free (OSS); managed versions available | [backstage.io](https://backstage.io) |

### Governance Automation Tools

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **Open Policy Agent (OPA)** | Policy-as-code — enforce governance rules in CI/CD and infrastructure | Rego policy language; integrates with Kubernetes, Terraform, APIs; real compliance (not just documentation) | Rego syntax learning curve; policies require maintenance | Free (OSS) | [openpolicyagent.org](https://www.openpolicyagent.org) |
| **Checkov** | IaC compliance — static analysis for Terraform, CloudFormation, K8s manifests | Catches misconfigs at source; CI integration; 1000+ built-in policies | Noisy; needs rule tuning; only covers IaC layer | Free (OSS); Prisma Cloud paid | [checkov.io](https://www.checkov.io) |
| **GitHub Branch Protection + CODEOWNERS** | Enforce review gates on architecture-sensitive files | Native to Git workflow; no additional tooling | Limited to file-level control; no ADR workflow | Included in GitHub | [docs.github.com/en/repositories/configuring-branches-and-merges/about-protected-branches](https://docs.github.com/en/repositories/configuring-branches-and-merges/about-protected-branches) |
| **Dependency Track** | Software composition analysis — track approved/prohibited libraries | Continuous visibility of dependency compliance; CVE alerts | Requires pipeline integration; data quality depends on SBOM quality | Free (OSS) | [dependencytrack.org](https://dependencytrack.org) |

---

## Bloom Layer E — Decision Frameworks

| Governance decision | Lean towards when | Lean away when | Risk if wrong |
|---|---|---|---|
| **Block deployment vs. conditional approval** | Clear principle breach; security / compliance risk; pattern that sets a bad precedent | One-off tactical decision; business critical deadline; mitigation plan exists | Unconditional block: adversarial relationship with delivery; rubber-stamp conditional: governance theatre |
| **Time-limited dispensation vs. permanent exception** | Always prefer time-limited | Only accept permanent if the standard itself is wrong (→ update the standard) | Permanent exceptions accumulate → the standard becomes the exception |
| **Automate governance (CI gate) vs. manual review** | High-frequency decision; clear pass/fail criteria; developer self-service needed | Judgement required; novel scenario; first use of a pattern | Manual-only: governance bottleneck; auto-only: false sense of compliance without judgement |
| **Strict enforcement vs. advisory** | Regulated industry; security requirement; foundational architecture principle | Experimental / innovation track; voluntary compliance culture being built | Strict without tooling = undetected drift; advisory without follow-up = no governance at all |
| **Architecture Board decision vs. delegate to Chief Architect** | Novel precedent; cross-domain impact; contentious | Routine standard update; low-risk addition within established pattern | Underdelegating: board bottleneck; overdelegating: loss of collective accountability |

---

## Bloom Layer E — Judgment & Trade-offs

| Governance question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Many governance artefacts vs. lean set** | Large programme; regulated; many teams; audit obligation | Small team; fast-moving; trust is high; low compliance risk | Too many artefacts → overhead > value; governance abandoned informally while appearing to exist |
| **Frequent review cadence vs. monthly** | Rapid change; high-risk domain; new team/practice | Stable architecture; experienced team; low change rate | Too frequent: governance fatigue; too infrequent: drift accumulates between reviews |
| **Dispensation granted vs. rejected** | Tactical timeline; clear plan to remediate; risk is bounded | No remediation plan; breach is a security risk; sets a precedent that breaks the standard | Granted without plan: dispensation never remediated; permanent drift; rejected without reason: adversarial relationship with squads |
| **Principles-based governance vs. rules-based** | Experienced team; trust is established; principles understood | Compliance requirement; junior team; novel domain | Principles-only: difficult to enforce; rules-only: brittle; teams comply with letter, not spirit |
| **Governance as a gate vs. enabling function** | Always enable first; governance should help teams succeed | Never purely punitive | Purely punitive governance → shadow architecture; teams route around the board rather than through it |
| **Standards refresh: annual vs. as-needed** | Annual at minimum; ad-hoc for urgent security or deprecation events | Never "set and forget" standards; always time-box | Stale standards → teams ignore them; standards that never change → the standard doesn't reflect reality |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** A fintech startup (200 engineers, 12 product squads) has been acquired by a tier-2 bank (4000 employees, regulated, ISO 27001, SOC 2 Type II obligations). The bank's governance framework must be applied to the fintech's engineering practice within 18 months. No architecture governance currently exists at the fintech.

1. **Recall:** Name the four operational artefacts of architecture governance and state the role of each.
2. **Comprehension:** Explain why the dispensation process exists — and why a "permanent dispensation" is an anti-pattern.
3. **Application:** Design the Architecture Board charter for the merged organisation. Include: authority, membership, quorum, cadence, and how dispensation decisions are made.
4. **Analysis:** The fintech uses 14 different technology stacks across 12 squads. The bank's Technology Standards Catalogue allows 3 approved languages and 2 approved cloud platforms. Analyse the governance approach: how would you phase the transition, and what dispensation strategy would you use for the delta?
5. **Evaluation:** The bank's CISO requires a compliance review (human approval) on every production deployment. The fintech currently deploys 40 times per day. Evaluate the conflict. What architectural governance design resolves it without reducing deployment frequency?
6. **Synthesis:** Design a governance operating model for the merged entity: Board charter, cadence, standards catalogue ownership, dispensation SLA, automated compliance gates, and an 18-month maturity target. Include 3 measurable KPIs for the Architecture Board to report to the CTO quarterly.

> Governance is not the absence of autonomy. It is the framework within which autonomy is exercised safely — and the process by which the boundaries of autonomy are negotiated, recorded, and evolved.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Board charter first-draft** | "Draft an Architecture Board charter for a [org size/type] organisation. Include: authority, membership, quorum, decision types, escalation path, and meeting cadence." | Overly formal; may miss the 'enabling' balance; doesn't account for org culture |
| **Dispensation form template** | "Create a dispensation request template for architecture governance. Include: rationale, risk assessment, alternatives considered, time limit, remediation plan." | Generic; may not align to your standards catalogue categories |
| **RACI matrix generation** | "Generate a RACI matrix for architecture governance decisions in a [org type] with [team structure description]. Decision types: principles, standards, contracts, dispensations, change requests." | May overload Responsible column; doesn't reflect real authority relationships |
| **Compliance checklist** | "Create a pre-production architecture compliance checklist for [architecture pattern/stack]. Reference TOGAF, NIST, and Well-Architected Framework." | References frameworks without knowing your specific standards; treat as starting point only |
| **Maturity assessment** | "Assess my architecture practice against a maturity model. Here are our current capabilities: [describe]. What level are we at and what are the top 3 gaps to reach the next level?" | May over-score; confirm with evidence not AI confidence |

!!! warning "Bias to watch"
    LLMs produce governance documentation that *looks* professional but has no grounding in your organisation's culture, authority structure, or regulatory context. Governance that is written without stakeholder buy-in is the most dangerous kind — it creates the illusion of control while actual decisions happen informally.

---

## Common Governance Anti-Patterns

!!! danger "Architecture police"
    Governance that is purely punitive — catching violations and blocking releases — destroys trust and creates adversarial dynamics. Governance must be enabling: help teams succeed within the architecture, not catch them failing.

!!! danger "Standards that no one knows about"
    A standards catalogue not actively communicated, embedded in developer tooling (CI gates, templates, Backstage), and explained in onboarding is not a standard — it is an unfair gotcha. Visibility is a governance responsibility.

!!! failure "Board without business representation"
    Architecture governance without a business voice produces technically correct but strategically misaligned architectures. The Architecture Board must include or have direct access to business leadership.

!!! failure "Governance log not maintained"
    An Architecture Board that makes decisions without documenting them in the governance log has no audit trail. When a decision is challenged — and it will be — there is no record. Governance without documentation is governance by memory.

!!! warning "Permanent dispensations"
    Every permanent dispensation is a standard that has silently failed. If a dispensation is needed permanently, either the standard is wrong (update it) or the team cannot comply (remediation plan required). "Permanent dispensation" should be impossible in a well-run governance framework.

!!! tip "Automate governance where possible"
    The most effective governance is built into the CI/CD pipeline: OPA policies, Checkov scans, dependency checks, fitness functions. Automated gates catch issues at the point of introduction — not 3 months later in a compliance review. Manual reviews are for judgement calls; automated gates are for pass/fail criteria.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part VI Ch 44–48 | Primary standard | Architecture Governance framework, contracts, compliance, dispensations | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap44.html) |
| COBIT 2019 | Framework | IT governance objectives including APO03 (Managed Enterprise Architecture) | [isaca.org/resources/cobit](https://www.isaca.org/resources/cobit) |
| ISO/IEC 38500:2015 | Standard | IT Governance principles: Responsibility, Strategy, Acquisition, Performance, Conformance, Human Behaviour | [iso.org/standard/62816.html](https://www.iso.org/standard/62816.html) |
| Building Evolutionary Architectures (Ford, Parsons, Kua — 2017) | Book | Fitness functions; automated architectural compliance; evolutionary governance | [oreilly.com](https://www.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/) |
| Accelerate (Forsgren, Humble, Kim — 2018) | Book | DORA metrics for measuring architecture and delivery capability | [itrevolution.com/accelerate-book](https://itrevolution.com/accelerate-book/) |
| Team Topologies (Skelton & Pais — 2019) | Book | Platform team as governance enabler; cognitive load and standards ownership | [teamtopologies.com](https://teamtopologies.com) |
| Open Policy Agent Documentation | Technical | Policy-as-code for automated governance; Rego language reference | [openpolicyagent.org/docs](https://www.openpolicyagent.org/docs/latest/) |
| Backstage Documentation | Technical | Developer portal as governance visibility layer; software catalogue | [backstage.io/docs](https://backstage.io/docs) |
