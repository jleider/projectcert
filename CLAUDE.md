# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`projectcert` is a catalog of every U.S. state education agency's teacher
certification requirements for instructing **classified English Learner
(EL)** students. The end product is a web app that lets users browse the
catalog state-by-state, backed by structured data sourced directly from
state agencies.

## Status

This repo is pre-scaffold. There is no `package.json`, no framework, no
source tree, and no tests yet. Do **not** invent build, lint, or test
commands — they don't exist. When real tooling lands, replace this section
with the actual commands.

## Intended stack

- **Language/runtime**: TypeScript on Node.
- **Shape**: Web app + structured data catalog (UI browses the catalog;
  catalog is checked into the repo).
- **Framework**: deliberately undecided. Ask before assuming Next.js,
  Remix, Vite+React, etc.
- **Data format**: deliberately undecided (JSON, MDX, SQLite, etc.). Ask
  before committing to one.

## Working principles

- **Provenance is the product.** Every requirement entry must cite its
  source: state agency URL + retrieval date. A catalog without sources is
  just opinion. Schema must make the citation a required field, not an
  afterthought.
- **Terminology.** Use "classified English Learner" / "EL" consistently
  in code, schemas, and UI copy. Do not drift into "ELL", "ESL", "EB", or
  "LEP" unless mirroring an official source's exact wording — in which
  case quote it as source text, don't normalize it away.
- **Per-state data is user-facing content.** Treat schema changes the way
  you'd treat a database migration: plan the reshape, update existing
  entries, don't silently break consumers.
- **States vary wildly.** Resist the urge to over-normalize. Some states
  have one EL endorsement, others have a tiered system, others fold EL
  into broader credentials. The schema should accommodate this rather
  than force every state into the same shape.

## What to ask before scaffolding

When the user asks to start building, clarify before writing code:

1. Framework choice (Next.js / Remix / Vite+React / other).
2. Data format (JSON files / MDX / SQLite / Postgres / other).
3. Starting point — catalog schema first, or web app shell first.
4. Whether the catalog data lives in this repo or a sibling repo.
