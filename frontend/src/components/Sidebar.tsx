import SidebarItem from "./sidebar/SidebarItem.tsx";
import SidebarUser from "./sidebar/SidebarUser.tsx";
import SidebarProjects from "./sidebar/SidebarProjects.tsx";
import projects from "../dataSample/projects.json";
import {CalendarOutlined, InboxOutlined, LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {RootState} from "../store.ts";

interface Project {
  _id: {
    $oid: string
  },
  title: string;
  desc: string;
  color: string;
  tasks: string[];
  dateAdded: {
    $date: string;
  }
}
interface props {
  isSidebarOn: boolean;
  toggleSidebar: () => void;
}
export default function Sidebar({ isSidebarOn, toggleSidebar }: props) {
  const username: string = useSelector((state:RootState) => state.auth.username || 'User')
  const projectData: Project[] = projects as Project[];
  return (
    <div
      className={`
        flex h-full flex-row
    `}
    >
      <nav
        className={`
        w-2/3 sm:w-1/2 bg-slate-200 md:shadow-inner
        md:w-72 p-4 flex flex-col gap-1 h-full justify-between
      `}
      >
        <div>
        <SidebarUser icon={<UserOutlined className={"text-2xl text-slate-700"}/>} label={username}  />
        <SidebarItem icon={<InboxOutlined className={"text-xl text-slate-700"}/>} label={"TodayPage"} />
        <SidebarItem icon={<CalendarOutlined className={"text-xl text-slate-700"}/>} label={"Upcoming"} />
        <SidebarProjects data={projectData}/></div>
        <SidebarItem icon={<LogoutOutlined className={"text-xl text-slate-700"}/>} label={"Logout"}
                     className={`relative bottom-12`} // component goes beyond view if you remove this
        />
      </nav>

      <div
        className={`
        overlay
        w-1/3
        sm:w-1/2
        bg-slate-400
        backdrop-brightness-0
        md:hidden
        ${isSidebarOn ? "opacity-5" : "opacity-0"}
        transition-opacity delay-100 duration-300
        `}
        onClick={toggleSidebar}
      >
      </div>
    </div>
  );
}
