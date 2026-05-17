# Rollout Plan

> A step-by-step plan to validate, distribute, and confidently adopt the Salesforce SDLC Agent Framework across a real Salesforce development team.
>
> **Total calendar time to confident team rollout:** 14–16 weeks from start.  
> **Critical dependency:** Context files populated against a real org (Week 1) — everything else depends on this.

---

## Hosting & Distribution Strategy

### Architecture reality

The agents are GitHub Copilot agent mode definitions — Markdown files that run inside each developer's VS Code instance. There is no running server, no API endpoint, no process to keep alive. The "hosting" question is therefore really two questions: how do developers get the agent/context files, and what does a future server-hosted model look like for multi-team enterprise use.

### Distribution options

| Option | How it works | Infrastructure | Best for | Verdict |
|---|---|---|---|---|
| **A — Git clone (current)** | Each developer clones the repo. Updates via `git pull`. | GitHub / ADO repo | Solo or small team, single org | **Now — works today** |
| **B — ADO / GitHub Template Repository** | Framework is a template. Each Salesforce team creates their own repo. Agent definitions shared; context files org-specific. | One template repo | Multiple independent teams, each with their own org | **Recommended for Phase 2** |
| **C — npm CLI (`npx salesforce-agents init`)** | CLI copies agent files, skill files, spec files, and empty context templates into target repo. Team runs `@salesforce-setup` to populate context. Versioned via npm registry. | npm registry (public or private) | Self-service onboarding, versioned upgrades, no manual file copying | **Recommended for Phase 2–3** |
| **D — Git Submodule** | Agent definitions as a shared submodule | Two repos | Shared agents without forking | Not recommended — `.github/` submodules are fragile |
| **E — GitHub Copilot Extension (private)** | Agents packaged as a private Copilot Extension. No repo clone needed. | GitHub App + hosting | Large enterprise, centralised platform team | Phase 4 future state |
| **F — Private MCP Server** | Convert agents to MCP tools, host on VM/server. All developers connect via URL. | Azure VM or App Service | Multi-team enterprise, central platform team | Phase 4 alternative |

### Recommended three-horizon strategy

**Horizon 1 — Now → Phase 2: Git clone via Azure DevOps Repos**

Move the repo to the organisation's ADO. Each developer clones it. Updates to agent definitions are PRs to `main`. No infrastructure needed beyond existing ADO licence.

**Horizon 2 — Phase 2 → Phase 3: Template Repository + npm CLI**

Two parallel options — use whichever fits the team's workflow:

- **Template Repository:** When a second Salesforce team wants to adopt the framework, they create a new repo from the template and run `@salesforce-setup` to populate their own context files. The platform team maintains the template and releases improvements via upstream PRs.
- **`npx salesforce-agents init`:** Publish the framework as an npm package. A new team runs one command and gets the full agent structure copied into their existing Salesforce DX repo. Context file templates are empty shells — `@salesforce-setup` fills them. Upgrades via `npm update`. No fork management needed.

The npm CLI is the better long-term option if multiple teams are adopting at different times — each team gets a versioned copy and can upgrade independently.

**Horizon 3 — Phase 3+: Private MCP Server**

When 5+ teams make maintaining N copies unsustainable, convert agent logic to an MCP server. Teams connect to a central URL; VS Code passes their org's context files as configuration. Infrastructure: Azure App Service (B2 tier, ~£50/month), lightweight Node.js, stateless. **Do not build Horizon 3 now** — build it when the pain of version drift is real.

---

## Pre-Rollout Fixes

These are blockers that cause silent failures. All must be resolved before any developer uses the framework on a real org.

### Fix 1 — Resolve R-009 / sf CLI conflict

**Problem:** R-009 blocks direct `sf CLI` deploy to PROD, but the deployer agent generates `sf project deploy start` commands unconditionally. Agent violates its own governance rule when pointed at a real production org.

**Fix:** Update `governance-rules.context.md` R-009 to add environment condition:

```
IF target org type = Developer Edition OR Sandbox → PERMIT sf project deploy start (validate-first)
IF target org type = Production → BLOCK direct sf CLI, REQUIRE Flosum pipeline
```

