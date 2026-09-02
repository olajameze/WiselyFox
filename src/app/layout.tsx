import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PublicLayoutWrapper } from "@/shared/ui/PublicLayoutWrapper/PublicLayoutWrapper";
import { PwaProvider } from "@/features/pwa/ui/PwaProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#e05638",
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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WiselyFox",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__pwaPrompt = null;
              window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                window.__pwaPrompt = e;
                window.dispatchEvent(new CustomEvent('pwa-prompt-captured'));
              });
            `,
          }}
        />
      </head>
      <body className="min-h-dvh flex flex-col">
        <PwaProvider>
          <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
        </PwaProvider>
      </body>
    </html>
  );
}