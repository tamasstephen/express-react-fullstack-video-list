export default function Heading({
  children,
  align,
}: {
  children: React.ReactNode;
  align?: "text-center" | "text-left" | "text-right";
}) {
  return (
    <h1
      className={`text-4xl font-bold text-center tracking-tighter mb-8 w-full ${align}`}
    >
      {children}
    </h1>
  );
}
