import { createSlice } from "@reduxjs/toolkit";
import { getProductsData } from "./thunk";

const adminProductsSlice = createSlice({
  name: "overview",
  initialState: {
    productData: [],
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsData.fulfilled, (state, action) => {
      state.productData = action.payload;
    })
      .addCase(getProductsData.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default adminProductsSlice.reducer;