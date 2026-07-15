import Script from "next/script";
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { PwaProvider } from "@/features/pwa/ui/PwaProvider";
import { ThemeProvider } from "@/shared/ui/ThemeProvider/ThemeProvider";
import { PageTurnTransition } from "@/shared/ui/PageTurn/PageTurnTransition";
import { NavigationProgress } from "@/shared/ui/NavigationProgress/NavigationProgress";
import { THEME_STORAGE_KEY } from "@/shared/lib/theme";
import { getSiteUrl } from "@/shared/lib/site-config";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WiselyFox",
    template: "%s | WiselyFox",
  },
  description:
    "Child safe, parent guided adaptive learning for mobile, tablet, and desktop. Inclusive support built in.",
  applicationName: "WiselyFox",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "WiselyFox",
    title: "WiselyFox | Child safe adaptive learning",
    description:
      "Parent guided learning with inclusive support for every mind. Join the family pilot, no card required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WiselyFox | Child safe adaptive learning",
    description:
      "Parent guided learning with inclusive support for every mind. Join the family pilot, no card required.",
  },
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
    { media: "(prefers-color-scheme: dark)", color: "#0f1a33" },
  ],
};

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var m=localStorage.getItem(k);var d=m==='dark'||(m!=='light'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var t=d?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="wiselyfox-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
      </head>
      <body>
        <ThemeProvider>
          <PwaProvider>
            <NavigationProgress />
            <PageTurnTransition>{children}</PageTurnTransition>
          </PwaProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
