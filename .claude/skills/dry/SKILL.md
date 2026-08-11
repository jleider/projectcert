---
name: dry
description: Preventing and removing repetitive code in the projectcert repo. Use when asked to deduplicate, find repeated patterns, refactor for reuse, apply DRY, reduce duplication, or extract shared logic across pages, components, islands, Pages Functions, and scripts. Also invocable as a slash command to scan and refactor.
---

# DRY Code Analysis & Refactoring

Identify and eliminate knowledge duplication by extracting shared logic into reusable abstractions.
Less code to maintain means higher quality — fix a bug once, not in multiple places.

> "Every piece of knowledge must have a single, unambiguous, authoritative representation within a
> system."
> — Andy Hunt & Dave Thomas, *The Pragmatic Programmer*

`CLAUDE.md` → **Conventions and DRY rules** is the normative list for this repo; this skill is the
method for finding and fixing violations of it, plus the judgment calls about when *not* to abstract.

## Search before you write (mandatory)

The cheapest deduplication is the one you never create. **Before writing any new helper, URL string,
component, type, or palette value, search for an existing one.** Most "missing" pieces already exist
under `src/lib/`, `src/data/`, or `src/config/` — re-implementing them is the most common DRY
violation here.

1. **Lexical search** with Grep for likely names (`stateUrl`, `ROUTES`, `breadcrumb`, `legendColor`,
   `normalizeUsps`, `breakdownFor`).
2. **Check the shared homes** that already index reusable code:
   - `src/config/site.ts` — `SITE_URL`, `SITE_NAME`. The literal `"https://projectcert.org"` appears
     **only** here.
   - `src/lib/routes.ts` — `ROUTES`, `ANCHORS`, `absoluteRoute`, `sameAnchor`, `withAnchor`,
     `ALL_ROUTES`, and the `LinkUrl` brand. Every internal link comes from here.
   - `src/lib/state-types.ts` — **Svelte-safe** types/constants/helpers: `LAYERS`/`Layer`,
     `CREDENTIAL_TYPES`/`CredentialType`, `ChoroplethDatum`, `stateUrl`, `absoluteStateUrl`,
     `elPercentHistoryUrl`, `absoluteElPercentHistoryUrl`, `auditStateUrl`. No `astro:content` import.
   - `src/lib/state-data.ts` — **server-only** runtime helpers that need `getCollection("states")`:
     `getAllStates`, `getChoroplethData`, `breakdownFor`.
   - `src/lib/jsonld.ts` — `breadcrumbList`, `breadcrumbWithHome`. Never hand-build a
     `BreadcrumbList itemListElement` array.
   - `src/lib/legends.ts` — `LEGENDS` (per-`Layer`), `legendColor(layer, key)`, `NO_DATA_COLOR`.
     Colours resolve to CSS custom properties from `src/styles/tokens.css`; a hex literal in a
     component is a violation.
   - `src/lib/state-summary.ts` — `leadParagraph`, `metaDescription`, `pageTitle`.
   - `src/lib/audit-shared.ts` — code shared between `functions/` and `src/`: `jsonResponse`,
     `normalizeUsps`, `isDatapointId`, `normalizeSourceUrl`, `extractTitle`.
   - `src/lib/verification-datapoints.ts`, `src/lib/link-classify.ts` — the datapoint descriptor and
     link classification, both consumed by pages, functions, *and* scripts.
   - `src/data/` — `states-meta.ts` (`STATES`, `FIPS_TO_USPS`, `USPS_TO_NAME`), `bins.ts`,
     `terminology.ts`.
   - `src/components/` — the reusable render pieces: `StateLink.astro`, `StateSeal.astro`,
     `ExternalLink.astro`, `JsonLd.astro`, `SourceList.astro`, `VerificationBadge.astro`,
     `CitationBlock.astro`, `ChoroplethLegend.astro`.

If it genuinely doesn't exist, add it once in the right shared location (see the boundaries table
below) — not inline in a page.

## Slash command workflow (`/dry`)

### Step 1: Identify the target

- **IDE selection**: if the user has code selected, start there
- **Current file**: if no selection, analyze the open file
- **User-specified scope**: if the user names files, a directory, or a feature, use those