Add `org-type` field to `org-state.context.md`. Deployer agent reads it before generating commands.

**Owner:** Tech Lead | **Time:** 2 hours

---

### Fix 2 — Distill the 2,500-line coding rules

**Problem:** Developer agent bulk-loads 1,047 lines (Apex) or 1,505 lines (LWC) before every code generation task. Critical rules in the middle of the file are deprioritised by the LLM (the "lost in the middle" problem). Unvalidated at scale.

**Fix:** Create priority rule files — top 20 most-violated, highest-consequence rules per language. Agent loads priority file by default; full file available via `search/codebase` for edge cases.

```
.github/Blogs/
  apex-priority-rules.md      ← NEW: top 20 rules, loaded by default
  salesforce-apex-coding-rules.md  ← existing: full reference, searched on demand
  lwc-priority-rules.md       ← NEW: top 20 rules
  salesforce-lwc-coding-rules.md   ← existing: full reference
```

**Owner:** Tech Lead | **Time:** 3 hours per file

---

### Fix 3 — Add story-level memory

**Problem:** Agents restart fresh every Copilot session. A story spanning multiple days gets inconsistent decisions — different class structures, different naming choices — because the agent has no memory of what was generated on day one.

**Fix:** Developer agent generates a session summary at story close: `.github/memory/stories/[story-id].md` with generated artefacts, decisions made, open items, and next session start point. Developer agent mandatory reading: "If a story memory file exists for the active story, read it first."

**Owner:** Tech Lead | **Time:** 1 hour

---

### Fix 4 — Fix the broken unit-tester handoff

**Problem:** Developer agent YAML frontmatter references `salesforce-unit-tester` (retired agent) in its handoffs. New team members will click it and get no result.

**Fix:** Update handoff in `salesforce-developer.agent.md`:

```yaml
# Change from:
- label: "Write tests for this"
  agent: salesforce-unit-tester

# Change to:
- label: "Write tests for this"
  agent: salesforce-developer
  prompt: "Generate Apex test classes for the code just implemented using TestDataFactory, targeting ≥95% coverage"
```

**Owner:** Tech Lead | **Time:** 15 minutes

---

### Fix 5 — Orchestrator ambiguity handling

**Problem:** Overlapping keywords misroute compound requests. "Generate a package.xml" routes to `salesforce-developer` (on "generate") instead of `salesforce-deployer`.

**Fix:** Add conflict resolution rule to the orchestrator: when two or more routing signals match, present both options and ask the user to confirm before routing.

Add specific conflict overrides (later/more specific signal wins):

| Conflict | Earlier match | Stronger match | Winner |
|---|---|---|---|
| "generate package.xml" | developer ("generate") | deployer ("package.xml") | deployer |
| "create test plan" | developer ("create") | qa ("test plan") | qa |
| "write security review" | developer ("write") | security ("security review") | security |

**Owner:** Tech Lead | **Time:** 1 hour

---

### Fix 6 — Real org context file population

**Problem:** All 7 context files contain demo Sales Cloud content (personal Developer Edition, single developer). Must be replaced with real org data before any team member uses the framework.

**Fix:** Run `@salesforce-setup` Mode A against the real org. Each file owner reviews and corrects output:

| File | Owner |
|---|---|
| `app-overview.context.md` | Tech Lead |
| `data-model.context.md` | Tech Lead / Senior Developer |
| `team-workflow.context.md` | Engineering Manager |
| `integrations.context.md` | Release Engineer |
| `permission-matrix.context.md` | System Admin |
| `governance-rules.context.md` | Tech Lead |
| `tech-stack.context.md` | Tech Lead |

**Owner:** Tech Lead + file owners | **Time:** 1 full day

---

## Phase 0 — Infrastructure Setup *(Week 0, parallel to Pre-Rollout Fixes)*

**Goal:** Repository structure and access ready before anyone uses the framework.

