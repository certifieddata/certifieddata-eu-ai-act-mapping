# Article 12 — Record-keeping

## Obligation (paraphrased)

High-risk AI systems must be designed to automatically record events ("logs") over the lifetime of the system. The logs must be sufficient to ensure traceability of the system's functioning, appropriate to the intended purpose, and capable of identifying situations that may present risk or require substantial modification.

## CertifiedData primitives that contribute

### `decision-record`
Direct fit. A Decision Ledger record captures one AI decision with:
* `actor` — the model / agent / system that produced the decision
* `decision` — the outcome (and, importantly, the reason)
* `explanation.reasonCodes` — machine-parseable reason codes
* `explanation.rationaleSummary` — human-readable summary
* `entity` — the subject of the decision (application ID, patient pseudonym, agent session)
* Ed25519 signature, SHA-256 hash, canonical payload

Records are append-only once issued. Verification is independent of CertifiedData — any auditor with the public key can check a record.

### `canonicalization` + `signing-key-registry`
RFC 8785 JCS canonicalization means the exact bytes that were signed can be reproduced by a verifier from the payload alone. The key registry is public and includes retired keys, so records signed years ago remain verifiable after key rotation.

## What remains the deployer's responsibility

* **Event selection** — deciding which decisions are logged. Not every model inference needs a record; high-risk decisions do.
* **Retention** — the Act requires "appropriate period"; deployers configure the retention window on records they own.
* **Access controls** — logs should be auditable but not freely mutable; CertifiedData's signature model prevents silent mutation but you still control who can read.
* **Correlation** — linking log entries to user-visible actions via your own correlation IDs.

## Where to see it live

* [certifieddata.io/decision-log](https://certifieddata.io/decision-log) — live public feed
* [certifieddata.io/decision-ledger/demo](https://certifieddata.io/decision-ledger/demo) — sign a record in-browser
* [certifieddata.io/docs/decision-log-spec](https://certifieddata.io/docs/decision-log-spec) — record schema
