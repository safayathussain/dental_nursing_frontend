import { combineReducers } from "@reduxjs/toolkit";
import {authSlice}  from "./slices/AuthSlice";
import { categoriesSlice } from "./slices/CategorySlice";

export const combinedReducers = combineReducers({
    auth: authSlice.reducer,
    category: categoriesSlice.reducer
})