---
name: quality-gate
description: How the formatting / lint / typecheck / dead-code / test / a11y / CI gate is wired, and the conventions and footguns that keep it green. Invoke BEFORE editing eslint.config.js, .prettierrc.json / .prettierignore, knip.json, any tsconfig*.json, .github/workflows/ci.yml, .github/dependabot.yml, the build-check scripts (check-built-pages, check-discovery-surfaces, check-contrast), or the e2e suite (tests/e2e/); when adding a test, a page/route, or a map layer; or when a lint / format / typecheck / knip / e2e / npm-audit step fails or needs tuning. For the functions/ layer specifics see the audit-console skill.
---

# Quality gate

`npm run verify` is the full local gate and mirrors CI:
**check:format → lint → typecheck → validate → test → build**. CI
(`.github/workflows/ci.yml`) adds an advisory `npm audit`, a `knip`
dead-code step, and a separate **e2e-a11y** job. CI triggers on push/PR
**to `main` only** — a PR targeting a feature branch shows no checks
until the chain reaches `main`.

**Build-output gates belong in-repo, not in a marketplace action.** The
internal link check used to be a lychee CI job; lychee 0.24 changed how
`--base` and `--root-dir` compose, every root-relative link started
resolving as `<dist>/<dist>/states/ut`, and `main` went red on an
upstream release with no repo change behind it. It is now
`scripts/check-internal-links.ts`, run inside `npm run build` — so it is
deterministic, reproducible locally, and covered by its own unit tests.

## Prettier — code only

`npm run format` / `check:format`. `printWidth` is **120**. Scope is
deliberately code (`.ts`/`.astro`/`.svelte`/`.css`); `.prettierignore`
excludes canonical state-data JSON (`src/content/states/`), generated
data (`src/data/*.json`), prose `*.md` (docs/skills/README), `public/`,
and `sources/`. Do **not** widen Prettier onto data or docs — it churns
the CC-BY catalog and the load-bearing instruction files. `eslint-config-prettier`
is last in the ESLint config so the two never fight over style.

## ESLint

- Flat config in `eslint.config.js`. `--max-warnings 0`, so a `"warn"`
  rule must be fixed or deliberately tuned — never left as a warning.
- **Type-aware** rules (`recommendedTypeChecked` via the project
  service) apply to `**/*.ts` with `tests/**` excluded. The `no-unsafe-*`
  family + `restrict-template-expressions` are off (D1 results, JSON
  boundaries are deliberately untyped); `no-floating-promises`,
  `no-misused-promises`, `await-thenable`, `no-unnecessary-type-assertion`
  stay on.
- **Svelte** is linted (`eslint-plugin-svelte` + `svelte-eslint-parser`).
  `no-undef` and `no-useless-assignment` are off for `.svelte` (TS /
  svelte-check own those; both false-flag browser globals and reactive
  template usage). `svelte/require-each-key` is **on** — every `{#each}`
  needs a stable key.
- `no-explicit-any` is off for `tests/**` (fixtures read dynamic JSON
  bodies as `any`); it stays `warn` elsewhere.
- The `no-restricted-syntax` rule rejects bare-string internal `href`s on
  `<a>` — route through `@/lib/routes` helpers.

## knip — `npm run check:deadcode`

