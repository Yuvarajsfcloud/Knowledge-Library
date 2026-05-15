# Implementation Governance (Phase G)

**TOGAF Reference:** Part II, Chapter 12 — Phase G
**Objective:** Provide architectural oversight of the implementation, ensuring delivery conforms to the Target Architecture and that variations are governed.

> Phase G is *active oversight* during delivery. The architect's role shifts from designer to governor: enforcing the Architecture Contract, conducting compliance reviews, and approving dispensations when justified.

---

## Foundations

**Quick recall:** Phase G is the longest-running ADM phase — it spans the entire delivery period, often years. It is where architecture *earns its keep* by preventing erosion of the target state through unmanaged variation.

The three operational artefacts: **Compliance Reviews** (scheduled and ad-hoc), **Dispensations** (formally approved deviations), and **Architecture Contracts** (the standard against which delivery is measured).

---

## Concepts & Relationships

```
Phase F Architecture Contract ──> Delivery starts
                                       │
                                       ▼
                            Compliance Reviews (scheduled)
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
    Conforms ──> Continue       Minor variance ──> Note      Material variance
                                                              │
                                                              ▼
                                                    Dispensation Request
                                                              │
                                                              ▼
                                                Architecture Board decision
                                                              │
                                          ┌───────────────────┴──────────────┐
                                          ▼                                  ▼
                                    Approved + tracked              Rejected — must remediate
```

---

## Execution Guidance

### Compliance Review Checklist

A compliance review is a structured conversation between the architect and the delivery team, typically at:

- Pre-development (architecture is signed off before code begins)
- Iteration milestones (every 4–6 weeks for active WPs)
- Pre-production (must pass before go-live)
- Post-production (within 60 days of go-live)
- Annually for in-life systems

=== "Architecture Conformance"

    - [ ] Implementation matches Architecture Definition Document
    - [ ] All Architecture Building Blocks (ABBs) realised by approved Solution Building Blocks (SBBs)
    - [ ] Integration patterns match Integration Catalogue
    - [ ] Technology choices match Phase D Technology Architecture
    - [ ] Data ownership matches Phase C Data Architecture
    - [ ] Significant deviations have approved Dispensations

=== "Non-Functional"

    - [ ] Availability target met (per Architecture Contract)
    - [ ] Performance target met (latency, throughput)
    - [ ] Scalability evidence (load test results)
    - [ ] Recoverability (RPO/RTO) tested
    - [ ] Observability: golden signals exposed
    - [ ] Capacity headroom acceptable

=== "Security & Compliance"

    - [ ] Threat model current
    - [ ] SAST / DAST / dependency scans clean
    - [ ] Secrets management compliant
    - [ ] PII handling per Data Architecture
    - [ ] Audit logging enabled
    - [ ] Regulatory controls (GDPR, PCI, etc.) verified

=== "Operability"

    - [ ] Runbook complete
    - [ ] On-call rotation established
    - [ ] Alerts tuned (no expected noise)
    - [ ] DR plan tested
    - [ ] Cost monitoring in place

### Dispensation Request

A dispensation is a *formally approved* deviation from the architecture. It is **not** an excuse to ignore architecture — it is the governance mechanism that makes deviation visible, time-bound, and accountable.

```
DISPENSATION REQUEST — DR-2026-014

Requesting team: Orders Squad
Work Package: WP-04 Order Service
Architecture standard breached:
  Phase D Technology Architecture mandates PostgreSQL for all transactional data.
  This service requires DynamoDB for write throughput at peak.

Justification:
  Forecast peak: 50,000 writes/sec sustained for 4 hours during seasonal events.
  Benchmarked PostgreSQL with read replicas: max 12,000 writes/sec at acceptable latency.
  DynamoDB benchmarked at 80,000 writes/sec at p99 < 20ms.

Alternatives considered:
  1. Sharded PostgreSQL — rejected: operational complexity > savings vs. DynamoDB
  2. Cassandra — rejected: no in-house operational expertise
  3. PostgreSQL + write-through cache — rejected: cache eviction during peak unsafe

Risks introduced by dispensation:
  - Two database technologies in production (operational overhead)
  - Backup/restore procedures differ
  - Data consistency model differs (eventual vs. strong)

Mitigations:
  - DynamoDB ops runbook authored before go-live
  - DR plan validated quarterly
  - Reviewed annually; revisit if PostgreSQL performance improves materially

Validity:
  Granted for the lifetime of WP-04. Re-review on substantial architecture change.

Decision (Architecture Board):
  [ ] Approved      [ ] Approved with conditions      [ ] Rejected
  Conditions: ____________________________________________________
  Decision date: __________  Reviewers: ___________________________
```

