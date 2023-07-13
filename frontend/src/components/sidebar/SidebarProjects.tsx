import {FolderIcon, ChevronDownIcon, PlusIcon} from "@heroicons/react/24/solid";
import { useState } from "react";

export default function SidebarProjects(){
		const [isProjectOpen, setProject] = useState(true);
		const [isProjectHovered, setProjectHover] = useState(false);
		
		const toggleProject = () => {
				setProject((previsprojectopen) => !previsprojectopen);
		};
		const toggleProjectHover = () => {
				setProjectHover((previsprojecthover) => !previsprojecthover);
		};
		return (
				<div>
						<div
								className={`h-12 w-full rounded-lg hover:bg-slate-500
											hover:bg-opacity-10 transition-all duration-300
												cursor-pointer  flex flex-row-reverse justify-between
											`}  onMouseEnter={toggleProjectHover} onMouseLeave={toggleProjectHover}>
										<div className={"flex flex-row gap-0 items-center px-1"}>
												<div className={`w-10 text-slate-700 z-10 hover:bg-slate-500 hover:bg-opacity-10 p-2 rounded-lg
														${isProjectOpen ? "inline opacity-0" : "hidden" }
														${isProjectHovered ? "opacity-100" : "opacity-60"}
														transition-opacity duration-500
														`}>
												<PlusIcon className={""}/>
										</div>
										<div className={"w-10 text-slate-700 z-10 hover:bg-slate-500 hover:bg-opacity-10 p-2 rounded-lg"}>
												<ChevronDownIcon className={`
														${isProjectOpen ? "rotate-0" : "rotate-180" }
														transition-transform duration-300
														
											`}onClick={toggleProject}/>
										</div>
								
								</div>
								<div className={"flex flex-row gap-2 justify-start items-center py-3 px-4 w-full"
								} onClick={toggleProject}>
										<div className={"w-5 text-slate-700  "} >
												<FolderIcon/>
										</div>
										<h2 className={"text-slate-700 "}>
												Projects
										</h2>
								</div>
						</div>
						
				{/*		project list*/}
				</div>
		)
}
