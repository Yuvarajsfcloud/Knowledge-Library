[:material-home: KB Home](../index.html){ .md-button .md-button--primary } &nbsp; [Patterns](../patterns.html){ .md-button } &nbsp; [Templates](../templates.html){ .md-button }

# ArchiMate 3.2 — Quick Reference

**Standard:** ArchiMate 3.2 (2023) — The Open Group  
**Purpose:** ArchiMate is the open, independent modelling language for enterprise architecture, aligned to TOGAF. It provides a consistent notation for describing all four TOGAF architecture domains (BDAT) in a single, integrated model.

> **Free specification:** [pubs.opengroup.org/architecture/archimate32-doc/](https://pubs.opengroup.org/architecture/archimate32-doc/)

---

## Architecture Layers

ArchiMate organises the enterprise across three core layers plus extension layers:

``` mermaid
flowchart TB
    subgraph ST["Strategy Layer"]
        direction LR
        CAP["Capability"] 
        CS["Course of\nAction"]
        RES["Resource"]
    end
    subgraph BL["Business Layer"]
        direction LR
        BACT["Business Actor"]
        BROLE["Business Role"]
        BPROC["Business Process"]
        BSERV["Business Service"]
        BOBJ["Business Object"]
    end
    subgraph AL["Application Layer"]
        direction LR
        ACOMP["Application\nComponent"]
        ASERV["Application\nService"]
        AINT["Application\nInterface"]
        AOBJ["Data Object"]
    end
    subgraph TL["Technology Layer"]
        direction LR
        TNODE["Node"]
        TDEV["Device"]
        TSYS["System\nSoftware"]
        TSERV["Technology\nService"]
        TART["Artifact"]
    end
    subgraph IMPL["Implementation & Migration Layer"]
        direction LR
        WP["Work Package"]
        EV["Deliverable"]
        GAP["Gap"]
    end

    ST --> BL --> AL --> TL
    ST & BL & AL & TL --> IMPL

    style ST fill:#fff3e0,stroke:#e65100
    style BL fill:#e3f2fd,stroke:#1565c0
    style AL fill:#e8f5e9,stroke:#2e7d32
    style TL fill:#f3e5f5,stroke:#6a1b9a
    style IMPL fill:#fafafa,stroke:#37474f
```

---

## Element Quick Reference

### Strategy Layer

| Element | Symbol | Description | Example |
|---|---|---|---|
| **Capability** | Pentagon | Ability of an organisation to perform a function | "Order Management", "Customer Identity" |
| **Course of Action** | Folded arrow | Strategy or tactic for achieving goals | "Migrate to cloud-native" |
| **Resource** | Cylinder | Assets the organisation uses | IT systems, staff, data |

### Business Layer

| Element | Symbol | Description | Example |
|---|---|---|---|
| **Business Actor** | Person icon | Active entity with a business role | Customer, Partner, Employee |
| **Business Role** | Person+circle | Responsibility within a process | Order Processor, Account Manager |
| **Business Process** | Round-edge rect | Sequence of business behaviours | Order Fulfilment Process |
| **Business Function** | Flat-edge rect | Grouping of behaviour by skill/resource | Finance, HR, Logistics |
| **Business Service** | Curved underline | Externally visible business behaviour | "Place Order Service" |
| **Business Event** | Circle with lightning | State change triggering behaviour | OrderPlaced, PaymentReceived |
| **Business Object** | Square | Passive business data concept | Order, Customer, Invoice |
| **Contract** | Square-dashed | Formal agreement | Service Agreement, SLA |
| **Product** | Rect+underline | Coherent business offering | "Standard Delivery Product" |

### Application Layer

| Element | Symbol | Description | Example |
|---|---|---|---|
| **Application Component** | Double-sided rect | Modular, deployable application unit | OrderService, InventoryService |
| **Application Function** | Internal dashed rect | Automated behaviour of a component | ProcessPayment(), ReserveStock() |
| **Application Service** | Curved underline | Externally visible application behaviour | Order API, Payment API |
| **Application Interface** | Circle + line | Point of access for an application service | REST endpoint, gRPC interface |
| **Application Interaction** | Dashed arrow between components | Behaviour involving multiple components | Order → Payment collaboration |
| **Data Object** | Square | Data used or produced by applications | OrderRecord, CustomerProfile |

### Technology Layer

| Element | Symbol | Description | Example |
|---|---|---|---|
| **Node** | 3D box | Computational or physical resource | EC2 instance, Kubernetes node |
| **Device** | 3D box (screen) | Physical hardware | Server, mobile device |
| **System Software** | 3D box (cylinder) | Software that manages other software | OS, container runtime, JVM |
| **Technology Service** | Curved underline | Externally visible technology behaviour | DNS service, storage service |
| **Technology Function** | Dashed rect | Technology behaviour on a node | Load balancing, encryption |
| **Artifact** | Document with fold | Physical data used/produced | Docker image, JAR file, Terraform state |
| **Network** | Lines icon | Communication infrastructure | VPC, Internet, VPN |
| **Path** | Arrow on network | Connection between nodes | HTTPS link, SQS channel |

### Implementation & Migration Layer

| Element | Symbol | Description | Example |
|---|---|---|---|
| **Work Package** | Rect with gears | Unit of work delivering change | "Extract Order Service" |
| **Deliverable** | Rect with pin | Formally specified result | Architecture Document, Service |
| **Gap** | Dashed rect | Difference between baseline and target | "Missing Order Service" |
| **Plateau** | Rect (bold border) | Stable state in a migration | Transition Architecture 1 |

---

## Relationships Quick Reference

| Relationship | Symbol | Meaning | Typical Use |
|---|---|---|---|
| **Association** | Solid line | Unspecified relationship | Generic connection |
| **Composition** | Solid + filled diamond | Part-of (strong) | Service composed of sub-services |
| **Aggregation** | Solid + open diamond | Part-of (weak) | System aggregates components |
| **Realisation** | Dashed + open arrowhead | Concept → concrete | Application service realises business service |
| **Assignment** | Solid + filled circle | Responsibility | Role assigned to actor |
| **Aggregation** | Solid + open diamond | Collection | |
| **Used by** | Solid + open arrowhead | One element uses another | App component uses data object |
| **Triggering** | Solid + closed arrowhead | Causal relationship | Business process triggers application function |
| **Flow** | Dashed + open arrowhead | Transfer of information | Data flows between components |
| **Serving** | Solid + open arrowhead (inverted) | Element provides service to another | Application service serves business process |
| **Influence** | Dashed + open arrowhead | Affects without controlling | Driver influences goal |
| **Access** | Dashed | Element accesses a passive element | Component accesses data object |
| **Association** | Solid line, no arrowhead | Generic connection | |

---

## Cross-Layer Relationships

ArchiMate's power comes from connecting elements across layers. The key cross-layer relationship is **Realisation** (a lower layer element realises a higher layer element):

``` mermaid
flowchart TB
    BS["Business Service:\nOrder Management Service"]
    AS["Application Service:\nOrder REST API"]
    AC["Application Component:\nOrder Service (Java)"]
    TS["Technology Service:\nECS Fargate Task"]
    ART["Artifact:\norder-service:v1.2.3\nDocker Image"]
    NODE["Node:\nAWS ECS Cluster\neu-west-1"]

    AS -->|Realises| BS
    AC -->|Realises| AS
    ART -->|Realises| AC
    TS -->|Realises| ART
    NODE -->|Hosts| TS

    style BS fill:#e3f2fd,stroke:#1565c0
    style AS fill:#e8f5e9,stroke:#2e7d32
    style AC fill:#e8f5e9,stroke:#2e7d32
    style TS fill:#f3e5f5,stroke:#6a1b9a
    style ART fill:#f3e5f5,stroke:#6a1b9a
    style NODE fill:#f3e5f5,stroke:#6a1b9a
```

---

## ArchiMate Viewpoints

ArchiMate defines standard viewpoints aligned to stakeholder concerns:

| Viewpoint | Layers Shown | Audience | TOGAF Phase |
|---|---|---|---|
| **Business Process** | Business | Business Analyst | B |
| **Application Cooperation** | Application | Application Architect | C |
| **Technology Infrastructure** | Technology | Infrastructure Architect | D |
| **Application Usage** | Business + Application | EA, Tech Lead | B, C |
| **Technology Usage** | Application + Technology | EA, Tech Lead | C, D |
| **Implementation & Deployment** | Application + Technology + Impl | Programme Manager | E, F |
| **Migration** | All + Impl | Programme Manager | E, F |
| **Motivation** | Motivation extension | Executive, Strategist | A |
| **Strategy** | Strategy + Business | Executive, CTO | A, B |

---

## Notation Tips

!!! tip "Use ArchiMate for integration diagrams"
    When you need to show all four TOGAF domains (BDAT) in one diagram, use ArchiMate. For single-layer views (e.g., just application containers), C4 Model is faster and more readable.

!!! tip "Don't over-model"
    ArchiMate can express everything — but that doesn't mean it should. Model only what is needed to address stakeholder concerns. A 200-element diagram communicates nothing.

!!! tip "Free tools for ArchiMate"
    - **Archi** ([archimatetool.com](https://www.archimatetool.com/)) — free, open-source, full ArchiMate 3.2 support
    - **draw.io** — ArchiMate shape library available
    - **Structurizr** — C4 Model, not ArchiMate, but excellent for software architecture

---

## ArchiMate Reference

- ArchiMate 3.2 Specification — The Open Group: [pubs.opengroup.org/architecture/archimate32-doc/](https://pubs.opengroup.org/architecture/archimate32-doc/)
- Archi (free tool): [archimatetool.com](https://www.archimatetool.com/)
- *Mastering ArchiMate* — Gerben Wierda (most comprehensive practitioner book)
- The Open Group ArchiMate Forum: [opengroup.org/archimate-forum](https://www.opengroup.org/archimate-forum)
