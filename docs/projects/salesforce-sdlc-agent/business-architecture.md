# Business Architecture

## Personas

| Persona | Role in SDLC | Primary pain without the framework | What the framework gives them |
|---|---|---|---|
| **Salesforce Developer** | Writes Apex, LWC, and metadata | Time lost on boilerplate, context-switching, inconsistent feedback | Code generation grounded in org patterns; instant feedback on security, quality, and tests |
| **QA Engineer** | Validates features against acceptance criteria | Receives incomplete handoffs; writes test plans from scratch every time | Structured test plans generated from acceptance criteria; browser test automation via Playwright |
| **Release Engineer (RE)** | Manages deployment pipeline | Manual, memory-dependent pre-deploy checks; unclear what's being deployed | Automated package.xml; pre-deploy checklist; validated sf deploy commands |
| **Tech Lead / Architect** | Sets standards, reviews decisions, owns architecture | Reviews are reactive; standards drift between developers | Coding standards enforced at agent level; architecture decisions surfaced before code is written |
| **Salesforce Admin / Business Analyst** | Owns requirements and acceptance criteria | Stories handed to dev with missing detail; no shared language for Salesforce specifics | Structured story breakdown with Salesforce-specific acceptance criteria format |
| **Engineering Manager** | Owns team velocity and quality | No visibility into where stories stall; quality metrics are anecdotal | ADO audit trail per SDLC phase; pilot metrics (routing accuracy, coverage, defect rate) |

---

## Value Streams

### Value Stream 1 — Feature Delivery (Developer → QA → RE)

The primary flow: a story goes from ADO backlog to production deployment with agent assistance at every phase.

```
Story created in ADO
      │
      ▼  [salesforce-planner]
Story decomposed — Salesforce-specific acceptance criteria defined
      │
      ▼  [salesforce-architect]         ← optional: medium/high complexity only
Design evaluated — trade-offs considered, ADR captured if needed
      │
      ▼  [salesforce-developer]
Code generated: Trigger · Handler · Service · Selector · LWC · meta.xml
Test class generated: ≥ 95% coverage · sf apex run test passes
      │
      ▼  [salesforce-security]
CRUD/FLS · SOQL injection · sharing model reviewed
No Critical/High findings before proceeding
      │
      ▼  [salesforce-reviewer]
Bulkification · naming · layer adherence · anti-patterns checked
ADO comment: "Dev complete — ready for QA"        ← Gate 1
      │
      ▼  [salesforce-qa]
Test plan generated from acceptance criteria
Scenarios executed in sandbox (browser via Playwright where applicable)
ADO comment: "QA complete — ready for RE"         ← Gate 2
      │
      ▼  [salesforce-deployer]
package.xml generated · pre-deploy checklist run · sf validate · sf deploy
ADO comment: "Deployed — monitoring"
      │
      ▼  [post-deploy health check]
Governor limits · error logs · anomaly detection
ADO work item: Done
```

**Cycle time target:** 30% reduction from baseline once fully adopted.

---

### Value Stream 2 — Defect Resolution (Bug → Root Cause → Fix → Re-deploy)

Abbreviated flow for production bugs and hotfixes.

```
Defect logged in ADO
      │
      ▼  [salesforce-debugger]
Root cause identified from debug log / exception
Fix scope defined
      │
      ▼  [salesforce-developer]
Fix generated and tested
      │
      ▼  [salesforce-security + salesforce-reviewer]
Fast-track review (abbreviated — defect context)
      │
      ▼  [salesforce-deployer]
Hotfix deployed · ADO work item: Done
```

---

### Value Stream 3 — Context & Knowledge Management (Ongoing, per sprint)

Keeps the knowledge layer fresh so agents remain org-correct over time.

```
Sprint starts
      │
      ▼  [salesforce-setup — Mode C]
Context files reviewed for staleness (14-day flag)
Sprint context updated in .github/memory/sprint-context.memory.md
      │
      (Throughout sprint)
Known issues · team decisions · new patterns → captured in memory files
      │
Sprint ends
      │
      ▼  [salesforce-setup — Mode C: Sprint rollover]
Sprint retrospective notes → sprint-context.memory.md
Resolved issues pruned from known-issues.memory.md
Context files updated for next sprint
```

