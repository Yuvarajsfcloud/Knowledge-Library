# Phase C — Information Systems Architecture

**TOGAF Reference:** Part II, Chapter 8 — Phase C  
**Objective:** Develop the Target Data Architecture and Application Architecture, describing how these information systems domains will support the Target Business Architecture.

> Phase C covers two sub-phases, typically developed in parallel or in sequence depending on context: **Data Architecture** and **Application Architecture**.

---

## Objectives

1. Develop the Target **Data Architecture** — describe the structure of the organisation's logical and physical data assets and data management resources.
2. Develop the Target **Application Architecture** — provide a blueprint for the individual application systems to be deployed, their interactions, and their relationships to the core business processes.
3. Identify candidate Architecture Roadmap components from gaps.

---

## Process Flow

``` mermaid
flowchart TD
    A["Select Reference Models,\nViewpoints & Tools"] --> B & C

    subgraph Data["Data Architecture"]
        B["Baseline Data\nArchitecture"] --> D["Target Data\nArchitecture"] --> F["Data Gap Analysis"]
    end

    subgraph App["Application Architecture"]
        C["Baseline Application\nArchitecture"] --> E["Target Application\nArchitecture"] --> G["Application Gap Analysis"]
    end

    F --> H
    G --> H
    H["Define Candidate\nRoadmap Components"] --> I
    I["Resolve Impacts Across\nArchitecture Landscape"] --> J
    J["Conduct Formal\nStakeholder Review"] --> K["Phase C Complete ✓\nEnter Phase D"]

    style A fill:#37474f,color:#fff,stroke:none
    style K fill:#2e7d32,color:#fff,stroke:none
```

---

## Part 1 — Data Architecture

### Inputs

| Input | Source |
|---|---|
| Business Architecture (Phase B) | Phase B output |
| Existing data models and data dictionaries | Architecture Repository / DBA |
| Data governance framework | Data governance / CDO office |
| Regulatory data requirements (GDPR, etc.) | Legal / Compliance |

---

### Data Architecture Techniques

#### 1. Conceptual Data Model

Define major data entities, their relationships, and which business capability they belong to. Not a physical schema — a communication tool.

``` mermaid
erDiagram
    CUSTOMER {
        uuid customer_id PK
        string email
        string name
        date created_at
    }
    ORDER {
        uuid order_id PK
        uuid customer_id FK
        string status
        decimal total_amount
        timestamp placed_at
    }
    ORDER_LINE {
        uuid line_id PK
        uuid order_id FK
        uuid product_id FK
        int quantity
        decimal unit_price
    }
    PRODUCT {
        uuid product_id PK
        string sku
        string name
        decimal price
        int stock_quantity
    }
    PAYMENT {
        uuid payment_id PK
        uuid order_id FK
        string provider
        string status
        decimal amount
        timestamp authorised_at
    }

    CUSTOMER ||--o{ ORDER : "places"
    ORDER ||--|{ ORDER_LINE : "contains"
    ORDER_LINE }o--|| PRODUCT : "references"
    ORDER ||--|| PAYMENT : "settled by"
```

---

#### 2. Data Domain Ownership (Data Mesh pattern)

Align data ownership with business domains:

| Data Domain | Owner Squad | Golden Record? | Consumers |
|---|---|---|---|
| Customer | CX Squad | Yes | Orders, Notifications, Analytics |
| Product Catalogue | Product Squad | Yes | Orders, Inventory, Search |
| Orders | Orders Squad | Yes | Payments, Fulfilment, Analytics |
| Inventory | Fulfilment Squad | Yes | Orders, Product Catalogue |
| Payments | Finance Squad | Yes | Orders, Finance Reporting |
| Analytics / Events | Data Platform | No (derived) | Reporting dashboards |

---

#### 3. Data Classification

| Classification | Description | Example Data | Controls Required |
|---|---|---|---|
| **Public** | No harm if disclosed | Product catalogue, public pricing | None |
| **Internal** | Intended for employees only | Internal metrics, org charts | Access controls |
| **Confidential** | Could harm the business if disclosed | Business plans, contracts | Encryption, access review |
| **Restricted** | Personal or regulated data | PII, payment card data, health | GDPR controls, encryption at rest & transit, audit log |

---

#### 4. Data Flow Diagram (PII)

Document all flows involving Restricted data. Required for GDPR Article 30 Record of Processing Activities.

``` mermaid
flowchart LR
    U([Customer\nBrowser]) -->|HTTPS — PII: name, email, address| API[API Gateway]
    API -->|Authenticated, encrypted| OS[Order Service]
    OS -->|Stored encrypted at rest| DB[(Order DB\nPostgres — EU-West-1)]
    OS -->|Event: OrderPlaced\nPII: customer_id, email| BUS[SNS Topic]
    BUS -->|Subscribes| NS[Notification Service]
    NS -->|email only| SES[AWS SES]
    SES -->|SMTP| U

    style DB fill:#c62828,color:#fff,stroke:none
    style U fill:#4051b5,color:#fff,stroke:none
```

