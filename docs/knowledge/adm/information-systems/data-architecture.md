# Phase C — Data Architecture

**TOGAF Reference:** Part II, Chapter 8, §8.3 (Data Architecture sub-phase)  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why Phase C Data matters to you:** As a developer you write ORM mappings and schema migrations every week. Data Architecture is that same concern lifted above the ORM — it defines the *logical* structure of data, who owns it, who may use it, and how it flows across the enterprise, independent of any specific database, ORM, or schema. The deliverable is not a schema file; it is the decisions about entity ownership, data sovereignty, classification, and the flows that make business processes work. When a compliance audit asks "where does customer PII go?", Phase C Data Architecture is what answers that question.

---

## Bloom Layer A — Quick Recall

**At a glance:** Phase C Data Architecture defines the structure of the enterprise's logical data assets — what data exists, who owns it, how it is classified, and how it flows.

| | |
|---|---|
| **Key output** | Data Architecture Definition Document — logical entity model, data domain ownership, classification register, data flows |
| **TOGAF Chapter** | Part II, Chapter 8 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html) |
| **Runs alongside** | Phase C Application Architecture — coupled; entity ownership is settled jointly |
| **Feeds into** | Phase D (Technology Architecture) — data platforms and storage choices; Phase E — data migration work packages |
| **Developer analogy** | The domain model above the ORM: the logical structure before you touch a schema, a migration file, or a database engine |

---

## Bloom Layer B — Conceptual Understanding

### How Data Architecture relates to Application and Technology

``` mermaid
flowchart TD
    B["Phase B — Business Architecture\n(value streams, business capabilities)"]
    CA["Phase C — Application Architecture\n(services, boundaries, interfaces)"]
    CD["Phase C — Data Architecture\n───────────────────────────────\nLogical entity model\nData domain ownership\nData classification register\nPII / compliance flows\nGap analysis"]
    D["Phase D — Technology Architecture\n(data platforms, storage, streaming)"]

    B --> CA
    B --> CD
    CA <--> CD
    CD --> D
    CA --> D

    style B fill:#37474f,color:#fff,stroke:none
    style CA fill:#4F46E5,color:#fff,stroke:none
    style CD fill:#2e7d32,color:#fff,stroke:none
    style D fill:#795548,color:#fff,stroke:none
```

> **Source:** TOGAF 10 Part II §8.1 — "Phase C is concerned with the development of the Information Systems Architecture, which describes how the enterprise's Information Systems will enable the Business Architecture." §8.2 clarifies that Application and Data sub-phases are co-equal and typically conducted in parallel or closely sequenced. The bidirectional arrow between Application and Data reflects §8.3 Step 6 (resolve impacts across Architecture Landscape).

**Data Architecture vs. Data Engineering:** Data Architecture is *what* data exists, who owns it, and how it is governed. Data Engineering is *how* pipelines move and transform it. Data Architecture must come before Data Engineering — you cannot build pipelines for entities whose ownership and flow are undefined.

**Developer analogy extended:** Phase C Data Architecture is your `schema.prisma` or Hibernate entity model — lifted to the enterprise level, with ownership, security classification, regulatory classification, and retention policy added for every entity. Then Phase D decides what database engine, streaming platform, and cloud storage actually runs each entity.

---

## Bloom Layer C — Guided Practice (Step-by-Step)

### TOGAF Phase C Data Architecture Step Sequence

The Data Architecture sub-phase follows the same 9-step pattern as Application Architecture (TOGAF 10 §8.3), applied to data entities and flows.

