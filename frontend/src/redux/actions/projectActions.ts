import {Dispatch} from "redux";
import axios from "../../api/axios.tsx";
import {projects, usersProjects} from "../../api/endPoints.ts";
import Project from "../../interfaces/ProjectInterface.ts";

export const fetchProjects = (username :string,accessToken :string) => {
  return (dispatch: Dispatch) => {
    axios
      .get(usersProjects(username),{
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        console.log(response)
        dispatch({
          type: "SET_PROJECTS",
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching projects: " + error,
        });
      });
  };
};
export const createProject = (data:Project ,accessToken :string) => {
  return (dispatch: Dispatch) =>{
    axios.
      post(
        projects(),
        data,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${accessToken}`
          }
        })
      .then((response)=>{
        console.log(data)
        console.log(response)
        // TODO: update the store
      })
      .catch((error)=>{
        dispatch({
          type: "SET_ERROR",
          payload: "Error creating project " + error,
        })
      })
  }
}