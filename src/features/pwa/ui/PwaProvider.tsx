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
  const [isIosDevice, setIsIosDevice] = useState(false);
  const [showInlineGuide, setShowInlineGuide] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const standalone = isStandalone();
    setInstalled(standalone);

    const isIos = /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    setIsIosDevice(isIos);

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
          dismissPrompt();
          return;
        }
      } catch {
        /* fallback to inline guide */
      }
    }

    // On iOS or when native prompt is not permitted, show inline visual instruction
    setShowInlineGuide(true);
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
            {!showInlineGuide ? (
              <p className={styles.pwaPopupText}>
                Install WiselyFox on your phone or tablet for a fast full-screen app experience, study streaks, and offline practice.
              </p>
            ) : isIosDevice ? (
              <p className={styles.pwaPopupText} style={{ color: "#1e40af", fontWeight: 600 }}>
                👉 Tap the <strong>Share button (⎋)</strong> at the bottom of Safari, then tap <strong>&quot;Add to Home Screen&quot; (⊞)</strong>.
              </p>
            ) : (
              <p className={styles.pwaPopupText} style={{ color: "#1e40af", fontWeight: 600 }}>
                👉 Tap the <strong>Menu button (⋮)</strong> in Chrome, then tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
              </p>
            )}
          </div>

          <div className={styles.pwaPopupActions}>
            {!showInlineGuide ? (
              <>
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
              </>
            ) : (
              <button
                type="button"
                className={styles.pwaInstallActionBtn}
                onClick={dismissPrompt}
              >
                Got it, done!
              </button>
            )}
          </div>
        </aside>
      )}

      {children}
    </>
  );
}
