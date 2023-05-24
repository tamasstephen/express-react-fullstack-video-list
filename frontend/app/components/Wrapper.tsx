export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-screen-xl flex justify-center">{children}</div>
  );
}
