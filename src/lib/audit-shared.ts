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

/** True for a well-formed http(s) URL. */
export function isHttpUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
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
