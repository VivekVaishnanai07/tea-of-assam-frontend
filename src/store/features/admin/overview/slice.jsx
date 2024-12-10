import { createSlice } from "@reduxjs/toolkit";
import { getOverviewData } from "./thunk";

const overViewSlice = createSlice({
  name: "overview",
  initialState: {
    overviewData: [],
    error: null
  },
  extraReducers: (builder) => {
    builder.addCase(getOverviewData.fulfilled, (state, action) => {
      state.overviewData = action.payload;
    })
      .addCase(getOverviewData.rejected, (state, action) => {
        state.error = action.error;
      })
  }
})

export default overViewSlice.reducer;