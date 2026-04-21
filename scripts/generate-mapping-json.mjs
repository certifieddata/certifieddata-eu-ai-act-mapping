#!/usr/bin/env node
/**
 * Rebuilds mapping.json from the articles/*.md files + a fixed taxonomy table
 * defined below. Run after editing article markdown files.
 *
 * Usage:  node scripts/generate-mapping-json.mjs
 */
import fs from "node:fs";
import path from "node:path";

const PRIMITIVES = {
  "signed-certificate": "Ed25519-signed certificate over an artifact's SHA-256 fingerprint, algorithm spec, and metadata.",
  "decision-record": "Tamper-evident, Ed25519-signed AI decision log entry.",
  "signed-receipt": "Agent-commerce receipt signed with Ed25519.",
  "manifest-certification": "Batch certification of artifacts from a structured manifest.",
  "public-registry": "Publicly indexed artifact registry with permanent verify URLs.",
  "signing-key-registry": "Independently fetchable Ed25519 public key registry at /.well-known/signing-keys.json.",
  canonicalization: "RFC 8785 JCS canonicalization of signed payloads.",
};

const ARTICLES = [
  {
    article: 9,
    title: "Risk management system",
    primitives: ["decision-record", "public-registry", "signed-certificate"],
    deployer_responsibility: [
      "Risk identification methodology",
      "Mitigation design",
      "Review cadence",
      "Residual-risk acceptance",
    ],
  },
  {
    article: 10,
    title: "Data and data governance",
    primitives: ["signed-certificate", "manifest-certification", "public-registry"],
    deployer_responsibility: [
      "Representativeness of underlying data",
      "Bias-testing methodology",
      "Data-governance policy documentation",
    ],
  },
  {
    article: 12,
    title: "Record-keeping",
    primitives: ["decision-record", "canonicalization", "signing-key-registry"],
    deployer_responsibility: [
      "Event selection",
      "Retention periods",
      "Log store access controls",
    ],
  },
  {
    article: 13,
    title: "Transparency and information to deployers",
    primitives: ["signing-key-registry", "public-registry"],
    deployer_responsibility: [
      "System-level user documentation",
      "Domain-specific interpretation of explanations",
    ],
  },
  {
    article: 15,
    title: "Accuracy, robustness and cybersecurity",
    primitives: [
      "signed-certificate",
      "decision-record",
      "signed-receipt",
      "canonicalization",
      "signing-key-registry",
    ],
    deployer_responsibility: [
      "Accuracy measurement",
      "Robustness under distribution shift",
      "Operational cybersecurity controls",
    ],
  },
  {
    article: 19,
    title: "Automatically generated logs",
    primitives: ["decision-record", "public-registry"],
    deployer_responsibility: [
      "Retention period selection",
      "Storage under deployer control",
      "Access logging on the log",
    ],
  },
  {
    article: 50,
    title: "Transparency obligations for certain AI systems",
    primitives: ["manifest-certification", "signed-receipt", "public-registry"],
    deployer_responsibility: [
      "User-facing labeling",
      "Consent flows",
      "Media watermarking where required",
    ],
  },
];

// Sanity check: every referenced primitive must exist in the taxonomy
for (const a of ARTICLES) {
  for (const p of a.primitives) {
    if (!(p in PRIMITIVES)) {
      console.error(`Unknown primitive "${p}" on Article ${a.article}`);
      process.exit(1);
    }
  }
}

// Sanity check: every article must have a markdown file
for (const a of ARTICLES) {
  const candidates = fs
    .readdirSync("articles")
    .filter((f) => f.startsWith(`article-${a.article}-`) && f.endsWith(".md"));
  if (candidates.length === 0) {
    console.error(`No markdown file for Article ${a.article}`);
    process.exit(1);
  }
}

const out = {
  $schema: "https://certifieddata.io/schemas/eu-ai-act-mapping/v1.json",
  regulation: "Regulation (EU) 2024/1689",
  mapping_version: "1.0.0",
  last_reviewed: new Date().toISOString().slice(0, 10),
  disclaimer: "Not legal advice. Read the Regulation. Consult counsel.",
  primitives: PRIMITIVES,
  articles: ARTICLES,
};

fs.writeFileSync("mapping.json", JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`✅ Wrote mapping.json (${ARTICLES.length} articles)`);
