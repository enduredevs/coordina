import "server-only";

import { featureFlagConfig } from "@/lib/feature-flags/config";
import type { Feature } from "@/lib/feature-flags/type";

export function isFeatureEnabled(feature: Feature) {
  return featureFlagConfig[feature];
}
