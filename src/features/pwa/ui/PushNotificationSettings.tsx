"use client";

import { useEffect, useState } from "react";
import { Alert, Button } from "@/shared/ui";
import styles from "./pwa.module.css";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = window.atob(base64);
  return Uint8Array.from([...raw].map((char) => char.charCodeAt(0)));
}

export function PushNotificationSettings() {
  const [supported, setSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const ok =
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;
    setSupported(ok);
    if (ok) setPermission(Notification.permission);

    if (!ok) return;

    navigator.serviceWorker.ready
      .then((reg) => reg.pushManager.getSubscription())
      .then((sub) => setSubscribed(Boolean(sub)))
      .catch(() => setSubscribed(false));
  }, []);

  async function subscribe() {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicKey) {
        setError("Push notifications are not configured on this server yet.");
        return;
      }

      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== "granted") {
        setError("Notification permission was denied. Enable it in your browser or device settings.");
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(publicKey),
        });
      }

      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription.toJSON()),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setError(data.error ?? "Could not save push subscription.");
        return;
      }

      setSubscribed(true);
      setMessage("Push notifications enabled. You will get alerts for rewards, trials, and learning updates.");
    } catch {
      setError("Could not enable push notifications on this device.");
    } finally {
      setLoading(false);
    }
  }

  async function unsubscribe() {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription) {
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        });
        await subscription.unsubscribe();
      }
      setSubscribed(false);
      setMessage("Push notifications turned off.");
    } catch {
      setError("Could not disable push notifications.");
    } finally {
      setLoading(false);
    }
  }

  if (!supported) {
    return (
      <Alert variant="info" title="Push not supported">
        Install WiselyFox as an app on your phone or tablet, then use Chrome, Edge, or Safari 16.4+ for
        notifications.
      </Alert>
    );
  }

  return (
    <div className={styles.pushCard}>
      {error && <Alert variant="error">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <p className={styles.pushStatus}>
        Permission: <strong>{permission}</strong>
        {subscribed ? ", Subscribed" : ", Not subscribed"}
      </p>
      <p className={styles.pushStatus}>
        Get alerts when rewards need approval, trials are ending, or your child earns achievements, even
        when the app is in the background.
      </p>
      <div className={styles.pushActions}>
        {!subscribed ? (
          <button type="button" className={styles.pushBtn} disabled={loading} onClick={() => void subscribe()}>
            {loading ? "Enabling…" : "Enable push notifications"}
          </button>
        ) : (
          <Button variant="secondary" size="sm" loading={loading} onClick={() => void unsubscribe()}>
            Turn off push notifications
          </Button>
        )}
      </div>
    </div>
  );
}
