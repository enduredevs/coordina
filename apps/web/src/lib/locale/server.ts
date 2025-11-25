import { defaultLocale, supportedLanguages } from "@coordina/languages";
import { getPreferredLocaleFromHeaders } from "@coordina/languages/get-preferred-locale";
import type { NextRequest, NextResponse } from "next/server";
import { LOCAL_COOKIE_NAME } from "@/src/lib/locale/constants";

export function getLocaleFromRequest(req: NextRequest) {
  const localeCookie = req.cookies.get(LOCAL_COOKIE_NAME);
  if (localeCookie) {
    if (supportedLanguages.includes(localeCookie.value)) {
      return localeCookie.value;
    }
  }

  const acceptLanguageHeader = req.headers.get("accept-language");

  if (!acceptLanguageHeader) {
    return defaultLocale;
  }

  return getPreferredLocaleFromHeaders({
    acceptLanguageHeader,
  });
}

export function setLocaleCookie(
  req: NextRequest,
  res: NextResponse,
  locale: string,
) {
  if (req.cookies.get(LOCAL_COOKIE_NAME)) {
    return;
  }

  res.cookies.set(LOCAL_COOKIE_NAME, locale, {
    path: "/",
  });
}
