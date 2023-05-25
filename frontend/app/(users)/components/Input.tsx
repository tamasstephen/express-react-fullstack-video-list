import { InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  htmlProps: InputHTMLAttributes<HTMLInputElement>;
  register: UseFormRegister<FieldValues>;
  isRequired: boolean;
  validate?: { [key: string]: any };
};

export default function Input({
  label,
  htmlProps,
  register,
  isRequired,
  validate,
}: InputProps) {
  return (
    <div className="flex flex-col w-72">
      <label className="text-sm mb-1 capitalize" htmlFor="email">
        {label}
      </label>
      <input
        className="h-8 p-2 rounded-md border border-gray-400 w-full"
        {...htmlProps}
        {...register(label, { required: isRequired, ...validate })}
      />
    </div>
  );
}
