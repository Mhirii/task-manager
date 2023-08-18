// import Navabar from "./components/Navbar";
import "./styles/App.css";
import {Routes, Route} from "react-router-dom"
import RequireAuth from "./components/common/RequireAuth.tsx";
import React from "react";

const Landing = React.lazy(() => import('./routes/Landing.tsx'))
const Layout = React.lazy(() => import('./components/common/Layout.tsx'))
const LoginPage = React.lazy(() => import('./routes/login.tsx'))
const RegisterPage = React.lazy(() => import('./routes/register.tsx'))
const Activity = React.lazy(() => import('./routes/Activity.tsx'))
const AllTasks = React.lazy(() => import('./routes/AllTasks.tsx'))
const Upcoming = React.lazy(() => import('./routes/Upcoming.tsx'))
const Today = React.lazy(() => import('./routes/Today.tsx'))

function App() {
  
  return (
    <Routes>
      <Route path={"/"} element={<Layout/>}>
        {/*Public*/}
        <Route path={""} element={
          <React.Suspense fallback={<>...</>}>
            <Landing/>
          </React.Suspense>
        }/>
        <Route path={"login"} element={
          <React.Suspense fallback={<>...</>}>
            <LoginPage/>
          </React.Suspense>
        }/>
        <Route path={"register"} element={
          <React.Suspense fallback={<>...</>}>
            <RegisterPage/>
          </React.Suspense>
        }/>
        {/*Protected*/}
        <Route element={<RequireAuth/>}>
          <Route path={"home"} element={
            <React.Suspense fallback={<>...</>}>
              <AllTasks/>
            </React.Suspense>
          }/>
          <Route path={"today"} element={
            <React.Suspense fallback={<>...</>}>
              <Today/>
            </React.Suspense>
          }/>
          <Route path={"upcoming"} element={
            <React.Suspense fallback={<>...</>}>
              <Upcoming/>
            </React.Suspense>
          }/>
          <Route path={"activity"} element={
            <React.Suspense fallback={<>...</>}>
              <Activity/>
            </React.Suspense>
          }/>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
