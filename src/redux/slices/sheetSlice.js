import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openSheet: false,
  openBookNow: false,
  openRecharge: false,
  bookNowCloseType: null,
};

const sheetSlice = createSlice({
  name: "sheet",
  initialState,
  reducers: {
    setOpenSheet: (state, action) => {
      state.openSheet = action.payload;
    },

    setOpenRecharge: (state, action) => {
      state.openRecharge = action.payload;
    },

    // OPEN
    setOpenBookNow: (state, action) => {
      state.openBookNow = action.payload;
      if (action.payload === true) {
        state.bookNowCloseType = null;
      }
    },

    // CLOSE WITH REASON
    closeBookNow: (state, action) => {
      state.openBookNow = false;
      state.bookNowCloseType = action.payload; // manual | submit | navigation
    },
  },
});

export const { setOpenSheet, setOpenBookNow, closeBookNow, setOpenRecharge } = sheetSlice.actions;
export default sheetSlice.reducer;
