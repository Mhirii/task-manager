import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./styles/index.css";
import Landing from "./routes/Landing.tsx";
import ErrorPage from "./error-page";
import Today from "./routes/Today.tsx";

import {Provider} from "react-redux";
import store from './store'
import LoginPage from "./routes/login.tsx";
import RegisterPage from "./routes/register.tsx";
import {AuthProvider} from "./context/AuthProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "today",
    element: <Today/>,
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
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
