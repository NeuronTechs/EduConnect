import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as adminApi from "../../api/adminApi/adminApi";
import { ITransactionReport } from "@/types/type";

export interface AdminState {
  loading: boolean;
  error: string | undefined;
  isError: boolean;
  report: ITransactionReport[];
}

const initialState: AdminState = {
  loading: false,
  error: undefined,
  isError: false,
  report: [],
};

export const getTransactionReport = createAsyncThunk(
  "admin/getTransactionReport",
  async () => {
    const res = await adminApi.getTransactionReport();
    return res;
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactionReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTransactionReport.fulfilled, (state, action) => {
      state.loading = false;
      state.error = undefined;
      state.isError = false;
      state.report = action.payload.data;
    });
    builder.addCase(getTransactionReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });
  },
});

export default adminSlice.reducer;
