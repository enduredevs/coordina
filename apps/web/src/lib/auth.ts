import type { BetterAuthPlugin } from "better-auth";
import { betterAuth } from "better-auth";
import { env } from "@/env";

const plugins: BetterAuthPlugin[] = [];

export const authLib = betterAuth({
  appName: "Coordina",
  secret: env.SECRET_PASSWORD,
  emailAndPassword: {
    enabled: env.EMAIL_LOGIN_ENABLED !== "false",
    requireEmailVerification: true,
  },
  plugins: [...plugins],
  user: {
    additionalFields: {
      timeZone: {
        type: "string",
        input: true,
      },
      locale: {
        type: "string",
        input: true,
      },
    },
  },
});

export type Auth = typeof authLib;
