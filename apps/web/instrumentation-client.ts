// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

	// todo: Adjust this value in production, or use traceSampler for greater control
	tracesSampleRate: 0.2,

	// todo: Setting this to true prints useful information to the console while setting up Sentry.
	debug: true,

	replaysOnErrorSampleRate: 1.0,

	// todo: This sets to 100%, in products you want it something like 10%
	replaysSessionSampleRate: 1.0,

	// Session Replay feature
	integrations: [
		Sentry.replayIntegration({
			maskAllText: true,
			blockAllMedia: true,
		}),
	],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
