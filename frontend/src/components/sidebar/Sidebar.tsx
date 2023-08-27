import SidebarItem from "./SidebarItem.tsx";
import SidebarUser from "./SidebarUser.tsx";
import SidebarProjects from "./sidebarProject/SidebarProjects.tsx";

import BarChartOutlined from "@ant-design/icons/BarChartOutlined";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import InboxOutlined from "@ant-design/icons/InboxOutlined";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import AppstoreOutlined from "@ant-design/icons/AppstoreOutlined";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store.ts";
import {useEffect} from "react";
import {fetchProjects} from "../../redux/actions/projectActions.ts";
import {toggleSidebar} from "../../redux/reducers/sidebarReducer.ts";

interface props {
  isSidebarOn: boolean;
  toggleSidebar: () => void;
  currentPage:string
}

export default function Sidebar({currentPage}: props) {
  
  const dispatch = useDispatch()
  
  const isSidebarOn = useSelector((state: any) => state.sidebar.value)
  const username: string = useSelector((state: RootState) => state.user.username || 'User')
  const accessToken = useSelector((state: any) => state.auth.accessToken);
  
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchProjects(username, accessToken));
  }, [dispatch, username, accessToken]);
  
  const projects = useSelector((state: any) => state.projects.projects)
  
  if(!projects) return;
  return (
    <div
      className={`
        flex h-full flex-row
    `}
    >
      <nav
        className={`
        w-2/3 sm:w-1/2 bg-slate-200 md:shadow-inner
        md:w-72 p-4 flex flex-col gap-1 h-full justify-between scroll-auto
      `}
      >
        <div>
          <SidebarUser icon={<UserOutlined className={"text-2xl text-slate-700"} href={'#'}/>} label={username}/>
          <SidebarItem active={currentPage==='All Tasks'} icon={<AppstoreOutlined className={"text-xl text-slate-700"} />} label={"All Tasks"} href={'/home'}/>
          <SidebarItem active={currentPage==='Today'} icon={<InboxOutlined className={"text-xl text-slate-700"} />} label={"Today"} href={'/today'}/>
          <SidebarItem active={currentPage==='Upcoming'} icon={<CalendarOutlined className={"text-xl text-slate-700"} />} label={"Upcoming"} href={'/upcoming'}/>
          <SidebarItem active={currentPage==='Activity'} icon={<BarChartOutlined className={"text-xl text-slate-700"} />} label={"Activity"} href={'/activity'}/>
          <SidebarProjects projects={projects}/>
        </div>
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
        onClick={()=>dispatch(toggleSidebar())}
      >
      </div>
    </div>
  );
}