### Step 2: Find duplication

1. **Extract the key patterns** from the target — function bodies, repeated markup, URL/string
   construction, palette values, type shapes, magic constants.
2. **Search** across `src/`, `functions/`, `scripts/`, and `tests/` with Grep and Glob.
3. **Compare candidates** to distinguish genuine knowledge duplication from coincidental similarity.

### Step 3: Classify each instance

| Classification | Description | Action |
|---|---|---|
| **Knowledge duplication** | Same rule / derivation repeated (same summary sentence, same filter, same URL shape) | Refactor — extract into `src/lib/` |
| **Structural similarity** | Similar shape, different domain meaning | Leave alone — not a DRY violation |
| **Configuration duplication** | Same magic value repeated (a colour, a bin threshold, a URL) | Move to `src/config/`, `src/data/`, or `tokens.css` |
| **Type duplication** | Same type shape declared twice | Derive it once — usually a `const` tuple + `(typeof X)[number]` |
| **Markup duplication** | The same block of Astro/Svelte markup pasted between pages | Extract a component into `src/components/` |
| **Content data** | 51 per-state records that look alike | **Not** duplication — it's data. See below. |

### Step 4: Refactor

Apply the right technique (below), respecting the boundaries table. A page should read as composition
of helpers and components, not as a place where logic lives.

### Step 5: Verify

`npm run verify` chains `check:format` → `lint` → `typecheck` → `validate` → `test` → `build`. It does
**not** include knip, which CI runs as its own step — so a DRY refactor needs
`npm run check:deadcode` explicitly. See `quality-gate` for how the gate is wired.

1. `npm run lint` — ESLint, `--max-warnings 0`. The `no-restricted-syntax` rule catches a bare-string
   `href` reintroduced during a refactor.
2. `npm run typecheck` — `astro sync && tsc --noEmit` (strict + `noUncheckedIndexedAccess`) plus the
   `functions/` and tests tsconfigs. This is what makes a renamed route fail loudly instead of
   silently breaking a link.
3. **`npm run check:deadcode` (knip)** — the step that finishes a DRY refactor, and a blocking CI step.
   Replacing three call sites with one helper leaves the old export orphaned; knip is what turns "I
   extracted it" into "I extracted it *and* removed what it replaced."
4. `npm run validate` — `astro check` + contrast check + state-integrity check.
5. `npm run test` — Vitest.
6. `npm run build` — the integrity/llms scripts plus the built-page and discovery-surface checks.

## Core principles

### 1. Knowledge duplication, not code duplication

DRY is about **knowledge** — the same rule, decision, or intent in multiple places. Two blocks that
look identical are NOT a violation if they encode different concepts that happen to share an
implementation today.

```ts
// NOT a DRY violation — same number, different knowledge
const MAX_HISTORY_YEARS_AHEAD = 10;  // schema guard against 9999-style typos
const COMPARE_MAX_STATES = 10;       // how many states the compare tool accepts

// IS a DRY violation — same knowledge in two files
// src/pages/states/[usps].astro
const href = `/states/${s.usps.toLowerCase()}/`;
// src/components/Compare.svelte
const href = `/states/${s.usps.toLowerCase()}/`;
// FIX: stateUrl(s.usps) from @/lib/state-types — one place to change when the route moves.
```

### 2. Context-dependent abstraction threshold

- **Identical logic** (same knowledge, same code): abstract at **2 instances** — a clear violation.
- **Structurally similar** (same pattern, different details): wait for **3 instances** (Rule of
  Three) before abstracting — avoids premature generalization.
- **When in doubt**: prefer duplication over the wrong abstraction.

> "Duplication is far cheaper than the wrong abstraction." — Sandi Metz

### 3. Single Source of Truth (SSOT)

Every value and rule has one canonical home: the canonical origin in `src/config/site.ts`, internal
paths in `src/lib/routes.ts`, per-state metadata in `src/data/states-meta.ts`, colours in
`src/styles/tokens.css` surfaced through `src/lib/legends.ts`, prose derivations in
`src/lib/state-summary.ts`. A value that two files need is read from its home, never re-typed.

