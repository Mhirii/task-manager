import {createSlice} from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {value: {username : '', password : '', accessToken: ''}},
  reducers: {
    login: (state, action) => {
      state.value.username = action.payload.username
      state.value.password = action.payload.password
      state.value.accessToken = action.payload.accessToken
    }
  }
})

export const { login } = loginSlice.actions;

export default loginSlice.reducer