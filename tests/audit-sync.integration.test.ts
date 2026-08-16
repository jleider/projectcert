/**
 * Integration tests for the audit sync/build scripts. Each script is run
 * as a real subprocess against fixtures. For the two reconcile scripts,
 * the generated SQL is executed against a real SQLite built from the
 * actual schema, validating both the SQL syntax (e.g. the row-value
 * `NOT IN (VALUES ...)`) and the reconcile semantics.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { describe, expect, it } from "vitest";
import { datapointsFor } from "../src/lib/verification-datapoints";

// All migrations in order — see the note in audit-api.integration.test.ts.
const SCHEMA = readdirSync("schema/d1")
  .filter((f) => f.endsWith(".sql"))
  .sort()
  .map((f) => readFileSync(join("schema/d1", f), "utf8"))
  .join("\n");
const tsx = "node_modules/.bin/tsx";

function tmp(): string {
  return mkdtempSync(join(tmpdir(), "audit-sync-"));
}
function run(script: string, args: string[]) {
  return execFileSync(tsx, [script, ...args], { encoding: "utf8" });
}
/** Run a script expected to exit non-zero; returns its stderr. */
function runFailing(script: string, args: string[]): string {
  try {
    execFileSync(tsx, [script, ...args], { encoding: "utf8", stdio: "pipe" });
  } catch (err) {
    return String((err as { stderr?: string }).stderr ?? "");
  }
  throw new Error(`${script} was expected to exit non-zero`);
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
          {
            url: "https://dead",
            citations: ["CA / sources[2]", "CA / sealOfBiliteracy.sourceUrl"],
            status: 404,
            classification: "client-error",
          },
          {
            url: "https://ok",
            citations: ["NY / sources[0]"],
            status: 200,
            classification: "ok",
          },
        ],
      }),
    );
    run("scripts/sync-broken-links.ts", ["--input", input, "--out", out, "--detected-at", "2026-06-16T00:00:00.000Z"]);

    const db = freshDb();
    // A previously-broken link that has recovered (not in the new set).
    db.prepare(
      `INSERT INTO broken_links (usps,datapoint_id,url,citation,classification,detected_at) VALUES ('TX','sources','https://gone','x','client-error','2026-01-01')`,
    ).run();
    // A still-broken link with an older detected_at to be preserved.
    db.prepare(
      `INSERT INTO broken_links (usps,datapoint_id,url,citation,classification,detected_at) VALUES ('CA','sources','https://dead','CA / sources[2]','client-error','2026-01-01')`,
    ).run();

    db.exec(readFileSync(out, "utf8"));

    const rows = db
      .prepare(`SELECT usps,datapoint_id,url,detected_at FROM broken_links ORDER BY datapoint_id`)
      .all() as Array<Record<string, unknown>>;
    // Recovered TX row gone; two CA datapoints present; OK link never added.
    expect(rows.map((r) => `${r.usps}:${r.datapoint_id}`)).toEqual(["CA:sealOfBiliteracy.sourceUrl", "CA:sources"]);
    // Still-broken row kept its original detected_at (ON CONFLICT DO NOTHING).
    expect(rows.find((r) => r.datapoint_id === "sources")!.detected_at).toBe("2026-01-01");
  });

  // D1 rejects explicit SQL transactions outright and fails the whole file,
  // so a BEGIN/COMMIT wrapper meant none of the statements ran. Every other
  // test here executes this SQL against node:sqlite, which accepts
  // transactions happily — the generated SQL therefore looked correct in
  // tests while never once reaching production. Assert on the text, because
  // the local engine cannot reproduce the remote's objection.
  it("emits no explicit transaction statements, which D1 refuses", () => {
    for (const script of ["scripts/sync-broken-links.ts", "scripts/sync-link-reviews.ts"]) {
      for (const results of [
        [],
        [{ url: "https://dead", citations: ["CA / sources[2]"], status: 404, classification: "client-error" }],
        [{ url: "https://blocked", citations: ["CA / sources[3]"], status: 403, classification: "needs-review" }],
      ]) {
        const dir = tmp();
        const input = join(dir, "links.json");
        const out = join(dir, "out.sql");
        writeFileSync(input, JSON.stringify({ results }));
        run(script, ["--input", input, "--out", out]);
        const sql = readFileSync(out, "utf8");
        expect(sql).not.toMatch(/\bBEGIN\s+TRANSACTION\b/i);
        expect(sql).not.toMatch(/\bCOMMIT\b/i);
        expect(sql).not.toMatch(/\bSAVEPOINT\b/i);
      }
    }
  });

  // The weekly workflow captured `npm run check:links -- --json > links.json`,
  // which prefixes npm's own banner lines to the JSON. Both sync scripts
  // used a bare JSON.parse and threw on it, under continue-on-error — so the
  // sweep was green and the audit store never received a single row.
  it("parses a report file carrying the npm banner", () => {
    for (const script of ["scripts/sync-broken-links.ts", "scripts/sync-link-reviews.ts"]) {
      const dir = tmp();
      const input = join(dir, "links.json");
      const out = join(dir, "out.sql");
      writeFileSync(
        input,
        "\n> projectcert@0.1.0 check:links\n> tsx scripts/check-external-links.ts --json\n" +
          JSON.stringify({
            results: [
              { url: "https://dead", citations: ["CA / sources[2]"], status: 404, classification: "client-error" },
            ],
          }),
      );
      expect(() => run(script, ["--input", input, "--out", out])).not.toThrow();
      expect(readFileSync(out, "utf8").length).toBeGreaterThan(0);
    }
  });
});

