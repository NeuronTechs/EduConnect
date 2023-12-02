import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/auth/authSlice";
import cartSlice from "../features/cart/cartSlice";
import courseSlice from "@/features/course/courseSlice";
import courseOverviewSlice from "@/features/overviewCourse/courseOverviewSlice";
import checkoutSlice from "@/features/checkoutCourse/checkoutSlice";
import adminSlice from "@/features/admin/adminSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["cart,courseSlice,course"],
};

export default configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    course: courseSlice,
    courseOverview: courseOverviewSlice,
    checkoutSlice: checkoutSlice,
    admin: adminSlice,
  },
});
// auth: authReducer
const rootReducer = combineReducers({
  authSlice,
  cartSlice,
  courseSlice,
  courseOverviewSlice,
  checkoutSlice,
  adminSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
// export const storePublic = createStore({ auth: authReducer });
