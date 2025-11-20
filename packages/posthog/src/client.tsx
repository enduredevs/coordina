"use client";

import posthog from "posthog-js";
import React from "react";

export { usePostHog } from "posthog-js/react";

import { PostHogProvider as BasePosthogProvider } from "posthog-js/react";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_API_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, {
    debug: false,
    api_host: process.env.NEXT_PUBLIC_POSTHOG_API_HOST,
    capture_pageview: false,
    capture_pageleave: true,
    disable_session_recording: true,
    enable_heatmaps: false,
    persistence: "cookie",
    autocapture: false,
    opt_out_capturing_by_default: false,
    cross_subdomain_cookie: true,
  });
}

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  return <BasePosthogProvider client={posthog}>{children}</BasePosthogProvider>;
}

export function PosthogIdentity({ distinctId }: { distinctId?: string }) {
  React.useEffect(() => {
    if (distinctId) {
      posthog?.identify(distinctId);
    }
  }, [distinctId]);
  return null;
}
