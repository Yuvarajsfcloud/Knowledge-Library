# Phase D — Technology Architecture

**TOGAF Reference:** Part II, Chapter 9 — Phase D  
**Objective:** Develop the Target Technology Architecture that enables the logical and physical application and data components from Phase C to be deployed. Map software to hardware and infrastructure.

---

## Objectives

1. Develop the Target Technology Architecture that will form the basis for the implementation work in Phases E–G.
2. Identify candidate Architecture Roadmap components based on gaps between baseline and target.
3. Ensure the Technology Architecture is consistent with the Architecture Vision and Phases B and C.

---

## Process Flow

``` mermaid
flowchart TD
    A["Select Reference Models,\nViewpoints & Tools"] --> B
    B["Develop Baseline Technology\nArchitecture (As-Is)"] --> C
    C["Develop Target Technology\nArchitecture (To-Be)"] --> D
    D["Perform Gap Analysis"] --> E
    E["Define Candidate\nRoadmap Components"] --> F
    F["Resolve Impacts Across\nArchitecture Landscape"] --> G
    G["Conduct Formal\nStakeholder Review"] --> H
    H["Finalise Technology\nArchitecture\n& ADD (Technology)"] --> I
    I["Phase D Complete ✓\nEnter Phase E"]

    style A fill:#37474f,color:#fff,stroke:none
    style I fill:#2e7d32,color:#fff,stroke:none
```

---

## Technology Standards Catalogue

Define approved standards per technology category. This is a living document — updated through governance (Phase H).

### Platform & Runtime

| Category | Approved Standard | Version / Tier | Notes |
|---|---|---|---|
| Cloud provider | AWS | Primary | Secondary: none |
| Compute — containers | AWS ECS Fargate | Managed | Preferred for new services |
| Compute — serverless | AWS Lambda | — | Use for event-driven, low-frequency workloads |
| Container runtime | Docker | Latest stable | OCI-compliant images |
| Container registry | AWS ECR | — | Image scanning enabled |
| Orchestration | AWS ECS | — | Kubernetes: assess tier (not yet adopted) |

### Languages & Runtimes

| Language | Version | Use Case | Status |
|---|---|---|---|
| Java | 21 LTS | Backend services | **Adopt** |
| Python | 3.11 | Data pipelines, scripting, APIs | **Adopt** |
| Go | 1.22 | High-throughput services | **Trial** |
| Node.js | 20 LTS | Front-end BFF, notifications | **Adopt** |
| TypeScript | 5.x | Front-end (React) | **Adopt** |
| Java 8 | 8 | Legacy monolith | **Hold** — migrate to Java 21 |

### Data Stores

| Category | Approved Technology | Use Case | Notes |
|---|---|---|---|
| Relational | PostgreSQL 16 | Transactional domain data | Prefer RDS; managed |
| Caching | Redis 7 (ElastiCache) | Session, rate limiting, idempotency | |
| Object storage | AWS S3 | Unstructured data, static assets, data lake | |
| Message broker | AWS SQS / SNS | Async event integration | See ADR-002 |
| Search | OpenSearch (AWS managed) | Full-text search, log aggregation | |
| Analytics | AWS Redshift | Data warehouse | dbt for transformations |

### Networking & Security

| Category | Standard | Notes |
|---|---|---|
| API Gateway | Kong (self-managed) or AWS API Gateway | Kong preferred for complex routing |
| Service mesh | Assess — not yet adopted | Evaluate Istio vs Linkerd if > 10 services |
| Load balancing | AWS ALB | HTTPS termination at ALB |
| DNS | AWS Route 53 | |
| CDN | AWS CloudFront | Static assets and SPA delivery |
| Certificate management | AWS ACM | TLS 1.2 minimum; TLS 1.3 preferred |
| Secrets management | AWS Secrets Manager | No credentials in env vars or code |
| Network isolation | VPC per environment | Private subnets for compute; public only for ALB |
| WAF | AWS WAF | Mandatory for all public-facing services |

### Observability Stack

