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
- `npm run build` — runs `check-state-integrity` + `generate-llms-full`
  before `astro build`.
- `npm run validate` — `astro check` (svelte/Zod) + contrast check +
  state-integrity check (51 records, USPS uniqueness, provenance trail).
- `npm run lint` — ESLint over `.ts`/`.astro`/`.js`. Svelte is excluded;
  type errors there are caught by `astro check` (svelte-check).
- `npm run typecheck` — `tsc --noEmit` under strict mode +
  `noUncheckedIndexedAccess`.
- `npm run test` — Vitest (schema + helper unit tests).
- `npm run test:e2e` — Playwright + axe.

## Conventions and DRY rules

These are the patterns to reach for first; reviewers will flag drift.

### Single source of truth for the canonical URL

`src/config/site.ts` exports `SITE_URL` and `SITE_NAME`. The literal
string `"https://projectcert.org"` should appear *only* there.
`astro.config.ts` imports it; pages/components/scripts import from
`@/config/site`. Internal navigation stays root-relative
(`/states/...`, `/map/`); only canonical/JSON-LD/embed contexts need
the absolute form.

### State data: split between server-only and Svelte-safe

- `src/lib/state-types.ts` — pure types/constants/helpers
  (`Layer`, `LAYERS`, `ChoroplethDatum`, `CredentialType`,
  `CREDENTIAL_TYPES`, `stateUrl`, `absoluteStateUrl`). No
  `astro:content` import. Svelte islands import from here.
- `src/lib/state-data.ts` — runtime helpers that need
  `getCollection("states")` (`getAllStates`, `getChoroplethData`,
  `breakdownFor`). Re-exports the types from `state-types.ts` for
  convenience in `.astro` files.

If a Svelte component needs a type or pure helper, **import from
`state-types`**, not `state-data`. Importing `state-data` into Svelte
breaks the build with "astro:content is server-only".

### Use the helpers, don't hand-build

- **Internal routes**: import from `@/lib/routes`. `ROUTES.map`,
  `ROUTES.credentials.bilingual`, `ANCHORS.howToCite`, etc. For
  fully-qualified URLs (JSON-LD, OG tags) use
  `absoluteRoute(SITE_URL, ROUTES.x)`. For same-page anchors use
  `sameAnchor(ANCHORS.x)`. ESLint rejects bare-string `href="/foo/"`
  on `<a>` (`no-restricted-syntax`); a renamed page surfaces as a
  typecheck failure rather than a silent broken link.
- **State URLs**: `stateUrl(usps)` for root-relative,
  `absoluteStateUrl(SITE_URL, usps)` for absolute. Per-state sub-pages
  (e.g., `/states/<usps>/el-percent-history/`) get their own helpers
  (`elPercentHistoryUrl`, `absoluteElPercentHistoryUrl`) in
  `@/lib/state-types`. Never write
  `` `/states/${s.usps.toLowerCase()}/` `` and **never cast a
  hand-concatenated string with `as LinkUrl`** to satisfy the route
  type — add or extend the helper instead. The `LinkUrl` brand exists
  so renames fail loud; bypassing it with a cast reintroduces the
  silent-broken-link class of bug the brand is meant to prevent.
- **State link rendering**: `<StateLink usps={s.usps}>{s.name}</StateLink>`
  in `.astro` pages. Pass `unstyled` + `class` for card-style links.
- **Per-state seals**: `<StateSeal usps={s.usps} size={N} />`. Files
  live at `public/seals/<usps>.svg` with sibling `.license.txt`.
  Re-run `tsx scripts/fetch-state-seals.ts` to refresh from
  Wikimedia Commons (script handles backoff).
- **JSON-LD breadcrumbs**: `breadcrumbWithHome([{name, url}, ...])`
  from `@/lib/jsonld`. Auto-numbers positions; root-relative URLs
  get resolved against `SITE_URL`. **Never** hand-build
  `BreadcrumbList itemListElement` arrays — past hand-built ones
  diverged silently (eld/sei breadcrumbs all pointed at
  `/credentials/bilingual/` in position 2 for months before the
  helper caught it).
