import { combineReducers } from "@reduxjs/toolkit";
import {authSlice}  from "./slices/AuthSlice";
import { categoriesSlice } from "./slices/CategorySlice";
import { settingSlice } from "./slices/SettingSlice";

export const combinedReducers = combineReducers({
    auth: authSlice.reducer,
    category: categoriesSlice.reducer,
    setting: settingSlice.reducer
})