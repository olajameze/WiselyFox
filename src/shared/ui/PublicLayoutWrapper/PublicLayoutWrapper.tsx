"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/shared/ui/Header/Header";
import { Footer } from "@/shared/ui/Footer/Footer";

const APP_PREFIXES = [
  "/learn",
  "/parent",
  "/admin",
  "/sign-in",
  "/sign-up",
  "/child-sign-in",
  "/login",
  "/tutor/sign-in",
  "/tutor/sign-up",
];

export function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = APP_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isAppRoute) {
    return <main className="flex-grow flex flex-col">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">{children}</main>
      <Footer />
    </>
  );
}

