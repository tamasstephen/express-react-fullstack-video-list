import { ButtonHTMLAttributes, MouseEventHandler } from "react";

type ButtonProps = {
  children: React.ReactNode;
  buttonType: "primary" | "secondary" | "primary-sm" | "link-sm" | "link";
  testProps?: string;
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  cb?: MouseEventHandler<HTMLButtonElement>;
};

const buttonTypeClasses = {
  primary:
    "bg-slate-900 text-white p-2 font-medium hover:bg-slate-600 hover:-translate-y-[1px] ",
  secondary:
    "border border-gray-300 text-zinc-700 p-2 font-medium hover:-translate-y-[1px] ",
  "primary-sm":
    "bg-slate-900 text-white py-1 px-4 text-sm font-medium hover:bg-slate-600",
  link: "text-slate-700 hover:text-slate-400 font-semibold mr-6",
  "link-sm": "text-slate-700 hover:text-slate-400 font-medium  text-sm mr-6 ",
};

export default function Button({
  children,
  buttonType,
  attributes,
  cb,
  testProps,
}: ButtonProps) {
  return (
    <button
      className={`flex items-center justify-center rounded-md transition-all duration-200 ease-in-out ${buttonTypeClasses[buttonType]}`}
      data-cy={testProps}
      {...(cb ? { onClick: cb } : {})}
      {...attributes}
    >
      {children}
    </button>
  );
}
