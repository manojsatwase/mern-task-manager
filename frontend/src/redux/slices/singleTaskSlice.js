import { createSlice } from "@reduxjs/toolkit";

const singleTaskSlice = createSlice({
  name: "singleTask",
  initialState: {
    singleTask: null
  },
  reducers: {
    singleTask: (state, action) => {
      state.singleTask = action.payload;
    }
  }
});

export const { singleTask } = singleTaskSlice.actions;
export default singleTaskSlice.reducer;