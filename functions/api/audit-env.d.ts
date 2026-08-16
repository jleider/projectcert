// Ambient types shared across the /api/* Pages Functions. A .d.ts file
// is not routed by Pages, so this declares no endpoint.

/**
 * Bindings + vars available to the audit Functions — the `/api/*` handlers
 * and the `/audit/*` page middleware.
 *
 * The Access vars are optional at the type level and absence fails closed:
 * with no Access application configured, both middlewares refuse every
 * request. See `src/lib/audit-auth.ts`.
 */
declare interface AuditEnv {
  /** D1 database binding. Declared in `wrangler.toml`, which is the source of truth. */
  DB: D1Database;
  /** Cloudflare Access team domain, e.g. "myteam.cloudflareaccess.com". */
  ACCESS_TEAM_DOMAIN?: string;
  /** Access application AUD tag the JWT must be issued for. */
  ACCESS_AUD?: string;
  /** Local-dev only: bypass authentication with this reviewer email. */
  DEV_REVIEWER_EMAIL?: string;
}

/** Per-request data set by the auth middleware for downstream handlers. */
declare interface AuditData extends Record<string, unknown> {
  userEmail: string;
}
