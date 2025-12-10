import { initI18next } from "@/i18n/i18n";
import { getLocale } from "@/i18n/server/get-locale";
import { defaultNS } from "@/i18n/settings";

export async function getTranslation(localeOverride?: string) {
  let locale = localeOverride;

  if (!locale) {
    locale = await getLocale();
  }

  const { i18n } = await initI18next({
    lng: locale,
  });

  return {
    t: i18n.getFixedT(locale, defaultNS),
    i18n,
  };
}
