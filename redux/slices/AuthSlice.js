import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  country: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setAuth, setCountry } = authSlice.actions;

export default authSlice.reducer;
