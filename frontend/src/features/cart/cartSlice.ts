import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Cart {
  id_course?: string | undefined;
  image: string | undefined;
  name: string | undefined;
  teacher: string | undefined;
  star?: number | undefined;
  discount?: number | undefined;
  price: number | undefined;
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
        (data) => data?.id_course !== action.payload?.id_course
      );
    });
  },
});

export const { resetStoreCart } = cartSlice.actions;

export default cartSlice.reducer;
