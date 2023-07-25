// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import {createStore} from "redux";
import { configureStore } from '@reduxjs/toolkit'

import sidebarReducer from "./reducers/sidebarReducer";
import viewReducer from "./reducers/viewReducer.ts";
import modalReducer from "./reducers/modalReducer.ts";

const store = configureStore({
reducer: {
  sidebar: sidebarReducer,
  modal: modalReducer,
  view: viewReducer
  }
}
  // composeWithDevTools(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