| Step | Task | Owner | Detail |
|---|---|---|---|
| 0.1 | Move repo to ADO | Tech Lead | Create ADO repo, push full DevGithub content. Branch policy: no direct commits to `main`, all changes via PR. |
| 0.2 | Branch protection | Tech Lead | Require: 1 reviewer on PRs, GitHub Actions gate must pass, branch must be up to date before merge. |
| 0.3 | Developer access guide | Tech Lead | One-page doc: clone, npm install, org auth, VS Code extensions (Copilot + Salesforce Extension Pack). |
| 0.4 | Shared QA sandbox | Release Engineer | Create QA sandbox from production. Document alias, URL, credentials in secret store (never in repo). |
| 0.5 | `.vscode/mcp.json.example` | Tech Lead | Verify committed example has all MCP entries (ADO, Salesforce DX, Playwright, Work IQ) with placeholder values and clear comments. |
| 0.6 | ADO custom states | ADO Admin | Add "Ready for Testing" and "Ready for UAT" as custom states. Unblocks QA and deployer agents from using proxy states. |
| 0.7 | Team contacts in app-overview | Tech Lead | Fill in QA Engineer and UAT Coordinator email rows. Agents auto-assign ADO work items to these. |

**Exit criteria:**
- [ ] Repo accessible to all team members in ADO
- [ ] Branch protection active
- [ ] At least one team member (not the framework author) successfully cloned and ran `npm install`
- [ ] QA sandbox exists and accessible
- [ ] `.vscode/mcp.json.example` complete and accurate
- [ ] ADO custom states added

---

## Phase 1 — Real Org Validation *(Weeks 1–4)*

**Goal:** Framework runs correctly against the real org. Every agent validated by the Tech Lead before any other developer uses it.

### Week 1 — Context file population

| Step | Task | Owner |
|---|---|---|
| 1.1 | Run `@salesforce-setup` Mode A against real org | Tech Lead |
| 1.2 | Each file owner reviews and corrects their context file | File owners |
| 1.3 | Review and update governance rules against real org compliance requirements | Tech Lead |
| 1.4 | Update `tech-stack.context.md` — real API version, managed packages, CI/CD tooling | Tech Lead |
| 1.5 | Record today's date as sprint zero baseline in every context file | Tech Lead |

### Week 2 — Developer and security agents

| Step | Task | Owner |
|---|---|---|
| 1.6 | Select a real low-complexity Apex-only story from backlog | Tech Lead |
| 1.7 | Run `@salesforce-developer` — evaluate: correct naming, correct objects, correct permission set | Tech Lead |
| 1.8 | Fix context gaps: every org-incorrect output → trace to context file → fix → re-run | Tech Lead |
| 1.9 | Run `@salesforce-security` — confirm R-001 to R-010 enforced correctly against real sharing model | Tech Lead |
| 1.10 | Run `@salesforce-reviewer` — confirm real org naming conventions applied | Tech Lead |
| 1.11 | Run all quality gates: `npm run scan`, `npm run prettier:verify`, `npm run lint`, `sf apex run test` | Tech Lead |
| 1.12 | Document all gaps in BACKLOG.md | Tech Lead |

### Week 3 — QA and deployment agents

| Step | Task | Owner |
|---|---|---|
| 1.13 | Run `@salesforce-deployer` — deploy story to QA sandbox, confirm package.xml, validate, deploy | Tech Lead |
| 1.14 | Run `@salesforce-qa` — confirm test plan is executable in real sandbox | Tech Lead |
| 1.15 | Execute all QA scenarios manually — record pass/fail | Tech Lead |
| 1.16 | Test Playwright MCP — document which scenarios work reliably vs. need fallback | Tech Lead |
| 1.17 | Test ADO integration — verify state updates and comments work against real ADO project | Tech Lead |

### Week 4 — Orchestrator and end-to-end

| Step | Task | Owner |
|---|---|---|
| 1.18 | Routing accuracy test — 20 different phrasings, target ≥80% correct | Tech Lead |
| 1.19 | Context gate test — remove app-overview content, confirm orchestrator stops and presents setup handoff | Tech Lead |
| 1.20 | Debugger test — introduce a deliberate bug, get debug log, run `@salesforce-debugger` | Tech Lead |
| 1.21 | Architect test — medium-complexity design question: current state → options → diagram → ADR | Tech Lead |
| 1.22 | Full end-to-end: planner → architect → developer → security → reviewer → Gate 1 → QA → Gate 2 → deployer | Tech Lead |
| 1.23 | Record pilot metrics: routing accuracy, anti-pattern avoidance, coverage, cycle time | Tech Lead |

