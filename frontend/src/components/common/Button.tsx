import { ReactNode } from "react";

interface ButtonProps {
  icon?: ReactNode;
  label?: string;
  className?: string;
}

export default function Button({ icon, label, className }: ButtonProps) {
  let gap: string;
  if (icon === undefined || label === undefined) {
    gap = "gap-0";
  } else {
    gap = "gap-2";
  }
  console.log(gap);
  return (
    <button
      className={`flex flex-row items-center justify-between py-2 px-4 
        bg-lime-500 rounded-lg ${gap} ${className}
        `}
    >
      {icon}
      <p className="text-xl text-slate-100">{label}</p>
    </button>
  );
}
