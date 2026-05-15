# ADR-003: Adopt Database-per-Service in Phase 2

**Date:** 2024-09-12  
**Status:** Accepted (supersedes [ADR-001](ADR-001-shared-database.md))  
**Deciders:** CTO, Engineering Lead, Applications Architect, Data Architect  
**Context:** Microservices Migration — Phase 2

---

## Context

Phase 1 ([ADR-001](ADR-001-shared-database.md)) consciously accepted shared Oracle access as transitional debt. Phase 1 has now completed:

- Order Service and Inventory Service are deployed and operating against the shared schema.
- Service boundaries and API contracts have been validated in production.
- Cross-team coordination overhead on schema changes is now the single largest source of release delay — confirming the original concern.

Phase 2's goal is to remove the shared-schema bottleneck and give each service true data autonomy.

---

## Decision

**Each bounded context owns its own database. No service may read or write tables owned by another service.**

Specifically:
- **Order Service** → dedicated PostgreSQL 15 instance
- **Inventory Service** → dedicated PostgreSQL 15 instance
- The Oracle monolith retains ownership of all not-yet-extracted domains
- Cross-domain data needs are satisfied via the event bus established in [ADR-002](ADR-002-async-events.md) or via explicit synchronous APIs — never via direct DB access
- Read-only analytics requirements are satisfied by a separate data warehouse fed from CDC streams, not by direct service-DB reads

---

## Consequences

### Positive
- Eliminates implicit coupling at the persistence layer.
- Each service can evolve its schema independently — no cross-team release coordination.
- Each service can choose data store characteristics appropriate to its workload (currently both PostgreSQL, but the door is open).
- Failure isolation: a slow query in Inventory cannot starve the connection pool for Order.

### Negative / Trade-offs
- Cross-service joins are no longer possible at the DB level. All "join-like" needs must be served by API composition or event-sourced read models.
- Distributed transactions are no longer available. The Saga pattern (already adopted with [ADR-002](ADR-002-async-events.md)) is now mandatory for multi-service operations.
- Operational footprint grows: more databases to back up, monitor, patch.
- Initial data migration cost (see Migration Plan below).

### Neutral
- Reference data (currency codes, country lists) is duplicated per service via cached snapshots refreshed from a master service.
- Reporting/BI moves entirely to the warehouse — no more "quick read against prod".

---

## Alternatives Considered

| Option | Why rejected |
|---|---|
| Keep shared schema, fix only the worst tables | Half-measure; the coordination overhead remains for any non-trivial change |
| Single multi-tenant PostgreSQL with schema-per-service | Easier ops but still permits implicit coupling via DB user mistakes; same blast radius |
| Move to NoSQL (DynamoDB) | Premature; current workloads are relational and team has deep PostgreSQL skills |

---

## Migration Plan

1. Define table ownership per bounded context — produces a clear list of tables to extract.
2. Introduce a repository abstraction in each service so DB access goes through a single seam.
3. Run dual-write phase: writes go to both Oracle and the new PostgreSQL; reads remain on Oracle.
4. Run dual-read verification: shadow reads from PostgreSQL, compare against Oracle, alert on drift.
5. Cut over reads to PostgreSQL.
6. Stop dual-writes; remove Oracle access for the service.
7. Decommission ownership of those tables in Oracle.

**Estimated timeline:** 14 weeks for Order + Inventory.

---

## Related

- [ADR-001: Shared database in Phase 1](ADR-001-shared-database.md) (superseded by this)
- [ADR-002: Async events for cross-domain integration](ADR-002-async-events.md)
- [Case Study: Microservices Migration](../case-studies/microservices-migration.md)
