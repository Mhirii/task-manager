import Sidebar from "./components/Sidebar";
import "./styles/App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex">
      <div className="h-screen sticky top-0">
        <Sidebar />
      </div>
      <Home />
    </div>
  );
}

export default App;
