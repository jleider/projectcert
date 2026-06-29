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
 * A response the checker could not confirm as live, but that is not a
 * definitive "gone" (404/410/…): an anti-bot wall (401/403/405/429), a
 * connection reset / TLS failure (network-error), or a 5xx. These need a
 * human to open them in a real browser — they go to the `/audit/links`
 * review queue rather than being silently passed or called broken.
 */
function isUnconfirmable(base: LinkClassification): boolean {
  return base === "soft-ok" || base === "server-error" || base === "network-error";
}

/**
 * Resolve the final classification, folding in the reviewer whitelist.
 * Acceptance is **status-aware**: a URL is whitelisted *at the status a
 * human accepted it for*.
 *
 * - Whitelisted, now 2xx/3xx → `ok`/`redirect` (it recovered; no longer
 *   blocked).
 * - Whitelisted, same status as accepted → `accepted` (suppressed).
 * - Whitelisted, **status changed** → `needs-review` (re-flag: the
 *   response is different, a human must look again).
 * - Not whitelisted, un-confirmable → `needs-review`.
 * - Not whitelisted, definitive 4xx-gone → `client-error` (broken; fix
 *   the URL).
 * - Otherwise pass through (`ok`/`redirect`).
 *
 * `accepted` maps each whitelisted URL to the status it was accepted at
 * (a number, or null for a network-error acceptance).
 */
export function resolveClassification(
  url: string,
  status: number | null,
  accepted: ReadonlyMap<string, number | null>,
): LinkClassification {
  const base = classify(status);
  if (accepted.has(url)) {
    if (base === "ok" || base === "redirect") return base;
    const acceptedStatus = accepted.get(url) ?? null;
    return status === acceptedStatus ? "accepted" : "needs-review";
  }
  return isUnconfirmable(base) ? "needs-review" : base;
}
