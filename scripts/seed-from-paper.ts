/**
 * One-shot seeder: writes 51 state JSON files into src/content/states/
 * from Leider/Colombo/Nerlino (2021) Tables 2-5 + Appendix A.
 *
 * Run once: `npm run seed`
 *
 * Every record is marked `verificationStatus: "baseline-2019"` and
 * sourced to `retrievedBy: "leider-2021"`. The Phase 2 verification
 * workflow (state-source-refresh skill) supersedes these on a per-state
 * basis as we re-pull current SEA documents.
 *
 * Compact tuple format below avoids 51x of identical boilerplate.
 *
 * Tuple legend (tab-separated columns in source comments):
 *   usps  pct   bilCert  bilAddOn  eldStd  eldAddOn  bilReqs   eldReqs   stds (4 booleans)
 *
 * Where bilReqs/eldReqs are 5-char / 4-char strings:
 *   bilReqs: "PCRTL"  P=program  C=coursework  R=practicum  T=test  L=language
 *   eldReqs: "PCRT"    (no language column)
 *   '1' = required, '0' = not required, '-' = unknown / null
 *
 * stds: 4 booleans (D=diverse C=cultural L=linguistic E=el-explicit)
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { STATES } from "../src/data/states-meta.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(__dirname, "../src/content/states");

type CredReq = boolean | null;
type Reqs = {
  program: CredReq;
  coursework: CredReq;
  practicum: CredReq;
  test: CredReq;
  languageProficiency: CredReq;
};

function parseBilReqs(s: string): Reqs {
  const [P, C, R, T, L] = s.split("");
  const f = (c: string | undefined): CredReq => (c === "1" ? true : c === "0" ? false : null);
  return {
    program: f(P),
    coursework: f(C),
    practicum: f(R),
    test: f(T),
    languageProficiency: f(L),
  };
}

function parseEldReqs(s: string): Reqs {
  const [P, C, R, T] = s.split("");
  const f = (c: string | undefined): CredReq => (c === "1" ? true : c === "0" ? false : null);
  return {
    program: f(P),
    coursework: f(C),
    practicum: f(R),
    test: f(T),
    languageProficiency: false, // ELD never has a non-English language requirement
  };
}

interface Row {
  usps: string;
  pct: number;
  /** bilingual standalone certification offered */
  bilCert: boolean;
  /** bilingual add-on endorsement offered */
  bilAddOn: boolean;
  /** ELD standalone certification offered */
  eldStd: boolean;
  /** ELD add-on endorsement offered */
  eldAddOn: boolean;
  /** Bilingual add-on requirements ("-----" if not offered or unknown) */
  bilReqs: string;
  /** ELD add-on requirements */
  eldReqs: string;
  /** Standards mentions: D C L E */
  stds: [boolean, boolean, boolean, boolean];
  /** SEA URL (Appendix A — homepage; per-document URLs are state-specific) */
  seaUrl: string;
  /** SEA homepage label */
  seaLabel: string;
  /** SEI mandate */
  seiMandate?: boolean;
  /** Notes for the state record */
  notes?: { bilingual?: string; eld?: string; sei?: string };
}

