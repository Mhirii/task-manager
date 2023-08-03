// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from '@reduxjs/toolkit'
import sidebarReducer from "./redux/reducers/sidebarReducer";
import modalReducer from "./redux/reducers/modalReducer.ts";
import viewReducer from "./redux/reducers/viewReducer.ts";
import AuthReducer from "./redux/reducers/AuthReducer.ts";
import taskReducer from "./redux/reducers/taskReducer.ts";
import appReducer from "./redux/reducers/appReducer.ts";
import taskBoardReducer from "./redux/reducers/taskBoardReducer.ts";

const store = configureStore({
reducer: {
  sidebar: sidebarReducer,
  modal: modalReducer,
  view: viewReducer,
  auth: AuthReducer,
  task: taskReducer,
  taskBoard: taskBoardReducer,
  app: appReducer,
  }
}
  // composeWithDevTools(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
