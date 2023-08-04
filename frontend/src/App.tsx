// import Navabar from "./components/Navbar";
import "./styles/App.css";
import {Routes, Route} from "react-router-dom"
import Layout from "./components/common/Layout.tsx";
import LoginPage from "./routes/login.tsx";
import RegisterPage from "./routes/register.tsx";
import Landing from "./routes/Landing.tsx";
import Today from "./routes/Today.tsx";
import RequireAuth from "./components/common/RequireAuth.tsx";
import {Activity} from "./routes/Activity.tsx";
import {AllTasks} from "./routes/AllTasks.tsx";
import {Upcoming} from "./routes/Upcoming.tsx";



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
          <Route path={"home"} element={<AllTasks/>}/>
          <Route path={"today"} element={<Today/>}/>
          <Route path={"upcoming"} element={<Upcoming/>}/>
          <Route path={"activity"} element={<Activity/>}/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
