import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {username: null, accessToken:null, refreshToken:null},
  reducers: {
    login: (state, action) => {
      const {username, accessToken, refreshToken} = action.payload
      state.username = username
      state.accessToken = accessToken
      state.refreshToken = refreshToken
    },
    // @ts-ignore
    logOut: (state, action) => {
      state.username = null
      state.accessToken = null
      state.refreshToken = null
    },
    
    newToken: (state, action) => {
      state.accessToken = action.payload.accessToken
    },
  }
})

export const {login, logOut, newToken} = authSlice.actions;
export default authSlice.reducer

// @ts-ignore
export const selectCurrentUser = (state) => state.auth.username
// @ts-ignore
export const selectCurrentAccessToken = (state) => state.auth.accessToken
// @ts-ignore
export const selectCurrentRefreshToken = (state) => state.auth.refreshToken
