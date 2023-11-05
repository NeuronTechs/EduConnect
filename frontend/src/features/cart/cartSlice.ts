import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as cartApi from "../../api/cartApi/cartApi";

export interface Cart {
  cart_id?: string | undefined;
  course_id?: string | undefined;
  teacher_id?: string | undefined;
  username?: string | undefined;
  full_name: string | undefined;
  discount?: number | undefined;
  price: number | undefined;
  title: string | undefined;
  image: string | undefined;
}

export interface CartState {
  cartCurrent: Cart[] | null;
  loading: boolean | null;
  error: boolean | null;
}

const initialState: CartState = {
  cartCurrent: [] as Cart[],
  loading: false,
  error: false,
};

export const getCarts = createAsyncThunk<Cart>("/cart/getcart", async () => {
  const res = await cartApi.getCarts("00657");
  return res;
});

export const addToCart = createAsyncThunk<Cart, Cart>(
  "course/123",
  async (cart: Cart) => {
    return cart;
  }
);

export const removeToCart = createAsyncThunk<Cart, Cart>(
  "cartcourses",
  async (cart: Cart) => {
    return cart;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetStoreCart: (state) => {
      state.cartCurrent = null;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCarts.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getCarts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getCarts.fulfilled, (state, action) => {
      state.loading = false;
      state.cartCurrent?.push(action.payload);
    });

    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(addToCart.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartCurrent = [...(state.cartCurrent || []), action.payload];
    });

    builder.addCase(removeToCart.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(removeToCart.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(removeToCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cartCurrent = (state.cartCurrent || [])?.filter(
        (data) => data?.course_id !== action.payload?.course_id
      );
    });
  },
});

export const { resetStoreCart } = cartSlice.actions;

export default cartSlice.reducer;
