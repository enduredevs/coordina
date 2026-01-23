import { sans } from "@/fonts/sans";
import "@/style.css";
import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function Root(props: { children: React.ReactNode }) {
  const { children } = props;

  return (
    <html lang="en" className={sans.className}>
      <body cz-shortcut-listen="true">{children}</body>
    </html>
  );
}
