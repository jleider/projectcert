/**
 * Mandatory authentication for every /api/* route.
 *
 * Resolved by `authenticateAuditRequest` in `src/lib/audit-auth.ts` — the
 * same gate the console pages use, so the two cannot drift apart. A signed
 * Cloudflare Access assertion is the only credential.
 *
 * The `Cf-Access-Authenticated-User-Email` header is never trusted on its
 * own: these Functions are also reachable on the `*.pages.dev` deployment
 * domain, which may not be behind the Access application, so a direct
 * request there could forge an identity. Only the verified JWT counts, and
 * the email it carries is what lands in `submitted_by` / `reviewed_by`.
 *
 * Local dev (`wrangler pages dev`) has no Access, so an explicit
 * `DEV_REVIEWER_EMAIL` var stands in. It must never be set in production.
 *
 * An unauthenticated API call gets a JSON 401 — a `fetch()` from the island
 * should surface an error rather than a redirect the browser cannot follow
 * cross-origin.
 *
 * Every response leaves through `withGatedHeaders`, the same wrapper the
 * pages middleware uses. The API is the surface that actually returns
 * reviewer identities and their timestamps, so `Cache-Control: private,
 * no-store` matters more here than on the console HTML, and the noindex
 * header has to hold for the refusals too — a 401 body is small, but its
 * URL is still a gated endpoint.
 */

import { authenticateAuditRequest, withGatedHeaders } from "../../src/lib/audit-auth";
import { jsonResponse } from "../../src/lib/audit-shared";

export const onRequest: PagesFunction<AuditEnv, string, AuditData> = async (context) => {
  const { request, env, next, data } = context;

  const auth = await authenticateAuditRequest(request, env);
  if (!auth.ok) {
    return withGatedHeaders(
      auth.reason === "unconfigured"
        ? jsonResponse({ error: "Audit API is not configured for authentication." }, 500)
        : jsonResponse({ error: "Unauthorized" }, 401),
    );
  }

  data.userEmail = auth.email;
  return withGatedHeaders(await next());
};
