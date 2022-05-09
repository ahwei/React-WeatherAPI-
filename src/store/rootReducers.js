import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import authSlice from "./authSlice";

const rootReducers = combineReducers({
  auth: authSlice,
});

export default rootReducers;
