import { createSlice } from "@reduxjs/toolkit";
import { addNewUserThunk, getUsersListThunk } from "./thunk";

const adminUsersSlice = createSlice({
  name: "overview",
  initialState: {
    usersList: [],
    userData: {},
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersListThunk.fulfilled, (state, action) => {
      state.usersList = action.payload;
    })
      .addCase(getUsersListThunk.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addNewUserThunk.fulfilled, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(addNewUserThunk.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default adminUsersSlice.reducer;