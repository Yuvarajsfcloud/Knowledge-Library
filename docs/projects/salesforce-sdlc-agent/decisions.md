# Decisions

Key architectural decisions made during the design and build of the framework, with their context and rationale. Preserving these prevents revisiting settled questions and explains why things are the way they are to a new team member.

---

## D-001 — Specialist agents per SDLC phase, not a single general-purpose agent

**Decision:** Build 13 specialist agents (one per SDLC phase) rather than one general-purpose Salesforce agent.

**Context:** The first instinct when building an AI coding assistant is a single agent with a broad system prompt. This is simple to build but produces inconsistent output — a general agent context-switches between roles, loses the depth of any one phase, and produces code that is neither security-reviewed nor QA-focused.

**Why specialist agents:**
- Each phase (planning, coding, security, QA, deploy) requires fundamentally different knowledge, persona, and output format
- Role specialisation mirrors how real teams work — a developer and a security reviewer have different mental models
- Agents can be updated, improved, or replaced independently without affecting other phases
- Handoff boundaries are explicit in YAML frontmatter — the system enforces them, humans don't have to remember them

**Trade-off accepted:** More complex to maintain (13 files vs. 1). Mitigated by the agent change process and BACKLOG.md tracking.

---

## D-002 — Context files as local Markdown, not in-prompt context

**Decision:** Store org-specific knowledge in 7 local Markdown context files (`.github/context/`) rather than embedding context in every agent's system prompt.

**Context:** Org-specific facts (data model, team workflow, governance rules) change over time. If embedded in agent prompts, every change requires editing multiple agent files. If stored as separate files, agents read them on demand.

**Why local files:**
- Separation of concerns: agents define *how* to work; context files define *what* they're working on
- One context update propagates to all agents that read it without touching agent definitions
- Context files can be owned by different people (Tech Lead, RE, Admin) without needing to understand the agent layer
- Context grows sprint-over-sprint without touching agent logic

**Trade-off accepted:** Context must be kept fresh manually. Mitigated by `@salesforce-setup` staleness detection (14-day flag) and sprint rollover process.

---

## D-003 — GitHub Copilot as the agent runtime (not a custom framework)

**Decision:** Build agents as GitHub Copilot agent mode definitions rather than building a custom agent orchestration framework.

**Context:** Custom agent frameworks (LangChain, CrewAI, AutoGen) offer more programmatic control but require infrastructure, maintenance, and developer expertise to operate. GitHub Copilot agent mode is already available to teams using VS Code + Copilot.

**Why Copilot agent mode:**
- Zero infrastructure — no server, no deployment, no API keys to manage
- Developers already have GitHub Copilot — no new tool adoption required
- Agent definitions are Markdown files — readable, editable by non-engineers
- Copilot handles context window management, tool calls, and MCP integration

**Trade-off accepted:** Tied to GitHub Copilot availability and pricing. Cannot run headlessly or in CI pipelines. Agents require VS Code for invocation. Mitigated by the CI/CD layer (GitHub Actions) which runs quality gates independently of the agent layer.

---

## D-004 — Two hard gates (not optional checkpoints)

**Decision:** Enforce exactly two mandatory gates: Dev → QA (ADO comment required) and QA → Deploy (ADO comment required). All other handoffs are soft.

**Context:** Without gates, stories flow informally — QA picks up incomplete features, RE deploys untested code, and the ADO trail is empty. Too many gates slow the team down with process overhead.

**Why two gates:**
- Dev → QA gate prevents QA from starting with unsecured, unreviewed code — the highest-leverage quality checkpoint
- QA → Deploy gate prevents deploying features that haven't passed functional testing — the highest-risk point in the SDLC
- Both gates are observable via ADO (comment + state transition) — no ambiguity about whether a gate was passed
- ADO comment creates an immutable audit trail without additional tooling

**Trade-off accepted:** Teams can circumvent gates if ADO discipline breaks down. Mitigated by ADO state machine (states locked until comment added) and Engineering Manager visibility via ADO reporting.

---

## D-005 — Trigger → Handler → Service → Selector as the canonical layer pattern

**Decision:** All Apex code must follow the four-layer pattern: Trigger (shell) → Handler (orchestration) → Service (logic) → Selector (queries). No exceptions.

**Context:** Without a canonical pattern, each developer structures Apex differently — some put logic in triggers, some skip selectors, some mix SOQL and DML. This creates inconsistency that's hard to review, test, and maintain.

