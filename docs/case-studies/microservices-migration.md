# Case Study: Microservices Migration

**Project:** E-Commerce Platform Decomposition  
**Duration:** 14 months  
**Team size:** 3 squads (~18 engineers)  
**Status:** Completed

---

## Context

The platform was a 7-year-old Java monolith serving ~2M daily active users. Deployment cycles had grown to 3 weeks due to test and merge conflicts across 40+ concurrent feature branches. A single deployment gate blocked all product squads.

The business goal: enable each squad to deploy independently, at their own cadence, without coordination overhead.

---

## Constraints

- Zero planned downtime — live traffic throughout the migration.
- No full rewrite — incremental extraction only.
- Existing Oracle database could not be replaced in year one.
- On-prem data center, moving to AWS in parallel (not a blocker, but relevant).

---

## Approach: Strangler Fig + Anti-Corruption Layer

We applied the **Strangler Fig** pattern — new capabilities built as services from day one; existing features extracted one bounded context at a time.

```
                  ┌──────────────────────────────────┐
Browser/App ─────►│  API Gateway (Kong)               │
                  └────────────┬─────────────────────┘
                               │
              ┌────────────────┼──────────────────┐
              ▼                ▼                  ▼
       [Order Service]  [Inventory Service]  [Legacy Monolith]
              │
              └── still writing to shared DB (transitional)
```

An **Anti-Corruption Layer** (ACL) translated between the monolith's data model and the new service's domain model, preventing the monolith's concepts from leaking into new services.

---

## Key Decisions

### ADR-001: Shared database in phase 1 (accepted, later superseded)

Keeping the shared Oracle database in phase 1 was a pragmatic trade-off. It allowed incremental extraction without a data migration risk, but created coupling at the persistence layer. This was revisited in phase 2.

### ADR-002: Synchronous REST for public APIs, async events for internal integration

All external-facing APIs remained REST. Inter-service communication used SQS events where eventual consistency was acceptable (inventory updates, notifications) and REST where synchronous response was required (payment authorization).

---

## Timeline

| Phase | Duration | Outcome |
|---|---|---|
| 1 — Strangler setup + API Gateway | 2 months | All traffic routed through gateway |
| 2 — Extract Order domain | 3 months | Orders service live; monolith bypassed for order flows |
| 3 — Extract Inventory domain | 3 months | Inventory service live; shared DB removed for this domain |
| 4 — Extract Notifications + async migration | 2 months | Full event-driven notifications pipeline |
| 5 — Decommission monolith core | 4 months | Monolith retired; final domains extracted |

---

## Outcomes

| Metric | Before | After |
|---|---|---|
| Deployment cycle | 3 weeks | Same-day per squad |
| Mean time to deploy | ~4 hours (coordination) | ~12 minutes (CI/CD) |
| Production incidents (3-month avg) | 8/month | 3/month |
| Deploy frequency | 2–3/month (all teams combined) | 15–20/month (each team) |

---

## What Worked Well

- **Strangler Fig** reduced migration risk dramatically. Live traffic validated each extracted service before decommissioning the old path.
- **API Gateway as the routing switch** made cut-overs reversible — flipping one route rule was all it took to roll back.
- **Domain-first thinking** helped teams draw clean boundaries. Where domains were unclear, we left them in the monolith longer rather than guessing.

---

## Lessons Learned

!!! failure "Shared database created a hidden coupling tax"
    Even with clean service APIs, shared schema access meant database schema changes required cross-team coordination — the very problem we were trying to eliminate. Push for database-per-service from the beginning, even if it's harder initially.

!!! warning "Data consistency across services is underestimated"
    Saga patterns and compensating transactions are non-trivial to implement correctly under failures. Budget significant time for this in the design phase.

!!! tip "Migration is 80% organizational, 20% technical"
    The harder problems were ownership boundaries, on-call responsibilities, and team incentives — not the code. Align the org model with the service boundaries early.

---

## What I Would Do Differently

1. Define data ownership boundaries before starting any code extraction.
2. Invest in distributed tracing (we added it in month 6 — should have been month 1).
3. Run a "strangler dry run" on a non-critical domain first to validate the pattern with the team.
