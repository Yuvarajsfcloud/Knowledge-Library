# Phase C — Application Architecture

**TOGAF Reference:** Part II, Chapter 8, §8.3 (Application Architecture sub-phase)  
**Bloom level:** Recall → Comprehension → Application → Analysis → Evaluation → Synthesis  
**Audience:** Architecture practitioners; senior developers transitioning to solution architecture

> **From developer to solution architect — why Phase C Application matters to you:** As a senior developer you already think about service boundaries, API contracts, and team ownership of microservices. Phase C Application Architecture is that same thinking formalised at programme scale — across all services, all teams, and across the gap between today's estate and tomorrow's target. The deliverable is not a diagram of how you will code things; it is the decisions about what services exist, what they own, what interfaces they expose, and how they align to the business capabilities that fund them.

---

## Bloom Layer A — Quick Recall

**At a glance:** Phase C Application Architecture describes the logical software components, their responsibilities, their interfaces, and the gaps between the current application estate and the target.

| | |
|---|---|
| **Key output** | Application Architecture Definition Document — describes baseline, target, gap analysis, and candidate roadmap |
| **TOGAF Chapter** | Part II, Chapter 8 — [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html) |
| **Runs after** | Phase B (Business Architecture) — application architecture must trace to business capabilities |
| **Runs alongside** | Phase C Data Architecture (same TOGAF chapter; closely coupled) |
| **Feeds into** | Phase D (Technology Architecture) — apps sit on tech; Phase E (Opportunities & Solutions) — gaps become work packages |
| **Developer analogy** | Designing the service mesh: what services exist, what they own, what APIs they expose, what they depend on — before writing the first line of code |

---

## Bloom Layer B — Conceptual Understanding

### The Application Architecture pyramid

``` mermaid
flowchart TD
    Biz["Phase B — Business Capabilities\n& Value Streams"] --> App
    App["Phase C Application Architecture\n─────────────────────────────\nApplication Portfolio\nIntegration Catalogue\nGap Analysis\nCandidate Roadmap"] --> Data
    App --> Tech["Phase D — Technology Architecture\n(Infrastructure, Cloud, Platforms)"]
    Data["Phase C Data Architecture\n(Data entities, ownership, flows)"]

    style Biz fill:#37474f,color:#fff,stroke:none
    style App fill:#4F46E5,color:#fff,stroke:none
    style Data fill:#2e7d32,color:#fff,stroke:none
    style Tech fill:#795548,color:#fff,stroke:none
```

> **Source:** TOGAF 10 Part II §8.1 — Phase C objectives and scope. Application and Data sub-phases are described as peer activities in §8.2. The traceability from Business Architecture (Phase B) to Application Architecture is defined in TOGAF 10 §8.3 Step 1.

**Application Architecture is not system design.** It answers:
- What application components exist (baseline) and should exist (target)?
- Which business capabilities does each application support?
- What interfaces exist between applications, and what should change?
- What is the gap, and what does closing it require?

**Developer analogy extended:** Phase B gave you the domain model in business language (Customer, Order, Payment). Phase C maps those domains to application components (Customer Service, Order Management Service, Payment Gateway) and specifies their contracts. Phase D decides what those components run on. Phase C is the architecture, not the design — it does not prescribe implementation technology.

---

## Bloom Layer C — Guided Practice (Step-by-Step)

### TOGAF Phase C Application Architecture Step Sequence

Defined in **TOGAF 10 Part II, Chapter 8, §8.3** — the 9-step sequence for Application Architecture.

``` mermaid
flowchart TD
    S1["Step 1: Select reference models,\nviewpoints, and tools"] --> S2
    S2["Step 2: Develop Baseline Application\nArchitecture description"] --> S3
    S3["Step 3: Develop Target Application\nArchitecture description"] --> S4
    S4["Step 4: Perform Gap Analysis"] --> S5
    S5["Step 5: Define candidate Architecture\nRoadmap components"] --> S6
    S6["Step 6: Resolve impacts across\nthe Architecture Landscape"] --> S7
    S7["Step 7: Conduct formal\nStakeholder Review"] --> S8
    S8["Step 8: Finalise Application\nArchitecture"] --> S9
    S9["Step 9: Create Architecture\nDefinition Document\n(Application chapter)"]

    style S1 fill:#37474f,color:#fff,stroke:none
    style S9 fill:#2e7d32,color:#fff,stroke:none
```

