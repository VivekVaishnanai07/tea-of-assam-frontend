import { createSlice } from "@reduxjs/toolkit";
import { addNewUserThunk, getUsersDataThunk, getUsersListThunk } from "./thunk";

const adminUsersSlice = createSlice({
  name: "overview",
  initialState: {
    usersData: {},
    usersList: [],
    newUserData: {},
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getUsersDataThunk.fulfilled, (state, action) => {
      state.usersData = action.payload;
    })
      .addCase(getUsersDataThunk.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(getUsersListThunk.fulfilled, (state, action) => {
        state.usersList = action.payload;
      })
      .addCase(getUsersListThunk.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addNewUserThunk.fulfilled, (state, action) => {
        state.newUserData = action.payload;
      })
      .addCase(addNewUserThunk.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default adminUsersSlice.reducer;