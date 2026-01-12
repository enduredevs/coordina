import { prisma } from "@coordina/database";
import { absoluteUrl } from "@coordina/utils/absolute-url";
import type { BetterAuthPlugin } from "better-auth";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  admin,
  anonymous,
  createAuthMiddleware,
  emailOTP,
  lastLoginMethod,
} from "better-auth/plugins";
import { headers } from "next/headers";
import { cache } from "react";
import { linkAnonymousUser } from "@/auth/helpers/merge-user";
import { env } from "@/env";
import { getTranslation } from "@/i18n/server";

const baseURL = absoluteUrl("/api/better-auth");

const plugins: BetterAuthPlugin[] = [];

export const authLib = betterAuth({
  appName: "Coordina",
  secret: env.SECRET_PASSWORD,
  emailAndPassword: {
    enabled: env.EMAIL_LOGIN_ENABLED !== "false",
    requireEmailVerification: true,
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
        console.log("++ type - ", type);
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
  account: {
    fields: {
      providerId: "provider",
      accountId: "providerAccountId",
      refreshToken: "refresh_token",
      accessToken: "access_token",
      idToken: "id_token",
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path.startsWith("/sign-in") ||
        ctx.path.startsWith("/sign-up") ||
        ctx.path.startsWith("/email-otp")
      ) {
        if (ctx.body?.email) {
          console.log("Lets check email first");
        }
      }
    }),
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          console.log("databaseHooks - lets create user => ", user);
        },
      },
    },
    session: {
      create: {
        after: async (session) => {
          console.log("let's create session - databaseHooks => ", session);
        },
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 60, // 60 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  baseURL,
});

export type Auth = typeof authLib;

export const getSession = cache(async () => {
  try {
    const session = await authLib.api.getSession({
      headers: await headers(),
    });

    if (session) {
      return {
        user: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
          isGuest: !!session.user.isAnonymous,
          image: session.user.image,
        },
        expires: session.session.expiresAt.toISOString(),
        legacy: false,
      };
    }
  } catch (e) {
    console.error("Failred to get session", e);
    return null;
  }

  //todo:: next-auth

  return null;
});
