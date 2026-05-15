# ADR-005: Replace Homegrown Auth with OAuth 2.0 / OIDC via Keycloak

**Date:** 2025-02-04  
**Status:** Accepted  
**Deciders:** CTO, Security Lead, Engineering Lead, Identity Product Owner  
**Context:** Identity & Access — Authentication Strategy

---

## Context

The platform's current authentication is a homegrown session-cookie scheme implemented in the monolith. It has accumulated significant risk:

- Custom token format with no formal specification; only one engineer fully understands the validation logic.
- No support for federated identity — every new B2B customer has required custom integration work.
- Password hashing predates the current OWASP recommendations.
- Logout and token-revocation behaviour differs between web and mobile clients.
- No standardised way to delegate authorisation to third-party applications.

As services are extracted ([ADR-001](ADR-001-shared-database.md), [ADR-003](ADR-003-database-per-service.md)), they need a consistent way to authenticate users and authorise calls. Reimplementing the homegrown scheme in each service is not viable.

---

## Decision

**Adopt OAuth 2.0 (with PKCE) and OpenID Connect (OIDC) as the standard for authentication and authorisation. Use Keycloak as the identity provider (IdP).**

Specifically:
- **Web app** — Authorization Code flow with PKCE; tokens stored in HttpOnly secure cookies via a thin BFF.
- **Mobile apps** — Authorization Code flow with PKCE; access tokens in memory, refresh tokens in secure storage.
- **Service-to-service** — Client Credentials flow with mTLS and short-lived (≤ 15 min) access tokens.
- **External partners** — Their own IdP federated into Keycloak via OIDC; we do not manage their user credentials.
- **Access tokens** — JWTs signed RS256, validated at each service via cached JWKS.
- **Refresh tokens** — opaque, stored server-side in Keycloak, revocable.

Keycloak is self-hosted on EKS, deployed via Terraform ([ADR-004](ADR-004-terraform-iac.md)), with PostgreSQL persistence and a dedicated DR replica.

---

## Consequences

### Positive
- Standards-based — leverages an enormous ecosystem of libraries, documentation, and tooling.
- Federation with partner IdPs becomes configuration rather than custom code.
- Centralised audit log of all authentication events.
- Token revocation, session management, MFA, and credential reset are out-of-the-box features.
- Security review is dramatically simpler — we configure a known protocol rather than defending a bespoke design.

### Negative / Trade-offs
- Keycloak is operationally non-trivial: HA configuration, realm management, upgrades, theme customisation.
- Token validation at every service adds latency (mitigated by JWKS caching and short network paths).
- Migration of existing user credentials requires careful design (see Migration below).
- Keycloak's admin UI has a learning curve for support staff.

### Neutral
- Realms are split: `customers` realm for end-users, `internal` realm for employees (later federated to corporate IdP).
- Logout is implemented as front-channel + back-channel logout per OIDC spec; this is more involved than a single cookie delete.

---

## Alternatives Considered

| Option | Why rejected |
|---|---|
| Auth0 (managed) | Excellent product but per-MAU pricing becomes prohibitive at our scale; data residency constraints for some customers |
| AWS Cognito | Tight AWS coupling; some required features (theme branding, custom flows) are awkward or unsupported |
| Okta | Strong enterprise SSO product; cost model unfavourable for B2C scale |
| Continue with homegrown scheme | Rejected — security posture is the largest single risk in the current architecture |
| FusionAuth, Ory Kratos/Hydra | Strong contenders; Keycloak chosen for broader Java ecosystem familiarity and feature completeness in a single product |

---

## Migration Plan

1. Stand up Keycloak in non-prod; integrate with one low-risk internal app.
2. Migrate user credentials via a Keycloak user federation provider that calls the legacy validation API. Users authenticate once, after which Keycloak stores a re-hashed credential and the federation provider is no longer consulted.
3. Roll out OIDC integration in extracted services first (Order, Inventory).
4. Migrate web and mobile clients in stages, gated by feature flag.
5. Decommission the homegrown scheme once all clients and services are migrated.

**Estimated timeline:** 6 months.

---

## Related

- [ADR-002: Async events for cross-domain integration](ADR-002-async-events.md) — bearer tokens propagate via correlation context, not via event payload
- [ADR-004: Terraform for infrastructure provisioning](ADR-004-terraform-iac.md)
