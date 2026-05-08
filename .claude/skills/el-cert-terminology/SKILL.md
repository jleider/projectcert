---
name: el-cert-terminology
description: Canonical terminology and state-local alias map for EL teacher certification. Use when normalizing SEA source documents into our schema, when writing site copy, or when reasoning about whether two SEAs are talking about the same credential under different names.
---

# Terminology — canonical terms and aliases

Every SEA names things differently. This skill encodes the rules so we
don't drift across the codebase or invent new synonyms over time.

## Student term

**Canonical: `EL`** (classified English Learner — students legally
entitled to language-instruction services under federal law,
*Lau v. Nichols* 414 U.S. 563 (1974)).

Recorded but not used in site copy:

| Alias | Used by | Meaning |
|---|---|---|
| `ELL` | Many SEAs historically | English Language Learner |
| `ESOL` | Florida, Georgia, others | English for Speakers of Other Languages |
| `EB` | Some scholars | Emergent Bilingual |
| `ML` | Recent shift in NY, others | Multilingual Learner |
| `LEP` | Older federal language | Limited English Proficient |

**Rules:**

- Site copy (UI, headings, body text we author): use `EL`.
- When quoting an SEA's exact wording, preserve their term verbatim
  inside quotation marks. Don't normalize quotes.
- The `professionalStandardsMentions.el` boolean covers references to
  any of the above, since the paper treated them as equivalent for
  detection purposes.

## Credential umbrella

**Canonical: `credential`** = the umbrella covering both standalone
certifications and add-on endorsements.

| Term | Meaning |
|---|---|
| `certification` | Standalone license — earned via its own preparation program. |
| `endorsement` | Add-on to a primary certification (e.g., elementary, secondary content). |
| `licensure` | Synonym for `certification` (some SEAs prefer it; we record but normalize to `certification` in schema fields). |
| `authorization` | Iowa-specific; treat as a credential, document in `notes`. |

When a state offers both a standalone *and* add-on path for the same
credential type, set both `standalone: true` and `addOn: true` and
document the pathways in `notes`.

## Program types

**Canonical**: `bilingual`, `eld`, `sei`, `mainstream`.

### `bilingual`

Covers all bilingual education program models (the paper bundles
these; we follow):

- DBE — Developmental Bilingual Education
- DLBE — Dual Language Bilingual Education
- TBE — Transitional Bilingual Education
- Heritage language programs
- Immersion programs in a non-English target language

### `eld` (English Language Development)

Covers all English-only language-instruction credentials. The paper
prefers `ELD` over `ESL`, and so do we, but many SEAs still use:

| State-local name | Canonical |
|---|---|
| ESL — English as a Second Language | `eld` |
| ENL — English as a New Language (IL, NY) | `eld` |
| ESOL — English to Speakers of Other Languages | `eld` |
| TESOL — Teaching English to Speakers of Other Languages (FL, GA, NJ) | `eld` |
| CLD — Cultural and Linguistic Diverse (CO) | `eld` |
| TESL — Teaching English as a Second Language | `eld` |

If an SEA distinguishes between, e.g., ENL (English-only) and ESL
(allows native-language support) — as Illinois does — record both
under `eld` and explain in `notes`.

### `sei` (Sheltered English Instruction)

A credential mandating content-area teachers be trained to make
content comprehensible to ELs. **Rare**: only AZ, CA, MA mandate it
for all teachers as of the 2019 baseline; NV is phasing in. Other
states may offer SEI training but not mandate it.

### `mainstream`

A general-education teacher (elementary, secondary content) without
EL-specific credentialing. The site doesn't store a `credentials.
mainstream` object — instead, mainstream-teacher accountability is
captured via `professionalStandardsMentions`.

## State-local quirks worth knowing

These appear in `src/data/terminology.ts` as the alias map; this is the
human-readable summary:

| State | Local term | Canonical |
|---|---|---|
| AZ | "SEI Endorsement" | `sei.mandatedForAllTeachers: true` |
| CA | "CLAD / Bilingual Authorization" | `eld` standalone + `bilingual` |
| CO | "CLD Education endorsement" | `eld` |
| CO | "CLD Bilingual Education Specialist" | `bilingual` |
| FL | "ESOL Endorsement" | `eld` |
| HI | references "all licenses" generically | review carefully |
| IA | "Authorization" to teach a non-English language | `bilingual` (despite name) |
| IL | "ESL Certificate" + "ENL Certificate" (separate) | both → `eld` (note distinction in `notes`) |
| MA | "SEI Endorsement" | `sei.mandatedForAllTeachers: true` |
| NM | Native American/Indigenous language endorsement | `bilingual` (note language in `notes`) |
| NY | "Bilingual Extension" | `bilingual` add-on |
| NY | "ESOL" | `eld` |
| OR | distinct "Bilingual" + "Dual Language" endorsements | both → `bilingual` (note in `notes`) |

## Don't

- Don't invent new aliases without adding them here AND to
  `src/data/terminology.ts`.
- Don't strip an SEA's wording from `notes` or `sources[].label` —
  those preserve the local naming for searchability and trust.
- Don't use `ELL`, `ESL`, `LEP`, `EB`, or `ML` in headings, button
  labels, or chart axes. Use `EL` in our voice; preserve verbatim
  in quotes.
