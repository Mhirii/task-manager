import Task from "../../interfaces/TaskInterface.ts";
import {Reducer} from "redux";


interface TaskState {
  tasks: Task[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: null,
  loading: true,
  error: null,
};

type TaskAction = {
  type: string;
  payload: any;
};


// @ts-ignore
const taskReducer: Reducer<TaskState, TaskAction> = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TASKS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: state.tasks ? [...state.tasks, action.payload] : [action.payload],
      };
    
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks?.map(task => (task._id === action.payload._id ? action.payload : task)),
      };
    
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks?.filter(task => task._id !== action.payload._id),
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

export default taskReducer;
