import {ReactNode} from "react";

interface SidebarItemProps {
	icon?: ReactNode;
	label?: string;
	className?: string;
}
export default function SidebarItem({ icon, label, className }: SidebarItemProps){
	return(
			<button
					className={`h-12 w-full rounded-lg hover:bg-slate-400 hover:bg-opacity-20 transition-all duration-300
        	flex flex-row gap-2 py-2 px-4 justify-start items-center cursor-pointer
        	${className}`}>
					<div className={"w-5 text-slate-700  "}>
							{icon}
					</div>
					<h3 className={"text-slate-700"}>
						{label}
				</h3>
			</button>
	)
}