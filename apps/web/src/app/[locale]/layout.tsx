import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PublicEnvScript } from "next-runtime-env";
import type { Params } from "@/app/[locale]/types";
import "@/style.css";
import { I18nProvider } from "@/i18n/client";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      template: "%s | Coordina",
      default: "Coordina",
    },
  };
}

export default function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const locale = "en";

  return (
    <html lang={"en"} className={inter.className}>
      <head>
        <PublicEnvScript />
      </head>
      <body cz-shortcut-listen="true">
        <I18nProvider locale="en">{children}</I18nProvider>
      </body>
    </html>
  );
}
