import { createSlice } from "@reduxjs/toolkit";
import { getSalesDataThunk } from "./thunk";

const adminSalesSlice = createSlice({
  name: "adminSales",
  initialState: {
    salesData: {},
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getSalesDataThunk.fulfilled, (state, action) => {
      state.salesData = action.payload;
    })
      .addCase(getSalesDataThunk.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default adminSalesSlice.reducer;