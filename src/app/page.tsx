import type { Metadata } from "next";
import { Header } from "@/shared/ui/Header/Header";
import { Footer } from "@/shared/ui/Footer/Footer";
import { LandingPage } from "@/features/marketing/ui/LandingPage";
import { auth } from "@/features/auth/auth";

export const metadata: Metadata = {
  title: "WiselyFox | Child safe adaptive learning",
  description:
    "Parent guided learning platform with inclusive support for every mind. Join the family pilot, no card required.",
};

export default async function HomePage() {
  const session = await auth();
  return (
    <>
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
