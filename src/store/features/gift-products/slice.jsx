import { createSlice } from "@reduxjs/toolkit";
import { getAllGiftProductsThunk, getGiftProductThunk } from "./thunk";

const giftProductsSlice = createSlice({
  name: "gift-products",
  initialState: {
    giftProducts: [],
    giftProduct: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGiftProductsThunk.fulfilled, (state, action) => {
        state.giftProducts = action.payload;
      })
      .addCase(getAllGiftProductsThunk.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(getGiftProductThunk.fulfilled, (state, action) => {
        state.giftProduct = action.payload;
      })
      .addCase(getGiftProductThunk.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      });
  },
});

export default giftProductsSlice.reducer;
