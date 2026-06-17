/**
 * Append 17 substantive SEA-side policy events to state `history[]`
 * arrays, discovered during the 2026-05-10 multi-agent audit. Each
 * row carries at least one verified citable URL; pre-2019 events
 * prefer codified-statute URLs over session-law numbers per the
 * state-source-refresh skill.
 *
 *   CA × 4: Lau v. Nichols (1974); CA EL Roadmap (2017); ELPAC (2018);
 *           AB 2735 EL course-access mandate (2018).
 *   MA × 2: BESE adopts Bilingual Education Endorsement (2018-06-26);
 *           603 CMR 7.00 amended (2025-05-20).
 *   NM × 1: 6.64.11 NMAC repealed and replaced — TESOL endorsement
 *           (2022-07-01).
 *   OH × 1: ODE → ODEW reorganization under HB 33 (2023-07-04).
 *   TX × 2: TAC Ch. 89 Subch. BB amended for HB 3 (2020-04-14);
 *           HB 1414 replaces "English learner" with "emergent
 *           bilingual" (2023-08-09).
 *   UT × 1: SB 41 establishes Dual Language Immersion pilot (2008-07-01).
 *   VA × 2: Virginia Seal of Biliteracy authorized (2015-03-23);
 *           Dual Language Endorsement effective (2026-01-01).
 *   WY × 1: Wyoming Seal of Biliteracy authorized — SF 0098 / SEA 47
 *           (2022-03-21).
 *   VT × 3: Rule 5440-39 revision — Bilingual endorsement (2018-06-01);
 *           Vermont Seal of Biliteracy adoption (2020-12-01);
 *           Rule 5440-40 revision — ELLML endorsement (2022-05-01).
 *
 * Each `addHistory` call is idempotent (skip if a row with the same
 * date+title already exists).
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
const add = (s: S, row: H): boolean => {
  s.history ??= [];
  if (s.history.some((r) => r.date === row.date && r.title === row.title))
    return false;
  s.history.push(row);
  s.history.sort((a, b) => a.date.localeCompare(b.date));
  return true;
};

// CA × 4
{
  const s = load("CA");
  if (
    add(s, {
      date: "1974-01-21",
      title: "Lau v. Nichols decided (414 U.S. 563)",
      description:
        "The U.S. Supreme Court ruled unanimously that San Francisco USD's failure to provide language-acquisition supports to non-English-proficient Chinese students violated Title VI of the Civil Rights Act of 1964. The decision underpins California's modern bilingual and ELD credentialing infrastructure and frames every later state EL-program rule.",
      sourceUrls: [
        "https://www.oyez.org/cases/1973/72-6520",
        "https://supreme.justia.com/cases/federal/us/414/563/",
      ],
    })
  )
    note("CA: + Lau v. Nichols 1974-01-21");
  if (
    add(s, {
      date: "2017-07-12",
      title: "California adopts the English Learner Roadmap",
      description:
        "The State Board of Education unanimously adopted the California English Learner Roadmap, a four-principle policy framework directing district programs and educator preparation toward asset-based, integrated, and rigorous approaches for ELs.",
      sourceUrls: ["https://www.cde.ca.gov/sp/el/rm/"],
    })
  )
    note("CA: + EL Roadmap 2017-07-12");
  if (
    add(s, {
      date: "2018-01-01",
      title: "ELPAC replaces CELDT as California's ELP assessment",
      description:
        "California transitioned from the California English Language Development Test (CELDT) to the English Language Proficiency Assessments for California (ELPAC) for both initial-identification screening and annual summative assessment of ELs.",
      sourceUrls: ["https://www.cde.ca.gov/ta/tg/ep/"],
    })
  )
    note("CA: + ELPAC 2018-01-01");
  if (
    add(s, {
      date: "2018-09-19",
      title: "AB 2735 mandates EL course access (effective 2019-20)",
      description:
        "California enacted AB 2735, requiring districts to provide ELs with full access to a broad course of study (including A–G coursework) and prohibiting placement in restrictive programs that delay course-of-study access. Effective with the 2019-20 school year.",
      sourceUrls: [
        "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=201720180AB2735",
      ],
    })
  )
    note("CA: + AB 2735 2018-09-19");
  save(s);
}

// MA × 2
{
  const s = load("MA");
  if (
    add(s, {
      date: "2018-06-26",
      title: "BESE adopts Bilingual Education Endorsement",
      description:
        "The Board of Elementary and Secondary Education promulgated regulations establishing the Bilingual Education Endorsement, the operational pathway implementing the LOOK Act's directive that DESE create bilingual program credentials.",
      sourceUrls: [
        "https://www.doe.mass.edu/edprep/domains/instruction/bilingual-ed-endorsement.html",
      ],
    })
  )
    note("MA: + BESE Bilingual Endorsement 2018-06-26");
  if (
    add(s, {
      date: "2025-05-20",
      title: "603 CMR 7.00 amended (MTEL Alternatives and Other Updates)",
      description:
        'The Board of Elementary and Secondary Education amended 603 CMR 7.00 (Educator Licensure and Preparation Program Approval) under the heading "MTEL Alternatives and Other Updates," with follow-on guidance on Communications & Literacy Skills MTEL waivers issued April 29, 2026.',
      sourceUrls: ["https://www.doe.mass.edu/lawsregs/603cmr7.html"],
    })
  )
    note("MA: + 603 CMR 7.00 amended 2025-05-20");
  save(s);
}

// NM × 1 (2022 6.64.11 NMAC TESOL endorsement)
{
  const s = load("NM");
  if (
    add(s, {
      date: "2022-07-01",
      title: "6.64.11 NMAC repealed and replaced (TESOL endorsement)",
      description:
        "The Public Education Department repealed and replaced 6.64.11 NMAC, restructuring the TESOL endorsement competencies and adding a non-English-language coursework distribution requirement for the endorsement.",
      sourceUrls: ["https://www.srca.nm.gov/parts/title06/06.064.0011.html"],
    })
  )
    note("NM: + 6.64.11 NMAC 2022-07-01");
  save(s);
}

// OH × 1
{
  const s = load("OH");
  if (
    add(s, {
      date: "2023-07-04",
      title: "ODE reorganized as Department of Education and Workforce (HB 33)",
      description:
        "Ohio's biennial budget bill HB 33 (135th General Assembly, signed 2023-07-04) reorganized the Department of Education into the Department of Education and Workforce (ODEW), consolidating workforce-development functions under the new agency. The change was structural; EL credentialing rules under OAC 3301 carried over.",
      sourceUrls: [
        "https://www.legislature.ohio.gov/legislation/legislation-summary?id=GA135-HB-33",
      ],
    })
  )
    note("OH: + ODE → ODEW 2023-07-04");
  save(s);
}

// TX × 2
{
  const s = load("TX");
  if (
    add(s, {
      date: "2020-04-14",
      title: "TAC Ch. 89 Subch. BB amended (HB 3 implementation, 86th Leg.)",
      description:
        "The Texas Education Agency amended 19 TAC Chapter 89 Subchapter BB (45 TexReg 2415) to implement HB 3 (86th Legislature, 2019), restructuring program-model definitions and emergent-bilingual accountability — the largest structural update to the bilingual/ESL program rules since the 1996 TAC recodification.",
      sourceUrls: [
        "https://tea.texas.gov/about-tea/laws-and-rules/sboe-rules-tac/sboe-rules-tac-april-2020/coversheet-9020.pdf",
      ],
    })
  )
    note("TX: + TAC Ch. 89 Subch. BB amended 2020-04-14");
  if (
    add(s, {
      date: "2023-08-09",
      title: 'HB 1414 replaces "English learner" with "emergent bilingual"',
      description:
        'Texas enacted HB 1414 (88th Legislature, 2023), replacing "English learner" with "emergent bilingual" throughout Texas Education Code Chapter 29. Subsequent TAC amendments (48 TexReg 4247) propagated the terminology change across the bilingual/ESL program rules.',
      sourceUrls: [
        "https://capitol.texas.gov/BillLookup/History.aspx?LegSess=88R&Bill=HB1414",
      ],
    })
  )
    note("TX: + HB 1414 2023-08-09");
  save(s);
}

// UT × 1
{
  const s = load("UT");
  if (
    add(s, {
      date: "2008-07-01",
      title: "SB 41 establishes Dual Language Immersion pilot",
      description:
        "Utah's Dual Language Immersion program was authorized by SB 41 of the 2008 General Session, codified under Utah Code 53G-10-302. The program has since grown into one of the country's largest state-supported DLI networks, paired with a USBE-administered Dual Language Immersion endorsement.",
      sourceUrls: ["https://le.utah.gov/~2008/bills/static/SB0041.html"],
    })
  )
    note("UT: + SB 41 (2008) DLI pilot");
  save(s);
}

// VA × 2
{
  const s = load("VA");
  if (
    add(s, {
      date: "2015-03-23",
      title: "Virginia Seal of Biliteracy authorized (HB 1822, 2015)",
      description:
        "HB 1822 (2015) amended the Code of Virginia to authorize school divisions to award a Seal of Biliteracy on the high-school diplomas of graduates demonstrating proficiency in English and at least one other language. The seal is codified under Va. Code § 22.1-212.1.",
      sourceUrls: [
        "https://law.lis.virginia.gov/vacode/title22.1/chapter13.2/section22.1-212.1/",
      ],
    })
  )
    note("VA: + Seal of Biliteracy 2015-03-23");
  if (
    add(s, {
      date: "2026-01-01",
      title: "Dual Language Endorsement effective (8VAC20-23-321 et seq.)",
      description:
        "Virginia's first dedicated bilingual licensure track took effect on January 1, 2026, under regulations 8VAC20-23-321 through 324. The endorsement provides four parallel pathways combining English- or target-language preparation with standalone or add-on options.",
      sourceUrls: [
        "https://law.lis.virginia.gov/admincode/title8/agency20/chapter23/section321/",
      ],
    })
  )
    note("VA: + Dual Language Endorsement 2026-01-01");
  save(s);
}

// WY × 1
{
  const s = load("WY");
  if (
    add(s, {
      date: "2022-03-21",
      title: "Wyoming Seal of Biliteracy authorized (SF 0098 / SEA 47, 2022)",
      description:
        "The 2022 Wyoming legislature authorized the State Seal of Biliteracy through Senate Enrolled Act 47 (originating as SF 0098), recognizing high-school graduates proficient in English and at least one additional language. Currently administered by the Wyoming Department of Education.",
      sourceUrls: ["https://wyoleg.gov/Legislation/2022/SF0098"],
    })
  )
    note("WY: + Seal of Biliteracy 2022-03-21");
  save(s);
}

// VT × 3
{
  const s = load("VT");
  const ed =
    "https://education.vermont.gov/educator-licensure/professional-standards/licensing-endorsement-areas";
  if (
    add(s, {
      date: "2018-06-01",
      title: "Rule 5440-39 revision (Bilingual endorsement)",
      description:
        "The Vermont Standards Board for Professional Educators revised Rule 5440-39, clarifying the Bilingual endorsement as an add-on credential and aligning its standards with current bilingual-instruction practice.",
      sourceUrls: [ed],
    })
  )
    note("VT: + Rule 5440-39 2018-06-01");
  if (
    add(s, {
      date: "2020-12-01",
      title: "Vermont Seal of Biliteracy adoption",
      description:
        "Vermont established the State Seal of Biliteracy, recognizing high-school graduates demonstrating proficiency in English and one or more additional languages. The seal is administered by the Agency of Education in coordination with the Vermont State Seal of Biliteracy Council.",
      sourceUrls: [
        "https://www.vtsealofbiliteracy.org/",
        "https://theglobalseal.com/vermont-seal-of-biliteracy",
      ],
    })
  )
    note("VT: + Seal of Biliteracy 2020-12-01");
  if (
    add(s, {
      date: "2022-05-01",
      title:
        "Rule 5440-40 revision: English Language Multilingual Learner endorsement",
      description:
        "Rule 5440-40 was revised to rename and restructure Vermont's ELD endorsement as the English Language Multilingual Learner (ELLML) endorsement, aligning naming conventions with current asset-based framing.",
      sourceUrls: [ed],
    })
  )
    note("VT: + Rule 5440-40 ELLML 2022-05-01");
  save(s);
}

console.log(`History rows added:`);
for (const m of log) console.log(`  - ${m}`);
