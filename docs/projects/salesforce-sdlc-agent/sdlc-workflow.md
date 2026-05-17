# SDLC Workflow

End-to-end walkthrough of how a feature moves from ADO backlog to production deployment using the agent framework. Every step includes the agent invoked, what it produces, and what the gate condition is.

---

## Feature Delivery Flow

```
ADO story created (by BA or Product Owner)
         │
         ▼
[PHASE 1 — PLANNING]  @salesforce-planner
         │
         ▼
[PHASE 2 — DESIGN]    @salesforce-architect  (optional — medium/high complexity)
         │
         ▼
[PHASE 3 — DEVELOPMENT]  @salesforce-developer
         │
         ▼
[PHASE 4 — SECURITY REVIEW]  @salesforce-security
         │
         ▼
[PHASE 5 — CODE REVIEW]  @salesforce-reviewer
         │
    ◄── GATE 1: "Dev complete — ready for QA" ──►
         │
         ▼
[PHASE 6 — FUNCTIONAL QA]  @salesforce-qa
         │
    ◄── GATE 2: "QA complete — ready for RE" ──►
         │
         ▼
[PHASE 7 — DEPLOYMENT]  @salesforce-deployer
         │
         ▼
[PHASE 8 — POST-DEPLOY]  Manual health check
         │
         ▼
ADO story: Done
```

---

## Phase 1 — Planning

**Agent:** `@salesforce-planner`  
**Triggered by:** New story or epic in ADO backlog  
**Input:** Feature request or business requirement (free text)

**Steps:**
1. Invoke `@salesforce-planner` in Copilot Chat
2. Describe the feature: *"We need to prevent duplicate accounts being created when the same company name and phone number already exist"*
3. Agent reads `app-overview.context.md` and `data-model.context.md`, then produces:
   - Epic breakdown (if input is an epic)
   - Story title and description
   - Salesforce-specific acceptance criteria (Given/When/Then referencing objects and fields)
   - Effort estimate with complexity signals
4. Copy output to ADO work item — or agent creates it directly via ADO MCP

**Output artefacts:**
- ADO work item with title, description, acceptance criteria
- Complexity assessment: Low / Medium / High

**Next:** Low complexity → straight to Phase 3. Medium/High → Phase 2.

---

## Phase 2 — Design (optional)

**Agent:** `@salesforce-architect`  
**Triggered by:** Medium or High complexity stories; integration-heavy features; new object relationships  
**Input:** ADO work item + description of the design question

**Steps:**
1. Invoke `@salesforce-architect`
2. Provide the story and the design question: *"Should we use a Flow or Apex trigger for the duplicate detection logic?"*
3. Agent reads `framework-patterns.context.md`, `integrations.context.md`, and `data-model.context.md`, then produces:
   - 2–3 design options with Salesforce-specific trade-offs
   - Recommendation with rationale
   - ADR (Architecture Decision Record) if a significant decision is being made
   - Mermaid diagram if architecture needs visualising

**Output artefacts:**
- Design option analysis
- ADR (committed to `.github/memory/team-decisions.memory.md`)
- Mermaid diagram (optional)

**Next:** Phase 3 — Development

---

## Phase 3 — Development

**Agent:** `@salesforce-developer`  
**Input:** ADO work item, acceptance criteria, design decision (if Phase 2 ran)

**Steps:**
1. Invoke `@salesforce-developer`
2. Provide the story: *"Implement the account duplicate detection feature. Spec: UC-001"*
3. Agent reads all context files + spec blueprints + coding rules, then generates:
   - Apex trigger (shell only)
   - Handler class
   - Service class (business logic, bulkified, FLS-safe)
   - Selector class (SOQL queries)
   - Test class (using TestDataFactory, ≥ 95% coverage target)
   - Permission set
   - All meta.xml files

4. Apply generated code to `force-app/main/default/`
5. Run tests locally:
   ```bash
   sf apex run test --target-org dev-org --test-level RunLocalTests --code-coverage
   ```
6. Confirm: tests pass, coverage ≥ 95%
7. Commit — pre-commit hooks run automatically (Prettier + ESLint + Jest)

**Output artefacts:**
- Apex classes (trigger + handler + service + selector)
- Test class
- Permission set + meta.xml files
- Confirmed test pass with coverage report

**Next:** Phase 4 — Security Review

---

## Phase 4 — Security Review

**Agent:** `@salesforce-security`  
**Input:** Generated code from Phase 3

**Steps:**
1. Invoke `@salesforce-security` with the code or file paths
2. Agent reads `governance-rules.context.md` and `data-model.context.md`, then reviews:
   - CRUD/FLS on every DML and field read
   - Dynamic SOQL for injection vectors
   - Sharing model compliance
   - Hardcoded values (IDs, tokens, credentials)

3. Agent produces a clearance rating:
   - **PASS** — no issues; proceed to code review
   - **PASS WITH NOTES** — minor findings; fix recommended but not blocking
   - **BLOCKED** — Critical/High finding; must fix before proceeding

4. Fix any Critical/High findings; re-run security review after

**Output artefacts:**
- Security clearance report (PASS / PASS WITH NOTES / BLOCKED)
- Findings list with file references

**Gate:** BLOCKED rating stops the workflow. Do not proceed to code review with open Critical/High findings.

**Next:** Phase 5 — Code Review

---

## Phase 5 — Code Review

**Agent:** `@salesforce-reviewer`  
**Input:** All code from Phase 3 (after security issues resolved)

