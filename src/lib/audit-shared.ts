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
