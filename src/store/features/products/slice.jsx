import { createSlice } from "@reduxjs/toolkit";
import { getAllGiftProductsThunk, getAllProductsThunk, getGiftProductThunk, getProductThunk } from "./thunk";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    giftProducts: [],
    giftProduct: {},
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getAllProductsThunk.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(getProductThunk.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProductThunk.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      })
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

export default productsSlice.reducer;
