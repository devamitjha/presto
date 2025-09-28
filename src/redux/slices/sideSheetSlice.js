// src/store/sideSheetSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideSheetOpen: false,
};

const sideSheetSlice = createSlice({
  name: "sideSheet",
  initialState,
  reducers: {
    openSheet: (state, action) => {
      state.isSideSheetOpen = true;
      //document.body.style.overflow = "hidden";
    },
    closeSheet: (state) => {
      state.isSideSheetOpen = false;
      //document.body.style.overflow = "";
    },
  },
});

export const { openSheet, closeSheet } = sideSheetSlice.actions;
export default sideSheetSlice.reducer;
