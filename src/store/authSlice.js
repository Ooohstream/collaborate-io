import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    email: undefined,
    id: undefined,
    name: undefined,
    photoUrl: undefined,
  },
  reducers: {
    setAuth(state, { payload }) {
      state = { isAuth: true, ...payload };
      return state;
    },
    logout(state) {
      state = {
        isAuth: false,
        email: undefined,
        id: undefined,
        name: undefined,
        photoUrl: undefined,
      };
      return state;
    },
  },
});

export default authSlice.reducer;
export const { setAuth, logout } = authSlice.actions;
