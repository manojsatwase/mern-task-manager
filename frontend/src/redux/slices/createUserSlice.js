import { createSlice } from "@reduxjs/toolkit";

const createUserSlice = createSlice({
  name: "createUser",
  initialState: {
    userInfo: null
  },
  reducers: {
    createUser: (state, action) => {
      state.userInfo = action.payload;
    }
  }
});

export const { createUser } = createUserSlice.actions;
export default createUserSlice.reducer;