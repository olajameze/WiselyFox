import "./globals.css";
import type { Metadata, Viewport } from "next";
import { PwaProvider } from "@/features/pwa/ui/PwaProvider";
import { PageTurnTransition } from "@/shared/ui/PageTurn/PageTurnTransition";

export const metadata: Metadata = {
  title: {
    default: "WiselyFox",
    template: "%s, WiselyFox",
  },
  description: "Child safe, parent guided adaptive learning for mobile, tablet, and desktop.",
  applicationName: "WiselyFox",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "WiselyFox",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1746a0" },
    { media: "(prefers-color-scheme: dark)", color: "#0f2d6b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PwaProvider>
          <PageTurnTransition>{children}</PageTurnTransition>
        </PwaProvider>
      </body>
    </html>
  );
}
