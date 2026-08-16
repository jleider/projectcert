/**
 * Pure helpers shared by the Pages Functions under `functions/api/`.
 *
 * Kept free of `@cloudflare/workers-types` and Node APIs so it is usable
 * from the Workers runtime and unit-testable under Vitest. `Response`,
 * `URL`, etc. are platform globals available in both.
 */

import { DATAPOINT_IDS } from "./verification-datapoints";

/** JSON response with the right content type. */
export function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

const USPS_RE = /^[A-Z]{2}$/;

/** Uppercase + validate a USPS code, or null if malformed. */
export function normalizeUsps(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const u = raw.toUpperCase();
  return USPS_RE.test(u) ? u : null;
}

const DATAPOINT_ID_SET = new Set(DATAPOINT_IDS);

/** True if `id` is one of the fixed datapoint ids. */
export function isDatapointId(id: unknown): id is string {
  return typeof id === "string" && DATAPOINT_ID_SET.has(id);
}

/**
 * Parse the link checker's `--json` report, tolerating a leading npm
 * banner.
 *
 * `npm run check:links -- --json > links.json` writes npm's own two
 * "> projectcert@0.1.0 check:links" lines to stdout ahead of the JSON, so
 * the file a workflow captures is not valid JSON. A bare `JSON.parse` threw
 * on it, and because the sync step runs under `continue-on-error` the weekly
 * sweep reported success while writing nothing to D1 — broken links never
 * reached the audit store. The workflow now uses `npm run --silent`; this
 * stays as the belt to that braces, because the failure mode was silent and
 * cost a year of sweeps.
 *
 * Throws with the offending prefix when there is no JSON object at all —
 * loudly, so a real breakage is never mistaken for link drift.
 */
export function parseCheckerReport(raw: string): { results: unknown[] } {
  const start = raw.indexOf("{");
  if (start < 0) {
    throw new Error(`No JSON object in checker report (got: ${JSON.stringify(raw.slice(0, 120))})`);
  }
  return JSON.parse(raw.slice(start)) as { results: unknown[] };
}

/**
 * Normalize a reviewer-typed source URL, or return null if it isn't a
 * fully-formed web URL. Prepends `https://` when the scheme is omitted (so
 * `www.example.com` works), then requires an http(s) URL whose host is a real
 * dotted domain with an alphabetic TLD — so a bare word like `dsfsda`
 * (which `new URL` would otherwise accept as `https://dsfsda`) is rejected.
 * Shared by the client (immediate feedback) and the server (authoritative).
 */
export function normalizeSourceUrl(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const s = raw.trim();
  if (s.length === 0) return null;
  const withScheme = /^https?:\/\//i.test(s) ? s : `https://${s}`;
  let u: URL;
  try {
    u = new URL(withScheme);
  } catch {
    return null;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return null;
  // Require a dotted domain ending in an alphabetic TLD (≥2 chars).
  if (!/\.[a-z]{2,}$/i.test(u.hostname)) return null;
  return u.toString();
}

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

/**
 * Extract a human title from fetched HTML — prefer `og:title`, fall back to
 * `<title>`. Returns null if neither is present. Pure (regex-based, no DOM)
 * so it runs in the Workers runtime and is unit-testable.
 */
export function extractTitle(html: string): string | null {
  const og = html.match(/<meta[^>]+(?:property|name)=["']og:title["'][^>]*\bcontent=["']([^"']+)["']/i);
  const raw = og?.[1] ?? html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
  if (!raw) return null;
  const text = raw
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&[a-z]+;|&#39;/gi, (m) => ENTITIES[m.toLowerCase()] ?? m)
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 0 ? text : null;
}

/**
 * Reviewer-facing label for an observed link status.
 *
 * A null status means the request never completed — a connection reset or a
 * TLS failure. The three audit islands each used to fall back to the row's
 * `classification`, which printed the raw `needs-review` / `broken` enum into
 * copy a reviewer reads (CLAUDE.md: no schema identifiers in user-facing
 * text). Keep this the single formatter for the value.
 */
export function linkStatusLabel(status: number | null | undefined): string {
  return status === null || status === undefined ? "No response from host" : `HTTP ${status}`;
}
