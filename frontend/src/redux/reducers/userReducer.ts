import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {id: '', username: '', tasksInProgress:[], tasksDone:[]},
  reducers: {
    initUser: (state, action) => {
      const {id, username, tasksInProgress, tasksDone} = action.payload
      state.id = id
      state.username = username
      state.tasksInProgress = tasksInProgress
      state.tasksDone = tasksDone
    },
  }
})

export const {initUser} = userSlice.actions;
export default userSlice.reducer