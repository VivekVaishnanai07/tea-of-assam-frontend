import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../utils/util";

// Get User
export const getUsersDataThunk = createAsyncThunk(
  'adminUsers/getUsersDataThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users").then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching the cart");
    }
  }
);

// Get User
export const getUsersListThunk = createAsyncThunk(
  'adminUsers/getUsersListThunk',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/users/getUsers").then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching the cart");
    }
  }
);

// Add New User
export const addNewUserThunk = createAsyncThunk(
  'adminUsers/addNewUserThunk',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/users/addNew", formData).then((res) => {
        return res.data;
      });
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching the cart");
    }
  }
);