**Phase 1 exit criteria (hard gates — do not proceed without all):**
- [ ] All 7 context files validated against real org by their file owners
- [ ] Full SDLC chain completed on one real story
- [ ] All quality gates pass
- [ ] Orchestrator routing accuracy ≥ 80%
- [ ] ADO integration working (state updates + comments automated)
- [ ] All gaps documented in BACKLOG.md with fixes applied or tracked
- [ ] Baseline cycle time recorded

---

## Phase 2 — First Developer Onboarding *(2 weeks per developer)*

**Goal:** Team members who didn't build the framework deliver real stories using agents, with the Tech Lead observing (not helping). Validates onboarding guide completeness.

### Before onboarding

| Step | Task | Owner |
|---|---|---|
| 2.1 | Write the team onboarding guide | Tech Lead | One page: 6 steps to first agent-assisted story. Clone, install, auth, Copilot setup, MCP config, first prompt. |
| 2.2 | Select onboarding developer | Tech Lead | Most comfortable with Salesforce, least familiar with AI agents. |
| 2.3 | Select onboarding story | Tech Lead | Low complexity, pure backend Apex, no integrations. Real backlog work — not synthetic. |
| 2.4 | Pre-brief: 30 minutes | Tech Lead | What the framework is, what agents do, what NOT to do (skip gates, accept output blindly). |

### During the onboarding story

| Step | What happens |
|---|---|
| 2.5 | Developer follows onboarding guide without help — Tech Lead observes silently, takes notes on hesitation and confusion points |
| 2.6 | Developer uses `@salesforce-orchestrator` as entry point for every task |
| 2.7 | Developer evaluates agent output before applying — Tech Lead watches for blind acceptance |
| 2.8 | Developer runs quality gates and interprets results |
| 2.9 | Developer completes Gate 1 ADO comment — confirms gate logic is understood |
| 2.10 | Handoff to QA (or Tech Lead plays QA role to validate the handoff artefacts are sufficient) |

### After the onboarding story

| Step | Task | Owner |
|---|---|---|
| 2.11 | 1-hour retrospective with developer | Tech Lead | What was confusing? What did the agent get wrong? Which context files were inaccurate? |
| 2.12 | Fix context files immediately from feedback | Tech Lead | No accumulation — fix on the day |
| 2.13 | Update BACKLOG.md from gaps found | Tech Lead | |
| 2.14 | Update onboarding guide from confusion points | Tech Lead | Guide must improve before next developer onboards |
| 2.15 | Record cycle time vs. Phase 1 baseline | Tech Lead | |

*Repeat for each additional developer. Each session should find fewer gaps than the previous one.*

**Phase 2 exit criteria:**
- [ ] ≥ 2 developers (not the framework author) completed a story end-to-end
- [ ] Onboarding guide used successfully by both without Tech Lead intervention
- [ ] Cycle time within 20% of Phase 1 baseline
- [ ] No recurring gaps across consecutive onboarding sessions
- [ ] BACKLOG.md updated, high-priority items resolved

---

## Phase 3 — Full Team Adoption *(Weeks 7–14)*

**Goal:** All developers, QA Engineer, and Release Engineer using their respective agents on every story. Multi-developer workflows validated.

### Weeks 1–2 — Role assignment

| Step | Task | Owner |
|---|---|---|
| 3.1 | Onboard remaining developers (Phase 2 process) | Tech Lead |
| 3.2 | Hand `@salesforce-qa` to QA Engineer — 2-hour handover session | Tech Lead → QA |
| 3.3 | Hand `@salesforce-deployer` to Release Engineer — 2-hour handover session | Tech Lead → RE |
| 3.4 | Confirm MCP access for all roles: ADO MCP, Salesforce DX MCP, Playwright (QA) | All |

### Weeks 3–4 — Multi-developer workflow validation

