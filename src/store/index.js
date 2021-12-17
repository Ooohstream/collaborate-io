import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import projectsSlice from "./projectsSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  projects: projectsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