- **Cross-state credential filtering**: `breakdownFor(states, "bilingual" | "eld")`
  returns `{offered, standalone, addOnOnly, both, notOffered}`.

### Static SSR has no request-time query string

Astro is configured for static output, so `Astro.url.searchParams`
in a page frontmatter resolves at *build* time, not at request
time. For pages where state needs to derive from `?layer=`,
`?state=`, etc., the resolution must happen client-side after
hydration:

- Server-render the page with a sensible default (e.g. `layer =
  "elPercent"`).
- In the Svelte/JS island that owns the state, read
  `new URLSearchParams(window.location.search)` on mount and
  upgrade the value if the query disagrees with the SSR default.
- For URL ⇄ state sync within the page (e.g. layer toggle should
  rewrite the URL), use `history.replaceState` rather than
  `pushState` so back-button history isn't polluted with every
  click.

The `MapExplorer` component is the reference implementation; the
`/embed/map/` page is the exception, since the iframe `src` is the
canonical state and embed contexts shouldn't mutate the host URL.

### State seals

Per-state seal SVGs live at `public/seals/<usps>.svg` with sibling
`.license.txt` provenance pointers. `<StateSeal>` renders them via
`background-image` (not `<img>`) — `background-size: contain`
guarantees aspect-ratio preservation across container sizes
without fighting Tailwind's preflight `img { height: auto }` rule.

A few state seals (notably CT) are genuinely portrait by official
design; no naturally-square version exists on Wikimedia or
elsewhere. The canonical fix is to pad the SVG's `viewBox` to a
square and let the artwork center with transparent margins. Do
*not* alter the underlying artwork dimensions — the official seal
is the official seal.

### Map topology

