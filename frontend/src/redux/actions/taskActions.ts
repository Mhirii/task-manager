import axios from '../../api/axios.tsx'
import Task from "../../interfaces/TaskInterface.ts";
import {Dispatch} from "redux";
import {tasksIdUrl, tasksUserUrl} from "../../api/endPoints.ts";


export const fetchTasks = (accessToken, username) => {
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
export const updateTask = (task: Task) => {
  return (dispatch: Dispatch) => {
    axios
      .put(tasksIdUrl(task._id), task)
      .then((response) => {
        // console.log(response.data.task._id)
        dispatch({
          type: "UPDATE_TASK",
          payload: response.data.task,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Error updating task: " + error,
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