describe("sync-link-reviews.ts", () => {
  it("reconciles pending rows, preserves unchanged accepted rows, and re-flags changed ones", () => {
    const dir = tmp();
    const input = join(dir, "links.json");
    const out = join(dir, "lr.sql");
    // The checker (with the whitelist) resolves an accepted-but-changed URL
    // to needs-review, so it appears in this set; an accepted-unchanged URL
    // resolves to `accepted` and never appears here.
    writeFileSync(
      input,
      JSON.stringify({
        results: [
          {
            url: "https://azed.gov",
            citations: ["AZ / sources[0]"],
            status: 403,
            classification: "needs-review",
          },
          {
            url: "https://changed.gov",
            citations: ["TX / sources[0]"],
            status: 404,
            classification: "needs-review",
          },
          {
            url: "https://dead",
            citations: ["CA / sources[0]"],
            status: 404,
            classification: "client-error",
          },
        ],
      }),
    );
    run("scripts/sync-link-reviews.ts", ["--input", input, "--out", out, "--seen-at", "2026-06-16T00:00:00.000Z"]);

    const db = freshDb();
    // Accepted + unchanged (not in the needs-review set) — must survive accepted.
    db.prepare(
      `INSERT INTO link_reviews (url,classification,citations,first_seen,last_seen,decision,reviewed_by,accepted_status) VALUES ('https://justia','needs-review','[]','2026-01-01','2026-01-01','accepted','a@b.org','403')`,
    ).run();
    // Accepted at 403, but its status changed → reappears as needs-review → must re-flag to pending and clear acceptance.
    db.prepare(
      `INSERT INTO link_reviews (url,classification,citations,first_seen,last_seen,decision,reviewed_by,accepted_status) VALUES ('https://changed.gov','needs-review','[]','2025-12-01','2025-12-01','accepted','a@b.org','403')`,
    ).run();
    // A stale pending row — must be removed.
    db.prepare(
      `INSERT INTO link_reviews (url,classification,citations,first_seen,last_seen,decision) VALUES ('https://stale','needs-review','[]','2026-01-01','2026-01-01','pending')`,
    ).run();

    db.exec(readFileSync(out, "utf8"));

    const rows = db
      .prepare(`SELECT url,decision,status,accepted_status,reviewed_by,first_seen FROM link_reviews ORDER BY url`)
      .all() as Array<Record<string, unknown>>;
    expect(rows).toEqual([
      {
        url: "https://azed.gov",
        decision: "pending",
        status: "403",
        accepted_status: null,
        reviewed_by: null,
        first_seen: "2026-06-16T00:00:00.000Z",
      },
      // re-flagged: decision back to pending, acceptance cleared, but first_seen preserved
      {
        url: "https://changed.gov",
        decision: "pending",
        status: "404",
        accepted_status: null,
        reviewed_by: null,
        first_seen: "2025-12-01",
      },
      // untouched accepted row
      {
        url: "https://justia",
        decision: "accepted",
        status: null,
        accepted_status: "403",
        reviewed_by: "a@b.org",
        first_seen: "2026-01-01",
      },
    ]);
  });

  it("refuses to write SQL when a degraded sweep regresses most of the accepted set", () => {
    // A runner that loses DNS reports every URL as a network error, which
    // differs from the status each was accepted at, so every accepted URL
    // classifies as needs-review at once. Applying that reconcile would
    // clear every reviewer decision in the table and the next nightly sync
    // would publish an empty whitelist. The run must abort instead.
    const dir = tmp();
    const input = join(dir, "links.json");
    const whitelist = join(dir, "whitelist.json");
    const out = join(dir, "lr.sql");
    const urls = ["https://a.gov", "https://b.gov", "https://c.gov", "https://d.gov"];

    writeFileSync(whitelist, JSON.stringify(Object.fromEntries(urls.map((url) => [url, { status: 403 }]))));
    writeFileSync(
      input,
      JSON.stringify({
        results: urls.map((url) => ({ url, citations: [], status: null, classification: "needs-review" })),
      }),
    );

    const stderr = runFailing("scripts/sync-link-reviews.ts", [
      "--input",
      input,
      "--out",
      out,
      "--whitelist",
      whitelist,
    ]);
    expect(stderr).toMatch(/Refusing to reconcile/);
    expect(existsSync(out)).toBe(false);
  });

  it("still reconciles when only part of the accepted set regresses", () => {
    // One or two URLs changing status is ordinary link rot, and re-flagging
    // those is the whole point of the sweep — the guard must not swallow it.
    const dir = tmp();
    const input = join(dir, "links.json");
    const whitelist = join(dir, "whitelist.json");
    const out = join(dir, "lr.sql");
    const urls = ["https://a.gov", "https://b.gov", "https://c.gov", "https://d.gov"];

    writeFileSync(whitelist, JSON.stringify(Object.fromEntries(urls.map((url) => [url, { status: 403 }]))));
    writeFileSync(
      input,
      JSON.stringify({
        results: [{ url: "https://a.gov", citations: [], status: 500, classification: "needs-review" }],
      }),
    );

    run("scripts/sync-link-reviews.ts", ["--input", input, "--out", out, "--whitelist", whitelist]);
    expect(readFileSync(out, "utf8")).toMatch(/INSERT INTO link_reviews/);
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
      JSON.stringify([
        {
          results: [
            {
              usps: "CA",
              datapoint_id: "elPercent",
              verified_by: "a@b.org",
              verified_at: "2026-06-15T00:00:00Z",
              content_hash: correctHash,
            },
            {
              usps: "CA",
              datapoint_id: "sources",
              verified_by: "a@b.org",
              verified_at: "2026-06-15T00:00:00Z",
              content_hash: "stalehash",
            },
          ],
        },
      ]),
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
    writeFileSync(
      verifications,
      JSON.stringify([
        {
          results: [
            {
              usps: "CA",
              datapoint_id: "sources",
              verified_by: "a@b.org",
              verified_at: "2026-06-15T00:00:00Z",
              content_hash: correctHash,
            },
          ],
        },
      ]),
    );
    writeFileSync(broken, JSON.stringify([{ results: [{ usps: "CA", datapoint_id: "sources" }] }]));
    run("scripts/build-verification-ledger.ts", ["--verifications", verifications, "--broken", broken, "--out", out]);

    const ledger = JSON.parse(readFileSync(out, "utf8"));
    expect(ledger.CA.verified).toEqual([]);
    expect(ledger.CA.stale).toEqual(["sources"]);
  });

  /** Build a one-checkmark verifications export for a fact datapoint whose
   *  hash is currently correct, so only the source check can lapse it. */
  function oneVerified(dir: string, datapointId: string): string {
    const ca = JSON.parse(readFileSync("src/content/states/ca.json", "utf8"));
    const hash = datapointsFor(ca).find((d) => d.id === datapointId)!.contentHash;
    const path = join(dir, "v.json");
    writeFileSync(
      path,
      JSON.stringify([
        {
          results: [
            {
              usps: "CA",
              datapoint_id: datapointId,
              verified_by: "a@b.org",
              verified_at: "2026-06-15T00:00:00Z",
              content_hash: hash,
            },
          ],
        },
      ]),
    );
    return path;
  }
  function sourcesExport(dir: string, url: string): string {
    const path = join(dir, "s.json");
    writeFileSync(path, JSON.stringify([{ results: [{ usps: "CA", datapoint_id: "elPercent", url }] }]));
    return path;
  }

  // A source-URL rewrite is invisible to the content hash of every datapoint
  // that carries a fact rather than a citation. Without this check, a
  // relocated URL leaves the confirmation standing on a citation the record
  // no longer makes.
  it("lapses a checkmark whose confirmed source is no longer cited, despite a matching hash", () => {
    const dir = tmp();
    const out = join(dir, "ledger.json");
    run("scripts/build-verification-ledger.ts", [
      "--verifications",
      oneVerified(dir, "elPercent"),
      "--sources",
      sourcesExport(dir, "https://moved.example/gone"),
      "--out",
      out,
    ]);

    const ledger = JSON.parse(readFileSync(out, "utf8"));
    expect(ledger.CA.verified).toEqual([]);
    expect(ledger.CA.stale).toEqual(["elPercent"]);
    expect(ledger.CA.count).toBe(0);
  });

  it("keeps a checkmark whose confirmed source is still cited", () => {
    const dir = tmp();
    const ca = JSON.parse(readFileSync("src/content/states/ca.json", "utf8"));
    const out = join(dir, "ledger.json");
    run("scripts/build-verification-ledger.ts", [
      "--verifications",
      oneVerified(dir, "elPercent"),
      "--sources",
      sourcesExport(dir, ca.sources[0].url),
      "--out",
      out,
    ]);

    const ledger = JSON.parse(readFileSync(out, "utf8"));
    expect(ledger.CA.verified).toEqual(["elPercent"]);
    expect(ledger.CA.stale).toEqual([]);
  });

  it("does not lapse a reviewer-added source, which the record never cites", () => {
    const dir = tmp();
    const url = "https://reviewer.example/typed-in";
    const added = join(dir, "a.json");
    writeFileSync(added, JSON.stringify([{ results: [{ usps: "CA", datapoint_id: "elPercent", url }] }]));
    const out = join(dir, "ledger.json");
    run("scripts/build-verification-ledger.ts", [
      "--verifications",
      oneVerified(dir, "elPercent"),
      "--sources",
      sourcesExport(dir, url),
      "--added",
      added,
      "--out",
      out,
    ]);

    const ledger = JSON.parse(readFileSync(out, "utf8"));
    expect(ledger.CA.verified).toEqual(["elPercent"]);
    expect(ledger.CA.stale).toEqual([]);
  });

  it("falls back to hash-only checking when --sources is omitted", () => {
    // The nightly workflow passes --sources, but the flag stays optional so
    // running the script by hand does not lapse every confirmation at once
    // for want of an export.
    const dir = tmp();
    const out = join(dir, "ledger.json");
    run("scripts/build-verification-ledger.ts", ["--verifications", oneVerified(dir, "elPercent"), "--out", out]);

    const ledger = JSON.parse(readFileSync(out, "utf8"));
    expect(ledger.CA.verified).toEqual(["elPercent"]);
  });
});

