/**
 * How a state's verification is described to readers.
 *
 * Two independent things happen to every state record, and conflating them
 * overstates the catalog's claim:
 *
 *  1. **The source check.** A maintainer re-reads the state education
 *     agency's current public documents, records what changed, and archives
 *     the snapshot. This is the curated `verificationStatus` on the record.
 *  2. **Reviewer confirmation.** An authorized reviewer opens the console and
 *     confirms each displayed detail against the cited source, one at a time.
 *     This is the ledger the nightly export writes.
 *
 * A state is described as *fully verified* only when both are complete. Until
 * then the page says what is actually true: the sources were checked on a
 * given date, and N of the details have been confirmed by a reviewer. The
 * strong word is reserved for the strong claim.
 *
 * Every surface that mentions verification — the per-state badge, the
 * `/verification/` roll-up, and the citable lead paragraph — resolves through
 * this module so the wording cannot drift between them.
 */

import ledgerData from "@/data/verification-ledger.json";
import { DATAPOINT_IDS } from "@/lib/verification-datapoints";

/** One state's entry as written by `scripts/build-verification-ledger.ts`. */
interface LedgerEntry {
  verified: string[];
  verifiedAt: Record<string, string>;
  count: number;
  total: number;
  stale: string[];
}

const ledger = ledgerData as Record<string, LedgerEntry>;

/** Details a reviewer is asked to confirm, when a state has no ledger entry yet. */
const DEFAULT_TOTAL = DATAPOINT_IDS.length;

/** Reviewer sign-off progress for one state. */
export interface ReviewProgress {
  /** Details confirmed by a reviewer and still matching the published value. */
  confirmed: number;
  /** Details a reviewer is asked to confirm. Constant across states. */
  total: number;
  /** Date of the most recent confirmation, `YYYY-MM-DD`, or null if none. */
  lastConfirmed: string | null;
  /** True when every detail has been confirmed. */
  complete: boolean;
}

export function reviewProgress(usps: string): ReviewProgress {
  const entry = ledger[usps];
  if (!entry) return { confirmed: 0, total: DEFAULT_TOTAL, lastConfirmed: null, complete: false };

  const dates = Object.values(entry.verifiedAt);
  const lastConfirmed = dates.length > 0 ? dates.reduce((a, b) => (a > b ? a : b)).slice(0, 10) : null;
  return {
    confirmed: entry.count,
    total: entry.total,
    lastConfirmed,
    // Guard the degenerate case: zero of zero is not "complete".
    complete: entry.total > 0 && entry.count === entry.total,
  };
}

/** `2026-08-16` → `Aug 2026`, for badge text aimed at a reader rather than a citation. */
export function monthYear(isoDate: string): string {
  const [year, month] = isoDate.split("-");
  const names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const index = Number(month) - 1;
  const name = names[index];
  return name && year ? `${name} ${year}` : isoDate;
}

/** The structural state of a record, before it is turned into wording. */
export type VerificationStage =
  /** Sources checked and every detail confirmed by a reviewer. */
  | "fully-verified"
  /** Sources checked; reviewer confirmation incomplete. */
  | "sources-checked"
  /** A source check is underway. */
  | "check-in-progress"
  /** Still on the 2019 published baseline. */
  | "baseline";

/** Minimal shape needed from a state record — keeps this importable anywhere. */
interface StateLike {
  usps: string;
  verificationStatus: "baseline-2019" | "in-progress" | "verified-2026";
  lastVerified: string;
}

export interface VerificationDisplay {
  stage: VerificationStage;
  /** Primary badge text. */
  label: string;
  /** Longer sentence for a tooltip; states the exact date. */
  detail: string;
  /**
   * Secondary badge text for reviewer progress, or null when the primary
   * badge already accounts for it (a fully verified state).
   */
  reviewLabel: string | null;
  progress: ReviewProgress;
}

export function verificationDisplay(state: StateLike): VerificationDisplay {
  const progress = reviewProgress(state.usps);
  const checked = monthYear(state.lastVerified);

  const reviewLabel =
    progress.confirmed === 0
      ? `Not yet confirmed by a reviewer · 0 of ${progress.total} details`
      : `Reviewer-confirmed: ${progress.confirmed} of ${progress.total} details`;

  if (state.verificationStatus === "verified-2026" && progress.complete) {
    return {
      stage: "fully-verified",
      label: `Fully verified — all ${progress.total} details confirmed by a reviewer`,
      detail:
        `Checked against the state education agency's current public sources on ${state.lastVerified}, ` +
        `and every one of the ${progress.total} displayed details has since been confirmed against those sources by an authorized reviewer.`,
      reviewLabel: null,
      progress,
    };
  }

  if (state.verificationStatus === "verified-2026") {
    return {
      stage: "sources-checked",
      label: `Checked against official state sources · ${checked}`,
      detail:
        `Checked against the state education agency's current public sources on ${state.lastVerified}. ` +
        `Reviewer confirmation of the individual displayed details is ongoing.`,
      reviewLabel,
      progress,
    };
  }

  if (state.verificationStatus === "in-progress") {
    return {
      stage: "check-in-progress",
      label: "Source check in progress",
      detail:
        `A re-check against the state education agency's current public sources is underway. ` +
        `The displayed values still derive from the earlier reading of ${state.lastVerified}.`,
      reviewLabel,
      progress,
    };
  }

  return {
    stage: "baseline",
    label: "2019 published baseline — sources not yet re-checked",
    detail:
      `Values derive from the 2019 document analysis published by Leider, Colombo and Nerlino, ` +
      `and have not yet been re-checked against the agency's current public sources.`,
    reviewLabel,
    progress,
  };
}
