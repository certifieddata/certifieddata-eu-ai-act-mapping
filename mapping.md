# EU AI Act ↔ CertifiedData primitive mapping

This document maps obligations under **Regulation (EU) 2024/1689** (the EU AI Act) to the **CertifiedData primitives** that satisfy them in whole or in part.

> **Not legal advice.** Read the Regulation. Consult counsel. Verify fit for your specific deployment.

## Primitives used in this mapping

| Primitive | Description |
|---|---|
| `signed-certificate` | Ed25519-signed certificate over an artifact's SHA-256 fingerprint, algorithm spec, and metadata. |
| `decision-record` | Tamper-evident, Ed25519-signed log entry for an AI decision (actor, outcome, explanation, entity). |
| `signed-receipt` | Agent-commerce receipt: actor, intent, policy outcome, signed. |
| `manifest-certification` | Batch certification of artifacts from a structured manifest — used by CI/CD and publishing pipelines. |
| `public-registry` | Publicly indexed artifact registry with permanent verification URLs. |
| `signing-key-registry` | `/.well-known/signing-keys.json` — independently fetchable Ed25519 public keys for all three pillars. |
| `canonicalization` | RFC 8785 JCS canonicalization of all signed payloads — enables independent re-verification. |

## Article coverage

### Article 9 — Risk management system (high-risk AI systems)

**Obligation (paraphrased).** Providers of high-risk AI systems must establish, implement, document, and maintain a risk management system across the lifecycle.

**CertifiedData primitives that contribute.**

* `decision-record` — maintains a tamper-evident record of AI decisions, enabling post-market monitoring and incident review.
* `public-registry` — artifact inventory keyed by certification; supports lifecycle tracking.
* `signed-certificate` — freezes generation metadata at issuance time; later changes produce new certificates, exposing drift.

**What remains the deployer's responsibility.** Risk identification and evaluation methodology; mitigation design; periodic review cadence; residual-risk acceptance decisions.

See: [articles/article-9-risk-management.md](./articles/article-9-risk-management.md)

### Article 10 — Data and data governance

**Obligation (paraphrased).** Training, validation, and testing datasets must be relevant, representative, and managed under appropriate governance practices.

**CertifiedData primitives that contribute.**

* `signed-certificate` — proves when and from what a training dataset was generated, and by which algorithm.
* `manifest-certification` — supports lineage references linking derived datasets to their sources.
* `public-registry` — makes the provenance chain queryable and auditable.

**What remains the deployer's responsibility.** Representativeness of the underlying data; bias-testing methodology; documented data-governance policy.

See: [articles/article-10-data-governance.md](./articles/article-10-data-governance.md)

### Article 12 — Record-keeping

**Obligation (paraphrased).** High-risk AI systems must be designed to automatically record events ("logs") over the lifetime of the system, sufficient for traceability.

**CertifiedData primitives that contribute.**

* `decision-record` — direct fit: signed, tamper-evident, machine-readable decision logs with actor / outcome / explanation.
* `canonicalization` + `signing-key-registry` — enable independent re-verification of any record, including by regulators.

**What remains the deployer's responsibility.** Event selection (what counts as a decision worth logging); retention periods; access controls on the log store.

See: [articles/article-12-record-keeping.md](./articles/article-12-record-keeping.md)

### Article 13 — Transparency and information to deployers

**Obligation (paraphrased).** High-risk AI systems must be designed such that deployers can interpret their output; instructions for use must be provided.

**CertifiedData primitives that contribute.**

* `signing-key-registry` — lets any deployer verify outputs independently.
* `public-registry` + permanent verify URLs — makes provenance accessible without vendor lock-in.
* OpenAPI specification — machine-readable contract for integrators.

**What remains the deployer's responsibility.** System-level user documentation; interpretation of explanation fields in your specific domain.

See: [articles/article-13-transparency.md](./articles/article-13-transparency.md)

### Article 15 — Accuracy, robustness and cybersecurity

**Obligation (paraphrased).** High-risk AI systems must achieve appropriate levels of accuracy, robustness, and cybersecurity.

**CertifiedData primitives that contribute (cybersecurity aspect).**

* `signed-certificate`, `decision-record`, `signed-receipt` — tamper-evident integrity via Ed25519.
* `canonicalization` — prevents signature-equivalent malleability attacks on JSON payloads.
* `signing-key-registry` — supports key rotation with retired-key retention for historical verification.

**What remains the deployer's responsibility.** Model accuracy measurement; robustness under distribution shift; operational cybersecurity controls.

See: [articles/article-15-accuracy-robustness.md](./articles/article-15-accuracy-robustness.md)

### Article 19 — Automatically generated logs (retention)

**Obligation (paraphrased).** Providers must keep logs automatically generated by high-risk AI systems for an appropriate period.

**CertifiedData primitives that contribute.**

* `decision-record` — append-only, signed, retention-configurable log store with export.
* `public-registry` — permanent verify URLs remain valid across the retention window and beyond for any record the deployer chooses to publicly anchor.

**What remains the deployer's responsibility.** Retention period selection; storage of logs under your control; access logging on the log itself.

See: [articles/article-19-documentation.md](./articles/article-19-documentation.md)

### Article 50 — Transparency obligations (certain AI systems)

**Obligation (paraphrased).** Providers and deployers of generative and interactive AI systems must meet specified transparency obligations, including marking AI-generated content where applicable.

**CertifiedData primitives that contribute.**

* `manifest-certification` — certifies AI-generated outputs and published pages with signed, verifiable provenance.
* `signed-receipt` — documents the policy and actor that authorized a generative action.
* `public-registry` — durable public record that an item was AI-generated, with full lineage.

**What remains the deployer's responsibility.** Surface-level user-facing labeling; consent flows; watermarking of media where required.

See: [articles/article-50-transparency.md](./articles/article-50-transparency.md)
