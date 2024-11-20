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