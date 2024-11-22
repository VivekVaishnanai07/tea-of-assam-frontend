import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/util";

export const placeOrderThunk = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { rejectWithValue }) => {
    console.log(orderData);
    try {
      const response = await api.post(`/orders/place-order`, orderData).then((res) => {
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