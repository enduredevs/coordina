import { requireUser } from "@/auth/data";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = await Promise.all([requireUser()]);

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
