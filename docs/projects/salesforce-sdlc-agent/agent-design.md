# Agent Design

13 specialist agents — each owns one SDLC phase. This page describes what each agent does, what context it reads, what it produces, and how it hands off to the next phase.

---

## How agents work

Each agent is defined as a Markdown file in `.github/agents/` with YAML frontmatter:

```yaml
---
name: "Agent Name"
description: "What it does and when to use it"
tools: ["search/codebase", "runTasks", ...]
handoffs:
  - label: "Next phase label"
    agent: next-agent-name
---
```

The body is the agent's system prompt — the persona, rules, and process it follows. When invoked via `@agent-name` in GitHub Copilot Chat, the agent reads its designated context files and executes within its defined role boundary.

---

## Routing — The Orchestrator

### `salesforce-orchestrator`

**Role:** Default entry point. Routes any Salesforce request to the right specialist.  
**When to use:** Any Salesforce question without a clear SDLC phase. When unsure which agent to invoke.  
**Does not:** Generate code, modify files, or trigger deployments.

**Routing logic (keyword → agent):**

| Signal in the request | Routes to |
|---|---|
| "evaluate", "architecture", "design", "options", "tradeoffs", "ADR", "diagram" | `salesforce-architect` |
| "plan", "story", "epic", "break down", "ADO work item", "acceptance criteria" | `salesforce-planner` |
| "generate", "write", "create", "implement", "build", "unit test", "coverage" | `salesforce-developer` |
| "review", "check this", "audit", "PMD", "PR review" | `salesforce-reviewer` |
| "test plan", "functional test", "UAT", "regression", "QA" | `salesforce-qa` |
| "deploy", "package.xml", "Flosum", "CI/CD", "release" | `salesforce-deployer` |
| "error", "exception", "debug", "why is this failing", "log" | `salesforce-debugger` |
| "security", "CRUD", "FLS", "sharing", "compliance", "permission" | `salesforce-security` |
| "Agentforce", "Prompt Builder", "AI agent", "Einstein Copilot" | `salesforce-agentforce` |
| "setup", "wizard", "initialize", "new developer", "onboard" | `salesforce-setup` |

**Context gate:** If `app-overview.context.md` is empty or missing, the orchestrator stops and presents the "Run Setup Wizard" handoff instead of routing. Agents cannot operate without context.

---

## Development chain

### `salesforce-planner`

**Role:** Business Analyst. Translates feature requests into structured Salesforce development stories.  
**Persona:** Senior Salesforce BA with ADO expertise.  
**Context read:** `app-overview.context.md`, `data-model.context.md`, `team-workflow.context.md`

**Produces:**
- Epic → story decomposition
- ADO work item (title, description, acceptance criteria, effort estimate)
- Acceptance criteria in Salesforce-specific Given/When/Then format (referencing objects and fields)
- Complexity signals: bulkification, integration, LWC depth

**Hands off to:** `salesforce-architect` (if medium/high complexity), `salesforce-developer` (low complexity)

---

### `salesforce-architect`

**Role:** Solution Architect. Evaluates design options and captures decisions before code is written.  
**Persona:** Experienced Salesforce Architect with enterprise platform knowledge.  
**Context read:** `app-overview.context.md`, `data-model.context.md`, `framework-patterns.context.md`, `integrations.context.md`

**Produces:**
- Option analysis: 2–3 approaches with Salesforce-specific trade-offs
- Data model review: custom field assessment, object relationships, FLS impact
- Integration design: Named Credential, callout pattern, error handling
- Architecture Decision Record (ADR): decision, context, consequences
- Mermaid diagrams: data model, flow, component structure

**Hands off to:** `salesforce-developer`

---

### `salesforce-developer`

**Role:** Platform Engineer. Generates org-correct, production-quality Salesforce code.  
**Persona:** Senior Salesforce developer with deep Apex and LWC expertise.  
**Context read:** All 7 context files + `framework-patterns.context.md` + `specs/` + `Blogs/salesforce-apex-coding-rules.md` + `Blogs/salesforce-lwc-coding-rules.md`

