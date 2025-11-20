import { PostHog } from "posthog-node";

function PosthogClient() {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_API_KEY;

  if (!posthogKey) return;

  const posthogClient = new PostHog(posthogKey, {
    host: process.env.NEXT_PUBLIC_POSTHOG_API_HOST,
    flushAt: 1,
    flushInterval: 0,
  });
  return posthogClient;
}

export { PostHog };
export const posthog = PosthogClient();
