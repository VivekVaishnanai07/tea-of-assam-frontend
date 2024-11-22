import { createSlice } from "@reduxjs/toolkit";
import { placeOrderThunk } from "./thunk";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    placeOrder: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.placeOrder = action.payload;
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default ordersSlice.reducer;
