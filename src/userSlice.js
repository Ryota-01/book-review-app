import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies();
console.log(cookie)

export const userSlice = createSlice({
  name: 'user',
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
export default userSlice.reducer;

