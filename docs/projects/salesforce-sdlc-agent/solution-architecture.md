# Solution Architecture

## The core principle

AI agents produce consistent, correct output when they read the right context before acting. This framework makes that systematic and permanent — every agent reads your org's specific knowledge before generating a single artefact. Context grows sprint over sprint; the framework gets better the longer the team uses it.

---

## Three-layer architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│  KNOWLEDGE LAYER                                                     │
│  .github/context/ + .github/standards/ + .github/skills/ + specs/   │
│                                                                      │
│  App Overview · Data Model · Tech Stack · Framework Patterns         │
│  Team Workflow · Integrations · Governance Rules · Permission Matrix │
│  + Enterprise Standards (architecture · development · testing · ops) │
│  + 9 domain reference files · 6 spec blueprints                     │
│  + 2,500 lines of Apex/LWC coding rules                             │
└──────────────────────────────┬───────────────────────────────────────┘
                               │  every agent reads before acting
┌──────────────────────────────▼───────────────────────────────────────┐
│  AGENT LAYER                                                         │
│  .github/agents/                                                     │
│                                                                      │
│  13 specialist agents — one per SDLC phase                           │
│  Orchestrator routes · Handoffs declared in YAML frontmatter         │
│  Role boundaries enforced by design, not convention                  │
└──────────────────────────────┬───────────────────────────────────────┘
                               │  validated against
┌──────────────────────────────▼───────────────────────────────────────┐
│  PILOT LAYER                                                         │
│  .github/pilot/                                                      │
│                                                                      │
│  8 real-world Salesforce use cases (UC-001 through UC-008)           │
│  Each exercises a specific agent chain, produces deployable output   │
│  Sign-off threshold: ≥ 5 of 8 completed                             │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1 — Knowledge Layer

The knowledge layer is what makes the framework org-specific. Without it, agents produce generic Salesforce code. With it, they produce code that follows your naming conventions, respects your data model, obeys your governance rules, and fits your team's workflow.

### Context files (7 files — `.github/context/`)

Every agent reads the relevant context files before acting. These are the single source of truth for org-specific facts.

| File | What it contains | Update trigger |
|---|---|---|
| `app-overview.context.md` | Business domain, user personas, core processes, Salesforce clouds in use | New cloud/feature adopted |
| `data-model.context.md` | Standard and custom objects, field-level detail, relationships, sharing model | Any new custom object or field deployed |
| `tech-stack.context.md` | API version (v66), Node.js toolchain, project structure, MCP servers | Toolchain change, new package, platform version bump |
| `framework-patterns.context.md` | Trigger → Handler → Service → Selector canonical layer pattern, naming conventions, anti-patterns | New canonical pattern or existing pattern changed |
| `team-workflow.context.md` | Branching strategy, ADO workflow, SDLC process, handoff gates, sign-off criteria | Team process change, branching strategy update |
| `governance-rules.context.md` | Structured IF-THEN compliance rules (R-001 through R-010): callouts, SOQL, sharing, test standards, deployment gates | New compliance requirement or governance rule |
| `permission-matrix.context.md` | Permission set assignment rules per feature area, naming convention | New permission set, profile change, feature rollout |

**Staleness rule:** No context file should be more than 14 days (one sprint) stale. `@salesforce-setup` checks at sprint start.

### Skills layer (`.github/skills/`)

Deeper domain reference files loaded by specialist agents for complex tasks.

| Skill | Content |
|---|---|
| `salesforce-developer/SKILL.md` | Code generation patterns; pointer to 9 domain reference files |
| `salesforce-developer/references/` | `apex-patterns`, `soql-optimization`, `lwc-guide`, `api-integration`, `flows-automation`, `security-sharing`, `deployment-devops`, `agentforce-ai`, `formulas-validation` |
| `salesforce-security/SKILL.md` | Security review methodology, compliance checklist |
| `salesforce-qa/SKILL.md` | Test design, regression strategy, defect documentation |
| `salesforce-devops/SKILL.md` | Pipeline patterns, environment strategy |
| `salesforce-testing/SKILL.md` | Test class patterns, TestDataFactory conventions |

### Coding rules (`.github/Blogs/`)

2,500+ lines of Apex and LWC standards loaded by the developer and reviewer agents.

| File | Lines | Content |
|---|---|---|
| `salesforce-apex-coding-rules.md` | 1,047 | Apex standards, anti-patterns, governor limit rules |
| `salesforce-lwc-coding-rules.md` | 1,505 | LWC component patterns, wire adapters, events, accessibility |

### Spec blueprints (`.github/specs/`)

Templates used by the developer agent to produce correctly structured output.

| Spec | When used |
|---|---|
| `apex-class.spec.md` | Generating Service / Selector / Handler classes |
| `apex-trigger.spec.md` | Generating triggers |
| `lwc-component.spec.md` | Generating LWC bundles |
| `integration-callout.spec.md` | Generating callout services |
| `deployment.spec.md` | Generating deployment artefacts |
| `test-class.spec.md` | Generating test classes |

---

## Layer 2 — Agent Layer

13 specialist agents, each owning one SDLC phase. Agents are defined in `.github/agents/` as Markdown files with YAML frontmatter declaring name, tools, and handoffs.

**Orchestrator pattern:** `@salesforce-orchestrator` is the default entry point. It reads the user's intent using keyword matching and suggests the right specialist via a handoff button. Users never need to know which agent to invoke.

**Handoff pattern:** Each agent declares downstream handoffs in its YAML frontmatter. At the end of a task, the agent presents handoff buttons pointing to the next phase. This enforces the SDLC chain without requiring the user to remember it.

