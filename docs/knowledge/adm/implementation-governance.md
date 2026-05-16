# Phase G — Implementation Governance

**TOGAF Reference:** Part II, Chapter 12, §12.3  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why Phase G matters to you:** As a developer you know the pain of an architecture decision that looked right on the whiteboard but arrived in production looking nothing like what was agreed. Phase G is the governance function that prevents that gap. It is the architecture equivalent of your production on-call rotation: Architecture Compliance Reviews are the SLO reviews; dispensations are the incident post-mortems that acknowledge when reality deviates from the ideal; and variance tracking is the error budget. Phase G does not block delivery — it ensures delivery converges on the target architecture agreed in Phase F's Architecture Contract.

---

## Bloom Layer A — Quick Recall

**At a glance:** Phase G ensures that delivery teams implement solutions that conform to the Architecture Contract agreed in Phase F, through a programme of compliance reviews, dispensation management, and variance tracking.

| | |
|---|---|
| **Key output** | Architecture Compliance reviews; dispensation decisions; updated Architecture Contract; recommendations to Architecture Board |
| **TOGAF Chapter** | Part II, Chapter 12 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap12.html) |
| **Runs throughout** | The delivery lifecycle — from development start through to go-live and post-implementation |
| **Uses** | Phase F Architecture Contract as the governing document |
| **Feeds into** | Phase H (Architecture Change Management) — variance trends trigger change requests |
| **Developer analogy** | Production on-call: Architecture Compliance Reviews = SLO reviews; dispensations = incident post-mortems; variance log = error budget |

---

## Bloom Layer B — Conceptual Understanding

### Phase G relationship to Phase F and Phase H

``` mermaid
flowchart LR
    F["Phase F\nMigration Planning\n(Architecture Contract produced)"]
    G["Phase G\nImplementation Governance\n─────────────────────────\nCompliance Reviews\nDispensation Management\nVariance Tracking\nPost-Implementation Review"]
    H["Phase H\nChange Management\n(Change requests where variance\nor new requirements emerge)"]

    F -->|"Architecture Contract"| G
    G -->|"Variance triggers"| H

    style F fill:#37474f,color:#fff,stroke:none
    style G fill:#4F46E5,color:#fff,stroke:none
    style H fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF 10 Part II §12.1 — "The purpose of Phase G is to ensure conformance with the defined architecture during implementation." §12.2 defines the Architecture Contract as the governing input. The G → H trigger is defined in §12.3 Step 6: "where Architecture Contract requirements cannot be met, a change request is raised to Phase H."

**What Phase G is not:**
- It is not a project management function (that belongs to the PMO)
- It is not a code review (that belongs to engineering teams)
- It is not a security audit (that belongs to security function — though Phase G reviews include security)

**What Phase G is:**
- The architectural lens on delivery — confirming that what is built conforms to what was agreed
- The authority to approve or reject deviations via dispensation
- The feedback loop back to the Architecture Repository when reality informs theory

**Developer analogy extended:** Phase G is not the build pipeline. It is the architecture review gate that the build pipeline must pass. It is the function that answers: "does this solution, as built, still conform to the Architecture Contract and the target architecture?"

---

## Bloom Layer C — Guided Practice (Step-by-Step)

### TOGAF Phase G Step Sequence

Defined in **TOGAF 10 Part II, Chapter 12, §12.3** — the key activities for Implementation Governance.

``` mermaid
flowchart TD
    S1["Step 1: Confirm scope and priorities\nfor deployment with development management"] --> S2
    S2["Step 2: Identify deployment resources\nand skills"] --> S3
    S3["Step 3: Guide development of\nsolutions deployment"] --> S4
    S4["Step 4: Perform Architecture Compliance\nreviews"] --> S5
    S5["Step 5: Implement business\nand IT operations"] --> S6
    S6["Step 6: Perform post-implementation\nreview and close the implementation"]

    style S1 fill:#37474f,color:#fff,stroke:none
    style S6 fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF Standard 10th Edition, Part II, Chapter 12, §12.3 — Implementation Governance activities. [pubs.opengroup.org/architecture/togaf10-doc/arch/chap12.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap12.html)

