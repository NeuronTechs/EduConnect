import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as authApi from "../../api/authApi/authApi";

import { User, Auth } from "../../type";

export interface AuthState {
  currentUser: User | null;
  token: string | null | undefined;
  loading: boolean;
  error: string | undefined;
  isError: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
  token: null,
  error: undefined,
  isError: false,
};

export const login = createAsyncThunk<User, Auth>(
  "auth/login",
  async (params: Auth) => {
    const res = await authApi.loginPass({
      username: params.username,
      password: params.password,
    });
    return res;
  }
);
export const test = createAsyncThunk("auth/test", async () => {
  const res = await authApi.test();
  return res;
});
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refetchToken: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    resetStoreAuth: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      const dataObj = action.payload as User;
      localStorage.setItem("token", dataObj.data.accessToken);
    });

    builder.addCase(test.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(test.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isError = true;
    });

    builder.addCase(test.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);

      // state.currentUser = action.payload;
    });
  },
});

export const { refetchToken, resetStoreAuth } = authSlice.actions;

export default authSlice.reducer;
