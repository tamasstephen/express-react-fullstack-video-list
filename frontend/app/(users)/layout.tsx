export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-32">
      <div>{children}</div>
    </main>
  );
}