The choropleth fetches `public/data/us-states-10m.json` (us-atlas
10m TopoJSON, ~56 KB after optimization). The committed file is not
the raw upstream — it is the output of
`scripts/optimize-map-topology.ts`, which drops territories
(PR/VI/GU/AS/MP and the `objects.nation` collection — both unused
by `Choropleth.svelte`'s render loop), applies Visvalingam
simplification, and re-quantizes onto a 5000×5000 integer grid. The
combination roughly halves byte size versus the upstream 10m file
with no perceptible change at the 975×610 render viewBox.

When you bump the upstream us-atlas version (or change the render
viewBox in a way that needs more precision), drop the raw file in
place and re-run `npx tsx scripts/optimize-map-topology.ts`. The
script is idempotent — running it on its own output is a no-op.

Two non-obvious pitfalls the script handles, worth knowing if you
ever rewrite it:

- **`presimplify` dequantizes.** It removes the topology's integer
  `transform` and writes absolute float coordinates so it can attach
  effective-area weights. Without a follow-up `quantize`, the output
  is ~4× the size of the input. Simplify-without-requantize is the
  wrong operation here.
- **`@types/topojson-simplify` and `@types/topojson-client` derive
  `Topology` with mismatched generic defaults** (`Objects<{}>` vs
  `Objects<GeoJsonProperties>`), so piping `presimplify → simplify →
  quantize` produces a spurious type error at the boundary. The
  script funnels the three functions through a single structural
  alias once; don't chase the cross-package generic mismatch.

### Embed mode

The map is embeddable via `/embed/map/?layer=<layer>`. Two prop
flags drive the differences:

- `<MapExplorer embedFooter={true}>` — renders the
  Source/projectcert/Open-full-atlas attribution line and forwards
  `embedLinks` to the Choropleth.
- `<Choropleth embedLinks={true}>` — state-link `href`s become
  absolute (`https://projectcert.org/states/<usps>/`) with
  `target="_blank" rel="noopener"`, and the JS click handler also
  opens a new tab. Without this, embedded users get trapped in the
  iframe.

Both layouts read `prefers-color-scheme`, so the embed adapts to its
host page automatically.

## Safeguards in place

- **TypeScript**: `strict` + `noUncheckedIndexedAccess` +
  `noImplicitOverride` + `noFallthroughCasesInSwitch`. Indexing
  arrays returns `T | undefined`; use `arr[i]!` only when the
  surrounding logic guarantees presence.
- **Schema (Zod)**:
  - `elPercentAsOf <= lastVerified` — refuses retro-dated freshness.
  - `history[]` sorted oldest → newest — auto-resort lives in
    git history if you need a one-off (see commit messages).
  - `history[i].date` capped at +10 years — accommodates known
    future-effective rules (e.g. IL 23 IAC 24.140 effective
    2026-07-01) but rejects 9999-style typos.
  - `sources.min(1)`, `history[i].sourceUrls.min(1)`.
- **Build-time integrity** (`scripts/check-state-integrity.ts`):
  - Exactly 51 state files; USPS codes unique; filename matches
    `usps.toLowerCase()`.
  - Every `verified-2026` state must have at least one
    `sources/<USPS>/<YYYY-MM-DD>/changes-from-baseline.md` file
    (the audit trail). When 5 states' worktree snapshots didn't
    survive a cherry-pick, this check caught it; reconstruction
    stubs at `sources/<USPS>/2026-05-07/changes-from-baseline.md`
    list the cited URLs.
  - Every `projectcert-2026` source row needs a corresponding
    `sources/<USPS>/<retrievedAt>/` directory (cross-state shared
    sources under `sources/{nces,wida,elp-assessments,seal-of-biliteracy}/`
    are the documented exception).
- **CI** (`.github/workflows/ci.yml`): on push + PR, runs lint →
  typecheck → validate → test → build → offline link check.
  Concurrency cancels in-flight runs on the same ref.
- **Weekly external link sweep**
  (`.github/workflows/external-link-check.yml`): non-blocking,
  uploads a markdown report. Don't fail PRs on external SEA links —
  they drift on their own schedule.

## Working principles

### Voice, tone, and writing style

User-facing copy on this site uses an **academic register**. Researchers,
policymakers, teacher educators, and journalists are the primary
readership; the prose should read as authoritative reference material,
not marketing.

- **Third person, measured.** "The catalog records…", "Connecticut
  requires…", "Twenty-eight SEAs offer…". Avoid first-person plural
  ("we") and second-person ("you") in body copy. Imperative voice in
  developer-facing strings (CLAUDE.md, READMEs, code comments) is
  fine.
- **Quantify where possible.** "23 of 51 jurisdictions" beats "many
  states". "Drops from 24 to 15 semester-hours" beats "fewer
  hours".
- **No contractions in body prose** ("does not" rather than
  "doesn't"). Contractions are acceptable in admin/UI microcopy
  ("It's empty", "Don't have an account") where the academic
  register would feel stilted.
- **No colloquialisms or intensifiers.** Avoid "wildly", "huge",
  "tons of", "a lot", "really", "very", "kind of". Strike the
  intensifier or replace with a number.
- **No exhortations.** No "Drop this anywhere on your page" or
  "Here's what you'll see". Replace with declarative description:
  "The snippet below renders the map at full container width."
- **Cite inline.** Quantitative claims should reference a source —
  either a parenthetical citation, a footnoted link, or a sentence
  attributing the figure to NCES / the seed paper / the SEA's own
  document.
- **Hedge correctly.** "The 2019 baseline coded X as Y" not "X is Y"
  when the field carries `verificationStatus: baseline-2019`. The
  verification status is itself a hedge; copy must respect it.
- **Define on first use.** Spell out acronyms (English Learner, EL;
  English Language Development, ELD; Sheltered English Instruction,
  SEI; State Education Agency, SEA) the first time they appear in
  any page or section. The glossary is the long-form reference.
- **Source quotes preserve the SEA's own wording.** Quote verbatim,
  including non-canonical aliases (ELL, ESOL, ENL, ML). Do not
  silently retitle.
- **Headings are noun phrases, not questions.** "Credentials by
  state", not "Which states have credentials?". Questions in body
  text are fine when they introduce evidence; in navigation they
  read as marketing.
- **No code or schema identifiers in user-facing copy.** Body prose,
  badges, captions, page headings, button labels, and tooltip text
  are read by researchers, journalists, and SEA staff — not by
  contributors to this repo. Do not surface field names
  (`verificationStatus`, `elPercentHistory`, `sources[]`,
  `retrievedAt`), enum values (`baseline-2019`, `verified-2026`,
  `in-progress`), file paths (`sources/<usps>/<date>/`,
  `src/content/states/<usps>.json`), schema-array notation (`[]`),
  or workflow/skill names (`state-source-refresh`) anywhere a reader
  would encounter them. Rewrite into prose: "verified against
  current 2026 sources" not `verified-2026`; "the cited source
  documents" not `sources[]`; "the per-state archive in the project
  repository" not `sources/<usps>/<date>/`. The exception is the
  embed-integration page, where code snippets (`<iframe>` HTML,
  `?layer=` query strings) *are* the documented API for developers.

When editing existing copy, prefer trimming to rewriting. Tighter prose
in the academic voice almost always emerges from removing intensifiers
and second-person constructions, not from reaching for new vocabulary.

### Typography mirrors register

The citable lead paragraph at the top of `/states/<usps>/` — the one
generated by `leadParagraph(s)` from `src/lib/state-summary.ts` — is
set in `font-serif`. The serif face is the visual signal that this
sentence is reference prose, not UI. Everything else (navigation,
labels, microcopy, the "view trend →" affordance, button text,
glossary entries) stays in the default sans family.

Apply `font-serif` to any *new* surface that presents the same kind
of citable claim — for example, a future per-credential summary
paragraph that a researcher would quote. Don't apply it to lists,
headings, code-like strings, or pages where the prose is narrating
the UI rather than making a claim. The font choice is a contract
with the reader: serif = "you can cite this sentence," sans =
"this is interface."

Every fact-bearing field on a state must trace to an entry in that
state's `sources[]` array, with `url` + `retrievedAt` + `retrievedBy`.
The Zod schema enforces `sources.min(1)`. CI fails if a citation is
missing. A catalog without provenance is opinion; treat it accordingly.

`history[]` rows follow the same rule (schema enforces
`sourceUrls.min(1)`). For pre-2019 backfills, prefer codified-statute
URLs on the state legislature's site over session-law numbers —
codified URLs survive renumbering. For federal cases, use justia or
oyez. **If you can't cite a URL you're confident in, drop the row.**
Fabricating a plausible-looking but unverified link is worse than a
missing event.

### Audit artifacts: where the audit trail lives

Per-state source snapshots (the load-bearing files referenced by the
integrity check) live at `sources/<USPS>/<retrievedAt>/` —
**uppercase USPS**, matching the `usps` field in the JSON. The
`changes-from-baseline.md` file in the most recent snapshot dir is
what every `verified-2026` state must carry.

Audit-pass artifacts (worker write-ups + supporting research +
captured source files) live in that **same uppercase** per-state
snapshot directory, so everything for one state's verification pass
sits together:

- `sources/<USPS>/<YYYY-MM-DD>/audit-report.md` — one per state, the
  worker agent's write-up of what it found re-verifying that record.
  Raw, unreconciled. Not referenced by any JSON.
- `sources/<USPS>/<YYYY-MM-DD>/sea-el-research.md` and the captured
  source documents (HTML/PDF) sit in the same dir as
  `changes-from-baseline.md`.

Cross-state reviews are the exception and use a topic-dir layout
(not per-state):

- `sources/_verifier/<YYYY-MM-DD>/batches-{N-M}.md` — reviewer
  passes that read the worker reports, web-fetched cited URLs, and
  reconciled disputed findings across batches of states.
- `sources/_consolidated/<YYYY-MM-DD>/done-and-todo.md` — the
  single "state of play" doc per audit pass: what landed, what is
  still TODO, validation status. Start here when picking up an
  audit. Cached supporting data (e.g., `nces-d23-table-204-20.tsv`)
  sits alongside it.

**Always use uppercase USPS for per-state paths.** Earlier passes
wrote some worker artifacts to a lowercase `sources/<usps>/` sibling;
on case-insensitive macOS that silently coexisted with the uppercase
snapshot dir, but case-sensitive Linux CI treats `sources/co/` and
`sources/CO/` as different directories, which broke the integrity
check (`check-state-integrity.ts` builds the path from the uppercase
`usps` field). The two cases have since been consolidated to
uppercase; do not reintroduce a lowercase variant.

When adding a new audit pass, keep `done-and-todo.md` as the single
entry point so prior summary / research-followup files do not need to
be retained separately.

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

User-facing per-state strings — page title, meta description, the
citable lead paragraph at the top of `/states/<usps>/`, and the
`Dataset` JSON-LD body — all derive from the JSON at build time via
`src/lib/state-summary.ts`. Don't hardcode state-specific copy
elsewhere; extend the helpers if you need a new surface so every state
stays consistent.

### Attribution is enforced

If anyone uses data from this site, they should cite the seed paper
(Leider, Colombo & Nerlino, 2021) **and** this catalog (the specific
page the fact was taken from). The SEA source linked from that page
is conditional — required when quoting an SEA verbatim or when the
claim is contested enough that a reader will want the primary source
directly. The "How to cite" section in `src/pages/about.astro` is the
canonical citation block; the footer links to it from every page.
When changing the about page or footer, do not remove or downgrade
these — the seed-paper authors made the catalog possible and citing
only this site would obscure them.

### Repository is dual-licensed

The `LICENSE` file at the repo root documents the split:

- **Site code** (Astro / Svelte / TypeScript source, build scripts,
  styles) — **MIT**.
- **Catalog data** (`src/content/states/*.json` and everything under
  `sources/`) — **CC BY 4.0**.

Both are attribution-required, otherwise unrestricted. Linked SEA
source documents remain copyright their respective agencies and are
referenced by URL only — never check a redistributable copy of an
SEA PDF into `sources/` unless its own license permits it (most
state regulatory text does; some agency-branded supplements do not).
When adding a new file type or surface, decide which side of the
split it falls under and update the README license section if the
boundary becomes non-obvious.

### Machine-readable surfaces

The site emits three machine-readable artifacts on every build:

- `dist/sitemap.xml` (+ `sitemap-index.xml`) — generated by
  `@astrojs/sitemap` from the routes. New `.astro` pages under
  `src/pages/` (including dynamic `[param]/sub-page.astro` files) are
  picked up automatically; verify after build, no manual edit.
- `dist/llms.txt` — hand-curated entry point per the
  [llms.txt](https://llmstxt.org/) convention. Edit by hand.
- `dist/llms-full.txt` — regenerated from per-state JSON via
  `scripts/generate-llms-full.ts` (wired into the npm `build` script).

**When adding, modifying, renaming, or removing a URL or page type,
update all three discovery surfaces in the same change** — not in a
follow-up:

1. **Sitemap.** Verify after `npm run build` that the new path is in
   `dist/sitemap-0.xml`. If `@astrojs/sitemap` excludes it, fix the
   integration config rather than working around it.
2. **`public/llms.txt`.** Add the page under "Per-state pages" (for
   state sub-pages) or a dedicated section (for new top-level
   routes). Describe what the page contains, not just its URL — the
   file is read by humans and crawlers triaging the site. On rename
   or removal, rewrite the references; don't leave stale links to
   404s.
3. **`scripts/generate-llms-full.ts`.** For per-state sub-pages, emit
   the URL in the per-state block (e.g., `EL-percent history page:
   <url>`) so the RAG dump links each state record to every page
   about that state. For new top-level pages, extend the header.

If you also add a *schema field* that should be LLM-discoverable
(something a researcher would cite), surface it in
`generate-llms-full.ts`. Otherwise the field is on the page but not
in the RAG-friendly export, and AI search engines miss it.

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

- **The purple `--bin-*` ramp preserves direction across themes;
  categorical layers flip.** In light mode the % EL ramp goes from
  pale (low) to deep purple (high). In dark mode it goes from white
  (low) to mid purple (high) — same *direction*, just shifted into
  the bright half of the luminance range so every tile clears the
  dark surface. This deliberately matches the brand mark in
  `public/logo.svg` and `public/favicon.svg`. Trade-off: on dark
  surfaces the lowest-value tile is the most luminance-salient
  (pure white on near-black), which can read as "this tile stands
  out" even though it encodes the lowest value; the legend's text
  labels carry the meaning (SC 1.4.1).

  Categorical layers (`bilingual`, `eld`, `sei`, `standards`,
  `seal`, `elp`) still flip luminance direction in dark mode (their
  "on" / standalone state is the brightest tile on the dark
  surface). This is acceptable because the legend label, not
  luminance order, carries the meaning for categorical encodings.
  If you re-align the `--bin-*` ramp's direction, do not propagate
  the change to the categorical palettes without a deliberate
  review.
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
  SVG `<style>`. Light-mode bin values match `tokens.css`. **Dark
  mode deliberately diverges**: the brand SVGs keep the same
  luminance direction as light mode (dim bin-0 → bright bin-3)
  rather than flipping it like the map choropleth does. The map
  flips because a dim tile on a dark surface reads as "low value";
  the brand mark is recognized as a shape, not a data encoding, so
  cross-theme consistency of *which tile is brightest* matters more
  than directional encoding. If you change a brand-mark color,
  update both `public/favicon.svg` and `public/logo.svg` (the
  outline-logo script's COLOR_LOGO template) together.
- **SVG optimization**: `svgo.config.mjs` disables `inlineStyles`.
  Without that override, svgo would hoist light-mode CSS variable
  declarations onto a `style=""` attribute on the root `<svg>`,
  which beats the `@media (prefers-color-scheme: dark)` rule on
  specificity (inline > any selector). Always run svgo with the
  project config: `npx svgo public/<file>.svg`.
- **Use the token-backed Tailwind utilities, not literal-color +
  `dark:` overrides.** Reach for `bg-surface`, `text-ink`,
  `text-ink-muted`, `text-ink-subtle`, `border-ink-subtle/30`,
  `bg-bin-3`, `text-accent`, etc. — these resolve to CSS custom
  properties that flip automatically under `prefers-color-scheme:
  dark`. Avoid pairing literal colors with `dark:` variants
  (`bg-white dark:bg-bg`, `text-black dark:text-white`): Tailwind
  will silently accept a typo like `dark:bg-bg` (no such utility),
  shipping a tooltip that reads light-text-on-white in dark mode.
  The token classes can't drift the same way.

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

### Source URLs and link checking

Cited URLs must be canonical (the authoritative publisher) and live.
Prefer `.gov`, then `.edu`, then the authority's own non-gov domain
(many SEAs have no `.gov`); never a third-party mirror (Cornell LII,
`*.elaws.us`, Wikipedia, vendor/aggregator copies). `doi.org` and
`justia`/`oyez` are deliberately kept as-is (permanent identifier /
endorsed for law). Run `npm run check:links` (advisory; `-- --strict`
to gate) to find broken links (4xx/5xx/network — **401/403 count as
broken, not soft-OK**) and redirecting links; update a redirecting URL
to its final non-redirecting target, which the report prints. Hosts that
block automated checks but serve the page in a browser live in
`ALLOWLISTED_HOSTS` in `scripts/check-external-links.ts` and report as
"allowlisted" rather than broken — do not change those URLs. See the
`source-link-audit` skill for the full workflow, the mirror→canonical
map, and the bulk remediation-script pattern.

## Skills

Four project skills under `.claude/skills/`:

- **`el-cert-schema`** — canonical schema reference. Triggered when
  editing files under `src/content/states/`.
- **`el-cert-terminology`** — alias map + canonical terms. Triggered
  when normalizing source text or writing copy.
- **`state-source-refresh`** — Phase 2 verification workflow. Triggered
  by phrases like "refresh `<state>`", "verify `<state>`", "update
  `<state>` data".
- **`source-link-audit`** — keeping cited source URLs canonical and
  unbroken. Triggered by "check/fix the links", running `check:links`,
  replacing a mirror with an official source, or editing
  `scripts/check-external-links.ts`.

## Source paper

Leider, C. M., Colombo, M. W., & Nerlino, E. (2021). Decentralization,
teacher quality, and the education of English learners: Do state
education agencies effectively prepare teachers of ELs? *Education
Policy Analysis Archives, 29*(100).
<https://doi.org/10.14507/epaa.29.5279>

The PDF is the seed for `verificationStatus: "baseline-2019"` records.
Tables 2–5 + Appendix A in the paper are the primary data inputs.
