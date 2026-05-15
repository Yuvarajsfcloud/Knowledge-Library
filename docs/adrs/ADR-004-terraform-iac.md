# ADR-004: Adopt Terraform for Infrastructure Provisioning

**Date:** 2024-10-08  
**Status:** Accepted  
**Deciders:** CTO, Platform Engineering Lead, Cloud Architect  
**Context:** Cloud Foundation — Infrastructure-as-Code Strategy

---

## Context

The migration from on-prem to AWS has produced a sprawl of click-ops resources: ad-hoc VPCs, inconsistent IAM roles, drift between non-prod and prod environments. The next phase of the programme (multi-region expansion, dedicated environments per major customer) is not feasible without reproducible infrastructure.

The team needs a single Infrastructure-as-Code (IaC) tool that:

- Supports AWS as the primary cloud, with the option to add a second cloud later
- Has a stable provider ecosystem and broad community
- Supports modular composition (network, compute, data) so teams can be productive without becoming infrastructure experts
- Integrates cleanly with our existing CI/CD pipeline (GitHub Actions)
- Has remote state and locking out of the box

---

## Decision

**Adopt HashiCorp Terraform as the standard IaC tool across all environments.**

Specifically:
- Terraform OSS (not Cloud / Enterprise) initially; revisit once we exceed 20 engineers writing IaC regularly.
- Remote state in S3 with DynamoDB locking, one state file per (environment × stack) pair.
- A shared `terraform-modules` repository owned by Platform Engineering provides opinionated modules (network, EKS, RDS, IAM baselines).
- Application teams compose modules in their own service repositories.
- All Terraform changes go through PR review and `terraform plan` output is posted as a PR comment by CI.
- Production applies require an approved PR plus manual approval gate in GitHub Actions.

---

## Consequences

### Positive
- Reproducibility — environments can be torn down and rebuilt from code.
- Drift detection via scheduled `terraform plan` jobs flags out-of-band changes.
- Application teams self-serve common patterns without becoming AWS experts.
- Cloud-agnostic syntax leaves the door open for a second provider.
- Existing team familiarity from previous engagements reduces ramp-up time.

### Negative / Trade-offs
- HCL is a DSL — engineers must learn it. Less expressive than a general-purpose language (no real loops/conditionals without contortion).
- State management discipline is critical — a corrupted or lost state file is operationally painful.
- Provider version pinning and upgrades require ongoing maintenance.
- Some AWS features lag in the provider; occasional workarounds via `aws_cloudformation_stack` resource.

### Neutral
- Module versioning: shared modules tagged via Git tags, consumers pin to semver ranges.
- Long-lived test environments still require the same care as production for state.

---

## Alternatives Considered

| Option | Why rejected |
|---|---|
| AWS CDK (TypeScript) | Excellent abstraction, but AWS-only — closes the multi-cloud door |
| Pulumi | Strong general-purpose language model; smaller community and less internal experience |
| AWS CloudFormation (raw) | Verbose, AWS-only, weaker module ecosystem |
| Manual provisioning + Ansible | Does not solve resource-graph problem; only good for in-instance configuration |
| Crossplane | Promising but ties IaC to Kubernetes lifecycle — not appropriate for foundational cloud resources |

---

## Standards & Guardrails

- All modules must include `README.md`, `variables.tf` with descriptions, and `outputs.tf`.
- All resources must carry a standard tag set: `Owner`, `CostCentre`, `Environment`, `Service`, `ManagedBy=terraform`.
- `terraform fmt` and `tflint` run in CI; PRs blocked on failure.
- Security scanning via `checkov` runs on every PR.
- No use of `local-exec` provisioners except in clearly justified edge cases (recorded as a comment).

---

## Review Criteria

Revisit if:
- Multi-cloud requirement emerges and Pulumi/Crossplane comparative advantage grows.
- Team scale exceeds 20 active IaC contributors (consider Terraform Cloud / Enterprise for policy-as-code and run management).

**Review date:** 2025-10-01

---

## Related

- [ADR-002: Async events for cross-domain integration](ADR-002-async-events.md)
- [Frameworks Reference](../reference/frameworks.md)
