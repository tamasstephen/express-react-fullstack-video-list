import { InputHTMLAttributes } from "react";

export default function Input({
  label,
  htmlProps,
}: {
  label: string;
  htmlProps: InputHTMLAttributes<HTMLInputElement>;
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1" htmlFor="email">
        {label}
      </label>
      <input
        className="h-8 p-2 rounded-md border border-gray-400"
        {...htmlProps}
      />
    </div>
  );
}
