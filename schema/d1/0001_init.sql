-- D1 schema for the gated audit tool (/audit/*).
--
-- Apply locally:  npm run d1:migrate:local
-- Apply remote:   npm run d1:migrate:remote
--
-- "Single check suffices": one row per (state, datapoint) in
-- `verifications` — POST upserts it, overwriting who/when/hash.

CREATE TABLE IF NOT EXISTS verifications (
  usps          TEXT NOT NULL,   -- uppercase USPS, matches the state JSON
  datapoint_id  TEXT NOT NULL,   -- stable id from verification-datapoints.ts
  verified_by   TEXT NOT NULL,   -- reviewer email (from the Access JWT)
  verified_at   TEXT NOT NULL,   -- ISO 8601 UTC
  content_hash  TEXT NOT NULL,   -- value-at-time-of-verification (drift detection)
  PRIMARY KEY (usps, datapoint_id)
);
CREATE INDEX IF NOT EXISTS idx_verifications_usps ON verifications (usps);

CREATE TABLE IF NOT EXISTS suggestions (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  usps          TEXT NOT NULL,
  datapoint_id  TEXT NOT NULL,
  body          TEXT NOT NULL,
  submitted_by  TEXT NOT NULL,
  submitted_at  TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved'))
);
CREATE INDEX IF NOT EXISTS idx_suggestions_usps ON suggestions (usps);
CREATE INDEX IF NOT EXISTS idx_suggestions_status ON suggestions (status);

-- Reconciled by the weekly external-link sweep. A datapoint is
-- "needs re-verification" while it has any row here.
CREATE TABLE IF NOT EXISTS broken_links (
  usps           TEXT NOT NULL,
  datapoint_id   TEXT NOT NULL,
  url            TEXT NOT NULL,
  citation       TEXT NOT NULL,   -- raw checker citation, e.g. "CA / sources[2]"
  status         TEXT,            -- HTTP status, or null for network errors
  classification TEXT NOT NULL,   -- client-error | server-error | network-error
  detected_at    TEXT NOT NULL,
  PRIMARY KEY (usps, datapoint_id, url)
);
CREATE INDEX IF NOT EXISTS idx_broken_links_usps ON broken_links (usps);

-- Bot-blocked URLs (the link checker's 401/403/405/429 set) awaiting a
-- human decision. The weekly sweep upserts the current pending set; a
-- reviewer accepts a URL in the /audit/links console; the nightly sync
-- exports accepted rows into src/data/link-whitelist.json, which the
-- checker then trusts. Accepted rows are never auto-removed by the sweep.
CREATE TABLE IF NOT EXISTS link_reviews (
  url             TEXT PRIMARY KEY,
  status          TEXT,            -- current observed HTTP status, or null (network error)
  classification  TEXT NOT NULL,
  citations       TEXT NOT NULL,   -- JSON array of citation strings
  first_seen      TEXT NOT NULL,
  last_seen       TEXT NOT NULL,
  decision        TEXT NOT NULL DEFAULT 'pending' CHECK (decision IN ('pending', 'accepted')),
  reviewed_by     TEXT,
  reviewed_at     TEXT,
  -- The status this URL was accepted at. A later sweep keeps the row
  -- accepted only while the observed status matches; a changed response
  -- re-flags it to 'pending'.
  accepted_status TEXT,
  note            TEXT
);
CREATE INDEX IF NOT EXISTS idx_link_reviews_decision ON link_reviews (decision);

-- The single reviewer-confirmed source for each datapoint. The descriptor
-- seeds a heuristic candidate source per datapoint; a reviewer confirms which
-- one cited source the fact actually came from here, overriding the seed.
-- Exactly one row per (usps, datapoint_id) — the source of truth.
CREATE TABLE IF NOT EXISTS datapoint_sources (
  usps         TEXT NOT NULL,
  datapoint_id TEXT NOT NULL,
  url          TEXT NOT NULL,
  set_by       TEXT NOT NULL,
  set_at       TEXT NOT NULL,
  PRIMARY KEY (usps, datapoint_id)
);
CREATE INDEX IF NOT EXISTS idx_datapoint_sources_usps ON datapoint_sources (usps);
