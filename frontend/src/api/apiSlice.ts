// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {login, logOut, newToken} from "../redux/reducers/AuthReducer.ts";
import {login_url} from './axios.tsx'
import axios from "./axios.tsx";


const baseQuery = await axios.post(
  login_url,
  JSON.stringify({username: user, password: pwd}),
  {
    headers: {'Content-Type': 'application/json'},
    withCredentials: true,
    Authorization : `Bearer ${localStorage.getItem("access_token")}`
    
  }
)