/**
 * Authentication helpers shared by the audit middlewares.
 *
 * Two credential paths reach the same place:
 *
 *  - **Cloudflare Access JWT** — the signed `Cf-Access-Jwt-Assertion`,
 *    verified against the team JWKS and the application AUD. This is the
 *    preferred path: it identifies the individual reviewer, which is what
 *    the ledger records.
 *  - **HTTP Basic** (`AUDIT_USER` / `AUDIT_PASSWORD`) — a shared login, for
 *    a single reviewer with no Access application. Accepted **only when
 *    Access is not configured**, so it can never downgrade per-reviewer
 *    identity, and rows it writes are prefixed `shared:` so the trail shows
 *    what signed them.
 *
 * Both middlewares (`functions/audit/` for the pages, `functions/api/` for
 * the API) route through `authenticateAuditRequest` here, so the two gates
 * cannot drift apart. Everything is framework-agnostic — plain
 * `Request`/`Response` and a structural env — so it runs in Workers and
 * under Vitest alike.
 *
 * The rule that matters: **fail closed**. If neither credential path is
 * configured, the console is unreachable rather than open. An unconfigured
 * deployment must never serve `/audit/*` to the public.
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
  /** Basic-auth username. Set it to a reviewer email so attribution stays meaningful. */
  AUDIT_USER?: string;
  /** Basic-auth password. */
  AUDIT_PASSWORD?: string;
}

/** Sent on every gated response, so a leaked URL is still not indexable. */
export const NOINDEX_HEADER = "noindex, nofollow, noarchive";

export const BASIC_REALM = "projectcert review console";

/** True when a shared username/password has been configured. */
export function basicAuthConfigured(env: AuditAuthEnv): boolean {
  return (
    typeof env.AUDIT_USER === "string" &&
    env.AUDIT_USER !== "" &&
    typeof env.AUDIT_PASSWORD === "string" &&
    env.AUDIT_PASSWORD !== ""
  );
}

/** True when a Cloudflare Access application has been configured. */
export function accessConfigured(env: AuditAuthEnv): boolean {
  return (
    typeof env.ACCESS_TEAM_DOMAIN === "string" &&
    env.ACCESS_TEAM_DOMAIN !== "" &&
    typeof env.ACCESS_AUD === "string" &&
    env.ACCESS_AUD !== ""
  );
}

/**
 * Decode an `Authorization: Basic …` header. Returns null for any other
 * scheme, malformed base64, or a value with no `:` separator.
 */
export function parseBasicAuth(header: string | null | undefined): { user: string; password: string } | null {
  if (!header) return null;
  const match = /^Basic\s+(\S+)$/i.exec(header.trim());
  if (!match?.[1]) return null;

  let decoded: string;
  try {
    decoded = atob(match[1]);
  } catch {
    return null;
  }

  const sep = decoded.indexOf(":");
  if (sep === -1) return null;
  return { user: decoded.slice(0, sep), password: decoded.slice(sep + 1) };
}

/**
 * Compare two strings without leaking their common prefix length through
 * timing. Not a substitute for a real MAC, but the right default when the
 * value being compared is a shared secret.
 */
export function constantTimeEquals(a: string, b: string): boolean {
  // Compare over a fixed width so length alone does not short-circuit.
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/**
 * Validate an Authorization header against the configured shared login.
 * Returns the authenticated identity, or null when unconfigured or wrong.
 */
export function verifyBasicAuth(header: string | null | undefined, env: AuditAuthEnv): string | null {
  if (!basicAuthConfigured(env)) return null;
  const creds = parseBasicAuth(header);
  if (!creds) return null;

  // Evaluate both comparisons before returning so a correct username with a
  // wrong password costs the same as a wrong username.
  const userOk = constantTimeEquals(creds.user, env.AUDIT_USER!);
  const passOk = constantTimeEquals(creds.password, env.AUDIT_PASSWORD!);
  return userOk && passOk ? creds.user : null;
}

/**
 * Prefix marking a row as written by the shared login rather than a person.
 *
 * The ledger's purpose is attributable review: `verified_by`,
 * `submitted_by`, `reviewed_by` are meant to name a reviewer. A shared
 * login cannot, so it must not look like one — an un-prefixed username in
 * `verified_by` is indistinguishable from an individual's, and a reader
 * auditing the trail later has no way to tell that a row was signed by a
 * credential several people hold.
 */
export const SHARED_IDENTITY_PREFIX = "shared:";

/** Tag an identity as coming from the shared credential. */
export function sharedIdentity(user: string): string {
  return `${SHARED_IDENTITY_PREFIX}${user}`;
}

/** True if a recorded identity was written by the shared login. */
export function isSharedIdentity(identity: string): boolean {
  return identity.startsWith(SHARED_IDENTITY_PREFIX);
}

/** 401 that makes the browser show a username/password prompt. */
export function basicAuthChallenge(body = "Authentication required."): Response {
  return new Response(body, {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${BASIC_REALM}", charset="UTF-8"`,
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": NOINDEX_HEADER,
    },
  });
}

/** Copy a response, adding the headers every gated route must carry. */
export function withGatedHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", NOINDEX_HEADER);
  // A shared reviewer login means shared caches must not retain the body.
  headers.set("Cache-Control", "private, no-store");
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

// ---------------------------------------------------------------------------
// Cloudflare Access JWT verification
// ---------------------------------------------------------------------------

/**
 * The Functions are also served on `*.pages.dev`, which sits outside the
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
 * `unconfigured` means the deployment has no credential path at all — a
 * server-side mistake worth surfacing loudly (the API answers 500) rather
 * than disguising as a routine rejected login. `unauthorized` means
 * credentials were absent or wrong. Both refuse the request.
 */
export type AuthFailure = "unconfigured" | "unauthorized";

/** Outcome of an auth attempt: an identity, or why it was refused. */
export type AuthResult = { ok: true; email: string } | { ok: false; reason: AuthFailure };

/**
 * Authenticate a request for any gated audit surface — the console pages and
 * the API alike.
 *
 * Order: local-dev bypass, then the shared username/password, then an Access
 * assertion. When nothing is configured the request is refused: an
 * unconfigured deployment serves nothing rather than everything.
 */
export async function authenticateAuditRequest(request: Request, env: AuditAuthEnv): Promise<AuthResult> {
  if (env.DEV_REVIEWER_EMAIL) return { ok: true, email: env.DEV_REVIEWER_EMAIL };

  const hasBasic = basicAuthConfigured(env);
  const hasAccess = accessConfigured(env);
  if (!hasBasic && !hasAccess) return { ok: false, reason: "unconfigured" };

  // Access wins outright — the shared login is not merely lower priority,
  // it is not accepted at all while Access is configured. Trying basic
  // first (the original order) meant any request carrying an
  // `Authorization: Basic` header bypassed per-reviewer identity and wrote
  // the shared username into `verified_by`, silently collapsing the audit
  // trail with nothing in the data to show it had happened.
  if (hasAccess) {
    const token = readAccessToken(request);
    if (token) {
      const email = await verifyAccessJwt(token, env);
      if (email !== null) return { ok: true, email };
    }
    return { ok: false, reason: "unauthorized" };
  }

  const basicUser = verifyBasicAuth(request.headers.get("Authorization"), env);
  if (basicUser !== null) return { ok: true, email: sharedIdentity(basicUser) };

  return { ok: false, reason: "unauthorized" };
}
