import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../../utils/util";

// Get the cart for a specific client
export const getCartProductsList = createAsyncThunk(
  'cart/getCartProductsList',
  async (client_id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/cart/${client_id}`).then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching the cart");
    }
  }
);

// Add item to cart
export const addCartItem = createAsyncThunk(
  'cart/addCartItem',
  async ({ client_id, product_id, quantity }, { rejectWithValue, dispatch }) => {
    try {
      const response = (await api.post(`/cart/add-cart`, {
        client_id: client_id,
        product_id: product_id,
        quantity: quantity
      })).data;
      if (response.message) {
        toast.success("Added to Cart", { duration: 1000 });
      }
      await dispatch(getCartProductsList(client_id));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

// Remove item from cart
export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async ({ client_id, product_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = (await api.delete(`/cart/${client_id}/${product_id}`)).data;

      if (response.message) {
        toast.warning("Removed from Cart", { duration: 1000 });
      }
      // Ensure getCartProductsList is called after deleting item from cart
      await dispatch(getCartProductsList(client_id));
      return response.data;
    } catch (error) {
      // Display error toast if any issue occurs
      toast.error(error.response?.data?.message || "An error occurred while removing item from cart");

      // Try to refresh cart list regardless of error, as a fail-safe
      await dispatch(getCartProductsList(client_id));

      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Increase item quantity
export const increaseQuantity = createAsyncThunk(
  'cart/increaseQuantity',
  async ({ client_id, product_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = (await api.patch(`/cart/increase-quantity/${client_id}/${product_id}`)).data;

      // Ensure getCartProductsList is called after deleting item from cart
      await dispatch(getCartProductsList(client_id));
      return response;
    } catch (error) {
      // Display error toast if any issue occurs
      toast.error(error.response?.data?.message || "An error occurred while removing item from cart");

      // Try to refresh cart list regardless of error, as a fail-safe
      await dispatch(getCartProductsList(client_id));

      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Decrease item quantity
export const decreaseQuantity = createAsyncThunk(
  'cart/decreaseQuantity',
  async ({ client_id, product_id }, { rejectWithValue, dispatch }) => {
    try {
      const response = (await api.patch(`/cart/decrease-quantity/${client_id}/${product_id}`)).data;

      // Ensure getCartProductsList is called after deleting item from cart
      await dispatch(getCartProductsList(client_id));
      return response;
    } catch (error) {
      // Display error toast if any issue occurs
      toast.error(error.response?.data?.message || "An error occurred while removing item from cart");

      // Try to refresh cart list regardless of error, as a fail-safe
      await dispatch(getCartProductsList(client_id));

      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
