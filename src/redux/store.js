import { configureStore } from '@reduxjs/toolkit';
import beforeAfterReducer from "./slices/beforeAfterSlice"
import customerReducer from "./slices/customerSlice";
import sheetReducer from "./slices/sheetSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    service: beforeAfterReducer,
    customer: customerReducer,
    sheet: sheetReducer,
    loadingUI: uiReducer,
  },
});
