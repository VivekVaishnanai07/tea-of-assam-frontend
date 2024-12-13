import { createSlice } from "@reduxjs/toolkit";
import { getOrdersDataThunk } from "./thunk";

const adminOrdersSlice = createSlice({
  name: "adminOrders",
  initialState: {
    ordersData: [],
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersDataThunk.fulfilled, (state, action) => {
      state.ordersData = action.payload;
    })
      .addCase(getOrdersDataThunk.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default adminOrdersSlice.reducer;