The `LinkUrl` brand is SSOT with teeth: it exists so a renamed page fails a typecheck instead of
shipping a dead link.

### 4. YAGNI guards against over-abstraction

Don't add props, generics, or config knobs for hypothetical future needs. Abstract only when
duplication actually exists. A component whose prop list has grown a boolean per caller has become
the wrong abstraction — split it.

### 5. Tests should be DAMP, not DRY

Test code prioritizes readability over deduplication. **DRY the infrastructure** —
`tests/astro-content-stub.ts` is the shared fixture, and builders/helpers belong next to it — but
keep test bodies **Descriptive And Meaningful**. One self-documenting assertion per case beats a
table-driven loop that hides which state broke.

```ts
// BAD: DRY test — a failure tells you "case 3" and nothing else
for (const [status, expected] of cases) it(`${status}`, () => expect(isVerified(status)).toBe(expected));

// GOOD: DAMP test — the failing test names the rule it broke
it("treats verified-2026 as verified", () => expect(isVerified("verified-2026")).toBe(true));
it("treats baseline-2019 as unverified", () => expect(isVerified("baseline-2019")).toBe(false));
```

### 6. Per-state records are data, not duplication

`src/content/states/*.json` holds 51 records with the same shape. That is the **point** — the shape
is enforced once by the Zod schema in `src/content.config.ts`, and each file is one state's facts.
Never "DRY" them by hoisting shared values into a base record; adding or updating a state must stay a
one-file edit.

The real dedup opportunity in the data is **sources**: a document cited by many states belongs in a
cross-state shared directory under `sources/` (`wida/`, `elp-assessments/`,
`seal-of-biliteracy/`, …) rather than re-retrieved per state.

## Boundaries — where shared code may live

| Location | Importable by |
|---|---|
| `src/lib/state-types.ts`, `src/lib/routes.ts`, `src/data/*` | everything, including Svelte islands |
| `src/lib/state-data.ts` (and anything importing `astro:content`) | `.astro` pages/components and scripts only — **never** a Svelte island |
| `src/lib/audit-shared.ts` | `src/` and the Cloudflare `functions/` runtime |
| `src/components/*.astro` | `.astro` pages/components |
| `src/components/*.svelte` | hydrated islands (props must be serializable) |
| `functions/api/*` | the Pages Functions runtime only — no Astro/Node built-ins |
| `scripts/*.ts` | build/maintenance only (tsx/Node); may import from `src/` |

**Rules:**

- If a Svelte component needs a type or pure helper, import from `state-types`, not `state-data` —
  importing `state-data` breaks the build with "astro:content is server-only". When you extract a
  helper, put it on the correct side of that line *first*; discovering it later means moving it again.
- Logic needed by both a page and an API function goes in `audit-shared.ts`, not copied into
  `functions/`.
- A helper a script needs is still a `src/lib/` helper — `scripts/` already imports from
  `src/lib/verification-datapoints`, `src/lib/routes`, `src/lib/link-classify`, and
  `src/config/site`. Reach for that before another local copy.

## Techniques

### Use the helper instead of building the string

The single highest-value refactor here.

```astro
<!-- BEFORE -->
<a href={`/states/${s.usps.toLowerCase()}/`}>{s.name}</a>
<a href="/map/">Map</a>

<!-- AFTER -->
<StateLink usps={s.usps}>{s.name}</StateLink>
<a href={ROUTES.map}>Map</a>
```

### Extract a helper into `src/lib/`

When the same derivation appears twice, name it once.

```ts
// BEFORE: the same "offered but add-on only" filter inline in two pages
// AFTER: src/lib/state-data.ts
export function breakdownFor(states: State[], type: "bilingual" | "eld"): CredentialBreakdown { … }
```

### Extract a component

When two pages share a block of markup that means the same thing, it becomes a component in
`src/components/` — that is where `StateLink`, `SourceList`, and `VerificationBadge` came from.

### Derive the type, don't restate it

