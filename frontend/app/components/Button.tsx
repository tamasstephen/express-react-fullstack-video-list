import { ButtonHTMLAttributes, MouseEventHandler } from "react";

type ButtonProps = {
  children: React.ReactNode;
  attributes?: ButtonHTMLAttributes<HTMLButtonElement>;
  cb?: MouseEventHandler<HTMLButtonElement>;
};

export default function Button({ children, attributes, cb }: ButtonProps) {
  return (
    <button
      className="bg-slate-900 text-white rounded-md p-2 font-medium hover:bg-slate-600 hover:-translate-y-[1px] transition-all duration-200 ease-in-out"
      {...(cb ? { onClick: cb } : {})}
      {...attributes}
    >
      {children}
    </button>
  );
}
