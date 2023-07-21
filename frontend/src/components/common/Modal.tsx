import {ReactNode} from "react";

interface props {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
  state: boolean;
  toggleState: () => void;
  posInit: string;
  posHidden: string;
  form: boolean;
  handleSubmit?: any;
}

export function Modal({header, body, footer, state, toggleState, posInit, posHidden, form, handleSubmit}: props) {
  const modal = (
    <>
      <div className={`task-modal-container 
        fixed flex flex-row
        h-screen w-screen
        top-12 left-0 bottom-0 right-0
        bg-slate-400 bg-opacity-10
        ${state ? posInit : posHidden}
        transition-opacity delay-0 duration-300
        `}>

        <div className={` task-modal-overlay w-1/4 md:w-full h-full`} onClick={toggleState}></div>

        <div className={` task-modal
          backdrop-blur bg-slate-200 bg-opacity-75
          h-full w-3/4 md:w-96
           ${state ? "-translate-x-0" : "translate-x-full opacity-0"}
           transition-transform delay-0 duration-300
           flex flex-col p-4 items-center gap-2`
        }>
          <div className={`modal-header flex flex-row items-center justify-between 
          bg-slate-400 bg-opacity-10 p-4 w-full rounded-lg`}>
            {header}
          </div>
          <div className={`modal-body flex flex-col items-center justify-between
                          bg-slate-400 bg-opacity-10 h-4/6 w-full p-2 rounded-lg`}>
            {body}
          </div>
          <div className={`modal-footer flex flex-row items-center justify-between 
          bg-slate-400 bg-opacity-10 p-4 w-full rounded-lg`}>
            {footer}
          </div>
        </div>
      </div>
    </>
  )
  if (form) {
    return (
      <form onSubmit={handleSubmit} method="post">
        {modal}
      </form>
    )
  }
  return modal;
}