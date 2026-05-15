# ADR-006: Evaluate GraphQL Federation for the Unified API Layer

**Date:** 2025-06-20  
**Status:** Proposed  
**Deciders:** CTO, Engineering Lead, API Product Owner, Frontend Lead  
**Context:** API Strategy — Client-Facing API Composition

---

## Context

As services have multiplied ([ADR-003](ADR-003-database-per-service.md)), the web and mobile clients increasingly need data that spans multiple bounded contexts. Two patterns have emerged organically:

1. **Frontend orchestration** — the client makes 4–8 REST calls per screen and assembles the view. Causes waterfall latency on mobile networks and duplicate auth/serialisation cost.
2. **Ad-hoc BFF endpoints** — a backend-for-frontend exposes `/screens/orderDetail` that internally composes calls. This works but each new screen adds an endpoint, BFF teams become a bottleneck, and the contract is implicit.

Neither pattern scales. We need a unified, declarative API surface where clients ask for exactly the data they need and the platform composes the response.

---

## Decision (Proposed)

**Adopt Apollo Federation v2 as the unified client-facing API layer, with each domain service publishing a GraphQL subgraph that contributes to a single federated supergraph.**

Specifically:
- A managed Apollo Router instance is the single entry point for all client GraphQL traffic.
- Each domain service (Order, Inventory, Catalogue, Customer, …) exposes a GraphQL subgraph alongside its existing REST API. REST is retained for internal service-to-service and for partner integrations.
- Subgraph schemas are owned by the team that owns the service. Cross-subgraph references use Federation's `@key` and `@requires` directives.
- A schema registry (Apollo Studio or self-hosted alternative) enforces schema composition checks on PR.
- Auth tokens from [ADR-005](ADR-005-oauth-oidc.md) propagate to subgraphs via the router; subgraphs enforce field-level authorisation.

This decision is **Proposed** pending a 6-week proof of concept with Order + Catalogue + Customer subgraphs.

---

## Consequences (Anticipated)

### Positive
- Clients query exactly what they need — solves over- and under-fetching simultaneously.
- A single network call per screen on mobile.
- Schemas are explicit, versioned, and centrally inspectable.
- Subgraph ownership preserves team autonomy — no shared BFF bottleneck.
- Strong tooling: codegen for typed clients, schema linting, persisted queries.

### Negative / Trade-offs
- GraphQL is operationally less mature than REST in our stack — caching, observability, and rate limiting all require GraphQL-aware tooling.
- N+1 query risk at the subgraph level demands DataLoader discipline.
- Federation adds a learning curve on top of GraphQL — `@key`, `@external`, `@requires`, `@provides` semantics are non-trivial.
- The router is now a hot critical-path component; its availability and latency budget matter to every client.
- Authorization at field-level in a federated graph is genuinely hard. Mistakes leak data across security boundaries.

### Neutral
- REST APIs are not deprecated. Partners, internal service-to-service calls, and webhooks remain REST.
- Existing BFF endpoints will be deprecated as their consumers migrate to the federated graph.

---

## Alternatives Considered

| Option | Why being evaluated |
|---|---|
| **Status quo — REST + per-screen BFF** | Working but does not scale to projected screen count and team count |
| **GraphQL with a single schema (not federated)** | Forces all teams to coordinate on one schema repo — recreates the monolith problem |
| **OData** | Strong filtering/query semantics but smaller ecosystem and weaker JS tooling |
| **gRPC + grpc-web** | Excellent for internal service-to-service ([ADR-002](ADR-002-async-events.md) context), but ergonomics for browsers and dynamic queries are poor |
| **tRPC** | Attractive for full-stack TypeScript shops; we are a polyglot backend (Java, Go, Python) |

---

## Proof-of-Concept Plan

The decision will be finalised based on a PoC measuring:

| Question | How we'll answer it |
|---|---|
| Does federation cleanly model real cross-domain reads? | Implement Order + Customer + Catalogue subgraphs; build 3 representative client queries |
| What is the latency overhead of the router? | p50, p95, p99 of router-fronted vs. direct subgraph calls |
| Can subgraph teams ship independently? | Run 2 weeks of normal subgraph changes; measure breakage rate and PR-cycle time |
| How costly is field-level authz? | Implement for one sensitive field (`customer.email`) end-to-end |

**Decision target:** End of Q3 2025.

---

## Related

- [ADR-002: Async events for cross-domain integration](ADR-002-async-events.md)
- [ADR-003: Database-per-service in Phase 2](ADR-003-database-per-service.md)
- [ADR-005: OAuth 2.0 / OIDC via Keycloak](ADR-005-oauth-oidc.md)