**Key controls for PII flows:**
- [ ] TLS 1.2+ on all data in transit
- [ ] Encryption at rest (AES-256) for all Restricted data stores
- [ ] PII never in logs (log sanitisation)
- [ ] Access to PII stores: role-based, audited, least privilege
- [ ] GDPR retention periods defined and enforced for each data entity

---

#### 5. Data Architecture Gap Analysis

| Data Entity / Store | Baseline | Target | Gap | Action |
|---|---|---|---|---|
| Customer data | Stored in monolith Oracle DB | Owned by CX domain; PostgreSQL; API-accessible | Extract; define data contract | Phase E |
| Product data | Shared Oracle schema | Product catalogue service; event-sourced | Design event schema; migrate | Phase E |
| Analytics | Batch SQL export nightly | Streaming to data lake (S3) | Build streaming pipeline | New initiative |
| PII retention | No automated deletion | Automated deletion at retention period | Implement TTL / scheduled job | Phase E/G |

---

## Part 2 — Application Architecture

### Application Portfolio

Catalogue all applications in scope — baseline and planned:

| Application | Type | Business Capability | Status | Technology | Owner |
|---|---|---|---|---|---|
| Monolith Platform | Legacy | All | To be decomposed | Java 8, Oracle | Platform Squad |
| API Gateway | Infrastructure | Routing, Auth, Rate-limiting | Target | Kong | Platform Squad |
| Order Service | Domain service | Order Management | To build | Java 21, Spring Boot 3 | Orders Squad |
| Inventory Service | Domain service | Inventory Management | To build | Go 1.22 | Fulfilment Squad |
| Notification Service | Domain service | Customer Notifications | To build | Node.js 20 | CX Squad |
| Product Catalogue | Domain service | Product Management | To build | Python / FastAPI | Product Squad |
| Customer SPA | Front-end | All customer-facing | To modernise | React 18 | CX Squad |
| Analytics Platform | Platform | Analytics & Reporting | Target | Redshift + dbt | Data Platform |

---

### Application Interaction Diagram (C4 L2)

Use the [C4 Container Diagram from Phase 2 Design](../phases/02-design.md#3-c4-model-diagrams) as the target state.

For TOGAF-style, use ArchiMate Application Collaboration notation. See [ArchiMate Reference](../archimate/index.md).

---

### Application Architecture — Integration Catalogue

| Integration | Producer | Consumer | Pattern | Protocol | Data Exchanged |
|---|---|---|---|---|---|
| Order → Payment | Order Service | Payment Service | Sync REST | HTTPS | Order total, customer token |
| Order → Inventory | Order Service | Inventory Service | Async Event | SNS/SQS | OrderPlaced event |
| Order → Notification | Order Service | Notification Service | Async Event | SNS/SQS | OrderPlaced, OrderFulfilled |
| User Auth | API Gateway | Okta | Sync | OIDC / JWT | Access token validation |
| Product → Order | Product Catalogue | Order Service | Sync REST | HTTPS | Product price, availability |

---

### Application Gap Analysis

| Application | Baseline | Target | Gap | Action |
|---|---|---|---|---|
| Authentication | Custom session auth in monolith | Okta OIDC SSO | Integrate Okta; remove legacy auth | Phase E |
| Order processing | Monolith module | Independent Order Service | Extract; define event contracts | Phase E |
| Front-end | Server-rendered JSP | React SPA | Rewrite (or incremental migration) | Phase E/F |
| Analytics | Manual BI reports | Self-service dashboards | Data platform initiative | Separate programme |

---

## Output Artifacts (Phase C Exit Criteria)

- [ ] Conceptual Data Model — complete for in-scope entities
- [ ] Data Domain Ownership table — agreed with data owners
- [ ] Data Classification register — complete for all data entities in scope
- [ ] PII Data Flow Diagram — complete; reviewed by privacy/legal
- [ ] Data Architecture Gap Analysis — complete
- [ ] Application Portfolio — complete and current
- [ ] Application Interaction Catalogue — complete
- [ ] Application Architecture Gap Analysis — complete
- [ ] Architecture Definition Document (Data + Application) — drafted
- [ ] Candidate Architecture Roadmap components — identified
- [ ] Architecture Repository updated

---

## Common Mistakes

!!! failure "Data architecture as a database design exercise"
    TOGAF Phase C data architecture is conceptual and domain-level. It is not about table design. Conflating the two leads to premature physical design decisions before logical ownership is agreed.

!!! warning "Application catalogue without ownership"
    An application catalogue with no named owner is not actionable. Every application needs a squad or team accountable for it.

!!! tip "Data mesh for distributed architectures"
    For microservices or distributed contexts, the Data Mesh pattern (Zhamak Dehghani) aligns naturally with TOGAF Phase C — treat data as a product, owned by the domain that produces it. See: [martinfowler.com/articles/data-mesh-principles](https://martinfowler.com/articles/data-mesh-principles.html)

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part II, Chapter 8: Phase C
- Data Architecture sub-phase: Section 8.3–8.5
- Application Architecture sub-phase: Section 8.6–8.8
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html)
