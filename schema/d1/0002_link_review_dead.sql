-- Let a reviewer record that a URL is genuinely gone.
--
-- The queue only offered "accept as live". A reviewer who opened a
-- bot-blocked URL and found the page actually withdrawn had no way to say
-- so: accepting would have asserted the opposite and written the URL into
-- the checker's whitelist, permanently suppressing a real breakage. The
-- honest options are three, not two — live, gone, or not yet looked at.
--
-- A 'dead' row is a durable human judgement, not an observation: it stays
-- until the citation is fixed, and the weekly sweep must not reset it to
-- pending the way it re-flags an accepted URL whose status changed. Only
-- 'accepted' rows reach the whitelist, so a dead URL keeps being reported
-- by the checker, which is correct — it is still broken.
--
-- SQLite cannot alter a CHECK constraint, so the table is rebuilt. No
-- BEGIN/COMMIT: D1 rejects explicit SQL transactions outright and fails
-- the whole file.

CREATE TABLE link_reviews_new (
  url             TEXT PRIMARY KEY,
  status          TEXT,
  classification  TEXT NOT NULL,
  citations       TEXT NOT NULL,
  first_seen      TEXT NOT NULL,
  last_seen       TEXT NOT NULL,
  decision        TEXT NOT NULL DEFAULT 'pending' CHECK (decision IN ('pending', 'accepted', 'dead')),
  reviewed_by     TEXT,
  reviewed_at     TEXT,
  accepted_status TEXT,
  note            TEXT
);

INSERT INTO link_reviews_new (url, status, classification, citations, first_seen, last_seen,
                              decision, reviewed_by, reviewed_at, accepted_status, note)
  SELECT url, status, classification, citations, first_seen, last_seen,
         decision, reviewed_by, reviewed_at, accepted_status, note
    FROM link_reviews;

DROP TABLE link_reviews;

ALTER TABLE link_reviews_new RENAME TO link_reviews;

CREATE INDEX IF NOT EXISTS idx_link_reviews_decision ON link_reviews (decision);
