# Phase 2 — Architecture Design

**Goal:** Produce a candidate architecture that satisfies the constraints and goals identified in Phase 1, with every significant decision explicitly documented in an ADR.

> *"An architecture decision without a recorded rationale is a future maintenance burden."*

---

## Process Flow

``` mermaid
flowchart TD
    A[Review Phase 1 Outputs] --> B[Define Architecture Principles]
    B --> C[Identify Architecture Drivers\nASRs]
    C --> D[Generate Candidate Architectures]
    D --> E[Evaluate Trade-offs]
    E --> F[Select Architecture]
    F --> G[Document ADRs]
    G --> H[Produce Architecture Brief\n& C4 Diagrams]
    H --> I{Sponsor\nSign-off?}
    I -- No --> J[Address Concerns]
    J --> E
    I -- Yes --> K[Phase 2 Complete ✓\nEnter Phase 3]

    style A fill:#4051b5,color:#fff,stroke:none
    style K fill:#2e7d32,color:#fff,stroke:none
    style I fill:#e65100,color:#fff,stroke:none
```

---

## Inputs

| Input | Source |
|---|---|
| Discovery Brief | Phase 1 output |
| Constraint inventory | Phase 1 output |
| Risk register | Phase 1 output |
| Non-functional requirements (NFRs) / ASRs | Stakeholder interviews |
| Existing technology standards / approved stack | Enterprise Architecture / IT |

---

## Key Activities

### 1. Architecture Principles

Define 5–8 guiding principles before designing. Principles arbitrate between options when trade-offs arise.

**Example principles for a cloud-native system:**

| # | Principle | Rationale |
|---|---|---|
| P1 | Design for failure | Distributed systems will fail; assume it and build accordingly |
| P2 | Prefer managed services over self-managed | Reduce operational burden; focus engineering on differentiated value |
| P3 | Loose coupling over tight integration | Enable independent deployability and evolvability |
| P4 | Security by design, not by addition | Security controls are cheaper to build in than bolt on |
| P5 | Automate everything repeatable | Manual processes introduce drift and human error |
| P6 | Observable by default | Every service must emit logs, metrics, and traces from day one |
| P7 | Align to the strangler fig for existing systems | Incremental migration over big-bang rewrites |

---

### 2. Architecturally Significant Requirements (ASRs)

ASRs are the requirements with the most influence on the architectural structure. Source them from NFRs and constraints.

| ID | ASR | Category | Priority | Source |
|---|---|---|---|---|
| ASR-01 | System must handle 10K concurrent users at p95 < 300ms | Performance | Must | SLA |
| ASR-02 | RTO ≤ 1h, RPO ≤ 15min for the order processing domain | Resilience | Must | Business |
| ASR-03 | All PII must remain within EU-West regions | Compliance | Must | GDPR |
| ASR-04 | New services must be independently deployable | Evolvability | Should | Architecture |
| ASR-05 | System must integrate with existing Okta via OIDC | Integration | Must | IT Policy |

**ASR categories (ISO 25010):** `Performance` · `Reliability` · `Security` · `Maintainability` · `Portability` · `Usability` · `Compatibility`

---

### 3. C4 Model Diagrams

Produce all four levels as needed. Level 1 and 2 are mandatory for every engagement.

``` mermaid
flowchart TB
    subgraph C4["C4 Model — Diagram Levels"]
        L1["Level 1: System Context\n(Who uses it? What does it depend on?)"]
        L2["Level 2: Containers\n(Web app, API, DB, queue — what are the deployable units?)"]
        L3["Level 3: Components\n(Inside a container — major building blocks)"]
        L4["Level 4: Code\n(Class/module detail — only when needed)"]
        L1 --> L2 --> L3 --> L4
    end
    style C4 fill:#f5f5f5,stroke:#4051b5
```

