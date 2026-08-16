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
- Static deploy to **Cloudflare Pages**. The one non-static piece is the
  gated reviewer console (`/audit/*`): **Pages Functions** + **D1** +
  **Cloudflare Access**, alongside the static site. See "The audit /
  review console" below.

## Commands

- `npm run dev` — Astro dev server.
- `npm run build` — `check-state-integrity` + `generate-llms-full` →
  `astro check` → `astro build` → `check-built-pages` (route + anchor
  presence) → `check-discovery-surfaces` (sitemap completeness + `/audit`
  exclusion) → `check-internal-links` (every internal `href`/`src` and
  `#fragment` in `dist/` resolves).
- `npm run validate` — `astro check` (svelte/Zod) + contrast check
  (light + dark text) + state-integrity check (51 records, USPS
  uniqueness, provenance trail).
- `npm run lint` — ESLint over `.ts`/`.astro`/`.js`/`.svelte`, with
  type-aware rules on `.ts` (tests excluded). Runs `--max-warnings 0`,
  so a "warn"-level rule must be fixed or deliberately tuned, never left.
- `npm run format` / `npm run check:format` — Prettier write / check.
  Code only: state-data JSON, prose `*.md`, generated data, `public/`,
  and `sources/` are deliberately ignored (see `.prettierignore`).
- `npm run check:deadcode` — knip (dead files + dependency drift).
- `npm run typecheck` — `tsc --noEmit` under strict mode +
  `noUncheckedIndexedAccess` (root project + `functions/`).
- `npm run test` — Vitest (schema + helper unit tests).
- `npm run test:e2e` — Playwright + axe-core a11y; asserts zero WCAG 2.1
  A/AA violations against the built site (no rules disabled).
- `npm run verify` — full local gate: check:format → lint → typecheck →
  validate → test → build.

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

### Svelte reactivity: a value read inside a function isn't tracked

Svelte (legacy `$:` and template expressions) tracks the identifiers it
sees **syntactically** in the statement, not the variables a *called
function* reads internally. So `$: n = items.filter(isCurrent).length`
or `{#each shownFor(d) as x}` will **not** re-run when the state that
`isCurrent` / `shownFor` reads (a `verifications` / `attributions` map,
etc.) is reassigned — the label updates but the list silently goes
stale. This bit the audit islands three times (progress-bar count, the
shown source, the candidate list) and is invisible to unit tests.

Two rules:

- **Make the reactive state appear in the expression** — inline the
  predicate, or pass the state in as an argument so Svelte sees it:
  `$: n = items.filter((d) => map[d.id] === d.hash).length`, or
  `{#each shownFor(d, attributions) as x}`.
- **Reassign maps, never mutate** (`map = { ...map, [k]: v }`) so the
  dependency actually fires.

`npm run e2e:audit` exists partly to catch this class of regression in
the audit console, since `astro check` and Vitest will not.

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
- **CI** (`.github/workflows/ci.yml`): on push + PR **to `main`**, runs
  format → `npm audit` (advisory) → lint → typecheck → dead-code →
  validate → test → build, then an e2e-a11y job. The internal link check
  is part of `build`, not a separate job — it was a lychee action until
  lychee 0.24 changed how `--base` and `--root-dir` compose and turned
  the gate red on an upstream release rather than a repo change. Keep
  build-output gates in-repo so they run under `npm run verify` too.
  Concurrency cancels in-flight runs on the same ref. The trigger
  is `main`-only, so a PR targeting a feature branch (not `main`) shows
  no checks until the chain reaches `main` — broaden the `branches`
  filter if you want CI on a feature-to-feature PR.
- **Tooling footgun — `eslint.config.js` is excluded from `tsconfig`.**
  `astro check` runs with `checkJs`, so it type-checks the flat config
  and flags the `@deprecated` JSDoc on typescript-eslint's `config()`
  helper as `ts(6387)`, which fails `astro check --minimumFailingSeverity
  hint`. The file is excluded in `tsconfig.json` (ESLint lints it every
  run regardless; it never ships). Keep type-aware ESLint scoped to
  `**/*.ts` with `tests/**` excluded — the fixtures lean on `any`
  (`no-explicit-any` is off for `tests/**`).
- **Type-checking tests.** Six of the seven test files are checked by
  the root `tsc --noEmit`. The seventh,
  `tests/audit-api.integration.test.ts`, imports Workers-typed
  `functions/api/*`, which cannot coexist with the root DOM/Node program
  — so it has its own `tsconfig.tests.json` (Workers types + `@types/node`,
  `skipLibCheck` absorbing the duplicate `fetch`/`Request` globals).
  `npm run typecheck` runs all three projects: root, `functions/`, and
  `tsconfig.tests.json`.
