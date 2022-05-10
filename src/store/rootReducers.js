import { combineReducers } from "@reduxjs/toolkit";
import weatherSlice from "./weatherSlice";

const rootReducers = combineReducers({
  weather: weatherSlice,
});

export default rootReducers;
