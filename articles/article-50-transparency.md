# Article 50 — Transparency obligations for certain AI systems

## Obligation (paraphrased)

Providers and deployers of certain AI systems — including interactive systems, emotion-recognition, biometric categorization, and generative AI producing synthetic audio / image / video / text — must meet specified transparency obligations. For generative systems, outputs must be marked as artificially generated or manipulated in a machine-readable format, where technically feasible.

## CertifiedData primitives that contribute

### `manifest-certification`
A manifest can certify an `output` or `published-page` artifact, producing a signed certificate that binds the content hash to:
* The model and prompt that produced it
* Retrieval sources (for RAG pipelines)
* Policy context (what policy ID authorized publication)
* Lineage back to upstream datasets

This is a concrete **machine-readable marker**: the verify URL plus signature prove the content is AI-generated and traceable to its production pipeline.

### `signed-receipt`
For agent-commerce flows that authorize generation or publication, the signed receipt records **which agent, acting under which policy, produced what**. Useful for the accountability chain behind a piece of generated content.

### `public-registry`
Durable, queryable public record. An end user, journalist, or regulator can look up any certified artifact and see its AI-generated provenance.

## What remains the deployer's responsibility

* **User-facing labeling** — visible marks like "AI-generated" on media surfaces. CertifiedData produces the machine-readable layer; the visible layer is your product.
* **Consent flows** where applicable (emotion recognition, biometric categorization).
* **Media watermarking** — CertifiedData signs *about* content; it does not embed watermarks *inside* media bitstreams. Use a media-watermarking tool alongside for full coverage.
* **Disclosure timing** — ensuring notification happens at first interaction.

## Where to see it live

* [certifieddata.io/manifest](https://certifieddata.io/manifest) — manifest-based certification
* [certifieddata.io/certified-publishing](https://certifieddata.io/certified-publishing) — publishing flow
* [certifieddata.io/agent-commerce](https://certifieddata.io/agent-commerce) — signed receipts
