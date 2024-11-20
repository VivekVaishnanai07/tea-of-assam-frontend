import { createSlice } from "@reduxjs/toolkit";
import { addCartItem, decreaseQuantity, getCartProductsList, increaseQuantity, removeCartItem } from "./thunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    item: {},
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getCartProductsList.fulfilled, (state, action) => {
      state.cartProducts = action.payload;
    })
      .addCase(getCartProductsList.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default cartSlice.reducer;