> **Source:** TOGAF Standard 10th Edition, Part II, Chapter 8, §8.3 — Phase C Application Architecture Steps 1–9. [pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html)

#### Risks when steps are skipped

| If you skip … | Downstream risk |
|---|---|
| Step 1 (reference models) | No common language; different teams draw application diagrams incompatibly |
| Step 2 (baseline) | Gap analysis is speculative; integration impact is underestimated in every estimate |
| Step 3 (target) | Roadmap has no destination; work packages have no target to converge on |
| Step 4 (gap analysis) | Phase E work packages lack grounding; teams build things that already exist |
| Step 5 (candidate roadmap) | Phase E has no starting point; transition architectures cannot be defined |
| Step 6 (landscape impact) | Shared components modified without knowing cross-domain effects |
| Step 7 (stakeholder review) | Target architecture not bought-in; rejected at Phase E when investment is already committed |
| Step 8 (finalise) | Architecture remains informal; Phase D has no stable input |
| Step 9 (ADD update) | Application chapter of ADD is missing; Phase D must guess what it is running |

---

### Technique 1 — Capability-to-Application Mapping

Map each business capability (from Phase B) to the applications that support it. This reveals coverage gaps and duplication.

| Business Capability | Current Application | Gaps / Problems | Target Application |
|---|---|---|---|
| Customer Onboarding | Legacy CRM (v2.3, on-prem) | No API; manual data entry; no audit trail | Customer Service (cloud-native SaaS) |
| Order Management | Monolith ORDER_SVC | Tight coupling to payment; deploy-time conflicts | Order Management Service (decoupled) |
| Inventory Tracking | Excel + manual import | No real-time; no API; error-prone | Inventory Service (event-driven) |
| Payment Processing | Legacy payment gateway (in monolith) | PCI-DSS risk; no tokenisation; hard to change | Payment Service (PCI-compliant, tokenised) |
| Loyalty & Rewards | None | Gap — no application supports this capability | Loyalty Platform (new build or SaaS) |
| Reporting & Analytics | Data warehouse + Excel | Batch only; 24-hour lag; no self-service | Analytics Platform (near-real-time, self-service) |

---

### Technique 2 — Application Portfolio

Full catalogue of applications, their status, and strategic disposition.

| App ID | Application | Business Capability | Technology | Hosting | Status | Disposition |
|---|---|---|---|---|---|---|
| APP-001 | Customer Portal | Customer Self-Service | React + Node.js | AWS ECS | Active | Evolve |
| APP-002 | Order Management Service | Order Processing | Java Spring Boot | AWS ECS | Active | Evolve |
| APP-003 | Legacy ERP | Finance, HR, Procurement | SAP ECC 6.0 | On-prem | End-of-life 2026 | Replace |
| APP-004 | Payment Gateway | Payment Processing | .NET Framework 4.5 | On-prem | Active | Replace (retire) |
| APP-005 | CRM | Customer Data | Salesforce | SaaS | Active | Retain |
| APP-006 | Data Warehouse | Reporting | SQL Server 2016 | On-prem | Active | Consolidate → Analytics Platform |
| APP-007 | Mobile App (iOS/Android) | Customer Self-Service | React Native | App Stores | Active | Evolve |
| APP-008 | Identity Provider | Authentication / Authorisation | Keycloak 20 | AWS EKS | Active | Evolve |

**7R Disposition Model** (from Phase E, used here at application level):

| Disposition | Meaning |
|---|---|
| **Retain** | Keep as-is; no change planned |
| **Evolve** | Enhance in place; no full replacement |
| **Replace** | Retire and replace with new system |
| **Retire** | Decommission; functionality not replaced or migrated |
| **Consolidate** | Merge with another application |
| **Re-host** | Lift-and-shift to new hosting (same code) |
| **Re-platform** | Move with limited changes (e.g., managed DB) |

---

### Technique 3 — Integration Catalogue

Document all integration interfaces between applications — this is the most critical input to Phase D and Phase E.

| Interface ID | Source | Target | Protocol | Data | Frequency | Status | Phase E action |
|---|---|---|---|---|---|---|---|
| INT-001 | Order Management | Payment Gateway | REST over HTTPS | Order amount, card token | Synchronous | Active | Replace with async event when payment re-platform |
| INT-002 | Customer Portal | CRM (Salesforce) | Salesforce API | Customer profile, contact | Real-time | Active | Retain; add API gateway for rate limiting |
| INT-003 | Legacy ERP | Data Warehouse | SFTP batch export | Finance, HR data | Nightly | Active | Replace with event stream when ERP migrated |
| INT-004 | Mobile App | Order Management | REST over HTTPS | Order create/query | Real-time | Active | Retain; version API before any OMS changes |
| INT-005 | Identity Provider | All applications | OIDC / OAuth 2.0 | Auth tokens | Synchronous | Active | Evolve to fine-grained authorisation (ABAC) |

