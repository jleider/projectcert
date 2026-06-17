/**
 * Second remediation batch: replace cited SEA URLs that returned 404
 * (agency site reorganizations) with the current canonical target,
 * each verified to resolve by a research pass. Same quoted-full-value
 * matching as apply-canonical-url-fixes.ts.
 *
 * Notes:
 *   - TX SBOE April-2020 coversheet has no archival replacement; its
 *     history row is re-cited to the current Ch.89 Subchapter BB rule
 *     PDF, which carries the inline 45 TexReg 2415 effective-date.
 *   - NE Rule 24 Guidelines is now published as .docx (no PDF).
 *   - CA CSTP and MI prep-standards targets are correct canonical URLs
 *     whose hosts (docs.ctc.ca.gov / michigan.gov CDN) block automated
 *     clients; they verify in a browser.
 *   - VA "licensing-forms-information" had no confirmable new path and
 *     is intentionally left unchanged.
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATES_DIR = resolve(__dirname, "../src/content/states");

const PAIRS: Array<[string, string]> = [
  // NV baseline (no-www, https)
  ["http://www.doe.nv.gov", "https://doe.nv.gov"],
  // Mississippi (mdek12.org reorganization)
  [
    "https://www.mdek12.org/OAE/OEAS/EnglishLearners",
    "https://mdek12.org/elementaryedu/english-learners/",
  ],
  ["https://www.mdek12.org/OEL/OEL", "https://mdek12.org/licensure/"],
  [
    "https://www.mdek12.org/OSA/Operations/ELPT",
    "https://mdek12.org/studentassessment/elpt/",
  ],
  [
    "https://www.mdek12.org/OEEM/PGS",
    "https://mdek12.org/educatoreffectiveness/teacher-2/",
  ],
  [
    "https://www.mdek12.org/OAE/EL",
    "https://mdek12.org/elementaryedu/english-learners/",
  ],
  [
    "https://www.mdek12.org/OSA/ELPT",
    "https://mdek12.org/studentassessment/elpt/",
  ],
  // Texas (TEA URL scheme change)
  [
    "https://tea.texas.gov/about-tea/laws-and-rules/sbec-rules-tac/sbec-tac-currently-in-effect/ch233.pdf",
    "https://tea.texas.gov/laws-and-rules/sbec-rules-tac/sbec-tac-currently-effect/ch233-4.pdf",
  ],
  [
    "https://tea.texas.gov/about-tea/laws-and-rules/sboe-rules-tac/sboe-rules-tac-april-2020/coversheet-9020.pdf",
    "https://tea.texas.gov/laws-and-rules/commissioner-rules-tac/coe-tac-currently-effect/ch089bb-2.pdf",
  ],
  [
    "https://tea.texas.gov/academics/special-student-populations/emergent-bilingual-support/eb-certification-pathways.pdf",
    "https://tea.texas.gov/special-populations-and-support/english-learner-support/eb-certification-pathways-0.pdf",
  ],
  [
    "https://tea.texas.gov/student-assessment/testing/telpas",
    "https://tea.texas.gov/assessment-and-accountability/telpas",
  ],
  [
    "https://tea.texas.gov/texas-educators/certification/educator-testing/required-tests-chart.pdf",
    "https://tea.texas.gov/educators/certification/educator-testing/required-and-replacement-test-chart-2.pdf",
  ],
  // Virginia (VDOE reorganization; 3 of 4 — licensing-forms-information left as-is)
  [
    "https://www.doe.virginia.gov/teaching-learning-assessment/teaching-in-virginia/teacher-licensure/licensing-services",
    "https://www.doe.virginia.gov/teaching-learning-assessment/teaching-in-virginia/licensure/licensing-services",
  ],
  [
    "https://www.doe.virginia.gov/teaching-learning-assessment/student-assessment/english-learner-education-related-programs",
    "https://www.doe.virginia.gov/teaching-learning-assessment/specialized-instruction/english-learner-education/related-programs-resources",
  ],
  [
    "https://www.doe.virginia.gov/teaching-learning-assessment/teaching-in-virginia/teacher-licensure/dual-language-endorsement",
    "https://www.doe.virginia.gov/teaching-learning-assessment/k-12-standards-instruction/world-language/dual-language-immersion-dl-i/dual-language-endorsement",
  ],
  // North Carolina (NCDPI subtree moves)
  [
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/academic-standards/multilingual-learnertitle-iii",
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/academic-standards/programs-and-initiatives/mltitle-iii",
  ],
  [
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/academic-standards/multilingual-learnertitle-iii/ml-program-compliance",
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/office-teaching-and-learning/standard-course-study/english-language-development/ml-program-compliance",
  ],
  [
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/academic-standards/multilingual-learnertitle-iii/legislation-policy",
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/academic-standards/standard-course-study/english-language-development/legislation-policy",
  ],
  [
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/academic-standards/standard-course-study/dual-language-immersion",
    "https://www.dpi.nc.gov/districts-schools/classroom-resources/office-teaching-and-learning/programs-and-initiatives/dual-language-immersion",
  ],
  // South Carolina (ed.sc.gov reorganization)
  [
    "https://ed.sc.gov/educators/certification/educator-services-tasks/add-a-certification-field-or-endorsement/sc-guidelines-and-requirements-for-adding-certification-fields-and-endorsements/",
    "https://ed.sc.gov/educators/certification/certification-legislation-and-policy/certification-regulations/add-on-guidelines/",
  ],
  [
    "https://ed.sc.gov/educators/certification/educator-services-tasks/passing-test-scores-for-certification-purposes/",
    "https://ed.sc.gov/educators/certification/required-examinations/",
  ],
  [
    "https://ed.sc.gov/educators/certification/state-board-approved-actions/",
    "https://ed.sc.gov/educators/certification/certification-legislation-and-policy/certification-regulations/dual-language-endorsements/",
  ],
  [
    "https://ed.sc.gov/educators/educator-effectiveness/expanded-adept/",
    "https://ed.sc.gov/educators/educator-effectiveness/expanded-adept-resources/",
  ],
  // Idaho (SBOE slug; SDE PDFs moved to wp-content)
  [
    "https://boardofed.idaho.gov/resources/approved-educator-preparation-programs/",
    "https://boardofed.idaho.gov/resources/state-board-of-education-approved-educator-preparation-provider-initial-certificate-endorsement-programs/",
  ],
  [
    "https://www.sde.idaho.gov/cert-psc/cert/files/general/Adding-Endorsement.pdf",
    "https://www.sde.idaho.gov/wp-content/uploads/2025/09/Adding-Endorsement.pdf",
  ],
  [
    "https://www.sde.idaho.gov/cert-psc/cert/files/general/Institutional-Recommendation.pdf",
    "https://www.sde.idaho.gov/wp-content/uploads/2025/07/Institutional-Recommendation-for-an-Idaho-Education-Credential-Form.pdf",
  ],
  [
    "https://www.sde.idaho.gov/cert-psc/cert/files/general/List-Idaho-Endorsements.pdf",
    "https://www.sde.idaho.gov/wp-content/uploads/2025/09/Endorsement-List.pdf",
  ],
  [
    "https://www.sde.idaho.gov/federal-programs/el/files/program/English-Learner-Program-Manual.pdf",
    "https://www.sde.idaho.gov/wp-content/uploads/2025/09/English-Learner-Manual.pdf",
  ],
  // Nebraska (NDE /tcert/ reorg; rule PDFs; Rule 24 now .docx)
  [
    "https://www.education.ne.gov/educatorprep/endorsements-offered-in-nebraska/",
    "https://www.education.ne.gov/tcert/endorsements/",
  ],
  [
    "https://www.education.ne.gov/wp-content/uploads/2017/07/Clean_Rule_20_2024.pdf",
    "https://www.education.ne.gov/wp-content/uploads/2024/05/Web-Rule-20.pdf",
  ],
  [
    "https://www.education.ne.gov/wp-content/uploads/2017/07/Clean_Rule_21_2024.pdf",
    "https://www.education.ne.gov/wp-content/uploads/2017/10/Rule-21-NDE-website.pdf",
  ],
  [
    "https://www.education.ne.gov/wp-content/uploads/2024/06/Rule-24-Guidelines-2024.pdf",
    "https://www.education.ne.gov/wp-content/uploads/2025/10/GUIDELINES-RECOMMENDED-FOR-USE-WITH-RULE-24-ENDORSEMENTS-UPDATED.docx",
  ],
  // Utah (USBE: drop www + path moves)
  [
    "https://www.schools.utah.gov/curr/licensing/endorsements",
    "https://schools.utah.gov/licensing/endorsements",
  ],
  [
    "https://www.schools.utah.gov/educatoreffectiveness",
    "https://schools.utah.gov/curr/educatordevelopment/classroomteachers",
  ],
  // Alaska (DEED path moves)
  [
    "https://education.alaska.gov/teachercertification/teaching-certificates",
    "https://education.alaska.gov/teachercertification/certification/teaching-certificates",
  ],
  [
    "https://education.alaska.gov/teachercertification/standards",
    "https://education.alaska.gov/akaccountability/educator/resources_sd/teacher_standards_framework_alignment.pdf",
  ],
  [
    "https://education.alaska.gov/standards/elp",
    "https://education.alaska.gov/standards/english-language-proficiency",
  ],
  // Tennessee (SBE per-year meeting dirs; policy + EL page moves)
  [
    "https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/meetingfiles/Additional_Endorsement_Programs_-_SPED_ESL_CS_Programs_Update.pdf",
    "https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/2023-sbe-meetings/february-9,-2023-sbe-workshop/2-9-23%20SDE%20Additional%20Endorsement%20Programs%20Presentation.pdf",
  ],
  [
    "https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/meetingfiles/2024-SBE-Meetings/may-30-2024-sbe-workshop/5-30-24%20IV%20A%20English%20as%20a%20Second%20Language%20ELPA21%20Transition%20Presentation.pdf",
    "https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/2024-sbe-meetings/may-30,-2024-sbe-workshop/5-30-24%202%2030%20WIDA%20and%20%20ELPA%20Transition%20Presentation.pdf",
  ],
  [
    "https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/policies/5000/5.504%20Teacher%20Code%20of%20Ethics%20Policy.pdf",
    "https://www.tn.gov/content/dam/tn/stateboardofeducation/documents/about/Tennessee%20Teacher%20Code%20of%20Ethics_2024.pdf",
  ],
  [
    "https://www.tn.gov/education/families/student-supports-in-tn/english-as-a-second-language.html",
    "https://www.tn.gov/education/families/student-support/english-learners.html",
  ],
  // Vermont (AOE: /documents/ slug -> /sites/aoe/files/documents/ PDF)
  [
    "https://education.vermont.gov/documents/edu-vsbpe-rules-licensing-educators",
    "https://education.vermont.gov/sites/aoe/files/documents/edu-rules-governing-the-licensing-of-educators.pdf",
  ],
  [
    "https://education.vermont.gov/documents/edu-vsbpe-core-teaching-and-leadership-standards",
    "https://education.vermont.gov/sites/aoe/files/documents/edu-educator-quality-core-teaching-and-leadership-standards-for-vermont-educators.pdf",
  ],
  // Louisiana (LDOE doc renames; checklist -> teachlouisiana.net; CODOFIL root)
  [
    "https://doe.louisiana.gov/docs/default-source/teaching/esl-add-on-checklist.pdf",
    "https://www.teachlouisiana.net/checklist/esl.pdf",
  ],
  [
    "https://doe.louisiana.gov/docs/default-source/english-learners/improving-outcomes-for-english-learners-louisianas-framework.pdf",
    "https://doe.louisiana.gov/docs/default-source/english-learners/el-framework---final.pdf",
  ],
  [
    "https://doe.louisiana.gov/docs/default-source/english-learners/english-learner-professional-development-guide.pdf",
    "https://doe.louisiana.gov/docs/default-source/english-learners/english-learner-(el)-professional-development-guide.pdf",
  ],
  [
    "https://doe.louisiana.gov/resources/library/k-12-english-learners",
    "https://doe.louisiana.gov/school-system-leaders/diverse-learners/english-learners/english-learners-resources",
  ],
  [
    "https://www.crt.state.la.us/cultural-development/codofil/about/index",
    "https://www.crt.state.la.us/cultural-development/codofil/",
  ],
  // Ohio (standards PDF moved to SBOE DAM CDN)
  [
    "https://education.ohio.gov/getattachment/Topics/Teaching/Educator-Evaluation-System/Ohio-s-Teacher-Evaluation-System/Ohio-Standards-for-the-Teaching-Profession.pdf",
    "https://dam.assets.ohio.gov/image/upload/sboe.ohio.gov/Educator-Standards/TeachingProfessionStandards.pdf",
  ],
  // Kentucky (seal .aspx -> guidelines PDF)
  [
    "https://education.ky.gov/curriculum/hsgradreq/Pages/Seal-of-Biliteracy.aspx",
    "https://www.education.ky.gov/curriculum/hsgradreq/Documents/Kentucky_Guidelines_for_Establishing_a_Local_Seal_of_Biliteracy.pdf",
  ],
  // Oklahoma (/educators/ -> /services/)
  [
    "https://oklahoma.gov/education/educators/teacher-certification.html",
    "https://oklahoma.gov/education/services/teacher-certification.html",
  ],
  // Massachusetts (bilingual endorsement moved to Licensure Office)
  [
    "https://www.doe.mass.edu/edprep/domains/instruction/bilingual-ed-endorsement.html",
    "https://www.doe.mass.edu/licensure/endorsements/bilingual-ed.html",
  ],
  // California (CSTP 2024 PDF moved to CTC document server)
  [
    "https://www.ctc.ca.gov/educator-prep/standards/cstp-2024.pdf",
    "https://docs.ctc.ca.gov/Document/Download/30328",
  ],
  // Michigan (prep standards PDF renamed)
  [
    "https://www.michigan.gov/-/media/Project/Websites/mde/educator_services/prep/standards/professional_knowledge_skills.pdf",
    "https://www.michigan.gov/mde/-/media/Project/Websites/mde/educator_services/prep/standards/Prep_Standards_for_PK-12_Teachers.pdf",
  ],
  // Pennsylvania (PDE BEC + EL program path moves)
  [
    "https://www.pa.gov/agencies/education/policy-funding/basic-education-circulars/purdons-statutes/educating-students-who-are-english-learners",
    "https://www.pa.gov/agencies/education/resources/policies-acts-and-laws/basic-education-circulars-becs/pa-code/educating-english-learners-els",
  ],
  [
    "https://www.pa.gov/agencies/education/programs-and-services/instruction/elementary-and-secondary-education/educating-english-learners",
    "https://www.pa.gov/agencies/education/programs-and-services/instruction/elementary-and-secondary-education/curriculum/educating-english-learners",
  ],
  // New Hampshire (WIDA ID/placement doc renamed)
  [
    "https://wida.wisc.edu/sites/default/files/id-placement/NH-ID-Placement.pdf",
    "https://wida.wisc.edu/sites/default/files/id-placement/NH-ID-Placement-Guidance.pdf",
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
