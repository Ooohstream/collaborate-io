import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: "light",
  reducers: {
    setTheme(state, { payload }) {
      state = payload;
      return state;
    },
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
