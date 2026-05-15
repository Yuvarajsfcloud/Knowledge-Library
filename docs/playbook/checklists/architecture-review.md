# Architecture Review Checklist

> Use this for a pre-production architecture review of a new system or major change. For ongoing in-life governance, see [Implementation Governance (Phase G)](../../knowledge/adm/implementation-governance.md).

**System under review:** ____________________
**Change / Work Package ID:** ____________________
**Reviewer(s):** ____________________
**Date:** ____________________

---

## 1. Context & Scope

- [ ] Business capability the system supports is named and documented
- [ ] In-scope and out-of-scope user journeys are stated
- [ ] Stakeholders are listed (owners, users, operators, governance)

## 2. Architecture Conformance

- [ ] System matches the Architecture Definition Document
- [ ] All ABBs realised by approved SBBs (or dispensations recorded)
- [ ] Integration patterns match the Integration Catalogue
- [ ] Technology choices match Phase D Technology Architecture
- [ ] Data ownership matches Phase C Data Architecture
- [ ] Significant ADRs in scope are listed and current

## 3. Non-Functional

- [ ] Availability target stated and evidenced
- [ ] Performance targets (latency, throughput) stated and load-tested
- [ ] Scalability path (vertical, horizontal) is clear
- [ ] Recoverability: RPO and RTO are stated and tested
- [ ] Capacity headroom is quantified (>30% recommended at go-live)

## 4. Observability

- [ ] Golden signals exposed (latency, traffic, errors, saturation)
- [ ] Structured logs, sampled & retained per policy
- [ ] Distributed tracing wired through critical paths
- [ ] Alerts tuned: no expected noise; on-call playbook complete
- [ ] Dashboards published; reviewed by SRE

## 5. Security & Compliance

- [ ] Threat model exists and is current
- [ ] SAST / DAST / dependency scans clean
- [ ] Secrets in vault; no secrets in code or configs
- [ ] PII flows documented; controls match classification
- [ ] Authentication & authorisation per ADRs
- [ ] Audit logging enabled for sensitive operations
- [ ] Regulatory controls (GDPR/PCI/etc.) verified

## 6. Operability

- [ ] Runbook exists and is current
- [ ] On-call rotation established
- [ ] Disaster recovery plan exists and has been exercised
- [ ] Rollback strategy is documented and tested
- [ ] Cost monitoring and budget alerts in place

## 7. Decision

- [ ] **Approved** — proceed to go-live
- [ ] **Approved with conditions** — list:
- [ ] **Deferred** — re-review on: ____________________
- [ ] **Rejected** — reasons:

**Reviewer signatures:** ____________________
