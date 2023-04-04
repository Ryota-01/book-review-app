import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export const userSlice = createSlice({
  name: 'user',
  email: 'email',
  password: 'password',
  initialState: {
    isSignIn: cookie.get("token") !==undefined
  },
  reducers: {
    signIn: (state) => {
      state.isSignIn = true;
    },
    signOut: (state) => {
      state.isSignIn = false;
    },
  }
});

export const { signIn, signOut } = userSlice.actions;

