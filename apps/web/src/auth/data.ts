import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { getUser } from "@/features/user/data";
import { getSession } from "@/lib/auth";

export const requireUser = cache(async () => {
  const session = await getSession();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";

  if (!session?.user || session.user.isGuest) {
    const searchParams = new URLSearchParams();
    searchParams.set("redirectTo", pathname);
    redirect(`/login?${searchParams.toString()}`);
  }

  return await getUser(session.user.id);
});
