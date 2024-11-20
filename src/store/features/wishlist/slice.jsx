import { createSlice } from "@reduxjs/toolkit";
import { addWishlistItem, getWishlist, removeWishlistItem } from "./thunk";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistProducts: [],
    item: {},
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getWishlist.fulfilled, (state, action) => {
      state.wishlistProducts = action.payload;
    })
      .addCase(getWishlist.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(addWishlistItem.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.item = action.payload;
      })
      .addCase(removeWishlistItem.rejected, (state, action) => {
        state.error = action.error?.message || "An error occurred";
      });
  }
});

export default wishlistSlice.reducer;