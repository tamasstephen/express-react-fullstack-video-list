export default function Description({
  description,
  type,
}: {
  description: string;
  type: "normal" | "sm";
}) {
  if (type === "normal") {
    return (
      <div className="w-full bg-slate-100 p-4 rounded-md">
        <p
          data-cy="description"
          className="text-sm text-slate-500 capitalize font-medium mb-2"
        >
          Description
        </p>
        <p className="">{description}</p>
      </div>
    );
  } else {
    return <p className="text-sm text-zinc-700">{description}</p>;
  }
}
