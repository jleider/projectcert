/**
 * Integration tests for the audit sync/build scripts. Each script is run
 * as a real subprocess against fixtures. For the two reconcile scripts,
 * the generated SQL is executed against a real SQLite built from the
 * actual schema, validating both the SQL syntax (e.g. the row-value
 * `NOT IN (VALUES ...)`) and the reconcile semantics.
 */

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { datapointsFor } from "../src/lib/verification-datapoints";

const SCHEMA = readFileSync("schema/d1/0001_init.sql", "utf8");
const tsx = "node_modules/.bin/tsx";

function tmp(): string {
  return mkdtempSync(join(tmpdir(), "audit-sync-"));
}
function run(script: string, args: string[]) {
  return execFileSync(tsx, [script, ...args], { encoding: "utf8" });
}
function freshDb(): DatabaseSync {
  const db = new DatabaseSync(":memory:");
  db.exec(SCHEMA);
  return db;
}

describe("sync-broken-links.ts", () => {
  it("reconciles broken_links: removes recovered, preserves still-broken detected_at", () => {
    const dir = tmp();
    const input = join(dir, "links.json");
    const out = join(dir, "broken.sql");
    writeFileSync(
      input,
      JSON.stringify({
        results: [
          { url: "https://dead", citations: ["CA / sources[2]", "CA / sealOfBiliteracy.sourceUrl"], status: 404, classification: "client-error" },
          { url: "https://ok", citations: ["NY / sources[0]"], status: 200, classification: "ok" },
        ],
      }),
    );
    run("scripts/sync-broken-links.ts", ["--input", input, "--out", out, "--detected-at", "2026-06-16T00:00:00.000Z"]);

    const db = freshDb();
    // A previously-broken link that has recovered (not in the new set).
    db.prepare(`INSERT INTO broken_links (usps,datapoint_id,url,citation,classification,detected_at) VALUES ('TX','sources','https://gone','x','client-error','2026-01-01')`).run();
    // A still-broken link with an older detected_at to be preserved.
    db.prepare(`INSERT INTO broken_links (usps,datapoint_id,url,citation,classification,detected_at) VALUES ('CA','sources','https://dead','CA / sources[2]','client-error','2026-01-01')`).run();

    db.exec(readFileSync(out, "utf8"));

    const rows = db.prepare(`SELECT usps,datapoint_id,url,detected_at FROM broken_links ORDER BY datapoint_id`).all() as Array<Record<string, unknown>>;
    // Recovered TX row gone; two CA datapoints present; OK link never added.
    expect(rows.map((r) => `${r.usps}:${r.datapoint_id}`)).toEqual(["CA:sealOfBiliteracy.sourceUrl", "CA:sources"]);
    // Still-broken row kept its original detected_at (ON CONFLICT DO NOTHING).
    expect(rows.find((r) => r.datapoint_id === "sources")!.detected_at).toBe("2026-01-01");
  });
});

describe("sync-link-reviews.ts", () => {
  it("reconciles pending rows while preserving accepted rows", () => {
    const dir = tmp();
    const input = join(dir, "links.json");
    const out = join(dir, "lr.sql");
    writeFileSync(
      input,
      JSON.stringify({
        results: [
          { url: "https://azed.gov", citations: ["AZ / sources[0]"], status: 403, classification: "needs-review" },
          { url: "https://dead", citations: ["CA / sources[0]"], status: 404, classification: "client-error" },
        ],
      }),
    );
    run("scripts/sync-link-reviews.ts", ["--input", input, "--out", out, "--seen-at", "2026-06-16T00:00:00.000Z"]);

    const db = freshDb();
    // An accepted row not in the new pending set — must survive.
    db.prepare(`INSERT INTO link_reviews (url,classification,citations,first_seen,last_seen,decision,reviewed_by) VALUES ('https://justia','needs-review','[]','2026-01-01','2026-01-01','accepted','a@b.org')`).run();
    // A stale pending row — must be removed.
    db.prepare(`INSERT INTO link_reviews (url,classification,citations,first_seen,last_seen,decision) VALUES ('https://stale','needs-review','[]','2026-01-01','2026-01-01','pending')`).run();

    db.exec(readFileSync(out, "utf8"));

    const rows = db.prepare(`SELECT url,decision FROM link_reviews ORDER BY url`).all() as Array<Record<string, unknown>>;
    expect(rows).toEqual([
      { url: "https://azed.gov", decision: "pending" }, // new pending
      { url: "https://justia", decision: "accepted" }, // preserved
    ]);
  });
});

