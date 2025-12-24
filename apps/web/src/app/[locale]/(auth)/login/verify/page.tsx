import { Button } from "@coordina/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AuthPageContainer,
  AuthPageContent,
  AuthPageDescription,
  AuthPageHeader,
  AuthPageTitle,
} from "@/app/[locale]/(auth)/components/auth-page";
import { OTPForm } from "@/app/[locale]/(auth)/login/verify/components/otp-form";
import { Trans } from "@/components/trans";

export default async function VerifyPage() {
  const email = (await cookies()).get("verification-email")?.value;
  if (!email) {
    return redirect("/login");
  }

  return (
    <AuthPageContainer>
      <AuthPageHeader>
        <AuthPageTitle>
          <Trans
            ns="app"
            i18nKey="loginVerifyTitle"
            defaults="Finish Logging In"
          />
        </AuthPageTitle>
        <AuthPageDescription>
          <Trans
            ns="app"
            i18nKey="loginVerifyDescription"
            defaults="Check your email for the verification code"
          />
        </AuthPageDescription>
      </AuthPageHeader>
      <AuthPageContent>
        <OTPForm email={email} />
        <Button size={"lg"} variant={"link"} className="w-full" asChild>
          <Link href={"/login"}>
            <Trans ns="app" i18nKey="back" defaults="Back" />
          </Link>
        </Button>
      </AuthPageContent>
    </AuthPageContainer>
  );
}
