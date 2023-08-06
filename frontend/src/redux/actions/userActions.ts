import {Dispatch} from "redux";
import axios from "../../api/axios.tsx";
import {usersUsername} from "../../api/endPoints.ts";

export const fetchUser = (accessToken :string, username :string) => {
  return (dispatch: Dispatch) => {
    axios
      .get(usersUsername(username),{
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((response) => {
        // dispatch(setUser());
        console.log(response)
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Error fetching user: " + error,
        });
      });
  };
};