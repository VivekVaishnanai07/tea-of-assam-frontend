import { createSlice } from "@reduxjs/toolkit";
import { clientsThunk } from "./thunk";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    client: {},
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(clientsThunk.fulfilled, (state, action) => {
      state.client = action.payload;
    })
      .addCase(clientsThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
  }
})

export default clientsSlice.reducer;