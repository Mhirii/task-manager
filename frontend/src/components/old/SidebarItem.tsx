import React, { ReactNode } from "react";

interface SidebarButtonProps {
  children: ReactNode;
  label: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ children, label }) => {
  return (
    <button className="sidebar-item" title={label}>
      {children}
      {/* <span className="button-label">{label}</span> */}
    </button>
  );
};

export default SidebarButton;
