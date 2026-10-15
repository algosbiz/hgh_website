"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

interface TrackEventProps {
  name: AnalyticsEvent;
  params?: Record<string, string | number | boolean>;
}

/** Sends one analytics event when the page is shown. Renders nothing. */
export function TrackEvent({ name, params }: TrackEventProps) {
  const serialized = JSON.stringify(params ?? {});

  useEffect(() => {
    trackEvent(name, JSON.parse(serialized));
  }, [name, serialized]);

  return null;
}
