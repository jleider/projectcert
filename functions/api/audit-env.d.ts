// Ambient types shared across the /api/* Pages Functions. A .d.ts file
// is not routed by Pages, so this declares no endpoint.

/** Bindings + vars available to the audit API functions. */
declare interface AuditEnv {
  /** D1 database binding (configured in the Pages dashboard). */
  DB: D1Database;
  /** Cloudflare Access team domain, e.g. "myteam.cloudflareaccess.com". */
  ACCESS_TEAM_DOMAIN?: string;
  /** Access application AUD tag the JWT must be issued for. */
  ACCESS_AUD?: string;
  /** Local-dev only: bypass JWT verification with this reviewer email. */
  DEV_REVIEWER_EMAIL?: string;
}

/** Per-request data set by the auth middleware for downstream handlers. */
declare interface AuditData extends Record<string, unknown> {
  userEmail: string;
}
