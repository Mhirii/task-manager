

interface Props{
		name: string,
		color: string,
		numberOfTasks: string,
		id: string,
		hoverState: boolean
		isProjectOpen : boolean
}


export default function SidebarProjectItem({ name, color, numberOfTasks, id, hoverState, isProjectOpen }: Props){

		const circle = " h-4 w-4  rounded-full bg-"+color+"-500 "
		return(
				<li className={`h-12 w-full rounded-lg hover:bg-slate-500 hover:bg-opacity-10 flex flex-row justify-between items-center
																				${isProjectOpen ? "" : "hidden"}
																		`}
								id={id}
				>
								<div className={"flex flex-row items-center px-2 w-full"}>
										<div className={circle}></div>
										<h6 className={"text-slate-700 ml-2"}>
												{name}
										</h6>
								</div>
								<p className={`font-light text-sm text-slate-600 px-2  transition-opacity duration-300
									${hoverState ? "opacity-100" : "opacity-0"}
								`}>
										{numberOfTasks}
								</p>
				</li>
		)
}