import axios from '../../api/axios.tsx'
import Task from "../../interfaces/TaskInterface.ts";
import {Dispatch} from "redux";


export const fetchTasks = (accessToken, username) => {
  return (dispatch: Dispatch) => {
    axios
      .get(`http://localhost:5000/tasks/${username}`,{
        // .get(`http://localhost:5000/tasks`,{
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
      .post(`http://localhost:5000/tasks/${task._id}`, task)
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
      .put(`http://localhost:5000/tasks/${task._id}`, task)
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
      .delete(`http://localhost:5000/tasks/${taskId}`)
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