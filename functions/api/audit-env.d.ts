// Ambient types shared across the /api/* Pages Functions. A .d.ts file
// is not routed by Pages, so this declares no endpoint.

/**
 * Bindings + vars available to the audit Functions — the `/api/*` handlers
 * and the `/audit/*` page middleware.
 *
 * Every credential var is optional at the type level and absence fails
 * closed: with neither the shared login nor the Access application
 * configured, both middlewares refuse every request. See
 * `src/lib/audit-auth.ts`.
 */
declare interface AuditEnv {
  /** D1 database binding (configured in the Pages dashboard). */
  DB: D1Database;
  /** Cloudflare Access team domain, e.g. "myteam.cloudflareaccess.com". */
  ACCESS_TEAM_DOMAIN?: string;
  /** Access application AUD tag the JWT must be issued for. */
  ACCESS_AUD?: string;
  /** Shared reviewer login — username. Use a reviewer email so attribution stays meaningful. */
  AUDIT_USER?: string;
  /** Shared reviewer login — password. */
  AUDIT_PASSWORD?: string;
  /** Local-dev only: bypass authentication with this reviewer email. */
  DEV_REVIEWER_EMAIL?: string;
}

/** Per-request data set by the auth middleware for downstream handlers. */
declare interface AuditData extends Record<string, unknown> {
  userEmail: string;
}