**Produces:**
- Apex trigger (shell only — no logic in trigger)
- Apex handler class (orchestrates service calls)
- Apex service class (business logic, bulkified, FLS-safe)
- Apex selector class (SOQL queries via `WITH USER_MODE` or explicit FLS)
- LWC component bundle (HTML, JS, meta.xml)
- Permission set (feature-specific, object + field permissions)
- All `meta.xml` deployment files
- Test class (using TestDataFactory, ≥ 95% coverage, no `@SeeAllData`)

**Layer pattern enforced:**
```
Trigger → Handler → Service → Selector
```
No business logic in triggers. No SOQL in handlers. No DML in selectors.

**Anti-patterns blocked:**

| Anti-pattern | Rule |
|---|---|
| SOQL inside loops | Always collect IDs first, then query |
| DML inside loops | Collect in list, DML once |
| Hardcoded IDs/labels | Use Custom Metadata Types |
| `@SeeAllData` in tests | Never — use TestDataFactory |
| Missing FLS | Always use `WITH USER_MODE` or Schema.Field.isAccessible() |
| Missing `without sharing` justification | Require inline comment |

**Hands off to:** `salesforce-security` → `salesforce-reviewer`

---

### `salesforce-security`

**Role:** Security Specialist. Reviews every piece of code for Salesforce security vulnerabilities before QA.  
**Persona:** Application Security Engineer with Salesforce platform expertise.  
**Context read:** `app-overview.context.md`, `data-model.context.md`, `governance-rules.context.md`

**Checks:**
- CRUD/FLS: all DML and field reads verified for user permissions
- SOQL injection: dynamic SOQL checked for injection vectors
- Sharing model: OWD, `with/without sharing`, manual shares
- Secrets: no hardcoded IDs, tokens, credentials, or org-specific data

**Output format:**

```
CLEARANCE: [PASS | PASS WITH NOTES | BLOCKED]

Critical findings (must fix before QA):
  - [finding with file + line]

Medium findings (fix recommended):
  - [finding]

Low findings / notes:
  - [note]
```

**Gate:** No Critical or High findings before handoff to QA. `BLOCKED` rating stops the workflow.

**Hands off to:** `salesforce-reviewer`

---

### `salesforce-reviewer`

**Role:** Tech Lead Code Reviewer. Reviews code quality, architecture adherence, and Salesforce best practices.  
**Persona:** Principal Salesforce Engineer / Tech Lead.  
**Context read:** `framework-patterns.context.md`, `tech-stack.context.md`, `governance-rules.context.md`

**Review checklist (severity-ordered):**

| Severity | Check |
|---|---|
| Critical | DML/SOQL in loops; missing bulkification; `@SeeAllData` |
| Major | Layer pattern violated; hardcoded values; missing error handling |
| Minor | Naming convention drift; `System.debug` overuse; dead code |

**Output format:**

```
REVIEW: [APPROVED | APPROVED WITH COMMENTS | CHANGES REQUESTED]

Critical (block merge):
  - [issue]

Major (fix before QA):
  - [issue]

Minor (non-blocking suggestions):
  - [suggestion]
```

**Produces:** ADO comment "Dev complete — ready for QA" once approved.  
**Hands off to:** `salesforce-qa`

---

## Quality & release chain

### `salesforce-qa`

**Role:** QA Engineer. Generates functional test plans from acceptance criteria and executes them in sandbox.  
**Persona:** Senior QA Engineer with Salesforce functional testing expertise.  
**Context read:** `app-overview.context.md`, `org-state.context.md`, `team-workflow.context.md`, `testing.context.md`

**Produces:**
- Test plan: Happy Path + edge cases + negative scenarios, derived from ADO acceptance criteria
- Browser test execution via Playwright MCP (sandbox)
- Structured defect report: steps to reproduce, expected vs. actual, severity
- UAT test scripts for business stakeholders
- ADO comment: "QA complete — ready for RE" when all scenarios pass

**Gate:** No Critical/High open defects before sign-off. All acceptance criteria scenarios must pass.  
**Hands off to:** `salesforce-deployer`

