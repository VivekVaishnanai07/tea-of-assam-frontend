import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../utils/util";

// Get Overview Data
export const getSalesDataThunk = createAsyncThunk(
  'adminSales/getSalesDataThunk',
  async (timeRange, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/sales", timeRange).then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching the cart");
    }
  }
);