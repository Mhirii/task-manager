import Task from "../../interfaces/TaskInterface.ts";
import {Reducer} from "redux";


interface TaskState {
  tasks: Task[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: null,
  loading: false,
  error: null,
};

type TaskAction = {
  type: string;
  payload: any;
};
const reorderTasks = (tasks: Task[], currentIndex: number, targetIndex: number): Task[] => {
  if (!tasks) {
    return tasks;
  }
  const updatedTasks = [...tasks];
  const [movedTask] = updatedTasks.splice(currentIndex, 1);
  updatedTasks.splice(targetIndex, 0, movedTask);
  return updatedTasks;
};

// @ts-ignore
const taskInProgressReducer: Reducer<TaskState, TaskAction> = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TASKS_INPROGRESS":
      return {
        ...state,
        tasks: action.payload,
        loading: false,
      };
    case "ADD_TASK_INPROGRESS":
      return {
        ...state,
        tasks: state.tasks ? [...state.tasks, action.payload] : [action.payload],
      };
    
    case "UPDATE_TASKS_INPROGRESS":
      return {
        ...state,
        tasks: state.tasks?.map(task => (task._id === action.payload._id ? action.payload : task)),
      };
    
    case "DELETE_TASKS_INPROGRESS":
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
    case "REORDER_TASKS_INPROGRESS":
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      const { taskId, currentIndex, targetIndex } = action.payload
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      const updatedTasks = reorderTasks(state.tasks, currentIndex, targetIndex);
      
      return {
        ...state,
        tasks: updatedTasks,
      };
    default:
      return state;
  }
};

export default taskInProgressReducer;
