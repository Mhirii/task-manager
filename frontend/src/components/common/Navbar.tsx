import MenuOutlined from "@ant-design/icons/MenuOutlined";
import ToggleView from "./ToggleView.tsx";
import {useSelector, useDispatch} from "react-redux";
import {changeView} from "../../redux/reducers/viewReducer.ts"
import {toggleSidebar} from "../../redux/reducers/sidebarReducer.ts";


interface NavbarProps {
  currentPage: string;
  onToggleSidebar: () => void;
  view?: string;
  toggleView?: () => void;
  showView: boolean
}


export default function Navbar({currentPage, showView}: NavbarProps) {
  // @ts-ignore
  const view = useSelector((state) => state.view.value)
  const dispatch = useDispatch()
  // const sidebar = useSelector((state: any) => state.sidebar.value)
  
  return (
    
    <header
      className="fixed top-0 left-0 w-full h-12 backdrop-blur bg-slate-200 bg-opacity-75
						z-50 flex flex-row justify-between items-center p-2">
      
      <div className={`flex items-center gap-2`}>
        <button className={"w-8 h-8 flex items-center justify-center"} onClick={()=>dispatch(toggleSidebar())} role={'togglesSidebar'}>
          <MenuOutlined rev={undefined} className="text-lg"/>
        </button>
        <p className="text-lg font-medium text-slate-600">{currentPage}</p>
      </div>
      
      <div className={`flex flex-row-reverse items-center relative right-4`}>
        
        <div className={`flex flex-row`}>
          <button className={"w-8 h-8 flex items-center justify-center "} onClick={() => {
            dispatch(changeView())
          }}>
            {showView? <ToggleView view={view}/>:<></>}
          </button>
        </div>
      </div>
    </header>
  );
}
