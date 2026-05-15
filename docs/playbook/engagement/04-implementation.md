# Phase 4 — Implementation Guidance

**Goal:** Enable engineering teams to build the system confidently, consistently, and without re-litigating architectural decisions — while the architect remains engaged to resolve ambiguity and guard quality.

> *"An architect's job during implementation is not to do the engineering — it is to hold the architecture accountable to its intent."*

---

## Process Flow

``` mermaid
flowchart TD
    A[Publish Reference Architecture\n& Guardrails] --> B[Team Kick-off\n& Architecture Walkthrough]
    B --> C[Sprint-by-Sprint\nArchitecture Touchpoints]
    C --> D{Architecture\nDeviation Detected?}
    D -- Yes --> E[Evaluate Deviation]
    E --> F{Intentional\nimprovement?}
    F -- Yes --> G[Update ADR\n& Reference Architecture]
    F -- No --> H[Address with Team\nCourse-correct]
    G --> C
    H --> C
    D -- No --> I{Phase complete?\nSystem delivered?}
    I -- No --> C
    I -- Yes --> J[Architecture Compliance Review]
    J --> K[Phase 4 Complete ✓\nEnter Phase 5]

    style A fill:#4051b5,color:#fff,stroke:none
    style K fill:#2e7d32,color:#fff,stroke:none
    style D fill:#e65100,color:#fff,stroke:none
    style F fill:#e65100,color:#fff,stroke:none
```

---

## Inputs

| Input | Source |
|---|---|
| Architecture Brief | Phase 2 output |
| ADRs | Phase 2–3 outputs |
| Fitness function register | Phase 3 output |
| Go / No-Go sign-off | Phase 3 output |
| Risk register | Phase 1–3 outputs |

---

## Key Activities

### 1. Reference Architecture

The reference architecture is the canonical "north star" document teams build toward. It must be:

- Versioned alongside the codebase (in this repo or an architecture repo)
- Updated when intentional deviations are accepted
- Accessible to all engineers on the programme

**Reference architecture document structure:**

```
1. System Overview (C4 L1 + L2 from Phase 2)
2. Service Catalogue
   - Service name, owner, tech stack, repo link
3. Integration Patterns
   - Sync (REST/gRPC) vs Async (events) — when to use which
4. Data Architecture
   - Ownership per domain, DB-per-service policy, data flow for PII
5. Security Architecture
   - Auth/AuthZ pattern, secret management, network topology
6. Observability Architecture
   - Logging standard, metrics naming convention, tracing approach
7. CI/CD Pipeline Standard
8. Definition of Done (Architecture)
```

---

### 2. Service Catalogue

Track all services, their owners, and tech stack in one place.

| Service | Owner Squad | Language | Framework | Repo | DB | Event Bus Role |
|---|---|---|---|---|---|---|
| API Gateway | Platform | — | Kong | link | — | Ingress |
| Order Service | Orders Squad | Java 21 | Spring Boot 3 | link | PostgreSQL | Producer |
| Inventory Service | Fulfilment Squad | Go 1.22 | Gin | link | PostgreSQL | Consumer/Producer |
| Notification Service | CX Squad | Node.js 20 | Fastify | link | — | Consumer |
| Auth Service | Platform | — | Okta (SaaS) | — | — | — |

---

### 3. Integration Standards

Define and publish which integration patterns are approved, when to use each, and what is prohibited.

``` mermaid
flowchart LR
    subgraph Sync["Synchronous (REST / gRPC)"]
        S1[User-facing requests\nrequiring immediate response]
        S2[Payment authorisation]
        S3[Real-time inventory check\nat checkout]
    end
    subgraph Async["Asynchronous (Events via SQS/SNS)"]
        A1[State-change notifications\nacross domains]
        A2[Audit trail / analytics]
        A3[Email / push notifications]
        A4[Inventory replenishment\ntriggers]
    end
    subgraph Prohibited["Prohibited Patterns"]
        P1[Direct DB access\nacross service boundaries]
        P2[Shared libraries with\nbusiness logic]
        P3[Synchronous chained calls\n> 2 hops deep]
    end

    style Sync fill:#e8f5e9,stroke:#2e7d32
    style Async fill:#e3f2fd,stroke:#1565c0
    style Prohibited fill:#ffebee,stroke:#c62828
```

---

### 4. Observability Architecture

Every service must implement the **three pillars of observability** from day one.

``` mermaid
mindmap
  root((Observability))
    Logs
      Structured JSON only
      Correlation ID in every log line
      No PII in logs
      Retention: 30 days hot, 1 year cold
    Metrics
      RED metrics per service
        Rate requests per second
        Errors error rate
        Duration p50 p95 p99
      USE metrics per host
        Utilisation
        Saturation
        Errors
    Traces
      OpenTelemetry instrumentation
      Trace context propagated in all calls
      Sampling rate: 100% errors, 5% success
```

**RED Method** (Tom Wilkie, Weaveworks):
- **R**ate — requests per second
- **E**rrors — error rate
- **D**uration — latency distribution

**USE Method** (Brendan Gregg):
- **U**tilisation — how busy is the resource?
- **S**aturation — how much work is queued?
- **E**rrors — error count

---

### 5. CI/CD Pipeline Standard

