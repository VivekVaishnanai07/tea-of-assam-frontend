import { createSlice } from "@reduxjs/toolkit";
import { addNewProductThunk, getProductsData, getProductsList } from "./thunk";

const adminProductsSlice = createSlice({
  name: "overview",
  initialState: {
    productData: {},
    productList: [],
    newProduct: {},
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsData.fulfilled, (state, action) => {
      state.productData = action.payload;
    })
      .addCase(getProductsData.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(getProductsList.fulfilled, (state, action) => {
        state.productList = action.payload;
      })
      .addCase(getProductsList.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(addNewProductThunk.fulfilled, (state, action) => {
        state.newProduct = action.payload;
      })
      .addCase(addNewProductThunk.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default adminProductsSlice.reducer;