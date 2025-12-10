import type { Metadata } from "next";
import {
  AuthPageContainer,
  AuthPageContent,
  AuthPageDescription,
  AuthPageExternal,
  AuthPageHeader,
  AuthPageTitle,
} from "@/app/[locale]/(auth)/components/auth-page";
import { LinkWithRedirectTo } from "@/app/[locale]/(auth)/components/link-with-redirect";
import { RegisterNameForm } from "@/app/[locale]/(auth)/register/components/register-name-form";
import { Trans } from "@/components/trans";
import { getTranslation } from "@/i18n/server";

export default function Register() {
  return (
    <AuthPageContainer>
      <AuthPageHeader>
        <AuthPageTitle>
          <Trans i18nKey="registerTitle" defaults="Create Your Account" />
        </AuthPageTitle>
        <AuthPageDescription>
          <Trans
            i18nKey="registerDescription"
            defaults="Streamline your scheduling process and save time"
          />
        </AuthPageDescription>
      </AuthPageHeader>
      <AuthPageContent>
        <RegisterNameForm />
      </AuthPageContent>

      <AuthPageExternal>
        <Trans
          i18nKey="alreadyHaveAccount"
          defaults="Already have an account? <a>Log in</a>"
          components={{
            a: <LinkWithRedirectTo className="text-link" href="/login" />,
          }}
        />
      </AuthPageExternal>
    </AuthPageContainer>
  );
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const { t } = await getTranslation(params.locale);
  return {
    title: t("register"),
  };
}
