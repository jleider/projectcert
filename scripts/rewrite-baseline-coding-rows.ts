/**
 * Reframes the 2019-12-01 history rows from catalog-QA-language
 * ("Baseline coding") to a description of the published academic
 * research event (Leider, Colombo & Nerlino's December-2019 SEA-document
 * coding, published in EPAA 29(100), 2021).
 *
 * Rationale: the 2019 baseline is a real, citable peer-reviewed
 * research milestone — the data point at which every state's EL
 * credentialing landscape was systematically coded by an outside
 * scholarly source. The original wording read like catalog
 * housekeeping; the verifier flagged the title pattern as a
 * meta-process violation per state-source-refresh/SKILL.md.
 * Preserving the data while rewording to academic-event voice
 * resolves both concerns.
 *
 * Also rewrites the IA 2023-07-01 "Iowa DOE rebrands to educate.iowa.gov
 * domain" description to drop the catalog-workflow clause; the rebrand
 * itself is a real fact, the "this refresh re-grounds field-level
 * claims" framing was the meta-process violation.
 *
 * Idempotent.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

interface HistoryRow {
  date: string;
  title: string;
  description: string;
  sourceUrls: string[];
}
interface StateFile {
  usps: string;
  name: string;
  history?: HistoryRow[];
  [key: string]: unknown;
}

const NEW_TITLE =
  "EPAA 29(100) document analysis (Leider, Colombo & Nerlino, 2021)";
const NEW_DESCRIPTION_TMPL = (name: string): string =>
  `Leider, Colombo & Nerlino published in Education Policy Analysis Archives 29(100) a comprehensive document analysis of every state and DC's bilingual, ELD/ESL, and SEI teacher-credentialing requirements, professional teaching standards mentions, and EL-percentage figures, based on primary SEA sources collected October–December 2019. The 2019 coding of ${name}'s EL-credentialing landscape is preserved as a temporally-anchored research baseline against which the catalog's later verifications are framed.`;
const PAPER_DOI = "https://doi.org/10.14507/epaa.29.5279";

const IA_REBRAND_NEW_DESCRIPTION =
  "The Iowa Department of Education migrated its public-facing domain from educateiowa.gov to educate.iowa.gov, with redirects in place. Earlier citations against the prior domain may resolve through the redirect chain.";

let rewrote = 0;

for (const file of readdirSync(STATES_DIR).sort()) {
  if (!file.endsWith(".json")) continue;
  const path = join(STATES_DIR, file);
  const obj = JSON.parse(readFileSync(path, "utf8")) as StateFile;
  if (!Array.isArray(obj.history)) continue;
  let changed = false;

  for (const row of obj.history) {
    if (row.date === "2019-12-01" && /^baseline coding/i.test(row.title)) {
      row.title = NEW_TITLE;
      row.description = NEW_DESCRIPTION_TMPL(obj.name);
      // Ensure DOI URL is present.
      if (!row.sourceUrls.includes(PAPER_DOI)) {
        row.sourceUrls = [PAPER_DOI, ...row.sourceUrls];
      }
      changed = true;
    }
    if (
      obj.usps === "IA" &&
      row.date === "2023-07-01" &&
      /rebrand/i.test(row.title)
    ) {
      row.description = IA_REBRAND_NEW_DESCRIPTION;
      changed = true;
    }
  }

  if (changed) {
    writeFileSync(path, JSON.stringify(obj, null, 2) + "\n", "utf8");
    rewrote++;
    console.log(`${obj.usps}: rewrote baseline-coding row`);
  }
}

console.log(`\nReworded baseline-coding rows in ${rewrote} states.`);
