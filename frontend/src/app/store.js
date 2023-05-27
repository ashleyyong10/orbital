import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import moduleReducer from "../features/modules/moduleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modules: moduleReducer,
  },
});
