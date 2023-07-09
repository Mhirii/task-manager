import { ReactNode } from "react";

interface SidebarProps {
  isOpen: boolean;
  children: ReactNode;
  onToggleSidebar: () => void;
}

export default function Sidebar({ isOpen, children, onToggleSidebar }: SidebarProps) {
  return (
    <div className={`
      fixed top-12 left-0 h-full w-full bg-slate-700 bg-opacity-20 shadow-lg z-10
      ${isOpen ? "opacity-100" : "opacity-0"} 
      transition-opacity duration-200 ease-in-out
      `}>
      <div
        // OVERLAY
        className={`
        sidebar fixed left-2/3 h-full w-1/3 z-10
        flex flex-col 
        ${isOpen ? "flex" : "hidden"}
      `}
        onClick={onToggleSidebar}
      >
      </div>
      <div
        // Actual Sidebar
        className={`
          sidebar fixed left-0 h-full w-2/3 backdrop-blur bg-slate-200 bg-opacity-75 shadow-lg z-10
          flex flex-col 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out z-30 
        `}
      >
        {children}
      </div>


    </div >
  );
};


