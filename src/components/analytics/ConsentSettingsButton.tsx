"use client";

import { buttonClasses } from "@/components/ui/Button";
import { setAnalyticsConsent } from "./Analytics";

/** Lets visitors reopen the analytics preference banner. */
export function ConsentSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => setAnalyticsConsent(null)}
      className={buttonClasses("secondary", "md")}
    >
      Change analytics preference
    </button>
  );
}