| Layer | Tool | Notes |
|---|---|---|
| Metrics | AWS CloudWatch + Prometheus (ECS) | RED + USE metrics per service |
| Logging | AWS CloudWatch Logs | Structured JSON; correlation ID mandatory |
| Tracing | AWS X-Ray / OpenTelemetry | OTel preferred for portability |
| Dashboards | Grafana (CloudWatch data source) | |
| Alerting | CloudWatch Alarms + PagerDuty | |
| Synthetic monitoring | CloudWatch Synthetics | |

---

## Technology Architecture Diagram

### Deployment View (C4 Level 3 / Infrastructure)

``` mermaid
flowchart TB
    Internet([Internet]) --> CF[CloudFront CDN]
    CF --> ALB[Application Load Balancer\nAWS ALB — public]
    ALB --> AGW[API Gateway\nKong — private subnet]

    subgraph VPC["AWS VPC — eu-west-1"]
        subgraph Public["Public Subnet"]
            ALB
        end
        subgraph Private["Private Subnet"]
            AGW --> ECS1[Order Service\nECS Fargate]
            AGW --> ECS2[Inventory Service\nECS Fargate]
            AGW --> ECS3[Notification Service\nECS Fargate]
            AGW --> ECS4[Product Catalogue\nECS Fargate]

            ECS1 --> RDS1[(Order DB\nRDS PostgreSQL)]
            ECS2 --> RDS2[(Inventory DB\nRDS PostgreSQL)]
            ECS1 --> SNS[SNS Topics]
            SNS --> SQS1[SQS Queue\nInventory Consumer]
            SNS --> SQS2[SQS Queue\nNotification Consumer]
            SQS1 --> ECS2
            SQS2 --> ECS3

            ECS1 & ECS2 & ECS3 --> REDIS[ElastiCache Redis\nIdempotency / Cache]
            ECS1 & ECS2 & ECS3 --> SM[AWS Secrets\nManager]
        end
    end

    AGW --> OKTA[Okta OIDC\nexternal]
    ECS3 --> SES[AWS SES\nemail]

    style VPC fill:#e3f2fd,stroke:#1565c0
    style Public fill:#fff3e0,stroke:#e65100
    style Private fill:#e8f5e9,stroke:#2e7d32
```

---

## Technology Gap Analysis

| Component | Baseline | Target | Gap | Action |
|---|---|---|---|---|
| Application hosting | On-prem servers, manual deploy | AWS ECS Fargate, IaC (Terraform) | Containerise services; write Terraform; CI/CD pipeline | Phase E |
| Database | Single Oracle instance | RDS PostgreSQL per domain | Schema extraction; data migration | Phase E/F |
| Authentication | Custom session in monolith | Okta OIDC via API Gateway | Integrate Okta; configure Kong OIDC plugin | Phase E |
| Secrets management | Environment variables / config files | AWS Secrets Manager | Migrate all secrets; update application config | Phase E |
| Observability | Minimal logs only | OTel tracing + CloudWatch metrics + dashboards | Instrument all services; build dashboards | Phase E |
| Network security | Flat network, no WAF | VPC with private subnets; WAF on ALB | VPC re-architecture; WAF rules | Phase E |
| CI/CD | Jenkins (manual trigger) | GitHub Actions (automated, per-service) | Write pipelines; containerise builds | Phase E |

---

## IaC & Pipeline Standard

All infrastructure must be defined as code. No manual provisioning in non-development environments.

| Layer | Tool | Repository Location |
|---|---|---|
| Cloud infrastructure | Terraform | `infrastructure/terraform/` |
| Container images | Dockerfile per service | `<service>/Dockerfile` |
| CI/CD pipelines | GitHub Actions | `.github/workflows/` |
| K8s manifests (if adopted) | Helm charts | `infrastructure/helm/` |
| IaC testing | Terratest | `infrastructure/test/` |

