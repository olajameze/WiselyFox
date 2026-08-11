import type { Metadata } from "next";
import "./globals.css";
import { GlobalDisplayControls } from "./GlobalDisplayControls";

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
      <body>
        {children}
        <GlobalDisplayControls />
      </body>
    </html>
  );
}