``` mermaid
flowchart TD
    S1["Step 1: Select reference models,\nviewpoints, and tools"] --> S2
    S2["Step 2: Develop Baseline Data\nArchitecture description"] --> S3
    S3["Step 3: Develop Target Data\nArchitecture description"] --> S4
    S4["Step 4: Perform Gap Analysis"] --> S5
    S5["Step 5: Define candidate Architecture\nRoadmap components (data)"] --> S6
    S6["Step 6: Resolve impacts across\nthe Architecture Landscape"] --> S7
    S7["Step 7: Conduct formal\nStakeholder Review"] --> S8
    S8["Step 8: Finalise Data\nArchitecture"] --> S9
    S9["Step 9: Create Architecture\nDefinition Document\n(Data chapter)"]

    style S1 fill:#37474f,color:#fff,stroke:none
    style S9 fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF Standard 10th Edition, Part II, Chapter 8, §8.3 — Phase C Data Architecture Steps (same sequence as Application sub-phase, applied to data). [pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html)

#### Risks when steps are skipped

| If you skip … | Downstream risk |
|---|---|
| Step 1 (reference models) | No common classification scheme; GDPR teams use different entity names to application teams |
| Step 2 (baseline) | Gap analysis understates data migration complexity; PII locations unknown |
| Step 3 (target) | Data platform choices made before target entity model is defined; expensive rework |
| Step 4 (gap analysis) | Data migration work packages underestimated; Phase F timeline wrong |
| Step 5 (roadmap components) | Data migration left out of Phase E work packages; appears as a surprise in Phase F |
| Step 6 (landscape impact) | Data entities shared across domains updated inconsistently by multiple applications |
| Step 7 (stakeholder review) | Data owners, GDPR DPO, and security team have not reviewed the target; sign-off fails at Phase G |
| Step 8 (finalise) | Data Architecture used by Phase D is provisional; technology choices may be wrong |
| Step 9 (ADD update) | Data chapter of ADD is missing; compliance audits cannot trace data flows |

---

### Technique 1 — Logical Entity Model

The entity model captures the logical data entities, their key attributes, and their relationships. This is not a physical schema — it represents the enterprise-level data model, independent of database technology.

``` mermaid
erDiagram
    CUSTOMER {
        string customer_id PK
        string name
        string email
        string phone
        string address
        string gdpr_consent_flag
        date   consent_date
    }
    ORDER {
        string order_id PK
        string customer_id FK
        date   order_date
        string status
        decimal total_amount
    }
    ORDER_LINE {
        string line_id PK
        string order_id FK
        string product_id FK
        int    quantity
        decimal unit_price
    }
    PRODUCT {
        string product_id PK
        string name
        string category
        decimal price
        int    stock_quantity
    }
    PAYMENT {
        string payment_id PK
        string order_id FK
        string method
        decimal amount
        string status
        string card_token
        string pci_scope_flag
    }

    CUSTOMER ||--o{ ORDER : "places"
    ORDER    ||--|{ ORDER_LINE : "contains"
    ORDER_LINE }|--|| PRODUCT : "references"
    ORDER    ||--o| PAYMENT : "paid by"
```

> **Source:** Entity model pattern based on TOGAF 10 Part II §8.3 (baseline data architecture description) and TOGAF 10 Part III §31 (data architecture artefacts). The ER notation follows ISO/IEC 11179 logical data modelling conventions. GDPR and PCI-DSS classification annotations are added per enterprise data governance requirements (see GDPR Article 30; PCI-DSS v4.0 Requirement 3.2).

---

### Technique 2 — Data Domain Ownership (Data Mesh Alignment)

Each data entity has a single authoritative owner. This table maps entities to their owning domain, applying Data Mesh ownership principles.

| Data Domain | Authoritative Entity/Entities | Owner System | Consumers | Classification |
|---|---|---|---|---|
| **Customer Domain** | CUSTOMER | CRM (Salesforce) | Order Management, Marketing, Analytics, Identity | PII — GDPR Article 9 |
| **Order Domain** | ORDER, ORDER_LINE | Order Management Service | Payment Service, Analytics, Fulfilment | Business Confidential |
| **Product Domain** | PRODUCT | Product Catalogue Service | Order Management, Mobile App, Customer Portal | Internal |
| **Payment Domain** | PAYMENT | Payment Service | Order Management, Finance, Fraud Detection | PCI-DSS Cardholder Data + PII |
| **Identity Domain** | AUTH_TOKEN, SESSION | Identity Provider (Keycloak) | All applications (auth) | Restricted |
| **Analytics Domain** | Derived aggregates | Analytics Platform | Business Intelligence, Reporting | Internal |

> **Source:** Data Mesh ownership principles from Zhamak Dehghani, *Data Mesh: Delivering Data-Driven Value at Scale* (O'Reilly, 2022) — "each domain is responsible for its own data products." Classification levels aligned with ISO/IEC 27001:2022 Annex A and GDPR Article 9. PCI-DSS classification from PCI-DSS v4.0 Requirement 3 (Protect Stored Account Data).

---

### Technique 3 — Data Classification Register

Every data entity and its key attributes must be classified for sensitivity, regulatory scope, and retention.

| Classification Level | Definition | Handling requirements | Examples |
|---|---|---|---|
| **Restricted** | Highest sensitivity; breach is material harm | Encryption at rest and in transit; strict access control; no logging of content | Authentication credentials; session tokens; private keys |
| **PII / Personal Data** | Data that identifies a natural person (GDPR Article 4(1)) | Consent management; GDPR DSR support; retention limits; DPO notification on breach | Customer name, email, address, phone, payment card |
| **Confidential / Business** | Commercial-in-confidence; internal strategy or operations | Internal-only; access-controlled; no external sharing without approval | Order values, pricing strategies, sales figures |
| **Internal** | Non-sensitive internal data | Internal access; not for public release | Product names, category codes, stock levels |
| **Public** | Safe to publish externally | No special handling required | Public pricing, public product catalogue |

**Regulatory scope map:**

| Regulation | Relevant entities | Key requirement | Reference |
|---|---|---|---|
| **GDPR** | CUSTOMER (all PII fields) | Consent; DSR support; Article 30 records; 72-hr breach notification | GDPR Articles 5, 7, 12–23, 30, 33 |
| **PCI-DSS v4.0** | PAYMENT (card_token, PCI_scope_flag) | Encrypt stored data; tokenise PANs; restrict access; log all access | PCI-DSS v4.0 Requirements 3, 7, 10 |
| **Data Retention** | All entities | Define and enforce retention periods per entity class | ISO 15489 (Records Management); GDPR Article 5(1)(e) |

---

### Technique 4 — PII Data Flow (GDPR Article 30)

Understanding where PII flows across applications is required for GDPR Article 30 records of processing activities.

``` mermaid
flowchart LR
    CustPortal["Customer Portal\n(PII collected at registration)"]
    CRM["CRM (Salesforce)\n[PII master — Customer Domain]"]
    OMS["Order Management Service\n[uses Customer ID only —\nnot PII fields]"]
    Pay["Payment Service\n[PII: name, address for PCI;\ncard token — no PAN stored]"]
    Analytics["Analytics Platform\n[pseudonymised / aggregated only —\nno direct PII]"]
    DWH["Data Warehouse\n[historical — PII masked before load]"]

    CustPortal -->|"PII (name, email, address)"| CRM
    CRM -->|"Customer ID\n(reference only)"| OMS
    CustPortal -->|"Payment initiation"| Pay
    Pay -->|"Card token (no PAN)"| OMS
    OMS -->|"Aggregated order data\n(no PII)"| Analytics
    CRM -->|"PII masked on export"| DWH

    style CRM fill:#4F46E5,color:#fff,stroke:none
    style Pay fill:#c0392b,color:#fff,stroke:none
    style Analytics fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** PII flow diagram pattern follows GDPR Article 30 records of processing activities requirements. Tokenisation flow aligns with PCI-DSS v4.0 Requirement 3.5 (Primary Account Number must be secured). Pseudonymisation approach in analytics aligns with GDPR Recital 26 and Article 89.

**GDPR Article 30 compliance checklist:**

- [ ] All personal data processing activities documented (which entities, which systems)
- [ ] Lawful basis for processing identified (consent, legitimate interest, contract, etc.)
- [ ] Data subjects' rights supported (access, rectification, erasure, portability) per GDPR Articles 15–20
- [ ] Retention periods defined and enforced per GDPR Article 5(1)(e)
- [ ] Third-party processors identified (Salesforce CRM, payment processors)
- [ ] Breach notification process defined: 72 hours to supervisory authority (GDPR Article 33)
- [ ] DPO notified and named if required (GDPR Article 37)

---

### Technique 5 — Gap Analysis

| Data Area | Baseline State | Target State | Gap | Roadmap Item |
|---|---|---|---|---|
| PII governance | PII scattered across monolith, CRM, Data Warehouse; no consolidated register | Centralised GDPR Article 30 register; PII only in CRM (master) | Article 30 register must be created; PII in non-CRM systems must be assessed for removal | GDPR Article 30 Compliance — Q1 2026 |
| Payment data | Card data partially stored in legacy payment module (no tokenisation) | Full PCI-DSS v4.0 compliance; card token only; no PAN at rest | Remove PAN from legacy storage; implement tokenisation | PCI-DSS Remediation — Q2 2026 |
| Analytics pseudonymisation | Raw PII exported to Data Warehouse | Pseudonymised aggregates only; no direct PII in analytics | Implement masking pipeline; validate no PII in analytics layers | Analytics Data Masking — Q3 2026 |
| Data ownership | No formal domain ownership; data shared informally | Data Mesh domains; each domain owns its data product | Assign data stewards per domain; formalise in data governance framework | Data Domain Ownership — Q2 2026 |

---

### Technique 6 — Data Ownership Dispute Resolution

When two applications both claim ownership of the same entity, apply this decision framework:

| Criterion | Gives ownership to … |
|---|---|
| **Who creates the entity?** | The system of creation has primary claim |
| **Who is the authoritative source (golden record)?** | The system whose version is used when there is a conflict |
| **Who has the broadest view?** | Cross-domain entity → shared with explicit ownership contract |
| **Regulatory accountability** | The system named in Article 30 records is the data controller of record |
| **Operational dependency** | If one system cannot function without the other's entity, the upstream is the owner |

> **Tiebreaker rule:** When all criteria are equal, ownership follows the business capability — the application that is the primary system for the business capability that defines the entity's lifecycle owns the entity.

---

## Bloom Layer D — Tools

### Data Architecture Tools

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **dbt (data build tool)** | Data transformation, lineage, and documentation | Lineage; tests; versioned SQL; model documentation | Focuses on transformation, not architecture design | Free (OSS); dbt Cloud from $100/mo | [getdbt.com](https://www.getdbt.com) |
| **Apache Atlas** | Data governance: classification, lineage, search | Open-source; GDPR classification; integrates with Hive, HBase, Kafka | Complex setup; heavyweight; Hadoop-centric | Free (OSS) | [atlas.apache.org](https://atlas.apache.org) |
| **Collibra** | Enterprise data governance: ownership, lineage, policies | Full data governance; business glossary; policy enforcement | Enterprise pricing; complex | Enterprise ($$$$) | [collibra.com](https://www.collibra.com) |
| **Alation** | Data catalogue: classification, stewardship, discovery | Strong search; collaboration; business user-friendly | Expensive; not a full architecture tool | Enterprise ($$$) | [alation.com](https://www.alation.com) |
| **Amundsen (Lyft OSS)** | Data discovery and metadata management | Open-source; integrates with major data platforms; developer-friendly | Less governance features; community-maintained | Free (OSS) | [amundsen.io](https://www.amundsen.io) |
| **Mermaid ER diagrams** | Lightweight logical entity modelling in Markdown | Git-embeddable; developer-friendly; no tool cost | No physical schema generation; limited notation | Free (OSS) | [mermaid.js.org](https://mermaid.js.org) |

### Data Standards

| Standard / Regulation | Purpose in Data Architecture | Link |
|---|---|---|
| **GDPR (EU) 2016/679** | PII definition, consent, DSR rights, Article 30, breach notification | [gdpr.eu](https://gdpr.eu) |
| **PCI-DSS v4.0** | Cardholder data protection, tokenisation, access control | [pcisecuritystandards.org](https://www.pcisecuritystandards.org/document_library) |
| **ISO/IEC 27001:2022** | Information security management — data classification and controls | [iso.org/standard/27001](https://www.iso.org/standard/27001) |
| **ISO 25010:2023** | Data quality characteristics (accuracy, completeness, consistency, timeliness) | [iso.org/standard/35733](https://www.iso.org/standard/35733.html) |
| **DAMA DMBOK 2nd Ed.** | Data Management Body of Knowledge — architecture, governance, quality | [dama.org](https://www.dama.org/cpages/body-of-knowledge) |

---

## Bloom Layer E — Decision Frameworks

| Architecture decision | Lean towards when | Lean away when | Risk if wrong |
|---|---|---|---|
| **Data Mesh vs. centralised data warehouse** | Mesh: many domains; domain teams capable; scalability matters | Centralised: small organisation; data volume low; team lacks domain-level data skills | Mesh without domain data maturity → inconsistent data products; central without scale → bottleneck |
| **Event streaming vs. batch for data movement** | Streaming: real-time decisions needed; loose coupling; high event volume | Batch: low volume; simple ETL; latency acceptable | Batch everywhere: stale data in real-time flows; streaming everywhere: operational complexity without business need |
| **Pseudonymisation vs. full anonymisation** | Pseudonymisation: re-identification needed for operations (e.g., fraud review) | Full anonymisation: analytics where individual re-identification is never needed | Pseudonymised data still counts as personal data under GDPR; full anonymisation that isn't truly anonymous: GDPR violation |
| **Shared entity vs. domain copy** | Domain copy: performance; independence; tolerable eventual consistency | Shared: strong consistency required; entity is updated in real time | Shared without ownership: update conflicts and data quality problems; domain copy without sync: divergent records |
| **Data at rest encryption: field-level vs. disk-level** | Field-level: highest sensitivity (PAN, biometric, health); regulatory requirement | Disk-level: sufficient for most data; field-level adds query complexity | Disk-level for PAN: PCI-DSS non-compliance; field-level everywhere: query performance impact |

---

## Bloom Layer E — Judgment & Trade-offs

| Question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Strict domain ownership vs. shared entity** | Strict ownership: most situations; reduces coupling; enables Data Mesh | Shared: when the entity genuinely spans domains (customer-order boundary) and consistency is critical | Strict ownership of genuinely cross-domain entities → duplicate records with divergent values |
| **GDPR: consent vs. legitimate interest** | Consent: highest trust; explicit; revocable | Legitimate interest: when processing is genuinely necessary and not over-ridden by data subject's interests | Wrong basis: ICO enforcement; can't rely on legitimate interest for direct marketing targeting |
| **Data quality enforcement: at source vs. at consumer** | At source: always prefer; errors cheapest to fix where introduced | At consumer: when source cannot be changed (legacy system) | Source enforcement gaps → quality debt compounds; consumer-only enforcement → inconsistent quality across consumers |
| **Retain historical data vs. enforce retention** | Historical: regulatory requirement; fraud audit trail | Retention enforcement: GDPR Article 5(1)(e) storage limitation | Keep everything: GDPR Article 5 violation; delete too early: audit trail gaps, operational recovery failure |
| **Data catalogue: active vs. passive** | Active: automated discovery + lineage from live systems | Passive: manually documented | Passive catalogue: out of date within weeks; active without governance process: noisy metadata without policy |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** A healthcare insurer (1,500 employees, 3 data centres, GDPR applicable, FCA regulated) is migrating from an on-premises data warehouse to a cloud data platform. Their data includes: member health claims, provider invoices, premium payments, and member PII. The DPO has flagged that the current estate has no documented Article 30 records. The CTO wants the cloud platform live in 12 months.

1. **Recall:** Name the 5 entities in the logical entity model for this scenario (adapt from the retail model) and state the classification level for each (Restricted / PII / Confidential / Internal / Public).
2. **Comprehension:** Explain why GDPR Article 30 records of processing activities are an architecture output, not just a legal/compliance document — and why the CTO cannot approve the cloud platform go-live without them.
3. **Application:** Draw a PII flow diagram (in Mermaid or prose) for this insurer. Include: member portal (PII collection), CRM (master), claims processing, payment processing, analytics platform. Mark which flows carry PII, which carry pseudonymised data, and which carry no personal data.
4. **Analysis:** The cloud platform vendor proposes storing raw health claims (including diagnoses) in a shared analytics environment alongside non-health commercial data. Analyse the data classification and regulatory implications. What controls are required if this is approved?
5. **Evaluation:** The data team proposes a Data Mesh model with 4 data domains (Member, Claims, Provider, Payment). The DPO argues that GDPR data subject requests (access, erasure) are harder to fulfil across 4 domain-owned data products than a centralised store. Evaluate the trade-off and recommend an approach.
6. **Synthesis:** Produce a one-page Data Architecture Decision Record for "Health Claims Data in Cloud Analytics Platform." Include: context, decision, rationale (data classification, GDPR implications, PCI-DSS if applicable), consequences, and three explicit constraints that must be enforced in Phase D (technology choices) and Phase G (compliance review).

> Data Architecture is not about what your database schema looks like. It is about who owns what, who may see what, where it goes, and what happens when regulators ask. Those decisions made in Phase C determine whether your Phase D technology choices actually solve the business problem — or create a compliance liability.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Logical entity model** | "Generate a logical entity model for a [industry] organisation with these business capabilities: [list]. Use Mermaid ER diagram syntax. Include: entity names, key attributes (logical, not physical), and relationships with cardinality." | Physical schema details (data types, indexes) in a logical model; AI does not know your real entities |
| **GDPR Article 30 register** | "Generate a GDPR Article 30 records of processing activities table for these entities: [list]. Columns: Entity, Lawful Basis, Purpose, Retention Period, Third-Party Processors, Data Subject Rights in scope." | May invent lawful bases that are not valid for your processing; always review with DPO |
| **Data domain ownership** | "Given these applications [list] and these data entities [list], assign each entity to a single owning domain using Data Mesh principles. Justify each assignment." | Over-confident assignments; data mesh is a design exercise that requires organisational context |
| **Classification register** | "Given these data entities: [list]. Classify each as Restricted, PII, Confidential, Internal, or Public. For PII entities, identify the GDPR Article 4 basis and applicable PCI-DSS requirements if any." | May misclassify health data (GDPR Article 9 special category) as standard PII |
| **Gap analysis** | "Given this baseline data estate [describe] and these target principles (GDPR-compliant, PCI-DSS, Data Mesh), produce a data architecture gap analysis table." | Generic gaps; AI cannot assess your actual regulatory exposure or consent management status |

!!! warning "Bias to watch"
    LLMs may conflate GDPR lawful bases (consent, legitimate interest, contract, legal obligation) and recommend incorrect bases for specific processing activities. Health and financial data have additional regulatory overlays (GDPR Article 9 for special categories, FCA SYSC for financial services, HIPAA for US healthcare) that require specialist review — AI outputs on regulatory classification must always be validated with your DPO and legal team.

---

## Common Mistakes

!!! danger "Skipping the PII flow diagram"
    Without a documented PII flow, Article 30 compliance cannot be demonstrated and GDPR Data Subject Requests cannot be fulfilled reliably. This is not a nice-to-have — it is a regulatory requirement that creates significant liability if absent.

!!! failure "Conflating logical and physical data models"
    Phase C Data Architecture produces a *logical* model — independent of database technology, schema, or ORM. Jumping to physical schemas (tables, columns, indexes) in Phase C short-circuits Phase D and couples architecture decisions to implementation details before the technology baseline is confirmed.

!!! warning "Multiple owners for a single entity"
    When two systems both claim to be the authoritative source for an entity, you have a data governance problem, not a technology problem. Resolving this is Phase C work — no amount of Phase D technology will fix undefined entity ownership.

!!! tip "Run Application and Data Architecture in parallel"
    The most common sequencing mistake is finishing Application Architecture, handing off a stable boundary diagram, and then starting Data Architecture. The boundary between applications is the boundary between data domains — this decision must be made jointly.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 8 | Primary standard | Authoritative Phase C Data Architecture steps and artefacts | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html) |
| GDPR (EU) 2016/679 | Regulation | PII definition, Article 30 records, DSR rights, breach notification | [gdpr-info.eu](https://gdpr-info.eu) |
| PCI-DSS v4.0 | Standard | Cardholder data protection, tokenisation, access control Requirements 3, 7, 10 | [pcisecuritystandards.org](https://www.pcisecuritystandards.org/document_library) |
| Data Mesh (Dehghani — 2022) | Book | Domain ownership, data products, federated governance | [oreilly.com](https://www.oreilly.com/library/view/data-mesh/9781492092384/) |
| DAMA DMBOK 2nd Ed. | Reference | Data management knowledge areas: architecture, governance, quality, security | [dama.org/cpages/body-of-knowledge](https://www.dama.org/cpages/body-of-knowledge) |
| Fundamentals of Data Engineering (Reis & Housley — 2022) | Book | Data lifecycle, storage, pipelines, serving — technology-architecture context | [oreilly.com](https://www.oreilly.com/library/view/fundamentals-of-data/9781098108298/) |
| ISO 25010:2023 | Standard | Data quality characteristics (accuracy, completeness, consistency, timeliness) | [iso.org/standard/35733](https://www.iso.org/standard/35733.html) |
| ISO/IEC 27001:2022 | Standard | Information security management — data classification, Annex A controls | [iso.org/standard/27001](https://www.iso.org/standard/27001) |
