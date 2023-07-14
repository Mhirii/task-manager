import {FolderIcon, ChevronDownIcon, PlusIcon} from "@heroicons/react/24/solid";
import { useState } from "react";
import SidebarProjectItem from "./SidebarProjectItem.tsx";


interface Project {
		_id: {
				$oid: string
		},
		title: string;
		desc: string;
		color: string;
		tasks: string[];
		dateAdded: {
				$date: string;
		}
}

interface SidebarProjectsProps {
		data: Project[]
}

export default function SidebarProjects({data}:SidebarProjectsProps){
		const [isProjectOpen, setProject] = useState(true);
		const [isProjectHovered, setProjectHover] = useState(false);
		
		const toggleProject = () => {
				setProject((previsprojectopen) => !previsprojectopen);
		};
		const toggleProjectHover = () => {
				setProjectHover((previsprojecthover) => !previsprojecthover);
		};
		
		return (
				<div className={"w-full rounded-lg hover:bg-slate-500 hover:bg-opacity-10 flex flex-col items-start justify-start "}
									onMouseEnter={toggleProjectHover} onMouseLeave={toggleProjectHover}
				>
						<div
								className={`h-12 w-full rounded-lg hover:bg-slate-500 hover:bg-opacity-5 hover:shadow
								transition-all duration-300 cursor-pointer  flex flex-row-reverse justify-between`} >
								
								<div className={`flex flex-row gap-0 items-center px-1
										${isProjectHovered ? "text-slate-700" : "text-slate-500"}
								`}>
										<div className={`
										w-10 z-10 hover:bg-slate-500 hover:bg-opacity-10 p-2 rounded-lg transition-all duration-300 opacity-100
										${isProjectOpen ? "inline opacity-0" : "hidden" }
										`}>
												<PlusIcon className={``}/>
										</div>
										<div className={`w-10  z-10 hover:bg-slate-500 hover:bg-opacity-10 p-2 rounded-lg `}>
												<ChevronDownIcon className={`${isProjectOpen ? "rotate-0" : "rotate-180" } transition-all duration-300 `}
																														onClick={toggleProject}/>
										</div>
								</div>
								
								<div className={"flex flex-row gap-2 justify-start items-center py-3 px-4 w-full"}
													onClick={toggleProject}>
										
										<div className={"w-5 text-slate-700  "} >
												<FolderIcon/>
										</div>
										
										<h2 className={"text-slate-700 "}>
												Projects
										</h2>
										
								</div>
								
						</div>
						
						{/*		project list*/}
						<div className={`
																								transition-all duration-300 ease-in-out w-full
																								${isProjectOpen ? "opacity-100" : " opacity-0"}
																					`}
						>
								<ul className={`
																								w-full rounded-lg transition-all duration-300 cursor-pointer flex flex-col items-center gap-2
																								list-disc list-inside
																								${isProjectOpen ? " p-4 pt-2 opacity-100" : "h-0 opacity-0" }
																						`}
								>
										{
												data.map((project: Project) => (
														<SidebarProjectItem
																id={project._id.$oid}
																name={project.title}
																color={project.color}
																numberOfTasks={project.tasks.length.toString()}
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
