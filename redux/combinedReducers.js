import { combineReducers } from "@reduxjs/toolkit";
import {authSlice}  from "./slices/AuthSlice";

export const combinedReducers = combineReducers({
    auth: authSlice.reducer,
})