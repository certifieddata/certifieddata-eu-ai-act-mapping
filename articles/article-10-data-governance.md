# Article 10 — Data and data governance

## Obligation (paraphrased)

Training, validation, and testing datasets for high-risk AI systems must be relevant, representative, free of errors to the extent possible, and managed under appropriate data-governance practices. Design choices and data provenance must be documented.

## CertifiedData primitives that contribute

### `signed-certificate`
Each certified dataset ships with a certificate recording:
* SHA-256 dataset hash
* Algorithm (`CTGAN`, `TVAE`, `GaussianCopula`) and parameters at generation time
* Template ID and version
* Timestamp and signing key ID

This answers *"what dataset was this, exactly, at the moment of generation?"* — a foundational data-governance question.

### `manifest-certification`
Manifest submissions carry `source_references[]` and `lineage` fields. You can certify a derived dataset while referencing the certified source datasets it came from, producing an auditable chain.

### `public-registry`
Provenance is queryable. Regulators, auditors, and deployers can walk the lineage without vendor-gated access.

## What remains the deployer's responsibility

* Representativeness analysis on the underlying data
* Bias testing across protected classes (CertifiedData templates support this via `pii_class` column annotations, but testing is the deployer's)
* Data-governance policy document
* Data-quality acceptance criteria

## Where to see it live

* [certifieddata.io/generate](https://certifieddata.io/generate) — templated generation
* [certifieddata.io/manifest](https://certifieddata.io/manifest) — manifest submission
* [certifieddata.io/registry](https://certifieddata.io/registry) — lineage browsing
