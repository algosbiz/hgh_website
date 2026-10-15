"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/analytics";
import { buttonClasses } from "@/components/ui/Button";

type Consent = "granted" | "denied" | null | "server";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
}

function readConsent(): Consent {
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

export function setAnalyticsConsent(value: "granted" | "denied" | null) {
  if (value === null) {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } else {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  }
  if (value !== "granted") {
    // Stops an already-loaded gtag from storing analytics cookies.
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/**
 * Google Analytics 4, loaded only after the visitor accepts analytics.
 * Rendered only when NEXT_PUBLIC_GA_ID is configured.
 */
export function Analytics({ gaId }: { gaId: string }) {
  const consent = useSyncExternalStore<Consent>(
    subscribe,
    readConsent,
    () => "server",
  );

  if (consent === "granted") {
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${gaId}',{allow_google_signals:false,allow_ad_personalization_signals:false});`}
        </Script>
      </>
    );
  }

  if (consent !== null) return null;

  return (
    <section
      aria-label="Analytics preference"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-2xl border border-line bg-paper p-5 shadow-lift sm:right-auto sm:left-6 sm:mx-0"
    >
      <p className="text-sm leading-relaxed text-body">
        We would like to use anonymous analytics to understand how this site
        is used. No health information is collected.{" "}
        <Link href="/privacy-policy/" className="text-ink underline underline-offset-4">
          Privacy policy
        </Link>
      </p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setAnalyticsConsent("granted")}
          className={buttonClasses("primary", "md")}
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => setAnalyticsConsent("denied")}
          className={buttonClasses("secondary", "md")}
        >
          Decline
        </button>
      </div>
    </section>
  );
}
