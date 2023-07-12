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
        w-2/3 bg-slate-300 p-1 shadow-inner
        sm:w-72
      `}
      >
        <h4>Today</h4>
        <h4>upcomming</h4>
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
