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
  const [dismissed, setDismissed] = useState(true);
  const [showIosHint, setShowIosHint] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const standalone = isStandalone();
    setInstalled(standalone);

    const isDismissed = window.sessionStorage.getItem(DISMISS_KEY) === "1" || window.localStorage.getItem(DISMISS_KEY) === "1";
    setDismissed(isDismissed);

    const iosSafari = isIosSafari() && !standalone;
    setShowIosHint(iosSafari);

    if (!standalone && !isDismissed) {
      // Delay initial popup slightly for smooth entrance
      const showTimer = setTimeout(() => {
        setShowPopup(true);
      }, 1500);

      // Auto dismiss after 30 seconds
      const autoDismissTimer = setTimeout(() => {
        setShowPopup(false);
      }, 31500);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(autoDismissTimer);
      };
    }

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
      setShowPopup(false);
    };

    window.addEventListener("beforeinstallprompt", onInstall);
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function dismissPrompt() {
    setShowPopup(false);
    setDismissed(true);
    setShowIosHint(false);
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  }

  async function handleInstall() {
    if (installEvent) {
      await installEvent.prompt();
      const choice = await installEvent.userChoice;
      if (choice.outcome === "accepted") setInstallEvent(null);
    }
    dismissPrompt();
  }

  const shouldRender = showPopup && !installed && !dismissed;

  return (
    <>
      {shouldRender && (
        <aside
          className={styles.pwaCookiePopup}
          role="dialog"
          aria-label="Install WiselyFox app"
        >
          <div className={styles.pwaPopupHeader}>
            <div className={styles.pwaAppBrand}>
              <span className={styles.pwaAppIcon} aria-hidden="true">
                🦊
              </span>
              <div className={styles.pwaAppMeta}>
                <strong className={styles.pwaAppTitle}>Install WiselyFox App</strong>
                <span className={styles.pwaAppBadge}>Free • No store needed</span>
              </div>
            </div>
            <button
              type="button"
              className={styles.pwaCloseBtn}
              onClick={dismissPrompt}
              aria-label="Close install prompt"
            >
              ✕
            </button>
          </div>

          <div className={styles.pwaPopupBody}>
            {showIosHint ? (
              <p className={styles.pwaPopupText}>
                To install on iPhone or iPad: tap <span className={styles.shareIcon}>⎋ Share</span> in Safari, then select <strong>Add to Home Screen</strong>.
              </p>
            ) : (
              <p className={styles.pwaPopupText}>
                Get the full-screen app on your phone, tablet, or desktop with instant access and offline practice.
              </p>
            )}
          </div>

          <div className={styles.pwaPopupActions}>
            <button
              type="button"
              className={styles.pwaInstallActionBtn}
              onClick={() => void handleInstall()}
            >
              {showIosHint ? "Got it" : "Install App"}
            </button>
            <button
              type="button"
              className={styles.pwaDismissActionBtn}
              onClick={dismissPrompt}
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
