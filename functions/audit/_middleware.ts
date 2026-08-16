/**
 * Username/password gate over the review console pages (`/audit/*`).
 *
 * The console's HTML is a static asset, so without this middleware Pages
 * serves it to anyone who knows the URL — the API would still reject
 * unauthenticated writes, but the pages, the state list, and every seeded
 * source URL would be public. Protection used to depend entirely on a
 * Cloudflare Access application configured in the dashboard; this makes it a
 * property of the deployment instead.
 *
 * Scoped to `functions/audit/` on purpose. A root `functions/_middleware.ts`
 * would put a Function invocation in front of every public page request on
 * an otherwise fully static site.
 *
 * Fails closed: with neither `AUDIT_USER`/`AUDIT_PASSWORD` nor the Access
 * vars configured, every request is refused.
 */

import {
  authenticateAuditRequest,
  basicAuthChallenge,
  basicAuthConfigured,
  NOINDEX_HEADER,
  withGatedHeaders,
} from "../../src/lib/audit-auth";

/** Refusal that never renders the console, and is never indexable. */
function refuse(body: string, status: number): Response {
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": NOINDEX_HEADER,
    },
  });
}

export const onRequest: PagesFunction<AuditEnv, string, AuditData> = async (context) => {
  const { request, env, next, data } = context;

  const auth = await authenticateAuditRequest(request, env);
  if (!auth.ok) {
    if (auth.reason === "unconfigured") {
      return refuse("The review console is not configured for authentication.", 500);
    }
    // Prompt for the shared login when there is one. With only Access
    // configured, Access itself intercepts before the request reaches a
    // Function — reaching here means the request came in off-app (e.g. via
    // *.pages.dev), which is exactly what should be refused outright.
    return basicAuthConfigured(env) ? basicAuthChallenge() : refuse("Unauthorized", 401);
  }

  data.userEmail = auth.email;
  return withGatedHeaders(await next());
};
