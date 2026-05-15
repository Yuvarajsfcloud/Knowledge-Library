# Design Patterns

**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — patterns at architecture scale:** You already use design patterns: Repository, Factory, Strategy, Observer. Architectural patterns operate at the same abstraction level but govern entire systems, not classes. The key transition is that architectural patterns must be evaluated for *organisational* trade-offs — team topology, operational burden, deployment complexity — not just technical correctness. A pattern that is technically elegant but operationally unmaneable is the wrong choice.

!!! info "Companion visual page"
    A filterable visual pattern catalogue is published alongside the docs site: **[patterns.html](../../../patterns.html)**

---

## Bloom Layer A — Quick Recall

### Patterns Index

| Pattern | Category | Problem it solves | One-Liner |
|---|---|---|---|
| [CQRS](#cqrs) | Distributed | Read and write have conflicting scaling and model needs | Separate write model from read model |
| [Saga](#saga) | Messaging | Multi-service transactions without a distributed lock | Local transactions + compensating actions |
| [Circuit Breaker](#circuit-breaker) | Resilience | Cascading failure when a dependency is degraded | Fail fast; open the circuit; let the dependency recover |
| [Event Sourcing](#event-sourcing) | Data | State changes lost; audit trail absent; temporal queries impossible | Store every state change as an immutable event |
| [API Gateway](#api-gateway) | Integration | Every client speaks directly to every service | Single entry point: routing, auth, rate-limiting, aggregation |
| [Backend for Frontend (BFF)](#backend-for-frontend-bff) | Integration | One generic API cannot serve all client shapes efficiently | Per-client backend; each BFF owns its consumer's data shape |
| [Strangler Fig](#strangler-fig) | Migration | Rewriting a monolith big-bang is too risky | Route traffic progressively; extract service by service |
| [Sidecar](#sidecar) | Resilience / Integration | Every service repeats the same cross-cutting infra logic | Companion container handles infra concerns; app stays clean |
| [Bulkhead](#bulkhead) | Resilience | A slow dependency exhausts the thread pool of the whole service | Isolate resource pools; failure in one pool cannot starve others |

---

### Pattern Selection Framework

Before adopting any pattern, document:

1. **The forces** — what constraints are pushing you toward this pattern? (scaling, consistency, team boundary, NFR)
2. **The trade-offs you accept** — every pattern adds complexity somewhere; name it explicitly
3. **The fitness function** — what metric or automated check would tell you the pattern is working?
4. **The exit ramp** — how would you remove the pattern if it turns out to be wrong?

A pattern adopted without these four answers is cargo-cult architecture.

> **Source:** Pattern selection framework adapted from *Building Evolutionary Architectures* (Ford, Parsons, Kua — 2017), Chapter 2 (Fitness Functions). The four-question structure aligns with the TOGAF Architecture Decision Record requirement for constraints, consequences, and alternatives.

---

## Bloom Layer B–C — Pattern Catalogue

---

### CQRS

> **Source:** Command Query Responsibility Segregation — Martin Fowler, [martinfowler.com/bliki/CQRS.html](https://martinfowler.com/bliki/CQRS.html) (2011). Formalized by Greg Young (2010). Frequently paired with Event Sourcing but architecturally independent.

| | |
|---|---|
| **Category** | Distributed Systems |
| **Context** | A domain service has high-volume reads and writes with conflicting consistency and scaling requirements. The data model optimised for writes (normalised, transactional) performs poorly for reads (denormalised, aggregated). |
| **Problem** | A single data model cannot efficiently serve both write workloads (complex validation, consistency) and read workloads (multiple projections, low-latency queries). Scaling one scales both, and schema changes must satisfy both consumers. |
| **Solution** | Separate the *write side* (Command Model — issues Commands, applies domain logic, persists to a write store) from the *read side* (Query Model — consumes read-optimised projections, no business logic). Synchronise via events or database reads. |
| **Developer analogy** | Your database has a `transactions` table (normalised, write-optimised) and a `reporting_view` (materialised, read-optimised). CQRS extends this principle to the application layer. |

``` mermaid
flowchart LR
    Client --> CmdHandler["Command Handler\n(write side — domain logic)"]
    CmdHandler --> WriteStore[(Write Store\nnormalised DB)]
    CmdHandler --> EventBus[Event Bus]
    EventBus --> Projector["Projection Builder"]
    Projector --> ReadStore[(Read Store\ndenormalised / search)]
    Client --> QueryHandler["Query Handler\n(read side — no logic)"]
    QueryHandler --> ReadStore

    style WriteStore fill:#4F46E5,color:#fff,stroke:none
    style ReadStore fill:#7C3AED,color:#fff,stroke:none
    style EventBus fill:#06B6D4,color:#fff,stroke:none
```

#### When to use
- Reads and writes have very different scaling requirements (10:1 read:write ratio or higher)
- Multiple read projections needed from the same domain data (dashboard, API, reporting, search)
- Domain logic is complex enough that a dedicated write model improves clarity
- You are building an audit trail (CQRS pairs naturally with Event Sourcing)

#### When NOT to use
- Simple CRUD domains with few consumers — eventual consistency adds complexity without benefit
- Small teams where the operational overhead of two models outweighs the gains
- Tight consistency requirements where eventual consistency is architecturally unacceptable

#### Trade-offs

| Gain | Cost |
|---|---|
| Read side scales independently from write side | Eventual consistency — reads may lag behind writes |
| Read models are cheap to rebuild from events | Two data stores to manage; synchronisation logic to maintain |
| Write model is clean domain logic only | Higher operational complexity; debugging spans both models |
| Different technologies optimised per side | Schema changes must be propagated to both models |

---

### Saga

> **Source:** Saga pattern — original paper by García-Molina & Salem (1987) "Sagas," ACM SIGMOD. Modern microservices formulation: Chris Richardson, *Microservices Patterns* (2018), Chapter 4. [microservices.io/patterns/data/saga.html](https://microservices.io/patterns/data/saga.html)

| | |
|---|---|
| **Category** | Messaging / Distributed Transactions |
| **Context** | A business operation spans multiple services, each owning its own database. A distributed ACID transaction (2PC) would require distributed locking across services — creating tight coupling and availability risk. |
| **Problem** | How do you maintain data consistency across multiple services without a distributed transaction that couples all services to a transaction coordinator? |
| **Solution** | Break the operation into a sequence of local transactions. Each step publishes an event or message that triggers the next. If any step fails, a sequence of *compensating transactions* reverses the completed steps. |

**Two implementations:**

| Type | Coordination | When to use |
|---|---|---|
| **Choreography** | Each service reacts to events and knows what to do next; no central coordinator | Fewer services; simple flow; low coupling requirement |
| **Orchestration** | A central Saga Orchestrator tells each service what to do next | Complex flows; many services; failure handling must be centrally visible |

``` mermaid
sequenceDiagram
    participant OS as Order Service
    participant PS as Payment Service
    participant IS as Inventory Service
    participant SAGA as Saga Orchestrator

    Note over OS,SAGA: Happy path
    OS->>SAGA: Order placed
    SAGA->>PS: Reserve payment
    PS-->>SAGA: Payment reserved
    SAGA->>IS: Reserve inventory
    IS-->>SAGA: Inventory reserved
    SAGA->>OS: Confirm order

    Note over OS,SAGA: Failure path (inventory unavailable)
    SAGA->>IS: Reserve inventory
    IS-->>SAGA: Out of stock
    SAGA->>PS: Release payment (compensation)
    SAGA->>OS: Cancel order
```

#### When to use
- Business transaction spans multiple bounded contexts / services with separate databases
- Strong consistency (2PC) is unacceptable due to availability or latency requirements
- The business process has well-defined compensating actions for each step

#### When NOT to use
- Single-service transactions — use a local ACID transaction
- Operations where compensation is impossible (e.g., "send email" cannot be unsent without a separate "cancel" email)
- Teams that have not established a reliable message/event infrastructure — Sagas require at-least-once delivery guarantees

#### Trade-offs

| Gain | Cost |
|---|---|
| No distributed locking; high availability | Eventual consistency; window where data is partially applied |
| Services remain loosely coupled | Compensating transactions must be designed and tested for every step |
| Scales naturally with message throughput | Debugging multi-step failures across services is complex |
| Business process is explicit | Orchestration adds a new service to maintain; choreography creates implicit coupling via event contracts |

---

### Circuit Breaker

> **Source:** Circuit Breaker pattern — Michael Nygard, *Release It!* (2007, 2nd ed. 2018), Chapter 5. Martin Fowler, [martinfowler.com/bliki/CircuitBreaker.html](https://martinfowler.com/bliki/CircuitBreaker.html) (2014). Implementations: Netflix Hystrix (deprecated), Resilience4j, Polly (.NET).

| | |
|---|---|
| **Category** | Resilience |
| **Context** | Service A calls Service B. Service B becomes slow or unresponsive. Without protection, Service A's threads pile up waiting for B, exhausting its connection pool and causing A to fail — spreading the failure. |
| **Problem** | A degraded downstream dependency causes cascading failure upward through the call chain. Fail-fast is not naturally handled by HTTP clients, which timeout slowly. |
| **Solution** | Wrap calls to the dependency in a circuit breaker. In *Closed* state, calls pass through. After a threshold of failures, the breaker *Opens* — calls fail immediately without hitting the dependency, returning an error or fallback. After a timeout, the breaker enters *Half-Open* — one call is allowed through; if it succeeds, the breaker closes; if it fails, it reopens. |
| **Developer analogy** | Your home fuse box — when an overload occurs, the fuse breaks the circuit before the wiring catches fire. After the overload is fixed, you reset the fuse. |

``` mermaid
stateDiagram-v2
    [*] --> Closed: Initial state
    Closed --> Open: Failure threshold exceeded\n(e.g. 50% error rate in 10s)
    Open --> HalfOpen: Timeout elapsed\n(e.g. 30 seconds)
    HalfOpen --> Closed: Probe call succeeds
    HalfOpen --> Open: Probe call fails

    Closed: CLOSED\nAll calls pass through
    Open: OPEN\nAll calls fail immediately\n(fallback returned)
    HalfOpen: HALF-OPEN\nOne probe call allowed
```

#### When to use
- Any synchronous call to an external dependency (HTTP, gRPC, database, third-party API)
- Systems where cascading failure is a realistic risk (microservices, distributed systems)
- Where a fallback response (cached data, default, graceful degradation) is acceptable

#### When NOT to use
- Intra-process method calls — add latency for no benefit
- Asynchronous message consumption — use DLQ and back-pressure instead
- When no fallback is possible and the operation *must* succeed — fail fast is still correct, but the circuit breaker is not adding resilience, just error speed

#### Trade-offs

| Gain | Cost |
|---|---|
| Prevents cascading failure | False positive trips during transient blips |
| Fails fast — frees threads immediately | Circuit state requires monitoring/alerting |
| Enables fallback/graceful degradation | Open circuit hides the underlying failure; must be surfaced |
| Self-healing when dependency recovers | Threshold tuning required per dependency |

---

### Event Sourcing

> **Source:** Event Sourcing — Martin Fowler, [martinfowler.com/eaaDev/EventSourcing.html](https://martinfowler.com/eaaDev/EventSourcing.html). Greg Young, CQRS and Event Sourcing (2010). Vaughn Vernon, *Implementing Domain-Driven Design* (2013), Chapter 8.

| | |
|---|---|
| **Category** | Data / State Management |
| **Context** | Domain entities change state over time. A relational database stores only the current state. When something goes wrong, there is no history. Audit requirements demand a record of every change. Complex domain events must be replayed for debugging, analytics, or recovery. |
| **Problem** | How do you capture the full history of state changes for a domain entity, enable temporal queries ("what was the state at time T?"), and support audit, debugging, and event replay — without storing only the latest snapshot? |
| **Solution** | Instead of storing the current state, store *every event that led to the current state* as an immutable append-only log. Current state is computed by replaying the event stream. Snapshots are taken periodically to avoid replaying the entire log on every read. |
| **Developer analogy** | Git — your repository stores every commit (event), not just the current file state. You can reconstruct any past state by checking out a commit hash, or replay history to understand how the code reached its current form. |

``` mermaid
flowchart LR
    CMD["Command\n(e.g. PlaceOrder)"] --> AGG["Order Aggregate"]
    AGG --> STORE["Event Store\n(append-only log)"]
    STORE --> E1["OrderPlaced\n{orderId, items, ts}"]
    STORE --> E2["PaymentConfirmed\n{orderId, amount, ts}"]
    STORE --> E3["OrderShipped\n{orderId, trackingId, ts}"]

    E1 & E2 & E3 --> REPLAY["Replay\n→ Current State"]
    E1 & E2 & E3 --> PROJ["Projections\n(CQRS read models)"]
    E1 & E2 & E3 --> AUDIT["Audit Log\n(complete history)"]

    style STORE fill:#4F46E5,color:#fff,stroke:none
    style REPLAY fill:#2e7d32,color:#fff,stroke:none
```

#### When to use
- Audit requirements mandate a complete, tamper-proof history of every state change
- Temporal queries are needed ("what was the account balance on 1 Jan?")
- Event-driven integration: downstream consumers need to react to state changes
- The domain is event-rich (financial transactions, order lifecycle, compliance)
- Paired with CQRS to project multiple read models from the same event stream

#### When NOT to use
- Simple CRUD domains with no audit or history requirement — CRUD is simpler
- When events are not the natural language of the domain — forcing events onto a non-event domain creates artificial complexity
- Teams without experience in event-sourced systems — the learning curve is steep; start with a bounded context, not the whole system

#### Trade-offs

| Gain | Cost |
|---|---|
| Complete, tamper-proof audit trail | No simple UPDATE — state queries require replay or snapshot |
| Temporal queries available at no extra cost | Schema evolution of events is hard — events are immutable |
| Natural integration bus — consumers subscribe to events | Event store becomes a critical dependency |
| Debugging by replay — reproduce bugs exactly | Replay performance degrades on long event streams without snapshots |

---

### API Gateway

> **Source:** API Gateway pattern — Chris Richardson, *Microservices Patterns* (2018), Chapter 8. AWS API Gateway documentation. Sam Newman, *Building Microservices* (2021), Chapter 10.

| | |
|---|---|
| **Category** | Integration |
| **Context** | Multiple clients (web, mobile, third-party) need to call multiple backend services. Each client makes multiple round-trips; each service implements its own auth, rate-limiting, and routing. |
| **Problem** | How do clients get data from multiple services with a single request? Who owns cross-cutting concerns (auth, TLS termination, rate limiting, logging, routing) so that individual services don't each implement them? |
| **Solution** | Place an API Gateway as the single entry point for all external clients. The Gateway handles: routing (request to service), authentication (validate JWT / API key), rate limiting, TLS termination, request aggregation, and protocol translation. |
| **Developer analogy** | A load balancer that knows about your application — not just "send request to a healthy server" but "send this request to this service, with this auth policy, at this rate limit, and aggregate these two responses into one." |

``` mermaid
flowchart LR
    WEB[Web Client] --> GW
    MOB[Mobile Client] --> GW
    EXT[External Partner] --> GW

    GW["API Gateway\n(auth, routing, rate-limit,\nTLS, aggregation, logging)"]

    GW --> S1[Order Service]
    GW --> S2[Inventory Service]
    GW --> S3[Customer Service]
    GW --> S4[Product Catalogue]

    style GW fill:#06B6D4,color:#fff,stroke:none
```

#### When to use
- Multiple services that external clients need to call
- Cross-cutting concerns (auth, rate-limiting, logging) must be applied consistently
- Protocol translation needed (e.g., HTTP/REST → gRPC internally)
- Request aggregation reduces client round-trips

#### When NOT to use
- Single service with a small number of clients — the gateway adds latency and operational overhead without benefit
- Internal service-to-service calls — use a service mesh or direct calls; the gateway is for *external* traffic

#### Trade-offs

| Gain | Cost |
|---|---|
| Single entry point simplifies client integration | Single point of failure if not deployed with HA |
| Cross-cutting concerns in one place | Gateway can become a bottleneck at scale |
| Clients are decoupled from service topology | Another service to manage, version, and deploy |
| Enables rate-limiting and quota management | Complex routing logic in the gateway is hard to test |

---

### Backend for Frontend (BFF)

> **Source:** BFF pattern — Sam Newman, *Building Microservices* (2021), Chapter 14. Phil Calçado, original post (2015). Martin Fowler, [samnewman.io/patterns/architectural/bff](https://samnewman.io/patterns/architectural/bff/).

| | |
|---|---|
| **Category** | Integration |
| **Context** | A single API Gateway or general-purpose API is shared by multiple client types (web app, iOS app, Android app, partner API). Each client has different data-shape, latency, and interaction requirements. |
| **Problem** | A general API is a lowest-common-denominator that serves no consumer perfectly. Web clients receive more data than they need; mobile clients make multiple round-trips; the API becomes a negotiation between competing consumer requirements. |
| **Solution** | Create a dedicated *Backend for Frontend* for each significant client type. Each BFF is owned by the team that owns the client; it composes backend service calls, shapes responses for its specific consumer, and can evolve independently. |

``` mermaid
flowchart LR
    WEB[Web App] --> BFFW["BFF — Web\n(owned by web team)"]
    MOB[Mobile App] --> BFFM["BFF — Mobile\n(owned by mobile team)"]
    PART[Partner API] --> BFFP["BFF — Partner\n(owned by integration team)"]

    BFFW & BFFM & BFFP --> OS[Order Service]
    BFFW & BFFM --> CS[Customer Service]
    BFFW --> AN[Analytics Service]

    style BFFW fill:#4F46E5,color:#fff,stroke:none
    style BFFM fill:#7C3AED,color:#fff,stroke:none
    style BFFP fill:#A855F7,color:#fff,stroke:none
```

#### When to use
- Multiple client types with meaningfully different data requirements
- Client teams have the autonomy and skill to own a thin server-side component
- A shared API is causing friction between client teams ("the API team can't prioritise our change")

#### When NOT to use
- Single client type — a shared API gateway is simpler
- When the BFF becomes a business logic layer (it should be a *composition and translation* layer only — business logic belongs in domain services)
- Small organisations where the overhead of multiple BFFs outweighs the benefit

#### Trade-offs

| Gain | Cost |
|---|---|
| Each BFF is optimised for its consumer | Code duplication across BFFs (shared logic must be extracted to services) |
| Client team owns their own backend; no shared API bottleneck | More services to deploy, operate, and monitor |
| BFF can evolve at client velocity | Risk of business logic leaking into BFFs |
| Reduces over-fetching / under-fetching per client | Increases network calls from BFF to backend services |

---

### Strangler Fig

> **Source:** Strangler Fig Application — Martin Fowler, [martinfowler.com/bliki/StranglerFigApplication.html](https://martinfowler.com/bliki/StranglerFigApplication.html) (2004). Named after the Strangler Fig tree, which grows around a host tree until the original tree dies. Sam Newman, *Monolith to Microservices* (2019), Chapter 3.

| | |
|---|---|
| **Category** | Migration |
| **Context** | A monolithic application needs to be replaced or decomposed. A big-bang rewrite carries extreme risk — the new system must replicate every behaviour before users can migrate. |
| **Problem** | How do you replace a legacy system incrementally, without a big-bang cutover, while maintaining continuous operation? |
| **Solution** | Place a routing proxy in front of the monolith. New functionality is built as separate services. The proxy routes requests to the new service when it is ready; to the monolith for everything else. Over time, the monolith handles less and less traffic until it can be retired. |
| **Developer analogy:** | Feature flags for infrastructure — rather than switching everything at once, you route one endpoint at a time to the new system, roll back if needed, and never go dark. |

``` mermaid
flowchart LR
    Client --> Proxy["Routing Proxy\n(strangler facade)"]
    Proxy -->|"New capability\n(extracted)"| NewSvc["New Service"]
    Proxy -->|"Legacy capability\n(not yet extracted)"| Monolith["Monolith\n(shrinking over time)"]

    style Proxy fill:#06B6D4,color:#fff,stroke:none
    style NewSvc fill:#2e7d32,color:#fff,stroke:none
    style Monolith fill:#37474f,color:#fff,stroke:none
```

#### When to use
- Any mission-critical monolith that must be decomposed or replaced without downtime
- When the monolith cannot be taken offline for a cutover window
- When delivery teams want to extract services incrementally as they build new capabilities

#### When NOT to use
- Small, low-traffic systems where a big-bang rewrite is fast and manageable
- When the monolith is so tightly coupled that extracting any single capability requires touching 80% of the codebase first

#### Trade-offs

| Gain | Cost |
|---|---|
| Zero-downtime incremental migration | Proxy is a new component to build, deploy, and operate |
| Rollback is safe — revert routing to monolith | Running two systems in parallel (monolith + new services) increases operational cost |
| Teams can extract at their own pace | Monolith and new service can diverge; data sync is complex |
| Business risk is distributed across many small migrations | "Never completes" risk — monolith is never fully retired if the initiative loses momentum |

---

### Sidecar

> **Source:** Sidecar pattern — Brendan Burns & David Oppenheimer, "Design Patterns for Container-Based Distributed Systems" (USENIX, 2016). Microsoft Azure Architecture Center, [learn.microsoft.com/en-us/azure/architecture/patterns/sidecar](https://learn.microsoft.com/en-us/azure/architecture/patterns/sidecar). Envoy Proxy documentation.

| | |
|---|---|
| **Category** | Resilience / Infrastructure |
| **Context** | Every service in a system needs the same cross-cutting infrastructure concerns: TLS mutual auth, distributed tracing, circuit breaking, metrics export, log formatting, health checking. Implementing these in every service creates duplication and language-specific inconsistency. |
| **Problem** | How do you consistently apply cross-cutting infrastructure concerns (networking, observability, security) to every service without duplicating code in every service or requiring every team to implement them? |
| **Solution** | Deploy each application container with a companion *Sidecar* container in the same network namespace (same Pod in Kubernetes). The Sidecar intercepts all inbound and outbound traffic and handles cross-cutting concerns transparently. The application speaks only to localhost. |
| **Developer analogy:** | A process supervisor (like supervisord) that wraps your application — except the sidecar is not managing the process, it is managing the *network* around the process. Your app code is unaware of TLS, circuit breaking, or tracing; the sidecar handles all of it. |

``` mermaid
flowchart LR
    subgraph Pod["Kubernetes Pod (shared network namespace)"]
        direction TB
        APP["Application Container\n(business logic only)"]
        SC["Sidecar Container\n(Envoy / Istio proxy)\n• mTLS\n• circuit breaking\n• distributed tracing\n• metrics export\n• retries"]
        APP <-->|"localhost\ncalls"| SC
    end
    SC <-->|"mTLS + telemetry"| OtherPod["Other Service\n(also sidecar-enabled)"]
    SC --> OBS["Observability\nplatform"]

    style Pod fill:#e3f2fd,stroke:#1565c0
    style SC fill:#06B6D4,color:#fff,stroke:none
```

#### When to use
- Polyglot environment where cross-cutting concerns cannot be implemented as a shared library (different languages)
- Service mesh adoption (Istio, Linkerd, Consul) — the sidecar *is* the mesh data plane
- Organisations that want a platform team to own infrastructure concerns without requiring application teams to instrument every service

#### When NOT to use
- Low number of services where a shared library is simpler and the overhead of Kubernetes pod management is not justified
- Performance-sensitive workloads where the sidecar proxy adds unacceptable latency (typically ~1–5ms per call)
- Environments where the team does not have Kubernetes expertise to manage sidecar lifecycle

#### Trade-offs

| Gain | Cost |
|---|---|
| Cross-cutting concerns owned by platform; app stays clean | Sidecar adds latency to every network call |
| Language-agnostic — works with any application | Requires Kubernetes or equivalent container orchestration |
| Consistent security/observability across all services | Complex to debug — traffic goes through sidecar, not directly |
| Platform team can update sidecar without touching app code | Sidecar failures can silently affect app availability |

---

### Bulkhead

> **Source:** Bulkhead pattern — Michael Nygard, *Release It!* (2007, 2nd ed. 2018), Chapter 5. Named after the compartments in a ship's hull — water flooding one compartment does not sink the entire ship. Resilience4j Bulkhead documentation.

| | |
|---|---|
| **Category** | Resilience |
| **Context** | A service calls multiple downstream dependencies (Payment API, Inventory API, Notification Service). Payment API becomes slow. All service threads are waiting for Payment API responses. No threads are available to handle Inventory or Notification requests — the entire service fails. |
| **Problem** | How do you prevent a slow or failing dependency from exhausting all resources (threads, connections, memory) in a service and causing total service failure? |
| **Solution** | Isolate resource pools per dependency. Each downstream caller gets its own thread pool (or semaphore limit). If Payment API exhausts its pool, threads in the Inventory pool and Notification pool are unaffected. The service degrades gracefully — payment calls fail, but inventory and notification calls continue. |
| **Developer analogy:** | Database connection pools — you wouldn't share one connection pool between your OLTP queries and your batch reporting job, because a slow batch query would starve out the OLTP. Bulkhead extends this principle to all downstream calls. |

``` mermaid
flowchart TD
    SVC["Service"]

    subgraph BH1["Bulkhead — Payment\nthread pool: 10"]
        T1["Thread 1...10"]
    end
    subgraph BH2["Bulkhead — Inventory\nthread pool: 20"]
        T2["Thread 1...20"]
    end
    subgraph BH3["Bulkhead — Notifications\nthread pool: 5"]
        T3["Thread 1...5"]
    end

    SVC --> BH1 --> PAY[Payment API\n🐢 slow]
    SVC --> BH2 --> INV[Inventory API\n✅ healthy]
    SVC --> BH3 --> NOT[Notification Service\n✅ healthy]

    note1["💥 BH1 exhausted\nBH2 and BH3 unaffected"]

    style BH1 fill:#c62828,color:#fff,stroke:none
    style BH2 fill:#2e7d32,color:#fff,stroke:none
    style BH3 fill:#2e7d32,color:#fff,stroke:none
    style PAY fill:#c62828,color:#fff,stroke:none
```

#### When to use
- Services with multiple downstream dependencies with different SLOs and failure rates
- High-traffic services where a single slow dependency could cause total service failure
- Typically used together with Circuit Breaker — Bulkhead limits the blast radius; Circuit Breaker prevents retry storms

#### When NOT to use
- Services with a single downstream dependency — no partitioning benefit
- When thread-per-request latency is already < 10ms and the overhead of pool management is greater than the risk

#### Trade-offs

| Gain | Cost |
|---|---|
| Partial degradation instead of total failure | Thread pool sizing requires load testing and tuning |
| Blast radius of a failing dependency is contained | More complex configuration per downstream dependency |
| Works at any layer (HTTP, DB, message consumers) | Pools must be monitored; pool exhaustion must alert |
| Complements Circuit Breaker — Bulkhead limits scope; CB limits duration | Wrong pool sizes can still cause under-utilisation or exhaustion |

---

## Bloom Layer D — Tools

### Pattern Implementation Libraries

| Tool | Patterns supported | Language | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|---|
| **Resilience4j** | Circuit Breaker, Bulkhead, Retry, Rate Limiter, Timeout | Java | Lightweight; functional API; Spring Boot integration; production-proven | Java-only | Free (OSS) | [resilience4j.readme.io](https://resilience4j.readme.io) |
| **Polly** | Circuit Breaker, Retry, Bulkhead, Fallback, Timeout | .NET | Deep .NET integration; Polly v8 native in .NET 8 | .NET-only | Free (OSS) | [github.com/App-vNext/Polly](https://github.com/App-vNext/Polly) |
| **Istio / Envoy** | Circuit Breaker, Retry, Bulkhead, Sidecar, mTLS | Any (sidecar) | Language-agnostic; platform-enforced; rich telemetry | Complex to operate; Kubernetes-dependent; latency overhead | Free (OSS); managed add-on cost | [istio.io](https://istio.io) |
| **Axon Framework** | CQRS, Event Sourcing, Saga | Java | Full framework for CQRS + ES + Saga; message routing built in | Opinionated; heavy; steep learning curve | Free (OSS); Axon Server paid tiers | [axoniq.io](https://www.axoniq.io) |
| **EventStoreDB** | Event Sourcing | Language-agnostic (SDK) | Purpose-built event store; projections built in; strong consistency | Operational overhead; less mainstream than Kafka for ES | Free (OSS); commercial licence | [eventstore.com](https://www.eventstore.com) |
| **Apache Kafka** | Event Sourcing (as event log), Saga (choreography via topics) | Language-agnostic | Durable, high-throughput event log; Kafka Streams for projections | Operationally complex; not a true event store (no aggregate-level streams) | Free (OSS); Confluent Cloud from ~$0.11/GB | [kafka.apache.org](https://kafka.apache.org) |

---

## Bloom Layer E — Decision Frameworks

**Pattern selection heuristic:** start with the problem, not the pattern.

| If your problem is … | Start with … | Then consider … |
|---|---|---|
| Read/write scaling conflict or multiple read projections | CQRS | Event Sourcing if audit trail is also needed |
| Multi-service transaction with no distributed lock | Saga (Orchestration if > 4 steps) | Idempotency keys on all service operations |
| Cascading failure from a slow dependency | Circuit Breaker | Bulkhead to contain blast radius |
| Full audit trail and temporal queries | Event Sourcing | CQRS to project read models |
| Too many client-to-service round-trips | API Gateway | BFF if clients have meaningfully different shapes |
| General API cannot serve all clients well | BFF | API Gateway for shared cross-cutting concerns |
| Legacy monolith needs incremental replacement | Strangler Fig | Identify the seam first before building the proxy |
| Cross-cutting infra in every service | Sidecar / Service Mesh | Only if Kubernetes is already in use or justified |
| Slow dependency exhausts thread pool | Bulkhead | Pair with Circuit Breaker and Retry |

---

## Bloom Layer E — Judgment & Trade-offs

| Pattern question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **CQRS — introduce now vs. later** | System already shows read/write scaling tension | Simple CRUD; early-stage product | Too early: two models to maintain; too late: migration from shared model is painful |
| **Event Sourcing — adopt vs. skip** | Audit is a hard requirement; temporal queries needed | Simple state; no audit need; team not experienced | Too early: event schema evolution becomes an emergency; skipped when needed: audit gap is a compliance finding |
| **Saga: Choreography vs. Orchestration** | Choreography: simple flow; < 4 steps; low coupling | Orchestration: complex flow; failure handling must be visible; > 4 steps | Choreography at scale: implicit coupling via event contracts; Orchestration: new single point of failure |
| **Strangler Fig — slow extraction vs. aggressive** | Aggressive: strong team; clear seams; management support | Slow: complex monolith; unclear seams; team capacity constrained | Too aggressive: integration testing burden; too slow: monolith never exits; scope creep |
| **Sidecar — adopt vs. shared library** | Polyglot environment; platform team exists | Monoglot; small number of services; Kubernetes not in use | Sidecar without platform team: operational complexity; shared lib in polyglot: N implementations of same logic |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** You are the lead architect for a B2B payments platform. The system processes £2B/year in payments. The current architecture is a monolithic Java application with a single PostgreSQL database. The board has approved a 24-month decomposition programme.

1. **Recall:** For each of the 9 patterns in this catalogue, state: (a) the problem it solves, and (b) one situation where it should NOT be used.
2. **Comprehension:** Explain why Event Sourcing and CQRS are architecturally independent but frequently combined. Give an example where Event Sourcing is used without CQRS, and vice versa.
3. **Application:** The first service extracted from the monolith is Payment Processing. Design the Strangler Fig routing configuration: what requests go to the new service? What goes to the monolith? How do you validate the routing is correct before full cutover?
4. **Analysis:** The Payment Service calls the Risk Engine (internal) and the Banking Network (external, high latency, occasional outages). Identify the resilience patterns needed and design the failure modes explicitly. What happens when the Banking Network is down for 10 minutes?
5. **Evaluation:** The engineering team wants to adopt Event Sourcing for the Payment domain (auditing is a hard FCA regulatory requirement). The CTO is concerned about operational complexity. Evaluate both positions. Under what conditions would you proceed? Under what conditions would you propose an alternative to meet the audit requirement?
6. **Synthesis:** Design the architecture for the Payment Processing service extraction: Strangler Fig routing, CQRS for the payment aggregate, Event Sourcing for the audit trail, Circuit Breaker + Bulkhead for the Banking Network call, and a Saga for the end-to-end payment flow (Payment Service → Risk Engine → Banking Network → Ledger Service). Include: the event store, compensating transactions for each Saga step, the Circuit Breaker state machine configuration, and the Bulkhead pool sizing rationale.

> The hardest part of applying patterns is not understanding them — it is recognising when the problem you actually have matches the problem the pattern was designed to solve. Patterns applied to the wrong problem are not neutral; they add complexity that actively makes the system harder to understand and change.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Pattern identification** | "Here is a service design problem: [describe problem including scaling, consistency, and team constraints]. Which architectural patterns apply and what are the trade-offs of each?" | AI recommends patterns it finds interesting, not patterns that fit your constraint |
| **Saga flow design** | "Design a Saga for this business process: [describe]. List each step, the event/command that triggers it, and the compensating transaction if it fails." | Compensation logic is often incomplete; verify every failure path is covered |
| **Circuit Breaker configuration** | "What thresholds should I set for a Circuit Breaker on a downstream API that has: [describe SLA, error rate, p99 latency]?" | Generic thresholds; load-test to validate; production tuning required |
| **Event schema design** | "Design the event schema for this domain aggregate: [describe]. Include: event types, required fields, and the event versioning strategy." | Versioning strategy is often skipped; schema evolution is the hardest part of Event Sourcing |
| **Pattern exit ramp** | "I've implemented CQRS in this service and it's adding complexity. Under what conditions would removing it be the right architectural decision? What would the migration path be?" | LLM will tend to defend CQRS; be explicit about asking for the against argument |

!!! warning "Bias to watch"
    LLMs over-recommend complex patterns (CQRS, Event Sourcing, Saga) because they generate interesting technical content. Always ask the model to also describe the simplest possible solution that meets your requirements — and compare the two before deciding.

---

## Common Mistakes

!!! danger "Pattern before problem"
    The most common pattern anti-pattern: selecting CQRS, Event Sourcing, or Saga because the team found the pattern interesting, not because the problem demands it. Every pattern adds operational and cognitive complexity. The burden of proof is always on the pattern advocate.

!!! failure "Event Sourcing without schema evolution strategy"
    Events are immutable. Once an event schema is in production, it cannot be changed — only versioned. Teams adopting Event Sourcing without a schema evolution strategy will face this as an emergency within 6–12 months. Design the versioning strategy before the first event schema is written.

!!! failure "Saga without compensating transactions designed for every step"
    A Saga that does not define the compensating transaction for every step is not a Saga — it is a multi-service transaction with no failure handling. Every Saga step must have a fully designed, tested compensation.

!!! warning "Circuit Breaker without fallback"
    A Circuit Breaker that opens and returns a 500 error is better than cascading failure, but not much. Design the fallback for every Circuit Breaker: cached response, default, graceful degradation. The fallback *is* the resilience design.

!!! warning "Strangler Fig that never completes"
    The Strangler Fig pattern requires sustained commitment. The most common failure mode is extracting 60–70% of the monolith and then the programme loses momentum — leaving a hybrid that is harder to operate than either the original monolith or a fully decomposed system.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| Patterns of Enterprise Application Architecture (Fowler — 2002) | Book | Original catalogue of application architecture patterns; CQRS origins | [martinfowler.com/books/eaa.html](https://martinfowler.com/books/eaa.html) |
| Enterprise Integration Patterns (Hohpe & Woolf — 2003) | Book | Messaging patterns (topics, queues, routing, correlation); Saga foundations | [enterpriseintegrationpatterns.com](https://www.enterpriseintegrationpatterns.com) |
| Microservices Patterns (Richardson — 2018) | Book | CQRS, Saga, API Gateway, BFF in microservices context; full worked examples | [microservices.io/patterns](https://microservices.io/patterns/) |
| Release It! (Nygard — 2nd ed. 2018) | Book | Circuit Breaker, Bulkhead, Timeout, stability patterns | [pragprog.com/titles/mnee2/release-it-second-edition](https://pragprog.com/titles/mnee2/release-it-second-edition/) |
| Building Evolutionary Architectures (Ford, Parsons, Kua — 2017) | Book | Fitness functions as pattern validation; evolutionary pattern adoption | [oreilly.com](https://www.oreilly.com/library/view/building-evolutionary-architectures/9781491986356/) |
| Implementing Domain-Driven Design (Vernon — 2013) | Book | Event Sourcing and CQRS in DDD context; bounded context patterns | [vaughnvernon.com](https://vaughnvernon.com/books/) |
| Monolith to Microservices (Newman — 2019) | Book | Strangler Fig and decomposition patterns in depth | [samnewman.io/books/monolith-to-microservices](https://samnewman.io/books/monolith-to-microservices/) |
| Martin Fowler's Patterns Catalog | Blog / wiki | Authoritative online reference; updates to patterns over time | [martinfowler.com/articles/patterns-of-distributed-systems](https://martinfowler.com/articles/patterns-of-distributed-systems/) |
| Azure Architecture Center — Cloud Design Patterns | Reference | 24 cloud-specific patterns with implementation guidance | [learn.microsoft.com/en-us/azure/architecture/patterns](https://learn.microsoft.com/en-us/azure/architecture/patterns/) |
| AWS Builders' Library | Reference | How Amazon implements resilience and distribution patterns at scale | [aws.amazon.com/builders-library](https://aws.amazon.com/builders-library/) |
