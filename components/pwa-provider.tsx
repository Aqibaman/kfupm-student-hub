"use client";

import { useEffect } from "react";

export function PwaProvider() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const handleServiceWorker = async () => {
      try {
        if (process.env.NODE_ENV !== "production") {
          const registrations = await navigator.serviceWorker.getRegistrations();
          await Promise.all(registrations.map((registration) => registration.unregister()));

          if ("caches" in window) {
            const keys = await caches.keys();
            await Promise.all(keys.map((key) => caches.delete(key)));
          }

          return;
        }

        await navigator.serviceWorker.register("/sw.js", { scope: "/" });
      } catch {
        // Keep the prototype resilient if service worker registration fails.
      }
    };

    handleServiceWorker();
  }, []);

  return null;
}
