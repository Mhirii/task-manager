import {ReactNode} from "react";

interface props{
  children: ReactNode
}

export default function AuthForm({children}:props){
  return(
    <form action="" className={`bg-slate-200 p-4 rounded-lg shadow-lg flex flex-col items-center`}>
      {children}
    </form>
  )
}