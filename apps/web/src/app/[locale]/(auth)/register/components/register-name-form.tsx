"use client";

import { Button } from "@coordina/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@coordina/ui/form";
import { Input } from "@coordina/ui/input";
import { PasswordInput } from "@coordina/ui/password-input";
import { absoluteUrl } from "@coordina/utils/absolute-url";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { Trans } from "@/components/trans";
import { PasswordStrengthMeter } from "@/features/password/components/password-strength-meter";
import { useTranslation } from "@/i18n/client";
import { authClient } from "@/lib/auth-client";
import { validateRedirectUrl } from "@/utils/redirect";

export function RegisterNameForm() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => {
          const validatedRedirectTo = validateRedirectUrl(
            searchParams.get("redirectTo"),
          );

          const verifyURL = absoluteUrl(
            `/login/verify${
              validatedRedirectTo
                ? `?redirectTo=${encodeURIComponent(validatedRedirectTo)}`
                : ""
            }`,
          );

          try {
            const res = await authClient.signUp.email({
              email: data.email,
              password: data.password,
              name: data.name,
              timeZone: "",
              locale: i18n.language,
            });
          } catch (error) {
            if (error instanceof Error) {
              form.setError("root", {
                message: error.message,
              });
            }
          }
        })}
      >
        <div className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    <Trans i18nKey="name" defaults="Name" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      size="lg"
                      data-1p-ignore
                      placeholder={t("namePlaceholder")}
                      disabled={form.formState.isSubmitting}
                      autoFocus={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="email"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    <Trans i18nKey="email" defaults="Email" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      size="lg"
                      placeholder={t("emailPlaceholder")}
                      disabled={form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>
                    <Trans i18nKey="password" defaults="Password" />
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      size="lg"
                      placeholder="••••••••"
                      disabled={form.formState.isSubmitting}
                      type="password"
                    />
                  </FormControl>
                  <PasswordStrengthMeter
                    password={field.value}
                    className="mt-2"
                  />
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        {form.formState.errors.root?.message ? (
          <FormMessage>{form.formState.errors.root.message}</FormMessage>
        ) : null}
        <div className="mt-6">
          <Button
            loading={form.formState.isSubmitting}
            className="w-full"
            variant="primary"
            type="submit"
            size="lg"
          >
            <Trans i18nKey="continue" defaults="Continue" />
          </Button>
        </div>
      </form>
    </Form>
  );
}

/* */
