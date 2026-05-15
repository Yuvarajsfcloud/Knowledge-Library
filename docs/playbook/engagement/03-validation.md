# Phase 3 — Validation & Decision

**Goal:** Stress-test the candidate architecture against real risk, uncertainty, and quality requirements before committing to full implementation. Produce evidence — not opinions.

> *"Don't guess. Spike. Measure. Decide."*

---

## Process Flow

``` mermaid
flowchart TD
    A[Review Architecture Brief\n& ADRs from Phase 2] --> B[Define Fitness Functions]
    B --> C[Identify High-Risk\nAssumptions]
    C --> D{Risk level\nfor assumption?}
    D -- High --> E[Run Spike / PoC]
    D -- Low --> F[Document as\nAccepted Risk]
    E --> G[Evaluate Results]
    G --> H{Architecture\nstill valid?}
    H -- No --> I[Revise Design\nUpdate ADRs]
    I --> B
    H -- Yes --> J[Final Trade-off Review\n& Stakeholder Sign-off]
    F --> J
    J --> K[Phase 3 Complete ✓\nEnter Phase 4]

    style A fill:#4051b5,color:#fff,stroke:none
    style K fill:#2e7d32,color:#fff,stroke:none
    style D fill:#e65100,color:#fff,stroke:none
    style H fill:#e65100,color:#fff,stroke:none
```

---

## Inputs

| Input | Source |
|---|---|
| Architecture Brief | Phase 2 output |
| ASRs | Phase 2 output |
| ADRs | Phase 2 output |
| Risk Register | Phase 1–2 outputs |
| Trade-off analysis | Phase 2 output |

---

## Key Activities

### 1. Fitness Functions

Fitness functions are automated or manual tests that verify the architecture meets its quality requirements. Concept from *Building Evolutionary Architectures* (Ford, Parsons, Kua).

**Fitness function types:**

| Type | Description | Example |
|---|---|---|
| **Atomic** | Tests one characteristic in isolation | Latency test: p95 < 300ms under 10K concurrent users |
| **Holistic** | Tests multiple characteristics together | Chaos test: system handles node failure within SLO |
| **Automated** | Runs in CI/CD pipeline continuously | Security scan, dependency vulnerability check |
| **Manual** | Periodic review or audit | Architecture review board, ATAM workshop |

**Fitness function register template:**

| ID | Quality Attribute | Measure | Target | Type | Tool | Frequency |
|---|---|---|---|---|---|---|
| FF-01 | Performance | p95 response time — order API | < 300ms at 10K RPS | Automated | k6, Gatling | Per deploy |
| FF-02 | Resilience | Recovery time after node failure | < 60s | Automated | Chaos Monkey / AWS FIS | Weekly |
| FF-03 | Security | No critical CVEs in dependencies | 0 critical CVEs | Automated | Snyk, Dependabot | Per commit |
| FF-04 | Deployability | Deploy frequency per squad | ≥ 1/day | Automated | DORA dashboard | Weekly |
| FF-05 | Data compliance | PII stays in EU-West | 100% — zero data residency violations | Automated | Cloud Config rules | Continuous |
| FF-06 | Coupling | No circular dependencies between services | 0 circular deps | Automated | ArchUnit, Deptrac | Per commit |

---

### 2. Spike / PoC Planning

Run a time-boxed spike (1–5 days) for every high-risk assumption. A spike answers one question — nothing more.

**Spike template:**

```markdown
## Spike: {Short title}

**Question to answer:** {Exactly one hypothesis to validate or invalidate}
**Time-box:** {N days}
**Owner:** {Name}

### Success criteria
- [ ] {Measurable outcome 1}
- [ ] {Measurable outcome 2}

### Out of scope
- {What we are NOT testing}

### Findings
{Fill in after spike completes}

### Decision
[ ] Hypothesis validated — proceed with design  
[ ] Hypothesis invalidated — revise design (see ADR-NNN)
```

**Common spike topics for distributed systems:**

| Assumption | Spike Goal |
|---|---|
| Message broker can handle target throughput | Benchmark with realistic payload and consumer count |
| Legacy system API is stable enough to integrate | Build a thin integration layer; confirm contract stability |
| Team can operate Kubernetes in production | Reproduce a representative failure scenario and recover |
| Chosen database meets latency ASR at target scale | Load test with production-representative data volume |
| Third-party SLA meets our RTO requirements | Review their published SLA and incident history |

---

