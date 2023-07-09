import { ReactNode } from "react";

interface SidebarItemProps {
  icon?: ReactNode;
  label?: string;
  className?: string;
}


export default function SidebarItem({ icon, label, className }: SidebarItemProps) {
  let gap: string;
  if (icon === undefined || label === undefined) {
    gap = "gap-0";
  } else {
    gap = "gap-2";
  }
  console.log(gap);
  return (
    <li
      className={`flex flex-row items-center py-0 px-0 
          bg-transparent rounded-lg ${gap} ${className}
          `}
    >
      {icon}
      <p className="text-base font-medium text-slate-600">{label}</p>
    </li>
  );
}