// Data is decoded from the paper's Tables 2-5. Where a cell was unclear
// or marked "-" in the original, we use "-" (null) here.
const ROWS: Row[] = [
  {
    usps: "AL",
    pct: 3.5,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [true, true, true, true],
    seaUrl: "https://www.alsde.edu",
    seaLabel: "Alabama State Dept. of Education",
  },
  {
    usps: "AK",
    pct: 12.1,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-1100",
    eldReqs: "1--1",
    stds: [true, true, true, true],
    seaUrl: "https://education.alaska.gov/TeacherCertification",
    seaLabel: "Alaska DEED Teacher Certification",
    notes: {
      bilingual: "Approved program courses required to include Native American/multicultural education.",
    },
  },
  {
    usps: "AZ",
    pct: 8.1,
    bilCert: false,
    bilAddOn: true,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-1101",
    eldReqs: "-110",
    stds: [true, true, true, false],
    seaUrl: "https://www.azed.gov",
    seaLabel: "Arizona Department of Education",
    seiMandate: true,
    notes: {
      sei: "SEI endorsement is required for all teachers in AZ; earnable via one course.",
    },
  },
  {
    usps: "AR",
    pct: 8.3,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "1---",
    stds: [true, true, true, true],
    seaUrl: "http://dese.ade.arkansas.gov/",
    seaLabel: "Arkansas Division of Elementary and Secondary Education",
  },
  {
    usps: "CA",
    pct: 19.2,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [true, true, true, true],
    seaUrl: "https://www.cde.ca.gov",
    seaLabel: "California Department of Education",
    seiMandate: true,
    notes: { sei: "SEI endorsement required for all teachers; one course." },
  },
  {
    usps: "CO",
    pct: 11.9,
    bilCert: true,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-11-",
    stds: [true, true, true, false],
    seaUrl: "https://www.cde.state.co.us",
    seaLabel: "Colorado Department of Education",
    notes: {
      eld: "Credential is named 'Culturally and Linguistically Diverse (CLD) Education'.",
    },
  },
  {
    usps: "CT",
    pct: 7.4,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-1--",
    stds: [true, true, true, false],
    seaUrl: "https://portal.ct.gov/SDE",
    seaLabel: "Connecticut State Dept. of Education",
  },
  {
    usps: "DE",
    pct: 9.1,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-1--1",
    eldReqs: "-1-1",
    stds: [true, true, false, false],
    seaUrl: "https://www.doe.k12.de.us",
    seaLabel: "Delaware Department of Education",
    notes: { eld: "English proficiency requirement explicit." },
  },
  {
    usps: "DC",
    pct: 10.9,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "----1",
    eldReqs: "---1",
    stds: [true, true, true, true],
    seaUrl: "https://osse.dc.gov/service/educator-credentialing-and-certification",
    seaLabel: "DC Office of the State Superintendent of Education",
  },
  {
    usps: "FL",
    pct: 10.1,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [true, true, true, false],
    seaUrl: "http://www.fldoe.org",
    seaLabel: "Florida Department of Education",
  },
  {
    usps: "GA",
    pct: 6.6,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [true, false, false, false],
    seaUrl: "https://www.gadoe.org",
    seaLabel: "Georgia Department of Education",
  },
  {
    usps: "HI",
    pct: 8.2,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-1-1",
    stds: [true, true, true, true],
    seaUrl: "http://www.hawaiipublicschools.org",
    seaLabel: "Hawaii Public Schools / HTSB",
  },
  {
    usps: "ID",
    pct: 6.0,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-110-",
    eldReqs: "1--1",
    stds: [true, true, true, true],
    seaUrl: "http://www.sde.idaho.gov",
    seaLabel: "Idaho State Department of Education",
  },
  {
    usps: "IL",
    pct: 11.3,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-1101",
    eldReqs: "-11-",
    stds: [true, true, true, true],
    seaUrl: "https://www.isbe.net",
    seaLabel: "Illinois State Board of Education",
    notes: {
      eld: "Distinguishes ENL (English-only) from ESL (allows native-language support).",
    },
  },
  {
    usps: "IN",
    pct: 5.4,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "----",
    stds: [true, true, true, true],
    seaUrl: "https://www.doe.in.gov",
    seaLabel: "Indiana Department of Education",
  },
  {
    usps: "IA",
    pct: 6.1,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-1--",
    stds: [true, false, false, false],
    seaUrl: "https://educateiowa.gov",
    seaLabel: "Iowa Department of Education",
    notes: {
      bilingual: "Iowa requires an 'Authorization' to teach in a non-English language.",
    },
  },
  {
    usps: "KS",
    pct: 10.3,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [true, true, true, true],
    seaUrl: "https://www.ksde.org",
    seaLabel: "Kansas State Dept. of Education",
  },
  {
    usps: "KY",
    pct: 0.9,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-1--",
    stds: [true, true, true, false],
    seaUrl: "https://education.ky.gov",
    seaLabel: "Kentucky Dept. of Education",
    notes: {
      eld: "SEA documentation limited; add-on info gathered from university websites.",
    },
  },
  {
    usps: "LA",
    pct: 3.6,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-1--",
    stds: [true, false, false, true],
    seaUrl: "https://www.louisianabelieves.com",
    seaLabel: "Louisiana Department of Education",
  },
  {
    usps: "ME",
    pct: 3.3,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-1-1",
    stds: [true, true, false, true],
    seaUrl: "https://www.maine.gov/doe/home",
    seaLabel: "Maine Department of Education",
  },
  {
    usps: "MD",
    pct: 9.2,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [true, true, true, true],
    seaUrl: "http://marylandpublicschools.org",
    seaLabel: "Maryland State Dept. of Education",
  },
  {
    usps: "MA",
    pct: 10.0,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-1101",
    eldReqs: "--11",
    stds: [true, true, true, true],
    seaUrl: "http://www.doe.mass.edu",
    seaLabel: "Massachusetts Dept. of Elementary and Secondary Education",
    seiMandate: true,
    notes: {
      sei: "SEI endorsement required for all core-academic teachers (LOOK Act 2017).",
    },
  },
  {
    usps: "MI",
    pct: 6.6,
    bilCert: true,
    bilAddOn: true,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-1110",
    eldReqs: "1---",
    stds: [true, true, false, false],
    seaUrl: "https://www.michigan.gov/mde/",
    seaLabel: "Michigan Department of Education",
  },
  {
    usps: "MN",
    pct: 8.5,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: false,
    bilReqs: "1---1",
    eldReqs: "----",
    stds: [true, true, true, true],
    seaUrl: "https://education.mn.gov/MDE",
    seaLabel: "Minnesota Department of Education",
  },
  {
    usps: "MS",
    pct: 2.7,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [false, true, false, false],
    seaUrl: "https://www.mdek12.org",
    seaLabel: "Mississippi Department of Education",
  },
  {
    usps: "MO",
    pct: 3.8,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-11-",
    stds: [true, true, true, false],
    seaUrl: "https://dese.mo.gov",
    seaLabel: "Missouri Department of Elementary and Secondary Education",
  },
  {
    usps: "MT",
    pct: 2.2,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "----",
    stds: [true, true, true, false],
    seaUrl: "https://opi.mt.gov",
    seaLabel: "Montana Office of Public Instruction",
  },
  {
    usps: "NE",
    pct: 7.6,
    bilCert: true,
    bilAddOn: true,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-1-01",
    eldReqs: "-11-",
    stds: [true, true, false, false],
    seaUrl: "https://www.education.ne.gov",
    seaLabel: "Nebraska Department of Education",
    notes: {
      bilingual: "ELD certification is a prerequisite to bilingual add-on.",
    },
  },
  {
    usps: "NV",
    pct: 17.1,
    bilCert: true,
    bilAddOn: true,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-1--1",
    eldReqs: "-11-",
    stds: [true, true, true, false],
    seaUrl: "http://www.doe.nv.gov",
    seaLabel: "Nevada Department of Education",
    seiMandate: false,
    notes: {
      sei: "SEI-equivalent endorsement is being phased in: required for early childhood/elementary (2020) and middle/secondary (2021).",
    },
  },
  {
    usps: "NH",
    pct: 2.8,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "----",
    stds: [true, false, false, false],
    seaUrl: "https://www.education.nh.gov",
    seaLabel: "New Hampshire Department of Education",
  },
  {
    usps: "NJ",
    pct: 5.9,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "1---1",
    eldReqs: "1--1",
    stds: [true, true, true, false],
    seaUrl: "https://www.nj.gov/education/",
    seaLabel: "New Jersey Department of Education",
    notes: { eld: "English proficiency requirement explicit." },
  },
  {
    usps: "NM",
    pct: 16.3,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-1011",
    eldReqs: "-1-1",
    stds: [true, true, true, true],
    seaUrl: "https://webnew.ped.state.nm.us",
    seaLabel: "New Mexico Public Education Department",
    notes: {
      bilingual: "Includes Native American/Indigenous language endorsement pathway.",
    },
  },
  {
    usps: "NY",
    pct: 9.2,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-1010",
    eldReqs: "-1-1",
    stds: [true, true, true, false],
    seaUrl: "http://www.nysed.gov",
    seaLabel: "New York State Education Department",
  },
  {
    usps: "NC",
    pct: 6.9,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-1-1",
    stds: [true, true, true, false],
    seaUrl: "http://www.ncpublicschools.org",
    seaLabel: "North Carolina Public Schools",
    notes: { bilingual: "Bilingual certificate is limited to grades K-6." },
  },
  {
    usps: "ND",
    pct: 3.4,
    bilCert: true,
    bilAddOn: true,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-110-",
    eldReqs: "-11-",
    stds: [true, true, false, false],
    seaUrl: "https://www.nd.gov/dpi/",
    seaLabel: "North Dakota Dept. of Public Instruction",
  },
  {
    usps: "OH",
    pct: 3.2,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "1----",
    eldReqs: "1--1",
    stds: [true, true, true, true],
    seaUrl: "http://education.ohio.gov",
    seaLabel: "Ohio Department of Education",
    notes: {
      eld: "'Supplemental ESL licensure' (1-year, non-renewable) available via test only.",
    },
  },
  {
    usps: "OK",
    pct: 8.0,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [true, false, false, false],
    seaUrl: "https://sde.ok.gov",
    seaLabel: "Oklahoma State Dept. of Education",
  },
  {
    usps: "OR",
    pct: 8.8,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "----1",
    eldReqs: "1--1",
    stds: [true, true, true, false],
    seaUrl: "https://www.oregon.gov/ode/Pages/default.aspx",
    seaLabel: "Oregon Department of Education",
    notes: { bilingual: "Distinct Bilingual + Dual Language endorsements." },
  },
  {
    usps: "PA",
    pct: 3.6,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "1---",
    stds: [true, true, false, false],
    seaUrl: "https://www.education.pa.gov/Pages/default.aspx",
    seaLabel: "Pennsylvania Department of Education",
  },
  {
    usps: "RI",
    pct: 9.0,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-1111",
    eldReqs: "-111",
    stds: [true, false, false, false],
    seaUrl: "https://www.ride.ri.gov",
    seaLabel: "Rhode Island Dept. of Elementary and Secondary Education",
  },
  {
    usps: "SC",
    pct: 6.1,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-1--",
    stds: [true, true, true, true],
    seaUrl: "https://ed.sc.gov",
    seaLabel: "South Carolina Department of Education",
    notes: {
      eld: "Practicum can be waived with one year of documented teaching.",
    },
  },
  {
    usps: "SD",
    pct: 4.1,
    bilCert: false,
    bilAddOn: false,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "-1-1",
    stds: [true, true, true, false],
    seaUrl: "https://doe.sd.gov",
    seaLabel: "South Dakota Dept. of Education",
  },
  {
    usps: "TN",
    pct: 4.6,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "1--1",
    stds: [true, true, true, true],
    seaUrl: "https://www.tn.gov/education.html",
    seaLabel: "Tennessee Department of Education",
  },
  {
    usps: "TX",
    pct: 18.0,
    bilCert: true,
    bilAddOn: true,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "---1-",
    eldReqs: "---1",
    stds: [true, true, true, true],
    seaUrl: "https://tea.texas.gov",
    seaLabel: "Texas Education Agency",
  },
  {
    usps: "UT",
    pct: 7.1,
    bilCert: true,
    bilAddOn: true,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "1---1",
    eldReqs: "1---",
    stds: [true, false, false, false],
    seaUrl: "https://www.schools.utah.gov",
    seaLabel: "Utah State Board of Education",
    notes: {
      bilingual: "Two pathways: state-approved program OR university courses + Utah Dual Language Institute.",
    },
  },
  {
    usps: "VT",
    pct: 2.2,
    bilCert: true,
    bilAddOn: true,
    eldStd: false,
    eldAddOn: true,
    bilReqs: "-10-1",
    eldReqs: "-111",
    stds: [true, true, true, false],
    seaUrl: "https://education.vermont.gov",
    seaLabel: "Vermont Agency of Education",
  },
  {
    usps: "VA",
    pct: 9.1,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [true, true, true, false],
    seaUrl: "https://www.doe.virginia.gov",
    seaLabel: "Virginia Department of Education",
    notes: {
      eld: "Alternative route: bachelor's + 24 credits relevant coursework.",
    },
  },
  {
    usps: "WA",
    pct: 11.7,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "1--11",
    eldReqs: "1--1",
    stds: [false, true, true, false],
    seaUrl: "https://www.k12.wa.us",
    seaLabel: "Washington Office of Superintendent of Public Instruction",
  },
  {
    usps: "WV",
    pct: 0.8,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "----",
    stds: [true, true, true, false],
    seaUrl: "https://wvde.us",
    seaLabel: "West Virginia Department of Education",
  },
  {
    usps: "WI",
    pct: 6.2,
    bilCert: true,
    bilAddOn: true,
    eldStd: true,
    eldAddOn: false,
    bilReqs: "1---1",
    eldReqs: "----",
    stds: [true, true, true, true],
    seaUrl: "https://dpi.wi.gov",
    seaLabel: "Wisconsin Dept. of Public Instruction",
  },
  {
    usps: "WY",
    pct: 3.0,
    bilCert: false,
    bilAddOn: false,
    eldStd: true,
    eldAddOn: true,
    bilReqs: "-----",
    eldReqs: "---1",
    stds: [true, true, true, true],
    seaUrl: "https://edu.wyoming.gov",
    seaLabel: "Wyoming Department of Education",
  },
];

