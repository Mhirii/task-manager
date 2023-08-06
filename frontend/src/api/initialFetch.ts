import {AxiosResponse} from "axios";
import axios from "./axios.tsx";
import {usersTasksInProgress, usersUsername} from "./endPoints.ts";



export async function axiosUserInfo(username: string, axiosConfig:any): Promise<AxiosResponse<any, any>> {
  return await axios.get(
    usersUsername(username),
    axiosConfig
  )
}

export async function fetchUserTasksInProgress(username: string, axiosConfig:any) {
  return await axios.get(
    usersTasksInProgress(username),
    axiosConfig
  )
}

export async function fetchUserTasksDone(username: string, axiosConfig:any) {
  return await axios.get(
    usersTasksInProgress(username),
    axiosConfig
  )
}