### Variance Tracking

Every dispensation creates a **variance** that must be tracked in the Architecture Repository. The variance log is the source of truth for *what is non-standard in production*.

| Variance ID | System | Standard breached | Dispensation | Granted | Expires/Reviews |
|---|---|---|---|---|---|
| V-2026-014 | Order Service DB | PostgreSQL standard | DR-2026-014 | 2026-04-12 | 2027-04-12 |

If the variance log is not maintained, the next architect inherits a landscape with no map of where the deviations are.

---

## Analysis & Insights

**Deep reasoning:** Phase G fails when it becomes either *invisible* (architects never look at delivery) or *adversarial* (architects say no but offer no path forward). The middle ground is **early, frequent, helpful conversations** — caught at iteration 3, an architectural drift can be corrected in days; caught at pre-production, it requires a dispensation or rework.

The compliance review is not an audit. It is a **two-way conversation** in which the architect also commits to fixing problems in the architecture standards if delivery exposes a real gap.

---

## Decision Frameworks

**Judgment & trade-offs:** when granting dispensations:

| Question | Approve when… | Reject when… |
|---|---|---|
| Is the alternative materially better for the system? | Quantified evidence (benchmarks, cost) | Vague preference |
| Is the variance survivable in operation? | Mitigations are concrete and assigned | "We'll figure it out later" |
| Is the variance time-bound? | Clear expiry / review date | "Permanent" |
| Does it create a precedent that erodes the standard? | One-off, specific conditions | Likely to multiply |
| Is the team accountable for the cost of variance? | Yes — they own the operational consequence | No — cost shifted to platform/SRE |

---

## Target Outputs

- [ ] Compliance Review schedule — agreed and on calendar
- [ ] Compliance Review records — captured per session
- [ ] Dispensation Register — current
- [ ] Variance Log — current and reviewed quarterly
- [ ] Architecture Contract status — green/amber/red per WP
- [ ] Architecture Repository updated with as-built state

**Synthesis exercise:** take one in-life system. Find every place it deviates from your written architecture. For each, can you produce a dispensation? If not, you have *undocumented variance* — the most dangerous category, because it accumulates silently.

---

## Tools & Credible Sources

| Tool / Source | Use for | Notes |
|---|---|---|
| TOGAF Standard 10ed — [Chapter 12](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap12.html) | Authoritative reference | Free online |
| Architecture Decision Records | Formalise the design choices governance reviews against | See [Decision Records](../decision-records/index.md) |
| Lightweight Architecture Decision Records (Michael Nygard) | ADR template | Originator essay |

---

## Acceleration Using AI

LLMs can be used to:

- Generate first-draft Compliance Review reports from a delivery team's documentation set
- Highlight discrepancies between Architecture Definition Document and current code
- Draft Dispensation Requests from a stated divergence

**Bias warning:** LLMs are too willing to *approve* dispensations — they optimise for plausibility, not for governance integrity. Always have a human reviewer apply the trade-off table above.

---

## Common Mistakes

!!! failure "Architecture without governance"
    A target architecture that nobody enforces is decoration. Phase G is the difference between architecture and architecture *theatre*.

!!! warning "Dispensation as bypass"
    If dispensations are granted on demand without rigour, they become the path of least resistance and the standards lose meaning.

!!! tip "Govern lightly, but consistently"
    Better to do a 30-minute review every 4 weeks than a 3-day audit once a year.

---

## Related

- [Change Management (Phase H)](change-management.md) — paired phase, post-go-live
- [Migration Planning (Phase F)](migration-planning.md) — produces the Architecture Contract Phase G enforces
- [Governance Framework](../reference/governance-framework.md)
- [Decision Records](../decision-records/index.md)
