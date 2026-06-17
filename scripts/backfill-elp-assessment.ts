/**
 * One-shot backfill for the new `elpAssessment` field on every state
 * record (replacing the prior boolean `widaMember`), plus a sourceUrl
 * on `sealOfBiliteracy`.
 *
 * Provenance:
 * - WIDA member roster: https://wida.wisc.edu/about/consortium
 *   (38 states + DC use ACCESS for ELLs).
 * - Non-WIDA assessments: per-state SEA pages where reachable, plus
 *   well-known assessment names (AZELLA, ELPAC, TELPAS, OELPA, ELPT,
 *   LAS Links, ELPA21). Where a state's primary SEA page didn't return
 *   via WebFetch, sourceUrl falls back to the consortium homepage or a
 *   secondary reference. See sources/elp-assessments/2026-05-07/ for
 *   per-row notes.
 * - Seal of Biliteracy sourceUrl: sealofbiliteracy.org plus Wikipedia.
 *
 * Run once: `tsx scripts/backfill-elp-assessment.ts`
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

const WIDA_URL = "https://wida.wisc.edu/about/consortium";
const ELPA21_URL = "https://en.wikipedia.org/wiki/ELPA21";
const SEAL_URL_DEFAULT = "https://en.wikipedia.org/wiki/Seal_of_Biliteracy";
const SEAL_URL_ORG = "https://sealofbiliteracy.org/";

interface ElpEntry {
  name: string;
  consortium: "WIDA" | "ELPA21" | null;
  sourceUrl: string | null;
}

const WIDA_MEMBERS = new Set([
  "AK",
  "AL",
  "CO",
  "DC",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "KS",
  "KY",
  "MA",
  "MD",
  "ME",
  "MI",
  "MN",
  "MO",
  "MT",
  "NC",
  "ND",
  "NH",
  "NJ",
  "NM",
  "NV",
  "NY",
  "OK",
  "PA",
  "RI",
  "SC",
  "SD",
  "UT",
  "VA",
  "VT",
  "WA",
  "WI",
  "WY",
]);

// Non-WIDA states. sourceUrl prefers the SEA's own page where a stable
// URL is known; falls back to the consortium reference (ELPA21) or the
// Wikipedia article on the assessment.
const NON_WIDA: Record<string, ElpEntry> = {
  AZ: {
    name: "AZELLA",
    consortium: null,
    sourceUrl: "https://www.azed.gov/oelas/azella",
  },
  AR: {
    name: "ELPA21",
    consortium: "ELPA21",
    sourceUrl: ELPA21_URL,
  },
  CA: {
    name: "ELPAC",
    consortium: null,
    sourceUrl: "https://www.cde.ca.gov/ta/tg/ep/",
  },
  CT: {
    name: "LAS Links Online",
    consortium: null,
    sourceUrl:
      "https://portal.ct.gov/sde/student-assessment/lasla-las-links-online",
  },
  IA: {
    name: "ELPA21",
    consortium: "ELPA21",
    sourceUrl: ELPA21_URL,
  },
  LA: {
    name: "ELPT",
    consortium: null,
    sourceUrl:
      "https://doe.louisiana.gov/resources/library/k-12-english-learners",
  },
  MS: {
    name: "LAS Links",
    consortium: null,
    sourceUrl: "https://www.mdek12.org/OAE/OEAS/EnglishLearners",
  },
  NE: {
    name: "ELPA21",
    consortium: "ELPA21",
    sourceUrl: ELPA21_URL,
  },
  OH: {
    name: "OELPA",
    consortium: "ELPA21",
    sourceUrl:
      "https://education.ohio.gov/Topics/Testing/Testing-Materials/English-Language-Proficiency-Assessment",
  },
  OR: {
    name: "ELPA21",
    consortium: "ELPA21",
    sourceUrl: ELPA21_URL,
  },
  TN: {
    name: "WIDA ACCESS for ELLs",
    consortium: "WIDA",
    sourceUrl:
      "https://www.tn.gov/education/families/student-supports-in-tn/english-as-a-second-language.html",
  },
  TX: {
    name: "TELPAS",
    consortium: null,
    sourceUrl: "https://tea.texas.gov/student-assessment/testing/telpas",
  },
  WV: {
    name: "ELPA21",
    consortium: "ELPA21",
    sourceUrl: ELPA21_URL,
  },
};

let updated = 0;
for (const file of readdirSync(STATES_DIR).sort()) {
  if (!file.endsWith(".json")) continue;
  const path = join(STATES_DIR, file);
  const data = JSON.parse(readFileSync(path, "utf8"));
  const usps = data.usps as string;

  // Build the new elpAssessment.
  const elp: ElpEntry = WIDA_MEMBERS.has(usps)
    ? { name: "ACCESS for ELLs", consortium: "WIDA", sourceUrl: WIDA_URL }
    : (NON_WIDA[usps] ?? {
        name: "Unknown",
        consortium: null,
        sourceUrl: null,
      });

  // Augment sealOfBiliteracy with a sourceUrl (sealofbiliteracy.org
  // when adopted; Wikipedia article for unverified rows).
  const seal = data.sealOfBiliteracy as {
    adopted: boolean | null;
    year: number | null;
  };
  const sealOut = {
    adopted: seal.adopted,
    year: seal.year,
    sourceUrl: seal.adopted === true ? SEAL_URL_ORG : SEAL_URL_DEFAULT,
  };

  // Rebuild the object preserving order. Replace widaMember (if
  // present) with elpAssessment in the same slot.
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (k === "widaMember") {
      out.elpAssessment = elp;
      continue;
    }
    if (k === "sealOfBiliteracy") {
      out.sealOfBiliteracy = sealOut;
      continue;
    }
    out[k] = v;
  }
  // If neither widaMember nor elpAssessment was present, append.
  if (!("elpAssessment" in out)) {
    const next: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(out)) {
      next[k] = v;
      if (k === "sealOfBiliteracy") next.elpAssessment = elp;
    }
    Object.assign(out, next);
  }

  writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
  updated++;
}

console.log(`Updated ${updated} state files.`);
