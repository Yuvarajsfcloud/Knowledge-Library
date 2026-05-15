# Architecture Decision Records

Immutable records of significant architectural decisions. Once accepted, an ADR is never edited — only superseded by a new one.

---

## Status Key

| Status | Meaning |
|---|---|
| `Proposed` | Under discussion, not yet decided |
| `Accepted` | Decision made and active |
| `Deprecated` | No longer relevant but not replaced |
| `Superseded` | Replaced by a newer ADR (link provided) |

---

## Index

| ADR | Title | Status | Date |
|---|---|---|---|
| [ADR-001](ADR-001-shared-database.md) | Use a Shared Database During Phase 1 of Service Extraction | Superseded by ADR-003 | 2024-03-15 |
| [ADR-002](ADR-002-async-events.md) | Use Asynchronous Events for Cross-Domain Integration | Accepted | 2024-03-18 |
| [ADR-003](ADR-003-database-per-service.md) | Adopt Database-per-Service in Phase 2 | Accepted | 2024-09-12 |
| [ADR-004](ADR-004-terraform-iac.md) | Adopt Terraform for Infrastructure Provisioning | Accepted | 2024-10-08 |
| [ADR-005](ADR-005-oauth-oidc.md) | Replace Homegrown Auth with OAuth 2.0 / OIDC via Keycloak | Accepted | 2025-02-04 |
| [ADR-006](ADR-006-graphql-federation.md) | Evaluate GraphQL Federation for the Unified API Layer | Proposed | 2025-06-20 |

---

## ADR Template

Copy this template to `docs/adrs/ADR-NNN-short-title.md`:

```markdown
# ADR-NNN: Short Descriptive Title

**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Deprecated | Superseded by ADR-NNN  
**Deciders:** Names or roles

---

## Context

What is the situation, problem, or opportunity driving this decision?
Include relevant constraints and forces at play.

## Decision

What was decided? State it clearly and directly.

## Consequences

### Positive
- ...

### Negative / Trade-offs
- ...

### Neutral
- ...

## Alternatives Considered

| Option | Why rejected |
|---|---|
| Option A | ... |
| Option B | ... |
```
