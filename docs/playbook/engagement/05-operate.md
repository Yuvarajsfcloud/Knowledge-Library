# Phase 5 — Operate & Evolve

**Goal:** Maintain system health, manage technical debt deliberately, measure architecture quality continuously, and identify when the architecture needs to evolve — triggering a new cycle.

> *"Software systems don't age — they accumulate unaddressed change."*

---

## Process Flow

``` mermaid
flowchart TD
    A[Monitor Fitness Functions\n& SLOs Continuously] --> B{SLO breach\nor incident?}
    B -- Yes --> C[Incident Response\nPost-mortem]
    C --> D[Identify Systemic\nArchitecture Issues]
    D --> E[Tech Debt Backlog\nUpdate]
    B -- No --> F[Periodic Architecture\nHealth Review]
    F --> G[Update Technology Radar]
    G --> H[Tech Debt Grooming]
    H --> E
    E --> I{Triggers new\narchitecture cycle?}
    I -- Yes --> J[Back to Phase 1\nwith new initiative]
    I -- No --> A

    style A fill:#4051b5,color:#fff,stroke:none
    style J fill:#2e7d32,color:#fff,stroke:none
    style B fill:#e65100,color:#fff,stroke:none
    style I fill:#e65100,color:#fff,stroke:none
```

---

## Inputs

| Input | Source |
|---|---|
| Deployed system | Phase 4 output |
| Fitness function register | Phase 3 output |
| ADRs and Reference Architecture | Phase 2–4 outputs |
| SLOs and error budgets | Defined in Phase 4 |
| Post-mortems | Incident response (see [Incident Response Playbook](../operational/incident-response.md)) |

---

## Key Activities

### 1. SLO & Error Budget Management

Define Service Level Objectives (SLOs) per service. Error budgets enforce a balance between reliability work and feature work.

**SLO definitions (Google SRE model):**

| Term | Definition |
|---|---|
| **SLI** (Service Level Indicator) | The metric being measured (e.g., request success rate) |
| **SLO** (Service Level Objective) | The target for the SLI (e.g., 99.9% success rate over 30 days) |
| **SLA** (Service Level Agreement) | The contractual commitment to users (always looser than SLO) |
| **Error budget** | The allowed failure margin = 100% − SLO (e.g., 0.1% = ~43 min/month) |

**Example SLO register:**

| Service | SLI | SLO Target | Window | Error Budget / month |
|---|---|---|---|---|
| Order Service | Success rate (non-5xx) | 99.9% | 30 days | ~43 min downtime |
| Order Service | p95 latency | < 300ms | 30 days | 5% of requests may exceed |
| Inventory Service | Success rate | 99.5% | 30 days | ~3.6 hours |
| Notification Service | Delivery within 5 min | 99.0% | 30 days | ~7.2 hours |

**Error budget policy:**

``` mermaid
flowchart LR
    A{Error Budget\nRemaining?} -- "> 50%" --> B[Normal feature\nvelocity]
    A -- "10%–50%" --> C[Feature work\ncontinues; reliability\nitems enter sprint]
    A -- "< 10%" --> D[Feature freeze;\nall capacity to\nreliability work]
    A -- "Exhausted" --> E[Incident declared;\npost-mortem required;\nfeature freeze until\nbudget restored]

    style D fill:#e65100,color:#fff,stroke:none
    style E fill:#c62828,color:#fff,stroke:none
```

