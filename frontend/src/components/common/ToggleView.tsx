import {AppstoreOutlined, UnorderedListOutlined} from "@ant-design/icons";


interface props {
		view: string;
}

export default function ToggleView({view}: props) {
		return (
				<button className={`relative rounded-lg bg-slate-200 shadow-inner h-8 flex flex-row gap-2
				items-center justify-center self-end right-6`}>
						
						<div className={`
						absolute right-0 left-8 h-8 bg-slate-500 rounded-lg  z-0
						${(view === "Grid") ? "-translate-x-8" : "translate-x-0"}
						transition-transform duration-300 ease-in-out
						`}>
						</div>
						<div className={`pl-2 pr-1 z-10 `}>
								<AppstoreOutlined className={`text-lg pb-1
								${(view === "Grid") ? "text-slate-200 " : "text-slate-500 "} transition-colors duration-300 ease-in-out
								`}/>
						</div>
						<div className={`z-10 w-9`}>
								<h6 className={`text-slate-200 font-medium text-center`}>{view}</h6>
						</div>
						<div className={`pr-2 pl-1 flex items-center z-10`}>
								<UnorderedListOutlined className={`text-lg pb-1
									${(view === "Grid") ? "text-slate-500" : "text-slate-200 "} transition-colors duration-300 ease-in-out
								`}/>
						</div>
				
				</button>
		)
}