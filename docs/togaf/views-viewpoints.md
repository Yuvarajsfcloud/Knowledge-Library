# Architecture Views & Viewpoints

**TOGAF Reference:** Part III, Chapter 35 — Architecture Views & Viewpoints  
**IEEE 42010:2011 Reference:** Sections 5.4–5.7 — Viewpoints and Views  
**Purpose:** Different stakeholders care about different aspects of the architecture. Views and viewpoints are the mechanism for producing targeted, relevant architecture descriptions for each audience.

---

## Core Concepts

| Concept | Definition | Analogy |
|---|---|---|
| **Stakeholder** | Person with an interest in the architecture | The audience |
| **Concern** | Issue or question a stakeholder cares about | What the audience wants to know |
| **Viewpoint** | The definition of a perspective — what to show, for whom, using what notation | A camera angle specification |
| **View** | The product — an architecture description from a specific viewpoint | The photograph |

``` mermaid
flowchart LR
    S["Stakeholders\n(have concerns)"] --> VP["Viewpoints\n(specify how to address concerns)"] --> V["Views\n(the actual description)"]
    S --> V
    V --> AD["Architecture\nDescription\n(the full set of views)"]

    style S fill:#37474f,color:#fff,stroke:none
    style VP fill:#4051b5,color:#fff,stroke:none
    style V fill:#2e7d32,color:#fff,stroke:none
    style AD fill:#6a1b9a,color:#fff,stroke:none
```

---

## Standard Viewpoints for Enterprise Architecture

### 1. Business Viewpoint

| | |
|---|---|
| **Primary Stakeholders** | CEO, CFO, Product Owner, Business Analyst |
| **Concerns** | Business capabilities, processes, value streams, organisation structure, business goals |
| **Notation** | Business Capability Map, Value Stream, BPMN, Organisation chart |
| **Key Diagrams** | Capability heat map, value stream map, business context diagram |
| **TOGAF Phase** | Phase B |

---

### 2. Application Viewpoint

| | |
|---|---|
| **Primary Stakeholders** | Engineering leads, Application Architects, Product Owners |
| **Concerns** | Application landscape, inter-service interactions, API contracts, system boundaries |
| **Notation** | C4 Model (L1 Context, L2 Container), ArchiMate Application Layer, UML Component |
| **Key Diagrams** | System Context, Container diagram, Application interaction catalogue |
| **TOGAF Phase** | Phase C (Application) |

---

### 3. Data Viewpoint

| | |
|---|---|
| **Primary Stakeholders** | Data Architects, CDO, Legal/Compliance, Data Engineers |
| **Concerns** | Data entities and relationships, data ownership, PII flows, retention, master data |
| **Notation** | ER diagram, Data Flow Diagram (DFD), ArchiMate Data Layer |
| **Key Diagrams** | Conceptual data model, PII data flow diagram, data domain ownership map |
| **TOGAF Phase** | Phase C (Data) |

---

### 4. Technology / Infrastructure Viewpoint

| | |
|---|---|
| **Primary Stakeholders** | Platform engineers, Ops / SRE, CISO, CTO |
| **Concerns** | Compute, networking, security controls, deployment topology, infrastructure costs |
| **Notation** | C4 Deployment diagram, AWS/Azure architecture icons, Network diagram |
| **Key Diagrams** | VPC/network topology, deployment view, multi-AZ diagram |
| **TOGAF Phase** | Phase D |

---

### 5. Security Viewpoint

| | |
|---|---|
| **Primary Stakeholders** | CISO, Security Architect, Compliance, Legal |
| **Concerns** | Trust boundaries, authentication, authorisation, data residency, threat model |
| **Notation** | Trust boundary diagram, STRIDE threat model, data classification matrix |
| **Key Diagrams** | Trust boundary / attack surface diagram, PII flow (coloured), IAM model |
| **TOGAF Phase** | Across B, C, D |

---

### 6. Operational Viewpoint

| | |
|---|---|
| **Primary Stakeholders** | SRE / Operations team, On-call engineers |
| **Concerns** | SLOs, deployment pipeline, monitoring & alerting, runbooks, incident response |
| **Notation** | Sequence diagrams (incident flow), CI/CD pipeline diagram, observability stack |
| **Key Diagrams** | Deployment pipeline, SLO dashboard, service dependency map |
| **TOGAF Phase** | Phase G, H + Operate |

---

### 7. Migration / Transition Viewpoint

| | |
|---|---|
| **Primary Stakeholders** | Programme Manager, Engineering Lead, Sponsor |
| **Concerns** | Migration sequencing, dependencies, transition states, risk, timeline |
| **Notation** | Gantt / roadmap, Transition Architecture diagrams, 7R register |
| **Key Diagrams** | Architecture Roadmap (Gantt), Transition Architecture progression |
| **TOGAF Phase** | Phase E, F |

---

## Stakeholder → Viewpoint Mapping

| Stakeholder | Primary Viewpoints | Secondary Viewpoints |
|---|---|---|
| CEO / Board | Business | Migration |
| CTO / CIO | Technology, Business | All |
| CFO | Business | Technology (cost) |
| CISO | Security | Technology, Data |
| Product Owner | Application, Business | — |
| Engineering Lead | Application, Technology | Security, Operational |
| Data Architect | Data | Application |
| SRE / Ops | Operational, Technology | — |
| Compliance Officer | Security, Data | Business |
| Programme Manager | Migration | All |

---

## View Construction Guidance

When producing a view:

1. **Identify the stakeholder and concern** — who is this view for? What question does it answer?
2. **Select the viewpoint** — which standard viewpoint addresses that concern?
3. **Choose the notation** — match notation to the audience (C4 for engineers; capability map for business)
4. **Apply the filter** — include only what is relevant for this stakeholder; omit the rest
5. **Validate with the stakeholder** — a view that the stakeholder cannot read is not a valid view

!!! tip "Fewer good views beat many poor ones"
    Produce the minimum number of views needed to address all stakeholder concerns. An architecture document with 20 diagrams that no one reads is less valuable than 4 targeted views that drive decisions.

---

## View Templates

### System Context View (C4 L1) — Application Viewpoint

For: Engineering leads, Product Owners, Sponsors  
Shows: The system in its external context — users, external dependencies  
Use: [C4 Context Diagram — see Phase 2 Design](../phases/02-design.md)

### Business Capability Map — Business Viewpoint

For: CEO, Product Owner, Business Analyst  
Shows: What the business does; heat-map for strategic importance vs performance  
Use: [Phase B — Business Architecture](../togaf/phase-b-business.md)

### PII Data Flow — Data + Security Viewpoint

For: CISO, Legal, Compliance  
Shows: All flows of PII data; security controls at each step  
Use: [Phase C — Information Systems](../togaf/phase-c-information.md)

### Deployment Topology — Technology Viewpoint

For: Platform Engineers, SRE, CTO  
Shows: VPC, subnets, compute, databases, networking  
Use: [Phase D — Technology Architecture](../togaf/phase-d-technology.md)

### Architecture Roadmap — Migration Viewpoint

For: Programme Manager, Sponsor, Engineering Lead  
Shows: Work packages sequenced on a timeline; transition states  
Use: [Phase E–F — Migration Planning](../togaf/phase-ef-migration.md)

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part III, Chapter 35: Views and Viewpoints
- IEEE 42010:2011 — Systems and Software Engineering: Architecture Description
- C4 Model — [c4model.com](https://c4model.com/)
- ArchiMate 3.2 Viewpoints — [opengroup.org/archimate3](https://pubs.opengroup.org/architecture/archimate32-doc/)
- Free TOGAF: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap35.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap35.html)
