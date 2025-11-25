export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-dvh flex-col items-center justify-center bg-gray-100">
      <div className="z-10 flex w-full flex-1 bg-white lg:p-4">
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="my-auto">
            <div className="mx-auto w-full max-w-sm">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
