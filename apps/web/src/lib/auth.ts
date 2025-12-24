import { prisma } from "@coordina/database";
import type { BetterAuthPlugin } from "better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  admin,
  anonymous,
  emailOTP,
  lastLoginMethod,
} from "better-auth/plugins";
import { linkAnonymousUser } from "@/auth/helpers/merge-user";
import { env } from "@/env";
import { getTranslation } from "@/i18n/server";

const plugins: BetterAuthPlugin[] = [];

export const authLib = betterAuth({
  appName: "Coordina",
  secret: env.SECRET_PASSWORD,
  emailAndPassword: {
    enabled: env.EMAIL_LOGIN_ENABLED !== "false",
    requireEmailVerification: false,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
    transaction: false,
  }),
  plugins: [
    ...plugins,
    admin(),
    anonymous({
      emailDomainName: "coordina.co",
      generateName: async () => {
        const { t } = await getTranslation();
        return t("guest", { defaultValue: "Guest" });
      },
      onLinkAccount: async ({ anonymousUser, newUser }) => {
        await linkAnonymousUser({
          anonymousUserId: anonymousUser.user.id,
          authenticatedUserId: newUser.user.id,
        });
      },
    }),
    lastLoginMethod({
      storeInDatabase: true,
    }),
    emailOTP({
      disableSignUp: true,
      expiresIn: 15 * 60,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        console.log("++ Otp is coming - ", otp);
        console.log("++ email - ", email);
      },
    }),
  ],
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
