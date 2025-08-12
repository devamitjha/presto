import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: JSON.parse(localStorage.getItem("customer")) || null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
      localStorage.setItem("customer", JSON.stringify(action.payload));
    },
    clearCustomer: (state) => {
      state.customer = null;
      localStorage.removeItem("customer");
    },
  },
});

export const { setCustomer, clearCustomer } = customerSlice.actions;
export default customerSlice.reducer;