describe("build-link-whitelist.ts", () => {
  it("exports accepted rows (with accepted status) into the whitelist shape", () => {
    const dir = tmp();
    const accepted = join(dir, "accepted.json");
    const out = join(dir, "whitelist.json");
    writeFileSync(
      accepted,
      JSON.stringify([
        {
          results: [
            {
              url: "https://azed.gov",
              accepted_status: "403",
              reviewed_by: "jane@x.org",
              reviewed_at: "2026-06-16T10:00:00Z",
              note: "WAF blocks bots",
            },
            {
              url: "https://justia.com",
              accepted_status: "403",
              reviewed_by: "jane@x.org",
              reviewed_at: "2026-06-16T11:00:00Z",
              note: null,
            },
            {
              url: "https://reset.gov",
              accepted_status: null,
              reviewed_by: "jane@x.org",
              reviewed_at: "2026-06-16T12:00:00Z",
              note: "TLS reset to bots",
            },
          ],
        },
      ]),
    );
    run("scripts/build-link-whitelist.ts", ["--accepted", accepted, "--out", out]);

    const wl = JSON.parse(readFileSync(out, "utf8"));
    expect(wl["https://azed.gov"]).toEqual({
      status: 403,
      acceptedAt: "2026-06-16",
      note: "WAF blocks bots",
    });
    expect(wl["https://justia.com"]).toEqual({
      status: 403,
      acceptedAt: "2026-06-16",
    });
    // The whitelist is committed to a public repository, so no reviewer
    // address may appear in it. `toEqual` above already fails on an extra
    // key, but assert it directly so the intent survives a future rewrite.
    for (const entry of Object.values(wl) as Record<string, unknown>[]) {
      expect(entry).not.toHaveProperty("acceptedBy");
      expect(JSON.stringify(entry)).not.toContain("@");
    }

    // network-error acceptance records null status
    expect(wl["https://reset.gov"]).toEqual({
      status: null,
      acceptedAt: "2026-06-16",
      note: "TLS reset to bots",
    });
  });
});