```ts
// BEFORE: the list and the union drift apart
const CREDENTIAL_TYPES = ["bilingual", "eld", "sei"];
type CredentialType = "bilingual" | "eld" | "sei";

// AFTER: one source, the type derived from it
export const CREDENTIAL_TYPES = ["bilingual", "eld", "sei"] as const;
export type CredentialType = (typeof CREDENTIAL_TYPES)[number];
```

### Parameterize instead of copying

Collapse near-identical functions by passing the varying piece.

```ts
// BEFORE: one loader per layer
const elPercentData = states.map(s => ({ usps: s.usps, value: s.elPercent }));
const bilingualData = states.map(s => ({ usps: s.usps, value: s.bilingual }));

// AFTER: one function keyed by Layer
const dataFor = (states: State[], layer: Layer): ChoroplethDatum[] => …
```

### Extract a constant / token

A repeated colour, threshold, or label belongs in `tokens.css` (surfaced via `legends.ts`),
`src/data/bins.ts`, or `src/data/terminology.ts` — read from there, never re-typed.

## Detecting duplication patterns

### Obvious

- A bare-string internal `href`, or a template literal building `/states/...` by hand.
- A hex colour or `var(--…)` name written into a component instead of coming from `legendColor` /
  `tokens.css`.
- `"https://projectcert.org"` anywhere but `src/config/site.ts`.
- A hand-built JSON-LD `BreadcrumbList` / `itemListElement` array.
- The same `node:fs` state-file read/parse block re-implemented in another `scripts/*.ts` (a real
  hotspot — most scripts hand-roll it; prefer extending a shared helper for new ones).

### Subtle

- A page computing a summary sentence, page title, or meta description inline when
  `state-summary.ts` already derives it — the two then drift and the divergence is customer-visible.
- The same credential filter / count expressed once in a page and once in a Svelte island, so the map
  and the table disagree.
- A USPS→name or FIPS→USPS lookup rebuilt from `getCollection` instead of using
  `USPS_TO_NAME`/`FIPS_TO_USPS`.
- A `functions/api/*` handler re-implementing validation or normalization that `audit-shared.ts`
  already exports.
- A `Record<Layer, …>` written out longhand in two files, so adding a layer requires two edits and
  one gets missed.

## Anti-patterns

### The wrong abstraction

A "shared" component or helper that is mostly a `switch` over which caller invoked it shares almost
nothing. When an abstraction fills with conditionals and per-caller flags, **inline it back**, delete
the dead branches, and keep the distinct cases separate.

### Bypassing the abstraction with a cast

```ts
// BAD: satisfies the type, reintroduces the bug the brand prevents
const href = `/states/${usps.toLowerCase()}/extra/` as LinkUrl;

// GOOD: add or extend the helper in @/lib/state-types
export function extraUrl(usps: string): LinkUrl { … }
```

A hand-concatenated string cast to `LinkUrl` is worse than no abstraction at all — it silences the
one check that would have caught a rename.

### Coupling unrelated modules through DRY

Don't route two unrelated features through one helper because they look similar today. The audit
console and the public atlas share `audit-shared.ts` deliberately and narrowly; widening it into a
general "utils" grab-bag couples a reviewer-only tool to public page rendering.

### DRYing coincidentally similar code

```ts
// BAD: these look the same but mean different things
const isCurrent = (s: string) => s.startsWith("verified");   // verification status
const isCurrentUrl = (s: string) => s.startsWith("verified"); // coincidence — will diverge
```

Keep them separate — they encode different rules.

### Over-parameterized functions

```ts
// BAD: so many parameters the abstraction is harder to use than the duplication
const renderPanel = (
  state: State,
  credential: CredentialType,
  showSources: boolean,
  showHistory: boolean,
  compact: boolean,
  headingLevel: 2 | 3 | 4,
  onMissing?: () => string,
) => …

// GOOD: capture the shared piece; let callers compose the rest
const credentialSummary = (state: State, credential: CredentialType) => …
```

### Ignoring existing abstractions

Writing a new URL builder, breadcrumb array, legend palette, or USPS lookup when `routes.ts` /
`state-types.ts` / `jsonld.ts` / `legends.ts` / `states-meta.ts` already provides one is the most
common violation here. Grep `src/lib/` and `src/data/` first.
