import React from "react";
import * as ReactDOM from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./styles/index.css";

import {Provider} from "react-redux";
import store from './store'
import {AuthProvider} from "./context/AuthProvider.tsx";
import App from "./App.tsx";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <Routes>
            <Route path={"/*"} element={<App/>}/>
          </Routes>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
