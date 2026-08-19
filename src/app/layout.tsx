import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/shared/ui/Header/Header";
import { Footer } from "@/shared/ui/Footer/Footer";

/**
 * This is the root layout for the entire application. It applies global
 * styles and wraps all pages.
 */

export const metadata: Metadata = {
  title: "WiselyFox",
  description:
    "Parent guided learning platform with inclusive support for every mind.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}