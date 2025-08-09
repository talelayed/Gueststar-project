import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  currentUser: null,
  error: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLoading: (state) => {
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    authFailed: (state) => {
      state.loading = false;
      state.error = true;
      console.log("login error");
    },
    emptyUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { authLoading, authSuccess, authFailed, emptyUser } =
  AuthSlice.actions;

export default AuthSlice.reducer;
