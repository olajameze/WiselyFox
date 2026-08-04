"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import styles from "../styles/marketing.module.css";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: string;
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export type TurnstileApi = { reset: () => void };

type TurnstileWidgetProps = {
  siteKey: string;
  onTokenChange: (token: string) => void;
  onError?: () => void;
  apiRef?: RefObject<TurnstileApi | null>;
};

export function TurnstileWidget({ siteKey, onTokenChange, onError, apiRef }: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [scriptState, setScriptState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const onTokenChangeRef = useRef(onTokenChange);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
    onErrorRef.current = onError;
  }, [onTokenChange, onError]);

  const renderWidget = useCallback(() => {
    if (!window.turnstile || !containerRef.current) return;
    const widgetId = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      theme: "light",
      callback: (token) => onTokenChangeRef.current(token),
      "expired-callback": () => onTokenChangeRef.current(""),
      "error-callback": () => {
        onTokenChangeRef.current("");
        onErrorRef.current?.();
      },
    });
    widgetIdRef.current = widgetId;
    setScriptState("ready");
  }, [siteKey]);

  useEffect(() => {
    if (!siteKey) return;

    if (window.turnstile) {
      renderWidget();
      return;
    }

    setScriptState("loading");
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Turnstile API is ready after script load; render immediately.
      if (window.turnstile) {
        renderWidget();
      } else {
        setScriptState("error");
      }
    };
    script.onerror = () => setScriptState("error");
    document.head.appendChild(script);

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, [siteKey, renderWidget]);

  const reset = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  useEffect(() => {
    if (apiRef) {
      apiRef.current = { reset };
    }
    return () => {
      if (apiRef) {
        apiRef.current = null;
      }
    };
  }, [apiRef, reset]);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      widgetIdRef.current = null;
    };
  }, []);

  if (!siteKey) {
    return null;
  }

  return (
    <div className={styles.turnstileWrap} aria-live="polite">
      <div ref={containerRef} className={styles.turnstileSlot} />
      {scriptState === "error" && (
        <p className={styles.turnstileError}>
          Security check could not load. Please refresh and try again.
        </p>
      )}
    </div>
  );
}

