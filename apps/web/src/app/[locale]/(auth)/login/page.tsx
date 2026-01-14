import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  AuthPageContainer,
  AuthPageDescription,
  AuthPageExternal,
  AuthPageHeader,
  AuthPageTitle,
} from "@/app/[locale]/(auth)/components/auth-page";
import { LinkWithRedirectTo } from "@/app/[locale]/(auth)/components/link-with-redirect";
import { Trans } from "@/components/trans";
import { getTranslation } from "@/i18n/server";
import { authLib, getSession } from "@/lib/auth";
import { isFeatureEnabled } from "@/lib/feature-flags/server";
import { getRegistrationEnabled } from "@/utils/get-registration-enabled";

async function loadData() {
  const [isRegistrationEnabled] = await Promise.all([getRegistrationEnabled()]);

  return {
    isRegistrationEnabled,
  };
}

export default async function LoginPage(props: {
  searchParams?: Promise<{
    redirectTo?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const session = await getSession();
  if (session?.user && !session.user.isGuest) {
    return redirect("/");
  }

  const { isRegistrationEnabled } = await loadData();
  const isEmailLoginEnabled = await isFeatureEnabled("emailLogin");

  const hasGoogleProvider = !!authLib.options.socialProviders.google;
  const hasMicrosoftProvider = !!authLib.options.socialProviders.microsoft;
  const hasAlternateLoginMethods = hasGoogleProvider || hasMicrosoftProvider;

  return (
    <AuthPageContainer>
      <AuthPageHeader>
        <AuthPageTitle>
          <Trans i18nKey="loginTitle" defaults="Welcome" />
        </AuthPageTitle>
        <AuthPageDescription>
          {!isEmailLoginEnabled && !hasAlternateLoginMethods ? (
            <Trans
              i18nKey="loginNotConfigured"
              defaults="Login is currently not configured."
            />
          ) : (
            <Trans
              i18nKey="loginDescription"
              defaults="Login to your account to continue"
            />
          )}
        </AuthPageDescription>
      </AuthPageHeader>
      {isRegistrationEnabled ? (
        <AuthPageExternal>
          <Trans
            i18nKey="loginFooter"
            defaults="Don't have an account? <a>Sign up</a>"
            components={{
              a: <LinkWithRedirectTo className="text-link" href="/register" />,
            }}
          />
        </AuthPageExternal>
      ) : null}
    </AuthPageContainer>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getTranslation(params.locale);

  return {
    title: t("login"),
  };
}
