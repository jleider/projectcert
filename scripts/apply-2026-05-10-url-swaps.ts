/**
 * Source-URL precision swaps from the 2026-05-10 audit. These differ
 * from `apply-url-recoveries.ts` in that the original URLs are stable
 * but imprecise (generic landing pages, broken hostnames) rather than
 * 404-dead.
 *
 *   - CA: Prop 227 / Prop 58 history sourceUrls (was generic EDC
 *     selector and an unrelated CDE EL-facts page) → EDC § 300 section
 *     URL.
 *   - CA: CSTP 2024 PDF (404 at ctc.ca.gov path) → docs.ctc.ca.gov
 *     document-repository URL.
 *   - MA: LOOK Act history rows (cite only DESE regulatory pages)
 *     → also include the malegislature.gov session-law URL.
 *   - PA: history[2023-07-01] sourceUrl (generic pa.gov/agencies/
 *     education homepage) → specific CSPG #68 page.
 *   - RI: history[2025-06-01] sourceUrl (RIDE homepage) → the
 *     specific Certification-Regulations-2025 PDF (already in
 *     sources[]).
 *   - KS: sources[0] hostname ksde.org → ksde.gov.
 *   - IL: 105 ILCS Article 14C URL (broken ilga.gov pattern) →
 *     Justia mirror.
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
interface H {
  date: string;
  title: string;
  description: string;
  sourceUrls: string[];
}
interface S {
  usps: string;
  sources: Source[];
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

// CA: Prop 227 + Prop 58 + CSTP 2024
{
  const s = load("CA");
  const edcUrl =
    "https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=EDC&sectionNum=300.";
  const cstpDoc = "https://docs.ctc.ca.gov/Document/Download/30328";
  for (const r of s.history ?? []) {
    if (r.date === "1998-06-02" && /Prop(?:osition)?\s*227/i.test(r.title)) {
      r.sourceUrls = r.sourceUrls.map((u) =>
        /tocCode=EDC/i.test(u) || /codes_displayexpandedbranch/i.test(u)
          ? edcUrl
          : u,
      );
      if (!r.sourceUrls.includes(edcUrl)) r.sourceUrls.push(edcUrl);
      note("CA: history[Prop 227] sourceUrl → EDC § 300");
    }
    if (r.date === "2016-11-08" && /Prop(?:osition)?\s*58/i.test(r.title)) {
      r.sourceUrls = r.sourceUrls.map((u) =>
        /cde\.ca\.gov\/sp\/el\/.*facts/i.test(u) || /facts-about-el/i.test(u)
          ? edcUrl
          : u,
      );
      if (!r.sourceUrls.includes(edcUrl)) r.sourceUrls.push(edcUrl);
      note("CA: history[Prop 58] sourceUrl → EDC § 300");
    }
  }
  for (const src of s.sources) {
    if (
      /ctc\.ca\.gov\/educator-prep\/standards\/cstp-2024\.pdf/i.test(src.url)
    ) {
      src.url = cstpDoc;
      note("CA: sources[] CSTP 2024 PDF → CTC docs repository");
    }
  }
  save(s);
}

// MA: LOOK Act session-law URL appended
{
  const s = load("MA");
  const sessionLaw =
    "https://malegislature.gov/Laws/SessionLaws/Acts/2017/Chapter138";
  for (const r of s.history ?? []) {
    if (r.date === "2017-11-22" && /LOOK Act/i.test(r.title)) {
      if (!r.sourceUrls.includes(sessionLaw)) {
        r.sourceUrls.push(sessionLaw);
        note(`MA: history[${r.date}] + LOOK Act session-law URL`);
      }
    }
  }
  save(s);
}

// PA: history[2023-07-01] generic homepage → CSPG #68 page
{
  const s = load("PA");
  const generic = /pa\.gov\/agencies\/education\.html$/i;
  const cspg68 =
    "https://www.pa.gov/agencies/education/programs-and-services/educators/certification/certification-staffing/staffing-guidelines/cspg-68-english-as-a-second-language-esl-program-specialist-pk-12.html";
  for (const r of s.history ?? []) {
    if (r.date === "2023-07-01") {
      r.sourceUrls = r.sourceUrls.map((u) => (generic.test(u) ? cspg68 : u));
      if (!r.sourceUrls.includes(cspg68)) r.sourceUrls.push(cspg68);
      note("PA: history[2023-07-01] sourceUrl → specific CSPG #68 page");
    }
  }
  save(s);
}

// RI: history[2025-06-01] RIDE homepage → cert-regs-2025 PDF
{
  const s = load("RI");
  const ridePdf = s.sources.find((src) =>
    /Certification[-\s]?Regulations[-\s]?2025/i.test(src.url),
  )?.url;
  if (ridePdf) {
    for (const r of s.history ?? []) {
      if (r.date === "2025-06-01") {
        r.sourceUrls = r.sourceUrls.map((u) =>
          /^https?:\/\/(www\.)?ride\.ri\.gov\/?$/i.test(u) ? ridePdf : u,
        );
        if (!r.sourceUrls.includes(ridePdf)) r.sourceUrls.push(ridePdf);
        note(
          "RI: history[2025-06-01] sourceUrl → Certification-Regulations-2025 PDF",
        );
      }
    }
  }
  save(s);
}

// KS: ksde.org → ksde.gov
{
  const s = load("KS");
  for (const src of s.sources) {
    if (
      src.url === "https://www.ksde.org" ||
      src.url === "https://www.ksde.org/"
    ) {
      src.url = "https://www.ksde.gov/";
      note("KS: sources[].url ksde.org → ksde.gov");
    }
  }
  save(s);
}

// IL: broken ilga.gov 14C URL → Justia
{
  const s = load("IL");
  const justiaArt14c =
    "https://law.justia.com/codes/illinois/chapter-105/act-105-ilcs-5/article-14c/";
  const ilgaPattern =
    /ilga\.gov\/legislation\/ilcs\/ilcs4\.asp\?DocName=010500050HArt%2E\+14C/i;
  for (const r of s.history ?? []) {
    r.sourceUrls = r.sourceUrls.map((u) =>
      ilgaPattern.test(u) ? justiaArt14c : u,
    );
  }
  for (const src of s.sources) {
    if (ilgaPattern.test(src.url)) src.url = justiaArt14c;
  }
  note("IL: 105 ILCS Article 14C URL → Justia mirror");
  save(s);
}

console.log(`Source-URL precision swaps:`);
for (const m of log) console.log(`  - ${m}`);
