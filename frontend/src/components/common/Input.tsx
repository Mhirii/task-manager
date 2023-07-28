import React from "react";

interface props {
  type: string,
  id: string,
  name: string,
  onchange?: any,
  value?: any,
  isRequired: boolean,
  placeholder?: string,
  ariaInvalid?: boolean | "false" | "true" | "grammar" | "spelling" | undefined,
  onfocus?: React.FocusEventHandler<HTMLInputElement> | undefined,
  onblur?: React.FocusEventHandler<HTMLInputElement> | undefined,
  ariaDescribedBy?: string | undefined,
  reference?: React.LegacyRef<HTMLInputElement> | undefined
}

export default function Input({
                                type,
                                id,
                                name,
                                onchange,
                                value,
                                isRequired,
                                placeholder,
                                ariaInvalid,
                                onfocus,
                                onblur,
                                ariaDescribedBy,
                                reference
                              }: props) {
  return (
      <input
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        className=
          {`rounded-lg bg-slate-300 bg-opacity-20 shadow-inner p-2
                focus:outline-none border-2
                hover:bg-opacity-75
                focus:bg-opacity-100 focus:border-indigo-500
                transition-all duration-300`}
        onChange={onchange}
        value={value}
        autoComplete={"off"}
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedBy}
        onFocus={onfocus}
        onBlur={onblur}
        {...(isRequired ? { required: true } : {})}
        ref={reference}
      />
  )
}