# Building Blocks

**TOGAF Reference:** Part V, Chapter 40 — Building Blocks  
**Purpose:** Building blocks are reusable packages of functionality that can be combined to deliver architectures and solutions.

---

## ABBs vs SBBs

| | Architecture Building Block (ABB) | Solution Building Block (SBB) |
|---|---|---|
| **Nature** | Conceptual / logical | Concrete / physical |
| **Level** | Architecture | Solution / product |
| **Describes** | Capability required | Technology or product that delivers it |
| **Example** | "Identity Provider" | Okta, AWS Cognito, Azure AD |
| **Example** | "Message Broker" | AWS SQS/SNS, Apache Kafka, RabbitMQ |
| **Example** | "Relational Database" | AWS RDS PostgreSQL, Azure SQL, Google Cloud SQL |
| **Phase used** | Phases B–D (design) | Phase D (technology selection) + Phase E (solution choice) |

``` mermaid
flowchart LR
    ABB["Architecture Building Block\n(ABB)\nWhat capability is needed?"]
    SBB["Solution Building Block\n(SBB)\nWhich specific product\ndelivers it?"]
    ABB -->|"Realised by"| SBB

    style ABB fill:#4051b5,color:#fff,stroke:none
    style SBB fill:#2e7d32,color:#fff,stroke:none
```

---

## ABB Catalogue — Common Architecture Building Blocks

### Infrastructure & Platform

| ABB | Description | Common SBBs | Notes |
|---|---|---|---|
| **Identity Provider** | Authentication and identity federation | Okta, Azure AD, AWS Cognito, Keycloak | Use OIDC/SAML; avoid building custom |
| **API Gateway** | API routing, rate limiting, auth enforcement | Kong, AWS API Gateway, Azure APIM, Nginx | Gateway handles cross-cutting concerns |
| **Message Broker** | Async event and message routing | AWS SQS/SNS, Kafka, RabbitMQ, Azure Service Bus | See [ADR-002](../adrs/ADR-002-async-events.md) |
| **Service Registry / Discovery** | Service location and health tracking | AWS Cloud Map, Consul, Kubernetes DNS | Required if services scale dynamically |
| **Secret Store** | Secure storage and rotation of credentials | AWS Secrets Manager, HashiCorp Vault, Azure Key Vault | Never store secrets in code or env vars |
| **CDN** | Static asset and edge caching delivery | AWS CloudFront, Cloudflare, Fastly | Offloads origin; reduces latency |
| **Load Balancer** | Traffic distribution across compute instances | AWS ALB/NLB, GCP Cloud Load Balancing, Nginx | SSL termination here; never on app instance |
| **Container Orchestration** | Running and scaling containerised workloads | AWS ECS, Kubernetes (EKS/GKE/AKS), AWS Fargate | |
| **Object Storage** | Unstructured, scalable blob storage | AWS S3, Azure Blob, GCS | Data lake, static assets, backups |

### Data

| ABB | Description | Common SBBs | Notes |
|---|---|---|---|
| **Relational Database** | ACID-compliant structured data storage | PostgreSQL (RDS), MySQL (Aurora), SQL Server | Preferred for transactional domain data |
| **Document Store** | Schema-flexible document storage | MongoDB Atlas, AWS DynamoDB, Azure Cosmos DB | Use for flexible/hierarchical data |
| **Cache** | Low-latency in-memory data store | Redis (ElastiCache), Memcached, AWS DAX | Session, idempotency keys, query cache |
| **Search Engine** | Full-text and faceted search | OpenSearch (AWS), Elasticsearch, Typesense | |
| **Data Warehouse** | Analytical, read-optimised data store | AWS Redshift, Snowflake, BigQuery | For BI/analytics, not transactional |
| **Data Lake** | Raw, schema-on-read data at scale | AWS S3 + Glue, Azure Data Lake | Foundation for analytics platform |
| **Stream Processing** | Real-time event/data stream processing | AWS Kinesis, Apache Flink, Spark Streaming | |

### Security

| ABB | Description | Common SBBs | Notes |
|---|---|---|---|
| **Web Application Firewall** | HTTP traffic filtering and protection | AWS WAF, Cloudflare WAF, Azure WAF | Mandatory on all public endpoints |
| **Vulnerability Scanner** | CVE scanning for code and containers | Snyk, Trivy, Dependabot | In CI pipeline |
| **Certificate Manager** | TLS certificate provisioning and rotation | AWS ACM, Let's Encrypt + cert-manager | Automate rotation; no manual certs |
| **SIEM** | Security information and event management | Splunk, AWS Security Hub, Azure Sentinel | Centralised security log analysis |

### Observability

| ABB | Description | Common SBBs | Notes |
|---|---|---|---|
| **Metrics Collector** | Service and infra metrics aggregation | Prometheus, AWS CloudWatch, Datadog | RED + USE metrics |
| **Log Aggregator** | Centralised structured log collection | CloudWatch Logs, Datadog, Elastic Stack | Correlation ID in every log line |
| **Distributed Tracer** | End-to-end request tracing | OpenTelemetry + Jaeger/Zipkin, AWS X-Ray, Datadog APM | Instrument at service boundary |
| **Dashboard** | Visualisation of metrics and logs | Grafana, Datadog, CloudWatch dashboards | Per-service and per-domain |
| **Alerting** | Threshold-based and anomaly alerts | PagerDuty + CloudWatch, Datadog Monitors | SLO breach alert is mandatory |

---

## SBB Selection Criteria

When selecting an SBB to realise an ABB, score against:

| Criterion | Weight |
|---|---|
| Functional fit — does it fully realise the ABB? | 25% |
| Operational maturity (managed vs. self-hosted) | 20% |
| Security posture | 20% |
| Total cost of ownership | 15% |
| Team capability / learning curve | 10% |
| Vendor longevity / CNCF maturity | 10% |

See [Technology Evaluation Playbook](../playbooks/technology-evaluation.md) for the full evaluation process.

---

## Reuse Before Buy Before Build

TOGAF's recommended priority for building block realisation:

``` mermaid
flowchart TD
    A["Need: a Building Block"] --> B{Existing\nABB/SBB available\nin repository?}
    B -- Yes --> C["Reuse existing\nbuilding block"]
    B -- No --> D{Commercial\nproduct available?}
    D -- Yes --> E["Buy / adopt\ncommercial SBB"]
    D -- No --> F["Build custom\nbuilding block"]

    style C fill:#2e7d32,color:#fff,stroke:none
    style E fill:#4051b5,color:#fff,stroke:none
    style F fill:#e65100,color:#fff,stroke:none
```

**Implication:** Never build what you can buy. Never buy what you already have. Building custom should be reserved for genuine differentiated capability.

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part V, Chapter 40: Building Blocks
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap40.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap40.html)
