# Architecture Frameworks — Comparison Reference

A quick-reference comparison of the major frameworks an Applications Architect will encounter. Understand what each framework does, when to use it, and how it relates to TOGAF.

---

## Framework Overview

| Framework | Maintained By | Focus | Type | Best For |
|---|---|---|---|---|
| [TOGAF](#togaf) | The Open Group | Enterprise architecture process | Process/Method | Structuring architecture work end-to-end |
| [Zachman](#zachman) | Zachman International | Classification of architecture artifacts | Ontology/Taxonomy | Ensuring completeness of architecture artifacts |
| [COBIT 2019](#cobit-2019) | ISACA | IT governance and management | Governance Framework | Aligning IT governance with business; audit |
| [ITIL 4](#itil-4) | Axelos / PeopleCert | IT service management | Service Management | Operating IT services; incident and change management |
| [SABSA](#sabsa) | SABSA Institute | Security architecture | Security Method | Embedding security architecture within TOGAF |
| [C4 Model](#c4-model) | Simon Brown | Software architecture documentation | Notation/Method | Documenting software architecture clearly |
| [ArchiMate 3.2](#archimate-32) | The Open Group | Architecture modelling language | Notation/Language | Integrated BDAT modelling |
| [AWS Well-Architected](#aws-well-architected) | Amazon Web Services | Cloud architecture quality | Review Framework | Cloud architecture design and review |
| [DORA Metrics](#dora-metrics) | DORA / Google | Software delivery performance | Measurement | Measuring and improving delivery capability |

---

## TOGAF

**Full name:** The Open Group Architecture Framework  
**Version:** TOGAF Standard, 10th Edition (2022)  
**Reference:** [opengroup.org/togaf](https://www.opengroup.org/togaf)

| Aspect | Detail |
|---|---|
| **What it is** | A comprehensive method and set of tools for developing enterprise architectures |
| **Core element** | The ADM (Architecture Development Method) — a cyclical process for developing BDAT architectures |
| **Scope** | Enterprise-wide; all four architecture domains (Business, Data, Application, Technology) |
| **Deliverables** | Architecture Vision, ADD, ARs, Architecture Roadmap, Architecture Contracts |
| **Governance** | Architecture Board, Architecture Contracts, Compliance Reviews |
| **Certification** | TOGAF Foundation (Level 1) + Practitioner (Level 2) — via Pearson VUE |
| **Freely available** | Yes — the specification is publicly browsable at The Open Group website |

**Use TOGAF when:** Structuring architecture engagement from discovery through governance. It provides the *process* for architecture work.

---

## Zachman

**Full name:** Zachman Framework for Enterprise Architecture  
**Author:** John Zachman  
**Reference:** [zachman.com](https://www.zachman.com/)

| Aspect | Detail |
|---|---|
| **What it is** | A classification ontology — a 6×6 matrix for classifying architecture artifacts |
| **Core element** | The Zachman Matrix: 6 interrogatives (What, How, Where, Who, When, Why) × 6 perspectives (Executive, Business, Architect, Engineer, Technician, User) |
| **Scope** | Classification of *any* architecture artifact across any perspective |
| **Deliverables** | Not prescriptive about deliverables — tells you *what to think about*, not *how to do it* |
| **Certification** | Zachman Certified Architect (ZCA) |

**Zachman Matrix (simplified):**

| Perspective | What (Data) | How (Function) | Where (Network) | Who (People) | When (Time) | Why (Motivation) |
|---|---|---|---|---|---|---|
| **Executive** | List of things | List of processes | List of locations | List of orgs | List of events | List of goals |
| **Business** | Semantic model | Business process model | Business logistics | Work flow model | Master schedule | Business plan |
| **Architect** | Logical data model | App architecture | Distributed systems | Human interface | Processing structure | Business rules |
| **Engineer** | Physical data model | System design | Technology architecture | Presentation | Control structure | Rule design |
| **Technician** | Data definition | Program | Network architecture | Security | Timing definition | Rule specification |
| **User** | Usable data | Working function | Usable network | Functioning org | Working schedule | Working strategy |

**Use Zachman when:** Checking the completeness of an architecture description. TOGAF tells you *how* to do architecture; Zachman tells you *what* you might be missing.

**TOGAF + Zachman:** Complementary. Use TOGAF for the process; use Zachman to audit completeness of outputs.

---

## COBIT 2019

**Full name:** Control Objectives for Information and Related Technologies  
**Maintained by:** ISACA  
**Reference:** [isaca.org/cobit](https://www.isaca.org/resources/cobit)

| Aspect | Detail |
|---|---|
| **What it is** | An IT governance and management framework |
| **Core element** | 40 governance and management objectives organised into 5 domains: EDM, APO, BAI, DSS, MEA |
| **Scope** | IT governance; alignment of IT with business goals; risk, controls, audit |
| **Audience** | CIO, Board, IT Management, Auditors, Risk officers |
| **Relationship to TOGAF** | COBIT provides governance *around* IT; TOGAF provides the *architecture method*. Architecture governance (TOGAF Phase G/H) aligns with COBIT EDM01 (Governance Framework) and APO03 (Enterprise Architecture) |

**COBIT Domains:**

| Domain | Focus |
|---|---|
| **EDM** — Evaluate, Direct, Monitor | Governance: set direction, evaluate performance, monitor compliance |
| **APO** — Align, Plan, Organise | IT strategy, architecture, innovation, risk, security |
| **BAI** — Build, Acquire, Implement | Change management, project delivery, solution delivery |
| **DSS** — Deliver, Service, Support | Operations, incident management, business continuity |
| **MEA** — Monitor, Evaluate, Assess | Performance monitoring, compliance, assurance |

**COBIT APO03 — Enterprise Architecture** is the objective most directly relevant to architects. It defines how to maintain an enterprise architecture to support business strategy.

---

## ITIL 4

**Full name:** Information Technology Infrastructure Library  
**Maintained by:** Axelos / PeopleCert  
**Reference:** [axelos.com/certifications/itil-service-management](https://www.axelos.com/certifications/itil-service-management)

| Aspect | Detail |
|---|---|
| **What it is** | A framework for IT service management — managing IT services across their lifecycle |
| **Core element** | The Service Value System (SVS); 34 management practices |
| **Scope** | IT service delivery and support operations |
| **Relationship to TOGAF** | ITIL covers operations (TOGAF Phase G/H and post-implementation steady state). Architecture defines *what to build*; ITIL governs *how to run it*. |

**Key ITIL 4 Practices relevant to architecture:**

| Practice | TOGAF Touchpoint |
|---|---|
| Change Enablement | Phase H — Architecture Change Management |
| Service Design | Phase C/D — architecture inputs to service design |
| Incident Management | Phase G/H + Operate; see [Incident Response Playbook](../playbooks/incident-response.md) |
| Problem Management | Feeds back into Phase H as architecture change triggers |
| Service Level Management | SLOs / SLAs; aligns with fitness functions in Phase 5 |
| Configuration Management (CMDB) | Architecture Repository — physical inventory |

---

## SABSA

**Full name:** Sherwood Applied Business Security Architecture  
**Reference:** [sabsa.org](https://sabsa.org/)

| Aspect | Detail |
|---|---|
| **What it is** | A security architecture framework and methodology |
| **Core element** | The SABSA Matrix — parallel to Zachman, but security-focused; 6 layers × 6 interrogatives |
| **Scope** | Security architecture across all enterprise layers |
| **Relationship to TOGAF** | SABSA plugs into TOGAF as the security domain method. The security architect uses SABSA to develop the security viewpoint; outputs feed into TOGAF Phases B–D |

**SABSA and TOGAF integration:**

| TOGAF Phase | SABSA Layer |
|---|---|
| Phase A (Business Context) | Contextual Layer — business risk and security drivers |
| Phase B (Business Architecture) | Conceptual Layer — security concepts and attributes |
| Phase C (Information Systems) | Logical Layer — security services and mechanisms |
| Phase D (Technology Architecture) | Physical Layer — security technology selection |
| Phase G (Implementation) | Component Layer — security component deployment |

---

## C4 Model

**Author:** Simon Brown  
**Reference:** [c4model.com](https://c4model.com/)

| Aspect | Detail |
|---|---|
| **What it is** | A lightweight notation for visualising software architecture |
| **Core element** | Four diagram levels: Context (L1), Container (L2), Component (L3), Code (L4) |
| **Scope** | Software/application architecture (TOGAF Phase C, D) |
| **Relationship to TOGAF** | C4 is a practical notation for TOGAF Phase C (Application) and Phase D (Technology) diagrams. It is simpler than ArchiMate for software-centric views. |

**When C4 vs ArchiMate:**
- **C4** — software-centric views for engineering teams; fast to produce; low barrier
- **ArchiMate** — multi-layer, multi-domain views; integrates BDAT in one model; higher investment

---

## AWS Well-Architected

**Maintained by:** Amazon Web Services  
**Reference:** [aws.amazon.com/architecture/well-architected](https://aws.amazon.com/architecture/well-architected/)

| Aspect | Detail |
|---|---|
| **What it is** | A review framework for assessing cloud architecture quality |
| **Core element** | Six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimisation, Sustainability |
| **Scope** | AWS cloud architecture quality assessment |
| **Relationship to TOGAF** | Maps to TOGAF Phase D (technology quality review) and Phase 3 (Validation) |
| **Free tool** | AWS Well-Architected Tool in the AWS console — generates a scored assessment and improvement plan |

**Equivalents for other clouds:**
- Google Cloud: [Google Architecture Framework](https://cloud.google.com/architecture/framework)
- Microsoft Azure: [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/)

---

## DORA Metrics

**Full name:** DevOps Research and Assessment Metrics  
**Reference:** [dora.dev](https://dora.dev/) | *Accelerate* — Forsgren, Humble, Kim

| Metric | What It Measures | Elite Benchmark |
|---|---|---|
| **Deployment Frequency** | How often code is deployed to production | Multiple times per day |
| **Lead Time for Changes** | Time from code commit to production | Less than 1 hour |
| **Change Failure Rate** | % of deployments that cause incidents | 0–5% |
| **Failed Deployment Recovery Time** | Time to restore after a failure | Less than 1 hour |

**DORA and architecture:**
- Deployment Frequency and Lead Time are directly affected by architectural decisions (service granularity, CI/CD architecture, independent deployability).
- Architecture fitness functions should include DORA metrics as Phase 5 / Phase H governance signals.
- See [Phase 5 — Operate & Evolve](../phases/05-operate.md) for integration.

---

## Framework Selection Guide

| Situation | Recommended Framework(s) |
|---|---|
| Structuring a new architecture engagement end-to-end | **TOGAF ADM** |
| Checking nothing has been missed in architecture deliverables | **Zachman** |
| Reviewing IT governance alignment and audit readiness | **COBIT 2019** |
| Designing security architecture | **SABSA** + TOGAF |
| Reviewing cloud architecture quality | **AWS/Azure/GCP Well-Architected** |
| Documenting software architecture for engineering teams | **C4 Model** |
| Full enterprise architecture modelling across BDAT | **ArchiMate 3.2** |
| Managing IT services and operations | **ITIL 4** |
| Measuring delivery performance | **DORA Metrics** |
| All of the above (architecture practice) | **TOGAF** as the spine; others plug in |
