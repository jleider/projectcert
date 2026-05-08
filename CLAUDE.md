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

### Attribution is enforced

If anyone uses data from this site, they must cite both the seed paper
(Leider, Colombo & Nerlino, 2021) **and** this site, plus the relevant
per-state SEA source for any specific fact quoted. The "How to cite"
section in `src/pages/about.astro` is the canonical citation block;
the footer links to it from every page. When changing the about page
or footer, do not remove or downgrade these — the authors made the
catalog possible and citing only this site would obscure them.

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
| `Seal of Biliteracy` | Indigo | `--seal-0` / `-3` | Binary |
| `ELP assessment` | Lime | `--elp-0` / `-2` / `-3` | Categorical (state-specific / ELPA21 / WIDA) |

Token naming follows `--{layer}-{level}` where level `0` = none/off,
`2` = mid, `3` = full/on (matches `--bin-N` indexing).

**Adding a new layer** is mechanical:

1. Add tokens to `src/styles/tokens.css` with contrast-check comments.
   Add **both** light-mode (`:root`) and dark-mode
   (`@media (prefers-color-scheme: dark)`) values.
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
   *Categorical (not ordinal) layers may also relax adjacent contrast
   when meaning is carried by the legend label rather than luminance
   ordering — see "Dark theme" below.*

Do **not** reuse the `--bin-N` purple palette for non-`elPercent`
layers — purple is reserved for the sequential bin layer with
hatched-pattern affordance.

State fills do not render text on top (the DC callout label sits
*below* its rect on the white surface), so contrast budgets only
need to consider fill-vs-fill adjacency, not text-on-fill.

### Dark theme

The site supports `prefers-color-scheme: dark` via token overrides in
`src/styles/tokens.css`. Two non-obvious decisions to preserve:

- **Choropleth palettes are remapped, not just dimmed.** In dark mode
  every layer's palette inverts luminance direction: light tile = low
  value, bright/saturated tile = high value (opposite of the
  light-mode "more = darker" convention). Hue per layer is held
  constant so the variable encoding ("purple = % EL", "green =
  bilingual", …) is recognizable across themes; only luminance flips
  so tiles read against the dark surface. Don't "fix" this by
  re-aligning the direction.
- **Visibility of the low-end tile beats strict 3:1 adjacency** for
  categorical layers (`bilingual`, `elp`). On a dark surface the dim
  end of a 3-stop palette has to sit far enough above the surface to
  be clearly visible, which compresses adjacent contrast below the
  schema's 3:1 target. This is acceptable for categorical layers
  because the legend label carries the meaning. Sequential layers
  (`elPercent` only) still hold to ≥3:1 adjacency.
- **`scripts/check-contrast.ts` currently audits light-mode only.**
  Dark-mode pairings are eyeballed. If you change a dark-mode token,
  re-eyeball or extend the script to cover dark-mode pairs.
- **Standalone SVGs in `public/` (favicon, logo) cannot inherit CSS
  custom properties from the embedding page.** They mirror the token
  palette internally and flip via `prefers-color-scheme` inside the
  SVG `<style>`. If you change a brand or bin token in `tokens.css`,
  also update the inline values in `public/favicon.svg` and
  `public/logo.svg` to keep them in sync.

### Parallel state refreshes via worktree subagents

Verifications scale by spawning one subagent per state with
`isolation: "worktree"`. Practical lessons from the bulk Phase 2 sweep:

- **Batch size: 3-at-a-time, not 40+.** A large parallel fan-out
  (>15 in flight) will exhaust the account-wide token quota for the
  day and the latter agents will report "completed" with a "you've
  hit your limit" body — meaning rate-limited, not done. Three
  concurrent agents is the sweet spot.
- **Worktree branch naming is non-uniform.** Some agents commit on
  `worktree-agent-<id>` (the harness-default branch); others
  self-name something like `verify/<state>-<date>` or
  `verify-<state>-2026-XX-XX`. When cherry-picking back to `main`,
  check both. `git branch --list 'verify*' 'worktree-agent-*'` will
  enumerate them.
- **Worktree branches may be stale relative to `main`.** If main has
  evolved since the worktree was spawned (new schema fields, etc.),
  the agent's commit will lack those fields and a naive cherry-pick
  produces conflicts or duplicate JSON keys. Two mitigations: tell
  the spawning prompt to `git merge main --no-edit` first, and
  cherry-pick with `-X theirs` to prefer the agent's edits while
  letting main's additive fields survive.
- **Watch for false-positive completions.** The agent harness emits
  a "completed" notification when the agent process exits — for any
  reason. Always verify by checking the worktree branch's `git log`
  and the `verificationStatus` field on the state JSON before
  concluding the work landed.

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
