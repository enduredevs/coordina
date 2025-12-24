"use client";

import { Button } from "@coordina/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@coordina/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { InputOTP } from "@/components/input-otp";
import { Trans } from "@/components/trans";
import { useTranslation } from "@/i18n/client";
import { authClient } from "@/lib/auth-client";
import { validateRedirectUrl } from "@/utils/redirect";

const otpFormSchema = z.object({
  otp: z.string().length(6),
});

type OTPFormValues = z.infer<typeof otpFormSchema>;

export function OTPForm({ email }: { email: string }) {
  const { t } = useTranslation();
  const form = useForm<OTPFormValues>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(otpFormSchema),
  });

  const searchParams = useSearchParams();

  const handleSubmit = form.handleSubmit(async (data) => {
    const res = await authClient.emailOtp.verifyEmail({
      email,
      otp: data.otp,
    });

    if (res.error) {
      switch (res.error.code) {
        case "INVALID_OTP": {
          form.setError("otp", {
            message: t("wrongVerificationCode"),
          });
          return;
        }
        default: {
          form.setError("otp", {
            message: res.error.message,
          });
        }
      }
    } else {
      window.location.href =
        validateRedirectUrl(searchParams?.get("redirectTo")) ?? "/";
    }
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <InputOTP
                    size="lg"
                    placeholder={t("verificationCodePlaceholder")}
                    disabled={
                      form.formState.isSubmitting ||
                      form.formState.isSubmitSuccessful
                    }
                    autoFocus
                    onValidCode={() => {
                      handleSubmit();
                    }}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  <Trans
                    i18nKey="verificationCodeHelp"
                    defaults="Didn't get the email? Check your spam/junk."
                  />
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          className="w-full"
          variant={"primary"}
          size={"lg"}
          type="submit"
          loading={
            form.formState.isSubmitting || form.formState.isSubmitSuccessful
          }
        >
          <Trans i18nKey="login" defaults="Login" />
        </Button>
      </form>
    </Form>
  );
}
