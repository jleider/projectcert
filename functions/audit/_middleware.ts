/**
 * Authentication gate over the review console pages (`/audit/*`).
 *
 * The console's HTML is a static asset, so without this middleware Pages
 * serves it to anyone who knows the URL — the API would still reject
 * unauthenticated writes, but the pages, the state list, and every seeded
 * source URL would be public. Protection is a property of the deployment
 * rather than of dashboard configuration.
 *
 * Scoped to `functions/audit/` on purpose. A root `functions/_middleware.ts`
 * would put a Function invocation in front of every public page request on
 * an otherwise fully static site.
 *
 * Cloudflare Access normally intercepts at the edge and redirects to its
 * login before a request reaches this code. Reaching here unauthenticated
 * means the request arrived off-app — for example on a `*.pages.dev` host
 * outside the Access application — which is exactly what should be refused.
 *
 * Fails closed: with no Access application configured, every request is
 * refused rather than served.
 */

import { authenticateAuditRequest, NOINDEX_HEADER, withGatedHeaders } from "../../src/lib/audit-auth";

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
    return auth.reason === "unconfigured"
      ? refuse("The review console is not configured for authentication.", 500)
      : refuse("Unauthorized", 401);
  }

  data.userEmail = auth.email;
  return withGatedHeaders(await next());
};
