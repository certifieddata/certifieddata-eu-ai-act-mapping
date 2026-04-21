# Article 13 — Transparency and information to deployers

## Obligation (paraphrased)

High-risk AI systems must be designed and developed so that deployers can interpret the system's output and use it appropriately. Providers must provide clear instructions for use. The system's operation must be sufficiently transparent.

## CertifiedData primitives that contribute

### `signing-key-registry`
`/.well-known/signing-keys.json` is a **publicly fetchable, versioned** registry of Ed25519 public keys. Any deployer or auditor can verify outputs independently — no vendor trust in runtime required.

### `public-registry`
Every certified artifact has a permanent verification URL. Deployers can share this URL with their own auditors or customers — it does not expire with your CertifiedData account.

### OpenAPI specification
Machine-readable contract at [github.com/certifieddata/certifieddata-openapi](https://github.com/certifieddata/certifieddata-openapi). Integrators generate clients, mock servers, and contract tests without depending on our documentation prose.

### `canonicalization`
RFC 8785 JCS means the exact bytes that were signed are reconstructible. A deployer's auditor can replay the verification locally with full confidence in what was attested.

## What remains the deployer's responsibility

* **System-level user documentation** — the Act requires *instructions for use* in addition to machine verifiability.
* **Domain interpretation** — `reasonCodes` are machine-parseable, but what each code means in your domain is your docs to write.
* **Explanation UX** — surfacing explanations to end users in a way they can act on.

## Where to see it live

* [certifieddata.io/.well-known/signing-keys.json](https://certifieddata.io/.well-known/signing-keys.json) — public key registry
* [certifieddata.io/verify](https://certifieddata.io/verify) — public verification UI
* [certifieddata.io/transparency](https://certifieddata.io/transparency) — transparency center