describe("build-verification-ledger.ts", () => {
  it("counts a matching-hash checkmark as verified and a drifted one as stale", () => {
    const dir = tmp();
    const ca = JSON.parse(readFileSync("src/content/states/ca.json", "utf8"));
    const correctHash = datapointsFor(ca).find((d) => d.id === "elPercent")!.contentHash;

    const verifications = join(dir, "v.json");
    const broken = join(dir, "b.json");
    const out = join(dir, "ledger.json");
    writeFileSync(
      verifications,
      JSON.stringify([{ results: [
        { usps: "CA", datapoint_id: "elPercent", verified_by: "a@b.org", verified_at: "2026-06-15T00:00:00Z", content_hash: correctHash },
        { usps: "CA", datapoint_id: "sources", verified_by: "a@b.org", verified_at: "2026-06-15T00:00:00Z", content_hash: "stalehash" },
      ] }]),
    );
    writeFileSync(broken, JSON.stringify([{ results: [] }]));
    run("scripts/build-verification-ledger.ts", ["--verifications", verifications, "--broken", broken, "--out", out]);

    const ledger = JSON.parse(readFileSync(out, "utf8"));
    expect(ledger.CA.verified).toEqual(["elPercent"]);
    expect(ledger.CA.stale).toEqual(["sources"]);
    expect(ledger.CA.count).toBe(1);
    expect(ledger.CA.total).toBe(32);
  });

  it("treats a broken-linked datapoint as stale even with a matching hash", () => {
    const dir = tmp();
    const ca = JSON.parse(readFileSync("src/content/states/ca.json", "utf8"));
    const correctHash = datapointsFor(ca).find((d) => d.id === "sources")!.contentHash;

    const verifications = join(dir, "v.json");
    const broken = join(dir, "b.json");
    const out = join(dir, "ledger.json");
    writeFileSync(verifications, JSON.stringify([{ results: [
      { usps: "CA", datapoint_id: "sources", verified_by: "a@b.org", verified_at: "2026-06-15T00:00:00Z", content_hash: correctHash },
    ] }]));
    writeFileSync(broken, JSON.stringify([{ results: [{ usps: "CA", datapoint_id: "sources" }] }]));
    run("scripts/build-verification-ledger.ts", ["--verifications", verifications, "--broken", broken, "--out", out]);

    const ledger = JSON.parse(readFileSync(out, "utf8"));
    expect(ledger.CA.verified).toEqual([]);
    expect(ledger.CA.stale).toEqual(["sources"]);
  });
});

describe("build-link-whitelist.ts", () => {
  it("exports accepted rows into the whitelist shape", () => {
    const dir = tmp();
    const accepted = join(dir, "accepted.json");
    const out = join(dir, "whitelist.json");
    writeFileSync(accepted, JSON.stringify([{ results: [
      { url: "https://azed.gov", reviewed_by: "jane@x.org", reviewed_at: "2026-06-16T10:00:00Z", note: "WAF blocks bots" },
      { url: "https://justia.com", reviewed_by: "jane@x.org", reviewed_at: "2026-06-16T11:00:00Z", note: null },
    ] }]));
    run("scripts/build-link-whitelist.ts", ["--accepted", accepted, "--out", out]);

    const wl = JSON.parse(readFileSync(out, "utf8"));
    expect(wl["https://azed.gov"]).toEqual({ acceptedBy: "jane@x.org", acceptedAt: "2026-06-16", note: "WAF blocks bots" });
    expect(wl["https://justia.com"]).toEqual({ acceptedBy: "jane@x.org", acceptedAt: "2026-06-16" });
  });
});
