// src/redux/slices/serviceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedService: '',
};

const beforeAfterService = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setService: (state, action) => {
      state.selectedService = action.payload;
    },
  },
});

export const { setService } = beforeAfterService.actions;
export default beforeAfterService.reducer;
