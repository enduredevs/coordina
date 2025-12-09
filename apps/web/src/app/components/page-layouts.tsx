import { cn } from "@coordina/ui";
import { SidebarTrigger } from "@coordina/ui/sidebar";

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


export function PageHeader({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {

  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
    {children}
    </div>
  );
}


export function PageTitle({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {

  return (
    <div className={cn("flex items-center gap-3 truncate font-semibold text-foreground text-lg tracking-tight", className)}>
    
    <SidebarTrigger className="md:hidden" />
    {children}
    </div>
  );
}



export function PageContent({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {

  return (
    <div className={cn("mt-4 md:mt-6 md:grow", className)}>
    {children}
    </div>
  );
}