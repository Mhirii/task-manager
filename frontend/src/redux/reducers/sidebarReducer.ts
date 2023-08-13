import {createSlice} from "@reduxjs/toolkit";


export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {value: false},
  reducers: {
    toggleSidebar: (state) => {
      (state.value = !state.value)
    },
  }
})
export const {toggleSidebar} = sidebarSlice.actions;
export default sidebarSlice.reducer;
