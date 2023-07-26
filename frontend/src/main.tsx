import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import Today from "./routes/today.tsx";
import Layout from "./pages/Layout.tsx";

import {Provider} from "react-redux";
import store from './store'
import LoginPage from "./routes/login.tsx";
import RegisterPage from "./routes/register.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "today",
    element: <Layout><Today/></Layout>,
  },
  {
    path: "login",
    element: <LoginPage/>,
  },
  {
    path: "register",
    element: <RegisterPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);
