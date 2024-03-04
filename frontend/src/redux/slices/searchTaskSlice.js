import { createSlice } from "@reduxjs/toolkit";

const searchTaskSlice = createSlice({
  name: "searchTask",
  initialState:{
    search:null
  },
  reducers: {
    searchTask: (state, action) => {
      state.search = action.payload;
    }
  }
});

export const { searchTask } = searchTaskSlice.actions;
export default searchTaskSlice.reducer;