**Steps:**
1. Run PMD scan first:
   ```bash
   npm run scan
   ```
2. Invoke `@salesforce-reviewer` with the code
3. Agent reads `framework-patterns.context.md` and `governance-rules.context.md`, then reviews:
   - Bulkification: SOQL/DML outside loops, collections used correctly
   - Naming conventions: class names, method names, variable names
   - Layer pattern adherence: trigger → handler → service → selector
   - Anti-pattern detection: SeeAllData, hardcoded IDs, debug overuse
4. Apply suggestions
5. Add ADO comment: **"Dev complete — ready for QA"** → update ADO state

**Output artefacts:**
- Review findings (Critical / Major / Minor)
- ADO comment confirming gate passage

**Gate 1:** Code review must be APPROVED or APPROVED WITH COMMENTS (no Critical/Major open). ADO comment required. QA does not start without this comment.

**Next:** Phase 6 — Functional QA

---

## Phase 6 — Functional QA

**Agent:** `@salesforce-qa`  
**Input:** ADO work item (acceptance criteria), feature branch, sandbox access

**Steps:**
1. Confirm feature is deployed to sandbox (or deploy for QA):
   ```bash
   sf project deploy start --manifest manifest/package.xml --target-org sandbox-alias
   ```
2. Invoke `@salesforce-qa` with the ADO work item / acceptance criteria
3. Agent reads `app-overview.context.md` and `testing.context.md`, then generates:
   - Test plan with Happy Path + edge cases + negative scenarios
   - Each scenario: preconditions, steps, expected result
4. Execute scenarios:
   - Browser scenarios: Playwright MCP executes in sandbox
   - API/backend scenarios: via `sf apex run` or manual verification
5. Log any defects: structured report (steps to reproduce, expected vs. actual, severity)
6. Defects → back to `@salesforce-developer` via ADO → fix → re-test
7. All scenarios pass → add ADO comment: **"QA complete — ready for RE"** → update ADO state

**Output artefacts:**
- Functional test plan
- Test execution results (pass/fail per scenario)
- Defect reports (if any)
- ADO comment confirming gate passage

**Gate 2:** All acceptance criteria scenarios pass. No open Critical/High defects. ADO comment required. Deployer does not proceed without this comment.

**Next:** Phase 7 — Deployment

---

## Phase 7 — Deployment

**Agent:** `@salesforce-deployer`  
**Input:** Feature branch, ADO work item, QA sign-off

**Steps:**
1. Invoke `@salesforce-deployer`
2. Agent reads `org-state.context.md` and `team-workflow.context.md`, then produces:
   - `package.xml` for the feature's components
   - Pre-deploy checklist confirmation

3. Run pre-deploy checklist:
   ```bash
   npm run scan             # PMD
   npm run prettier:verify  # formatting
   npm run lint             # ESLint
   npm run test:unit        # LWC Jest
   sf apex run test --target-org dev-org --test-level RunLocalTests
   ```

4. Validate deployment (dry run):
   ```bash
   sf project deploy validate \
     --manifest manifest/package.xml \
     --target-org <target-org> \
     --test-level RunLocalTests
   ```

5. If validation passes, deploy:
   ```bash
   sf project deploy start \
     --manifest manifest/package.xml \
     --target-org <target-org> \
     --test-level RunLocalTests
   ```

6. Add ADO comment: **"Deployed to [org] — job ID [id]. Monitoring."**
7. Update ADO state → Done (after health check)

**Output artefacts:**
- `manifest/package.xml`
- Deployment job ID
- ADO comment

**Next:** Phase 8 — Post-Deploy Health Check

---

## Phase 8 — Post-Deploy Health Check

**Current approach (manual):** After deploy, verify:
- No new errors in Salesforce Setup → Apex Jobs
- No unexpected governor limit spikes
- Feature works as expected in target org (spot check the Happy Path)

**Future approach:** `@salesforce-monitor` will automate governor limit analysis, error log review, and anomaly detection. Not yet validated.

Once confirmed clean:
- Merge feature branch to `main`
- ADO work item: **Done**

---

## Defect resolution flow (abbreviated)

When a defect is found in QA or production:

```
Defect logged in ADO
      │
      ▼  @salesforce-debugger
Root cause from debug log / exception → fix scope defined
      │
      ▼  @salesforce-developer
Fix generated + test updated
      │
      ▼  @salesforce-security + @salesforce-reviewer (fast-track)
Abbreviated review — security and quality spot check
      │
      ▼  @salesforce-deployer
Hotfix deployed · ADO: Done
```

Fast-track means abbreviated review, not skipped review. Security check is always required.

---

## Cycle time targets

| Phase | Target time | Notes |
|---|---|---|
| Planning | < 1 hour | With `@salesforce-planner` — not from scratch |
| Design | < 2 hours | Optional; only medium/high complexity |
| Development | 1–4 hours | Depends on feature size |
| Security review | < 30 min | Agent-driven; fast for clean code |
| Code review | < 30 min | Agent-driven + PMD |
| QA | 2–4 hours | Depends on acceptance criteria count |
| Deployment | < 1 hour | Validation + deploy |
| **Total (low complexity)** | **1–2 days** | Target once team is fully adopted |

Baseline cycle time (before framework) should be measured at Phase 1 launch to track the 30% reduction target.

---

## Related pages

- [Agent Design](agent-design.md) — what each agent does in detail
- [Business Architecture](business-architecture.md) — the value streams and metrics this workflow drives
- [Technical Architecture](technical-architecture.md) — the quality gates and toolchain
