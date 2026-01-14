import "@/style.css";

import { TooltipProvider } from "@coordina/ui/tooltip";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PublicEnvScript } from "next-runtime-env";
import type { Params } from "@/app/[locale]/types";
import { requireUser } from "@/auth/data";
import { UserProvider } from "@/components/user-provider";
import { PreferenceProvider } from "@/context/preferences";
import type { UserDTO } from "@/features/user/schema";
import { I18nProvider } from "@/i18n/client";
import { getSession } from "@/lib/auth";
import { TimezoneProvider } from "@/lib/timezone";
import { TRPCProvider } from "@/trpc/client/provider";
import { ConnectedDayjsProvider } from "@/utils/dayjs";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

async function loadData() {
  const [session] = await Promise.all([getSession()]);

  const user = session?.user
    ? !session.user.isGuest
      ? await requireUser()
      : ({
          id: session.user.id,
          name: "Guest",
          isGuest: true,
          email: `${session.user.id}@rallly.co`,
          role: "user",
          locale: undefined, // session.user.locale ?? undefined,
          timeZone: undefined, // session.user.timeZone ?? undefined,
          timeFormat: undefined, //session.user.timeFormat ?? undefined,
          weekStart: undefined, //session.user.weekStart ?? undefined,
        } satisfies UserDTO)
    : null;

  return {
    session,
    user,
  };
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: "%s | Coordina",
      default: "Coordina",
    },
  };
}

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;
  const { user } = await loadData();

  return (
    <html lang={"en"} className={inter.className}>
      <head>
        <PublicEnvScript />
      </head>
      <body cz-shortcut-listen="true">
        <I18nProvider locale="en">
          <TRPCProvider>
            <TooltipProvider>
              <UserProvider user={user ?? undefined}>
                <PreferenceProvider
                  initialValue={{
                    timeFormat: user?.timeFormat,
                    timeZone: user?.timeZone,
                    weekStart: user?.weekStart,
                  }}
                >
                  <TimezoneProvider initialTimezone={user?.timeZone}>
                    <ConnectedDayjsProvider>{children}</ConnectedDayjsProvider>
                  </TimezoneProvider>
                </PreferenceProvider>
              </UserProvider>
            </TooltipProvider>
          </TRPCProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
