# NY TESOL/ESOL Certification (English to Speakers of Other Languages)

**URLs:**
- https://www.nysed.gov/college-university-evaluation/general-and-program-specific-requirements-teaching-english-speakers (snapshot: `nysed-tesol-requirements.html`)
- https://www.nysed.gov/bilingual-ed/ell-and-ml-educator-certification (snapshot: `nysed-ell-ml-certification.html`)

## Credential type

NY's ELD credential — branded **"English to Speakers of Other Languages (ESOL)"** in OTI listings, **"TESOL"** in higher-education program names — is **standalone** (its own classroom teacher certificate authorizing the holder to teach ESOL all grades). It can also be earned as a supplementary/add-on by teachers already certified in another area.

## Coursework / content core

- Major, concentration, or equivalent coursework preparing teachers to help ELLs meet learning standards in ELA, math, science, social studies.
- **At least 12 semester hours of study of a world language other than English** (a hard language-proficiency-adjacent gate, though not a language-proficiency exam).
- Pedagogical core: study in cultural perspectives, linguistics, grammar, and second-language teaching methods at elementary and secondary levels; minimum 6 semester hours in teaching listening, speaking, reading, writing.

## Practicum / field experience

For candidates enrolling Fall 2024 onward:
- Minimum 100 clock hours of field experiences (15 hours focused on disabilities) prior to student teaching.
- College-supervised student teaching/practicum: **at least 70 school days** with students learning English as a new language, addressing both elementary and secondary developmental levels.

For candidates already holding another teaching certificate: 50 clock hours of field experience and 20+ days of practicum/student teaching at both elementary and secondary.

## Exam

**Content Specialty Test (CST) in English to Speakers of Other Languages (ESOL), test code 116** — required for the ESOL classroom teacher certificate.

## Language-proficiency requirement

The 12 semester hours of LOTE study is a coursework gate, not a proficiency exam. The schema field `languageProficiency` is interpreted as "the credential requires the candidate to demonstrate proficiency in the target language for instruction" — for ESOL/TESOL, the target language for instruction is English (which the base certificate already verifies). LOTE study is a precondition for understanding second-language acquisition, not a proficiency demonstration. Coding `languageProficiency: false` for ELD remains correct.

## Implication for schema

- `credentials.eld.offered` = true
- `credentials.eld.standalone` = true (CST 116 ESOL classroom teacher certificate)
- `credentials.eld.addOn` = true (supplementary pathway exists for currently certified teachers)
- `requirements.program` = true (approved program path; baseline had `null`)
- `requirements.coursework` = true
- `requirements.practicum` = true (70 school days student teaching with ENL students; baseline had `null`)
- `requirements.test` = true (CST 116)
- `requirements.languageProficiency` = false (12 hr LOTE coursework gate is not a proficiency demonstration)
