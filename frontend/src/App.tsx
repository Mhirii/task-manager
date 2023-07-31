// import Navabar from "./components/Navbar";
import "./styles/App.css";
import {Routes, Route} from "react-router-dom"
import Layout from "./components/Layout.tsx";
import LoginPage from "./routes/login.tsx";
import RegisterPage from "./routes/register.tsx";
import Landing from "./routes/Landing.tsx";
import Today from "./routes/Today.tsx";
import RequireAuth from "./components/RequireAuth.tsx";


function App() {
  
  return (
    <Routes>
      <Route path={"/"} element={<Layout/>}>
        {/*Public*/}
        <Route path={""} element={<Landing/>}/>
        <Route path={"login"} element={<LoginPage/>}/>
        <Route path={"register"} element={<RegisterPage/>}/>
        {/*Protected*/}
        <Route element={<RequireAuth/>}>
          <Route path={"today"} element={<Today/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
