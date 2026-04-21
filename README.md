# certifieddata-eu-ai-act-mapping

A public, machine-readable mapping from **EU AI Act** articles to the **CertifiedData primitives** that satisfy — in whole or in part — the corresponding obligations. Intended as procurement evidence, auditor reference, and a living document the community can correct.

> **Not legal advice.** This mapping is maintained by CertifiedData engineers and reviewed against the published Regulation text. Read the Act, consult counsel, and verify fit for your specific use case.

## What's here

```
.
├── mapping.md                             # Human-readable overview
├── mapping.json                           # Machine-readable mapping (stable schema)
├── articles/                              # One file per covered article
│   ├── article-9-risk-management.md
│   ├── article-10-data-governance.md
│   ├── article-12-record-keeping.md
│   ├── article-13-transparency.md
│   ├── article-15-accuracy-robustness.md
│   ├── article-19-documentation.md
│   └── article-50-transparency.md
└── scripts/
    └── generate-mapping-json.mjs           # Regenerate mapping.json from the markdown files
```

## Covered articles (high-risk system obligations + transparency)

| Article | Topic | Primary CertifiedData primitive |
|---|---|---|
| 9 | Risk management system | Decision Ledger · Artifact registry · Transparency center |
| 10 | Data and data governance | Certified dataset lineage · Manifest submission · Dataset fingerprints |
| 12 | Record-keeping | Decision Ledger (signed decisions) · Signed certificates |
| 13 | Transparency and information to deployers | Public verification URLs · `/.well-known/signing-keys.json` · OpenAPI spec |
| 15 | Accuracy, robustness and cybersecurity | Ed25519 signatures · RFC 8785 canonicalization · Independently verifiable evidence |
| 19 | Automatically generated logs | Decision Ledger (tamper-evident append-only signed records) |
| 50 | Transparency for certain AI systems | Manifest-based certification for generated content · Signed receipts for agent-commerce outputs |

See [`mapping.md`](./mapping.md) for the full text and [`mapping.json`](./mapping.json) for the machine-readable form.

## Using the mapping

### In a procurement response

Reference `mapping.json` directly — it's stable, versioned, and keyed by article number so procurement-review tools can parse it.

### In a due-diligence review

Each `articles/article-*.md` file lists:

* The obligation (in plain language with a pointer to the Act)
* The CertifiedData primitives that satisfy it
* What remains your responsibility
* Links to live demonstration surfaces on certifieddata.io

### In your own SBOM-like AI BoM

Use the `primitives` keys from `mapping.json` as tags in your AI Bill of Materials. Every CertifiedData artifact carries these same primitives in its metadata.

## Corrections & contributions

1. Fork the repo
2. Edit the relevant `articles/article-*.md` file
3. Run `node scripts/generate-mapping-json.mjs` to regenerate `mapping.json`
4. Open a PR with citations to the Act text where relevant

## License

MIT — see [LICENSE](./LICENSE).
