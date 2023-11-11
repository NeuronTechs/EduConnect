import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface CourseCheckout {
  course_id?: string;
  teacher_id?: string;
  full_name?: string;
  discount?: number;
  price?: number;
  title?: string;
  image?: string;
}

export interface CheckoutState {
  courseCurrent: CourseCheckout | null;
  loading: boolean | null;
  error: boolean | null;
}

const initialState: CheckoutState = {
  courseCurrent: null,
  loading: false,
  error: false,
};

export const getCoureCheckout = createAsyncThunk<
  CourseCheckout,
  CourseCheckout
>("/checkout/getcourse", (Course: CourseCheckout) => {
  return Course;
});

export const checkoutSlice = createSlice({
  name: "courseCheckout",
  initialState,
  reducers: {
    resetCheckOutCart: (state) => {
      state.courseCurrent = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCoureCheckout.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCoureCheckout.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getCoureCheckout.fulfilled, (state, action) => {
      state.loading = false;
      state.courseCurrent = action.payload;
    });
  },
});

export const { resetCheckOutCart } = checkoutSlice.actions;

export default checkoutSlice.reducer;
