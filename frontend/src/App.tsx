// import Navabar from "./components/Navbar";
import "./styles/App.css";
import { useState } from "react";
import Today from "./pages/Today";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./styles/sidebar.css";

function App() {
  const [isSidebarOn, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((previssidebaron) => !previssidebaron);
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 ">
        <Navbar currentPage="Home" onToggleSidebar={toggleSidebar} />
      </div>
      <div className="mb-12"></div>
      <div
        className={`
          sidebar
          ${isSidebarOn ? "-translate-x-0" : "-translate-x-full"}
          transition-transform  duration-200 ease-in-out z-30
          `}
      >
        <Sidebar isSidebarOn={isSidebarOn} toggleSidebar={toggleSidebar} />
      </div>
      <div
        className={`
          ${isSidebarOn ? "w-72" : "w-0"}
          hidden  transition-all duration-200
          ease-in-out sm:inline
        `}
      >
        {" "}
        <div
          className={`
            w-72
        `}
        ></div>
      </div>
      <div className="flex w-full flex-row">
        <div
          className={`
          ${isSidebarOn ? "w-72" : "w-0"}
          hidden  transition-all duration-200
          ease-in-out sm:inline
        `}
        >
          {" "}
          <div
            className={`
            w-72
        `}
          ></div>
        </div>
        <Today />
      </div>
    </>
  );
}

export default App;
