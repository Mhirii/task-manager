import {ReactNode} from "react";

interface SidebarItemProps {
	icon?: ReactNode;
	label?: string;
	className?: string;
	href:string
	active?:boolean
}
export default function SidebarItem({ icon, label, className, href, active }: SidebarItemProps){
	return(
			<a href={href}
					className={`h-12 w-full rounded-lg ${active && "bg-slate-400 bg-opacity-10 shadow-inner"} hover:bg-slate-400 hover:bg-opacity-20 transition-all duration-300
        	flex flex-row gap-2 py-2 px-4 justify-start items-center cursor-pointer
        	${className}`}>
					<div className={"w-5 text-slate-700  "}>
							{icon}
					</div>
					<h3 className={"text-slate-700"}>
						{label}
				</h3>
			</a>
	)
}