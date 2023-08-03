import Task from "../../interfaces/TaskInterface.ts";
import {Reducer} from "redux";


interface TaskState {
  tasksInProgress: Task[] | null;
  tasksDone: Task[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasksInProgress: null,
  tasksDone: null,
  loading: true,
  error: null,
};

type TaskAction = {
  type: string;
  payload: any;
};


// @ts-ignore
const taskBoardReducer: Reducer<TaskState, TaskAction> = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TASKS_DONE":
      return {
        ...state,
        tasksDone: action.payload,
        loading: false,
      };
    case "SET_TASKS_INPROGRESS":
      return {
        ...state,
        tasksInProgress: action.payload,
        loading: false,
      };
      
    case "ADD_TASK_DONE":
      return {
        ...state,
        tasksDone: state.tasksDone ? [...state.tasksDone, action.payload] : [action.payload],
      };
    case "ADD_TASK_INPROGRESS":
      return {
        ...state,
        tasksDone: state.tasksInProgress ? [...state.tasksInProgress, action.payload] : [action.payload],
      };
    
    case "UPDATE_TASK_DONE":
      return {
        ...state,
        tasksDone: state.tasksDone?.map(task => (task._id === action.payload._id ? action.payload : task)),
      };
    case "UPDATE_TASK_INPROGRESS":
      return {
        ...state,
        tasksDone: state.tasksInProgress?.map(task => (task._id === action.payload._id ? action.payload : task)),
      };
      
    case "DELETE_TASK_DONE":
      return {
        ...state,
        tasksDone: state.tasksDone?.filter(task => task._id !== action.payload._id),
      };
    case "DELETE_TASK_INPROGRESS":
      return {
        ...state,
        tasksDone: state.tasksInProgress?.filter(task => task._id !== action.payload._id),
      };
    
    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default taskBoardReducer;
