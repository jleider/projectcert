# projectcert

An atlas of every U.S. state education agency's (SEA) teacher
certification requirements for instructing classified **English
Learner (EL)** students. The site pairs structured per-state data
with a web UI: an interactive map, a side-by-side comparison
tool, per-credential topical reports, and a detail page for each of
the 50 states + D.C.

Live site: **[projectcert.org](https://projectcert.org)**

Seed data: Leider, Colombo & Nerlino (2021), *Education Policy
Analysis Archives* 29(100).
[doi.org/10.14507/epaa.29.5279](https://doi.org/10.14507/epaa.29.5279).

## Who this is for

- **Researchers and policy analysts** comparing EL credential
  requirements across jurisdictions.
- **Teacher educators** mapping their program against a target
  state's endorsement.
- **Journalists** looking for a citable summary of one state's
  rules.
- **SEAs and certification officers** auditing how their own
  requirements are catalogued.

If you only need to *read* the data, the live site is the right
entry point — every state page is linkable and citable, and the
interactive map at `/map/` is the fastest way to scan the landscape.
This repo is for contributors, re-users of the underlying dataset,
and anyone wanting to run or modify the site locally.

## What's in this repo

- **`src/content/states/<usps>.json`** — one structured record per
  state, validated by a Zod schema in `src/content.config.ts`.
  Every fact-bearing field traces to a source URL captured under
  `sources/`.
- **`src/`** — the Astro + Svelte + Tailwind site that renders
  those records.
- **`sources/<USPS>/<date>/`** — per-state source snapshots
  (PDFs, HTML captures, and a `changes-from-baseline.md` audit
  note) underpinning every `verified-2026` record.
- **`sources/_consolidated/<date>/done-and-todo.md`** — the
  single entry point for understanding the state of play after
  each audit pass.
- **`public/llms.txt`** + **`public/llms-full.txt`** — machine-
  readable summaries of the catalog for AI search engines and
  RAG pipelines (per the [llms.txt](https://llmstxt.org/)
  convention).

## Status

All 51 records (50 states + D.C.) carry
`verificationStatus: verified-2026`, with each fact cited to a
current SEA document. The catalog is re-audited periodically; the
most recent audit pass is summarized in
`sources/_consolidated/<date>/done-and-todo.md`.

## How to cite

If you use data from this site, please cite **both**:

1. The seed paper, which made the catalog possible:
   Leider, C. M., Colombo, M. W., & Nerlino, E. (2021).
   Decentralization, teacher quality, and the education of
   English learners. *EPAA, 29*(100).
   <https://doi.org/10.14507/epaa.29.5279>
2. This catalog — the specific page you took the fact from
   (`projectcert.org/states/<usps>/` or the relevant topical
   page), so a reader can verify the recoding and reach the
   underlying SEA source linked there.

When quoting an SEA document verbatim, or when the claim is one a
reader will want to verify against the primary source directly,
cite the SEA document as well — every page lists its sources.

The full citation block lives at
[`/about#how-to-cite`](https://projectcert.org/about#how-to-cite).

## Embedding the map

The interactive map is embeddable on any page:

```html
<iframe
  src="https://projectcert.org/embed/map/?layer=elPercent"
  style="width:100%;height:640px;border:0"
  title="projectcert — classified EL teacher certification atlas">
</iframe>
```

Valid `layer` values: `elPercent`, `bilingual`, `eld`, `sei`,
`standards`, `seal`, `elp`. The embed honors the host page's
`prefers-color-scheme`.

## Running locally

Requires Node 20+.

```bash
npm install
npm run dev          # http://localhost:4321
```

Common scripts:

| Command                  | What it does                                                    |
| ------------------------ | --------------------------------------------------------------- |
| `npm run dev`            | Astro dev server                                                |
| `npm run build`          | Production build to `dist/` (runs integrity + llms-full first)  |
| `npm run preview`        | Serve the built site locally                                    |
| `npm run validate`       | `astro check` + WCAG contrast check + state-integrity check     |
| `npm run lint`           | ESLint over `.ts`/`.astro`/`.js`                                |
| `npm run typecheck`      | `tsc --noEmit` under strict mode                                |
| `npm run test`           | Vitest schema + helper unit tests                               |
| `npm run test:e2e`       | Playwright + axe-core a11y tests                                |
| `npm run check:integrity`| 51 records, USPS uniqueness, provenance trail                   |
| `npm run check:contrast` | WCAG 2.1 SC 1.4.11 contrast audit of map palettes               |
| `npm run check:links`    | Advisory check of external SEA URLs                             |

## Contributing

Spotted a stale or wrong fact on your state? Two ways to flag it:

- **Open an issue** with the state, the field, the current value
  on the site, what it should be, and the SEA source URL that
  supports the correction.
- **Open a pull request** editing the single
  `src/content/states/<usps>.json` file. Run `npm run validate`
  before pushing. The Zod schema will reject retro-dated freshness
  (`elPercentAsOf > lastVerified`) and unsorted history rows.

Substantive contributions (new history rows, credential coding
changes) must include the cited source URL in `history[].sourceUrls`
or `sources[]`. A catalog without provenance is opinion; this one
isn't trying to be that.

Larger or workflow-oriented contributions: see the developer
guide in [CLAUDE.md](CLAUDE.md). It documents the schema,
helper conventions, audit-artifact layout, and the parallel
state-refresh workflow.

## License

Two licenses cover this repository:

- **Site code** — [MIT](LICENSE). Use, copy, modify, merge,
  publish, distribute, sublicense, and sell freely; the only
  requirement is preserving the copyright/permission notice in
  redistributed copies.
- **Catalog data** (the per-state JSON records and the `sources/`
  audit trail produced by this project) — [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
  Free to reuse, including commercially and with modification;
  the only requirement is attribution. The required attribution
  is the citation block above (the seed paper plus this catalog).

The seed paper is © its authors; SEA source documents linked from
the catalog remain © their respective agencies and are not
redistributed under either license above — they are referenced by
URL with retrieval timestamps.
