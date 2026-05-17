# Objective

## What it is

A structured system of AI specialist agents that automates and standardises the Salesforce software development lifecycle — replacing ad-hoc, person-dependent execution with repeatable, quality-gated workflows grounded in org-specific knowledge.

---

## The problem it solves

Salesforce development in a mid-size team (6–15 people) is inherently slow because every phase of the SDLC is manually coordinated, inconsistently executed, and dependent on individual knowledge that doesn't transfer.

| Pain area | What happens without the framework | Impact |
|---|---|---|
| Context switching | Developers context-switch between requirements, Salesforce docs, org patterns, and ADO before writing a line of code | 30–60 min lost per story |
| Inconsistent standards | Different developers write Apex and LWC differently — triggers without handlers, missing FLS checks, ad hoc test coverage | Rework in review; post-deploy defects |
| Manual handoffs | Dev → QA → RE handoffs are informal — missing artefacts, unclear state, repeated status questions | Stories idle between phases; QA starts blind |
| Knowledge silos | Org-specific patterns, integration details, and architecture decisions live in individuals' heads | Onboarding takes weeks; key-person departures create months of recovery |
| Risk at release | No consistent pre-deploy checklist or validation gate — deployments rely on individual memory | Rollbacks, production incidents, last-minute scrambles |

---

## What this framework delivers

1. **Specialist agents per SDLC phase** — each agent owns one phase and knows what to produce, what to check, and what to hand off next.
2. **Org-specific grounding** — every agent reads your org's context files before acting: data model, coding patterns, team workflow, governance rules, integrations. Output is org-correct, not generic.
3. **Enforced handoff gates** — two hard gates (Dev → QA, QA → Deploy) prevent skipping phases. ADO audit trail per gate.
4. **Automated quality at every layer** — pre-commit hooks (Prettier, ESLint, Jest), security review agent, code review agent, `sf project deploy validate` before any deploy.
5. **Knowledge that compounds** — context files grow sprint over sprint. The framework gets better the longer the team uses it.

---

## Goals

| Goal | How it's measured |
|---|---|
| Reduce cycle time from story to deploy | 30% reduction from baseline (baseline measured at framework launch) |
| Consistent code quality across all developers | Zero Critical/High security findings escaping to QA; ≥ 95% test coverage on all new classes |
| Handoffs carry the right artefacts by default | ADO comment present at every gate transition on every story |
| New team members productive quickly | New hire delivering first agent-assisted story within 1 day of onboarding |
| Knowledge survives team changes | Context files fully populated; any team member can answer "why was this built this way?" |

---

## What success looks like (Definition of Done — full adoption)

The framework is considered **successfully adopted** when all of the following are true:

| Criterion | How to verify |
|---|---|
| Every developer uses agents on every story | ADO audit trail — agent comment on every story |
| QA and RE agents owned by the right roles | QA Engineer runs `@salesforce-qa`; RE runs `@salesforce-deployer` |
| CI/CD gates blocking substandard code | No story merged without PMD + ESLint + sf validate passing |
| Metrics improving vs. baseline | Cycle time down ≥ 30%; defect escape rate < 10% |
| Context files current every sprint | Zero staleness flags at sprint start |
| Framework has a change process | At least one agent update processed through the defined change process |
| New team member onboarded in under 1 day | Confirmed via next new-hire experience |

---

## What this is not

- Not a replacement for human judgment — agents generate artefacts and flag issues; developers and leads make decisions.
- Not a CI/CD pipeline on its own — it works alongside GitHub Actions, Flosum, and sf CLI; it doesn't replace them.
- Not static — agents, context files, and skills are living documents that must be updated as the org and team evolve.
- Not a magic quality fix — it enforces the standards you define in your context files. Garbage in, garbage out.

---

## Related pages

- [Business Architecture](business-architecture.md) — personas, value streams, capability model, roadmap
- [Solution Architecture](solution-architecture.md) — how the three layers work together
- [Decisions](decisions.md) — why key choices were made this way
