[:material-home: KB Home](../index.html){ .md-button .md-button--primary } &nbsp; [Open full Patterns page →](../patterns.html){ .md-button }

# Design Patterns

A curated catalogue of architectural and software patterns — with problem, solution, trade-offs, and "use when" guidance.

!!! info "Canonical view"
    The interactive, filterable pattern catalogue lives on the visual KB site:
    **[patterns.html](../patterns.html)**

---

## Patterns Covered

| Pattern | Category | One-Liner |
|---|---|---|
| **CQRS** | Distributed | Separate write model from read model; each scales independently |
| **Saga** | Messaging | Multi-service transactions via local steps + compensations |
| **Circuit Breaker** | Resilience | Fail fast and prevent cascading failures when a dependency is sick |
| **Event Sourcing** | Data | Store every state change as an immutable event; rebuild state by replay |
| **API Gateway** | Integration | Single entry point for routing, auth, rate-limiting, aggregation |
| **Backend for Frontend (BFF)** | Integration | Per-client backend tailoring responses to web/mobile shapes |
| **Strangler Fig** | Distributed | Incremental legacy replacement via routing proxy |
| **Sidecar** | Resilience | Cross-cutting infra concerns in a companion container |
| **Bulkhead** | Resilience | Isolate resource pools so failure in one cannot exhaust others |

---

## Pattern Selection Guidance

When picking a pattern, write down:

1. **The forces** — what constraints are pushing you toward a pattern?
2. **The trade-offs you accept** — every pattern adds complexity somewhere
3. **The evidence you'd accept that the pattern is wrong** — fitness functions, metrics
4. **The exit ramp** — how would you back out if the pattern doesn't fit?

A pattern adopted without these four answers is cargo-cult architecture.

---

## Related

- [Architecture Notes](../architecture/index.md) — deeper essays on selected patterns
- [ADRs](index.md) — recorded decisions where these patterns were chosen or rejected
- [Frameworks Reference](../reference/frameworks.md)

## External Sources

- [Martin Fowler — Patterns of Distributed Systems](https://martinfowler.com/articles/patterns-of-distributed-systems/)
- [microservices.io — Pattern Catalog (Chris Richardson)](https://microservices.io/patterns/)
- [Enterprise Integration Patterns (Hohpe & Woolf)](https://www.enterpriseintegrationpatterns.com/)
- [Azure Architecture Center — Cloud Design Patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/)
- [AWS Builders' Library](https://aws.amazon.com/builders-library/)
