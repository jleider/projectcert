/**
 * One-shot: append a 2026 verification history event to each of the
 * states that have been re-verified against current SEA sources.
 *
 * Each entry summarizes the most material change(s) found during the
 * refresh — sourced from the per-state changes-from-baseline.md files
 * under sources/<usps>/<date>/. Idempotent: skips if the state already
 * has a history entry on its lastVerified date.
 *
 * Run once: `tsx scripts/seed-2026-verification-history.ts`
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

interface HistoryEvent {
  date: string;
  title: string;
  description: string;
  sourceUrls?: string[];
}

const ENTRIES: Record<string, HistoryEvent> = {
  ma: {
    date: "2026-05-07",
    title: "Re-verified against current DESE sources",
    description:
      "Bilingual reclassified standalone → add-on; ESL reclassified add-on → standalone (DESE lists Bilingual only as an endorsement and ESL as an Academic PreK-12 license). SEI mandate scope confirmed extended to vocational educators effective July 2021 under the LOOK Act. elPercent updated 10.0 → 10.5 (NCES fall 2021).",
    sourceUrls: [
      "https://www.doe.mass.edu/licensure/academic-prek12/teacher/endorsement.html",
    ],
  },
  nv: {
    date: "2026-05-07",
    title: "Re-verified against current NDE sources",
    description:
      "Confirmed Nevada's rename of TESL → ELAD (English Language Acquisition and Development) under NAC 391.237. Bilingual.program null → true (NAC 391.242 names an approved program pathway); bilingual.test null → true (T002-24, effective 2024-12-26, requires a Praxis language exam prior to issuance). The 2019 'SEI phase-in' note retired — ELAD remains a voluntary specialization, not a universal mandate. elPercent 17.1 → 13.8 (NCES fall 2021; NCES flags NV's drop as the largest 2011–2021 negative change nationally).",
  },
  co: {
    date: "2026-05-07",
    title: "Re-verified against current CDE sources",
    description:
      "Bilingual reclassified standalone → add-on (CDE explicitly classifies both CLDE and CLD Bilingual Education as 'added endorsements only'). New 45-hour EL professional-development requirement effective 2025-09-01 for educators renewing licenses with elementary, ELA, math, science, or social-studies endorsements. Standards corrections: linguistic true → false (text says 'language', not 'linguistic'); el false → true (2011 Quality Standards 2.4 explicitly names English language learners).",
    sourceUrls: ["https://www.cde.state.co.us/cdeprof"],
  },
  nm: {
    date: "2026-05-07",
    title: "Re-verified against current NMPED sources",
    description:
      "Standards.linguistic and .el both corrected to false — 6.69.4 NMAC (the general teacher competencies) contains zero mentions of EL/ELL/English learner/second language/bilingual, and the word 'linguistic' does not appear. elPercent 16.3 → 18.8 (NCES fall 2021). Notes expanded with Yazzie/Martinez v. State of New Mexico litigation and remediation context through plaintiffs' February 2026 objections to the State's November 2025 remedial action plan.",
  },
  wa: {
    date: "2026-05-07",
    title: "Re-verified against current OSPI/PESB sources",
    description:
      "Bilingual.standalone and ELD.standalone both true → false — Washington's ELL and Bilingual credentials are PESB endorsements added to a teaching certificate, not standalone licenses (WAC 181-82A). Standards.diverse and .el corrected false → true (InTASC, adopted by PESB as the role standards, explicitly enumerates 'English language learners' across Standards 1, 2, 6, 8 and references linguistic diversity; 2022 CCDEI standards add the diverse and cultural framing). TBIP renamed to Multilingual Education in OSPI guidance.",
    sourceUrls: ["https://www.pesb.wa.gov/", "https://ospi.k12.wa.us/"],
  },
  az: {
    date: "2026-05-07",
    title: "Re-verified against current ADE sources",
    description:
      "R7-2-615 re-read: bilingual.requirements.program null → true (R7-2-615(J)(4)(b) names an approved bilingual education program as Option A) and ELD.requirements.program null → true (R7-2-615(K)(3)(b) names an approved ESL program as Option A). Standards.el false → true — R7-2-602 Standard 2 explicitly references 'English language learners' and second-language acquisition. SEI mandate confirmed unchanged; notes expanded with Prop 203 (2000) / HB 2064 (2006) statutory backbone and the spring 2019 reduction of the daily SEI ELD block from 4 hours to 2 hours.",
  },
};

let added = 0;
let skipped = 0;

for (const [usps, event] of Object.entries(ENTRIES)) {
  const path = join(STATES_DIR, `${usps}.json`);
  const json = JSON.parse(readFileSync(path, "utf8")) as {
    history?: HistoryEvent[];
    [k: string]: unknown;
  };

  const existing = json.history ?? [];
  if (existing.some((e) => e.date === event.date && e.title === event.title)) {
    skipped++;
    continue;
  }

  json.history = [...existing, event];
  writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
  added++;
}

console.log(
  `Added 2026 verification entries to ${added} states; skipped ${skipped}.`,
);
