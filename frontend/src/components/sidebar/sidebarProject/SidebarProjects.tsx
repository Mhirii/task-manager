import {useState} from "react";
import SidebarProjectItem from "./SidebarProjectItem.tsx";
import {CaretDownOutlined, FolderOpenOutlined, FolderOutlined, PlusOutlined} from "@ant-design/icons";
import SidebarAddProject from "./SidebarAddProject.tsx";
import Project from "../../../interfaces/ProjectInterface.ts";

interface Props{
  projects: Project[]
}

export default function SidebarProjects({projects} :Props) {
  
  const [isProjectOpen, setProject] = useState(true);
  const [isProjectHovered, setProjectHover] = useState(false);
  const [addProjectOpen, setAddProjectOpen] = useState(false)
  
  
  const toggleProject = () => {
    setProject((previsprojectopen) => !previsprojectopen);
    if (addProjectOpen) {
      setAddProjectOpen(false)
    }
  };
  const toggleProjectHover = () => {
    setProjectHover((previsprojecthover) => !previsprojecthover);
  };
  
  const toggleAddProject = () => {
    setAddProjectOpen((prev) => !prev)
  }
  if (!projects) return
  
  return (
    <div className={`w-full rounded-lg hover:bg-slate-400 hover:bg-opacity-20 flex flex-col items-start justify-start
				`}
         onMouseEnter={toggleProjectHover} onMouseLeave={toggleProjectHover}
    >
      <div
        className={`h-12 w-full rounded-lg hover:bg-slate-400
								transition-all duration-300 cursor-pointer flex flex-row-reverse justify-between
								${isProjectOpen ? " hover:shadow  hover:bg-opacity-5 rounded-b-none " : "hover:bg-opacity-5"}`}>
        
        <div className={`flex flex-row gap-0 items-center px-1`}>
          <button onClick={toggleAddProject} className={`
										w-10 h-10 z-10 hover:bg-slate-400 hover:bg-opacity-20 p-2 rounded-lg transition-all duration-300 opacity-100 flex items-center justify-center
										${isProjectOpen ? "inline opacity-0" : "hidden"}
										`}>
            <PlusOutlined className={`transition-all duration-300 text-lg pb-1
																						${isProjectHovered ? "text-slate-600 opacity-70" : "text-slate-500 opacity-50"}`}/>
          </button>
          <button
            className={`w-10 h-10 z-10 hover:bg-slate-400 hover:bg-opacity-20 p-2 rounded-lg flex items-center justify-center`}
            onClick={toggleProject}>
            <CaretDownOutlined className={`${isProjectOpen ? "rotate-0 pb-1" : "rotate-180 pb-0"} transition-all duration-300 text-xl text-center
																						${isProjectHovered ? "text-slate-600 opacity-70" : "text-slate-500 opacity-50"}`}/>
          </button>
        </div>
        
        <div className={"flex flex-row gap-2 justify-start items-center py-3 px-4 w-full"}
             onClick={toggleProject}>
          
          <div className={`${isProjectOpen ? "hidden" : "inline"} `}>
            <FolderOutlined className={"text-xl text-slate-700 "}/>
          </div>
          <div className={`${isProjectOpen ? "inline" : "hidden"} `}>
            <FolderOpenOutlined className={"text-xl text-slate-700 "}/>
          </div>
          
          <h2 className={"text-slate-700 "}>
            Projects
          </h2>
        
        </div>
      </div>
      {/*		project list*/}
      <div className={`
																								transition-all duration-300 ease-in-out w-full shadow-transparent shadow-inner  rounded-b-lg
																								${isProjectOpen ? "opacity-100" : " opacity-0"}
																								
																					`}
      >
        
        <ul className={`
																								w-full rounded-lg transition-all duration-300 cursor-pointer flex flex-col items-center gap-2
																								list-disc list-inside
																								${isProjectOpen ? " p-4 pt-2 opacity-100" : "h-0 opacity-0"}
																						`}
        >
          {addProjectOpen ? (
            <SidebarAddProject toggle={toggleAddProject} setAddProject={setAddProjectOpen}
                               className={`${addProjectOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} transition-all duration-300`}/>
          ) : (<></>)}
          
          {
            projects.map((project: Project) => (
              <SidebarProjectItem
                key={project._id}
                id={(project._id)? project._id : ''}
                name={project.title}
                color={project.color}
                numberOfTasks={
                  (project.tasks)?(
                    project.tasks.length.toString()
                  ):("none")
                }
                hoverState={isProjectHovered}
                isProjectOpen={isProjectOpen}
              />
            ))
          }
        </ul>
      </div>
    </div>
  )
}
