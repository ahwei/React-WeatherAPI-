import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import RootRuducers from "./rootReducers";

export const store = configureStore({
  reducer: RootRuducers,
  middleware: [thunk],
});