``` mermaid
flowchart LR
    A([Code Push]) --> B[Lint +\nUnit Tests]
    B --> C[Build\nContainer Image]
    C --> D[Dependency\nVulnerability Scan]
    D --> E[Integration\nTests]
    E --> F[Architecture\nFitness Functions\ne.g. coupling check]
    F --> G[Push Image\nto Registry]
    G --> H([Deploy to Dev])
    H --> I[Smoke Tests]
    I --> J{Gate:\nManual approval\nfor staging?}
    J -- Yes for Staging --> K([Deploy to Staging])
    K --> L[Regression +\nPerformance Tests]
    L --> M([Deploy to Production])

    style A fill:#4051b5,color:#fff,stroke:none
    style M fill:#2e7d32,color:#fff,stroke:none
    style J fill:#e65100,color:#fff,stroke:none
```

**Minimum CI/CD requirements:**

| Gate | Required | Tool Options |
|---|---|---|
| Linting | Yes | ESLint, Checkstyle, golangci-lint |
| Unit tests + coverage (≥ 80%) | Yes | JUnit, Jest, Go test |
| Dependency CVE scan | Yes | Snyk, Trivy, Dependabot |
| Container image scan | Yes | Trivy, ECR scanning, Anchore |
| Architecture fitness function | Yes | ArchUnit, Deptrac, custom scripts |
| Integration tests | Yes | Testcontainers, WireMock |
| Performance test (per deploy) | Recommended | k6 smoke test |
| Signed image (SLSA) | Recommended | Sigstore / cosign |

---

### 6. Definition of Done — Architecture Checklist

A feature or service is "architecturally done" when:

- [ ] ADR written for any new architectural decision introduced
- [ ] Service added to the service catalogue
- [ ] C4 diagrams updated if containers or major components changed
- [ ] Observability: structured logs, RED metrics, and OpenTelemetry traces implemented
- [ ] No direct cross-domain DB access
- [ ] Security: all secrets via secret manager (not env vars or code), least-privilege IAM roles
- [ ] CI pipeline passes all required gates including fitness functions
- [ ] Runbook created in `docs/playbooks/` for the service's operational procedures
- [ ] RTO/RPO validated against ASR through chaos or load test

---

### 7. Architecture Touchpoint Cadence

| Touchpoint | Frequency | Participants | Purpose |
|---|---|---|---|
| Architecture office hours | Weekly (30 min) | Architect + all tech leads | Q&A, unblock decisions |
| Architecture review of stories | Per sprint | Architect + squad lead | Catch deviations early |
| ADR review | On demand | Architect + relevant stakeholders | Document and agree new decisions |
| Architecture compliance check | Per milestone | Architect + engineering leads | Verify reference architecture adherence |

---

## Output Artifacts (Phase 4 Exit Criteria)

- [ ] Reference architecture — published and version-controlled
- [ ] Service catalogue — complete for all deployed services
- [ ] Integration standards — published and communicated to all teams
- [ ] Observability architecture — implemented in all services
- [ ] CI/CD pipeline — all required gates active
- [ ] Definition of Done — adopted by all squads
- [ ] Architecture compliance review — completed and documented
- [ ] All ADRs updated for implementation-time decisions

---

## Tools

| Purpose | Tool |
|---|---|
| IaC | [Terraform](https://www.terraform.io/), [AWS CDK](https://aws.amazon.com/cdk/), [Pulumi](https://www.pulumi.com/) |
| Secret management | [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/), [HashiCorp Vault](https://www.vaultproject.io/) |
| Container orchestration | [Kubernetes](https://kubernetes.io/), [AWS ECS](https://aws.amazon.com/ecs/) |
| Service mesh | [Istio](https://istio.io/), [AWS App Mesh](https://aws.amazon.com/app-mesh/), [Linkerd](https://linkerd.io/) |
| Observability stack | [OpenTelemetry](https://opentelemetry.io/) + Datadog / Grafana Stack / AWS X-Ray |
| API contract testing | [Pact](https://pact.io/) |
| Coupling enforcement | [ArchUnit](https://www.archunit.org/) (Java), [Deptrac](https://github.com/qossmic/deptrac) |
| SBOM / Supply chain | [Syft](https://github.com/anchore/syft), [Sigstore](https://www.sigstore.dev/) |

---

## Common Pitfalls

!!! failure "Architect disappears after Phase 3"
    Architecture erodes fastest during implementation when the architect is unavailable to answer questions. Maintain a regular touchpoint cadence.

!!! failure "Definition of Done without architecture gates"
    If the engineering Definition of Done has no architecture criteria, architectural debt accumulates silently sprint by sprint.

!!! warning "Treating every deviation as a violation"
    Some deviations are improvements. Evaluate first — update the ADR and reference architecture if the deviation is genuinely better.

---

## Reference Sources

- *Continuous Architecture in Practice* — Erder, Pureur, Woods, O'Reilly
- DORA — [dora.dev](https://dora.dev/) — CI/CD and deployment frequency benchmarks
- OpenTelemetry — [opentelemetry.io](https://opentelemetry.io/)
- SLSA Supply Chain Security — [slsa.dev](https://slsa.dev/)
- Google SRE Book — Ch. 6 (Monitoring Distributed Systems) — [sre.google](https://sre.google/sre-book/monitoring-distributed-systems/)
- *Team Topologies* — Skelton & Pais (squad structure alignment)
