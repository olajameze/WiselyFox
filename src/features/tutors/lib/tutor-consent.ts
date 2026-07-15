/** Tutor marketplace consent policy version — bump when tutor terms/fee copy changes. */
export const TUTOR_CONSENT_VERSION = "1.0";

export const TUTOR_FEE_BPS = 500; // 5%

export const TUTOR_FEE_COPY = {
  title: "Platform fee disclosure",
  body:
    "Joining WiselyFox as a tutor is free. WiselyFox deducts a 5% platform fee only when you receive payment through the marketplace, from the full session price, or from the deposit if you take deposits. Stripe card processing fees are additional.",
  example: "Example: a £40 session means you receive £38.00; £2.00 is the WiselyFox platform fee.",
} as const;

export const TUTOR_TERMS_COPY = {
  title: "Tutor marketplace terms",
  body:
    "I confirm I am at least 18 years old. I am an independent tutor, not a WiselyFox employee. Joining is free; fees apply only on payments received. I will not contact children directly outside parent-approved channels. I understand my profile requires admin verification before publishing.",
} as const;
