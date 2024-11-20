import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/util";
import { toast } from "sonner";

// Get the wishlist for a specific client
export const getWishlist = createAsyncThunk(
  'wishlist/getWishlist',
  async (client_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/wishlist/${client_id}`).then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching the wishlist");
    }
  }
);

// Add item to wishlist
export const addWishlistItem = createAsyncThunk(
  'wishlist/addWishlistItem',
  async ({ client_id, product_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = (await api.post(`/wishlist/add-wishlist`, {
        client_id: client_id,
        product_id: product_id
      })).data;

      if (response.message) {
        toast.success("Added to Wishlist", { duration: 1000 });
      }

      await dispatch(getWishlist(client_id));
      return response;
    } catch (err) {
      toast.warning(err.response?.data.message);
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

// Remove item from wishlist
export const removeWishlistItem = createAsyncThunk(
  'wishlist/removeWishlistItem',
  async ({ client_id, product_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = (await api.delete(`/wishlist/${client_id}/${product_id}`)).data;

      if (response.data) {
        toast.warning("Removed from Wishlist", {
          duration: 1000,
        });
      }

      await dispatch(getWishlist(client_id));
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);
