import {AnyAction, Reducer} from "redux";
import Project from "../../interfaces/ProjectInterface.ts";


interface ProjectState {
  projects: Project[];
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  error: null,
};

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
    default:
      return state;
  }
};

export default projectsReducer;