**Terraform module structure:**
```
infrastructure/
├── terraform/
│   ├── modules/
│   │   ├── ecs-service/      ← Reusable ECS service module
│   │   ├── rds-postgres/     ← Reusable RDS module
│   │   └── networking/       ← VPC, subnets, security groups
│   ├── environments/
│   │   ├── dev/
│   │   ├── staging/
│   │   └── production/
│   └── global/               ← Route53, ACM, ECR
```

---

## Resiliency Architecture

### Multi-AZ Deployment (mandatory for production)

``` mermaid
flowchart LR
    subgraph AZ1["Availability Zone 1\neu-west-1a"]
        ECS1A[Service Instance]
        RDS1A[(RDS Primary)]
    end
    subgraph AZ2["Availability Zone 2\neu-west-1b"]
        ECS1B[Service Instance]
        RDS1B[(RDS Standby\nauto-failover)]
    end
    ALB[ALB] --> ECS1A & ECS1B
    RDS1A -.->|Sync replication| RDS1B

    style AZ1 fill:#e3f2fd,stroke:#1565c0
    style AZ2 fill:#e8f5e9,stroke:#2e7d32
```

| RTO / RPO Requirement | Architecture Pattern |
|---|---|
| RTO < 1h, RPO < 15min | Multi-AZ RDS with auto-failover; ECS replicas across AZs |
| RTO < 5min, RPO < 1min | Active-active across regions (higher cost) |
| RTO < 1h, RPO < 24h | Single-AZ with daily RDS snapshots (non-critical workloads) |

---

## Output Artifacts (Phase D Exit Criteria)

- [ ] Technology Standards Catalogue — complete for all in-scope categories
- [ ] Baseline Technology Architecture — documented
- [ ] Target Technology Architecture — C4 deployment / infrastructure diagram
- [ ] Technology Gap Analysis — complete
- [ ] IaC structure and standards — defined
- [ ] Resiliency pattern — defined and validated against RTO/RPO
- [ ] Architecture Definition Document (Technology) — drafted
- [ ] Candidate Architecture Roadmap components — identified
- [ ] Architecture Repository updated

---

## Well-Architected Review — Technology Checklist

Run this against the target technology architecture before completing Phase D:

=== "Operational Excellence"
    - [ ] All infrastructure defined as code
    - [ ] CI/CD pipelines automated; manual deploy process eliminated
    - [ ] Runbooks exist for all operational procedures

=== "Security"
    - [ ] All services in private subnets
    - [ ] WAF configured on all public endpoints
    - [ ] No secrets in code, env vars, or logs
    - [ ] Least-privilege IAM roles per service
    - [ ] Encryption at rest and in transit enforced

=== "Reliability"
    - [ ] Multi-AZ deployment for all production workloads
    - [ ] RDS auto-failover enabled
    - [ ] Auto-scaling configured
    - [ ] Circuit breakers and retry logic in all inter-service calls
    - [ ] Chaos test executed for primary failure scenario

=== "Performance"
    - [ ] Load test executed at target scale
    - [ ] Caching strategy defined and implemented
    - [ ] Database connection pooling configured

=== "Cost"
    - [ ] Right-sizing validated (not over-provisioned)
    - [ ] Cost alerts configured
    - [ ] Reserved instances / savings plans assessed

---

## Common Mistakes

!!! failure "Technology Architecture without standards governance"
    Without an approved standards catalogue and a governance process to maintain it, teams make independent technology choices that fragment the stack and multiply operational burden.

!!! warning "Designing for current scale only"
    Technology architecture must account for 2–3x current scale. Design the architecture to scale; right-size the initial deployment.

!!! warning "Skipping the resiliency design"
    RTO/RPO requirements from the business (Phase A) must be explicitly mapped to technology patterns. If the business needs RTO < 1h, the architecture must demonstrate how that is achieved.

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part II, Chapter 9: Phase D
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap09.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap09.html)
- AWS Well-Architected Framework: [aws.amazon.com/architecture/well-architected](https://aws.amazon.com/architecture/well-architected/)
- NIST Cloud Computing Reference Architecture: [nvlpubs.nist.gov](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication500-292.pdf)
