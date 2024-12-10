import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../utils/util";

// Get Overview Data
export const getProductsData = createAsyncThunk(
  'adminProducts/getProductsData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/products").then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching the cart");
    }
  }
);