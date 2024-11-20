import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/util";

export const getAllGiftProductsThunk = createAsyncThunk(
  'gift-products/getAllGiftProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/gift-products`).then((res) => {
        return res.data;
      }).catch((error) => {
        console.error(error);
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);

export const getGiftProductThunk = createAsyncThunk(
  'gift-products/getGiftProduct',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/gift-products/${productId}`).then((res) => {
        return res.data;
      }).catch((error) => {
        console.error(error);
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred");
    }
  }
);