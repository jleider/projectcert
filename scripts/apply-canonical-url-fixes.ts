/**
 * One-off remediation: rewrite cited URLs that the external-link check
 * flagged as broken (wrong path) or non-canonical (redirecting) to their
 * confirmed final/canonical target.
 *
 * Each pair is matched as a full quoted JSON string value ("<old>" ->
 * "<new>") so a URL that is a prefix of a longer URL is never partially
 * rewritten. The script reports how many occurrences each pair touched
 * and errors loudly if a listed `old` URL is not present anywhere (so a
 * stale map entry surfaces instead of silently doing nothing).
 *
 * Excluded by design:
 *   - doi.org/10.14507/epaa.29.5279 — a DOI is a permanent canonical
 *     identifier; the redirect to the journal article is expected and the
 *     DOI must not be replaced with a fragile publisher URL.
 *   - redirects whose target is an error/404 page (those are genuinely
 *     broken and need a researched replacement, not the redirect target).
 *   - anti-bot 401/403, host-level network errors, and 5xx — the cited
 *     URL is already the canonical page; the host simply blocks automated
 *     requests, so the URL is left unchanged.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

const PAIRS: Array<[string, string]> = [
  // --- TX: corrected TEA path (coe-tac-currently-effect -> -in-effect) ---
  [
    "https://tea.texas.gov/about-tea/laws-and-rules/commissioner-rules-tac/coe-tac-currently-effect/ch089bb.pdf",
    "https://tea.texas.gov/about-tea/laws-and-rules/commissioner-rules-tac/coe-tac-currently-in-effect/ch089bb.pdf",
  ],
  [
    "https://tea.texas.gov/reports-and-data/school-performance/accountability-research/enroll-2024-25.pdf",
    "https://tea.texas.gov/data-reports/school-performance/accountability-research/enroll-2024-25.pdf",
  ],
  // --- Agency homepages / legacy baseline domains -> current canonical ---
  ["http://education.ohio.gov", "https://education.ohio.gov/"],
  [
    "http://marylandpublicschools.org",
    "https://marylandpublicschools.org/Pages/Default.aspx",
  ],
  ["http://www.doe.mass.edu", "https://www.doe.mass.edu/"],
  ["http://www.fldoe.org", "https://www.fldoe.org/"],
  ["http://www.hawaiipublicschools.org", "https://hawaiipublicschools.org/"],
  ["http://www.ncpublicschools.org", "https://www.dpi.nc.gov/"],
  ["http://www.nysed.gov", "https://www.nysed.gov/"],
  ["http://www.sde.idaho.gov", "https://www.sde.idaho.gov/"],
  ["https://educateiowa.gov", "https://educate.iowa.gov/"],
  ["https://www.k12.wa.us", "https://ospi.k12.wa.us/"],
  ["https://www.louisianabelieves.com", "https://doe.louisiana.gov/"],
  ["https://www.doe.k12.de.us", "https://education.delaware.gov/"],
  ["https://www.cde.state.co.us", "https://ed.cde.state.co.us/"],
  ["https://sde.ok.gov", "https://oklahoma.gov/education.html"],
  ["https://www.doe.in.gov", "https://www.in.gov/doe/"],
  ["https://www.ride.ri.gov", "https://ride.ri.gov/"],
  ["https://www.gadoe.org", "https://gadoe.org/"],
  ["https://www.maine.gov/doe", "https://www.maine.gov/doe/"],
  [
    "https://www.education.pa.gov/Pages/default.aspx",
    "https://www.pa.gov/agencies/education",
  ],
  [
    "https://www.gencourt.state.nh.us/rules/state_agencies/ed500.html",
    "https://gc.nh.gov/rules/state_agencies/ed500.html",
  ],
  // --- Seal of Biliteracy tracker: drop redirecting trailing slash ---
  [
    "https://sealofbiliteracy.org/state/ca/",
    "https://sealofbiliteracy.org/state/ca",
  ],
  [
    "https://sealofbiliteracy.org/state/dc/",
    "https://sealofbiliteracy.org/state/dc",
  ],
  [
    "https://sealofbiliteracy.org/state/fl/",
    "https://sealofbiliteracy.org/state/fl",
  ],
  [
    "https://sealofbiliteracy.org/state/hawaii/",
    "https://sealofbiliteracy.org/state/hawaii",
  ],
  [
    "https://sealofbiliteracy.org/state/il/",
    "https://sealofbiliteracy.org/state/il",
  ],
  [
    "https://sealofbiliteracy.org/state/ky/",
    "https://sealofbiliteracy.org/state/ky",
  ],
  [
    "https://sealofbiliteracy.org/state/la/",
    "https://sealofbiliteracy.org/state/la",
  ],
  [
    "https://sealofbiliteracy.org/state/me/",
    "https://sealofbiliteracy.org/state/me",
  ],
  [
    "https://sealofbiliteracy.org/state/nevada/",
    "https://sealofbiliteracy.org/state/nevada",
  ],
  [
    "https://sealofbiliteracy.org/state/north-dakota/",
    "https://sealofbiliteracy.org/state/north-dakota",
  ],
  [
    "https://sealofbiliteracy.org/state/ohio/",
    "https://sealofbiliteracy.org/state/ohio",
  ],
  [
    "https://sealofbiliteracy.org/state/or/",
    "https://sealofbiliteracy.org/state/or",
  ],
  [
    "https://sealofbiliteracy.org/state/ri/",
    "https://sealofbiliteracy.org/state/ri",
  ],
  [
    "https://sealofbiliteracy.org/state/sd/",
    "https://sealofbiliteracy.org/state/sd",
  ],
  [
    "https://sealofbiliteracy.org/state/wv/",
    "https://sealofbiliteracy.org/state/wv",
  ],
  [
    "https://sealofbiliteracy.org/state/wy/",
    "https://sealofbiliteracy.org/state/wy",
  ],
  [
    "https://sealofbiliteracy.org/states/",
    "https://sealofbiliteracy.org/states",
  ],
  // --- WIDA: /memberships/consortium -> /about/consortium ---
  [
    "https://wida.wisc.edu/memberships/consortium/ok",
    "https://wida.wisc.edu/about/consortium/ok",
  ],
  [
    "https://wida.wisc.edu/memberships/consortium/pa",
    "https://wida.wisc.edu/about/consortium/pa",
  ],
  // --- IA: /standards/specialized-instruction/ -> /standards/instruction/ (longest first) ---
  [
    "https://educate.iowa.gov/pk-12/standards/specialized-instruction/english-learners/elpa21",
    "https://educate.iowa.gov/pk-12/standards/instruction/english-learners/elpa21",
  ],
  [
    "https://educate.iowa.gov/pk-12/standards/specialized-instruction/english-learners",
    "https://educate.iowa.gov/pk-12/standards/instruction/english-learners",
  ],
  [
    "https://educate.iowa.gov/educator-licensure/endorsements-list",
    "https://educate.iowa.gov/educator-licensure/endorsements",
  ],
  // --- KY teacher performance standards (moved into EPP resources) ---
  [
    "https://goteachky.com/about/kentucky-teacher-performance-standards/",
    "https://goteachky.com/resources/educator-preparation/epp-resources/kentucky-teacher-performance-standards/",
  ],
  // --- MO Seal of Biliteracy (path shortened) ---
  [
    "https://dese.mo.gov/college-career-readiness/curriculum/english-language-development/missouri-seal-biliteracy",
    "https://dese.mo.gov/college-career-readiness/curriculum/missouri-seal-biliteracy",
  ],
  // --- CA: CTC leaflet + roadmap canonicalizations ---
  [
    "https://www.cde.ca.gov/sp/el/rm/",
    "https://www.cde.ca.gov/sp/ml/roadmap.asp",
  ],
  [
    "https://www.ctc.ca.gov/credentials/leaflets/bilingual-authorizations-(cl-628b)",
    "https://www.ctc.ca.gov/credentials/leaflets/cl-628b/",
  ],
  [
    "https://www.ctc.ca.gov/credentials/leaflets/english-learner-auth-clad-certificate-(cl-628c)",
    "https://www.ctc.ca.gov/credentials/leaflets/cl-628c/",
  ],
  [
    "https://www.ctc.ca.gov/credentials/leaflets/serving-english-learners-(cl-622)",
    "https://www.ctc.ca.gov/credentials/leaflets/cl-622/",
  ],
  [
    "https://www.ctc.ca.gov/educator-prep/ela",
    "https://www.ctc.ca.gov/program-sponsors/prep-programs/ela/",
  ],
  // --- CO biliteracy diploma endorsement (moved to ed.cde subdomain /clde/) ---
  [
    "https://www.cde.state.co.us/cde_english/high-school-diploma-endorsement-for-biliteracy",
    "https://ed.cde.state.co.us/clde/high-school-diploma-endorsement-for-biliteracy",
  ],
  // --- NC ELD standards (office-teaching-and-learning path) ---
  [
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/academic-standards/standard-course-study/english-language-development",
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/office-teaching-and-learning/standard-course-study/english-language-development",
  ],
  // --- MI adding-an-endorsement (dropped becoming-a-teacher segment) ---
  [
    "https://www.michigan.gov/mde/services/ed-serv/ed-cert/cert-guidance/becoming-a-teacher/adding-an-endorsement",
    "https://www.michigan.gov/mde/services/ed-serv/ed-cert/cert-guidance/adding-an-endorsement",
  ],
  // --- OR TSPC home ---
  [
    "https://www.oregon.gov/tspc/",
    "https://www.oregon.gov/tspc/Pages/index.aspx",
  ],
  // --- PA: drop redirecting .html suffix ---
  [
    "https://www.pa.gov/agencies/education/policy-funding/basic-education-circulars/purdons-statutes/educating-students-who-are-english-learners.html",
    "https://www.pa.gov/agencies/education/policy-funding/basic-education-circulars/purdons-statutes/educating-students-who-are-english-learners",
  ],
  [
    "https://www.pa.gov/agencies/education/programs-and-services/educators/certification/certification-staffing/staffing-guidelines/cspg-68-english-as-a-second-language-esl-program-specialist-pk-12.html",
    "https://www.pa.gov/agencies/education/programs-and-services/educators/certification/certification-staffing/staffing-guidelines/cspg-68-english-as-a-second-language-esl-program-specialist-pk-12",
  ],
  [
    "https://www.pa.gov/agencies/education/programs-and-services/educators/certification/current-pa-educators/esl-program-specialist.html",
    "https://www.pa.gov/agencies/education/programs-and-services/educators/certification/current-pa-educators/esl-program-specialist",
  ],
  [
    "https://www.pa.gov/agencies/education/programs-and-services/educators/certification/help/certification-faqs/english-as-a-second-language.html",
    "https://www.pa.gov/agencies/education/programs-and-services/educators/certification/help/certification-faqs/english-as-a-second-language",
  ],
  [
    "https://www.pa.gov/agencies/education/programs-and-services/instruction/elementary-and-secondary-education/educating-english-learners.html",
    "https://www.pa.gov/agencies/education/programs-and-services/instruction/elementary-and-secondary-education/educating-english-learners",
  ],
];

const files = readdirSync(STATES_DIR).filter((f) => f.endsWith(".json"));
const totals = new Map<string, number>();
for (const [oldUrl] of PAIRS) totals.set(oldUrl, 0);

for (const file of files) {
  const path = join(STATES_DIR, file);
  let text = readFileSync(path, "utf8");
  let changed = false;
  for (const [oldUrl, newUrl] of PAIRS) {
    const needle = `"${oldUrl}"`;
    const replacement = `"${newUrl}"`;
    if (text.includes(needle)) {
      const count = text.split(needle).length - 1;
      text = text.split(needle).join(replacement);
      totals.set(oldUrl, (totals.get(oldUrl) ?? 0) + count);
      changed = true;
    }
  }
  if (changed) writeFileSync(path, text);
}

let missing = 0;
for (const [oldUrl, count] of totals) {
  if (count === 0) {
    missing++;
    process.stderr.write(`WARN: no occurrence found for ${oldUrl}\n`);
  } else {
    process.stdout.write(`${count.toString().padStart(3)} x  ${oldUrl}\n`);
  }
}
process.stdout.write(
  `\nApplied ${PAIRS.length - missing}/${PAIRS.length} replacement pairs.\n`,
);
if (missing > 0) process.exitCode = 1;
