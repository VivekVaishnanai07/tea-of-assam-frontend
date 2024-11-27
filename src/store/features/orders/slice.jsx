import { createSlice } from "@reduxjs/toolkit";
import { getOrderDataThunk, getPlaceOrderThunk, orderPaymentThunk, placeOrderThunk } from "./thunk";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderDetails: null,
    placeOrder: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlaceOrderThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getPlaceOrderThunk.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(getOrderDataThunk.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDataThunk.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(placeOrderThunk.fulfilled, (state, action) => {
        state.placeOrder = action.payload;
      })
      .addCase(placeOrderThunk.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(orderPaymentThunk.fulfilled, (state, action) => {
        state.placeOrder = action.payload;
      })
      .addCase(orderPaymentThunk.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default ordersSlice.reducer;
