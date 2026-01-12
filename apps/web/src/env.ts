import { createEnv } from "@t3-oss/env-nextjs";
import { env as runtimeEnv } from "next-runtime-env";
import { z } from "zod";

const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

export const env = createEnv({
  /**
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    DATABASE_URL: z.url(),
    SECRET_PASSWORD: z.string().min(32),
    EMAIL_LOGIN_ENABLED: z.enum(["true", "false"]).default("true"),
  },

  /**
   * Environment variables available on the client (and server).
   * You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
  },

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    SECRET_PASSWORD: process.env.SECRET_PASSWORD,
    EMAIL_LOGIN_ENABLED: process.env.EMAIL_LOGIN_ENABLED,
    NEXT_PUBLIC_BASE_URL:
      runtimeEnv("NEXT_PUBLIC_BASE_URL") ??
      (vercelUrl ? `https://${vercelUrl}` : undefined),
  },
});
