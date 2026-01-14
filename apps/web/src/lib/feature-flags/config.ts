import { env } from "@/env";
import type { FeatureFlagConfig } from "@/lib/feature-flags/type";

const isEmailLoginEnabled = env.EMAIL_LOGIN_ENABLED === "true";
const isRegistrationEnabled = env.REGISTRATION_ENABLED === "true";

export const featureFlagConfig: FeatureFlagConfig = {
  storage: true,
  billing: true,
  feedback: true,
  emailLogin: isEmailLoginEnabled,
  registration: isEmailLoginEnabled && isRegistrationEnabled,
  calendars: true,
};
