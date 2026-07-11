"use client";

import { useEffect, useState } from "react";
import styles from "./pwa.module.css";

const DISMISS_KEY = "wiselyfox-pwa-install-dismissed";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

function isStandalone() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}

function isIos() {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isIosSafari() {
  if (!isIos()) return false;
  return !(window.navigator as Navigator & { standalone?: boolean }).standalone;
}

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showIosHint, setShowIosHint] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setInstalled(isStandalone());
    setDismissed(window.localStorage.getItem(DISMISS_KEY) === "1");
    setShowIosHint(isIosSafari() && !isStandalone());

    if ("serviceWorker" in navigator) {
      const enableDevPwa = process.env.NEXT_PUBLIC_ENABLE_PWA_DEV === "true";
      if (process.env.NODE_ENV === "development" && !enableDevPwa) {
        void navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            void registration.unregister();
          });
        });
      } else {
        navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {
          /* registration may fail on unsupported hosts */
        });
      }
    }

    const onInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
      setShowIosHint(false);
    };

    window.addEventListener("beforeinstallprompt", onInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismissPrompt() {
    setDismissed(true);
    setShowIosHint(false);
    window.localStorage.setItem(DISMISS_KEY, "1");
  }

  async function handleInstall() {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") setInstallEvent(null);
    dismissPrompt();
  }

  const showChromiumBanner = Boolean(installEvent) && !installed && !dismissed;
  const showBanner = (showChromiumBanner || showIosHint) && !installed && !dismissed;

  return (
    <>
      {showBanner && (
        <aside className={styles.installBanner} role="region" aria-label="Install WiselyFox app">
          <div>
            <strong>Install WiselyFox</strong>
            {showIosHint ? (
              <p>
                On iPhone or iPad: tap Share, then <strong>Add to Home Screen</strong> to use WiselyFox like an app.
              </p>
            ) : (
              <p>
                Install on phone, tablet, or desktop for full-screen learning, parent tools, and admin access.
              </p>
            )}
          </div>
          <div className={styles.installActions}>
            {showChromiumBanner && (
              <button type="button" className={styles.installBtn} onClick={() => void handleInstall()}>
                Install app
              </button>
            )}
            <button
              type="button"
              className={styles.dismissBtn}
              onClick={dismissPrompt}
              aria-label="Dismiss install prompt"
            >
              Not now
            </button>
          </div>
        </aside>
      )}
      {children}
    </>
  );
}
