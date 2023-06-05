export default function Description({ description }: { description: string }) {
  return (
    <div className="w-full bg-slate-100 p-4 rounded-md">
      <p className="text-sm text-slate-500 capitalize font-medium mb-2">
        Description
      </p>
      <p className="">{description}</p>
    </div>
  );
}
