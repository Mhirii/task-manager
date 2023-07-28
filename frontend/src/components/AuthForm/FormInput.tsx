import Label from "../common/Label.tsx";
import Input from "../common/Input.tsx";
import * as React from "react";
import {ChangeEventHandler} from "react";

interface props {
  type: string,
  label: string,
  id: string,
  name: string,
  onchange?: ChangeEventHandler<HTMLInputElement>,
  value?: string | number,
  isRequired: boolean,
  ariaInvalid?: boolean | "false" | "true" | "grammar" | "spelling" | undefined,
  placeholder?: string,
  onfocus?: React.FocusEventHandler<HTMLInputElement> | undefined,
  onblur?: React.FocusEventHandler<HTMLInputElement> | undefined,
  ariaDescribedBy?: string | undefined,
  reference?: React.LegacyRef<HTMLInputElement> | undefined
}

export default function FormInput({
                                    type,
                                    label,
                                    id,
                                    name,
                                    onchange,
                                    value,
                                    isRequired,
                                    ariaInvalid,
                                    placeholder,
                                    onfocus,
                                    onblur,
                                    ariaDescribedBy,
                                    reference
                                  }: props) {
  return (
    <div className={'email-input flex flex-col'}>
      <Label id={id} key={`${id}-label`}> {label} </Label>
      <Input id={id} key={`${id}-input`} name={name} type={type} placeholder={placeholder} onchange={onchange}
             value={value} isRequired={isRequired} ariaInvalid={ariaInvalid} ariaDescribedBy={ariaDescribedBy} onblur={onblur} onfocus={onfocus}
             reference={reference}
      />
    </div>
  )
}