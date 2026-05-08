# projectcert

An atlas of every U.S. state education agency's teacher certification
requirements for instructing classified English Learner (EL) students,
with an interactive map, topical credential reports, side-by-side
comparison, and a page for every state.

Seed data: Leider, Colombo & Nerlino (2021), *Education Policy Analysis
Archives* 29(100). [DOI link](https://doi.org/10.14507/epaa.29.5279).

## Status

Phase 1 (machinery) complete. The site builds and runs locally with
the 2019 baseline as seed data. **The site is gated behind a
pre-launch banner until all 51 states are re-verified against current
SEA sources.** See `/verification` in the running app to track
progress, and the `state-source-refresh` skill for the per-state
workflow.

## Stack

- Astro 5 + TypeScript (strict)
- Svelte 5 island for the interactive choropleth
- d3-geo + topojson-client + us-atlas
- Tailwind CSS 3 + custom design tokens
- Zod for content collection schemas
- Vitest for schema tests

## Commands

```bash
npm install          # one-time
npm run seed         # one-shot: regenerate 51 state JSON files from the paper
npm run dev          # local dev at http://localhost:4321
npm run build        # static site to dist/
npm run preview      # preview the built site
npm run validate     # astro check + WCAG contrast check on tokens
npm run test         # vitest schema tests (104 tests over 51 states)
npm run check:contrast   # standalone WCAG contrast check
```

## Data

State data lives at `src/content/states/<usps>.json` — one file per
state + DC. Schema in `src/content/config.ts`. Editing one state is a
one-file edit; run `npm run validate` to verify.

## Skills

Three project-scoped skills live under `.claude/skills/`:

- `el-cert-schema` — schema reference
- `el-cert-terminology` — canonical terms + state-local aliases
- `state-source-refresh` — per-state Phase 2 verification workflow

## License

TBD.
