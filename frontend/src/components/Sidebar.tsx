import React from "react";
import SidebarButton from "./SidebarItem";
import {
  HomeIcon,
  FolderIcon,
  RectangleGroupIcon,
  CalendarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  MoonIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <div className="p-2 h-full">
      <nav className="flex flex-col justify-between h-full bg-teal-500 bg-opacity-40 rounded p-1 shadow-inner drop-shadow-lg">
        <div className="space-y-4 flex flex-col ">
          <SidebarButton label="Home">
            <HomeIcon />
          </SidebarButton>
          <SidebarButton label="Projects">
            <FolderIcon />
          </SidebarButton>
          <SidebarButton label="Tasks">
            <RectangleGroupIcon />
          </SidebarButton>
          <SidebarButton label="Calendar">
            <CalendarIcon />
          </SidebarButton>
        </div>
        <div className="space-y-4 flex flex-col">
          <SidebarButton label="Theme">
            <MoonIcon />
          </SidebarButton>{" "}
          <SidebarButton label="Settings">
            <Cog6ToothIcon />
          </SidebarButton>{" "}
          <SidebarButton label="Logout">
            <ArrowLeftOnRectangleIcon />
          </SidebarButton>
        </div>
      </nav>
      <span className="fixed top-2 left-2">
        <ChevronDoubleLeftIcon />
      </span>
    </div>
  );
}
