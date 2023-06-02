export default function Div({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center w-72">
      {children}
    </div>
  );
}
