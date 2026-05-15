# Playbook: Incident Response

**Scope:** Production incidents — severity P1 and P2  
**Owner:** On-call engineer  
**Last reviewed:** 2025-01

---

## Severity Definitions

| Severity | Definition | Response SLA |
|---|---|---|
| **P1** | Full outage or data loss affecting all or majority of users | Page immediately, 15-min bridge |
| **P2** | Significant degradation affecting a subset of users or a critical flow | Page, 30-min response |
| **P3** | Minor degradation, workaround available | Ticket, next business day |

---

## Phase 1 — Detect & Declare (0–5 min)

1. **Confirm the alert is real.** Check the dashboard — distinguish a monitoring flap from an actual incident.
2. **Declare the incident.** Open an incident channel: `#inc-YYYY-MM-DD-<short-description>`.
3. **Assign roles:**
    - **Incident Commander (IC):** coordinates response, owns communication.
    - **Technical Lead:** drives diagnosis and fix.
    - **Comms lead** (P1 only): manages stakeholder updates.
4. **Post the incident summary** in the channel (use the template below).

??? note "Incident declaration template"
    ```
    INCIDENT DECLARED — P{severity}
    Time: {HH:MM UTC}
    Summary: {one-line description of impact}
    IC: {name}
    Tech Lead: {name}
    Status: Investigating
    Next update: {HH:MM UTC}
    ```

---

## Phase 2 — Diagnose (5–20 min)

Work top-down: user impact → service layer → infrastructure.

### Step 1 — Establish user impact scope

```bash
# Check error rate spike (example: Datadog CLI or AWS CloudWatch)
# What % of requests are failing? Which endpoints? Which regions?
```

- [ ] What percentage of users are affected?
- [ ] Is the impact global or regional?
- [ ] Is it getting worse, stable, or improving?

### Step 2 — Identify the failing component

- [ ] Check the service dependency map — which upstream/downstream services are involved?
- [ ] Review recent deployments: was anything deployed in the last 2 hours?
- [ ] Check infrastructure events: auto-scaling, node failures, DB failover?

### Step 3 — Form a hypothesis

State it explicitly in the incident channel:

> "Hypothesis: the payment service is timing out because the Redis connection pool is exhausted following the 14:30 deploy."

This forces clarity and avoids multiple engineers chasing unrelated leads silently.

---

## Phase 3 — Mitigate (aim: restore service before root cause is known)

!!! important
    Mitigation and root cause analysis are separate activities. Restore service first. Investigate fully afterward.

### Mitigation options (in order of preference)

| Option | When to use |
|---|---|
| **Rollback the deploy** | Incident started within 2 hours of a deployment |
| **Feature flag off** | The failing code path is behind a flag |
| **Reroute traffic** | A single region or AZ is affected; reroute to healthy zone |
| **Scale out** | Resource exhaustion — add capacity while the fix is prepared |
| **Circuit breaker / graceful degradation** | Enable degraded mode to protect the core user flow |

### Rollback procedure (example: Kubernetes)

```bash
# Check current rollout history
kubectl rollout history deployment/<service-name> -n <namespace>

# Roll back to the previous revision
kubectl rollout undo deployment/<service-name> -n <namespace>

# Monitor rollout
kubectl rollout status deployment/<service-name> -n <namespace>
```

---

## Phase 4 — Communicate

### P1 stakeholder update cadence

- **Every 15 minutes** until service is restored.
- Use this template:

```
UPDATE — {HH:MM UTC}
Status: {Investigating | Mitigating | Resolved}
Impact: {current user impact}
Progress: {what has been done}
Next step: {what is being tried next}
ETA: {estimate or "unknown"}
Next update: {HH:MM UTC}
```

### Resolution message

```
RESOLVED — {HH:MM UTC}
Duration: {X hours Y minutes}
Root cause: {brief description}
Fix applied: {rollback | patch | config change}
Action items: {link to post-mortem ticket}
```

---

## Phase 5 — Resolve & Hand Off

- [ ] Confirm error rates have returned to baseline.
- [ ] Confirm monitoring alerts have cleared.
- [ ] Remove any temporary mitigations from the incident channel log.
- [ ] Create a post-mortem ticket (P1: required within 48h; P2: within 1 week).
- [ ] Close the incident channel (archive, do not delete).

---

## Post-Mortem Template

> File post-mortems in `docs/case-studies/` and link from the relevant service runbook.

**Sections:**
1. Summary — one paragraph
2. Timeline — what happened and when (UTC timestamps)
3. Root cause — the actual technical explanation
4. Contributing factors — what made this worse or harder to detect
5. Action items — owner, ticket, due date
6. What went well — always include this

---

## Quick Reference

| Action | Command / Location |
|---|---|
| Incident channel | `#inc-YYYY-MM-DD-description` |
| Runbooks | `docs/playbooks/` |
| Service dependency map | *(link your internal diagram here)* |
| On-call rotation | *(link your PagerDuty / OpsGenie schedule here)* |
| Deployment history | *(link your CI/CD dashboard here)* |
