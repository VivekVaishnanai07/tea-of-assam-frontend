import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/util";

export const clientsThunk = createAsyncThunk('clients/getClient', async ({ clientId }, { rejectWithValue }) => {
  try {
    const response = api.get(`/clients/${clientId}`).then((res) => {
      return res.data;
    }).catch((error) => {
      return error
    })
    return response;
  } catch {
    return rejectWithValue(err.response?.data || "An error occurred");
  }
})

export const addNewAddressThunk = createAsyncThunk('clients/addNewAddress', async ({ clientId, newAddress }, { rejectWithValue }) => {
  try {
    const response = api.post(`/clients/add-deliveryAddress/${clientId}`, { newAddress }).then((res) => {
      return res.data;
    }).catch((error) => {
      return error
    })
    return response;
  } catch {
    return rejectWithValue(err.response?.data || "An error occurred");
  }
})

export const updateAddressThunk = createAsyncThunk('clients/updateAddress', async ({ clientId, address }, { rejectWithValue }) => {
  try {
    const response = api.patch(`/clients/update-deliveryAddress/${clientId}`, { address }).then((res) => {
      return res.data;
    }).catch((error) => {
      return error
    })
    return response;
  } catch {
    return rejectWithValue(err.response?.data || "An error occurred");
  }
})