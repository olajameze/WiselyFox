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

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const standalone = isStandalone();
    setInstalled(standalone);

    const isDismissed =
      window.sessionStorage.getItem(DISMISS_KEY) === "1" ||
      window.localStorage.getItem(DISMISS_KEY) === "1";
    setDismissed(isDismissed);

    // Check if early capture script caught the prompt
    const globalPrompt = (window as unknown as { __pwaPrompt?: BeforeInstallPromptEvent }).__pwaPrompt;
    if (globalPrompt) {
      setInstallEvent(globalPrompt);
    }

    if (!standalone && !isDismissed) {
      const showTimer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);

      return () => {
        clearTimeout(showTimer);
      };
    }

    const onPromptCaptured = () => {
      const captured = (window as unknown as { __pwaPrompt?: BeforeInstallPromptEvent }).__pwaPrompt;
      if (captured) {
        setInstallEvent(captured);
      }
    };

    const onInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    };

    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
      setShowPopup(false);
    };

    window.addEventListener("beforeinstallprompt", onInstall);
    window.addEventListener("appinstalled", onInstalled);
    window.addEventListener("pwa-prompt-captured", onPromptCaptured);

    return () => {
      window.removeEventListener("beforeinstallprompt", onInstall);
      window.removeEventListener("appinstalled", onInstalled);
      window.removeEventListener("pwa-prompt-captured", onPromptCaptured);
    };
  }, []);

  function dismissPrompt() {
    setShowPopup(false);
    setDismissed(true);
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  }

  async function handleInstall() {
    const promptEvent =
      installEvent ||
      (typeof window !== "undefined"
        ? (window as unknown as { __pwaPrompt?: BeforeInstallPromptEvent }).__pwaPrompt
        : null);

    if (promptEvent) {
      try {
        await promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === "accepted") {
          setInstallEvent(null);
        }
      } catch {
        /* ignore */
      }
    }
    // Dismiss straightaway without opening any secondary popups
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
                <strong className={styles.pwaAppTitle}>Install WiselyFox</strong>
                <span className={styles.pwaAppBadge}>Instant app • Fast access</span>
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
            <p className={styles.pwaPopupText}>
              Install WiselyFox on your device for full-screen learning, study streaks, and offline access.
            </p>
          </div>

          <div className={styles.pwaPopupActions}>
            <button
              type="button"
              className={styles.pwaInstallActionBtn}
              onClick={() => void handleInstall()}
            >
              Install App
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
