import Navigation from "../components/navigation/Navigation";

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-full items-center justify-center min-h-[75vh] mx-4 pt-8 lg:mx-0">
      {children}
    </main>
  );
}
