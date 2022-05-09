import { combineReducers } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import weatherSlice from "./weatherSlice";

const rootReducers = combineReducers({
  weather: weatherSlice,
});

export default rootReducers;
