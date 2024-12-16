import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../utils/util";

// Get Overview Data
export const getAnalyticsDataThunk = createAsyncThunk(
  'adminAnalytics/getAnalyticsDataThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/analytics").then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching the cart");
    }
  }
);