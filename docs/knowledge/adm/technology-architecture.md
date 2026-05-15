# Phase D — Technology Architecture

**TOGAF Reference:** Part II, Chapter 9 — Phase D  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why Phase D matters to you:** As a lead developer, Phase D is the phase where you feel most at home — it talks about infrastructure, cloud, containers, and observability. The transition to architect is not about learning more technology; it is about *governing* technology. Phase D introduces the discipline that separates "this works in my team" from "this is a standard that 40 teams can consistently operate, audit, and evolve." The Architecture is not the stack; it is the *decisions about the stack*, and the process by which those decisions are made, enforced, and changed.

---

## Bloom Layer A — Quick Recall

**At a glance:** Phase D maps the logical application and data architecture from Phase C onto deployable infrastructure, defines technology standards, and produces a gap analysis feeding the roadmap.

| | |
|---|---|
| **In** | Phase C outputs (Application & Data ADD), Architecture Vision, Technology Principles, existing tech standards, infrastructure baseline |
| **Out** | Target Technology Architecture, Technology Standards Catalogue, gap analysis, ADD (Technology), candidate roadmap components |
| **Exit when** | Technology Architecture is formally reviewed; ADD (Technology chapter) is complete; gaps are classified |
| **Feeds into** | Phase E (Opportunities & Solutions) — the technology architecture is the implementation baseline |
| **TOGAF Chapter** | Part II, Chapter 9 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap09.html) |

---

## Bloom Layer B — Conceptual Understanding

### Where Phase D sits and what it uniquely adds

Phase D is the last of the three domain architecture phases (B → C → D). It has one primary responsibility: **make the logical architecture deployable**.

``` mermaid
flowchart LR
    B["Phase B\nBusiness Architecture\n(capabilities, value streams)"]
    C["Phase C\nInformation Systems\n(applications, APIs, data models)"]
    D["Phase D\nTechnology Architecture\n(platforms, infrastructure, standards)"]
    E["Phase E\nOpportunities & Solutions\n(roadmap, work packages)"]

    B --> C --> D --> E

    style B fill:#4F46E5,color:#fff,stroke:none
    style C fill:#7C3AED,color:#fff,stroke:none
    style D fill:#A855F7,color:#fff,stroke:none
    style E fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** ADM phase sequence from TOGAF 10 Part II §5 (Architecture Development Method overview). Phase D position and relationship to C and E as defined in §9.1.

**The two outputs Phase D must reconcile:**

| Input from Phase C | Phase D must answer |
|---|---|
| Application components and their interfaces | What runtime/compute platform hosts each component? |
| Data models and data flows | Which databases, message brokers, and storage systems store and move the data? |
| Non-functional requirements (NFRs) | Which infrastructure patterns meet the availability, latency, and security requirements? |
| Integration patterns | What network topology, API gateway, and service mesh are needed? |

**Developer analogy:** Phase C is the architecture diagram with boxes and arrows. Phase D is the `docker-compose.yml` or Kubernetes manifest that makes those boxes and arrows real — but defined as governance standards, not as config files for one service.

---

## Bloom Layer C — Guided Practice (Step-by-Step)

### TOGAF Phase D Step Sequence

The following sequence is defined in **TOGAF 10 Part II, Chapter 9, §9.3** (Steps 1–9). Steps 8 and 9 are frequently collapsed; keeping them separate preserves the distinction between finalising the architecture (technical consensus) and completing the ADD (formal documentation).

``` mermaid
flowchart TD
    S1["Step 1: Select reference models,\nviewpoints and tools"] --> S2
    S2["Step 2: Develop Baseline Technology\nArchitecture description (As-Is)"] --> S3
    S3["Step 3: Develop Target Technology\nArchitecture description (To-Be)"] --> S4
    S4["Step 4: Perform gap analysis\n(Baseline vs Target)"] --> S5
    S5["Step 5: Define candidate\nArchitecture Roadmap components"] --> S6
    S6["Step 6: Resolve impacts across\nthe Architecture Landscape"] --> S7
    S7["Step 7: Conduct formal\nstakeholder review"] --> S8
    S8["Step 8: Finalise the\nTechnology Architecture"] --> S9
    S9["Step 9: Create Architecture Definition\nDocument (Technology chapter)"]

    style S1 fill:#37474f,color:#fff,stroke:none
    style S9 fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF Standard 10th Edition, Part II, Chapter 9, §9.3 — Phase D Steps 1–9. [pubs.opengroup.org/architecture/togaf10-doc/arch/chap09.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap09.html)

