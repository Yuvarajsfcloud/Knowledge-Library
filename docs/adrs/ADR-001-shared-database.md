# ADR-001: Use a Shared Database During Phase 1 of Service Extraction

**Date:** 2024-03-15  
**Status:** Superseded by [ADR-003](ADR-003-database-per-service.md)  
**Deciders:** CTO, Engineering Lead, Applications Architect  
**Context:** Microservices Migration — Phase 1

---

## Context

The platform is a 7-year-old Java monolith backed by a single Oracle database schema with ~320 tables. The business requires that individual squads be able to deploy independently.

In Phase 1, the first two services (Order Service, Inventory Service) are being extracted. The team is small (18 engineers), has no prior microservices operational experience, and is targeting an 8-week first delivery milestone.

A full data migration to separate databases in Phase 1 would require:
- Schema decomposition of deeply coupled tables
- Dual-write consistency logic during migration
- Acceptance of data migration risk alongside service extraction risk
- Estimated additional 6–8 weeks of work

The business constraint is a firm 9-month programme window.

---

## Decision

**Accept shared Oracle database access in Phase 1 for the Order Service and Inventory Service.**

Both services will access the existing Oracle schema directly via a dedicated read/write user with table-scoped permissions. No cross-service join queries are permitted; each service may only access the tables it logically owns.

This is an explicitly accepted architectural debt with a planned remediation timeline (Phase 2).

---

## Consequences

### Positive
- Reduces Phase 1 delivery risk by decoupling service extraction from data migration.
- Allows the team to validate service boundaries and API contracts before committing to a data ownership model.
- Delivery timeline remains achievable.

### Negative / Trade-offs
- Database schema changes still require cross-team coordination — the primary problem we are solving remains partially present.
- Shared schema creates implicit coupling at the persistence layer that is invisible at the API level.
- Oracle licensing costs are not reduced (one large instance vs. multiple smaller ones).
- If the shared DB becomes a bottleneck, it affects all extracted services.

### Neutral
- Monitoring and alerting must be extended to track per-service DB connection pool usage.
- DBA team must enforce the table ownership policy (which services may access which tables).

---

## Alternatives Considered

| Option | Why rejected |
|---|---|
| Database-per-service from the start | Scope too large for Phase 1 window; adds data migration risk concurrently with service extraction risk |
| Read replica per service, shared write | Adds infrastructure complexity without solving write-side coupling; adds latency to reads |
| Event sourcing for the extracted domains | Team has no event sourcing experience; high implementation risk in first phase |

---

## Remediation Plan

This decision is to be superseded by **ADR-003** in Phase 2.

Phase 2 plan:
1. Define table ownership model per bounded context (8 weeks)
2. Introduce an Anti-Corruption Layer (ACL) in each service to abstract DB access behind a domain repository interface
3. Migrate Order domain tables to a dedicated PostgreSQL instance
4. Migrate Inventory domain tables to a dedicated PostgreSQL instance
5. Remove Oracle access for extracted services

**Review date:** End of Phase 1 (target: 2024-08-01)

---

## Related

- [ADR-002: Use async events for cross-domain integration](ADR-002-async-events.md)
- [Case Study: Microservices Migration](../case-studies/microservices-migration.md)
