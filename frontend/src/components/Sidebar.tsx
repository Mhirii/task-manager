import SidebarItem from "./sidebar/SidebarItem.tsx";
import SidebarUser from "./sidebar/SidebarUser.tsx";
import {CalendarIcon, InboxIcon, UserIcon} from "@heroicons/react/24/solid";
import SidebarProjects from "./sidebar/SidebarProjects.tsx";

interface props {
  isSidebarOn: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isSidebarOn, toggleSidebar }: props) {
  return (
    <div
      className={`
        flex h-full flex-row
    `}
    >
      <nav
        className={`
        w-2/3 bg-slate-300 shadow-inner
        sm:w-72 p-4 flex flex-col gap-1
      `}
      >
        <SidebarUser icon={<UserIcon className={"w-6 h-6"}/>} label={"username"}  />
        <SidebarItem icon={<InboxIcon />} label={"Today"} />
        <SidebarItem icon={<CalendarIcon />} label={"Upcomming"} />
        <SidebarProjects/>
      </nav>

      <div
        className={`
        overlay
        w-1/3
        bg-slate-400
        backdrop-brightness-0
        sm:hidden
        ${isSidebarOn ? "opacity-5" : "opacity-0"}
        transition-opacity delay-100 duration-300
        `}
        onClick={toggleSidebar}
      ></div>
    </div>
  );
}