#### Risks when steps are skipped

| If you skip … | Downstream risk |
|---|---|
| Step 1 (reference models) | Technology choices made without architectural standards; inconsistency across teams |
| Step 2 (baseline) | No gap analysis is possible; migration effort is underestimated |
| Step 4 (gap analysis) | Phase E roadmap has no technology foundation; work packages are vague |
| Step 6 (landscape impacts) | Phase D decisions conflict with earlier phase architecture decisions |
| Step 7 (stakeholder review) | Technology architecture approved without CISO/ops/platform input; security or operability gaps emerge in Phase G |
| Steps 8 and 9 (separated) | Architecture "finalised" in a meeting but never formally documented; Phase G has nothing to govern against |

---

### Inputs

| Input | Source | Developer translation |
|---|---|---|
| Phase C ADD (Application & Data) | Phase C | "The service diagram and data model I need to deploy" |
| Architecture Vision | Phase A | "The NFRs, RTO/RPO, and regulatory constraints my infrastructure must meet" |
| Technology Principles | Preliminary Phase | "Engineering principles: cloud-first, IaC, security-by-default" |
| Technology Standards (existing) | Architecture Repository | "The current approved stack / technology radar" |
| Infrastructure baseline | Operations / Platform team | "What's actually running today — cloud accounts, servers, legacy systems" |
| Platform roadmaps (cloud vendor, etc.) | Vendor communications | "What the cloud provider is deprecating or releasing" |

---

### Technique 1 — Technology Standards Catalogue

**What it is:** A governed list of approved technologies per category. The primary output of Phase D that teams reference when making implementation decisions.

**Developer analogy:** The project's `pom.xml` / `package.json` dependency policy — but at enterprise scope, governing what's allowed across all projects, with an approval process for exceptions.

> The example below is AWS-centric as an illustrative instance. The Technology Standards Catalogue is tool-agnostic in structure — substitute your organisation's stack.

#### Platform & Runtime

| Category | Approved Standard | Version / Tier | Notes |
|---|---|---|---|
| Cloud provider | AWS | Primary | Document your provider + secondary if any |
| Compute — containers | ECS Fargate (or equivalent managed container service) | Managed | Preferred for new services |
| Compute — serverless | Lambda (or equivalent FaaS) | — | Event-driven, low-frequency workloads |
| Container runtime | Docker / OCI-compliant | Latest stable | OCI-compliant images required |
| Container registry | Managed registry (ECR / GCR / ACR) | — | Image scanning enabled |
| Orchestration | Managed container service | — | Kubernetes: Trial tier until operational playbook exists |

#### Languages & Runtimes

| Language | Version | Use Case | Status |
|---|---|---|---|
| Java | 21 LTS | Backend services | **Adopt** |
| Python | 3.12 | Data pipelines, scripting, APIs | **Adopt** |
| Go | 1.22 | High-throughput services | **Trial** |
| Node.js | 20 LTS | BFF, notifications | **Adopt** |
| TypeScript | 5.x | Front-end (React/Next) | **Adopt** |
| Java 8 | 8 | Legacy monolith | **Hold** — migrate plan required |

#### Data Stores

| Category | Approved Technology | Use Case | Notes |
|---|---|---|---|
| Relational | PostgreSQL 16 | Transactional domain data | Prefer managed (RDS/Cloud SQL) |
| Caching | Redis 7 (managed) | Session, rate limiting, idempotency | |
| Object storage | Cloud object store (S3 / GCS / ADLS) | Unstructured data, data lake | |
| Message broker | Managed queue/topic service | Async event integration | See ADR-002 |
| Search | OpenSearch / Elasticsearch (managed) | Full-text search, log aggregation | |
| Analytics warehouse | Cloud-native warehouse | Data warehouse | dbt for transformations |

#### Networking & Security

| Category | Standard | Notes |
|---|---|---|
| API Gateway | Cloud-native or Kong | Complex routing: Kong; simple: cloud-native |
| Service mesh | Assess — adopt when >10 services | Evaluate Istio vs Linkerd vs Consul |
| Load balancing | Cloud ALB/LB | HTTPS termination at load balancer |
| Certificate management | Managed certificate service | TLS 1.2 minimum; TLS 1.3 preferred |
| Secrets management | Managed secrets service | No credentials in env vars or source code |
| Network isolation | VPC per environment | Private subnets for compute; public only for ingress |
| WAF | Cloud WAF | Mandatory for all public-facing services |