---

### Technique 4 — Gap Analysis

| Application / Area | Baseline State | Target State | Gap | Roadmap Item |
|---|---|---|---|---|
| Payment Processing | Embedded in monolith; no tokenisation; PCI risk | Independent PCI-DSS-compliant Payment Service | Extract + replace; tokenisation layer | PCI-DSS Remediation — Q2 2026 |
| Loyalty Platform | No application; manual email campaigns | Dedicated Loyalty Platform with real-time points | New build or SaaS procurement | Loyalty Platform — Q3 2026 |
| Analytics | Batch data warehouse; 24h lag | Near-real-time analytics; self-service | Data warehouse to streaming platform migration | Analytics Modernisation — Q4 2026 |
| Legacy ERP | On-prem SAP ECC 6.0; end-of-life 2026 | Cloud ERP or domain decomposition | Full programme; 18 months minimum | ERP Migration Programme — 2026–2027 |

---

### Technique 5 — Build vs. Buy Decision Framework

| Factor | Build | Buy (COTS / SaaS) | Notes |
|---|---|---|---|
| **Differentiating capability?** | Yes → Build (competitive advantage) | No → Buy | If it differentiates you, owning it matters |
| **Market solution maturity** | No mature market solution | Mature vendors exist | Commodity functions: buy; unique: build |
| **Integration complexity** | Low (greenfield; clean APIs) | High legacy integration needed | Heavy integration often makes SaaS slower |
| **Compliance requirements** | Custom compliance logic needed | Vendor handles compliance | SaaS for regulated functions can reduce compliance burden |
| **Total cost (5-yr TCO)** | Lower if team capacity available | Lower if build cost is high | Include maintenance and team cost |
| **Time to value** | Slower (months to first release) | Faster (weeks to first deployment) | Urgency often drives buy |

> **Rule of thumb:** If the functionality is a business differentiator, build. If it is a commodity, buy. If a mature SaaS handles it reliably and you don't need to customise deeply, buying is almost always cheaper and faster. The mistake is building commodity capabilities as if they were differentiators.

---

## Bloom Layer D — Tools

### Application Architecture Tools

