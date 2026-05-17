# Salesforce SDLC Agent Framework

> A GitHub Copilot agent system that automates the full Salesforce development lifecycle — from story planning through production deployment — using 13 specialist AI agents grounded in org-specific context.

**Status:** Pilot — 1 of 8 use cases validated (UC-001 Account Duplicate Detection)  
**Repo:** `D:\Tech Work\PersonalOrg\DevGithub` (local) / GitHub remote TBD  
**Last updated:** May 2026

---

## What is this?

Instead of a single general-purpose AI assistant, this framework provides **13 specialist agents** — each owning one phase of the Salesforce SDLC. Every agent reads your org's specific context files, coding standards, and reference material before acting. The result is consistent, org-correct output across planning, development, testing, security review, QA, and deployment.

Think of it as a virtual Salesforce team where each role has a dedicated AI specialist, all sharing the same knowledge base about your org.

---

## Pages in this project

| Page | What it covers |
|---|---|
| [Objective](objective.md) | Problem statement, what this solves, success criteria |
| [Business Architecture](business-architecture.md) | Personas, value streams, capability model, roadmap |
| [Solution Architecture](solution-architecture.md) | 3-layer system, data flow, knowledge infrastructure |
| [Agent Design](agent-design.md) | All 13 agents — role, inputs, outputs, handoffs |
| [Technical Architecture](technical-architecture.md) | Salesforce DX, toolchain, environments, quality gates |
| [SDLC Workflow](sdlc-workflow.md) | End-to-end: idea → deploy, with gates and artefacts |
| [Decisions](decisions.md) | Key architectural decisions and their rationale |
| [Rollout Plan](rollout-plan.md) | Step-by-step plan — hosting, pre-rollout fixes, phased adoption |

---

## Onboarding quickstart

**First 30 minutes for a new team member:**

### Step 1 — Get access and set up

```bash
# Clone the repo
git clone <repo-url> && cd DevGithub

# Install dependencies
npm install

# Authenticate to Salesforce org
sf org login web --alias dev-org

# Verify connection
sf org display --target-org dev-org
```

Prerequisites: Node.js 18+, Salesforce CLI (`sf`), VS Code with GitHub Copilot extension.

### Step 2 — Understand the structure

```
.github/
  agents/        ← 13 agent definitions (the AI specialists)
  context/       ← 7 org-knowledge files (read by every agent)
  skills/        ← domain reference files per agent
  specs/         ← code generation blueprints
  pilot/         ← validated use cases (UC-001 through UC-008)

force-app/       ← Salesforce source code (Apex, LWC, metadata)
```

### Step 3 — Invoke your first agent

Open GitHub Copilot Chat in VS Code and type:

```
@salesforce-orchestrator I need to [describe what you're trying to do]
```

The orchestrator reads your intent and routes you to the right specialist. You don't need to know which agent to use — just describe the task.

### Step 4 — Read the validated use case

UC-001 (Account Duplicate Detection) is the only fully-completed end-to-end walkthrough. Read it before starting real work:

- Spec: `.github/pilot/use-cases/UC-001-account-duplicate-detection.md`
- Simulation: `.github/pilot/simulation/UC-001-simulation.md` — exact prompts and expected outputs per SDLC phase

---

## Agent quick reference

| What you want to do | Use this agent |
|---|---|
| Not sure / general question | `@salesforce-orchestrator` |
| Break down a story, create ADO work item | `@salesforce-planner` |
| Design options, architecture decision | `@salesforce-architect` |
| Write Apex, LWC, triggers, metadata | `@salesforce-developer` |
| Review security (CRUD/FLS, injection, sharing) | `@salesforce-security` |
| Code review (naming, bulkification, patterns) | `@salesforce-reviewer` |
| Write or run functional tests | `@salesforce-qa` |
| Deploy to org (package.xml, validate, deploy) | `@salesforce-deployer` |
| Debug an exception or error log | `@salesforce-debugger` |
| Agentforce, Prompt Builder, Einstein Copilot | `@salesforce-agentforce` |

---

## Two hard gates (do not skip)

1. **Dev → QA gate:** Tests pass (≥ 95% coverage), security review clean (no Critical/High findings), code review done. ADO comment: "Dev complete — ready for QA."
2. **QA → Deploy gate:** All acceptance criteria scenarios pass, no open Critical/High defects. ADO comment: "QA complete — ready for RE."

---

## Current state (May 2026)

| Area | Status |
|---|---|
| Agent architecture | Production-ready |
| Knowledge layer (context + skills + specs) | Populated with demo org content — needs real org data |
| Developer + Security + Reviewer + Deployer agents | Validated on UC-001 |
| QA browser testing (Playwright) | Architecture ready — needs clean end-to-end re-run |
| CI/CD pipeline | GitHub Actions PR gate active; Flosum not yet integrated |
| Pilot coverage | 1 of 8 use cases — needs ≥ 4 more for sign-off |
| Team usage | Single developer pilot — not yet rolled out to team |
