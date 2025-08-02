import { configureStore } from '@reduxjs/toolkit';
import beforeAfterReducer from "./slices/beforeAfterSlice"

export const store = configureStore({
  reducer: {
    service: beforeAfterReducer,
  },
});
