import allLanguages from "@coordina/languages";
import type { InitOptions, Namespace } from "i18next";

export const fallbackLng = "eng";
export const languages = Object.keys(allLanguages);
export const defaultNS = "app";

export function getOptions(
  lng = fallbackLng,
  ns: Namespace = defaultNS
): InitOptions {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
