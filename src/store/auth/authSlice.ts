import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AuthSlice {
  token: string | null;
  name: string | null;
  email: string | null;
  userId: string | null;
}

const initialState: AuthSlice = {
  token: null,
  name: null,
  email: null,
  userId: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },

    setCredentials: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.email = null;
      state.name = null;
      state.userId = null;
      localStorage.clear();
    },
  },
});

export default authSlice.reducer;

export const { setToken, logout, setCredentials, setUserId } =
  authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
