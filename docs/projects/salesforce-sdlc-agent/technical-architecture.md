# Technical Architecture

## Salesforce platform

| Item | Value |
|---|---|
| Salesforce API version | 66.0 (Spring '26) |
| Project format | Salesforce DX (source format) |
| Source directory | `force-app/main/default/` |
| Namespace | None (no managed package) |
| Login URL | `https://login.salesforce.com` |
| Scratch org edition | Developer Edition, Lightning enabled |
| Deployment manifest | `manifest/package.xml` |

---

## Environments

| Environment | Purpose | How to target |
|---|---|---|
| Developer Edition org | Primary development and pilot validation | `sf org login web --alias dev-org` |
| Scratch org | Feature isolation and testing (on-demand) | `sf org create scratch --definition-file config/project-scratch-def.json` |
| Sandbox | QA browser testing (Playwright) | Target via `--target-org sandbox-alias` |
| Production | Not yet in scope — pilot is pre-production | — |

**Org alias convention:** Use `dev-org` for the primary developer org. Each team member registers their own alias locally.

---

## Source code structure

```
force-app/main/default/
  classes/          ← Apex classes (Handler, Service, Selector, Test)
  triggers/         ← Apex triggers (shell only — no business logic)
  lwc/              ← Lightning Web Components
  aura/             ← Legacy Aura components (existing only — no new Aura)
  objects/          ← Custom object metadata + custom fields
  permissionsets/   ← Feature-specific permission sets
  flows/            ← Salesforce Flows (declarative automation)
  layouts/          ← Page layouts
  profiles/         ← Profile metadata (minimise — prefer permission sets)
  staticresources/  ← Static files
```

**Layer pattern (enforced by `@salesforce-developer` and `@salesforce-reviewer`):**

```
AccountDuplicateDetectionTrigger.trigger     ← trigger shell only
  → AccountDuplicateDetectionHandler.cls    ← orchestration, no SOQL/DML
    → AccountDuplicateDetectionService.cls  ← business logic, bulkified
      → AccountSelector.cls                ← SOQL queries only
```

---

## Node.js toolchain

| Tool | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime for all dev tooling |
| npm | (bundled) | Package management |
| Prettier | ^3.5.3 | Code formatting (Apex, LWC, XML, JSON, MD) |
| prettier-plugin-apex | ^2.2.6 | Apex formatter plugin |
| @prettier/plugin-xml | ^3.4.1 | XML formatter plugin |
| ESLint | ^9.29.0 | JavaScript/LWC linting |
| @salesforce/eslint-config-lwc | ^4.0.0 | LWC-specific lint rules |
| @salesforce/sfdx-lwc-jest | ^7.0.2 | LWC Jest unit testing framework |
| eslint-plugin-jest | ^28.14.0 | Jest-specific lint rules |
| Husky | ^9.1.7 | Git hooks management |
| lint-staged | ^16.1.2 | Run linters on staged files only |
| @salesforce/mcp | ^0.30.5 | Salesforce DX MCP server |

---

## Quality gates (multi-layer)

### Layer 1 — Pre-commit hooks (Husky + lint-staged)

Runs automatically on `git commit`. Staged files only — fast.

```json
"lint-staged": {
  "**/*.{cls,cmp,component,css,html,js,json,md,page,trigger,xml,yaml,yml}": [
    "prettier --write"
  ],
  "**/{aura,lwc}/**/*.js": [
    "eslint"
  ],
  "**/lwc/**": [
    "sfdx-lwc-jest -- --bail --findRelatedTests --passWithNoTests"
  ]
}
```

A commit that fails formatting, linting, or Jest is blocked at the hook level — it never reaches the repo.

### Layer 2 — Manual quality commands

Run before deployment (enforced by `@salesforce-deployer` pre-deploy checklist):

```bash
# 1. PMD static analysis (Apex)
npm run scan
# Full scan across all metadata:
npm run scan:all

# 2. Prettier format check
npm run prettier:verify

# 3. ESLint
npm run lint

# 4. LWC Jest unit tests
npm run test:unit
npm run test:unit:coverage   # with coverage report

# 5. Apex test run
sf apex run test --target-org dev-org --test-level RunLocalTests --code-coverage
```

PMD scan excludes `ApexCRUDViolation`, `ApexDoc`, `AnnotationsNamingConventions` — these are handled by the security and developer agents instead.

### Layer 3 — sf CLI validation (pre-deploy)

```bash
# Dry run — validates metadata and runs tests without deploying
sf project deploy validate \
  --manifest manifest/package.xml \
  --target-org <org-alias> \
  --test-level RunLocalTests

# Actual deployment (only after validate passes)
sf project deploy start \
  --manifest manifest/package.xml \
  --target-org <org-alias> \
  --test-level RunLocalTests
```

### Layer 4 — CI/CD pipeline (GitHub Actions)

PR gate runs on every pull request:
- PMD Code Analyzer (`sf code-analyzer`)
- ESLint
- Prettier format check

Status: Active. Flosum integration not yet wired.

---

## MCP servers

MCP (Model Context Protocol) servers give agents access to live context beyond the local repo.

### `.mcp.json` (project root — Work IQ)

```json
{
  "mcpServers": {
    "workiq": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@microsoft/workiq@latest", "mcp"]
    }
  }
}
```

### `.vscode/mcp.json` (VS Code — ADO + Salesforce DX)

| Server | What it enables |
|---|---|
| Azure DevOps MCP | Live work item queries, sprint board, PR state |
| Salesforce DX MCP (`@salesforce/mcp`) | Apex test runs, org metadata queries, data retrieval |

### Playwright MCP

Loaded separately for QA browser testing. Enables `@salesforce-qa` to execute functional test scenarios in a real browser against the sandbox org. Configuration in `.vscode/mcp.json`.

---

## Branching and version control

| Branch | Purpose |
|---|---|
| `main` | Integration branch — all feature branches merge here |
| `feature/<story-id>-<description>` | One branch per ADO story |
| `hotfix/<story-id>-<description>` | Emergency production fixes |

**Workflow:**
1. Create feature branch from `main`
2. Develop using agents on feature branch
3. Pre-commit hooks run automatically on commit
4. Open PR → GitHub Actions gate runs (PMD + ESLint + Prettier)
5. Tech Lead reviews and merges
6. `@salesforce-deployer` generates package.xml and runs `sf project deploy validate`

**No direct commits to `main`.** All changes via PR.

---

## Code Analyzer configuration (`code-analyzer.yml`)

PMD ruleset targeting Apex code. Key rule exclusions:
- `ApexCRUDViolation` — handled by `@salesforce-security` agent
- `ApexDoc` — not required by team standards
- `AnnotationsNamingConventions` — handled by `@salesforce-reviewer`

Severity threshold: `2` (High and Critical findings fail the scan).

---

## Developer setup (first time)

```bash
# 1. Install Salesforce CLI
npm install -g @salesforce/cli

# 2. Clone the repo
git clone <repo-url>
cd DevGithub

# 3. Install Node.js dependencies (includes Husky hooks)
npm install

# 4. Authenticate to your dev org
sf org login web --alias dev-org

# 5. Verify connection
sf org display --target-org dev-org

# 6. (Optional) Create a scratch org for isolated testing
sf org create scratch \
  --definition-file config/project-scratch-def.json \
  --alias my-scratch \
  --duration-days 7
```

VS Code extensions required:
- GitHub Copilot
- Salesforce Extension Pack (`salesforce.salesforcedx-vscode`)
- ESLint

---

## Related pages

- [Solution Architecture](solution-architecture.md) — how MCP servers fit the 3-layer model
- [SDLC Workflow](sdlc-workflow.md) — where quality gates sit in the delivery flow
- [Agent Design](agent-design.md) — which agents use which tools
