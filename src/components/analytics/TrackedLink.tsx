"use client";

import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

interface TrackedLinkProps {
  href: string;
  event: AnalyticsEvent;
  params?: Record<string, string | number | boolean>;
  className?: string;
  children: React.ReactNode;
}

/** External link (new tab) that records an analytics event when clicked. */
export function TrackedLink({ href, event, params, className, children }: TrackedLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent(event, params)}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
