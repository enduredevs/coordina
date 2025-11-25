import { cn } from "@coordina/ui";

export function PageContainer({
  children,
  className,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("mx-auto w-full p-4 md:px-8 md:py-6", className)}>
      {children}
    </div>
  );
}