**Rule:** No context file should be more than 14 days (one sprint) stale. `@salesforce-setup` runs a staleness check at sprint start.

---

## Capability Model

### L1 — Capability Areas

| # | Capability area | SDLC phase | Agent | Status |
|---|---|---|---|---|
| C1 | Planning & Story Decomposition | Plan | `salesforce-planner` | Available |
| C2 | Architecture & Design | Design | `salesforce-architect` | Available |
| C3 | Code Generation | Develop | `salesforce-developer` | **Validated** |
| C4 | Automated Testing | Test | `salesforce-developer` / `salesforce-unit-tester` | Available — partially validated |
| C5 | Security Review | Review | `salesforce-security` | **Validated** |
| C6 | Code Quality Review | Review | `salesforce-reviewer` | **Validated** |
| C7 | Functional QA | QA | `salesforce-qa` | Available — partially validated |
| C8 | Release Management | Deploy | `salesforce-deployer` | **Validated** |
| C9 | Production Operations | Monitor | *(post-deploy monitoring)* | Designed — not validated |
| C10 | Debugging & Root Cause | Support | `salesforce-debugger` | Available |
| C11 | Agentforce / AI Features | Develop | `salesforce-agentforce` | Available — not validated |
| C12 | Knowledge & Context Management | Cross-cutting | `salesforce-setup` | Available — partially lived-in |
| C13 | Framework Governance | Cross-cutting | *(process, not an agent)* | Designed — not implemented |

---

## Current State vs Target State

| Dimension | Current State (May 2026) | Target State (Full Adoption) |
|---|---|---|
| Scope | Personal developer org — 1 developer pilot | Real org, all developers, full team |
| Validated use cases | 1 of 8 (UC-001) | All SDLC phases exercised end-to-end |
| Active agents | 11 defined; 6 validated; 5 designed only | All 11 validated against real team stories |
| CI/CD | GitHub Actions PR gate (PMD + ESLint) active; Flosum not integrated | Full pipeline: GitHub Actions + Code Analyzer + sf validate + Flosum |
| Team usage | Zero — single developer only | Every developer using agents on every story |
| Context files | Populated with demo Sales Cloud content | Populated with real org data; refreshed each sprint |
| Metrics | Not instrumented | Cycle time, defect rate, coverage, routing accuracy — tracked and reviewed |
| Governance | Not defined | Framework change process, versioning, quarterly review active |

---

## Roadmap

### Phase 1 — Foundation (Weeks 1–6)
*Goal: Framework ready for real team use. One real story delivered end-to-end.*

| Work item | Owner | Notes |
|---|---|---|
| Re-point context files at real org | Tech Lead | Replace demo content with real org data via `@salesforce-setup` |
| Validate all agents against real org | Tech Lead | Run each agent on a real story; fix any org-specific gaps |
| Deliver first real story end-to-end | One developer (shadowed) | Pick a low-complexity story; document learnings |
| Confirm CI/CD gates active | RE / Tech Lead | PR gate running on all PRs |
| Write team onboarding guide | Tech Lead | How to pick the right agent, how to invoke, what to expect |
| Baseline metrics | Manager / Tech Lead | Measure current cycle time per story before framework changes it |

**Exit criteria:** One real story delivered from story → deploy. CI/CD gates active. Onboarding guide written.

---

### Phase 2 — Team Adoption (Weeks 7–16)
*Goal: All developers using the framework on every story. Real handoffs working.*

