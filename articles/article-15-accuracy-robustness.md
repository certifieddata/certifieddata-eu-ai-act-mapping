# Article 15 — Accuracy, robustness and cybersecurity

## Obligation (paraphrased)

High-risk AI systems must achieve an appropriate level of accuracy, robustness, and cybersecurity, and perform consistently throughout their lifecycle. Cybersecurity controls must protect against attempts to alter the system's use or performance.

## CertifiedData primitives that contribute

### Integrity via Ed25519 signatures

`signed-certificate`, `decision-record`, and `signed-receipt` all use Ed25519 over RFC 8785 JCS-canonicalized payloads. This provides:

* **Tamper evidence.** Altering a signed artifact invalidates the signature.
* **Source attestation.** The key ID identifies the signer; the registry proves the key was active at the relevant time.
* **Replay resistance at the record level.** Each record includes a unique ID and timestamp; canonicalization ensures byte-for-byte reproducibility.

### `canonicalization` prevents JSON malleability

RFC 8785 JCS removes key ordering ambiguity, whitespace variance, and number formatting as sources of signature-equivalent differences. Without canonicalization, two semantically-identical payloads could hash differently — and attackers could exploit the gap.

### `signing-key-registry` supports key rotation

Retired keys remain in the registry so historical records can still be verified after rotation. This supports the Act's "lifecycle" requirement for ongoing verifiability.

### Dataset fingerprinting supports robustness audits

`signed-certificate` records the SHA-256 of the exact training dataset. Investigators can test whether the deployed model was trained on the certified dataset or a substituted one.

## What remains the deployer's responsibility

* **Accuracy measurement** — CertifiedData signs evidence; it doesn't measure model accuracy.
* **Robustness testing** — distribution shift, adversarial inputs, evaluation suites.
* **Operational cybersecurity** — network controls, secret management, incident response.
* **Key protection** — if you issue your own keys, you protect the private key.

## Where to see it live

* [certifieddata.io/verify](https://certifieddata.io/verify) — re-verify any artifact
* [certifieddata.io/docs/certification-methodology](https://certifieddata.io/docs/certification-methodology) — methodology overview
* [certifieddata.io/trust-center](https://certifieddata.io/trust-center) — trust center
