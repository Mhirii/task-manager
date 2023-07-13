import {ReactNode} from "react";

interface SidebarItemProps {
		icon?: ReactNode;
		label?: string;
		className?: string;
}
export default function SidebarItem({ icon, label, className }: SidebarItemProps){
		return(
				<div
						className={`h-16 w-full rounded-lg hover:bg-slate-500
        	hover:bg-opacity-10 transition-all duration-300
        	flex flex-row gap-2 py-2 px-2
        	mb-2 hover:shadow-inner cursor-pointer
        	${className}`}>
						<div className={"flex felx-row justify-start items-center  gap-2"}>
						
						<div className={"w-10 text-slate-700 p-2 rounded-lg bg-slate-300 "}>
								{icon}
						</div>
						<h2 className={"text-slate-700 text-lg font-medium "}>
								{label}
						</h2>
						</div>
				</div>
		)
}