#### Observability Stack

| Layer | Recommended approach | Notes |
|---|---|---|
| Metrics | Cloud-native + Prometheus | RED + USE metrics per service |
| Logging | Structured JSON → centralised sink | Correlation ID mandatory in every log line |
| Tracing | OpenTelemetry (OTel) | Prefer OTel for vendor portability |
| Dashboards | Grafana or cloud-native | Per-service SLO dashboard |
| Alerting | Alerts on SLO burn rate | Alert on symptoms, not causes |
| Synthetic monitoring | Cloud synthetics or k6 | Critical user journeys monitored end-to-end |

> **Source:** Technology catalogue structure based on TOGAF 10 §9.3 Technology Standards Catalogue content requirement. Observability categories aligned with Google SRE Book (Beyer et al., 2016) — RED method (Rate, Errors, Duration) and USE method (Utilisation, Saturation, Errors). OTel standard: [opentelemetry.io](https://opentelemetry.io).

---

### Technique 2 — Target Technology Architecture Diagram (Deployment View)

**What it is:** A C4 Level 3 / infrastructure-level diagram showing how application components from Phase C are deployed onto the technology platform.

**Developer analogy:** The `infrastructure as code` visualised — but at architecture scope (no IP addresses, no AMI IDs; just topology, security zones, and integration patterns).

``` mermaid
flowchart TB
    Internet([🌐 Internet]) --> CDN[CDN\nStatic assets]
    CDN --> ALB[Load Balancer\nHTTPS termination — public subnet]
    ALB --> AGW[API Gateway\nprivate subnet]

    subgraph VPC["Cloud VPC — Region"]
        subgraph PubNet["Public Subnet"]
            ALB
        end
        subgraph PrivNet["Private Subnet"]
            AGW --> SVC1[Order Service\nManaged Container]
            AGW --> SVC2[Inventory Service\nManaged Container]
            AGW --> SVC3[Notification Service\nManaged Container]
            AGW --> SVC4[Product Catalogue\nManaged Container]

            SVC1 --> DB1[(Order DB\nPostgreSQL)]
            SVC2 --> DB2[(Inventory DB\nPostgreSQL)]
            SVC1 --> MQ[Message Broker\nSNS / SQS]
            MQ --> SVC2
            MQ --> SVC3

            SVC1 & SVC2 & SVC3 --> CACHE[Cache\nRedis — managed]
            SVC1 & SVC2 & SVC3 --> SECRETS[Secrets Manager]
        end
    end

    AGW --> IDP[Identity Provider\nOIDC — external]
    SVC3 --> EMAIL[Email Service\nexternal]

    style VPC fill:#e3f2fd,stroke:#1565c0
    style PubNet fill:#fff3e0,stroke:#e65100
    style PrivNet fill:#e8f5e9,stroke:#2e7d32
```

> **Source:** Diagram topology follows C4 Model Level 3 (Container Diagram) conventions (Simon Brown, [c4model.com](https://c4model.com)). VPC/subnet isolation pattern follows NIST SP 800-207 Zero Trust Architecture §3.3 (network micro-segmentation). API Gateway pattern from TOGAF 10 Technology Architecture reference model.

---

### Technique 3 — Technology Gap Analysis

| Component | Baseline | Target | Gap Type | Action | Phase |
|---|---|---|---|---|---|
| Application hosting | On-prem VMs, manual deploy | Managed containers (ECS/GKE), IaC | Change | Containerise; write IaC; CI/CD | E |
| Database | Single shared relational DB | Managed DB per domain | Change | Schema separation; data migration | E/F |
| Authentication | Custom session auth in monolith | OIDC/OAuth2 via Identity Provider | Change | Integrate IdP; configure API Gateway OIDC | E |
| Secrets management | Env vars / config files | Managed secrets service | Change | Migrate all secrets; update app config | E |
| Observability | Ad-hoc logs | OTel tracing + structured logs + SLO dashboards | Add | Instrument all services; build dashboards | E |
| Network security | Flat network, no WAF | VPC isolation; WAF on ingress | Change | VPC re-architecture; WAF rules | E |
| CI/CD | Manual / legacy pipeline | Automated per-service pipelines | Change | Write pipelines; containerise builds | E |
| Legacy monolith | Running in production | Decomposed or strangled | Retire (over time) | Strangler Fig pattern; phased extraction | F |

> **Source:** Gap categories (Add, Change, Retire, Retain) from TOGAF 10 Part III §31.2.3. Strangler Fig pattern from Martin Fowler, [martinfowler.com/bliki/StranglerFigApplication.html](https://martinfowler.com/bliki/StranglerFigApplication.html).

---

### Technique 4 — IaC & Pipeline Standards

All infrastructure must be defined as code. No manual provisioning in non-development environments — this is a technology architecture principle, not a team preference.

| Layer | Tool | Repository convention |
|---|---|---|
| Cloud infrastructure | Terraform | `infrastructure/terraform/` |
| Container images | Dockerfile per service | `<service>/Dockerfile` |
| CI/CD pipelines | GitHub Actions / GitLab CI | `.github/workflows/` or `.gitlab-ci.yml` |
| Helm charts (if Kubernetes) | Helm 3 | `infrastructure/helm/` |
| IaC testing | Terratest / Checkov | `infrastructure/test/` |

```
infrastructure/
├── terraform/
│   ├── modules/
│   │   ├── container-service/   ← Reusable compute module
│   │   ├── managed-database/    ← Reusable DB module
│   │   └── networking/          ← VPC, subnets, security groups
│   └── environments/
│       ├── dev/
│       ├── staging/
│       └── production/
```

> **Source:** IaC module structure follows HashiCorp Terraform Best Practices ([developer.hashicorp.com/terraform/language/modules/develop/structure](https://developer.hashicorp.com/terraform/language/modules/develop/structure)) and the DORA "Configuration Management" capability from *Accelerate* (Forsgren, Humble, Kim — 2018).

---

### Technique 5 — Resiliency Architecture

**What it is:** A structured mapping of business RTO/RPO requirements (from Phase A) to technology patterns that deliver them.

``` mermaid
flowchart LR
    subgraph AZ1["Availability Zone 1"]
        SVC_A[Service Instance A]
        DB_P[(DB Primary)]
    end
    subgraph AZ2["Availability Zone 2"]
        SVC_B[Service Instance B]
        DB_S[(DB Standby\nauto-failover)]
    end
    LB[Load Balancer] --> SVC_A & SVC_B
    DB_P -.->|Synchronous replication| DB_S

    style AZ1 fill:#e3f2fd,stroke:#1565c0
    style AZ2 fill:#e8f5e9,stroke:#2e7d32
```

> **Source:** Multi-AZ HA pattern from AWS Well-Architected Framework — Reliability Pillar REL06 (Deploy the workload to multiple locations). [docs.aws.amazon.com/wellarchitected/latest/reliability-pillar](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/). RTO/RPO classification aligned with TOGAF 10 Technology Architecture content metamodel NFR categories.

| RTO / RPO requirement | Technology pattern | Cost implication |
|---|---|---|
| RTO < 4h, RPO < 1h | Single-region multi-AZ; managed DB with auto-failover | Low |
| RTO < 15min, RPO < 5min | Active-active across AZs; streaming replication | Medium |
| RTO < 5min, RPO < 1min | Active-active across regions; global load balancing | High |
| RTO < 24h, RPO < 24h | Single-AZ with daily backups (non-critical only) | Lowest |

---

## Output Artifacts — Phase D Exit Criteria

- [ ] Technology Standards Catalogue — complete for all in-scope categories
- [ ] Baseline Technology Architecture — documented (current state)
- [ ] Target Technology Architecture — C4 deployment/infrastructure diagram
- [ ] Technology Gap Analysis — complete with gap types assigned
- [ ] IaC structure and standards — defined
- [ ] Resiliency pattern — defined and validated against Phase A RTO/RPO
- [ ] Well-Architected review — checklist completed
- [ ] Architecture Definition Document (Technology chapter) — drafted
- [ ] Candidate Architecture Roadmap components — identified
- [ ] Architecture Repository updated

---

## Well-Architected Review Checklist

Run this against the target technology architecture before completing Phase D:

=== "Operational Excellence"
    - [ ] All infrastructure defined as code
    - [ ] CI/CD pipelines automated; no manual deploy in non-dev environments
    - [ ] Runbooks exist for all operational procedures

=== "Security"
    - [ ] All services in private subnets
    - [ ] WAF on all public ingress points
    - [ ] No secrets in source code, env vars, or log output
    - [ ] Least-privilege IAM/RBAC roles per service
    - [ ] Encryption at rest and in transit enforced

=== "Reliability"
    - [ ] Multi-AZ for all production workloads (or justified exception)
    - [ ] DB auto-failover configured
    - [ ] Auto-scaling configured and tested
    - [ ] Circuit breakers and retry with back-off in all service-to-service calls
    - [ ] Chaos test executed for primary failure scenario

=== "Performance"
    - [ ] Load test at target scale completed
    - [ ] Caching strategy defined and implemented
    - [ ] DB connection pooling configured

=== "Cost"
    - [ ] Right-sizing validated
    - [ ] Cost alerts and anomaly detection configured
    - [ ] Reserved capacity / savings plans assessed for steady-state workloads

> **Source:** AWS Well-Architected Framework 6 pillars (AWS, 2023). Framework is cloud-agnostic in principle — analogues exist in Google Cloud Architecture Framework and Azure Well-Architected Framework.

---

## Bloom Layer D — Tools & Notations

### Infrastructure & IaC Tools

| Tool | Purpose in Phase D | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **Terraform** | Cloud infrastructure as code | Cloud-agnostic; large module ecosystem; mature state management | State management complexity; HCL syntax; no built-in drift detection | Free (OSS); Terraform Cloud from $20/user/mo | [terraform.io](https://www.terraform.io) |
| **Pulumi** | IaC in general-purpose languages (Python, Go, TypeScript) | Real language = loops, functions, tests; same skills as app code | Smaller ecosystem than Terraform; state also managed externally | Free (OSS); Pulumi Cloud from $50/mo | [pulumi.com](https://www.pulumi.com) |
| **AWS CDK / CDK for Terraform** | IaC using typed constructs in TypeScript/Python | Type safety; L2/L3 constructs reduce boilerplate | AWS-centric (CDK); requires language skill; abstractions can hide complexity | Free (OSS) | [github.com/aws/aws-cdk](https://github.com/aws/aws-cdk) |
| **Checkov** | Static analysis for IaC security / compliance | Catches misconfigs before deploy; supports Terraform, CF, K8s | Rules need tuning; false positives; not a replacement for runtime security | Free (OSS) | [checkov.io](https://www.checkov.io) |

### Observability Tools

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **OpenTelemetry** | Vendor-neutral instrumentation standard (traces, metrics, logs) | Avoids vendor lock-in; backed by CNCF; wide SDK support | Complex configuration; data pipeline setup required | Free (open standard) | [opentelemetry.io](https://opentelemetry.io) |
| **Grafana** | Unified dashboards (metrics, logs, traces) | Pluggable data sources; free core; strong community | Alerting less mature than dedicated tools; dashboards need maintenance | Free (OSS); Grafana Cloud free tier; paid from ~$8/user/mo | [grafana.com](https://grafana.com) |
| **Datadog** | All-in-one APM, metrics, logs, traces | Excellent UX; out-of-the-box integrations; ML anomaly detection | Expensive at scale; vendor lock-in risk | From $15/host/mo; scales steeply | [datadoghq.com](https://www.datadoghq.com) |
| **Prometheus** | Metrics collection and alerting | Cloud-native standard; pull model; open source | No long-term storage natively; requires Thanos/Cortex for scale | Free (OSS) | [prometheus.io](https://prometheus.io) |

### Architecture Modelling

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **C4 Model** | Layered context/container/component/code diagrams | Developer-friendly; widely understood; lightweight | Not a formal standard; no notation for all concerns | Free (open methodology) | [c4model.com](https://c4model.com) |
| **ArchiMate 3.2 — Technology layer** | Formal technology architecture modelling | Integrated with TOGAF; rich metamodel; traceability | Requires training; tooling cost | Free spec; Sparx EA ~$229/user/yr | [pubs.opengroup.org/architecture/archimate3-doc](https://pubs.opengroup.org/architecture/archimate3-doc/) |
| **draw.io** | Lightweight infrastructure and network diagrams | Free; offline; Git-friendly | No repository; no analysis | Free | [diagrams.net](https://www.diagrams.net) |

---

## Bloom Layer E — Decision Frameworks

| Technology decision | Lead with … when | Lean away from when | Risk if wrong |
|---|---|---|---|
| **Managed service vs. self-hosted** | Operational simplicity is the constraint; small platform team | Cost at scale dominates; specific control/compliance needed | Self-hosting without operational maturity → fragile; managed at scale → unexpected cost |
| **Single cloud vs. multi-cloud** | Skills depth; cost predictability; vendor leverage acceptable | DR/regulatory requirement; portability is a hard constraint | Single-cloud lock-in can become a commercial and resilience risk at scale |
| **Containers vs. serverless vs. VMs** | Containers: balanced; Serverless: event-driven, short-lived; VMs: workloads with specific OS requirements | Don't mix without clear criteria per workload type | Inconsistency multiplies operational burden |
| **Kubernetes vs. managed container service** | K8s: high workload diversity; platform team exists | Managed (ECS/Cloud Run): small team; speed priority | K8s without a dedicated platform team → operational debt |
| **Standards-strict vs. tolerant** | Many teams; consistency required; compliance | Few teams; speed of experimentation matters | Too strict → shadow IT; too tolerant → unmanaged drift |
| **Centralised observability vs. per-team** | Always centralise correlation and tracing | Per-team is fine for dashboards | No centralised tracing → incidents take 10× longer to diagnose across services |

---

## Bloom Layer E — Judgment & Trade-offs

| Architectural question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Single cloud vs. multi-cloud** | Skill depth; cost predictability | Regulatory DR requirement; portability hard constraint | Lock-in becomes commercial leverage risk at contract renewal |
| **Managed services vs. self-host** | Operational burden is the constraint | Cost at scale dominates; specific control needed | Self-hosted without mature ops → fragile infra; managed → surprise cost spikes |
| **Standards-strict vs. standards-tolerant** | Many teams; consistency critical; compliance | Few teams; rapid experimentation | Too strict → shadow IT; too tolerant → N×operational cost from drift |
| **Buy/SaaS vs. build for platform capabilities** | Non-differentiating capability; time-to-market | Core differentiator; unique IP; compliance prevents SaaS | Build what should be bought → maintenance drag; buy what should be built → capability gap |
| **Technology refresh now vs. later** | NFRs are being missed today; compliance deadline | Stable, performing, low risk | Deferring always feels safe until tech debt compounds into a forced emergency migration |

**Synthesis exercise:** for one in-life system, list its top 5 technology choices and classify each as: governed (in the standards catalogue), tolerated (variance with a recorded exception/dispensation), or drifted (neither governed nor recorded). Anything in the "drifted" column is unmanaged debt.

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** You are the lead architect for an e-commerce platform migrating from a monolithic on-premise deployment to cloud-native microservices. Phase B and C are complete. The Phase C ADD defines 8 application services and a shared data platform.

1. **Recall:** Name the 9 Phase D steps and the two key outputs that Phase E consumes from Phase D.
2. **Comprehension:** Explain why the Technology Standards Catalogue must exist *before* Phase E work packages are scoped, not after.
3. **Application:** For each of the 8 services defined in Phase C, complete one row in the Technology Gap Analysis table (baseline → target → gap type → action).
4. **Analysis:** The CISO requires all services to use private subnets with WAF on the public ingress. One team argues this will add 6 weeks to delivery. Analyse the trade-off. What Phase D artefacts support or challenge the CISO's requirement?
5. **Evaluation:** Two of the 8 services have an RTO requirement of < 5 minutes (order management, payment processing). Three have RTO < 4 hours. Two are non-critical (RTO < 24 hours). Design a resiliency architecture that meets all three tiers without gold-plating the non-critical services.
6. **Synthesis:** Produce a one-page Technology Architecture Decision for the observability stack: tool selection, rationale (with trade-offs acknowledged), NFR mapping, and the governance process for adding a new observability tool in the future.

> In Phase D the architect's job is not to pick the best technology. It is to pick technology that the organisation can govern, operate, and evolve — and to make that choice in a way that 10 teams can follow consistently.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Technology Standards Catalogue first-draft** | "Generate a Technology Standards Catalogue for a [stack description] organisation. Structure by: compute, runtime, data, networking, observability. Use Adopt/Trial/Assess/Hold status." | Outdated version numbers; vendor-biased recommendations; missing governance process |
| **Infrastructure diagram review** | "Here is our deployment architecture [describe or paste]. Identify: (a) security gaps, (b) single points of failure, (c) observability blind spots." | Generic findings; may miss org-specific constraints; no awareness of regulatory context |
| **Gap analysis classification** | "Here is our technology baseline [describe] and target [describe]. Classify each delta as Add/Change/Retire/Retain and suggest the Phase E action." | Over-classifying "Retain" to reduce scope; may miss dependencies |
| **Well-Architected review** | "Review this architecture description against the [AWS/GCP/Azure] Well-Architected Framework. Flag any pillar with gaps." | Framework-specific; may not map to your cloud; treats output as compliance, not thinking |
| **RTO/RPO to pattern mapping** | "Map these RTO/RPO requirements [paste table] to the appropriate resiliency patterns. Include cost implications." | Generic patterns; no awareness of your actual cost constraints or operational maturity |

!!! warning "Bias to watch"
    LLMs consistently recommend managed cloud services over self-hosted, and complex architectures over simple ones. Both biases skew toward higher cost and complexity. Always ask the model to argue the opposing position before accepting a recommendation.

---

## Common Mistakes

!!! danger "Failure patterns to watch"
    - **Technology Architecture without a Standards Catalogue** — teams make independent technology choices that fragment the stack and multiply operational burden. Every technology decision made without governance is future technical debt.
    - **No baseline documented** — without documenting what exists today, the gap analysis is guesswork and migration effort is systematically underestimated.
    - **Resiliency designed for average load** — RTO/RPO requirements from Phase A must explicitly drive infrastructure patterns; they cannot be retrofitted after deployment contracts are signed.
    - **IaC as an afterthought** — infrastructure defined manually in the first sprint is not refactored into IaC later. Make IaC the standard from day one or accept permanent operational debt.
    - **Observability bolted on at the end** — structured logging, metrics, and tracing are architecture constraints, not implementation details. They must appear in the Technology Architecture and the ADD.

!!! failure "Technology Architecture without standards governance"
    Without an approved Standards Catalogue and a governance process to maintain it (Phase H), teams make independent technology choices that fragment the stack. The fragmentation cost compounds: each additional non-standard technology adds onboarding, security review, and operational overhead.

!!! warning "Designing for current scale only"
    Technology architecture must account for 2–3× current scale. Design the architecture to scale; right-size the initial deployment. Over-provisioning is wasteful; under-architecting for scale requires an emergency rework.

!!! warning "Skipping the resiliency design"
    RTO/RPO requirements from Phase A must be explicitly mapped to technology patterns. "We'll use multi-AZ" is not a resiliency design — it is a starting point. Document which services require what tier, and validate with the business.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 9 | Primary standard | Authoritative Phase D steps, inputs, outputs | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap09.html) |
| ArchiMate 3.2 — Technology Layer | Standard | Technology node, device, system software, infrastructure elements | [pubs.opengroup.org/architecture/archimate3-doc](https://pubs.opengroup.org/architecture/archimate3-doc/) |
| C4 Model (Simon Brown) | Methodology | Context / container / component / code diagrams; developer-accessible | [c4model.com](https://c4model.com) |
| AWS Well-Architected Framework | Framework | 6-pillar checklist for cloud technology architecture | [aws.amazon.com/architecture/well-architected](https://aws.amazon.com/architecture/well-architected/) |
| Google Cloud Architecture Framework | Framework | Cloud-agnostic equivalent to AWS WAF | [cloud.google.com/architecture/framework](https://cloud.google.com/architecture/framework) |
| NIST SP 800-207 Zero Trust Architecture | Standard | Network segmentation, microsegmentation, identity-centric security | [nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf) |
| Accelerate (Forsgren, Humble, Kim — 2018) | Book | DORA metrics; IaC and CI/CD as architecture capabilities | [itrevolution.com/accelerate-book](https://itrevolution.com/accelerate-book/) |
| The Site Reliability Engineering Book (Google — 2016) | Book | RED/USE metrics; SLO-driven observability; error budget | [sre.google/sre-book/table-of-contents](https://sre.google/sre-book/table-of-contents/) |
| Team Topologies (Skelton & Pais — 2019) | Book | Platform team topology; cognitive load and technology standards | [teamtopologies.com](https://teamtopologies.com) |
| Designing Distributed Systems (Burns — 2018) | Book | Container and microservice infrastructure patterns | [oreilly.com](https://www.oreilly.com/library/view/designing-distributed-systems/9781491983638/) |
