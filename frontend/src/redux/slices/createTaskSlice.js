import { createSlice } from "@reduxjs/toolkit";

const createTaskSlice = createSlice({
  name: "createTask",
  initialState: {
    tasks: null
  },
  reducers: {
    createTask: (state, action) => {
      state.tasks = action.payload;
    }
  }
});

export const { createTask } = createTaskSlice.actions;
export default createTaskSlice.reducer;