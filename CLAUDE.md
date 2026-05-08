# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`projectcert` is an atlas-style website cataloging every U.S. state
education agency's (SEA) teacher certification requirements for
instructing **classified English Learner (EL)** students. It pairs
structured per-state data with a web UI: an interactive choropleth, a
side-by-side comparison tool, per-credential topical reports, and a
detail page for each of the 50 states + D.C.

Seed data: Leider, Colombo & Nerlino (2021), *EPAA* 29(100), a document
analysis of all 51 SEAs collected Oct–Dec 2019. Every state's data must
be re-verified against current SEA sources before public launch.

## Stack

- **Astro** + TypeScript (strict). Content collections for state data.
- **Svelte** island for the map. **d3-geo** + **topojson-client** + a
  hand-written SVG component (no third-party map wrapper — full control
  over keyboard/ARIA).
- **Tailwind CSS** + custom design-token layer at `src/styles/tokens.css`.
- **Zod** for content schema validation.
- **Vitest** for schema/utility tests; **Playwright + axe-core** for a11y.
- Static deploy (target: Cloudflare Pages or Netlify).

## Commands

- `npm run dev` — Astro dev server.
- `npm run build` — produce static site in `dist/`.
- `npm run validate` — Zod schema check + WCAG contrast check on tokens.
- `npm run test` — Vitest + Playwright + axe.

## Working principles

### Provenance is the product

Every fact-bearing field on a state must trace to an entry in that
state's `sources[]` array, with `url` + `retrievedAt` + `retrievedBy`.
The Zod schema enforces `sources.min(1)`. CI fails if a citation is
missing. A catalog without provenance is opinion; treat it accordingly.

### Terminology is canonical, not copied

Every SEA names things differently. We standardize on:

- **Student term**: `EL` (classified). Aliases recorded but not used in
  site copy: `ELL, ESOL, EB, ML, LEP`. Source quotes preserve the SEA's
  exact wording.
- **Credential umbrella**: `credential` covers both standalone
  certifications and add-on endorsements.
  - `certification` = standalone license (own program).
  - `endorsement` = add-on to a primary certification.
  - `licensure` = synonym for `certification` (some SEAs prefer it).
- **Program types**: `bilingual` (DBE/DLBE/TBE/heritage all roll up),
  `eld` (ESL, ENL, CLD all roll up), `sei`, `mainstream`.

State-local aliases (e.g., "English as a New Language", "Cultural and
Linguistic Diverse", "TESOL endorsement") map to the canonical fields
via `src/data/terminology.ts`. See the `el-cert-terminology` skill.

### Verification status is load-bearing

Every state has `verificationStatus`: `baseline-2019` | `in-progress` |
`verified-2026`. The site-wide pre-launch banner counts how many of the
51 are `verified-2026`. **Never demote a state from `verified-2026`
without a concrete reason** (e.g., the SEA explicitly changed
something) — and record that reason in the commit.

### Adding/updating a state is a one-file edit

Edit `src/content/states/<usps>.json` and run `npm run validate`. Use
the `state-source-refresh` skill for the verification workflow.

### External links open in new tabs

Any link to a URL outside projectcert (SEA pages, the seed paper's DOI,
external references) must use the `<ExternalLink>` component
(`src/components/ExternalLink.astro`). It sets `target="_blank"`,
`rel="noopener noreferrer"`, adds a small `↗` glyph, and announces
"(opens in a new tab)" to screen readers. Internal links
(`/states/...`, `/credentials/...`, etc.) stay as plain `<a>`.

### Map layer palettes — one hue per encoded variable

Each map layer uses its own distinct hue so switching the encoded
variable produces an obvious recolor instead of an ambiguous shade
swap. Tokens live in `src/styles/tokens.css`.

| Layer | Hue | Tokens | Type |
| --- | --- | --- | --- |
| `% classified ELs` | Purple | `--bin-0` … `--bin-3` | Sequential, 4 bins, **only layer with hatched-pattern overlays** |
| `Bilingual credential` | Green | `--bilingual-0` / `-2` / `-3` | Categorical (none / add-on / standalone) |
| `ELD credential` | Amber | `--eld-0` / `-2` / `-3` | Categorical |
| `SEI mandate` | Teal | `--sei-0` / `-3` | Binary |
| `Standards mention ELs` | Rose | `--standards-0` / `-3` | Binary |

Token naming follows `--{layer}-{level}` where level `0` = none/off,
`2` = mid, `3` = full/on (matches `--bin-N` indexing).

**Adding a new layer** is mechanical:

1. Add tokens to `src/styles/tokens.css` with contrast-check comments.
2. Add a `LEGENDS[layer]` entry in
   `src/components/MapExplorer.svelte`.
3. Add a branch to `fillFor()` and `describe()` in
   `src/components/Choropleth.svelte`.
4. Add the pairings to `scripts/check-contrast.ts` and re-run
   `npm run check:contrast`. Adjacent categorical levels must clear
   ≥3:1 (WCAG 2.1 SC 1.4.11). The 4-stop `elPercent` purple ramp is
   the documented exception — adjacent 3:1 across four solid stops
   is mathematically infeasible, so it's enforced as `informational`
   and relies on legend text labels (SC 1.4.1) for meaning.

Do **not** reuse the `--bin-N` purple palette for non-`elPercent`
layers — purple is reserved for the sequential bin layer with
hatched-pattern affordance.

State fills do not render text on top (the DC callout label sits
*below* its rect on the white surface), so contrast budgets only
need to consider fill-vs-fill adjacency, not text-on-fill.

### EL data nuances to keep in mind

- States vary wildly. Some have one EL endorsement, others tier them,
  others fold EL into broader credentials. The schema accommodates
  rather than forces every state into the same shape — `null` is a
  valid signal for "not applicable" or "unknown" on requirement flags.
- `sei.mandatedForAllTeachers = true` is rare (AZ, CA, MA; NV phasing
  in). Don't infer this elsewhere.
- "Approved program" vs. "test only" is the most analytically
  important distinction in ELD/bilingual requirements. Preserve it.

## Skills

Three project skills under `.claude/skills/`:

- **`el-cert-schema`** — canonical schema reference. Triggered when
  editing files under `src/content/states/`.
- **`el-cert-terminology`** — alias map + canonical terms. Triggered
  when normalizing source text or writing copy.
- **`state-source-refresh`** — Phase 2 verification workflow. Triggered
  by phrases like "refresh `<state>`", "verify `<state>`", "update
  `<state>` data".

## Source paper

Leider, C. M., Colombo, M. W., & Nerlino, E. (2021). Decentralization,
teacher quality, and the education of English learners: Do state
education agencies effectively prepare teachers of ELs? *Education
Policy Analysis Archives, 29*(100).
<https://doi.org/10.14507/epaa.29.5279>

The PDF is the seed for `verificationStatus: "baseline-2019"` records.
Tables 2–5 + Appendix A in the paper are the primary data inputs.
