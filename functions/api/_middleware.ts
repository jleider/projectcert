/**
 * Mandatory authentication for every /api/* route.
 *
 * Cloudflare Access gates `/audit/*` and `/api/*` at the edge, but the
 * same Functions are ALSO reachable on the `*.pages.dev` deployment
 * domain, which is not behind the Access application. Trusting the
 * `Cf-Access-Authenticated-User-Email` header alone would let a direct
 * request to `*.pages.dev/api/*` forge an identity. So we verify the
 * signed `Cf-Access-Jwt-Assertion` JWT against the team JWKS and the
 * application AUD — a request that did not pass through Access has no
 * valid signed token and is rejected.
 *
 * Local dev (`wrangler pages dev`) does not run Access, so an explicit
 * `DEV_REVIEWER_EMAIL` var bypasses verification. It must never be set
 * in production.
 */

import { createRemoteJWKSet, jwtVerify } from "jose";
import { jsonResponse } from "../../src/lib/audit-shared";

// Cache the remote JWKS across invocations (module scope survives warm
// starts). Re-create only if the team domain changes.
let jwksCache: ReturnType<typeof createRemoteJWKSet> | null = null;
let jwksDomain: string | null = null;

function getJwks(teamDomain: string): ReturnType<typeof createRemoteJWKSet> {
  if (!jwksCache || jwksDomain !== teamDomain) {
    jwksCache = createRemoteJWKSet(
      new URL(`https://${teamDomain}/cdn-cgi/access/certs`),
    );
    jwksDomain = teamDomain;
  }
  return jwksCache;
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("Cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}

export const onRequest: PagesFunction<AuditEnv, string, AuditData> = async (
  context,
) => {
  const { request, env, next, data } = context;

  // Local-dev bypass — only when explicitly configured.
  if (env.DEV_REVIEWER_EMAIL) {
    data.userEmail = env.DEV_REVIEWER_EMAIL;
    return next();
  }

  if (!env.ACCESS_TEAM_DOMAIN || !env.ACCESS_AUD) {
    return jsonResponse(
      { error: "Audit API is not configured for authentication." },
      500,
    );
  }

  const token =
    request.headers.get("Cf-Access-Jwt-Assertion") ??
    readCookie(request, "CF_Authorization");
  if (!token) return jsonResponse({ error: "Unauthorized" }, 401);

  try {
    const { payload } = await jwtVerify(
      token,
      getJwks(env.ACCESS_TEAM_DOMAIN),
      {
        issuer: `https://${env.ACCESS_TEAM_DOMAIN}`,
        audience: env.ACCESS_AUD,
      },
    );
    const email = typeof payload.email === "string" ? payload.email : null;
    if (!email) return jsonResponse({ error: "Unauthorized" }, 401);
    data.userEmail = email;
    return next();
  } catch {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }
};
