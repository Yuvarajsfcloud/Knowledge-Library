# Enterprise Continuum

**TOGAF Reference:** Part V, Chapter 39 — Enterprise Continuum  
**Purpose:** A classification and navigation model for architectures and solutions, from generic to organisation-specific.

---

## Overview

The Enterprise Continuum is a way of classifying architecture and solution artifacts as a spectrum from fully generic (applicable to any enterprise) to fully specific (unique to this organisation).

``` mermaid
flowchart LR
    subgraph EC["Enterprise Continuum"]
        direction LR
        F["Foundation\nArchitectures\n(most generic)"]
        CS["Common Systems\nArchitectures"]
        IA["Industry\nArchitectures"]
        OA["Organisation-Specific\nArchitectures\n(most specific)"]
        F --> CS --> IA --> OA
    end

    style F fill:#37474f,color:#fff,stroke:none
    style CS fill:#4051b5,color:#fff,stroke:none
    style IA fill:#2e7d32,color:#fff,stroke:none
    style OA fill:#c62828,color:#fff,stroke:none
```

---

## Architecture Continuum vs Solutions Continuum

The Enterprise Continuum has two parallel streams:

| | Architecture Continuum | Solutions Continuum |
|---|---|---|
| **Nature** | Conceptual — how we think about architectures | Concrete — how we build and deploy solutions |
| **Foundation level** | TOGAF Foundation Architecture | Open-source components, generic products |
| **Common systems level** | Security, management, network architectures | Common SaaS, platform products (AWS, Azure) |
| **Industry level** | Retail, finance, healthcare reference architectures | Industry cloud packages, domain SaaS |
| **Organisation level** | This organisation's target architectures | This organisation's deployed systems |

---

## Levels in Practice

### Foundation Architectures
Generic principles applicable to any enterprise. TOGAF itself is a Foundation Architecture — it describes patterns that any organisation can apply regardless of industry.

**Examples:**
- TOGAF Foundation Architecture — generic enterprise patterns
- OSI model — generic networking stack
- OWASP — generic security patterns

### Common Systems Architectures
Patterns for systems that many organisations share, regardless of industry.

**Examples:**
- Identity and Access Management (IAM) patterns
- Observability stack patterns (logs, metrics, traces)
- Event-driven integration patterns
- Cloud-native deployment patterns (containers, serverless)

**Use in practice:** When you adopt an AWS reference architecture for microservices, you are applying a Common Systems Architecture.

### Industry Architectures
Patterns specific to a business sector — often published by industry bodies or vendors targeting that sector.

**Examples:**
- BIAN (Banking Industry Architecture Network) — [bian.org](https://bian.org/)
- eTOM (Telecommunications) — TM Forum
- ARTS (Retail) — Association for Retail Technology Standards
- HL7 FHIR (Healthcare) — [hl7.org/fhir](https://www.hl7.org/fhir/)
- ACORD (Insurance) — [acord.org](https://www.acord.org/)

### Organisation-Specific Architectures
This is where the BDAT architecture you produce lives — fully tailored to this organisation's context, constraints, and strategy.

---

## How to Use the Enterprise Continuum

When designing architecture in Phase B–D:

1. **Start at the Foundation level** — what general patterns apply? (TOGAF, Well-Architected, OSI, 12-Factor)
2. **Move to Common Systems** — what cloud or platform patterns fit? (AWS reference architectures, CNCF patterns)
3. **Check Industry level** — is there a sector-specific reference architecture? (BIAN for banking, FHIR for healthcare)
4. **Customise to Organisation level** — apply the above to your specific context, constraints, and technology choices

This approach prevents "starting from scratch" and grounds design decisions in proven patterns.

---

## Solutions Continuum in Practice

| Level | Example in a Retail Context |
|---|---|
| Foundation | OAuth 2.0 / OIDC for authentication |
| Common Systems | Okta as the identity platform |
| Industry | Retail-specific SSO federation with POS systems |
| Organisation | Okta integrated with this org's specific AD tenant and custom scopes |

---

## TOGAF Reference

- TOGAF Standard 10th Edition — Part V, Chapter 39: Enterprise Continuum
- Free online: [pubs.opengroup.org/architecture/togaf10-doc/arch/chap39.html](https://pubs.opengroup.org/architecture/togaf10-doc/arch/chap39.html)