### 3. Architecture Review (AWS Well-Architected)

Run a Well-Architected review against the six pillars. Document findings as improvement items.

``` mermaid
mindmap
  root((Well-Architected\nReview))
    Operational Excellence
      Runbooks defined?
      Deployments automated?
      Post-mortems practiced?
    Security
      Least privilege enforced?
      Data classified?
      Threat model done?
    Reliability
      RTO/RPO defined and tested?
      Chaos testing planned?
      Multi-AZ deployment?
    Performance Efficiency
      Scaling tested at target load?
      Caching strategy defined?
      Database choice validated?
    Cost Optimisation
      Right-sizing verified?
      Reserved capacity planned?
      Cost alerts configured?
    Sustainability
      Efficiency baseline set?
      Unnecessary resources removed?
```

**Tool:** [AWS Well-Architected Tool](https://aws.amazon.com/well-architected-tool/) — free in AWS console; generates a prioritised improvement plan.

For GCP: [Google Architecture Framework](https://cloud.google.com/architecture/framework)  
For Azure: [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)

---

### 4. Final Trade-off Decision

Before entering Phase 4, hold a structured final review. Invite: sponsor, security lead, engineering lead, operations representative.

**Agenda (90 min):**

```
1. Architecture Brief walkthrough — 20 min
2. Spike / PoC results — 20 min
3. Open risks and mitigations — 15 min
4. ADR review — 15 min
5. Go / No-Go discussion — 10 min
6. Action items and sign-off — 10 min
```

**Go / No-Go criteria:**

| Criterion | Required for Go |
|---|---|
| All Must ASRs addressed | Yes — no exceptions |
| High-risk spikes completed | Yes — results documented |
| Security threat model reviewed | Yes |
| No unmitigated Critical risks | Yes |
| ADRs written for all major decisions | Yes |
| Sponsor sign-off | Yes |

---

## Output Artifacts (Phase 3 Exit Criteria)

- [ ] Fitness function register — defined and baselined
- [ ] Spike results — documented for all high-risk assumptions
- [ ] PoC code (if applicable) — in a branch or throwaway repo, not production
- [ ] Well-Architected review findings — documented
- [ ] Updated risk register — post-spike
- [ ] Updated ADRs — any design changes from spikes reflected
- [ ] Go / No-Go decision — documented with sign-off

---

## Tools

| Purpose | Tool |
|---|---|
| Load & performance testing | [k6](https://k6.io/), [Gatling](https://gatling.io/), [Apache JMeter](https://jmeter.apache.org/) |
| Chaos engineering | [AWS FIS](https://aws.amazon.com/fis/), [Chaos Monkey](https://netflix.github.io/chaosmonkey/), [LitmusChaos](https://litmuschaos.io/) |
| Dependency analysis / coupling | [ArchUnit](https://www.archunit.org/) (Java), [Deptrac](https://github.com/qossmic/deptrac) (PHP), [Dependency Cruiser](https://github.com/sverweij/dependency-cruiser) (JS/TS) |
| Security / CVE scanning | [Snyk](https://snyk.io/), [GitHub Dependabot](https://docs.github.com/en/code-security/dependabot) |
| Well-Architected review | [AWS Well-Architected Tool](https://aws.amazon.com/well-architected-tool/) |
| API contract testing | [Pact](https://pact.io/) (consumer-driven contracts) |

---

## Common Pitfalls

!!! failure "Treating a PoC as production-ready code"
    PoC code exists to answer a question, not to ship. When the spike is done, discard the code (or clearly mark it as throwaway) and rebuild properly in Phase 4.

!!! warning "Skipping fitness functions"
    Without measurable fitness functions, architecture quality degrades silently. Teams optimise for feature velocity, and quality attributes erode until an incident forces the conversation.

!!! warning "Holding the review with only technical stakeholders"
    A go/no-go decision that excludes the business sponsor, security, or operations creates blind spots. Architectural decisions have consequences for all of them.

---

## Reference Sources

- *Building Evolutionary Architectures* — Ford, Parsons, Kua, O'Reilly (fitness functions concept)
- ATAM (Architecture Trade-off Analysis Method) — SEI Carnegie Mellon
- AWS Well-Architected Framework — [aws.amazon.com/architecture/well-architected](https://aws.amazon.com/architecture/well-architected/)
- DORA Metrics — [dora.dev](https://dora.dev/)
- Chaos Engineering — *Chaos Engineering* by Basiri et al., O'Reilly
