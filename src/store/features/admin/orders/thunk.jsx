import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../utils/util";

// Get Overview Data
export const getOrdersDataThunk = createAsyncThunk(
  'adminOrders/getOrdersDataThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/orders").then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching the cart");
    }
  }
);