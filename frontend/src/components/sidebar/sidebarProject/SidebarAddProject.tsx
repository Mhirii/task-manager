import Button from "../../common/Button.tsx";
import Input from "../../common/Input.tsx";
import SidebarProjectRadio from "./SidebarProjectRadio.tsx";
import {useState} from "react";


interface Props{
  className?: string
  toggle?:any
  setAddProject?:any
}

const SidebarAddProject = ({className, toggle,setAddProject}:Props) => {
  
  const [projectName, setProjectName] = useState('')
  const [color, setColor] = useState('purple')
  
  return (
    
    <div className={className}>
      <form action="" onSubmit={(e) => {
        e.preventDefault()
        console.log('project name: ',projectName, 'color: ',color)
        setAddProject((prev:any) => !prev)
      }}
            className={`cursor-auto p-2 gap-2 h-fit w-full rounded-lg hover:shadow-inner flex flex-col justify-between items-center`}>
        <h6 className={"text-slate-700 font-medium ml-2"}>New Project</h6>
        
        <div className={"flex flex-row items-center justify-center w-full"}>
          <Input id={'new-project'} type={'text'} name={'new-project'} className={'w-full border-0'}
                 placeholder={'Project Name'} isRequired={true} onchange={(e:any) => setProjectName((e.target.value))}/>
        </div>
        <div className={`flex justify-between items-center w-full gap-2`}>
          <h6>Color: </h6>
          <div className={`flex justify-around items-center w-full`}>
            <div onClick={() => {
              setColor('purple')
            }}>
              <SidebarProjectRadio color={"purple"} selected={color === "purple"}/>
            </div>
            <div onClick={() => {
              setColor('blue')
            }}>
              <SidebarProjectRadio color={"blue"} selected={color === "blue"}/>
            </div>
            <div onClick={() => {
              setColor('cyan')
            }}>
              <SidebarProjectRadio color={"cyan"} selected={color === "cyan"}/>
            </div>
            <div onClick={() => {
              setColor('green')
            }}>
              <SidebarProjectRadio color={"green"} selected={color === "green"}/>
            </div>
            <div onClick={() => {
              setColor('yellow')
            }}>
              <SidebarProjectRadio color={"yellow"} selected={color === "yellow"}/>
            </div>
            <div onClick={() => {
              setColor('orange')
            }}>
              <SidebarProjectRadio color={"orange"} selected={color === "orange"}/>
            </div>
            
          </div>
        </div>
        <div className={'flex justify-between items-center w-full'}>
          <Button label={'Cancel'} type={'reset'} variant={'ghost'} onClick={toggle}/>
          <Button label={'Add'} type={'submit'} variant={'confirm'}/>
        </div>
      </form>
      <div className={`border-t-2 border-slate-300 border-opacity-50 h-1 w-full`}></div>
    </div>
  )
}

export default SidebarAddProject