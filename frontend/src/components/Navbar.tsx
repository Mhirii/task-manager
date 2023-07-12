import { MenuOutlined } from "@ant-design/icons";
interface NavbarProps {
  currentPage: string;
  onToggleSidebar: () => void;
}

export default function Navbar({ currentPage, onToggleSidebar }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 w-full h-12 backdrop-blur bg-slate-200 bg-opacity-75 z-50 flex flex-row justify-between items-center p-2">
      {/* <Bars3Icon
        className="h-8 w-8 text-slate-600 cursor-pointer"
        onClick={onToggleSidebar}
      /> */}
      <MenuOutlined
        rev={undefined}
        className="text-xl"
        onClick={onToggleSidebar}
      />
      <p className="text-lg font-medium text-slate-600">{currentPage}</p>
    </header>
  );
}
