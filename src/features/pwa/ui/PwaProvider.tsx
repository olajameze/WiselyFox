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

export function PwaProvider({ children }: { children: React.ReactNode }) {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [activeGuideTab, setActiveGuideTab] = useState<"ios" | "android" | "desktop">("ios");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const standalone = isStandalone();
    setInstalled(standalone);

    const isDismissed =
      window.sessionStorage.getItem(DISMISS_KEY) === "1" ||
      window.localStorage.getItem(DISMISS_KEY) === "1";
    setDismissed(isDismissed);

    if (isIos()) setActiveGuideTab("ios");
    else if (/android/i.test(navigator.userAgent)) setActiveGuideTab("android");
    else setActiveGuideTab("desktop");

    if (!standalone && !isDismissed) {
      // Show install prompt smoothly after brief delay
      const showTimer = setTimeout(() => {
        setShowPopup(true);
      }, 1200);

      return () => {
        clearTimeout(showTimer);
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
      setShowPopup(false);
      setShowGuideModal(false);
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
    window.sessionStorage.setItem(DISMISS_KEY, "1");
  }

  async function handleInstall() {
    if (installEvent) {
      try {
        await installEvent.prompt();
        const choice = await installEvent.userChoice;
        if (choice.outcome === "accepted") {
          setInstallEvent(null);
          dismissPrompt();
          return;
        }
      } catch {
        /* fallback to guide modal */
      }
    }
    // If native prompt is unavailable (iOS, Safari, Firefox, or unprompted Android), show the visual guide modal
    setShowGuideModal(true);
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
                <span className={styles.pwaAppBadge}>Instant app • No store needed</span>
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
              Install on your phone, tablet, or desktop for a fast full-screen app experience, study streaks, and offline practice.
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

      {/* Step-by-Step Installation Modal Guide */}
      {showGuideModal && (
        <div className={styles.modalOverlay} onClick={() => setShowGuideModal(false)}>
          <div
            className={styles.guideModalCard}
            role="dialog"
            aria-modal="true"
            aria-label="How to install WiselyFox"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.guideModalHeader}>
              <div className={styles.guideBrandHeader}>
                <span className={styles.guideFoxEmoji}>🦊</span>
                <div>
                  <h3 className={styles.guideModalHeading}>How to Install WiselyFox</h3>
                  <p className={styles.guideModalSub}>Add to your home screen in seconds</p>
                </div>
              </div>
              <button
                type="button"
                className={styles.guideCloseBtn}
                onClick={() => setShowGuideModal(false)}
                aria-label="Close installation guide"
              >
                ✕
              </button>
            </div>

            {/* Device Switcher Tabs */}
            <div className={styles.guideDeviceTabs} role="tablist">
              <button
                type="button"
                className={`${styles.guideTabBtn} ${activeGuideTab === "ios" ? styles.guideTabActive : ""}`}
                role="tab"
                aria-selected={activeGuideTab === "ios"}
                onClick={() => setActiveGuideTab("ios")}
              >
                🍎 iPhone / iPad
              </button>
              <button
                type="button"
                className={`${styles.guideTabBtn} ${activeGuideTab === "android" ? styles.guideTabActive : ""}`}
                role="tab"
                aria-selected={activeGuideTab === "android"}
                onClick={() => setActiveGuideTab("android")}
              >
                🤖 Android
              </button>
              <button
                type="button"
                className={`${styles.guideTabBtn} ${activeGuideTab === "desktop" ? styles.guideTabActive : ""}`}
                role="tab"
                aria-selected={activeGuideTab === "desktop"}
                onClick={() => setActiveGuideTab("desktop")}
              >
                💻 Desktop / PC
              </button>
            </div>

            {/* Tab Instructions Content */}
            <div className={styles.guideStepsContent}>
              {activeGuideTab === "ios" && (
                <ol className={styles.guideStepsList}>
                  <li>
                    In <strong>Safari</strong> on your iPhone or iPad, tap the <strong>Share button</strong> <span className={styles.stepBadge}>⎋</span> in the bottom toolbar.
                  </li>
                  <li>
                    Scroll down and tap <strong>&quot;Add to Home Screen&quot;</strong> <span className={styles.stepBadge}>⊞</span>.
                  </li>
                  <li>
                    Tap <strong>&quot;Add&quot;</strong> in the top right corner.
                  </li>
                  <li>
                    WiselyFox will appear on your home screen with its own app icon and full-screen learning space!
                  </li>
                </ol>
              )}

              {activeGuideTab === "android" && (
                <ol className={styles.guideStepsList}>
                  <li>
                    In <strong>Chrome</strong>, tap the <strong>menu button</strong> <span className={styles.stepBadge}>⋮</span> in the top right corner.
                  </li>
                  <li>
                    Tap <strong>&quot;Install app&quot;</strong> or <strong>&quot;Add to Home screen&quot;</strong>.
                  </li>
                  <li>
                    Confirm by tapping <strong>&quot;Install&quot;</strong>.
                  </li>
                  <li>
                    Launch WiselyFox straight from your app drawer or home screen!
                  </li>
                </ol>
              )}

              {activeGuideTab === "desktop" && (
                <ol className={styles.guideStepsList}>
                  <li>
                    In <strong>Chrome</strong> or <strong>Edge</strong>, look at the address bar on the right.
                  </li>
                  <li>
                    Click the <strong>Install icon</strong> <span className={styles.stepBadge}>⊕</span> or open the browser menu <span className={styles.stepBadge}>⋮</span> and click <strong>&quot;Install WiselyFox&quot;</strong>.
                  </li>
                  <li>
                    Click <strong>Install</strong> to add WiselyFox as a standalone desktop app.
                  </li>
                </ol>
              )}
            </div>

            <div className={styles.guideModalFooter}>
              <button
                type="button"
                className={styles.guidePrimaryActionBtn}
                onClick={() => {
                  setShowGuideModal(false);
                  dismissPrompt();
                }}
              >
                Done / Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {children}
    </>
  );
}
