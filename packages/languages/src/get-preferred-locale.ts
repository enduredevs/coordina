import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { defaultLocale, supportedLanguages } from ".";

export function getPreferredLocaleFromHeaders({
  acceptedLanguageHeader,
}: {
  acceptedLanguageHeader: string;
}) {
  const preferredLanguages = new Negotiator({
    headers: {
      "accept-language": acceptedLanguageHeader,
    },
  })
    .languages()
    .filter((lang) => lang !== "*");

  try {
    return match(preferredLanguages, supportedLanguages, defaultLocale);
  } catch (_error) {
    return defaultLocale;
  }
}