**Role boundary enforcement:** Agents are scoped by design. `@salesforce-developer` does not run deployments. `@salesforce-deployer` does not generate code. Specialists stay in their lane.

See [Agent Design](agent-design.md) for the full breakdown of each agent.

---

## Layer 3 — Pilot Layer

8 use cases that exercise different agent combinations and complexity levels, used to validate the framework before team adoption.

| ID | Feature | Type | Complexity | Status |
|---|---|---|---|---|
| UC-001 | Account Duplicate Detection | Backend | Medium | **Complete** |
| UC-002 | Opportunity Stage Gate Enforcement | Backend | Medium | To Do |
| UC-003 | Case SLA Escalation Engine | Backend | High | To Do |
| UC-004 | Account 360 Dashboard | LWC (UI) | Medium | To Do |
| UC-005 | Case Deflection Knowledge Search | LWC (UI) | Medium | To Do |
| UC-006 | Lead Scoring Engine + Dashboard | Full-stack | High | To Do |
| UC-007 | Opportunity Quick-Edit Action | Full-stack | Low | To Do |
| UC-008 | Contact Activity Timeline | Full-stack | Medium | To Do |

**Sign-off criteria:** ≥ 5 of 8 use cases completed end-to-end, with 100% of artefacts deployable, ≥ 80% routing accuracy, and ≥ 90% anti-pattern avoidance.

---

## Context engineering — 12 layers

The framework models 12 types of context that agents may need. Not all are live; some are file-based, some require MCP calls.

| # | Layer | Source | Live? |
|---|---|---|---|
| 1 | Business | `app-overview.context.md` | File |
| 2 | Project Identity | `app-overview.context.md` + `tech-stack.context.md` | File |
| 3 | Architecture | `framework-patterns.context.md` + `ARCHITECTURE.md` | File |
| 4 | Code | `force-app/` source + `org-state.context.md` | File |
| 5 | Delivery | ADO MCP + `org-state.context.md` | **Live — ADO MCP** |
| 6 | Build/Release | `org-state.context.md` + Flosum MCP | Partial — Flosum not wired |
| 7 | Testing | `testing.context.md` | File |
| 8 | Runtime | Salesforce DX MCP + `salesforce-monitor` | Partial — no live infra metrics |
| 9 | Governance | `governance-rules.context.md` | File |
| 10 | SPM (process) | `team-workflow.context.md` | File |
| 11 | Org Intelligence | `memory/team-decisions.memory.md` + Work IQ MCP | **Live — Work IQ MCP** |
| 12 | Historical | `memory/` files | File — needs active population |

**Context routing rule:** Default to local files. Go live (MCP call) only when the question is about current operational state (sprint work items, deployed metadata, production errors).

---

## MCP server wiring

| MCP Server | What it provides | Status |
|---|---|---|
| Azure DevOps MCP | Work items, sprint state, PR status, build results | Live |
| Salesforce DX MCP | Org metadata, data queries, Apex test runs, user management | Live |
| Playwright MCP | Browser-based UI test execution in sandbox | Live — partially validated |
| Work IQ MCP (`@microsoft/workiq`) | M365 emails, meetings, Teams messages, people/org context | Live |
| Flosum MCP | Live pipeline stage, branch state, deployment history | **Not yet wired** |

---

## Quality guardrails (multi-level)

Quality is enforced at four independent levels — not just by agents:

```
Agent layer       → @salesforce-developer enforces layer pattern + anti-patterns
                    @salesforce-security enforces CRUD/FLS + sharing
                    @salesforce-reviewer checks bulkification + naming
                         │
Pre-commit hooks  → Prettier (Apex, LWC, XML) + ESLint + LWC Jest on staged files
                         │
sf CLI validation → sf project deploy validate runs full test suite before any deploy
                         │
ADO gates         → Agent comment required at Dev → QA boundary
                    Agent comment required at QA → RE boundary
```

No single point of failure. A defect must evade four independent checks to reach production.

---

## Repository structure

```
.github/
  ARCHITECTURE.md              ← Framework overview (source of truth)
  copilot-instructions.md      ← Master entry point loaded by Copilot every session
  agents/                      ← 13 specialist agent definitions
  context/                     ← 7 org-specific knowledge files
  standards/                   ← Enterprise-wide org standards
  skills/                      ← Domain skill files + 9 reference files
  specs/                       ← 6 code generation blueprints
  Blogs/                       ← 2,500 lines of Apex/LWC coding rules
  instructions/                ← File-type-specific auto-loaded rules (.cls, .trigger, .js)
  memory/                      ← Persistent sprint context, decisions, known issues
  pilot/
    use-cases/                 ← UC-001 through UC-008 specs + acceptance criteria
    simulation/                ← End-to-end SDLC walkthrough (UC-001 complete)

force-app/main/default/        ← Salesforce source (classes, triggers, lwc, objects, permsets)
manifest/package.xml           ← Deployment manifest
scripts/setup-dev.sh           ← Developer environment setup
.mcp.json                      ← MCP server configuration (Work IQ)
.vscode/mcp.json               ← VS Code MCP configuration (ADO + Salesforce DX)
```

---

## Related pages

- [Agent Design](agent-design.md) — each agent in detail
- [Technical Architecture](technical-architecture.md) — toolchain, environments, quality gates
- [SDLC Workflow](sdlc-workflow.md) — how a feature moves through the layers
- [Decisions](decisions.md) — why the architecture was designed this way
