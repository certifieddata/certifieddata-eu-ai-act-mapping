# Article 9 — Risk management system

## Obligation (paraphrased)

Providers of high-risk AI systems must establish, implement, document, and maintain a risk management system across the system's lifecycle. This includes identifying, evaluating, and mitigating risks, and re-evaluating throughout operation and post-market monitoring.

## CertifiedData primitives that contribute

### `decision-record`
Every signed decision is a durable, tamper-evident record of one AI action. Aggregated, they support **post-market monitoring**: drift detection, outcome auditing, and incident reconstruction. Records contain actor, outcome, explanation reason codes, and entity identifiers.

### `public-registry`
The artifact registry provides a complete, queryable inventory of certified datasets, models, and outputs. Procurement, internal risk committees, and external auditors can verify lifecycle state without vendor-gated access.

### `signed-certificate`
Certificates freeze generation metadata — algorithm, template version, parameters — at issuance. Any change produces a new certificate, making drift and substitution visible.

## What remains the deployer's responsibility

* Risk identification and evaluation methodology
* Mitigation strategy design
* Periodic review cadence (the Act expects continuous, not one-off)
* Residual-risk acceptance decisions
* Organizational responsibility assignment

## Where to see it live

* [certifieddata.io/decision-log](https://certifieddata.io/decision-log) — public decision feed
* [certifieddata.io/registry](https://certifieddata.io/registry) — artifact registry
* [certifieddata.io/governance](https://certifieddata.io/governance) — governance overview
