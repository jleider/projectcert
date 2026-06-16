---
name: source-link-audit
description: How to keep cited source URLs in src/content/states/*.json canonical and unbroken. Invoke when asked to check, fix, canonicalize, or de-duplicate source links; when "run the url/link check tool" or "fix broken/redirecting URLs"; when replacing a mirror or vendor URL with an official source; when editing scripts/check-external-links.ts; or when a verification turns up a 404/redirect on a sources[].url, history[].sourceUrls[], sealOfBiliteracy.sourceUrl, elpAssessment.sourceUrl, or elPercentHistory[].source.url. For the per-URL bot-blocked-link review/whitelist flow, see the audit-console skill.
---

# Source-link audit and canonicalization

Every fact-bearing field traces to a URL (see `el-cert-schema` for which
fields). This skill is about keeping those URLs **canonical** (pointing at
the authoritative publisher) and **live** (resolving, not redirecting or
404ing). The Zod schema only enforces that a `url` is well-formed — it does
not check that the link works or that the host is authoritative.

## Domain canonicality — preference order

When choosing or replacing a source URL, prefer in this order:

1. **`.gov`** — the agency / legislature / secretary-of-state site.
2. **`.edu`** — only when the `.edu` *is* the authority (e.g.
   `wida.wisc.edu` is WIDA's institutional home; there is no `.gov` WIDA).
3. **Official non-gov TLD of the authority itself** — many SEAs use
   `.org`/`.com`/`.net`/`.us` as their real domain and have no `.gov`
   (e.g. `gadoe.org`, `gapsc.com`, `fldoe.org`, `mdek12.org`, `isbe.net`,
   `doe.mass.edu`, `marylandpublicschools.org`, `goteachky.com`,
   `cde.state.co.us`, `ospi.k12.wa.us`, `wvde.us`, `leg.state.nv.us`,
   `aws.state.ak.us`, `reports.oah.state.nc.us`, `flrules.org`,
   `publications.tnsosfiles.com`). These are canonical — keep them.
4. **Third-party mirrors / aggregators — never.** Replace them.

### Mirrors and non-authoritative hosts to replace

These reproduce content owned by someone else; swap for the canonical
publisher:

- `law.cornell.edu` (Cornell LII) → the state's own administrative code
  (e.g. `ilga.gov`, `rules.mt.gov`, `legis.iowa.gov`,
  `apps.azsos.gov`/`azsbe.az.gov`, `nj.gov/education/code`).
- `txrules.elaws.us`, `mdrules.elaws.us` → the state's official code host
  (TEA / `regs.maryland.gov`).
- `en.wikipedia.org`, `ednc.org`, `asbsd.org`, `eslteacheredu.org`, a
  `drive.google.com` copy, a university course page, a raw CMS backend
  (`*.azurewebsites.net`) → the controlling authority's own page.
- `theglobalseal.com` is a **private** credential, not a state seal.
  Most states run their own State Seal of Biliteracy (statute / SEA page);
  do not cite Global Seal as the source for a *state* seal.
- `sealofbiliteracy.org` is an advocacy tracker (Californians Together):
  acceptable as a **secondary** cite, but prefer the state statute / SEA
  seal page where one exists.

### Deliberate exceptions — do NOT "canonicalize" these

- **`doi.org/10.14507/epaa.29.5279`** (the seed paper, cited by every
  state). A DOI is a permanent canonical identifier; it *will* redirect to
  the journal article — that is correct. Never replace it with the
  publisher URL.
- **`justia` / `oyez`** for federal cases and codified statutes — endorsed
  by the provenance rules; keep.

## The link checker — `npm run check:links`

`scripts/check-external-links.ts` walks every URL across all url-bearing
fields, fetches each (HEAD, GET fallback), follows redirects, and buckets
the result. Flags:

- (default) advisory — exits 0 even with broken links.
- `-- --strict` — exits non-zero if any link is broken (used in the
  non-blocking weekly sweep, not the build gate).
- `-- --json` — machine-readable output.

Classifications (the shared logic lives in `src/lib/link-classify.ts`):

- **ok** (2xx).
- **client-error / server-error / network-error** = broken.
- **needs-review** — a bot-block status (401/403/405/429): the host
  rejects automated requests but may serve the page fine in a browser, so
  it cannot be confirmed *or* called broken. The checker surfaces these;
  do **not** "fix" a `needs-review` URL on the assumption it is dead.
  Acceptance is reviewer-managed — see "Bot-blocked URLs" below.
- **accepted** — a `needs-review` URL a reviewer has accepted as live (it
  is in `src/data/link-whitelist.json`). No longer flagged.
- **redirected** — the URL works but lands somewhere else; the report
  prints `cited → final`. Update the record to the **final
  non-redirecting** URL (the checker hands it to you). Exception: a `.gov`
  whose redirect target is a CDN/blob backend (e.g. Idaho `adminrules` →
  Azure blob) — keep the stable `.gov` entry, not the backend.

### Bot-blocked URLs (`needs-review` → `accepted`)

There is **no host-level allowlist in the script.** Acceptance is
**per-URL and reviewer-managed** through the gated `/audit/links` console
(the `audit-console` skill): a reviewer opens each `needs-review` URL,
confirms it loads in a browser, and accepts it; the nightly sync exports
accepted URLs to `src/data/link-whitelist.json`, which the checker then
treats as `accepted`. Do not hand-edit the whitelist to mask a genuine
404 — a moved page needs its URL fixed (canonicalize), not whitelisted.

### Reading the results

- A PDF that loads returns binary the summarizer can't parse — that is a
  **200/working** link, not a failure. Judge by HTTP status, not by
  whether a fetch tool could render the body.
- Anti-bot 403 on a correct page ≠ a 404 on a moved page. A 403 usually
  means "exists, blocked"; a 404 means "gone, find the new URL".

## Fixing at scale — the remediation-script pattern

For more than a handful of swaps, write a one-off script (see
`scripts/apply-canonical-url-fixes.ts` and `-2.ts` for the template)
rather than many hand edits:

- Match the **full quoted JSON value** (`"<old>"` → `"<new>"`) so a URL
  that is a prefix of a longer URL is never partially rewritten.
- Count occurrences and **warn loudly if an `old` URL isn't found**, so a
  stale map entry surfaces instead of silently no-op-ing.
- Replace longest paths before their prefixes.

After applying: re-run `npm run check:links`, then `npm run validate`
(schema + integrity must still pass).

## Provenance discipline

- **If you cannot find/verify a replacement URL, drop the row** rather than
  cite an unconfident link (CLAUDE.md's rule). A missing row beats a
  fabricated-looking one.
- Verify a replacement actually resolves before writing it. "Search says
  it exists" is weaker than a fetched 200; note the confidence when a host
  blocks direct verification.
- `retrievedBy: projectcert-2026` rows must have a matching
  `sources/<USPS>/<retrievedAt>/` snapshot (the integrity check enforces
  this). Don't add a new dated `projectcert-2026` row for a URL fix when an
  existing row already covers the current domain — relabel/replace in place
  instead. For a superseded baseline (`leider-2021`) domain, update the URL
  to the current canonical and note the old domain in the label.

## Related: the audit/review console

This offline checker and the gated `/audit/*` console share one model:
classification in `src/lib/link-classify.ts`, a broken-link sync
(`sync-broken-links` → datapoint re-verification), and the
reviewer-managed bot-blocked-link whitelist (`sync-link-reviews` +
`build-link-whitelist` → `src/data/link-whitelist.json`). Bot-block
acceptance happens **only** in the console — this script has no separate
allowlist to keep in sync. See the `audit-console` skill.

## Worktree caveat

`check:integrity` reads `sources/<USPS>/<date>/` from the filesystem, and
some snapshot dirs are **untracked** locally. A fresh `git worktree`
checkout won't have them, so integrity will falsely fail there; `rsync` the
`sources/` tree from the main checkout before trusting the result. The
checker scripts need `node_modules` — symlink it from the main checkout in
a fresh worktree.
