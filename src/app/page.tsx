import type { Metadata } from "next";
import { Header } from "@/shared/ui/Header/Header";
import { Footer } from "@/shared/ui/Footer/Footer";
import { LandingPage } from "@/features/marketing/ui/LandingPage";
import { buildFaqJsonLd } from "@/features/marketing/lib/landing-faqs";
import { auth } from "@/features/auth/auth";
import { getSiteUrl } from "@/shared/lib/site-config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "WiselyFox | Child safe adaptive learning",
  description:
    "Parent guided learning platform with inclusive support for every mind. Join the family pilot, no card required.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "WiselyFox | Child safe adaptive learning",
    description:
      "Parent guided learning platform with inclusive support for every mind. Join the family pilot, no card required.",
    url: siteUrl,
  },
};

export default async function HomePage() {
  const session = await auth();
  const faqJsonLd = buildFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header signedIn={!!session?.user} variant="notebook" />
      <main id="main">
        <LandingPage />
      </main>
      <Footer variant="notebook" />
    </>
  );
}
