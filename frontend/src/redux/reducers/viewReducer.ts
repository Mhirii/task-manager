import {createSlice} from "@reduxjs/toolkit";

export const viewSlice = createSlice({
		name: "view",
		initialState: {value: "List"},
		reducers: {
				changeView: (state) => {
						((state.value === "List") ? state.value="Grid" : state.value="List")
				},
		}
})

export const {changeView} = viewSlice.actions;

export default viewSlice.reducer