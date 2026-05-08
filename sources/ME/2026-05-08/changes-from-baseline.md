# Maine — changes from leider-2021 baseline (refresh 2026-05-08)

Refresher: projectcert-2026. Source bundle: `sources/ME/2026-05-08/`.

## Field-by-field diff vs. `me.json` (baseline-2019)

### `elPercent` / `elPercentAsOf`

- `3.3` (2019-10-01) → **`3.1` (2021-10-01)**
- Source: NCES Digest of Education Statistics 2023, Table 204.20, Fall 2021 row (5,420 ELs / 3.1% of public-school enrollment in Maine). See `nces-table-204-20.md`. Switching to NCES for cross-state comparability mirrors how DC and other refreshed states are coded.

### `credentials.bilingual`

- `{ offered: false, standalone: false, addOn: false }` — **unchanged**.
- Confirmed: full-text search of Chapter 115 Part II returns zero matches for "bilingual." Maine offers world-language endorsements (Spanish, French, etc.) but no Bilingual Education credential. See `chapter-115-part-ii.md`.

### `credentials.eld`

Baseline:

```
{
  offered: true,
  standalone: false,
  addOn: true,
  requirements: { program: null, coursework: true, practicum: null, test: true, languageProficiency: false }
}
```

Updates:

- `offered: true` — unchanged. Endorsement 660 (ESOL) is the operative ELD credential.
- `standalone: false` — unchanged (an endorsement, never a primary license).
- `addOn: true` — unchanged.
- `requirements.program`: `null` → **`true`**. Chapter 115 Part II §1.8.B.1 (Pathway 1 — completion of an approved Maine ESOL preparation program) and §1.8.B.5 (Pathway 5 — approved portfolio) make the approved-program/approved-portfolio route an explicit eligibility pathway. Coding `true`.
- `requirements.coursework`: `true` — unchanged. All non-program pathways still require explicit ESOL credit hours.
  - Note for the record: the conditional certificate floor and Pathway 2 floor were both reduced from 24 → 15 semester hours per the 5/14/2025 amendment (red-line preserved in the document footer). Pathway 3 still requires 24 semester hours.
- `requirements.practicum`: `null` → **`true`**. Pathway 3 §1.8.B.3.g requires "one academic semester or a minimum of 15 weeks of full-time student teaching" in the endorsement area (waivable only after a full year of conditional-certificate teaching).
- `requirements.test`: `true` → **`null`**. Chapter 115 Part II §1.8 does not name a Praxis content test for endorsement 660. The "basic skills test" reference points to general literacy/numeracy under Chapter 13 and may be satisfied by GPA or portfolio. Third-party sites cite Praxis 5362 (ESOL, score 146), but the binding rule does not. Coded `null` with explanatory note pending an SEA-issued test list naming Praxis 5362 specifically for 660.
- `requirements.languageProficiency`: `false` — unchanged. ACTFL/OPI proficiency exams apply only to World Language endorsements, not ESOL.

Adding `notes` to `eld`: explains canonical SEA term ("ESOL"), the 660 endorsement code, and the basis for the `program=true`, `practicum=true`, `test=null` codings.

### `credentials.sei`

- `{ mandatedForAllTeachers: false }` — **unchanged**. The 10/9/2025 administrative letter and the staffing guidance both confirm sheltered instruction is one optional service component, not a statewide mandate for all teachers.
- Adding a brief `notes` field for clarity.

### `professionalStandardsMentions`

Baseline: `{ diverse: true, cultural: true, linguistic: false, el: true }`.

Updated against the actual Maine Initial Teacher Standards document (= InTASC, Rev. 8/2016, the standards Maine has adopted whole and references in Chapter 115 Part II as the basis for portfolio review):

- `diverse: true` — unchanged. (Standard #2.)
- `cultural: true` — unchanged. (Standard #2: "diverse cultures and communities.")
- `linguistic: false` → **`true`**. Standard #1 explicitly names "**linguistic**" as one of the developmental domains the teacher must understand. The leider-2021 `false` looks like a coding error.
- `el: true` → **`false`**. Neither "English learner," "EL," "ELL," "ESL," "ESOL," nor any equivalent appears in the eleven InTASC standards Maine adopts. The leider-2021 `true` does not survive a direct keyword scan.

These two flips (linguistic and el) are the most material changes from baseline. Both are well-grounded in the standards document text; see `maine-initial-teacher-standards.md`.

### `sealOfBiliteracy`

- `{ adopted: true, year: 2018, sourceUrl: "https://sealofbiliteracy.org/" }` → `{ adopted: true, year: 2018, sourceUrl: "https://sealofbiliteracy.org/state/me/" }`
- Year confirmed (October 31, 2018). URL refined to the state-specific page.

### `elpAssessment`

- `{ name: "ACCESS for ELLs", consortium: "WIDA", sourceUrl: "https://wida.wisc.edu/about/consortium" }` — **unchanged**. Maine remains a WIDA Consortium member and administers WIDA ACCESS Online (and Alternate ACCESS). Spring-2021 adoption of WIDA ELD Standards 2020 Edition logged but does not affect the schema fields.

### `sources[]`

- Two `leider-2021` entries retained (audit trail).
- Eight new `projectcert-2026` entries appended (Chapter 115 Part II, cert-requirements landing, multilingual-learner hub, multilingual-services staffing guidance, MECAS/ACCESS page, 10/2025 administrative letter, NCES Table 204.20, Maine Initial Teacher Standards/InTASC, Seal of Biliteracy state page).

### `lastVerified` / `verificationStatus`

- `2019-11-15` / `baseline-2019` → **`2026-05-08` / `verified-2026`**.

## Disappeared documents

None of the leider-2021 source URLs 404 today. The original `https://www.maine.gov/doe/home` redirects to the live DOE homepage; we keep the leider-2021 entry as-is and add the more specific certification-requirements URL as a new projectcert-2026 entry.

## Open follow-ups (none blocking verified-2026)

- If a future SEA-issued list names Praxis 5362 as the required content test for endorsement 660, flip `eld.requirements.test` from `null` back to `true`.
- The 9/17/2025 red-line version of Chapter 115 Part II is in legislative review; if the final adopted version changes any §1.8 numbers (e.g., the Pathway 3 24-hour requirement), re-verify on next refresh.
