import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PublicEnvScript } from "next-runtime-env";
import type { Params } from "@/src/app/[locale]/types";

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
  return (
    <html lang={"en"} className={inter.className}>
      <head>
        <PublicEnvScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