| Step | Task | Detail |
|---|---|---|
| 3.5 | Two developers, one feature | Dev A: planning + development. Dev B: security + code review. Tech Lead observes the handoff. Validate: does Dev B have enough context to review code they didn't write? |
| 3.6 | Simultaneous stories on shared objects | Two developers touching the same Salesforce object. Monitor for: context file conflicts, selector class conflicts, TestDataFactory conflicts. Document resolution. |
| 3.7 | Context file update mid-sprint | Trigger a real context update (new field, changed process). Validate: update process, reviewer, developer notification. |
| 3.8 | Full QA → RE handoff | First time actual QA Engineer and RE use agents in sequence on the same story. Validate: Gate 2 comment gives RE everything needed without going back to developer. |
| 3.9 | Defect loop | QA logs defect → Developer uses `@salesforce-debugger` → fix → re-deploy → QA re-tests. Validate the full loop. |

### Weeks 5–6 — Metrics and stabilisation

| Step | Task | Owner |
|---|---|---|
| 3.10 | Activate metrics tracking | Manager | ADO dashboard: cycle time, test coverage, defect escape rate |
| 3.11 | First sprint retrospective + context update | Tech Lead | `@salesforce-setup` Mode C staleness check. Update `sprint-context.memory.md`. Prune resolved issues. |
| 3.12 | Compare metrics to baseline | Manager + Tech Lead | Is cycle time improving? Defect rate below 10%? Coverage consistently ≥95%? |
| 3.13 | Routing accuracy re-test | Tech Lead | 20-phrasing test with different people. Target: ≥80%. |
| 3.14 | Structured developer feedback survey | Tech Lead | Which agents save the most time? Which produce the most wrong output? Which context files feel stale? |

**Phase 3 exit criteria:**
- [ ] All developers using agents on every story (ADO audit trail)
- [ ] QA Engineer and RE using their respective agents
- [ ] ≥ 2 multi-developer stories completed with agent-assisted handoffs
- [ ] Metrics tracking live with data
- [ ] First sprint retrospective + context update completed
- [ ] Defect escape rate visible and trending below 10%

---

## Phase 4 — Governance & Scale *(From Week 17, ongoing)*

| Step | Task | Owner | Cadence |
|---|---|---|---|
| 4.1 | Framework versioning — first release tagged `framework-v1.0.0` | Tech Lead | On Phase 3 completion |
| 4.2 | Agent change process enforced — first change processed through issue → review → branch → test → PR → merge | Tech Lead | Per change |
| 4.3 | Quarterly framework health review — metrics, BACKLOG open items, agent change requests, Salesforce release notes | Tech Lead + Manager | Quarterly |
| 4.4 | New developer onboarding test — next new hire uses only the written guide, no verbal help | Tech Lead | Per new hire |
| 4.5 | Salesforce release review — routing signals, deprecated patterns, API version update | Tech Lead | Per major SF release |
| 4.6 | Flosum MCP integration — wire deployer to live pipeline, update R-009 | RE | When Flosum MCP available |
| 4.7 | Browser QA regression — re-run Playwright scenarios after each major SF release | QA Engineer | Per major SF release |
| 4.8 | Horizon 3 hosting evaluation — MCP server assessment when ≥5 teams or fork maintenance is painful | Tech Lead + Manager | Phase 4 |

---

## The critical path

```
Fix 1 (R-009)            ← unblocks real org deployment
Fix 2 (coding rules)     ← unblocks developer agent reliability
Fix 4 (broken handoff)   ← unblocks correct routing

Phase 0 (infra)          ← unblocks team access
Phase 1 (real org)       ← unblocks developer onboarding
  └─ Week 1: context files   ← unblocks EVERYTHING else
  └─ Week 2-3: agent validation
  └─ Week 4: full chain

Phase 2 (first dev)      ← validates framework for others
Phase 3 (team)           ← real adoption
Phase 4 (governance)     ← sustainability
```

**The single highest-leverage action:** Populate the 7 context files against a real org. A framework running on wrong context produces confidently wrong output — which is worse than producing no output at all.

---

## Related pages

- [Objective](objective.md) — problem statement and success criteria
- [Business Architecture](business-architecture.md) — personas, value streams, roadmap
- [Solution Architecture](solution-architecture.md) — how the three layers work
- [Agent Design](agent-design.md) — each agent in detail
- [SDLC Workflow](sdlc-workflow.md) — the delivery flow this plan validates
- [Decisions](decisions.md) — why key architectural choices were made
