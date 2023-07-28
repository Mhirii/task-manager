import React from "react";

interface Props {
  id: string,
  className?: string
  style?: React.CSSProperties
}

export default function Label({ children, id, className, style}: React.PropsWithChildren<Props>) {
  return (
      <label
        htmlFor={id}
        className={`text-base font-medium text-slate-700 ${className || ''}`}
        style={style}
      >
        {children}
      </label>
  )
}