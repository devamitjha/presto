import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSheet: false,
  openBookNow: false,
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    setOpenSheet: (state, action) => {
      state.openSheet = action.payload;
    },
    setOpenBookNow: (state, action) => {
      state.openBookNow = action.payload;
    },
  },
});

export const { setOpenSheet, setOpenBookNow } = sheetSlice.actions;
export default sheetSlice.reducer;
