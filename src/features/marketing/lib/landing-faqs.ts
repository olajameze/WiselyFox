export type LandingFaq = { q: string; a: string };

export const LANDING_FAQS: LandingFaq[] = [
  {
    q: "How does the family pilot work?",
    a: "Create a free parent account, no card required. You get full access while we gather feedback from real families. Billing will be added before public launch.",
  },
  {
    q: "Can I switch from Essential to Family?",
    a: "Yes, upgrade instantly from Settings in your parent dashboard. During the pilot, plan changes do not charge your card.",
  },
  {
    q: "Is my child's data safe?",
    a: "Absolutely. Children log in with a PIN only. No ads, no public profiles, and we never sell identifiable child data.",
  },
  {
    q: "Do you support ADHD, autism, and dyslexia?",
    a: "Yes. During onboarding you tell us about your child's strengths and needs. WiselyFox applies calm mode, visual schedules, chunked lessons, dyslexia-friendly text, and ADHD-informed focus breaks automatically. Parents can adjust everything in Accessibility settings.",
  },
];

export function buildFaqJsonLd(faqs: LandingFaq[] = LANDING_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };
}
