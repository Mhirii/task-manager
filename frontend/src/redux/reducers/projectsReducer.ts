import {AnyAction, Reducer} from "redux";
import Project from "../../interfaces/ProjectInterface.ts";


interface ProjectState {
  projects: Project[] | null;
  error: string | null;
}

const initialState: ProjectState = {
  projects: null,
  error: null,
};

// type ProjectAction = {
//   type: string;
//   payload: any;
// };


// TODO:
/*
const reorderTasks = (tasks: Task[], currentIndex: number, targetIndex: number): Task[] => {
  if (!tasks) {
    return tasks;
  }
  const updatedTasks = [...tasks];
  const [movedTask] = updatedTasks.splice(currentIndex, 1);
  updatedTasks.splice(targetIndex, 0, movedTask);
  return updatedTasks;
};
*/

// @ts-ignore
const projectsReducer: Reducer<ProjectState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return {
        ...state,
        projects: action.payload,
      };
    case "ADD_PROJECTS":
      return {
        ...state,
        projects: state.projects ? [...state.projects, action.payload] : [action.payload],
      };
    
    case "UPDATE_PROJECTS":
      return {
        ...state,
        projects: state.projects?.map(project => (project._id === action.payload._id ? action.payload : project)),
      };
    
    case "DELETE_PROJECTS":
      return {
        ...state,
        projects: state.projects?.filter(project => project._id !== action.payload._id),
      };
    
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    /* TODO:
      case "REORDER_PROJECTS":
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      const { projectId, currentIndex, targetIndex } = action.payload
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      const updatedProjects = reorderProjects(state.projects, );
      
      return {
        ...state,
        tasks: updatedProjects,
      };
      */
    default:
      return state;
  }
};

export default projectsReducer;
