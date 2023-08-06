import axios from '../../api/axios.tsx'
import Task from "../../interfaces/TaskInterface.ts";
import {Dispatch} from "redux";
import {tasksIdUrl, tasksUserUrl, usersTasksDone, usersTasksInProgress} from "../../api/endPoints.ts";


export const fetchTasks = (accessToken :string, username :string) => {
  return (dispatch: Dispatch) => {
    axios
      .get(tasksUserUrl(username),{
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        dispatch({
          type: "SET_TASKS",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching tasks: " + error,
        });
      });
  };
};

export const fetchTasksInProgress = (username :string, axiosConfig: any) => {
  return (dispatch: Dispatch) => {
    axios
      .get(usersTasksInProgress(username), axiosConfig)
      .then((response) => {
        dispatch({
          type: "SET_TASKS_INPROGRESS",
          payload: response.data.tasksInProgress,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching tasks: " + error,
        });
      });
  };
};

export const fetchTasksDone = (username :string, axiosConfig: any) => {
  return (dispatch: Dispatch) => {
    axios
      .get(usersTasksDone(username), axiosConfig)
      .then((response) => {
        // console.log('fetched tasks done: ')
        // console.log(response.data)
        dispatch({
          type: "SET_TASKS_DONE",
          payload: response.data.tasksDone,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching tasks: " + error,
        });
      });
  };
};

export const addTask = (task: Task) => {
  return (dispatch: Dispatch) => {
    axios
      .post(tasksIdUrl(task._id), task)
      .then((response) => {
        dispatch({
          type: "ADD_TASK",
          payload: response.data.task,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Error adding task: " + error,
        });
      });
  };
};
export const removeTask = (taskId: string) => {
  return (dispatch: Dispatch) => {
    axios
      .delete(tasksIdUrl(taskId))
      .then((response) => {
        dispatch({
          type: "DELETE_TASK",
          payload: response.data.task,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Error deleting task: " + error,
        });
      });
  };
};


export const setTasksInProgress = (tasksInProgress: Task[]): any => ({
  type: "SET_TASKS_INPROGRESS",
  payload: tasksInProgress,
});

export const setTasksDone = (tasksDone: Task[]): any => ({
  type: "SET_TASKS_DONE",
  payload: tasksDone,
});