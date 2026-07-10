/** Current consent policy version — bump when Terms/Privacy/child-data copy changes materially. */
export const CONSENT_VERSION = "1.0";

export const CONSENT_COPY = {
  childData: {
    title: "Parent consent for child learning data",
    body:
      "I am the parent or legal guardian. I consent to WiselyFox processing this child's learning data (progress, assessments, accessibility settings, and usage needed to run the service). I can export or delete data anytime from Settings, or contact support to withdraw consent.",
  },
  marketing: {
    label: "Send me product tips and pilot updates (optional)",
    hint: "You can change this anytime in Settings. We never market to children.",
  },
} as const;