Tuned to the high-signal, low-false-positive checks: **unused files +
dependency drift** (exports/types analysis is `off` — the lib exposes a
documented helper API not all consumed internally). Entry points include
the npm-wired `check-*`/`generate-*` scripts (auto-detected) plus the
documented maintenance tools `fetch-state-seals` and
`optimize-map-topology`. `us-atlas` is in `ignoreDependencies` (the
committed topology's upstream, not imported); `tests/astro-content-stub.ts`
is ignored (used via the vitest alias, invisible to knip). Type-only
imports must be declared (`@types/geojson`, `@types/topojson-specification`).

## Typecheck — three projects

`npm run typecheck` runs `tsc` over **root**, **`functions/`**, and
**`tsconfig.tests.json`**.

- `eslint.config.js` is **excluded from the root tsconfig**: `astro check`
  runs with `checkJs` and flags the `@deprecated` JSDoc on
  typescript-eslint's `config()` helper as `ts(6387)`, which fails
  `astro check --minimumFailingSeverity hint`. ESLint still lints the
  file every run; it never ships.
- Six of seven test files are checked by the root `tsc`. The seventh,
  `tests/audit-api.integration.test.ts`, imports Workers-typed
  `functions/api/*` (incompatible with the root DOM/Node program) and has
  its own **`tsconfig.tests.json`** (Workers types + `@types/node`;
  `skipLibCheck` absorbs the duplicate `fetch`/`Request` globals). A new
  test that imports `functions/api/*` goes in that config's `include`.

## Build-time guards

`npm run build` runs, after `astro build`:

- **`check-built-pages.ts`** — every `ALL_ROUTES` route + per-state page
  produced an `index.html`, and every `ANCHORS` value resolves to an
  `id="…"` in some built page. This covers declared anchors even when no
  page happens to link to one; `check-internal-links.ts` covers the
  authored links themselves.
- **`check-internal-links.ts`** (`check:internal-links`) — every internal
  `href`/`src` in `dist/**/*.html` resolves to a real file (directory,
  extensionless, and relative forms all served the way a static host
  serves them), and every `#fragment` resolves to a matching `id=` in the
  page it targets. External URLs are out of scope — they belong to the
  weekly `external-link-check.yml` sweep. Unit-tested in
  `tests/internal-links.test.ts`, including the root-relative-resolution
  case that the lychee upgrade broke.
- **`check-discovery-surfaces.ts`** (`check:discovery`) — every non-gated
  route + per-state page is in the sitemap, and `/audit/*` is absent from
  the sitemap and `llms-full.txt` (the gated-page invariant). Missing
  routes in the curated `llms.txt` are a warning, not a failure.
- **`check-contrast.ts`** (`check:contrast`) — token pairings clear WCAG;
  now covers **dark-mode text** too. Categorical-fill adjacency stays
  light-only by design (dark palettes flip luminance and relax adjacency).

## e2e accessibility — zero violations, no rules disabled

`npm run test:e2e` runs Playwright + axe-core against the **built** site
(`astro preview`) for one page of each type, asserting zero WCAG 2.1
A/AA violations. When adding a new page type, add a row to
`tests/e2e/a11y.spec.ts`. Two invariants the suite guards:

- **Map: one focusable element per cell.** Each state path and the DC
  callout is a single SVG `<a>` (href + label + all handlers); the
  `<path>`/`<rect>` is presentational (`aria-hidden`, no `tabindex`/`role`).
  Never wrap a focusable `<path role="button" tabindex="0">` in an `<a>`
  (nested-interactive + double-fired nav). The `<svg>` is `role="group"`,
  never `role="img"` (img forbids the focusable `<a>` descendants). Enter
  activates the link natively; the keydown handler adds only Space.
- **Prose links don't rely on color.** A zero-specificity
  `:where(p, li, dd) a[href]` rule in `tokens.css` underlines in-text
  links at rest (`nav`/`footer` opted out). Cover new in-text links via
  that rule, not per-component styling.

After a change to interactive markup, verify behavior — a throwaway
Playwright spec checking focus + Enter/click navigation caught that the
map still worked after the `<a>` refactor.

## Dependencies

`npm audit --audit-level=high` gates in CI (advisory `continue-on-error`).
`npm audit fix` (transitive, non-breaking) is the first lever. Remaining
moderate/low advisories here are dev/build-only (astro check toolchain,
esbuild dev server) and only fixable via major bumps — defer rather than
force. Dependabot (`.github/dependabot.yml`) opens weekly npm + actions
updates (minor/patch grouped, majors individual).
