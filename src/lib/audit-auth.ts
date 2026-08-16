/**
 * Authentication for the audit middlewares.
 *
 * **Cloudflare Access is the only credential path.** A request is
 * authenticated by the signed `Cf-Access-Jwt-Assertion`, verified against the
 * team JWKS and the application AUD; the verified email becomes the reviewer
 * identity the ledger records.
 *
 * There was a shared `AUDIT_USER`/`AUDIT_PASSWORD` login. It is gone
 * deliberately, and should not come back. Every checkmark, suggestion, and
 * link decision records *who* made it, and one credential held by several
 * people cannot answer that question: the trail would show that a review
 * happened while being unable to say who performed it, which is precisely
 * the claim the catalog exists to support. A shared login also cannot be
 * revoked for one person, and cannot be configured safely here anyway — a
 * password may not be committed, and `wrangler.toml` is the source of truth
 * for what a Pages Function can read.
 *
 * Both middlewares (`functions/audit/` for the pages, `functions/api/` for
 * the API) route through `authenticateAuditRequest`, so the two gates cannot
 * drift apart. Everything is framework-agnostic — plain `Request`/`Response`
 * and a structural env — so it runs in Workers and under Vitest alike.
 *
 * The rule that matters: **fail closed**. With Access unconfigured the
 * console is unreachable rather than open.
 */

import { createRemoteJWKSet, jwtVerify } from "jose";

/** Vars the audit middlewares read. All optional — absence fails closed. */
export interface AuditAuthEnv {
  /** Local dev only: stand in for an authenticated reviewer. Never in production. */
  DEV_REVIEWER_EMAIL?: string;
  /** Cloudflare Access team domain, e.g. "myteam.cloudflareaccess.com". */
  ACCESS_TEAM_DOMAIN?: string;
  /** Access application AUD tag the JWT must carry. */
  ACCESS_AUD?: string;
}

/** Sent on every gated response, so a leaked URL is still not indexable. */
export const NOINDEX_HEADER = "noindex, nofollow, noarchive";

/**
 * True when a Cloudflare Access application has been configured.
 *
 * Both halves are required. A half-filled pair is treated as unconfigured
 * rather than partially trusted, so a mistake fails closed instead of
 * leaving the console reachable.
 */
export function accessConfigured(env: AuditAuthEnv): boolean {
  return (
    typeof env.ACCESS_TEAM_DOMAIN === "string" &&
    env.ACCESS_TEAM_DOMAIN !== "" &&
    typeof env.ACCESS_AUD === "string" &&
    env.ACCESS_AUD !== ""
  );
}

/** Copy a response, adding the headers every gated route must carry. */
export function withGatedHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", NOINDEX_HEADER);
  headers.set("Cache-Control", "private, no-store");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// ---------------------------------------------------------------------------
// Cloudflare Access JWT verification
// ---------------------------------------------------------------------------

/**
 * The Functions are also served on `*.pages.dev`, which may sit outside the
 * Access application on the apex domain. So the
 * `Cf-Access-Authenticated-User-Email` header is never trusted on its own —
 * only the signed assertion, verified against the team JWKS and the
 * application AUD, proves a request actually passed through Access.
 */

// Cache the remote JWKS across invocations (module scope survives warm
// starts). Re-created only when the team domain changes.
let jwksCache: ReturnType<typeof createRemoteJWKSet> | null = null;
let jwksDomain: string | null = null;

function getJwks(teamDomain: string): ReturnType<typeof createRemoteJWKSet> {
  if (!jwksCache || jwksDomain !== teamDomain) {
    jwksCache = createRemoteJWKSet(new URL(`https://${teamDomain}/cdn-cgi/access/certs`));
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

/** The Access assertion, from the header Access sets or its fallback cookie. */
export function readAccessToken(request: Request): string | null {
  return request.headers.get("Cf-Access-Jwt-Assertion") ?? readCookie(request, "CF_Authorization");
}

/** Verified reviewer email from an Access assertion, or null if it fails. */
export async function verifyAccessJwt(token: string, env: AuditAuthEnv): Promise<string | null> {
  if (!accessConfigured(env)) return null;
  try {
    const { payload } = await jwtVerify(token, getJwks(env.ACCESS_TEAM_DOMAIN!), {
      issuer: `https://${env.ACCESS_TEAM_DOMAIN!}`,
      audience: env.ACCESS_AUD!,
    });
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}

/**
 * Why a request was refused.
 *
 * `unconfigured` means the deployment has no Access application — a
 * server-side mistake worth surfacing loudly (the API answers 500) rather
 * than disguising as a routine rejected login. `unauthorized` means the
 * assertion was absent or did not verify. Both refuse the request.
 */
export type AuthFailure = "unconfigured" | "unauthorized";

/** Outcome of an auth attempt: an identity, or why it was refused. */
export type AuthResult = { ok: true; email: string } | { ok: false; reason: AuthFailure };

/**
 * Authenticate a request for any gated audit surface — the console pages and
 * the API alike. The returned email is written to `verified_by`,
 * `submitted_by` and `reviewed_by`, so it must always identify a person.
 */
export async function authenticateAuditRequest(request: Request, env: AuditAuthEnv): Promise<AuthResult> {
  if (env.DEV_REVIEWER_EMAIL) return { ok: true, email: env.DEV_REVIEWER_EMAIL };

  if (!accessConfigured(env)) return { ok: false, reason: "unconfigured" };

  const token = readAccessToken(request);
  if (token) {
    const email = await verifyAccessJwt(token, env);
    if (email !== null) return { ok: true, email };
  }

  return { ok: false, reason: "unauthorized" };
}