---

### `salesforce-deployer`

**Role:** Release Engineer. Prepares and executes Salesforce deployments with full validation.  
**Persona:** DevOps Engineer with Salesforce DX and CI/CD expertise.  
**Context read:** `org-state.context.md`, `team-workflow.context.md`, `governance-rules.context.md`

**Produces:**
- `package.xml` manifest from feature context
- Pre-deploy checklist: Code Analyzer → Prettier → ESLint → test run sequence
- `sf project deploy validate` command (dry run with full test suite)
- `sf project deploy start` command (actual deployment)
- ADO state update: "Deployed — monitoring"
- Rollback scope and commands if needed

**Pre-deploy checklist (in order):**
1. `npm run scan` — PMD Code Analyzer
2. `npm run prettier:verify` — format check
3. `npm run lint` — ESLint
4. `sf apex run test` — confirm tests pass with ≥ 95% coverage
5. `sf project deploy validate` — dry-run to target org

**Hands off to:** Post-deploy health check (manual or `salesforce-monitor`)

---

## Support agents

### `salesforce-debugger`

**Role:** Production Support Engineer. Diagnoses runtime errors, exceptions, and governor limit breaches from debug logs.  
**Persona:** Senior Salesforce Support Engineer with deep platform debugging expertise.  
**Context read:** `org-state.context.md`, `data-model.context.md`, `framework-patterns.context.md`

**Produces:**
- Root cause hypothesis from stack trace + debug log analysis
- SOQL/DML error analysis: Too Many SOQL Rows, Max DML, lock errors
- LWC console error diagnosis: render errors, wire failure
- Fix recommendation with test case to reproduce

**Hands off to:** `salesforce-developer` (for the fix)

---

### `salesforce-agentforce`

**Role:** AI Feature Specialist. Designs and builds Agentforce agents, Prompt Builder templates, and Einstein Copilot features.  
**Status:** Available — not yet validated against real use cases.

**Produces:**
- Agentforce agent structure and action design
- Prompt Builder template design and testing
- Einstein Copilot action and topic configuration

---

### `salesforce-setup`

**Role:** Framework Configuration Wizard. Sets up or refreshes org-specific context files.  
**When to use:** First-time setup, sprint rollover, new integration added, schema changed, governance rule updated.

**Modes:**
- **Mode A (Initial setup):** Guided setup of all 7 context files via questions about the org
- **Mode B (Targeted update):** Updates one specific context file (e.g., new custom object added)
- **Mode C (Sprint rollover):** Reviews all files for staleness, updates sprint context in memory files, prunes resolved issues

**Staleness check:** Flags any context file not updated in the last 14 days (one sprint cycle).

---

## Retired agents (not in active use)

These agents were designed but retired or superseded:

| Agent | Reason retired |
|---|---|
| `salesforce-documenter` | Capabilities absorbed into `salesforce-developer` and `salesforce-planner` |
| `salesforce-ideate` | Capabilities absorbed into `salesforce-architect` |
| `salesforce-monitor` | Designed but not validated — referenced in architecture; needs Flosum + production MCP wiring |
| `salesforce-org-comparator` | Designed but not validated — routing now goes to `salesforce-deployer` |
| `salesforce-sync` | Designed but not validated |
| `salesforce-unit-tester` | Merged into `salesforce-developer` workflow |

---

## How to extend the agent set

To add a new agent or modify an existing one:

1. Open a GitHub issue: `"Agent improvement: [agent-name] — [what and why]"`
2. Tech Lead assesses: gap vs. refinement; routing impact; handoff impact
3. Apply change in a feature branch; run against at least one use case to confirm improvement
4. Tech Lead approves and merges; update `BACKLOG.md`
5. Tag a framework release if agents, skills, or context files were affected

See the full change process in [Decisions](decisions.md).

---

## Related pages

- [Solution Architecture](solution-architecture.md) — how the knowledge layer feeds agents
- [SDLC Workflow](sdlc-workflow.md) — the agent chain in practice
- [Technical Architecture](technical-architecture.md) — toolchain agents depend on
