/**
 * Apply broken-URL recoveries from the 2026-05-10 audit (sources from
 * `sources/_consolidated/2026-05-10/research-followups.md` plus the
 * per-state audit reports). Each replacement is a verified-working URL
 * from the same SEA/host where possible.
 *
 * For URLs that didn't have a direct replacement (some NC and TN
 * pages, IN's deleted PDFs), we substitute a current authoritative
 * cite — Indiana Code, ETS Praxis, sealofbiliteracy.org — and
 * preserve the original `label` text.
 *
 * The Southern Ohio ESC PDF (third-party host, content unrecoverable)
 * is removed from OH `sources[]` outright; OH's credential facts are
 * grounded in ODEW/legislature.ohio.gov citations elsewhere in the
 * array.
 *
 * Idempotent.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR =
  process.env.STATES_DIR ?? resolve(__dirname, "../src/content/states");

interface Source {
  label: string;
  url: string;
  retrievedAt: string;
  retrievedBy: string;
}
interface History {
  date: string;
  title: string;
  description: string;
  sourceUrls: string[];
}
interface State {
  usps: string;
  sources: Source[];
  history?: History[];
  [k: string]: unknown;
}

const log: string[] = [];
const note = (m: string): void => {
  log.push(m);
};

function load(usps: string): State {
  return JSON.parse(
    readFileSync(`${STATES_DIR}/${usps.toLowerCase()}.json`, "utf8"),
  ) as State;
}
function save(s: State): void {
  writeFileSync(
    `${STATES_DIR}/${s.usps.toLowerCase()}.json`,
    JSON.stringify(s, null, 2) + "\n",
    "utf8",
  );
}
function swapAllUrls(
  s: State,
  swaps: Array<[oldUrl: string | RegExp, newUrl: string]>,
): void {
  const swap = (url: string): string => {
    for (const [pat, rep] of swaps) {
      if (pat instanceof RegExp ? pat.test(url) : url === pat) {
        return rep;
      }
    }
    return url;
  };
  for (const src of s.sources) {
    const next = swap(src.url);
    if (next !== src.url) {
      src.url = next;
    }
  }
  for (const h of s.history ?? []) {
    h.sourceUrls = h.sourceUrls.map(swap);
  }
}
function dedupeSources(s: State): void {
  const seen = new Set<string>();
  const kept: Source[] = [];
  for (const src of s.sources) {
    if (seen.has(src.url)) continue;
    seen.add(src.url);
    kept.push(src);
  }
  if (kept.length !== s.sources.length) {
    s.sources = kept;
  }
}

// ─── NC: 4 broken dpi.nc.gov URLs ───────────────────────────────────────
{
  const s = load("NC");
  const before = JSON.stringify(s);
  swapAllUrls(s, [
    // Professional teaching standards landing page → general licensure hub
    [
      "https://www.dpi.nc.gov/educators/educator-preparation/educator-preparation-policies/professional-teaching-standards",
      "https://www.dpi.nc.gov/educators/educators-licensure",
    ],
    // Praxis testing requirements PDF index → ETS Praxis NC page
    [
      "https://www.dpi.nc.gov/documents/licensure/praxis-testing-requirements/open",
      "https://www.ets.org/praxis/states/nc.html",
    ],
    // Diploma endorsements page → Seal of Biliteracy registry (state page)
    [
      "https://www.dpi.nc.gov/students-families/students/k-12-students/high-school/high-school-diploma-endorsements",
      "https://sealofbiliteracy.org/state/nc",
    ],
    // Global Languages Endorsement page → Seal of Biliteracy registry
    [
      "https://www.dpi.nc.gov/students-families/student-supports/global-languages-endorsement",
      "https://sealofbiliteracy.org/state/nc",
    ],
    // dpi.nc.gov/media/8932/open (older PDF) → ETS Praxis NC (closest stable equivalent)
    [
      "https://www.dpi.nc.gov/media/8932/open",
      "https://www.ets.org/praxis/states/nc.html",
    ],
  ]);
  dedupeSources(s);
  if (JSON.stringify(s) !== before) {
    save(s);
    note("NC: 5 dpi.nc.gov URLs swapped");
  }
}

// ─── NE: 1 still-broken Clean-Rule-24-2024.pdf → Sept 2024 update ───────
{
  const s = load("NE");
  const before = JSON.stringify(s);
  swapAllUrls(s, [
    [
      "https://www.education.ne.gov/wp-content/uploads/2024/06/Clean-Rule-24-2024.pdf",
      "https://www.education.ne.gov/wp-content/uploads/2024/09/Nebraska-Rule-24-Endorsements-Content-Tests-and-Passing-Scores.pdf",
    ],
  ]);
  dedupeSources(s);
  if (JSON.stringify(s) !== before) {
    save(s);
    note("NE: Clean-Rule-24 June 2024 → Sept 2024 update");
  }
}

// ─── TN: 2 confirmed swaps + 1 redirect from research ───────────────────
{
  const s = load("TN");
  const before = JSON.stringify(s);
  swapAllUrls(s, [
    [
      "https://www.tn.gov/content/dam/tn/education/esl/esl_manual.pdf",
      "https://www.tn.gov/content/dam/tn/education/cpm/ESL_Manual.pdf",
    ],
    [
      "https://www.tn.gov/education/families/student-supports-in-tn/english-as-a-second-language.html",
      "https://www.tn.gov/education/families/student-support/english-learners.html",
    ],
  ]);
  dedupeSources(s);
  if (JSON.stringify(s) !== before) {
    save(s);
    note("TN: 2 tn.gov URLs swapped");
  }
}

// ─── IN: 7 deleted IDOE PDFs → Indiana Code (IC 20-30-9) substitute ─────
// All seven files vanished from in.gov/doe/files/ with no redirects.
// Underlying credential facts are grounded in IC 20-30-9 et seq; we
// substitute the IGA URL and preserve each entry's `label` so it's
// clear what the original document was.
{
  const s = load("IN");
  const before = JSON.stringify(s);
  const icUrl = "https://iga.in.gov/laws/2024/ic/titles/20#20-30-9";
  swapAllUrls(s, [
    [
      /^https:\/\/www\.in\.gov\/doe\/files\/EL-Program-Staffing-Memo\.pdf$/,
      icUrl,
    ],
    [/^https:\/\/www\.in\.gov\/doe\/files\/EL-Quick-Start-Guide\.pdf$/, icUrl],
    [/^https:\/\/www\.in\.gov\/doe\/files\/EL-ToR-FAQ\.pdf$/, icUrl],
    [
      /^https:\/\/www\.in\.gov\/doe\/files\/IN-Content-Standards-EL\.pdf$/,
      icUrl,
    ],
    [
      /^https:\/\/www\.in\.gov\/doe\/files\/Indiana-CORE-Required-Tests\.pdf$/,
      icUrl,
    ],
    [
      /^https:\/\/www\.in\.gov\/doe\/files\/License-Areas-Praxis-Tests-Fees\.pdf$/,
      icUrl,
    ],
    [
      /^https:\/\/www\.in\.gov\/doe\/files\/Meeting-EL-ToR-Requirements\.pdf$/,
      icUrl,
    ],
  ]);
  dedupeSources(s);
  if (JSON.stringify(s) !== before) {
    save(s);
    note("IN: 7 deleted IDOE PDFs → IC 20-30-9");
  }
}

// ─── ME: agent's bad `/staffing` swap → verified `/services` ────────────
// Verifier confirmed `/multilinguallearner/services` resolves and contains
// the staffing guidance.
{
  const s = load("ME");
  const before = JSON.stringify(s);
  swapAllUrls(s, [
    ["https://www.maine.gov/doe/home", "https://www.maine.gov/doe"],
    [
      "https://www.maine.gov/doe/learning/multilingual",
      "https://www.maine.gov/doe/learning/multilinguallearner",
    ],
    [
      "https://www.maine.gov/doe/learning/multilingual/staffing",
      "https://www.maine.gov/doe/learning/multilinguallearner/services",
    ],
  ]);
  dedupeSources(s);
  if (JSON.stringify(s) !== before) {
    save(s);
    note("ME: 3 maine.gov URLs swapped to /multilinguallearner/services");
  }
}

// ─── OH: remove third-party Southern Ohio ESC PDF source ────────────────
{
  const s = load("OH");
  const before = s.sources.length;
  const removeUrl =
    "https://www.southernohioesc.org/wp-content/uploads/sites/13/2020/09/Qualification-for-Teachers-Providing-Language-Instruction-Educational-Programs-for-English-Learners.pdf";
  s.sources = s.sources.filter((src) => src.url !== removeUrl);
  if (s.sources.length !== before) {
    // Also strip from any history sourceUrls.
    for (const h of s.history ?? []) {
      h.sourceUrls = h.sourceUrls.filter((u) => u !== removeUrl);
    }
    save(s);
    note("OH: Southern Ohio ESC PDF removed (third-party 404)");
  }
}

console.log(`Applied ${log.length} URL-recovery edits:\n`);
for (const m of log) console.log(`  - ${m}`);
