// import Navabar from "./components/Navbar";
import "./styles/App.css";
import Home from "./pages/Home";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SidebarItem from "./components/common/SidebarItem";
import { CalendarDaysIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  };
  return (
    <div className="flex flex-col">
      <Navbar currentPage="Home" onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar}>
        <ul className="flex flex-col gap-4 m-2">
          <SidebarItem
            label="All Tasks"
            icon={<Squares2X2Icon className="w-5 h-5 text-slate-800" />}
          />
          <SidebarItem
            label="Today"
            icon={<CalendarDaysIcon className="w-5 h-5 text-slate-800" />}
          />

        </ul>
        <div className="flex flex-col gap-4 m-3 ">
          <a className="text-lg font-medium text-slate-500">Projects</a>
        </div>
      </Sidebar>
      <div className="h-12 "></div>
      <Home />
      <div className="h-12 "></div>
    </div>
  );
}

export default App;
