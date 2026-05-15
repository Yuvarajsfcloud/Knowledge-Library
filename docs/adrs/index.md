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

---

## ADR Template

Copy this template to `docs/adrs/ADR-NNN-short-title.md`:

```markdown
# ADR-NNN: Short Descriptive Title

**Date:** YYYY-MM-DD  
**Status:** Proposed | Accepted | Deprecated | Superseded by [ADR-NNN](ADR-NNN-title.md)  
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