- **Stay on TypeScript 6 — do not bump to 7.** TypeScript 7 is the
  native Go compiler and ships **no programmatic JS API**. Both
  typescript-eslint and `astro check` require that API, so `typescript@7`
  hard-fails lint, `validate`, and `build`:
  `"typescript-eslint does not support TS 7.0."` and `"The TypeScript
  module loaded (found 7.0.2) does not expose the programmatic API that
  astro check relies on."` This is not a wait-for-a-patch problem —
  typescript-eslint throws on **any** TS major >= 7, blocked upstream on
  ESLint lacking async parser support (typescript-eslint#10940), and
  `astro check` tracks it separately (withastro/roadmap#1321). A
  side-by-side install does work (alias `typescript` to
  `@typescript/typescript6` for the API, `@typescript/native` to
  `typescript@7` for the `tsc` binary) and was tried on this repo, but it
  was deliberately reverted: it buys a faster compiler on a codebase
  where typecheck already runs in seconds, at the cost of two type
  engines that can disagree — `tsc --noEmit` checking with 7.x while
  `astro check` and type-aware ESLint check with 6.x. Revisit when both
  tools support 7 natively and one TypeScript suffices.
- **`compressHTML: true` in `astro.config.ts` is load-bearing — do not
  delete it.** Astro 7 changed the default to `'jsx'`, which drops
  whitespace-only text nodes the way React does. On these HTML templates
  that fused rendered prose ("51 verified against 2026 sources" became
  "51verified against 2026 sources"), ran sentences together, and joined
  the trailing URL of the **APA citation block** into the next author's
  name — corrupting a block readers are told to copy and paste. The pin
  restores Astro 6 behavior. If you ever reconsider it, verify by
  diffing *rendered text* of the built pages against the previous build,
  not by reading the templates; the templates look fine either way.
- **`astro preview` auto-daemonizes under an AI coding agent.** Astro 7
  calls `am-i-vibing`, and when it detects an agent driving the terminal
  (Claude Code sets `CLAUDECODE`) it forks the server into the
  background and the foreground process exits at once. Playwright starts
  the preview via `webServer` and treats its child exiting as failure,
  so `npm run test:e2e` aborts with "Process from config.webServer
  exited early" having run **zero** tests — a green-looking terminal
  that tested nothing. `playwright.config.ts` sets
  `ASTRO_PREVIEW_BACKGROUND` to opt out of the detection and keep the
  process in the foreground; the name reads backwards ("the background
  decision is explicit", not "run in the background"). CI never trips
  this. If a future tool shells out to `astro preview` and appears to
  exit instantly, this is why; `astro preview status` / `stop` manage a
  stray daemon.
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

### The audit / review console (`/audit/*`)

A gated reviewer tool lives at `/audit/` (overview), `/audit/<usps>`
(per-state datapoint checklist), and `/audit/links` (bot-blocked link
review). It is the only part of the deployment that is **not** static:
it is backed by Cloudflare **Pages Functions** (`functions/api/*`), a
**D1** database (`schema/d1/`), and **Cloudflare Access** (email-allowlist
gating, configured in the dashboard — setup in `docs/audit-setup.md`).
The public site stays static; the console is a separate layer.

Load-bearing rules:

- **Both surfaces are gated in code, and the gate fails closed.**
  `functions/audit/_middleware.ts` protects the console *pages*;
  `functions/api/_middleware.ts` protects the API. Both resolve through
  `authenticateAuditRequest` in `src/lib/audit-auth.ts`, which accepts a
  shared `AUDIT_USER`/`AUDIT_PASSWORD` login or a verified Cloudflare
  Access JWT, and refuses everything when neither is configured. The
  pages middleware is scoped to `functions/audit/` deliberately — a root
  `functions/_middleware.ts` would put a Function invocation in front of
  every request to the otherwise static public site. Do not "simplify"
  the two middlewares into one at the root, and do not make an
  unconfigured deployment permissive: until this landed, the console's
  HTML was a plain static asset that any Access misconfiguration would
  have published.
- **The console must stay uncrawlable, in four independent layers.**
  Authentication (a crawler gets 401), `X-Robots-Tag: noindex, nofollow,
  noarchive` on every gated response, the `noindex` meta tag in
  `AuditLayout.astro`, and `Disallow: /audit/` in `public/robots.txt`.
  The robots footgun: a crawler matching a named `User-agent` group obeys
  that group *alone* and ignores `User-agent: *`, so the disallow is
  repeated in every group and `check-discovery-surfaces` fails the build
  if a group omits it.
- **The checkbox ledger is separate from `verificationStatus`.** A
  reviewer confirming all datapoints does **not** promote a state to
  `verified-2026` — that requires the archived-snapshot audit trail the
  integrity check enforces. The nightly sync Action writes only
  `src/data/verification-ledger.json` (a public "datapoints reviewed"
  badge) and `src/data/link-whitelist.json` — never a state JSON or the
  enum. Do not wire auto-promotion.
- **`src/lib/verification-datapoints.ts` is the single source of truth**
  for what a reviewer checks: a fixed 32-entry skeleton, same id set for
  every state (constant denominator). Keep it Svelte-safe *and*
  Workers-safe — no `astro:content`, no Node APIs, a local structural
  `StateData` type. Adding a datapoint = add an id to `DATAPOINT_IDS`
  plus a builder line; the id is the D1 key, so renaming orphans rows
  (the snapshot test fails loud). Labels are user-facing
  academic-register prose, never schema identifiers.
- **Per-datapoint sources are seeded, then human-confirmed.** Each
  datapoint carries `sourceUrls` so a reviewer can open the source a fact
  came from. The schema has no per-field provenance, so the descriptor
  seeds these heuristically (`SECTION_SOURCE_KEYWORDS` matched against the
  state's flat `sources[]`, with Seal/ELP/grouped using their own URLs);
  the seed is approximate. A reviewer confirms the one real source in the
  console (single-select — one source of truth per datapoint) — stored in
  the `datapoint_sources` table — which overrides the seed; checking the
  datapoint also flips its source to confirmed. Never treat the heuristic
  as provenance.
- **The link checker has a status-aware human-review loop.** Anything
  the checker cannot confirm — a bot-block (401/403/405/429), a
  connection reset / TLS failure, or a 5xx — classifies as `needs-review`
  and lands in the D1 `link_reviews` queue (weekly sweep). A reviewer
  accepts each at `/audit/links`; acceptance records the **status it was
  accepted at** (`accepted_status`). The nightly sync exports accepted
  rows to `src/data/link-whitelist.json` as `{url: {status, ...}}`, and
  the checker treats a URL as `accepted` only while its status is
  unchanged — a changed response code **re-flags** it to `needs-review`.
  Only a definitive 4xx-gone (404/410/…) is `broken`, feeding datapoint
  re-verification via `broken_links`. The classification core is the
  pure, tested `src/lib/link-classify.ts` (`resolveClassification`).

TypeScript / test footguns (each cost real time once):

- **`functions/` has its own `tsconfig.json`** with
  `types: ["@cloudflare/workers-types"]` and, critically,
  `"exclude": []`. Extending the root config otherwise inherits its
  `exclude: [...,"functions"]`, which excludes the functions' own
  directory and makes `tsc` silently check *nothing*. `npm run
  typecheck` runs both the root project and `functions/tsconfig.json`.
- **Functions use relative imports** (`../../src/lib/...`), never the
  `@/` alias — the alias does not resolve in Cloudflare's function
  bundler.
- **A test that imports `functions/api/*` must be excluded from the root
  `tsconfig`** (see `tests/audit-api.integration.test.ts`). Importing
  Workers-typed modules into the root DOM/Node program pulls them in via
  import resolution — past `exclude` — and fails the typecheck. Such a
  test is instead type-checked by its own `tsconfig.tests.json` (Workers
  types + `@types/node`), wired into `npm run typecheck`; it still runs
  under Vitest and is linted.
- **Integration tests use Node's built-in `node:sqlite`** as a
  D1-compatible shim over the real `schema/d1/0001_init.sql` (no new
  dependency). `node:sqlite` binds `?1..?N` positionally, matching D1.
- **Local dev:** `npm run dev` does not run the Functions, so the
  console renders read-only. Use `npm run dev:pages` (wrangler) with a
  `DEV_REVIEWER_EMAIL` var to exercise the API; that var bypasses the
  mandatory Access-JWT verification in `functions/api/_middleware.ts`
  and must never be set in production.
- **End-to-end the gated UI with `npm run e2e:audit`**
  (`tests/e2e/audit-console.e2e.mjs`): boots `wrangler pages dev` + a
  fresh local D1 + the auth bypass and drives a headless browser. Run it
  after changing the audit islands — it catches the Svelte
  dependency-tracking traps (a value read inside a function isn't tracked
  by the template) that have regressed the progress bar and the shown
  source. Not in `npm run verify` (needs wrangler + chromium). See the
  `audit-console` skill.

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

**Exception — gated pages.** The review console (`/audit/*`) is
access-gated and `noindex,nofollow`; it must be *excluded* from all
three surfaces, not added. The `sitemap()` filter in `astro.config.ts`
drops `/audit/`; do not list it in `public/llms.txt`; do not emit it
from `generate-llms-full.ts`. Verify `/audit/` does not appear in
`dist/sitemap-0.xml` after build.

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

### Map interactivity is one focusable element per cell

Each interactive map cell (every state path and the DC callout) is a
single SVG `<a>` that owns the href, `aria-label`, and every pointer /
keyboard handler; the `<path>`/`<rect>` inside is presentational
(`aria-hidden="true"`, no `tabindex`/`role`). Do **not** reintroduce the
old pattern of an `<a>` wrapping a `<path tabindex="0" role="button">` —
two nested focusable controls trips axe's `nested-interactive` and
double-fires navigation. The `<svg>` carries `role="group"` (a labelled
group of controls), never `role="img"`: `img` declares a single static
graphic and forbids the focusable `<a>` descendants. Enter activates the
link natively (fires the click handler); the keydown handler adds only
Space. The e2e a11y suite (`tests/e2e/a11y.spec.ts`) guards this.

Links inside running prose must not rely on color alone (axe
`link-in-text-block`): a zero-specificity `:where(p, li, dd) a[href]`
rule in `tokens.css` underlines them at rest, with `nav`/`footer` opted
back out. Keep new in-text links covered by that rule rather than
restyling per-component.

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
to gate) to find broken and redirecting links; update a redirecting URL
to its final non-redirecting target, which the report prints. The
classification model (in `src/lib/link-classify.ts`):

- **Only a definitive 4xx-gone (404/410/…) is `broken`** — fix the URL;
  broken links feed datapoint re-verification.
- **Everything the checker cannot confirm — an anti-bot wall
  (401/403/405/429), a connection reset / TLS failure, or a 5xx — is
  `needs-review`, not broken.** There is no host-level allowlist;
  acceptance is **per-URL, reviewer-managed, and status-aware**. A human
  opens each in a real browser and accepts it in the `/audit/links`
  console, which records it in `src/data/link-whitelist.json` *at the
  status it was accepted for*. A later sweep keeps it `accepted` only
  while that status holds; if the response code changes it re-flags as
  `needs-review`, and if it recovers to 2xx it shows `ok`. Never
  hand-edit the whitelist to mask a 404 — that needs a URL fix. See the
  `audit-console` skill for the console/whitelist flow.

See the `source-link-audit` skill for the canonical-URL workflow, the
mirror→canonical map, and the bulk remediation-script pattern.

## Skills

Seven project skills under `.claude/skills/`:

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
- **`audit-console`** — the gated `/audit/*` reviewer tool (Pages
  Functions + D1 + Cloudflare Access), the `verification-datapoints`
  descriptor, and the link-review/whitelist flow. Triggered when editing
  `functions/`, `src/lib/verification-datapoints.ts`, the audit pages,
  `schema/d1/`, or the audit sync scripts/workflows.
- **`quality-gate`** — how the formatting / lint / typecheck / dead-code
  / test / a11y / CI gate is wired, plus its conventions and footguns.
  Triggered when editing `eslint.config.js`, `.prettierrc.json`,
  `knip.json`, any `tsconfig*.json`, the CI workflow, the build-check
  scripts, or `tests/e2e/`; when adding a test/page/map-layer; or when a
  gate step fails or needs tuning.
- **`dry`** — the shared homes under `src/lib/`, `src/data/`, and
  `src/config/` to search before writing a helper, the server-only vs
  Svelte-safe boundary, and the deduplication techniques and
  anti-patterns that apply here. Triggered by "deduplicate", "refactor
  for reuse", "reduce duplication", or invoked as `/dry` to scan.

## Source paper

Leider, C. M., Colombo, M. W., & Nerlino, E. (2021). Decentralization,
teacher quality, and the education of English learners: Do state
education agencies effectively prepare teachers of ELs? *Education
Policy Analysis Archives, 29*(100).
<https://doi.org/10.14507/epaa.29.5279>

The PDF is the seed for `verificationStatus: "baseline-2019"` records.
Tables 2–5 + Appendix A in the paper are the primary data inputs.
