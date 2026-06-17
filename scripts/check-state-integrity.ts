/**
 * Build-time integrity guards on `src/content/states/*.json`.
 *
 * Runs ahead of `astro build`. Fails the build if:
 *
 * 1. The collection isn't exactly 51 records (50 states + DC).
 * 2. A USPS code appears more than once.
 * 3. A `projectcert-2026` source's `retrievedAt` doesn't have a
 *    matching `sources/<USPS>/<YYYY-MM-DD>/` snapshot directory.
 *
 * The snapshot rule encodes the provenance-is-the-product principle:
 * a record can't claim a 2026 retrieval without the bytes-on-disk that
 * back it up. Existing baseline-2019 sources are exempt — those refer
 * to the seed paper's Appendix A, not our own filesystem.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");
const SOURCES_DIR = resolve(__dirname, "../sources");

const EXPECTED_COUNT = 51;

interface SourceRow {
  url: string;
  retrievedAt: string;
  retrievedBy: "leider-2021" | "projectcert-2026";
}
interface StateFile {
  usps: string;
  sources: SourceRow[];
  verificationStatus: "baseline-2019" | "in-progress" | "verified-2026";
  lastVerified: string;
}

const errors: string[] = [];

const files = readdirSync(STATES_DIR).filter((f) => f.endsWith(".json"));

if (files.length !== EXPECTED_COUNT) {
  errors.push(
    `Expected ${EXPECTED_COUNT} state files (50 states + DC), found ${files.length}.`,
  );
}

const seenUsps = new Map<string, string>();

for (const f of files) {
  const path = join(STATES_DIR, f);
  const data = JSON.parse(readFileSync(path, "utf8")) as StateFile;
  const usps = data.usps;

  // Filename and `usps` must agree.
  const expectedFile = `${usps.toLowerCase()}.json`;
  if (f !== expectedFile) {
    errors.push(
      `${f}: filename does not match usps "${usps}" (expected ${expectedFile})`,
    );
  }

  if (seenUsps.has(usps)) {
    errors.push(`${usps} is defined in both ${seenUsps.get(usps)} and ${f}`);
  }
  seenUsps.set(usps, f);

  // verified-2026 must leave an audit trail under sources/<USPS>/<date>/
  // changes-from-baseline.md. Without it, a refresh can silently
  // promote without recording what diverged from the 2019 baseline.
  if (data.verificationStatus === "verified-2026") {
    const stateSourcesDir = join(SOURCES_DIR, usps);
    let foundChangesDoc = false;
    try {
      const dates = readdirSync(stateSourcesDir);
      for (const dateDir of dates) {
        const candidate = join(
          stateSourcesDir,
          dateDir,
          "changes-from-baseline.md",
        );
        try {
          if (statSync(candidate).isFile()) {
            foundChangesDoc = true;
            break;
          }
        } catch {
          // missing file — keep looking
        }
      }
    } catch {
      // missing per-state sources dir — falls through
    }
    if (!foundChangesDoc) {
      errors.push(
        `${usps}: verificationStatus=verified-2026 requires sources/${usps}/<date>/changes-from-baseline.md (none found)`,
      );
    }
  }

  // Snapshot directory check.
  for (const src of data.sources ?? []) {
    if (src.retrievedBy !== "projectcert-2026") continue;
    const snapDir = join(SOURCES_DIR, usps, src.retrievedAt);
    let exists = false;
    try {
      exists = statSync(snapDir).isDirectory();
    } catch {
      // statSync throws ENOENT when the directory is absent.
    }
    if (!exists) {
      // Cross-state shared sources (e.g., NCES, WIDA roster) live
      // under sources/<topic>/<date>/ rather than per-state. Allow
      // the source to skip the per-state-snapshot rule if a
      // top-level topic dir exists for its retrievedAt date. This
      // is permissive but keeps us honest on per-SEA documents.
      const isCrossState = [
        "nces",
        "wida",
        "elp-assessments",
        "seal-of-biliteracy",
      ].some((topic) => {
        try {
          return statSync(
            join(SOURCES_DIR, topic, src.retrievedAt),
          ).isDirectory();
        } catch {
          return false;
        }
      });
      if (!isCrossState) {
        errors.push(
          `${usps}: projectcert-2026 source "${src.url}" claims retrievedAt=${src.retrievedAt} but no snapshot at sources/${usps}/${src.retrievedAt}/`,
        );
      }
    }
  }
}

if (errors.length > 0) {
  console.error("State integrity check FAILED:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(
  `State integrity check PASSED (${files.length} files, ${seenUsps.size} unique USPS codes).`,
);
