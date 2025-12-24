import { Input } from "@coordina/ui/input";
import React from "react";

const InputOTP = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof Input> & {
    onValidCode?: (code: string) => void;
  }
>(({ onValidCode, onChange, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      onChange={(e) => {
        onChange?.(e);

        if (e.target.value.length === 6) {
          onValidCode?.(e.target.value);
        }
      }}
      maxLength={6}
      data-1p-ignore
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="\d{6}"
    />
  );
});

InputOTP.displayName = "InputOTP";
export { InputOTP };
