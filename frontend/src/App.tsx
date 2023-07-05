import Navabar from "./components/Navbar";
import "./styles/App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="flex flex-col">
      <Navabar currentPage="Home" />
      <div className="h-12 "></div>

      <Home />
      <div className="h-12 "></div>
    </div>
  );
}

export default App;
