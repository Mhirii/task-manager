

interface Props{
		name: string,
		color: string,
		numberOfTasks: string,
		id: string,
		hoverState: boolean
		isProjectOpen : boolean
}


export default function SidebarProjectItem({ name, color, numberOfTasks, id, hoverState, isProjectOpen }: Props){
	
		return(
				<li className={`h-12 w-full rounded-lg hover:bg-slate-400 hover:bg-opacity-20 flex flex-row justify-between items-center
																				${isProjectOpen ? "" : "hidden"}
																		`}
								id={id}
				>
								<div className={"flex flex-row items-center px-2 w-full"}>
										<div className={`${color}-active h-4 w-4  rounded-full`}></div>
										<h6 className={"text-slate-700 ml-2"}>
												{name}
										</h6>
								</div>
								<p className={`font-medium text-sm text-slate-500  px-4  transition-opacity duration-300
									${hoverState ? "opacity-70" : "opacity-0"}
								`}>
										{numberOfTasks}
								</p>
				</li>
		)
}