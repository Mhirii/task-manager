import {ReactNode} from "react";

interface SidebarItemProps {
		icon?: ReactNode;
		label?: string;
		className?: string;
}
export default function SidebarItem({ icon, label, className }: SidebarItemProps){
		return(
				<div
						className={`h-16 w-full rounded-lg hover:bg-slate-400
        	hover:bg-opacity-20 transition-all duration-300
        	flex flex-row gap-2 py-2 px-2
        	mb-2 hover:shadow-inner cursor-pointer
        	${className}`}>
						<div className={"flex flex-row justify-start items-center  gap-2"}>
						
						<div className={"w-12 text-slate-700 p-2 rounded-lg bg-slate-200 flex items-center justify-center"}>
								{icon}
						</div>
						<h2 className={"text-slate-700 text-lg font-medium capitalize"}>
								{label}
						</h2>
						</div>
				</div>
		)
}