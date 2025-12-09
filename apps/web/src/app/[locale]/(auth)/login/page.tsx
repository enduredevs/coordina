import {
  AuthPageContainer,
  AuthPageDescription,
  AuthPageExternal,
  AuthPageHeader,
  AuthPageTitle,
} from "@/app/[locale]/(auth)/components/auth-page";
import { LinkWithRedirectTo } from "@/app/[locale]/(auth)/components/link-with-redirect";
import { Trans } from "@/components/trans";

async function loadData() {
  const isRegistrationEnabled = true;

  return {
    isRegistrationEnabled,
  };
}

export default async function LoginPage(props: {
  searchParams?: Promise<{
    redirectTo?: string;
  }>;
}) {
  const { isRegistrationEnabled } = await loadData();
  const isEmailLoginEnabled = true;
  const hasAlternateLoginMethods = true;

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
            i18nKey="loginError"
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
