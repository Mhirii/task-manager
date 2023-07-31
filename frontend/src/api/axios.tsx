import axios from "axios";
import { useSelector } from "react-redux";

const accessToken = "";
// const accessToken = useSelector((state) => state.auth.accessToken)

export default axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    Authorization: accessToken,
  },
});

export const login_url = "/auth/login";
export const register_url = "/auth/register";

export const AllTasksURL = "/tasks";