Reference: [Google SRE Book — Ch. 3: Embracing Risk](https://sre.google/sre-book/embracing-risk/)

---

### 2. Architecture Health Reviews

Run a structured architecture health review every quarter.

**Review agenda (2 hours):**

```
1. SLO and DORA metric review          — 20 min
2. Fitness function results             — 20 min
3. Tech debt backlog review            — 20 min
4. Technology radar update             — 20 min
5. Emerging risks and threats          — 20 min
6. Actions and owners                  — 20 min
```

**DORA metrics benchmark (2023 State of DevOps Report):**

| Metric | Elite | High | Medium | Low |
|---|---|---|---|---|
| Deployment Frequency | On-demand (multiple/day) | 1/week–1/day | 1/month–1/week | < 1/month |
| Lead Time for Changes | < 1 hour | 1 day–1 week | 1 week–1 month | > 1 month |
| Change Failure Rate | 0–5% | 5–10% | 10–15% | > 15% |
| Failed Deployment Recovery Time | < 1 hour | < 1 day | 1 day–1 week | > 1 week |

Reference: [dora.dev](https://dora.dev/research/)

---

### 3. Technology Radar

Maintain a personal technology radar aligned to [ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar) conventions.

**Quadrants:** `Techniques` · `Tools` · `Platforms` · `Languages & Frameworks`

**Rings:**

| Ring | Meaning |
|---|---|
| **Adopt** | Proven; use with confidence in production |
| **Trial** | Worth pursuing; use on a real project to learn |
| **Assess** | Interesting; worth researching before committing |
| **Hold** | Proceed with caution; not recommended for new work |

**Snapshot template — update quarterly:**

| Item | Quadrant | Ring | Change | Notes |
|---|---|---|---|---|
| OpenTelemetry | Techniques | Adopt | — | Industry standard for observability instrumentation |
| Kubernetes | Platforms | Adopt | — | Mature; use managed (EKS/GKE/AKS) |
| Service Mesh (Istio) | Platforms | Trial | ↑ | Useful at scale; operational overhead significant |
| LLM-assisted code review | Techniques | Assess | NEW | Evaluate quality and security implications |
| REST without versioning | Techniques | Hold | — | URL versioning or content negotiation required |
| Shared DB across services | Techniques | Hold | — | Creates hidden coupling; avoid in new work |

---

### 4. Technical Debt Management

Technical debt is not inherently bad — it is a deliberate trade-off that must be actively managed.

**Debt classification (Ward Cunningham + Martin Fowler):**

``` mermaid
quadrantChart
    title Technical Debt Quadrant (Fowler)
    x-axis Reckless --> Prudent
    y-axis Inadvertent --> Deliberate
    quadrant-1 Prudent & Deliberate\n"We must ship now;\nwe'll deal with this later"
    quadrant-2 Reckless & Deliberate\n"We don't have time\nfor design"
    quadrant-3 Prudent & Inadvertent\n"Now we know how\nwe should have done it"
    quadrant-4 Reckless & Inadvertent\n"What's layering?"
```

Reference: [martinfowler.com/bliki/TechnicalDebtQuadrant.html](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)

**Tech debt backlog entry template:**

```markdown
## DEBT-NNN: {Short title}

**Type:** Architecture | Code | Test | Infra | Security | Documentation  
**Quadrant:** Prudent-Deliberate | Prudent-Inadvertent | Reckless-Deliberate | Reckless-Inadvertent  
**Severity:** Critical | High | Medium | Low  
**Date identified:** YYYY-MM-DD  
**Owner:** {Team / person}

### Description
{What the debt is and where it lives}

### Impact if not addressed
{What breaks, slows, or risks this creates}

### Remediation plan
{How to fix it — high-level steps}

### Effort estimate
{T-shirt size: S / M / L / XL}

### Linked fitness function
{Which FF would improve if this is fixed}
```

---

### 5. Architecture Evolution Triggers

The following signals indicate the current architecture needs to evolve — trigger a new Phase 1.

| Signal | Description | Example |
|---|---|---|
| **SLO consistently breached** | The architecture cannot meet its quality targets | p95 latency > 500ms despite scaling |
| **Fitness function degrading trend** | A quality attribute is eroding over time | Coupling score increasing quarter-over-quarter |
| **DORA metrics declining** | Engineering velocity is falling | Lead time doubled over 6 months |
| **Business model change** | New product direction invalidates architectural assumptions | Moving from B2C to B2B enterprise model |
| **Scale inflection point** | Traffic/data volume exceeds design assumptions by > 2x | |
| **Technology end-of-life** | A key dependency reaches EOL | Java 11 support ends; Node 18 EOL |
| **Acquisition or major integration** | New system must be absorbed | New SaaS platform acquisition |
| **Regulatory change** | New compliance requirement invalidates data architecture | AI Act, new data residency law |

---

## Output Artifacts (Ongoing)

- [ ] SLO register — maintained and reviewed monthly
- [ ] Error budget report — per service, published monthly
- [ ] DORA metrics dashboard — updated weekly
- [ ] Post-mortems — filed within 48h (P1) or 1 week (P2) of incident
- [ ] Architecture health review notes — quarterly
- [ ] Technology radar — updated quarterly
- [ ] Tech debt backlog — groomed monthly
- [ ] Fitness function results — automated; reviewed quarterly
- [ ] Architecture evolution decision — triggered when signals warrant

---

## Tools

| Purpose | Tool |
|---|---|
| SLO management | [Nobl9](https://nobl9.com/), [Sloth](https://sloth.dev/), [AWS CloudWatch SLOs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html) |
| Observability | [Datadog](https://www.datadoghq.com/), [Grafana + Prometheus](https://grafana.com/), [AWS CloudWatch](https://aws.amazon.com/cloudwatch/) |
| DORA metrics | [Faros AI](https://www.faros.ai/), [LinearB](https://linearb.io/), [SPACE framework dashboards](https://queue.acm.org/detail.cfm?id=3454124) |
| Chaos engineering | [AWS FIS](https://aws.amazon.com/fis/), [LitmusChaos](https://litmuschaos.io/) |
| Tech debt tracking | Jira (tech debt issue type), GitHub Issues with `tech-debt` label |
| Technology radar | [Thoughtworks Radar bespoke](https://radar.thoughtworks.com/), [AOE Tech Radar](https://www.aoe.com/techradar/) |

---

## Common Pitfalls

!!! failure "Treating post-mortems as blame assignments"
    Blameless post-mortems are the industry standard (Google SRE model). The goal is systemic improvement, not individual accountability. Without psychological safety, post-mortems produce no learning.

!!! failure "No error budget policy"
    Without a defined error budget policy, reliability and feature work compete without a clear rule. The result is chronic reliability debt or feature stagnation, depending on who has more influence.

!!! warning "Tech debt backlog that is never groomed"
    A debt backlog that only grows and is never addressed becomes demoralising and loses credibility. Budget 20% of engineering capacity for debt reduction (Google's 70/20/10 model).

!!! tip "Architecture fitness functions in CI = early warning system"
    Fitness functions that run in the CI pipeline catch architectural degradation at the point of introduction — not six months later when it's embedded across the codebase.

---

## Reference Sources

- Google SRE Book — [sre.google/sre-book](https://sre.google/sre-book/table-of-contents/)
- DORA — [dora.dev/research](https://dora.dev/research/)
- ThoughtWorks Tech Radar — [thoughtworks.com/radar](https://www.thoughtworks.com/radar)
- *Building Evolutionary Architectures* — Ford, Parsons, Kua, O'Reilly (fitness functions, tech debt)
- Technical Debt Quadrant — Martin Fowler — [martinfowler.com](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html)
- *Accelerate* — Forsgren, Humble, Kim (DORA metrics research basis)
