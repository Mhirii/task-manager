import {AnyAction, Reducer} from "redux";
import Project from "../../interfaces/ProjectInterface.ts";
import Task from "../../interfaces/TaskInterface.ts";


interface ProjectState {
  project: Project;
  tasksInProgress: Task[];
  tasksDone: Task[];
  error: string | null;
}

const initialState: ProjectState = {
  project: {
    _id:'',
    tasks:[],
    title:'',
    color:'slate',
    owner:''
  },
  tasksInProgress: [],
  tasksDone: [],
  error: null,
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

const projectPageReducer: Reducer<ProjectState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROJECT":
      return {
        ...state,
        project: action.payload,
        
      };
      
    case "UPDATE_PROJECT":
      return {
        ...state,
        project: state.project = action.payload,
      };
      
    case "SET_PROJECT_TASKS":
      return{
        ...state,
        tasksInProgress: state.tasksInProgress = action.payload.filter((task: any)=>!task.isDone),
        tasksDone: state.tasksDone = action.payload.filter((task: any)=>task.isDone),
      };
    
    case "SET_PROJECT_TASKS_DONE":
      return{
        ...state,
        tasksDone: state.tasksDone = action.payload
      };
    
    case "PROJECT_REORDER_TASKS":
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
      
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default projectPageReducer;