import {TaskState} from "vitest";


export default interface IStore{
  sidebar: {isSidebarOn: boolean} | {value: boolean, isSidebarOn: boolean},
  modal: { isModalOn: boolean } | {value: boolean, isModalOn: boolean},
  view: {value: string},
  auth: {username: null, accessToken: null, refreshToken: null},
  task: TaskState,
  taskBoard: TaskState,

}