import { LandingPage } from "@/features/marketing/ui/LandingPage";
import { buildFaqJsonLd } from "@/features/marketing/lib/landing-faqs";

export default async function HomePage() {
  const faqJsonLd = buildFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LandingPage />
    </>
  );
}
