# Personal Tech Radar

A snapshot of technologies I am currently using, trialling, evaluating, or actively avoiding. Inspired by the **[ThoughtWorks Tech Radar](https://www.thoughtworks.com/radar)** model.

!!! info "Companion visual page"
    A higher-level visual Tech Radar with all quadrants and rings is published as a static HTML page alongside the documentation site:
    **[tech-radar.html](../../../tech-radar.html)**

---

## Rings

| Ring | Meaning |
|---|---|
| **Adopt** | Proven; recommend strongly; default choice for new work |
| **Trial** | Worth trying on a real project to learn its limits |
| **Assess** | Worth understanding; not yet ready for commitment |
| **Hold** | Avoid on new work; existing usage should plan an exit |

---

## Quadrants

The radar is divided into four quadrants:

- **Techniques** — practices, methods, architectural approaches
- **Platforms** — runtime hosts, clouds, operating systems
- **Tools** — software developers/operators use directly
- **Languages & Frameworks** — programming languages and major frameworks

---

## How I Maintain It

- Reviewed **quarterly** — entries can move rings or rotate off entirely.
- An item is added only when I have direct experience or strong second-hand evidence.
- An item moves to **Hold** when a clearly better option exists *and* the cost of staying is real.

---

## Tools

### Adopt

| Tool | Category | Notes |
|---|---|---|
| **Mermaid** | Diagramming | Code-as-diagram; renders in MkDocs, GitHub, Obsidian; default for knowledge base diagrams |
| **VS Code** | Editor | Primary editor; Markdown preview, Git, extensions |
| **Obsidian** | Knowledge management | Local-first markdown vault; used for company-confidential content that cannot be committed to GitHub |

### Trial

| Tool | Category | Notes |
|---|---|---|
| **Archi** | ArchiMate modelling | Open-source, GUI-based ArchiMate authoring tool; org standard for formal EA deliverables. Supports jArchi scripting for programmatic model generation. Export diagrams as images for embedding in documentation |
| **GitHub Copilot (agent mode)** | AI-assisted development | Multi-agent SDLC framework built on top; see [Salesforce SDLC Agent Framework](../../projects/salesforce-sdlc-agent/index.md) |

### Assess

| Tool | Category | Notes |
|---|---|---|
| **Figma** | UI/UX design | Browser-based design and wireframing tool; primary use is UI mockups, prototypes, and screen-level design. FigJam (whiteboard) useful for collaborative workshops. Cloud-only — do not use for company-confidential designs |
| **Structurizr** | C4 diagramming | DSL-based C4 diagrams; strong for system context and container views; no ArchiMate support |
| **PlantUML** | Diagramming | Unofficial ArchiMate library available; code-driven alternative to Archi for less formal diagrams |

### Hold

| Tool | Category | Notes |
|---|---|---|
| *(none yet)* | | |

---

## Related

- [Frameworks Reference](frameworks.md) — the EA / SDLC frameworks I draw on
- [ADRs](../decision-records/index.md) — recorded decisions, including technology choices
- [Architecture Notes](../architecture-notes/index.md)