**Why this pattern:**
- Trigger shell with no logic makes bulkification and testing straightforward
- Handler separates trigger plumbing from business decisions
- Service owns business logic — testable in isolation, reusable across triggers and flows
- Selector centralises SOQL — queryable with `WITH USER_MODE`, reusable across services

**Enforced by:** `@salesforce-developer` (generates correct structure), `@salesforce-reviewer` (flags violations), pre-commit hooks (Prettier enforces formatting consistency).

**Trade-off accepted:** More boilerplate for simple features. A one-field update that could be a single-line trigger now has four classes. Accepted because the pattern is consistent — every developer can navigate any code without learning a new structure.

---

## D-006 — MCP for live context; local files for stable context

**Decision:** Use MCP server calls for real-time operational context (sprint state, org metadata, production errors) and local Markdown files for stable context (patterns, governance, data model).

**Context:** Agents need two kinds of information: things that change constantly (which stories are in progress, what's deployed) and things that change infrequently (coding standards, governance rules). Fetching everything via live calls is slow and fragile. Storing everything locally means stale context for operational data.

**Why the split:**
- Stable context (patterns, governance) is safe in files — it changes infrequently and updates are deliberate
- Operational context (sprint work items, deployed metadata) changes daily — a local copy is wrong within hours
- Default to local (fast, no network) and go live only for operational questions

**MCP servers wired:** Azure DevOps (sprint state), Salesforce DX (org metadata, test runs), Playwright (browser QA), Work IQ (M365 / Teams context).

**Trade-off accepted:** Flosum (deployment pipeline state) and Azure Monitor (production runtime) are not yet wired — workaround is manual updates to `org-state.context.md`.

---

## D-007 — sf CLI + GitHub Actions for CI/CD (not Flosum-native pipeline)

**Decision:** Use Salesforce CLI (`sf project deploy`) and GitHub Actions for the CI/CD pipeline rather than building the pipeline inside Flosum.

**Context:** The team uses Flosum for release management (branch tracking, promotion). Building the entire CI/CD pipeline inside Flosum means the agents would need to know Flosum's API. Using sf CLI keeps the agent layer tool-agnostic.

**Why sf CLI + GitHub Actions:**
- `sf project deploy validate` and `sf project deploy start` are tool-agnostic — work against any org
- GitHub Actions provides a standard CI gate (PMD + ESLint + Prettier) independent of Flosum
- `@salesforce-deployer` generates commands that work regardless of whether Flosum is in use

**Open decision:** When Flosum is fully adopted, a Flosum MCP server would allow `@salesforce-deployer` to query live pipeline state. Assess at Phase 2 (see [Business Architecture — Open Decisions](business-architecture.md)).

---

## D-008 — Framework versioned separately from application code

**Decision:** The framework (`.github/` layer — agents, context, skills) is versioned with its own release tags (`framework-v1.0.0`), separate from the Salesforce application code.

**Context:** The framework and the application evolve at different rates. An agent improvement doesn't constitute a Salesforce release. A schema change in `force-app/` doesn't require a framework version bump.

**Why separate versioning:**
- Clear signal to the team when the framework changes vs. when application code changes
- Enables rollback of framework changes independently of app code
- Changelog in `.github/CHANGELOG.md` tracks agent/context/skill changes only

**Version tiers:**
- Patch (x.x.1): Agent prompt fix, context correction
- Minor (x.1.x): New capability, new agent, new skill or spec
- Major (1.x.x): Architecture change, breaking handoff change, new layer

---

## Open decisions (not yet resolved)

| # | Decision | Options | Target phase |
|---|---|---|---|
| OD-1 | CI/CD pipeline — keep sf CLI or adopt Flosum-native | Keep sf CLI for now; add Flosum MCP when team adopts it fully | Phase 2 |
| OD-2 | Context file population — Tech Lead alone or collaborative per-file owner | Collaborative: each file owner populates their section | Phase 1 |
| OD-3 | Framework distribution — Git repo clone vs. hosted MCP server | Git repo for now; MCP server assessment in Phase 3 | Phase 3 |
| OD-4 | Agentforce use cases — when does this become a priority? | After core SDLC coverage is proven | Phase 3 |
| OD-5 | Production monitoring tool — Splunk, Datadog, native Salesforce? | To confirm with team | Phase 2 |

---

## Related pages

- [Solution Architecture](solution-architecture.md) — the architecture these decisions shaped
- [Business Architecture](business-architecture.md) — roadmap and governance model
- [Objective](objective.md) — the goals that drove these decisions
