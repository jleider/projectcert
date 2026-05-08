---
name: el-cert-schema
description: Canonical Zod schema for state EL teacher certification records. Use when adding or editing any file under src/content/states/, when designing data ingestion, or when reasoning about which fields are required vs. optional vs. nullable.
---

# EL certification data schema

The single source of truth is `src/content/config.ts` (Zod). This skill
documents the *intent* behind each field so you can fill them
correctly, especially the easy-to-confuse boolean-vs-null cases.

## File location

`src/content/states/<usps>.json` — one file per state + DC. Filename is
the lowercase USPS code (e.g., `ma.json`, `dc.json`). 51 files total.

## Top-level fields

| Field | Type | Notes |
|---|---|---|
| `usps` | `string(2)` | Uppercase USPS code. Must equal the filename (case-insensitive). |
| `name` | `string` | Full state name (e.g., "Massachusetts", "District of Columbia"). |
| `elPercent` | `number` | Percentage of public-school students classified as ELs. From paper Table 2 for baseline records; from current SEA / NCES data for `verified-2026`. |
| `elPercentAsOf` | `YYYY-MM-DD` | When this percentage was current. |
| `credentials` | object | Three sub-objects: `bilingual`, `eld`, `sei`. |
| `professionalStandardsMentions` | object | Four booleans: `diverse`, `cultural`, `linguistic`, `el`. From the SEA's professional teaching standards document. |
| `sources` | array (≥1) | **Provenance — required.** See below. |
| `lastVerified` | `YYYY-MM-DD` | Most recent verification date. |
| `verificationStatus` | enum | `baseline-2019` \| `in-progress` \| `verified-2026` |

## `credentials.bilingual` and `credentials.eld`

Same shape:

```json
{
  "offered": true,
  "standalone": true,
  "addOn": true,
  "requirements": {
    "program": true,
    "coursework": null,
    "practicum": true,
    "test": null,
    "languageProficiency": true
  },
  "notes": "..."
}
```

- `offered: false` → omit `requirements` entirely. The other fields
  (`standalone`, `addOn`) should also be `false`.
- `requirements.*`: `true` means *required*, `false` means *not
  required*, `null` means *unknown / could not determine from public
  sources*. Don't guess — `null` is a valid honest answer.
- `requirements.program` = "completion of an approved/state-recognized
  preparation program."
- `requirements.coursework` = independent coursework (not as part of an
  approved program).
- `requirements.practicum` = supervised field experience hours.
- `requirements.test` = a content/subject-matter test (Praxis, state
  exam, etc.).
- `requirements.languageProficiency` = demonstrated proficiency in a
  non-English language (relevant primarily for `bilingual`).
- `notes` is for state-specific quirks (multiple pathways, age-range
  limits, native-language endorsements, emergency credentials, etc.).

## `credentials.sei`

```json
{ "mandatedForAllTeachers": true, "notes": "..." }
```

`mandatedForAllTeachers: true` is rare. As of the 2019 baseline only
AZ, CA, MA require it; NV is phasing in. Anywhere else, default
`false`.

## `professionalStandardsMentions`

Each boolean = "does the SEA's professional teaching standards
document explicitly reference this category?"

- `diverse` — uses `diverse / diversity / all / each / every` student.
- `cultural` — uses `cultural / culture`.
- `linguistic` — uses `language / linguistic` (excluding "academic
  language" or "language of the discipline").
- `el` — explicit reference to ELs / English language / ELL / ESL /
  LEP.

These are independent flags, but in practice form a hierarchy:
`el → linguistic → cultural → diverse`. If `el = true` you'd usually
expect the others true too.

## `sources` (provenance — required)

```json
{
  "label": "MA Office of Educator Licensure — SEI Endorsement page",
  "url": "https://www.doe.mass.edu/...",
  "retrievedAt": "2019-11-15",
  "retrievedBy": "leider-2021"
}
```

Rules:

- `min(1)` — schema rejects records with no sources.
- `url` should be SEA-controlled (`*.gov`, `*.us`, or a known SEA
  domain). If a third-party (e.g., university page) is the only
  available source, note it in the state's `notes` field.
- `retrievedBy` is currently one of:
  - `"leider-2021"` — sourced from the Leider/Colombo/Nerlino paper's
    Appendix A documents.
  - `"projectcert-2026"` — re-pulled by us during Phase 2.
- Don't delete old `sources[]` entries on refresh — append, so the
  history of where we got each fact stays traceable.

## `verificationStatus` rules

- `baseline-2019` — record is from the paper, not yet re-verified.
  Default state for all records on initial seed.
- `in-progress` — refresh started, work pending. Use sparingly; ideally
  go from `baseline-2019` → `verified-2026` in one commit.
- `verified-2026` — current SEA sources have been re-pulled and the
  record reflects them. **Don't demote** without a documented reason
  (e.g., "MA changed the LOOK Act regulations" — note the change in
  `notes` and add a new source rather than reverting status).

## Validation

`npm run validate` runs Zod against every file. Common failure modes:

- Missing `sources[]` (most common — easy to forget on a quick edit).
- `requirements` present when `offered: false` (omit it entirely).
- `usps` mismatch with filename.
- Date format wrong (must be `YYYY-MM-DD`).
- `requirements.*` set to `false` when you meant `null` (the
  distinction matters analytically).

## Don't

- Don't invent values to fill gaps. `null` is honest.
- Don't drop `notes` when refreshing — they accumulate institutional
  knowledge about the state's quirks.
- Don't normalize SEA-local terminology *into* the schema. The schema
  is canonical; the alias map (`src/data/terminology.ts`) is where
  state-local wording lives. See the `el-cert-terminology` skill.