!!! tip "Structurizr for living C4 diagrams"
    [Structurizr DSL](https://structurizr.com/dsl) defines architecture as code, generates C4 diagrams, and stores them alongside your codebase. Prefer this over static diagram tools for long-lived systems.

**Example Container Diagram (C4 L2):**

``` mermaid
C4Container
    title Container Diagram — Target State

    Person(user, "End User", "Web or mobile")
    System_Ext(idp, "Okta", "Identity Provider")
    System_Ext(payment, "Stripe", "Payment Processing")

    System_Boundary(sys, "Platform") {
        Container(spa, "Single Page App", "React", "User-facing web application")
        Container(api, "API Gateway", "Kong", "Rate limiting, routing, auth")
        Container(order, "Order Service", "Java / Spring Boot", "Order lifecycle")
        Container(inventory, "Inventory Service", "Go", "Stock management")
        Container(notify, "Notification Service", "Node.js", "Email and push")
        ContainerDb(orderdb, "Order DB", "PostgreSQL", "Order data")
        ContainerDb(invdb, "Inventory DB", "PostgreSQL", "Inventory data")
        Container(bus, "Event Bus", "AWS SQS/SNS", "Async event routing")
    }

    Rel(user, spa, "Uses", "HTTPS")
    Rel(spa, api, "Calls", "HTTPS/REST")
    Rel(api, idp, "Validates token", "OIDC")
    Rel(api, order, "Routes", "HTTP")
    Rel(api, inventory, "Routes", "HTTP")
    Rel(order, orderdb, "Reads/writes")
    Rel(order, bus, "Publishes OrderPlaced")
    Rel(inventory, invdb, "Reads/writes")
    Rel(inventory, bus, "Subscribes")
    Rel(notify, bus, "Subscribes")
    Rel(order, payment, "Calls", "HTTPS")
```

---

### 4. Decision Framework — Candidate Architecture Evaluation

Use the **Architecture Trade-off Analysis Method (ATAM)** approach: score each candidate against the ASRs.

| Quality Attribute | Weight | Option A: Monolith | Option B: Modular Monolith | Option C: Microservices |
|---|---|---|---|---|
| Performance (ASR-01) | 25% | 4 | 4 | 3 |
| Resilience (ASR-02) | 20% | 2 | 3 | 4 |
| Compliance (ASR-03) | 20% | 3 | 3 | 4 |
| Evolvability (ASR-04) | 20% | 1 | 3 | 4 |
| Operational Simplicity | 15% | 4 | 3 | 1 |
| **Weighted Score** | | **2.75** | **3.20** | **3.30** |

!!! note "ATAM — SEI Carnegie Mellon"
    The Architecture Trade-off Analysis Method is a structured evaluation technique from the Software Engineering Institute. Reference: [sei.cmu.edu](https://www.sei.cmu.edu/our-work/projects/display.cfm?customel_datapageid_4050=21328)

---

### 5. Architecture Decision Records (ADRs)

Every decision that significantly affects the system's structure, behaviour, or constraints must have an ADR.

**Decision trigger checklist — write an ADR when:**

- [ ] Choosing between two or more technically valid options
- [ ] Adopting a new technology, framework, or vendor
- [ ] Accepting a known trade-off (e.g., consistency vs. availability)
- [ ] Deviating from an established architectural principle
- [ ] Making a decision that will be expensive to reverse

See the [ADR index](../adrs/index.md) for the template and all recorded decisions.

---

### 6. Architecture Brief

The Architecture Brief is the single-document summary of Phase 2. Target: 4–6 pages.

**Structure:**

```
1. Executive Summary (1 paragraph)
2. Problem Statement (from Phase 1)
3. Constraints (from Phase 1)
4. Architecture Principles
5. ASRs
6. Architecture Overview (C4 L1 + L2 diagrams)
7. Key Decisions Summary (link to ADRs)
8. Key Risks and Mitigations
9. Open Questions
10. Next Steps (Phase 3 plan)
```

---

## Output Artifacts (Phase 2 Exit Criteria)

- [ ] Architecture Principles — defined and agreed
- [ ] ASRs — identified and prioritised
- [ ] C4 L1 diagram (System Context) — complete
- [ ] C4 L2 diagram (Containers) — complete
- [ ] Trade-off analysis — documented for the selected approach
- [ ] ADRs — written for every significant decision
- [ ] Architecture Brief — reviewed and signed off by sponsor
- [ ] Data flow diagram — for any PII or sensitive data flows
- [ ] Threat model — initial pass (STRIDE)

---

## Threat Modelling (STRIDE)

Always perform a threat model pass during design, not after.

| Threat | STRIDE Category | Example | Mitigation |
|---|---|---|---|
| Spoofing identity | Spoofing | Attacker impersonates service | mTLS between services; strong auth |
| Tampering with data | Tampering | Event payload modified in transit | Message signing; TLS everywhere |
| Repudiation | Repudiation | Action not traceable to actor | Audit log with tamper-evident storage |
| Information disclosure | Information Disclosure | PII in logs or error messages | Log sanitisation; data classification |
| Denial of service | Denial of Service | Flood API gateway | Rate limiting; WAF; circuit breakers |
| Privilege escalation | Elevation of Privilege | Token with too many scopes | Principle of least privilege; scoped tokens |

**Tool:** [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/) — free, open-source threat modelling tool.

---

## Tools

| Purpose | Tool |
|---|---|
| C4 diagrams (code-first) | [Structurizr DSL](https://structurizr.com/) |
| C4 diagrams (visual) | [draw.io C4 shape library](https://www.diagrams.net/) |
| Mermaid diagrams | [mermaid.js.org](https://mermaid.js.org/) |
| ADR management | [adr-tools](https://github.com/npryce/adr-tools), or manual Markdown in this repo |
| Trade-off scoring | Spreadsheet |
| Threat modelling | [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/) |
| Architecture review | [AWS Well-Architected Tool](https://aws.amazon.com/well-architected-tool/) |

---

## Common Pitfalls

!!! failure "Designing without principles"
    Without explicit principles, every decision becomes a debate. Define principles first; they make design conversations faster and more consistent.

!!! failure "Skipping the trade-off analysis"
    Choosing an architecture because it's familiar or fashionable — without scoring it against ASRs — leads to architectures that don't fit the actual problem.

!!! warning "Over-engineering the diagrams"
    Level 3 and Level 4 C4 diagrams are only warranted for complex domains or onboarding new teams. Maintain only what you will keep up to date.

---

## Reference Sources

- TOGAF ADM Phases B–D (Business, Information Systems, Technology Architecture) — [opengroup.org](https://www.opengroup.org/togaf)
- ATAM — Software Engineering Institute, Carnegie Mellon
- C4 Model — [c4model.com](https://c4model.com/)
- STRIDE Threat Modelling — Microsoft SDL
- *Fundamentals of Software Architecture* — Richards & Ford, O'Reilly
- *Building Evolutionary Architectures* — Ford, Parsons, Kua, O'Reilly
- AWS Well-Architected Framework — [aws.amazon.com/architecture/well-architected](https://aws.amazon.com/architecture/well-architected/)
