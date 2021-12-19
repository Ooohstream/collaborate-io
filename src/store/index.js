import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import themeSlice from "./themeSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
