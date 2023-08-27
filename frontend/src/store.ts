import {configureStore} from '@reduxjs/toolkit'
import SidebarReducer from "./redux/reducers/sidebarReducer";
import modalReducer from "./redux/reducers/modalReducer.ts";
import viewReducer from "./redux/reducers/viewReducer.ts";
import AuthReducer from "./redux/reducers/AuthReducer.ts";
import appReducer from "./redux/reducers/appReducer.ts";
import userReducer from "./redux/reducers/userReducer.ts";
import tasksInPogressReducer from "./redux/reducers/tasksInPogressReducer.ts";
import tasksDoneReducer from "./redux/reducers/tasksDoneReducer.ts";
import projectsReducer from "./redux/reducers/projectsReducer.ts";
import projectPageReducer from "./redux/reducers/projectPageReducer.ts";

const store = configureStore({
    reducer: {
      sidebar: SidebarReducer,
      modal: modalReducer,
      view: viewReducer,
      auth: AuthReducer,
      user: userReducer,
      projects: projectsReducer,
      // @ts-ignore
      tasksInProgress: tasksInPogressReducer, tasksDone: tasksDoneReducer,
      // @ts-ignore
      // task: taskReducer, cleanup
      app: appReducer,
      projectPage: projectPageReducer,
    }
  }
  // composeWithDevTools(applyMiddleware(thunk))
);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
