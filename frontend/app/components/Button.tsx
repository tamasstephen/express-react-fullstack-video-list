import { ButtonHTMLAttributes, MouseEventHandler } from "react";

type ButtonProps = {
  children: React.ReactNode;
  buttonType: "primary" | "secondary" | "primary-sm";
  testProps?: string;
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  cb?: MouseEventHandler<HTMLButtonElement>;
};

const buttonTypeClasses = {
  primary: "bg-slate-900 text-white p-2 font-medium hover:bg-slate-600 ",
  secondary: "bg-slate-600 text-white p-2 font-medium hover:bg-slate-600 ",
  "primary-sm": "bg-slate-900 text-white py-1 px-4 text-sm font-medium",
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
      className={`rounded-md  hover:-translate-y-[1px] transition-all duration-200 ease-in-out ${buttonTypeClasses[buttonType]}`}
      data-cy={testProps}
      {...(cb ? { onClick: cb } : {})}
      {...attributes}
    >
      {children}
    </button>
  );
}
