import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/util";

export const getPlaceOrderThunk = createAsyncThunk(
  'order/getPlaceOrder',
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/orders/${clientId}`).then((res) => {
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

export const getOrderDataThunk = createAsyncThunk(
  'order/getOrderData',
  async ({ orderId }, { rejectWithValue }) => {

    try {
      const response = await api.get(`/orders/track/${orderId}`).then((res) => {
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

export const placeOrderThunk = createAsyncThunk(
  'order/placeOrder',
  async (orderData, { rejectWithValue }) => {
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

export const orderPaymentThunk = createAsyncThunk(
  'order/orderPayment',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post(`/orders/order-payment`, orderData).then((res) => {
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