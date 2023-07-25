import sidebarReducer from "./sidebarReducer";
import { combineReducers } from "redux";
import viewReducer from "./viewReducer.ts";

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
  view: viewReducer,
});

export default rootReducer;
