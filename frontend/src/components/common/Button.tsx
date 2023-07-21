import {ReactNode} from "react";
import "../../styles/button.css";
interface ButtonProps {
  icon?: ReactNode;
  label?: string;
  className?: string;
  variant?: string;
  onClick?: (id: string | undefined) => void;
  id?: string;
}

export default function Button({ icon, label, className, variant,onClick, id}: ButtonProps) {

  let gap: string;
  if (icon === undefined || label === undefined) {
    gap = "gap-0";
  } else {
    gap = "gap-2";
  }
  let variantStyle: string = "btn-primary"
  if(variant === "danger" ){
    variantStyle = "btn-danger"
  }
  else if(variant === "confirm" ){
    variantStyle = "btn-confirm"
  }
  else if(variant === "transparent" ){
    variantStyle = "btn-transparent"
  }
  else if(variant === "ghost" ){
    variantStyle = "btn-ghost"
  }

  return (
    <button
      className={`flex flex-row items-center justify-between py-2 px-4  
        ${variantStyle} rounded-lg ${gap} ${className}
      `}
      onClick={()=> onClick ? onClick(id) : null}
    >
      {icon}
      <p className={`text-xl ${variantStyle}`}>{label}</p>
    </button>
  );
}
