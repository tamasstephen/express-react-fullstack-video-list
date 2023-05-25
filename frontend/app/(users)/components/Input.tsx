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
    <div className="flex flex-col">
      <label className="text-sm mb-1" htmlFor="email">
        {label}
      </label>
      <input
        className="h-8 p-2 rounded-md border border-gray-400"
        {...htmlProps}
        {...register(label, { required: isRequired, ...validate })}
      />
    </div>
  );
}
