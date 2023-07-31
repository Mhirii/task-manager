import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  refreshTrigger: boolean;
}

const initialState: AppState = {
  refreshTrigger: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRefreshTrigger: (state, action: PayloadAction<boolean>) => {
      state.refreshTrigger = action.payload;
    },
  },
});

export const { setRefreshTrigger } = appSlice.actions;
export default appSlice.reducer;