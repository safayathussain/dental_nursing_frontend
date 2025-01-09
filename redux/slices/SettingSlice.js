import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  setting: {},
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, action) => {
      state.setting = action.payload;
    },
  },
});

export const { setSetting } = settingSlice.actions;

export default settingSlice.reducer;