if (ROWS.length !== 51) {
  throw new Error(`Expected 51 rows; got ${ROWS.length}`);
}

const stateNames = new Map(STATES.map((s) => [s.usps, s.name]));

const RETRIEVED_AT = "2019-11-15"; // mid-window of paper's Oct-Dec 2019 collection
const LAST_VERIFIED = "2019-11-15";

mkdirSync(OUT_DIR, { recursive: true });

for (const row of ROWS) {
  const name = stateNames.get(row.usps);
  if (!name) {
    throw new Error(`Unknown USPS: ${row.usps}`);
  }

  const bilOffered = row.bilCert || row.bilAddOn;
  const eldOffered = row.eldStd || row.eldAddOn;

  const bilingual: Record<string, unknown> = {
    offered: bilOffered,
    standalone: row.bilCert,
    addOn: row.bilAddOn,
  };
  if (bilOffered) bilingual.requirements = parseBilReqs(row.bilReqs);
  if (row.notes?.bilingual) bilingual.notes = row.notes.bilingual;

  const eld: Record<string, unknown> = {
    offered: eldOffered,
    standalone: row.eldStd,
    addOn: row.eldAddOn,
  };
  if (eldOffered) eld.requirements = parseEldReqs(row.eldReqs);
  if (row.notes?.eld) eld.notes = row.notes.eld;

  const sei: Record<string, unknown> = {
    mandatedForAllTeachers: row.seiMandate ?? false,
  };
  if (row.notes?.sei) sei.notes = row.notes.sei;

  const record = {
    usps: row.usps,
    name,
    elPercent: row.pct,
    elPercentAsOf: "2019-10-01",
    credentials: { bilingual, eld, sei },
    professionalStandardsMentions: {
      diverse: row.stds[0],
      cultural: row.stds[1],
      linguistic: row.stds[2],
      el: row.stds[3],
    },
    sources: [
      {
        label: row.seaLabel,
        url: row.seaUrl,
        retrievedAt: RETRIEVED_AT,
        retrievedBy: "leider-2021" as const,
      },
      {
        label: "Leider, Colombo & Nerlino (2021), EPAA 29(100). Tables 2-5 + Appendix A.",
        url: "https://doi.org/10.14507/epaa.29.5279",
        retrievedAt: RETRIEVED_AT,
        retrievedBy: "leider-2021" as const,
      },
    ],
    lastVerified: LAST_VERIFIED,
    verificationStatus: "baseline-2019" as const,
  };

  const path = resolve(OUT_DIR, `${row.usps.toLowerCase()}.json`);
  writeFileSync(path, JSON.stringify(record, null, 2) + "\n", "utf8");
}

console.log(`Wrote ${ROWS.length} state files to ${OUT_DIR}`);
