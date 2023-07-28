import {FormEventHandler, ReactNode} from "react";

interface props{
  children: ReactNode,
  action?:string,
  method?:string
  onsubmit?:  FormEventHandler<HTMLFormElement>
}

export default function AuthForm({children, onsubmit }:props,){
  return(
    <form onSubmit={onsubmit} className={`bg-slate-200 px-8 py-4 rounded-lg shadow-lg flex flex-col items-center`}>
      {children}
    </form>
  )
}