describe("build-reviewer-report.ts", () => {
  /** One bot-blocked source in Arizona, one dead source in Texas. */
  const MIXED = {
    results: [
      { url: "https://azed.gov/a", citations: ["AZ / sources[2]"], status: 403, classification: "needs-review" },
      {
        url: "https://tea.texas.gov/gone",
        citations: ["TX / sources[1]"],
        status: 404,
        classification: "client-error",
      },
      { url: "https://fine.example", citations: ["CA / sources[0]"], status: 200, classification: "ok" },
    ],
  };

  function build(payload: unknown): string {
    const dir = tmp();
    const input = join(dir, "links.json");
    const out = join(dir, "report.md");
    writeFileSync(input, JSON.stringify(payload));
    run("scripts/build-reviewer-report.ts", ["--input", input, "--out", out, "--date", "2026-08-16"]);
    return readFileSync(out, "utf8");
  }

  it("links into the review console, never at the source itself", () => {
    const md = build(MIXED);
    // The console is where a decision can be recorded; the raw source is a
    // dead end for a reviewer reading their mail.
    expect(md).toContain("https://projectcert.org/audit/links/");
    expect(md).toContain("https://projectcert.org/audit/az/");
    expect(md).toContain("https://projectcert.org/audit/tx/");
    expect(md).not.toContain("https://azed.gov/a");
    expect(md).not.toContain("https://tea.texas.gov/gone");
  });

  it("names states in full rather than by code", () => {
    const md = build(MIXED);
    expect(md).toContain("Arizona");
    expect(md).toContain("Texas");
  });

  // CLAUDE.md: no schema identifiers, enum values or status codes in copy a
  // reader outside this repository will see. The reviewers are doctoral
  // students verifying agency sources, not maintainers of the checker.
  it("uses no jargon, enum values, status codes or citation paths", () => {
    const md = build(MIXED);
    for (const leak of [
      "needs-review",
      "client-error",
      "classification",
      "sources[",
      "403",
      "404",
      "HTTP",
      "USPS",
      "JSON",
    ]) {
      expect(md).not.toContain(leak);
    }
  });

  it("separates 'could not be checked' from 'no longer available'", () => {
    const md = build(MIXED);
    // The two demand different work — confirm one, replace the other — so
    // collapsing them would send reviewers hunting for a replacement page
    // for a source that was fine all along.
    expect(md).toMatch(/could not be checked automatically/i);
    expect(md).toMatch(/no longer available/i);
  });

  it("says so plainly when there is nothing to review", () => {
    const md = build({ results: [{ url: "https://ok", citations: ["CA / sources[0]"], classification: "ok" }] });
    expect(md).toMatch(/nothing needs review/i);
    expect(md).not.toMatch(/could not be checked/i);
  });

  it("counts a source cited by several states once per state", () => {
    // Shared sources (NCES, WIDA) are cited across states; each reviewer
    // needs to see it in their own list.
    const md = build({
      results: [
        {
          url: "https://nces.ed.gov/shared",
          citations: ["AZ / sources[9]", "TX / sources[9]"],
          classification: "needs-review",
        },
      ],
    });
    expect(md).toContain("Arizona");
    expect(md).toContain("Texas");
  });
});

