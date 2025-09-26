import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

const uiSlice = createSlice({
  name: "loadingUI",
  initialState,
  reducers: {
    show: (state) => {
      state.isVisible = true;
    },
    hide: (state) => {
      state.isVisible = false;
    },
    toggle: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});

export const { show, hide, toggle } = uiSlice.actions;
export default uiSlice.reducer;