| Work item | Owner | Notes |
|---|---|---|
| Onboard all developers (pair sessions) | Tech Lead | Each developer does one story with agent assistance, shadowed by Tech Lead |
| Multi-developer workflow validation | Tech Lead + Dev team | Two developers on one feature — test real handoff boundaries |
| QA and RE agents handed to QA/RE team | Tech Lead → QA/RE | QA Engineer owns `@salesforce-qa`; RE owns `@salesforce-deployer` |
| ADO workflow integrated | RE | Custom states "Ready for Testing" / "Ready for UAT" added |
| Flosum pipeline integration | RE | Wire deployer agent to Flosum promotion flow |
| Metrics tracking activated | Manager | Cycle time, coverage, routing accuracy, defect rate — in dashboard |
| Sprint retrospective → context update pattern | Tech Lead | Every sprint: context files reviewed, memory files updated |
| Browser QA (Playwright) — full sandbox run | QA Engineer | Execute all browser-capable scenarios in shared sandbox |

**Exit criteria:** All developers using agents. QA/RE roles using their agents. Metrics tracking live.

---

### Phase 3 — Governance & Scale (Weeks 17–26)
*Goal: Framework has its own change process, versioning, and measurably improves team output.*

| Work item | Owner | Notes |
|---|---|---|
| Framework versioning | Tech Lead | Tag releases of `.github/` layer. Changelog maintained. |
| Change control process | Tech Lead | How a developer proposes an agent change; review, approval, test before merge |
| Quarterly framework review | Tech Lead + Manager | Review metrics, identify gaps, update roadmap |
| Adoption health dashboard | Manager | Coverage trend, cycle time trend, defect escape rate |
| Agentforce / AI capabilities validation | Developer + Tech Lead | Exercise `@salesforce-agentforce` on first real AI feature |
| Production monitoring activation | RE + Tech Lead | Post-deploy governor limit baseline + anomaly detection |
| New team member onboarding test | Tech Lead | Onboard a new developer using only the written guide — identify gaps |
| Enterprise distribution assessment | Tech Lead + Manager | MCP server packaging, private registry, or GitHub template repo |

**Exit criteria:** Versioning and change control active. Metrics show measurable improvement. Governance review cadence running.

---

## Governance

### What is governed

| Layer | What can change | Owner |
|---|---|---|
| Agent definitions (`.github/agents/`) | Role, prompts, routing logic, handoffs | Tech Lead |
| Context files (`.github/context/`) | Org-specific facts | Context File Owner per file |
| Knowledge layer (`.github/skills/`, `.github/specs/`) | Reference material, coding rules, spec blueprints | Tech Lead + Senior Developers |
| CI/CD pipeline (`.github/workflows/`) | Quality gates, validation steps | Release Engineer |
| Memory files (`.github/memory/`) | Sprint context, decisions, known issues | All team members — sprint cadence |

### Context file ownership

| File | Owner | Review trigger |
|---|---|---|
| `app-overview.context.md` | Tech Lead | New cloud/feature adopted; major process change |
| `data-model.context.md` | Tech Lead / Senior Developer | Any new custom object, field, or relationship deployed |
| `tech-stack.context.md` | Tech Lead | Toolchain change, new managed package, platform version |
| `framework-patterns.context.md` | Tech Lead | New canonical pattern introduced; existing pattern changed |
| `team-workflow.context.md` | Engineering Manager | Team process change, branching strategy update |
| `integrations.context.md` | Release Engineer | New named credential, external system, MCP server |
| `permission-matrix.context.md` | System Admin / Senior Developer | New permission set, profile change, feature rollout |
| `governance-rules.context.md` | Tech Lead | New compliance requirement, security rule, governance gate |

### Metrics targets (Phase 2 onwards)

| Metric | Target | How measured |
|---|---|---|
| Cycle time per story (story → deploy) | 30% reduction from baseline | ADO date fields |
| Apex test coverage | ≥ 95% on all new classes | `sf apex run test` output |
| Agent routing accuracy | ≥ 80% correct on first try | Manual log in pilot metrics file |
| Defect escape rate (post-QA-sign-off) | < 10% of stories | ADO defect tracking |
| Context file freshness | 0 files > 14 days stale | `@salesforce-setup` staleness check |

---

## Related pages

- [Objective](objective.md) — problem statement and success criteria
- [Solution Architecture](solution-architecture.md) — how the three layers work
- [Agent Design](agent-design.md) — each agent's role in detail
- [SDLC Workflow](sdlc-workflow.md) — step-by-step feature delivery
