# Event-Driven Architecture

**Category:** Integration Pattern  
**Status:** Evergreen  
**Last reviewed:** 2025-01

---

## Summary

Event-driven architecture (EDA) decouples producers and consumers by routing communication through events rather than direct calls. Services emit events when their internal state changes; other services subscribe and react independently.

---

## Core Concepts

| Concept | Description |
|---|---|
| **Event** | An immutable fact — something that happened. Past tense. (`OrderPlaced`, `PaymentFailed`) |
| **Producer** | The service that emits the event. Has no knowledge of consumers. |
| **Consumer** | A service that subscribes to and handles events. |
| **Broker** | The intermediary that routes events (Kafka, RabbitMQ, SNS/SQS, EventBridge). |
| **Event schema** | The agreed-upon structure and versioning contract for an event payload. |

---

## When to Use

- Services need to react to state changes in other domains without tight coupling.
- You need to fan-out a single action to multiple downstream consumers.
- Audit trails, event sourcing, or replay capability is required.
- Async processing is acceptable (eventual consistency is tolerable).

## When NOT to Use

- You need an immediate, synchronous response from the downstream service.
- The domain is simple enough that a direct API call is cleaner and easier to reason about.
- Your team lacks the operational maturity to run and monitor a broker reliably.

---

## Trade-offs

| Benefit | Cost |
|---|---|
| Loose coupling between services | Harder to trace end-to-end flows (need distributed tracing) |
| Independent scalability per consumer | Eventual consistency — harder to reason about ordering and state |
| Resilience — broker buffers load spikes | Schema evolution requires careful versioning discipline |
| Replay capability | Dead-letter queues and poison message handling add operational overhead |

---

## Key Decisions When Adopting EDA

1. **Broker choice** — Kafka for high-throughput/ordered streams; SQS/EventBridge for AWS-native simplicity; RabbitMQ for complex routing.
2. **Event schema governance** — Use a schema registry (Confluent, Glue) or at minimum a shared repository with versioned JSON/Avro schemas.
3. **Idempotency** — Consumers must handle duplicate delivery. Design for at-least-once semantics.
4. **Ordering guarantees** — Kafka offers per-partition ordering. SQS FIFO offers per-group ordering. Most brokers offer no global ordering guarantee.
5. **Consumer group design** — Align consumer groups to bounded contexts, not individual services.

---

## Patterns to Know

=== "Choreography"

    Services react to events autonomously. No central orchestrator.  
    **Good for:** loosely coupled flows across bounded contexts.  
    **Watch out for:** distributed logic that's hard to visualize and debug.

=== "Orchestration"

    A central workflow service (saga orchestrator or Step Functions) drives the process.  
    **Good for:** complex, multi-step transactions requiring compensation logic.  
    **Watch out for:** the orchestrator becoming a god service.

---

## Lessons Learned

!!! warning "Schema drift kills EDA"
    The most common failure mode: producers change event shapes without coordinating with consumers. Enforce backward-compatible evolution from day one.

!!! tip "Instrument everything"
    Without distributed tracing (OpenTelemetry, X-Ray), debugging EDA flows becomes guesswork. Add trace context propagation into every event header.

---

## References

- *Enterprise Integration Patterns* — Hohpe & Woolf
- [CloudEvents spec](https://cloudevents.io/) — vendor-neutral event envelope standard
- Martin Fowler — [What do you mean by "Event-Driven"?](https://martinfowler.com/articles/201701-event-driven.html)
