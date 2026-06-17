/**
 * Apply the factual-correction subset of the 2026-05-10 audit:
 *   - AZ: history[2019-07-09] bill HB 2435 → SB 1014 (HB 2435 is a
 *     medical-marijuana bill; SB 1014, 54th Leg 1st Reg Session 2019,
 *     is the actual ELD-block reduction).
 *   - SC: elPercent 5.6 → 5.8 (NCES d23 Table 204.20 confirms 5.8% for
 *     fall 2021; the prior label "41,949 / 5.6%" was inconsistent).
 *   - TN: elPercent 9 → 5.8, elPercentAsOf 2024-05-30 → 2021-10-01
 *     (the 2024-05-30 date was a TDOE workshop slide date, not a
 *     census date; align to NCES for cross-state comparability).
 *   - NM: history[2014-03-05] Seal of Biliteracy bill SB 159 → HB 330;
 *     NMAC 6.32.2 → 6.32.3 (SB 159 was an unrelated tech-infrastructure
 *     bill; 6.32.2 NMAC governs BMEPs, 6.32.3 NMAC implements the Seal).
 *   - VA: bilingual.notes "effective 2025" → "effective 2026-01-01"
 *     (8VAC20-23-321 took effect 2026-01-01 per VR Vol. 42 Issue 7;
 *     the 2025 date the prior text used was a webinar announcement).
 *   - MA: sei.notes reattributed (RETELL/2011 DOJ settlement created
 *     the SEI framework; LOOK Act 2017 codified it — the prior text
 *     misattributed the "statutory backbone" to LOOK alone).
 *
 * Idempotent.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR =
  process.env.STATES_DIR ?? resolve(__dirname, "../src/content/states");

interface H {
  date: string;
  title: string;
  description: string;
  sourceUrls: string[];
}
interface S {
  usps: string;
  elPercent: number;
  elPercentAsOf: string;
  credentials: { bilingual: { notes?: string }; sei: { notes?: string } };
  history?: H[];
  [k: string]: unknown;
}

const log: string[] = [];
const note = (m: string): void => {
  log.push(m);
};
const load = (u: string): S =>
  JSON.parse(
    readFileSync(`${STATES_DIR}/${u.toLowerCase()}.json`, "utf8"),
  ) as S;
const save = (s: S): void =>
  writeFileSync(
    `${STATES_DIR}/${s.usps.toLowerCase()}.json`,
    JSON.stringify(s, null, 2) + "\n",
    "utf8",
  );

// AZ: HB 2435 → SB 1014
{
  const s = load("AZ");
  for (const r of s.history ?? []) {
    if (r.date === "2019-07-09" && /HB\s*2435/.test(r.title)) {
      r.title = r.title.replace(/HB\s*2435/g, "SB 1014");
      r.description = r.description
        .replace(/HB\s*2435/g, "SB 1014")
        .replace(/House Bill 2435/g, "Senate Bill 1014");
      const u =
        "https://www.azleg.gov/legtext/54leg/1R/summary/S.1014ED_ASPASSEDCOMMITTEE.DOCX.htm";
      if (!r.sourceUrls.includes(u)) r.sourceUrls.push(u);
      note("AZ: history[2019-07-09] HB 2435 → SB 1014");
    }
  }
  save(s);
}

// SC: elPercent 5.6 → 5.8
{
  const s = load("SC");
  if (s.elPercent === 5.6) {
    s.elPercent = 5.8;
    note("SC: elPercent 5.6 → 5.8");
  }
  save(s);
}

// TN: 9 / 2024-05-30 → 5.8 / 2021-10-01 (NCES alignment)
{
  const s = load("TN");
  if (s.elPercent === 9 && s.elPercentAsOf === "2024-05-30") {
    s.elPercent = 5.8;
    s.elPercentAsOf = "2021-10-01";
    note("TN: elPercent 9/2024-05-30 → 5.8/2021-10-01");
  }
  save(s);
}

// NM: Seal of Biliteracy bill + NMAC correction
{
  const s = load("NM");
  for (const r of s.history ?? []) {
    if (
      /Seal of (Biliteracy|Bilingualism)/i.test(r.title) &&
      (/SB\s*159|Senate Bill 159/i.test(r.description) ||
        /6\.32\.2 NMAC/.test(r.description))
    ) {
      r.description = r.description
        .replace(/Senate Bill 159/g, "House Bill 330")
        .replace(/SB\s*159/g, "HB 330")
        .replace(/6\.32\.2 NMAC/g, "6.32.3 NMAC");
      const u = "https://theglobalseal.com/new-mexico-seal-of-biliteracy";
      if (!r.sourceUrls.includes(u)) r.sourceUrls.push(u);
      note("NM: Seal of Biliteracy bill SB 159 → HB 330; NMAC 6.32.2 → 6.32.3");
    }
  }
  save(s);
}

// VA: bilingual.notes effective 2025 → 2026-01-01
{
  const s = load("VA");
  const cur = s.credentials.bilingual.notes;
  if (cur) {
    const fixed = cur
      .replace(/effective\s+2025/gi, "effective 2026-01-01")
      .replace(/2025-08-07/g, "2026-01-01");
    if (fixed !== cur) {
      s.credentials.bilingual.notes = fixed;
      note("VA: bilingual.notes effective-date corrected to 2026-01-01");
    }
  }
  save(s);
}

// MA: sei.notes RETELL/2011 DOJ attribution
{
  const s = load("MA");
  const cur = s.credentials.sei.notes;
  if (cur && /LOOK Act \(2017\) provides the statutory backbone/.test(cur)) {
    s.credentials.sei.notes = cur.replace(
      /LOOK Act \(2017\) provides the statutory backbone/,
      "The SEI Endorsement framework was created through DESE's RETELL initiative under the 2011 federal DOJ settlement; the LOOK Act (2017) codified and expanded that framework",
    );
    note("MA: sei.notes reattributed to RETELL/2011 DOJ settlement");
  }
  save(s);
}

console.log(`Factual corrections applied:`);
for (const m of log) console.log(`  - ${m}`);
