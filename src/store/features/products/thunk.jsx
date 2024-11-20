import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/util";

export const getAllProductsThunk = createAsyncThunk(
  'products/getAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products`).then((res) => {
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

export const getProductThunk = createAsyncThunk(
  'products/getProduct',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${productId}`).then((res) => {
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

export const getAllGiftProductsThunk = createAsyncThunk(
  'products/getAllGiftProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/gift-products`).then((res) => {
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
  'products/getGiftProduct',
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/gift-products/${productId}`).then((res) => {
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