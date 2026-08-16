/**
 * Mandatory authentication for every /api/* route.
 *
 * Two credential paths are accepted, both resolved by
 * `authenticateAuditRequest` in `src/lib/audit-auth.ts` — the same gate the
 * console pages use, so the two cannot drift apart:
 *
 *  - the shared `AUDIT_USER` / `AUDIT_PASSWORD` login, which the browser
 *    replays on same-origin API calls once a reviewer has signed in to
 *    `/audit/*`; and
 *  - a signed Cloudflare Access assertion.
 *
 * The `Cf-Access-Authenticated-User-Email` header is never trusted on its
 * own: these Functions are also reachable on the `*.pages.dev` deployment
 * domain, which is not behind the Access application, so a direct request
 * there could forge an identity. Only the verified JWT counts.
 *
 * Local dev (`wrangler pages dev`) runs neither, so an explicit
 * `DEV_REVIEWER_EMAIL` var bypasses both. It must never be set in production.
 *
 * Unlike the pages, an unauthenticated API call gets a JSON 401 rather than a
 * Basic challenge — a `fetch()` from the island should surface an error, not
 * trigger the browser's credential dialog.
 */

import { authenticateAuditRequest } from "../../src/lib/audit-auth";
import { jsonResponse } from "../../src/lib/audit-shared";

export const onRequest: PagesFunction<AuditEnv, string, AuditData> = async (context) => {
  const { request, env, next, data } = context;

  const auth = await authenticateAuditRequest(request, env);
  if (!auth.ok) {
    return auth.reason === "unconfigured"
      ? jsonResponse({ error: "Audit API is not configured for authentication." }, 500)
      : jsonResponse({ error: "Unauthorized" }, 401);
  }

  data.userEmail = auth.email;
  return next();
};
