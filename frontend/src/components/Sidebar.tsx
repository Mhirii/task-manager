import SidebarItem from "./sidebar/SidebarItem.tsx";
import SidebarUser from "./sidebar/SidebarUser.tsx";
import SidebarProjects from "./sidebar/SidebarProjects.tsx";
import projects from "../dataSample/projects.json";
import {CalendarOutlined, InboxOutlined, UserOutlined} from "@ant-design/icons";
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
        md:w-72 p-4 flex flex-col gap-1
      `}
      >
        <SidebarUser icon={<UserOutlined className={"text-2xl text-slate-700"}/>} label={"username"}  />
        <SidebarItem icon={<InboxOutlined className={"text-xl text-slate-700"}/>} label={"TodayPage"} />
        <SidebarItem icon={<CalendarOutlined className={"text-xl text-slate-700"}/>} label={"Upcoming"} />
        <SidebarProjects data={projectData}/>
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
      ></div>
    </div>
  );
}
