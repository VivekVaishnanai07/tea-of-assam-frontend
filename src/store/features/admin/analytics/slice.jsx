import { createSlice } from "@reduxjs/toolkit";
import { getAnalyticsDataThunk } from "./thunk";

const adminAnalyticsSlice = createSlice({
  name: "adminAnalytics",
  initialState: {
    analyticsData: [],
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getAnalyticsDataThunk.fulfilled, (state, action) => {
      state.analyticsData = action.payload;
    })
      .addCase(getAnalyticsDataThunk.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default adminAnalyticsSlice.reducer;