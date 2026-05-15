# ADR-002: Use Asynchronous Events for Cross-Domain Integration

**Date:** 2024-03-18  
**Status:** Accepted  
**Deciders:** CTO, Engineering Lead, Applications Architect, Security Lead  
**Context:** Microservices Migration — Integration Architecture

---

## Context

As services are extracted from the monolith, they need to communicate. We have three primary integration scenarios:

1. **User-facing requests** — the user is waiting for a response (checkout, search, account changes)
2. **Cross-domain state changes** — one domain needs to react to a change in another domain (inventory updated when an order is placed; notification sent when payment is confirmed)
3. **Analytics and audit** — downstream systems need a record of what happened

Scenario 1 requires synchronous communication. Scenarios 2 and 3 do not.

The team is already using AWS (migrating from on-prem). AWS SNS/SQS is available and the team has some familiarity with it.

---

## Decision

**Use REST over HTTPS for synchronous, user-facing cross-service calls.**  
**Use AWS SNS/SQS for asynchronous, cross-domain event integration.**

Specifically:
- The **Order Service** publishes events (`OrderPlaced`, `OrderCancelled`, `OrderFulfilled`) to an SNS topic per event type.
- Downstream services (**Inventory Service**, **Notification Service**) subscribe via SQS queues fanned out from the SNS topic.
- All event schemas are defined in JSON and stored in the `event-schemas/` directory in the architecture repository.
- Consumers must be idempotent — SNS/SQS delivers at-least-once; duplicate delivery must not cause duplicate side effects.
- Dead-letter queues (DLQs) are mandatory for every consumer queue, with alarms on DLQ depth.

**Prohibited patterns:**
- Direct service-to-service calls for state change notifications (tight coupling, synchronous blocking)
- Shared libraries containing domain logic (hidden coupling)
- Polling — no service may poll another service's endpoint for state changes

---

## Consequences

### Positive
- Services are decoupled: the Order Service has no compile-time or runtime dependency on downstream consumers.
- Adding a new consumer (e.g., analytics service) requires zero changes to the Order Service.
- SNS/SQS provides durable buffering, protecting consumers from producer traffic spikes.
- AWS-managed — no broker infrastructure to operate.
- Natural audit trail: all events are retained in SQS for up to 14 days.

### Negative / Trade-offs
- Eventual consistency: the inventory is not updated at the exact moment an order is placed — there is a brief lag (typically < 1s under normal load).
- Idempotency must be explicitly designed and tested for every consumer. This is non-trivial.
- Schema evolution requires coordination: breaking changes to event schemas break consumers silently if a schema registry is not enforced.
- Debugging cross-service flows requires distributed tracing (OpenTelemetry) — without it, failures are hard to trace.
- DLQ monitoring and poison message handling add operational overhead.

### Neutral
- Event schema ownership follows domain ownership: the producing service owns and versions its event schemas.
- Message ordering is not guaranteed at the SNS/SQS level for standard queues. FIFO queues are available where ordering is required (at additional cost and throughput constraints).

---

## Idempotency Design

Each consumer must implement idempotency using one of these patterns:

=== "Idempotency Key (Preferred)"
    Every event envelope includes a globally unique `eventId` (UUID v4).  
    The consumer stores processed `eventId`s in a short-lived deduplication store (DynamoDB with TTL, or Redis).  
    If an `eventId` has been processed, the consumer discards the duplicate without side effects.

=== "Natural Idempotency"
    The operation itself is naturally idempotent (e.g., `SET inventory_count = 42` is idempotent; `DECREMENT inventory_count BY 1` is not).  
    Use this pattern only where the domain logic is genuinely idempotent.

---

## Event Schema Standard

All events must include this envelope. Domain-specific fields go in `data`.

```json
{
  "eventId": "uuid-v4",
  "eventType": "OrderPlaced",
  "eventVersion": "1.0",
  "producerService": "order-service",
  "occurredAt": "2024-03-18T14:32:00Z",
  "correlationId": "uuid-v4",
  "data": {
    "orderId": "...",
    "customerId": "...",
    "items": [...]
  }
}
```

**Schema versioning rules:**
- **Backward-compatible changes** (add optional fields): increment minor version (1.0 → 1.1). No consumer coordination required.
- **Breaking changes** (remove fields, rename, change types): increment major version (1.0 → 2.0). Publish to a new topic. Maintain old topic until all consumers are migrated.

---

## Alternatives Considered

| Option | Why rejected |
|---|---|
| Synchronous REST for all cross-service calls | Creates tight coupling and synchronous failure cascades — antithetical to the resilience goal |
| Apache Kafka | More powerful than needed for current scale; significant operational overhead for a team with no Kafka experience; revisit if throughput/ordering requirements change |
| AWS EventBridge | Considered; SNS/SQS preferred for the fan-out pattern due to team familiarity and simpler consumer management |
| RabbitMQ (self-hosted) | Requires infrastructure management; rejected in favour of managed AWS service |
| Polling | Anti-pattern; creates unnecessary load, coupling, and latency |

---

## Review Criteria

Revisit this decision if:
- Message throughput exceeds 10K events/second sustained (evaluate Kafka)
- Strict event ordering is required across multiple partitions (evaluate Kafka)
- Complex event routing logic is needed beyond fan-out (evaluate EventBridge)

**Review date:** Post-Phase 2 (target: 2025-01-01)

---

## Related

- [ADR-001: Shared database in Phase 1](ADR-001-shared-database.md)
- [Architecture Note: Event-Driven Architecture](../architecture/event-driven-architecture.md)
- [Case Study: Microservices Migration](../case-studies/microservices-migration.md)