#### Risks when activities are skipped

| If you skip … | Downstream risk |
|---|---|
| Step 1 (scope confirmation) | Governance scope is undefined; teams operate outside architecture oversight |
| Step 2 (resources/skills) | Governance reviews lack qualified reviewers; compliance reviews are rubber stamps |
| Step 3 (guide deployment) | Teams make implementation decisions without architecture input; gaps discovered at go-live |
| Step 4 (compliance reviews) | Architecture Contract is ignored; built solution deviates from target architecture |
| Step 5 (IT operations) | Architecture inputs to operational model missing; runbooks and SLOs not aligned to architecture |
| Step 6 (post-implementation) | Lessons learned lost; transition architecture not formally closed; successor phases start on wrong baseline |

---

### Technique 1 — Architecture Compliance Review Checklist

Phase G compliance reviews assess solution designs against four dimensions. Each review gate has an associated checklist.

=== "Architecture Conformance"

    | Check | Standard | Pass criteria | Owner |
    |---|---|---|---|
    | Service boundaries match ADD | Application Architecture chapter | Service responsibility matches ADD; no scope creep | Solution Architect |
    | API contracts match Integration Catalogue | Phase C Integration Catalogue | Endpoint, payload, protocol match catalogue | Lead Developer |
    | Data entity ownership correct | Phase C Data Architecture | Entity owned by correct domain; no unauthorised copies | Data Architect |
    | Technology stack is approved | Technology Standards Catalogue | All components in approved technology list | Enterprise Architect |
    | Deployment model matches Phase D | Technology Architecture chapter | Cloud regions, container model, network topology correct | Platform Architect |

=== "Non-Functional Requirements"

    | Check | NFR Target | Pass criteria | Owner |
    |---|---|---|---|
    | Response time (P95) | ≤ 200ms for customer-facing | Load test results confirm P95 ≤ 200ms at peak load | Performance Engineer |
    | Availability | 99.9% (customer-facing) | Redundancy model documented and tested; auto-failover validated | Platform Architect |
    | Recovery Time Objective (RTO) | ≤ 4 hours (critical systems) | DR test completed; RTO measured; within target | Operations Architect |
    | Recovery Point Objective (RPO) | ≤ 1 hour (critical systems) | Backup frequency confirmed; restore test completed | Data Architect |
    | Scalability | Horizontal auto-scale confirmed | Auto-scaling policy tested; capacity model validated | Platform Architect |

=== "Security & Compliance"

    | Check | Standard | Pass criteria | Owner |
    |---|---|---|---|
    | Authentication and authorisation | OAuth 2.0 / OIDC via approved IdP | All endpoints require valid JWT; RBAC enforced | Security Architect |
    | Secrets management | No credentials in code or config | Static scan clean; secrets in approved vault (AWS Secrets Manager / HashiCorp Vault) | Lead Developer |
    | Data at rest encryption | AES-256 for classified data | Encryption confirmed for all Confidential+ data stores | Security Architect |
    | Data in transit encryption | TLS 1.3 minimum | Certificate scan confirms TLS 1.3; no HTTP in scope | Platform Architect |
    | PII data flow | GDPR Article 30 compliance | PII flows match Article 30 register; no new PII paths outside register | Data Protection Officer |
    | OWASP Top 10 | No critical or high vulnerabilities | DAST scan results; pen test results (if applicable) | Security Engineer |

=== "Operability"

    | Check | Standard | Pass criteria | Owner |
    |---|---|---|---|
    | Health check endpoint | /health or equivalent | Returns 200 with health status; monitored in alerting platform | Lead Developer |
    | Structured logging | JSON structured logs to approved platform | Logs parseable; correlation ID propagated; no PII in logs | Lead Developer |
    | Distributed tracing | OpenTelemetry instrumented | Traces visible in observability platform; cross-service trace complete | Platform Architect |
    | Alerting configured | SLO-aligned alerts | Alerts for error rate, latency P95, saturation; no alert storm | SRE / Platform |
    | Runbook published | Operations runbook in approved location | Runbook covers: start/stop, failover, rollback, incident response | Ops Lead |