| Tool | Purpose | Pros | Cons | Cost | Link |
|---|---|---|---|---|---|
| **Structurizr / C4 Model** | Software architecture diagrams (Context, Container, Component) | Developer-native; code-as-diagrams; Git-friendly; IDE integration | Relatively new; limited enterprise stakeholder acceptance | Free (OSS DSL); Structurizr Cloud from ~$8/mo | [structurizr.com](https://structurizr.com) |
| **ArchiMate 3.2 (via Archi)** | TOGAF-aligned modelling: application layer elements and relations | TOGAF native; full viewpoint library; ArchiExchange compatible | Steep learning curve; notation unfamiliar to developers | Free (Archi OSS) | [archimatetool.com](https://www.archimatetool.com) |
| **Lucidchart / Miro** | Application landscape diagrams for stakeholders | Fast; accessible; good for workshops | No model integrity; diagrams diverge from reality | From $9/user/mo | [lucidchart.com](https://www.lucidchart.com) |
| **LeanIX** | Application portfolio management (APM) — lifecycle, cost, capabilities | Full APM; technology radar; EA integration; dashboards | Enterprise pricing; complex setup | Enterprise ($$$$) | [leanix.net](https://www.leanix.net) |
| **Backstage (Spotify OSS)** | Software catalogue — application inventory, ownership, tech debt | Developer portal; standards visible in context; plugin ecosystem | Requires platform team investment; does not replace EA tooling | Free (OSS) | [backstage.io](https://backstage.io) |
| **Draw.io (diagrams.net)** | Quick integration and flow diagrams | Free; web-based; Git-embeddable (SVG/PNG) | No model; no consistency checks; diagrams only | Free | [diagrams.net](https://www.diagrams.net) |

---

## Bloom Layer E — Decision Frameworks

| Architecture decision | Lean towards when | Lean away when | Risk if wrong |
|---|---|---|---|
| **Microservices vs. modular monolith** | Microservices: independent scaling; multiple teams; CI/CD maturity high | Monolith: small team; early stage; deployment independence not needed | Microservices without organisational readiness → distributed monolith; premature decomposition is expensive to reverse |
| **Event-driven integration vs. REST** | Events: loose coupling needed; high throughput; publishers should not know consumers | REST: strong consistency; request-reply semantics; simple; low event volume | REST everywhere: tight coupling; change propagation breaks consumers; events without a broker: message loss |
| **Build vs. buy** | Build: differentiating capability; no market solution; custom compliance | Buy: commodity; vendor reliable; integration manageable | Build commodity: years of maintenance for zero competitive advantage; buy differentiator: vendor lock-in on your competitive capability |
| **API gateway vs. direct integration** | Gateway: multiple consumers; rate limiting; auth centralisation; observability | Gateway: avoid for single internal integration; adds latency without benefit | No gateway: each consumer re-implements auth and rate limiting; gateway everywhere: unnecessary overhead on internal mesh |
| **Synchronous vs. asynchronous calls** | Async: acceptable eventual consistency; loose coupling; high throughput | Sync: strong consistency required; user is waiting; simple semantics | Sync everywhere: cascading failures; async everywhere with no consistency guarantees: stale data in critical flows |

---

## Bloom Layer E — Judgment & Trade-offs

| Question | Lean towards when | Lean away when | Failure mode if wrong |
|---|---|---|---|
| **Decompose monolith now vs. in Phase F** | Phase C decision: draw the target boundary; Phase F: sequence the work | Do not commit to implementation sequencing in Phase C | Premature decomposition in Phase C: target locked before constraints understood; too late: gaps persist into Phase D |
| **Integration catalogue depth** | Full interface-level detail when integration is high risk or complex | Summary level for stable low-risk integrations | Under-documented: Phase D underestimates infra; over-documented: wasted effort before target is confirmed |
| **SaaS vs. build for Loyalty Platform** | SaaS: faster delivery, vendor handles loyalty mechanics; lower TCO if standard | Build: if loyalty rules are a competitive differentiator | Wrong decision: locked into SaaS that cannot support business rules; or built bespoke loyalty engine that costs 10× SaaS |
| **Application or data first in Phase C?** | Application first when integration topology is the driver; Data first when data quality/ownership is the driver | Do not allow one sub-phase to block the other indefinitely | Sequential not parallel: Phase D delayed; Application without data: integration catalogue is incomplete |
| **Capability model depth** | Capability-to-application mapping at level 2–3 is sufficient; level 4+ usually overkill | Level 1 only: too coarse for gap analysis | Too coarse: gaps missed; too fine: architects spend months on a capability taxonomy with no delivered value |

---

## Bloom Layer F — Synthesis Exercise

**Scenario:** A retail bank (2,000 engineers, 15 value streams) is splitting a core banking monolith into domain services. The monolith handles: Accounts, Loans, Payments, Cards, and Reporting. Five teams own parts of the monolith today. The bank has a 24-month window before its cloud contract doubles; it must reduce the monolith's cloud footprint or migrate it.

1. **Recall:** List the 9 Phase C Application Architecture steps. For each of the first 4, name the primary artefact produced.
2. **Comprehension:** Explain why the Application Architecture must be done in parallel with Data Architecture — and what breaks if the Application team finishes first and hands off a stable architecture before Data Architecture is complete.
3. **Application:** Produce a partial application portfolio for this bank. Include at least 5 applications: ID, name, business capability, hosting, status (active/end-of-life), and disposition (retain/evolve/replace/retire).
4. **Analysis:** The Payments domain is on the critical path for PSD2 compliance. The Accounts team wants to decouple first because they have the most technical debt. Analyse the trade-off. What criteria should drive sequencing priority?
5. **Evaluation:** A product manager proposes buying a Cards-as-a-Service SaaS platform rather than rebuilding the Cards domain. Evaluate the build vs. buy case against four criteria: (a) differentiation, (b) integration complexity with the retained Account domain, (c) regulatory compliance (PCI-DSS), (d) 5-year TCO.
6. **Synthesis:** Produce a one-page "Application Architecture Decision for Payments decomposition": baseline state, target state, key gap, top 3 interface risks, recommended integration pattern (REST or events), and how it traces to the business capability it supports.

> The best application architecture is the one that lets teams deploy independently, reason about their own domain clearly, and adapt to business change without requiring cross-team negotiation for every decision.

---

## Acceleration Using AI

| Use case | Prompt pattern | Watch for |
|---|---|---|
| **Application portfolio first-draft** | "Generate an application portfolio table for a [industry type, company size]. Columns: App ID, Application Name, Business Capability, Technology, Hosting, Status, Disposition. Use realistic technology stacks and include at least one end-of-life system and one SaaS application." | Fictional app names that look plausible; always validate against real estate |
| **Integration catalogue** | "Given these applications: [list]. Generate an integration catalogue. Columns: Interface ID, Source, Target, Protocol, Data payload, Frequency, Status, Phase E action." | May invent protocols; validate each interface against actual integration reality |
| **Gap analysis** | "Given this baseline portfolio [paste] and this target capability map [paste], generate a gap analysis table. Columns: App/Area, Baseline State, Target State, Gap, Roadmap Item." | Generic gaps; LLM will not know your real constraints (budget, skills, vendor contracts) |
| **Build vs. buy analysis** | "Should we build or buy [describe capability] for [describe organisation]? Apply the TOGAF build vs. buy framework considering: differentiation, market maturity, integration complexity, compliance, 5-year TCO." | Over-confident recommendations without knowing your context; use as structure, not conclusion |
| **C4 diagram** | "Generate a C4 Container diagram in Structurizr DSL for a [describe system]. Include: web app, mobile app, API service, database, and two external systems." | Structurizr DSL syntax errors; validate with Structurizr CLI before publishing |

!!! warning "Bias to watch"
    LLMs produce application portfolios that reflect generic industry patterns, not your organisation's actual estate. AI-generated integration catalogues will invent interfaces that do not exist. Always anchor AI outputs to real systems discovery — run application discovery workshops before relying on any AI-generated portfolio.

---

## Common Mistakes

!!! danger "Skipping the baseline"
    The most common Phase C mistake: jumping straight to the target architecture without documenting the baseline. Every gap analysis, every integration impact assessment, and every Phase E work package depends on knowing what exists today. Discovery is the unglamorous work that makes everything else correct.

!!! failure "Application architecture without capability tracing"
    An application portfolio that is not traced to business capabilities is a technology inventory, not an architecture. Without the business capability link, you cannot justify which applications need investment and which should be retired.

!!! warning "Treating all integration as equal"
    A nightly batch file between two back-office systems is not the same risk as a real-time synchronous call from the customer-facing payment flow. Classify and risk-assess integrations; focus architecture effort on high-risk, high-frequency interfaces.

!!! tip "Application Architecture and Data Architecture in parallel"
    Run Application and Data sub-phases in parallel, with shared workshops. The application team owns service boundaries; the data team owns entity ownership and flows. Where they disagree — that is the most important conversation in Phase C.

---

## Credible Sources & Further Reading

| Resource | Type | What it adds | Link |
|---|---|---|---|
| TOGAF 10 Part II Chapter 8 | Primary standard | Authoritative Phase C steps, inputs, outputs, artefacts | [pubs.opengroup.org](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap08.html) |
| C4 Model (Simon Brown) | Notation method | Context, Container, Component, Code — developer-friendly architecture diagrams | [c4model.com](https://c4model.com) |
| ArchiMate 3.2 | Standard | Application layer elements and relations; TOGAF-native notation | [pubs.opengroup.org/architecture/archimate3-doc](https://pubs.opengroup.org/architecture/archimate3-doc/) |
| Building Microservices (Newman — 2nd ed. 2021) | Book | Service decomposition; API design; migration strategies | [oreilly.com](https://www.oreilly.com/library/view/building-microservices-2nd/9781492034193/) |
| Monolith to Microservices (Newman — 2019) | Book | Strangler Fig and other migration patterns; application portfolio sequencing | [oreilly.com](https://www.oreilly.com/library/view/monolith-to-microservices/9781492047834/) |
| Designing Distributed Systems (Burns — 2018) | Book | Sidecar, ambassador, adapter patterns; integration architecture | [oreilly.com](https://www.oreilly.com/library/view/designing-distributed-systems/9781491983638/) |
| LeanIX APM Guide | Practitioner reference | Application portfolio management lifecycle and metrics | [leanix.net/en/knowledge](https://www.leanix.net/en/knowledge) |
| Software Architecture Patterns (Richards — 2015) | Book | Layered, event-driven, microkernel, microservices, space-based architectures | [oreilly.com](https://www.oreilly.com/library/view/software-architecture-patterns/9781491971437/) |
