import { InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  htmlProps: InputHTMLAttributes<HTMLInputElement>;
  register: UseFormRegister<FieldValues>;
  isRequired: boolean;
  testProps: string;
  validate?: { [key: string]: any };
};

export default function Input({
  label,
  htmlProps,
  register,
  isRequired,
  validate,
  testProps,
}: InputProps) {
  const fileUploadStyle = htmlProps?.type === "file" ? "min-h-[2.5rem]" : "";
  return (
    <div className="flex flex-col w-72">
      <label className="text-sm mb-1 capitalize" htmlFor="email">
        {label}
      </label>
      <input
        className={`h-8 p-2 rounded-md border border-gray-400 w-full ${fileUploadStyle}`}
        {...htmlProps}
        {...register(label, { required: isRequired, ...validate })}
        data-cy={testProps}
      />
    </div>
  );
}
