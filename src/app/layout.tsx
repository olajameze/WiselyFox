import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/shared/ui/Header/Header";
import { Footer } from "@/shared/ui/Footer/Footer";
import { PwaProvider } from "@/features/pwa/ui/PwaProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#2563eb",
  viewportFit: "cover",
};

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
        <PwaProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </PwaProvider>
      </body>
    </html>
  );
}