describe("sync-link-reviews.ts — a reported-gone URL", () => {
  /** A dead URL keeps failing every sweep, so it reappears in the
   *  needs-review set forever. Without a guard, each sweep would reset the
   *  verdict and ask the same reviewer the same question every week. */
  function sweepOver(deadUrl: string) {
    const dir = tmp();
    const input = join(dir, "links.json");
    const out = join(dir, "lr.sql");
    writeFileSync(
      input,
      JSON.stringify({
        results: [
          {
            url: deadUrl,
            citations: ["AZ / sources[0]", "AZ / sources[4]"],
            status: 404,
            classification: "needs-review",
          },
        ],
      }),
    );
    run("scripts/sync-link-reviews.ts", ["--input", input, "--out", out, "--seen-at", "2026-07-01T00:00:00.000Z"]);

    const db = freshDb();
    db.prepare(
      `INSERT INTO link_reviews (url,status,classification,citations,first_seen,last_seen,decision,reviewed_by,reviewed_at)
       VALUES ('${deadUrl}','403','needs-review','[]','2026-01-01','2026-01-01','dead','jane@x.org','2026-02-02')`,
    ).run();
    db.exec(readFileSync(out, "utf8"));
    return db.prepare(`SELECT * FROM link_reviews WHERE url = '${deadUrl}'`).get() as Record<string, unknown>;
  }

  it("survives the weekly sweep with its verdict and attribution intact", () => {
    const row = sweepOver("https://gone.example");
    expect(row.decision).toBe("dead");
    expect(row.reviewed_by).toBe("jane@x.org");
    expect(row.reviewed_at).toBe("2026-02-02");
  });

  it("still has its observation refreshed, so the citation list stays current", () => {
    // Whoever replaces the citation needs to know where it is cited now,
    // not where it was when someone first opened it.
    const row = sweepOver("https://gone.example");
    expect(row.status).toBe("404");
    expect(row.last_seen).toBe("2026-07-01T00:00:00.000Z");
    expect(JSON.parse(String(row.citations))).toEqual(["AZ / sources[0]", "AZ / sources[4]"]);
    expect(row.first_seen).toBe("2026-01-01");
  });

  it("is not deleted as a stale pending row when it stops being reported", () => {
    // Once the citation is fixed the URL leaves the catalog entirely. The
    // DELETE only targets pending rows, so the record of what was found
    // survives rather than vanishing silently.
    const dir = tmp();
    const input = join(dir, "links.json");
    const out = join(dir, "lr.sql");
    writeFileSync(input, JSON.stringify({ results: [] }));
    run("scripts/sync-link-reviews.ts", ["--input", input, "--out", out]);

    const db = freshDb();
    db.prepare(
      `INSERT INTO link_reviews (url,classification,citations,first_seen,last_seen,decision,reviewed_by)
       VALUES ('https://gone.example','needs-review','[]','2026-01-01','2026-01-01','dead','jane@x.org')`,
    ).run();
    db.exec(readFileSync(out, "utf8"));
    const row = db.prepare(`SELECT decision FROM link_reviews WHERE url = 'https://gone.example'`).get();
    expect(row).toMatchObject({ decision: "dead" });
  });
});