> **Source:** Compliance review checklist structure aligned with TOGAF 10 §12.3 Step 4 (Architecture Compliance Reviews) and TOGAF 10 Part V §35 (Architecture Compliance). NFR targets follow TOGAF 10 Part III §30 (Architecture Requirements). OWASP Top 10 reference from [owasp.org/Top10](https://owasp.org/Top10/). TLS and encryption standards from NCSC Cyber Essentials Plus and ISO/IEC 27001:2022 Annex A.

---

### Technique 2 — Dispensation Process

When a delivery team cannot meet a mandatory Architecture Contract standard, a formal dispensation is required.

``` mermaid
flowchart TD
    Dev["Delivery Team identifies\ncompliance gap"]
    DR["Submit Dispensation Request\n(DR form)"]
    Arch["Chief Architect\nInitial Review"]
    Board["Architecture Review Board\nFormal Review"]
    Approve["Approved — with conditions\n(time-bound mitigation required)"]
    Reject["Rejected — delivery team\nmust meet the standard"]
    Track["Variance Log updated\n(monthly review)"]
    H["Phase H: Change Request\nif standard itself needs revisiting"]

    Dev --> DR --> Arch
    Arch -->|"Minor deviation"| Approve
    Arch -->|"Significant deviation"| Board
    Board --> Approve
    Board --> Reject
    Approve --> Track
    Track -->|"Pattern of deviations"| H

    style Approve fill:#2e7d32,color:#fff,stroke:none
    style Reject fill:#c0392b,color:#fff,stroke:none
    style H fill:#4F46E5,color:#fff,stroke:none
```

> **Source:** Dispensation process derived from TOGAF 10 Part VI §44.4 — Architecture Governance: dispensations and exceptions. The escalation path from Architect to Board for significant deviations reflects TOGAF 10 §44.3 governance model hierarchy.

**Dispensation Request Template:**

---

**DISPENSATION REQUEST**

**Reference:** DR-2026-014  
**Date:** 2026-03-15  
**Requestor:** Platform Engineering Team  
**Programme:** Digital Platform Modernisation  
**Reviewing Architect:** [Name]

---

**Standard not met:**  
Architecture Contract AC-2026-001, Section 2: "All new services must use the approved relational database (PostgreSQL 15) or the approved NoSQL store (DynamoDB). MongoDB is not an approved technology."

**Deviation:**  
The new Loyalty Platform uses MongoDB Atlas (cloud-managed MongoDB) for the loyalty points ledger. MongoDB was selected by the external Loyalty SaaS vendor as their native datastore; migrating to DynamoDB would require a full re-architecture of the vendor solution.

**Justification:**  
1. MongoDB Atlas is a fully managed, cloud-native service — operational burden is equivalent to DynamoDB.  
2. The loyalty points data model is a document-oriented ledger; a relational model would require significant denormalisation.  
3. Re-engineering the vendor solution to use DynamoDB is estimated at £120k and 3 months — exceeding the dispensation window for the current programme.

**Risk assessment:**  
- MongoDB Atlas is not in the approved Technology Standards Catalogue — risk: precedent for other teams to bypass the catalogue.  
- Mitigation: approve this dispensation with the condition that the Platform Engineering team submits a Phase H change request to formally add MongoDB Atlas to the catalogue within 60 days.

**Time limit:** This dispensation expires 2026-12-31 or when the Phase H change request is resolved, whichever is sooner.

**Conditions of approval:**  
1. No PII may be stored in MongoDB Atlas; Customer ID reference only.  
2. Encryption at rest and in transit must be confirmed (AES-256, TLS 1.3).  
3. Phase H change request CR-2026-037 must be raised within 60 days.

**Architecture Board decision:**  
☐ Approved  ☐ Approved with conditions (see above)  ☐ Rejected  

**Signed:** _____________________ (Chief Architect)  **Date:** ___________

---

### Technique 3 — Variance Log

Track all approved dispensations and their resolution status. Pattern analysis of the variance log feeds Phase H.

| Ref | Date | Work Package | Standard Deviated | Severity | Status | Phase H CR | Target Close |
|---|---|---|---|---|---|---|---|
| DR-2026-014 | 2026-03-15 | Loyalty Platform | Technology Standards — MongoDB | Medium | Approved with conditions | CR-2026-037 | 2026-12-31 |
| DR-2026-015 | 2026-04-02 | Order Management | API standard — gRPC instead of REST for internal event | Low | Approved | None required | 2026-06-30 |
| DR-2026-016 | 2026-04-18 | ERP Migration | Cloud region — eu-central-1 (Frankfurt) for DR (not approved) | High | Rejected — reverted to eu-west-2 | None | Closed |
| DR-2026-017 | 2026-05-01 | Analytics Platform | PII in analytics (pseudonymisation pipeline delayed) | Critical | Approved with conditions — 30-day remediation | CR-2026-041 | 2026-06-01 |

**Variance severity levels:**

| Severity | Definition | Board review? | Maximum open duration |
|---|---|---|---|
| **Critical** | Non-compliance with regulatory or security mandatory control | Yes — emergency escalation | 30 days maximum |
| **High** | Deviation from mandatory Architecture Contract standard | Yes | 90 days |
| **Medium** | Deviation from architecture guideline; risk manageable | Chief Architect only | 180 days |
| **Low** | Minor deviation; no material risk; primarily process | Chief Architect only | 365 days |

---

## Bloom Layer D — Tools

### Implementation Governance Tools

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **Jira Service Management** | Dispensation request tracking, compliance issue management | Integrates with delivery Jira; audit trail; SLA tracking | Complex setup; Atlassian ecosystem | Premium from ~$17/user/mo | [atlassian.com/software/jira/service-management](https://www.atlassian.com/software/jira/service-management) |
| **Confluence** | Compliance review documentation, Architecture Contract storage, Board minutes | Accessible; version history; comment trails | No structured data; content drifts | Free (up to 10 users); from $5.75/user/mo | [atlassian.com/software/confluence](https://www.atlassian.com/software/confluence) |
| **OPA (Open Policy Agent)** | Policy-as-code: automated enforcement of architecture standards in CI/CD and Kubernetes | Policies as code; Rego language; enforces at admission (k8s) | Steep learning curve; Rego is opinionated | Free (OSS) | [openpolicyagent.org](https://www.openpolicyagent.org) |
| **Checkov (Bridgecrew)** | Static IaC analysis — enforces architecture standards in Terraform / CloudFormation | Pre-commit IaC checks; 1000+ checks; CIS/NIST mapped | IaC-only; does not check runtime architecture | Free (OSS); Prisma Cloud for full policy | [checkov.io](https://www.checkov.io) |
| **LeanIX** | Architecture governance dashboard — compliance status, variance tracking, technology lifecycle | Enterprise-grade governance reporting; stakeholder dashboards | Enterprise pricing; complex | Enterprise ($$$$) | [leanix.net](https://www.leanix.net) |
| **Backstage (Spotify OSS)** | Standards visible in developer portal; architecture compliance at point of development | Enforces standards at developer level; plugin ecosystem | Requires platform team investment | Free (OSS) | [backstage.io](https://backstage.io) |

---

## Bloom Layer E — Decision Frameworks

| Governance decision | Lean towards when | Lean away when | Risk if wrong |
|---|---|---|---|
| **Approve dispensation vs. reject** | Approve: business urgency > standard risk; time-bound mitigation available; Phase H can absorb | Reject: standard is safety/security/regulatory; no credible mitigation | Approve recklessly: Architecture Contract becomes meaningless; reject everything: teams route around governance |
| **Compliance review: gate vs. advisory** | Gate (blocking): high-risk delivery; regulated; first of a type | Advisory: mature team; proven pattern; low-risk scope | Gate without authority: bypassed; advisory for high-risk: problems found post-production |
| **Architecture Contract: amend vs. dispense** | Amend (Phase H): the standard is structurally wrong for the context; multiple teams affected | Dispense: one team, one specific deviation, bounded in time | Dispensing structural problems: queue of dispensations accumulates; Phase H never triggered |
| **Post-implementation review timing** | At go-live + 3 months (enough production time to measure against NFRs) | Immediately at go-live: no production data; too late (12 months): lessons learned are stale | Too early: review is speculative; too late: lessons lost; next ADM cycle already started |
| **Variance log: reviewed monthly vs. quarterly** | Monthly: active programme; multiple open DRs; regulatory context | Quarterly: mature programme; few open DRs; stable architecture | Quarterly when active: critical DRs approach deadline without action; monthly when stable: overhead without benefit |

---

## Bloom Layer E — Judgment & Trade-offs

| Question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Approve DR-2026-014 (MongoDB)** | Vendor dependency; remediation cost is disproportionate; data classification allows; Phase H absorbs | Standard is safety/security; no precedent management plan | Approve without Phase H CR: MongoDB proliferates without governance; reject without cost analysis: programme delayed £120k/3 months for a manageable risk |
| **Critical compliance gap: stop delivery vs. remediate in flight** | Stop: safety or security critical (data breach risk, PCI-DSS violation) | Remediate in flight: business critical, bounded risk, time-boxed | Stop for low severity: programme credibility damaged; remediate-in-flight for critical: delivers non-compliant solution to production |
| **Architecture Board involvement in all DRs vs. escalation only** | Escalation only (Chief Architect handles Low/Medium): avoids Board fatigue | Board reviews all: governance is thorough but creates bottleneck | Board reviews all: compliance queue backs up; Chief Architect handles all: high-severity deviations miss Board visibility |
| **Variance log: public (all stakeholders) vs. restricted (architects only)** | Restricted: deviations contain sensitive design details; not yet resolved | Public: stakeholders need visibility into programme health | Public unmanaged: team morale impact; restricted always: stakeholders unaware of systemic risk accumulation |
| **Post-implementation review: quantitative vs. qualitative** | Quantitative (DORA metrics, SLO actuals vs. targets) where data available | Qualitative (interviews, retrospective) when the most important lessons are organisational/cultural | Quantitative only: misses the "why"; qualitative only: easy to confuse symptoms with causes |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** A retail bank has completed 6 months of implementation under its Digital Platform Programme. Three work packages are now in production or nearing go-live. The Architecture Review Board has not met for 2 months. The variance log has 8 open dispensation requests, including one Critical (PII data discovered in an analytics environment) and two High (non-approved cloud services). The Chief Architect has just returned from a 3-month leave.

1. **Recall:** Name the 6 Phase G activities. For each, state what has likely gone wrong given the scenario description above.
2. **Comprehension:** Explain why the Critical dispensation (PII in analytics) cannot be left open and must be escalated — even if the delivery team has proposed a "60-day remediation plan."
3. **Application:** Write a Dispensation Request for the Critical PII variance. Include all fields from the DR template. Recommend a Board decision (approve with conditions / reject) and justify it.
4. **Analysis:** The 8 open DRs include a pattern: 4 of them involve teams using non-approved cloud services. Analyse whether this is a dispensation management problem or a Phase H change management problem. What is the decision criterion?
5. **Evaluation:** The Chief Architect is considering two options: (a) require all 8 open DRs to go through full Board review; (b) fast-track Low/Medium DRs through Chief Architect approval and only escalate Critical/High. Evaluate both options against delivery speed, governance integrity, and stakeholder confidence.
6. **Synthesis:** Design a "Phase G Recovery Plan" for this scenario. Include: immediate actions for the Critical PII issue, a process for triaging the remaining 7 DRs, a Board catch-up schedule, metrics to show architecture governance health, and criteria for triggering Phase H for any of the open issues.

> Architecture governance is not about saying no. It is about maintaining the trust between the architecture function and the delivery organisation that allows architecture decisions to be made once, respected by all, and changed through a defined process rather than informal drift.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Compliance review checklist** | "Generate an Architecture Compliance Review checklist for a [describe service type] delivered to [technology stack]. Categories: architecture conformance, NFRs, security, operability. For each item: check description, pass criteria, owner." | Generic checklist items; tailor every check to your Architecture Contract standards |
| **Dispensation Request draft** | "Draft a Dispensation Request for: [describe deviation]. Standard not met: [state standard]. Justification: [summarise reason]. Include: risk assessment, proposed mitigation, time limit, conditions of approval." | May justify anything; you supply the real risk assessment |
| **Variance log analysis** | "Given this variance log [paste table], identify patterns. Are there structural issues that should trigger a Phase H change request rather than continued dispensation management?" | May miss domain-specific patterns; use as prompt for your own analysis |
| **Post-implementation review** | "Generate a post-implementation review template for a [programme type]. Sections: delivery against Architecture Contract, NFR actuals vs. targets, open dispensation resolution, lessons for next ADM cycle, recommendations." | Generic lessons; always supplement with real DORA metrics and production data |
| **Phase H trigger criteria** | "Given this variance log pattern [describe], define criteria for triggering a Phase H Architecture Change Management request vs. continuing with dispensations." | May not understand the nuance of structural vs. one-off deviations |

!!! warning "Bias to watch"
    LLMs will draft Dispensation Requests that justify almost any deviation if you provide the justification. The real governance value is the Architecture Board's independent judgment — AI can draft, but the Chief Architect and Board must own the decision. AI-generated compliance checklists may omit organisation-specific standards that are not publicly documented.

---

## Common Mistakes

!!! danger "Architecture Contract without a compliance process"
    An Architecture Contract that nobody reviews is a decorative document. If Phase G compliance reviews are not scheduled before delivery begins, the contract has no enforcement mechanism. Governance must be active, not passive.

!!! failure "All dispensations approved"
    If every dispensation request is approved, the Architecture Contract has no authority. Some dispensations should be rejected. The willingness to reject validates the governance — and motivates teams to design in compliance rather than seeking dispensations.

!!! warning "Post-implementation review skipped"
    Post-implementation review closes the Transition Architecture formally, confirms NFR actuals against targets, and produces the lessons learned that improve the next ADM cycle. Skipping it means the next architecture engagement starts from unverified assumptions.

!!! tip "Use OPA / Checkov for automated enforcement"
    Policy-as-code (OPA, Checkov) enforces architecture standards in the pipeline before the compliance review is needed — shifting governance left. Automated enforcement reduces the burden on Phase G manual reviews and catches low-level deviations at code time.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 12 | Primary standard | Authoritative Phase G activities, inputs, outputs | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap12.html) |
| TOGAF 10 Part V Chapter 35 | Standard | Architecture Compliance: reviews, dispensations, contracts | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap35.html) |
| TOGAF 10 Part VI Chapter 44 | Standard | Architecture Governance: Board, dispensations, authority levels | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap44.html) |
| COBIT 2019 | Framework | MEA01 (Monitor, Evaluate and Assess Performance) — governance monitoring | [isaca.org/resources/cobit](https://www.isaca.org/resources/cobit) |
| OPA (Open Policy Agent) | Tool | Policy-as-code for automated architecture compliance in pipelines and Kubernetes | [openpolicyagent.org](https://www.openpolicyagent.org) |
| Checkov | Tool | IaC static analysis — enforces architecture standards in Terraform/CloudFormation | [checkov.io](https://www.checkov.io) |
| Site Reliability Engineering (Beyer et al. — Google, 2016) | Book | Error budget as governance signal; SLO as NFR metric; post-mortems as dispensation process | [sre.google/books](https://sre.google/books/) |
| Accelerate (Forsgren, Humble, Kim — 2018) | Book | DORA metrics (deployment frequency, lead time, change failure rate) as Phase G compliance metrics | [itrevolution.com/accelerate-book](https://itrevolution.com/accelerate-book/) |
