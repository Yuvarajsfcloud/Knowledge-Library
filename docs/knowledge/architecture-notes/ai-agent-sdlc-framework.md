# AI Agent Framework for Salesforce SDLC

> **Type:** Architecture note — design decisions and operating model
> **Platform:** GitHub Copilot agent mode (VS Code)
> **Last updated:** 2026-06-06

---

## What This Is

A multi-agent framework where each SDLC role (architect, planner, developer, reviewer, QA, deployer) is implemented as a GitHub Copilot custom agent with its own `.github/agents/<role>.agent.md` instruction file. A central orchestrator routes work to the correct agent based on request type.

The framework is documented in full at [Salesforce SDLC Agent Framework — Projects](../../projects/salesforce-sdlc-agent/index.md). This note captures the architecture decisions behind how the framework is structured.

---

## Design Principles

### 1. Context over chat memory

Agents cannot share chat context across VS Code sessions. Every handoff must survive a session boundary. The solution: agents write to and read from durable context files (`.github/context/`) and, in team scenarios, Azure DevOps work item comments.

A context file is a structured `.md` document that an agent reads at the start of every session — `app-overview.context.md`, `integrations.context.md`, `data-model.context.md`, etc. They are the single source of truth for project state.

### 2. Role separation enforced by instruction, not by access control

In a multi-person team, the developer cannot read the architect's TA from chat — they were in different sessions. ADO comment is the handoff medium. In single-session autonomous mode, chat context is the handoff medium. Both work; the framework detects which mode is active.

### 3. Orchestrator routes — specialists execute

The orchestrator (`salesforce-orchestrator.agent.md`) classifies requests into tiers:

| Tier | Route to | Signals |
|---|---|---|
| Tier 1 — Architect first | `salesforce-architect` | New external system, ERP, >10k records, new Named Credential |
| Tier 2 — Planner first | `salesforce-planner` | Enhancement to existing capability |
| Tier 3 — Straight to specialist | Keyword table | Bug fix, code review, security review, QA, deploy |

Without this tier check, keyword matching misfires. "Sync" without a tier gate routed to developer — wrong; the architect must evaluate whether the sync is a new external system integration first.

### 4. Agents must be tested end-to-end, not reviewed statically

A static review of agent instruction files does not reveal handoff gaps, missing context files, or routing failures. An end-to-end simulation — one prompt to the orchestrator, all agents completing their work without user intervention — is the only reliable way to find gaps.

The 2026-05 simulation found 19 gaps that no static review had caught:

- Missing Tier 1/2/3 routing block in orchestrator
- Architect had no Mode 1 / Mode 2 split
- Architect had no AS-002 (middleware mandate) check
- Developer had no TA lookup step
- Critical batch pattern missing from `framework-patterns.context.md`
- Deployer checklist missing Named Credential runbook and Scheduled Batch post-deploy steps

---

## Dual-Mode Operation

The framework runs in two modes:

| Mode | When | Handoff medium | ADO required |
|---|---|---|---|
| **Single-session autonomous** | One chat session, one person gives orchestrator a comprehensive prompt | Chat context (each agent's output is visible to the next) | No — skip ADO post/fetch |
| **Multi-person team** | Real team, each role runs in their own VS Code session | ADO work item comments + context files on disk | Yes — architect posts TA as ADO comment; developer fetches it |

The agents detect which mode they're in:

> "If TA visible in current conversation context → single-session mode (use it directly). If not → fetch from ADO. If neither → stop and ask."

---

## Context File Architecture

```
.github/
  context/
    app-overview.context.md        ← business domain, team contacts
    data-model.context.md          ← objects, fields, relationships
    tech-stack.context.md          ← env aliases, tools, sandbox strategy
    integrations.context.md        ← external systems, patterns, Named Credentials
    framework-patterns.context.md  ← reusable patterns (batch, trigger-handler, etc.)
    governance-rules.context.md    ← R-xxx rules: enforced constraints
    org-state.context.md           ← which components are in sync with org
    testing.context.md             ← coverage baseline, test status
    team-workflow.context.md       ← Flosum gates, approval process
```

Context files are read by agents at session start. They survive session boundaries. When an architect introduces a new integration pattern, they update `integrations.context.md` and `framework-patterns.context.md` before handing off. The developer reads those files cold in the next session and has the full context.

---

## Lessons from Building This

1. **Agent instructions behave like a junior team member's onboarding doc** — the more precise and complete the instruction, the more reliably the agent executes. Vague instructions produce inconsistent output; specific checklists produce consistent output.

2. **Handoff gaps are the most common failure mode** — a single agent working well in isolation can still break the pipeline when the thing it relies on (a context file, an ADO comment, a governance rule) wasn't written by the preceding agent.

3. **Simulation is the integration test for agent frameworks** — write one comprehensive prompt, instruct the orchestrator to make all decisions autonomously, and observe. Every gap surfaces as either a wrong decision or a stopped agent waiting for information that should have been available.

4. **npm CLI as installer is the right distribution model for agent files** — Copilot agents cannot be loaded from node_modules at runtime (they must exist at `.github/agents/`), but `npx salesforce-agents init` as a scaffolding tool that copies files into the target repo is the correct model (analogous to `create-react-app`).

---

## Related Pages

- [Salesforce SDLC Agent Framework — full documentation](../../projects/salesforce-sdlc-agent/index.md)
- [ERP Account Sync — case study that drove the most framework improvements](../../case-studies/integration/erp-account-sync.md)
- [API-Sourced Batch Apex Pattern](api-sourced-batch-apex.md) — the critical pattern missing before the simulation
