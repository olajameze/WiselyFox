export type LandingFaq = { q: string; a: string };

export const LANDING_FAQS: LandingFaq[] = [
  {
    q: "Is WiselyFox really free?",
    a: "Yes. Parents and learners get full access free of charge: no card, no trial to expire. Tutors pay a small 5% platform fee only when they receive payment for sessions.",
  },
  {
    q: "Do you support ADHD, autism, and dyslexia?",
    a: "Yes. During onboarding you tell us about your child's strengths and needs. WiselyFox applies calm mode, visual schedules, chunked lessons, dyslexia-friendly text, and ADHD-informed focus breaks automatically. Parents can adjust everything in Accessibility settings.",
  },
  {
    q: "Is my child's data safe?",
    a: "Absolutely. Children log in with a PIN only. No ads, no public profiles, and we never sell identifiable child data.",
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
