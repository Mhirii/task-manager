// import Navabar from "./components/Navbar";
import "./styles/App.css";
import { useState } from "react";
import Today from "./routes/Today.tsx";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./styles/sidebar.css";

interface userPreferences{
 theme : string
 view : string;
 layout: string;
}

function App() {
 
 const [isSidebarOn, setSidebar] = useState(false);
  const toggleSidebar = () => {
    setSidebar((previssidebaron) => !previssidebaron);
  };
  
 const userPref : userPreferences = {theme: "Light", view : "List", layout : "Default"}
 const [view, setView] = useState(userPref.view);
  const toggleView = () => {
    (view === "List") ? setView("Grid") :setView("List")
  };

  return (
    <>

    </>
  );
}

export default App;
