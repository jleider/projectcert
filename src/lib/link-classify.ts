/**
 * Pure link-status classification for the external-link checker.
 *
 * Extracted so the bot-block / whitelist logic can be unit-tested
 * without the script's network and filesystem side effects.
 */

export type LinkClassification =
  | "ok"
  | "redirect"
  | "soft-ok"
  | "accepted"
  | "needs-review"
  | "client-error"
  | "server-error"
  | "network-error";

// Statuses treated as "the page exists but the host rejected the bot".
// 401/403/429 are common from anti-bot SEAs; 405 means the method was
// rejected (we will already have retried as GET). The 3xx entries are
// redundant with the redirect branch but harmless.
const SOFT_OK = new Set([301, 302, 307, 308, 401, 403, 405, 429]);

/** Raw classification from an HTTP status (or null for a network error). */
export function classify(status: number | null): LinkClassification {
  if (status === null) return "network-error";
  if (status >= 200 && status < 300) return "ok";
  if (status >= 300 && status < 400) return "redirect";
  if (SOFT_OK.has(status)) return "soft-ok";
  if (status >= 400 && status < 500) return "client-error";
  if (status >= 500) return "server-error";
  return "network-error";
}

/**
 * Fold the human whitelist into the raw classification:
 * - A whitelisted URL is trusted as live — any non-2xx result becomes
 *   `accepted`; a 2xx result passes through as `ok`/`redirect`.
 * - A non-whitelisted bot-block (`soft-ok`) becomes `needs-review` (a
 *   human must accept it).
 * - Everything else passes through unchanged.
 */
export function applyWhitelist(
  url: string,
  base: LinkClassification,
  whitelist: ReadonlySet<string>,
): LinkClassification {
  if (whitelist.has(url)) {
    return base === "ok" || base === "redirect" ? base : "accepted";
  }
  return base === "soft-ok" ? "needs-review" : base;
}
