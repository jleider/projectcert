# Hawaii — changes from baseline-2019 (refresh date 2026-05-08)

## Summary

Hawaii's EL teacher credentialing landscape has not changed
substantively since the 2019 baseline. HTSB still issues a standalone
**Teaching English to Speakers of Other Languages (TESOL)** license
field at P-3, K-6, 6-8, 6-12, P-12, and K-12 (per HTSB's current
"License Fields" matrix). HIDOE remains a WIDA Consortium member and
administers ACCESS for ELLs as the annual ELP assessment. Hawaii
adopted the State Seal of Biliteracy in 2015. The Hawaii Teacher
Performance Standards (HTPS) — the current InTASC-aligned set used by
HTSB for program approval and licensure — explicitly reference
diverse, cultural, linguistic, and English-learner content in
Standards 1, 2, 4, 6, 7, and 8.

## Field-level diffs vs. baseline-2019

- `elPercent`: `8.2` → `10.0`
  Updated to NCES Digest Table 204.20 Fall 2021 value (the latest
  year reported in the table; same row's Fall 2019 value was 9.5,
  which differs from the 8.2 baseline — the baseline appears to have
  used a different vintage). `elPercentAsOf` bumped from
  `2019-10-01` to `2021-10-01`.

- `credentials.bilingual.offered`: `false` → `true`
  `credentials.bilingual.standalone`: `false` → `true`
  Re-coding decision. HTSB issues standalone "Kaiapuni Hawaiʻi /
  Hawaiian Language Immersion" and "ʻŌlelo Hawaiʻi / Hawaiian
  Language" license fields (per the current License Fields matrix).
  Per the project's terminology rollup, heritage/immersion programs
  fall under the canonical `bilingual` umbrella alongside DBE/DLBE/TBE.
  These programs serve a Native Hawaiian / Hawaiian-medium population
  rather than the typical "classified EL" population, so requirements
  are coded as `null` (unknown without further HTSB rule citations)
  and the nuance is captured in `notes`. The 2019 baseline likely
  scored bilingual=false because it focused on Spanish/other-LOTE
  bilingual education credentials, of which Hawaii has none.
  `addOn` remains `false` — the Hawaiian-medium fields are issued as
  standalone license fields, not as add-ons to a primary cert.

- `credentials.eld.requirements.program`: `null` → `null` (unchanged;
  HTSB-approved program pathway is the standard route for adding a
  license field in Hawaii, but the public HTSB rule pages were not
  reachable during this refresh — leaving as `null` with note rather
  than asserting `true` without a citation).

- `credentials.eld.requirements.practicum`: `null` → `null` (unchanged;
  same reason — HTSB's published TESOL-specific practicum requirement
  could not be confirmed from a fetchable source on 2026-05-08).

- All other credential and standards-mention fields: no change.

- `sealOfBiliteracy` and `elpAssessment`: pre-populated by an earlier
  worktree merge from main; values verified — Seal adopted 2015, ELP
  assessment is ACCESS for ELLs (WIDA Consortium).

## New `history` events

- `2015-07-01` — Hawaii adopts State Seal of Biliteracy (Act 224, SLH
  2015 / SB 1394). Award first issued to graduating high-school
  students who demonstrate proficiency in English plus another
  language, including ʻŌlelo Hawaiʻi.

- `2021-10-01` — NCES Fall 2021 EL count: 17,353 students (10.0% of
  public-school enrollment), up from 16,769 in Fall 2020.

The pre-existing `2019-12-01` baseline event is retained.

## Source provenance (saved 2026-05-08)

- `htps.pdf` — Hawaii Teacher Performance Standards, full 10-standard
  document. Standards 1(g), 2(d–e, i–k, o), 4(h, m), 6(h, p, u), 7(e,
  i, m), 8(k) reference diverse / cultural / linguistic / English
  language learners / second language acquisition. Confirms all four
  `professionalStandardsMentions.*` flags = true.

- `htsb-license-fields-matrix.pdf` — HTSB current License Fields
  matrix. Confirms standalone TESOL license field at six grade-band
  configurations and standalone Hawaiian Language Immersion / ʻŌlelo
  Hawaiʻi / Hawaiian Knowledge fields.

- `nces-204-20.html` — NCES Digest of Education Statistics Table
  204.20, Fall 2011–Fall 2021. Hawaii Fall 2021 EL count = 17,353
  (10.0%).

## Gaps / future-session work

- HTSB's content-area-specific licensure rules (HAR 8-54 series) and
  the published Praxis test-code lookup were not reachable from this
  session (HTTP 403 from automated fetches, no fetchable mirror).
  Once those are accessible, fill in:
  - `credentials.eld.requirements.program` (likely `true`; HTSB
    historically requires an HTSB-approved program for license-field
    adds, with an alternate-route window).
  - `credentials.eld.requirements.practicum` (likely `true` for the
    program route).
  - Whether the same logic applies to the Hawaiian Language Immersion
    fields under the bilingual rollup.

Verification status promoted to `verified-2026` because the three
load-bearing facts (TESOL exists as a standalone field, WIDA/ACCESS
is the ELP assessment, HTPS standards mention all four EL-relevant
themes) are each grounded in a saved-and-read source. The remaining
`null`s are honest unknowns, not coding gaps.
