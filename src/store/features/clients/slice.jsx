import { createSlice } from "@reduxjs/toolkit";
import { addNewAddressThunk, clientsThunk, updateAddressThunk } from "./thunk";

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    client: {},
    addressData: {},
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(clientsThunk.fulfilled, (state, action) => {
      state.client = action.payload;
    })
      .addCase(clientsThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewAddressThunk.fulfilled, (state, action) => {
        state.addressData = action.payload;
      })
      .addCase(addNewAddressThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateAddressThunk.fulfilled, (state, action) => {
        state.addressData = action.payload;
      })
      .addCase(updateAddressThunk.rejected, (state, action) => {
        state.error = action.error.message;
      })
  }
})

export default clientsSlice.reducer;