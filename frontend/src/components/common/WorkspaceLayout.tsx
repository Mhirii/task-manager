// import Navabar from "./components/Navbar";
import "../../styles/App.css";
import {useState} from "react";
import Navbar from "./Navbar.tsx";
import Sidebar from "../sidebar/Sidebar.tsx";
import "../../styles/sidebar.css";
import {useDispatch, useSelector} from "react-redux";

interface userPreferences {
  theme: string
  view: string;
  layout: string;
}


interface Props {
  currentPage: string
  children: any
  showView: boolean
}

export default function WorkspaceLayout({currentPage, children, showView}: Props) {
  
  const dispatch = useDispatch()
  // const [isSidebarOn, setSidebar] = useState(false);
  const isSidebarOn = useSelector((state: any) => state.sidebar.value)
  
  const toggleSidebar = () => {
    // setSidebar((previssidebaron) => !previssidebaron);
    isSidebarOn
      ? dispatch({
        type: "OPEN_SIDEBAR",
      })
      : dispatch({
        type: "CLOSE_SIDEBAR",
      })
  };
  
  const userPref: userPreferences = {theme: "Light", view: "List", layout: "Default"}
  const [view, setView] = useState(userPref.view);
  const toggleView = () => {
    (view === "List") ? setView("Grid") : setView("List")
  };
  
  return (
    <>
      <div className="fixed top-0 left-0 right-0 ">
        <Navbar currentPage={currentPage} showView={showView} onToggleSidebar={toggleSidebar} view={view}
                toggleView={toggleView}/>
      </div>
      <div className="mb-12"></div>
      <div
        className={`
          sidebar
          ${isSidebarOn ? "-translate-x-0" : "-translate-x-full"}
          transition-transform  duration-200 ease-in-out z-30
          `}
      >
        <Sidebar isSidebarOn={isSidebarOn} toggleSidebar={toggleSidebar} currentPage={currentPage}/>
      </div>
      <div className={`${isSidebarOn ? "w-72" : "w-0"} hidden  transition-all duration-200 ease-in-out md:inline`}>
        {" "}
        <div
          className={`
            w-72
        `}
        ></div>
      </div>
      <div className="flex w-full flex-row">
        <div
          className={`
          ${isSidebarOn ? "w-72" : "w-0"}
          hidden  transition-all duration-200
          ease-in-out md:inline
        `}
        >
          {" "}
          <div
            className={`
            w-72
        `}
          ></div>
        </div>
        {/*@ts-ignore*/}
        {children}
      </div>
    </>
  );
}

