import SidebarItem from "./SidebarItem.tsx";
import SidebarUser from "./SidebarUser.tsx";
import SidebarProjects from "./sidebarProject/SidebarProjects.tsx";
import projects from "../../dataSample/projects.json";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CalendarOutlined,
  InboxOutlined,
  LogoutOutlined,
  UserOutlined
} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";

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
  currentPage:string
}

export default function Sidebar({isSidebarOn, toggleSidebar, currentPage}: props) {
  const username: string = useSelector((state: RootState) => state.auth.username || 'User')
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
          <SidebarUser icon={<UserOutlined className={"text-2xl text-slate-700"} href={'#'}/>} label={username}/>
          <SidebarItem active={currentPage==='All Tasks'} icon={<AppstoreOutlined className={"text-xl text-slate-700"} />} label={"All Tasks"} href={'/home'}/>
          <SidebarItem active={currentPage==='Today'} icon={<InboxOutlined className={"text-xl text-slate-700"} />} label={"Today"} href={'today'}/>
          <SidebarItem active={currentPage==='Upcoming'} icon={<CalendarOutlined className={"text-xl text-slate-700"} />} label={"Upcoming"} href={'upcoming'}/>
          <SidebarItem active={currentPage==='Activity'} icon={<BarChartOutlined className={"text-xl text-slate-700"} />} label={"Activity"} href={'/activity'}/>
          <SidebarProjects data={projectData}/></div>
        <SidebarItem icon={<LogoutOutlined className={"text-xl text-slate-700"}/>} label={"Logout"} href={'/login'}
                     className={`relative bottom-12`} // all hell break loose if this is removed
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
