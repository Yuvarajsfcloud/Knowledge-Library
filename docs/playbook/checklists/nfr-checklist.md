# Non-Functional Requirements (NFR) Checklist

> Use this early in design to surface NFRs that are often left implicit, and revalidate before go-live. For the deeper conceptual treatment, see [Architecture Vision (Phase A)](../../knowledge/adm/architecture-vision.md) and [Implementation Governance (Phase G)](../../knowledge/adm/implementation-governance.md).

**System / capability:** ____________________
**Reviewer(s):** ____________________
**Date:** ____________________

---

## Performance

- [ ] **Latency target** — p50, p95, p99 stated for each critical operation
- [ ] **Throughput target** — sustained and peak (req/sec, msg/sec)
- [ ] **Concurrency** — expected concurrent users / sessions
- [ ] **Resource ceiling** — CPU, memory, network upper bounds

## Availability & Recoverability

- [ ] **Availability target** — % per quarter (e.g., 99.9%)
- [ ] **RPO** — maximum tolerable data loss (in time)
- [ ] **RTO** — maximum tolerable downtime (in time)
- [ ] **Failover** — automatic vs. manual; tested how often
- [ ] **Backup** — frequency, retention, restore-tested in last 6 months

## Scalability

- [ ] **Scaling axis** — vertical, horizontal, or both
- [ ] **Scale trigger** — automatic (metric-based) or manual
- [ ] **Scale ceiling** — what limits further scale; cost or technical
- [ ] **Capacity headroom** — current vs. peak forecast

## Security

- [ ] **AuthN** — how users / services prove identity
- [ ] **AuthZ** — what controls access decisions; granularity
- [ ] **Encryption** — at rest, in transit; key management
- [ ] **Data classification** — handled per Phase C Data Architecture
- [ ] **Audit** — what is logged, retention, immutability
- [ ] **Threat model** — current, reviewed annually

## Privacy & Compliance

- [ ] **Personal data** — categorised; lawful basis stated
- [ ] **Retention** — defined and enforced per data category
- [ ] **Right to erasure** — process exists and tested
- [ ] **Cross-border transfer** — mechanism (SCC, adequacy) documented
- [ ] **Regulator-specific controls** — list applicable (GDPR, PCI-DSS, HIPAA, ...)

## Observability

- [ ] **Logs** — structured, sampled, retained
- [ ] **Metrics** — golden signals plus business metrics
- [ ] **Traces** — distributed tracing through critical paths
- [ ] **Alerts** — on symptoms not causes; tuned (no expected noise)
- [ ] **Dashboards** — operations and business

## Cost

- [ ] **Cost model** — per-tenant, per-request, per-MB unit cost stated
- [ ] **Budget** — monthly target and threshold for alerting
- [ ] **Cost optimisation review** — quarterly cadence agreed

## Operability

- [ ] **Runbook** — current
- [ ] **Deployment** — automated, repeatable, rollback-tested
- [ ] **Configuration management** — versioned, no manual edits
- [ ] **Documentation** — onboarding new on-call < 1 day

## Maintainability

- [ ] **Code coverage** — agreed minimum
- [ ] **Static analysis** — SAST, lint clean
- [ ] **Dependency scanning** — automated, alerts on vulnerabilities
- [ ] **Documentation** — README, ADRs, architecture diagrams current

---

## Decision

- [ ] All NFRs have agreed target values
- [ ] All targets have a verification approach (test, monitor, audit)
- [ ] Owner identified for each NFR

**Outcomes / open NFRs:** ____________________
