/**
 * Google Forms-backed data-correction feedback.
 *
 * Setup (once):
 *
 * 1. Create a Google Form titled "projectcert — report a data issue".
 * 2. Recommended fields:
 *      - "What's incorrect?" (long-answer, required)
 *      - "Suggested correction" (long-answer, optional)
 *      - "Source supporting the correction (URL or citation)" (long-answer, optional)
 *      - "Your name and affiliation" (short-answer, optional)
 *      - "Email (if you'd like a follow-up)" (short-answer, optional)
 *      - "Page URL" (short-answer, prefilled — see below)
 *      - "State (USPS)" (short-answer, prefilled, optional)
 *      - "Page type" (short-answer, prefilled, optional)
 *      - "Verification status at time of report" (short-answer, prefilled, optional)
 * 3. In Settings → Responses, turn ON "Restrict to <your domain> users" only
 *    if your audience is institutional; otherwise leave open and rely on
 *    Google's spam filtering. To eliminate spam structurally, turn ON
 *    "Limit to 1 response" + "Collect email addresses (verified)".
 * 4. Click the "..." menu → "Get pre-filled link". Fill the four prefill
 *    fields with placeholder values like __PAGE_URL__, __STATE__,
 *    __PAGE_TYPE__, __VERIFICATION_STATUS__ and click "Get link".
 * 5. The resulting URL contains entry IDs like `entry.123456789=__PAGE_URL__`.
 *    Copy each ID into the `entries` map below.
 * 6. Set `baseUrl` to the bare form viewform URL (everything before "?").
 *
 * Until `baseUrl` is non-empty, the <ReportIssue /> component renders nothing.
 */

export interface FeedbackFormConfig {
  /** Bare form URL: `https://docs.google.com/forms/d/e/<FORM_ID>/viewform`. Empty disables the feature. */
  baseUrl: string;
  /** Map of our prop names to Google Form `entry.<id>` query keys. */
  entries: {
    pageUrl: string;
    state?: string;
    pageType?: string;
    verificationStatus?: string;
  };
}

export const FEEDBACK_FORM: FeedbackFormConfig = {
  baseUrl: "",
  entries: {
    pageUrl: "entry.000000000",
    state: "entry.000000000",
    pageType: "entry.000000000",
    verificationStatus: "entry.000000000",
  },
};

export function buildFeedbackUrl(params: {
  pageUrl: string;
  state?: string;
  pageType?: string;
  verificationStatus?: string;
}): string | null {
  if (!FEEDBACK_FORM.baseUrl) return null;
  const qs = new URLSearchParams({ usp: "pp_url" });
  qs.set(FEEDBACK_FORM.entries.pageUrl, params.pageUrl);
  if (params.state && FEEDBACK_FORM.entries.state) {
    qs.set(FEEDBACK_FORM.entries.state, params.state);
  }
  if (params.pageType && FEEDBACK_FORM.entries.pageType) {
    qs.set(FEEDBACK_FORM.entries.pageType, params.pageType);
  }
  if (params.verificationStatus && FEEDBACK_FORM.entries.verificationStatus) {
    qs.set(FEEDBACK_FORM.entries.verificationStatus, params.verificationStatus);
  }
  return `${FEEDBACK_FORM.baseUrl}?${qs.toString()}`;
}
