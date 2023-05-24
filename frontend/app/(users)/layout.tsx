import Navigation from "../components/Navigation";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-full items-center justify-center min-h-[65vh]">
      {children}
    </main>
  );
}
