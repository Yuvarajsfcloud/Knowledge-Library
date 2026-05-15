# Playbook: Technology Evaluation

**Scope:** Evaluating any new technology, framework, tool, or platform for adoption  
**When to use:** Before adopting a technology for production use in a new project or as a replacement  
**Output:** Technology Evaluation Report → ADR

---

## Process Flow

``` mermaid
flowchart TD
    A[Define the Problem\nthe Technology Solves] --> B[State Evaluation Criteria\n& Weights]
    B --> C[Identify Candidates\n2–4 options]
    C --> D[Desk Research\nDocs, community, maturity]
    D --> E[Time-boxed Spike\n1–3 days per candidate]
    E --> F[Score Against Criteria]
    F --> G[Document Trade-offs]
    G --> H{Sufficient evidence\nfor decision?}
    H -- No --> E
    H -- Yes --> I[Write ADR\n& Evaluation Report]
    I --> J[Review with\nSecurity + Engineering Lead]
    J --> K[Adopt / Reject / Trial\nUpdate Tech Radar]

    style A fill:#4051b5,color:#fff,stroke:none
    style K fill:#2e7d32,color:#fff,stroke:none
    style H fill:#e65100,color:#fff,stroke:none
```

---

## Step 1 — Define the Problem

Before looking at candidates, write the problem statement. If you cannot state the problem clearly without mentioning a technology name, you are evaluating the wrong way.

```
Problem statement: {One paragraph — what capability gap are we addressing,
and what are the consequences of not addressing it?}

Success criteria: {How will we know the chosen technology is working?}

Non-negotiable constraints:
- {Constraint 1 — e.g., must run in AWS, must be open-source, must support Python}
- {Constraint 2}
```

---

## Step 2 — Evaluation Criteria

Define criteria **before** looking at candidates to avoid confirmation bias.

**Standard criteria for infrastructure/platform technologies:**

| Criterion | Weight | Notes |
|---|---|---|
| Functional fit — does it solve the stated problem? | 25% | Must be high; eliminate candidates that score < 3/5 here |
| Operational maturity (docs, community, StackOverflow, GitHub stars trend) | 15% | |
| Security posture (CVE history, security advisories, auth model) | 15% | |
| Operational overhead (managed vs. self-hosted, scaling model) | 15% | |
| Total cost of ownership (licensing + infra + engineering time) | 10% | |
| Team learning curve & time to productivity | 10% | |
| Vendor/project longevity (CNCF graduation, backing, activity) | 10% | |

Adjust weights for the specific context. Always total to 100%.

---

## Step 3 — Candidate Identification

- Identify 2–4 candidates. Never evaluate a single option.
- Include the incumbent/status quo as a candidate if applicable.
- Sources: ThoughtWorks Tech Radar, CNCF Landscape, vendor comparisons, peer networks.

**CNCF Landscape maturity signals:**

| Signal | Meaning |
|---|---|
| CNCF Graduated | Production-proven; highest maturity signal |
| CNCF Incubating | Growing adoption; evaluate carefully |
| CNCF Sandbox | Early stage; use only for R&D/assessment |

Reference: [landscape.cncf.io](https://landscape.cncf.io/)

---

## Step 4 — Evaluation Scorecard

| Criterion | Weight | {Candidate A} | {Candidate B} | {Candidate C} |
|---|---|---|---|---|
| Functional fit | 25% | /5 | /5 | /5 |
| Operational maturity | 15% | /5 | /5 | /5 |
| Security posture | 15% | /5 | /5 | /5 |
| Operational overhead | 15% | /5 | /5 | /5 |
| TCO | 10% | /5 | /5 | /5 |
| Learning curve | 10% | /5 | /5 | /5 |
| Longevity | 10% | /5 | /5 | /5 |
| **Weighted total** | **100%** | | | |

**Scoring:** 5 = Excellent · 4 = Good · 3 = Acceptable · 2 = Weak · 1 = Unacceptable

---

## Step 5 — Spike Checklist

Run a time-boxed spike (1–3 days) for each shortlisted candidate.

- [ ] Deploy/install the candidate in an isolated environment
- [ ] Implement the core use case the technology is meant to solve
- [ ] Test against the highest-priority ASRs (performance, security, integration)
- [ ] Attempt a failure scenario and observe recovery behaviour
- [ ] Evaluate operator experience: logging, debugging, upgrade path
- [ ] Check the security posture: default config review, CVE history, SBOM availability
- [ ] Estimate real TCO: licensing + infrastructure + 1 FTE/month operational overhead estimate

---

## Step 6 — Security Evaluation Checklist

- [ ] Check CVE history: [osv.dev](https://osv.dev/), [NVD](https://nvd.nist.gov/)
- [ ] Review default configuration: are insecure defaults on by default?
- [ ] Confirm authentication/authorisation model is appropriate
- [ ] Verify data-at-rest and data-in-transit encryption support
- [ ] Check software supply chain: is there a published SBOM? Are dependencies auditable?
- [ ] Confirm licence is compatible with commercial use
- [ ] Check vendor's security disclosure / responsible vulnerability process

---

## Step 7 — Total Cost of Ownership (TCO) Estimate

| Cost Category | Candidate A | Candidate B |
|---|---|---|
| Licensing (annual) | £ | £ |
| Infrastructure (compute, storage, network) | £ | £ |
| Engineering time to implement | £ | £ |
| Ongoing operational overhead (FTE fraction × salary) | £ | £ |
| Training and ramp-up | £ | £ |
| Migration cost from current solution | £ | £ |
| **Total 3-year TCO** | **£** | **£** |

---

## Output: Technology Evaluation Report Structure

```
1. Problem statement
2. Evaluation criteria and weights
3. Candidates evaluated
4. Spike findings (per candidate)
5. Scorecard
6. TCO comparison
7. Security findings
8. Recommendation with rationale
9. Risks and mitigations
10. ADR reference (link)
```

---

## Common Pitfalls

!!! failure "Evaluating after the decision is made"
    The most common failure: a technology is already chosen and the evaluation is written to justify it. Run the evaluation before the decision. Criteria set after reviewing candidates are biased.

!!! warning "Choosing the most popular option, not the most appropriate one"
    High GitHub stars and conference talks are not evaluation criteria. Score against the problem's specific requirements.

!!! warning "Skipping the operational spike"
    Reading documentation and watching demos is not an evaluation. Build something representative. The hardest operational scenarios reveal themselves only when you try to run it.

---

## Reference Sources

- ThoughtWorks Tech Radar — [thoughtworks.com/radar](https://www.thoughtworks.com/radar)
- CNCF Landscape — [landscape.cncf.io](https://landscape.cncf.io/)
- OSV Vulnerability Database — [osv.dev](https://osv.dev/)
- OWASP Dependency-Check — [owasp.org](https://owasp.org/www-project-dependency-check/)
- *Fundamentals of Software Architecture* — Richards & Ford, Ch. 24 (Developing a Career Path)
