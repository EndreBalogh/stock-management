import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FinanceState {
  revenue: number;
  expense: number;
}

const initialState: FinanceState = {
  revenue: 0,
  expense: 0,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setRevenue: (state, action: PayloadAction<number>) => {
      state.revenue = action.payload;
    },
    setExpense: (state, action: PayloadAction<number>) => {
      state.expense = action.payload;
    },
  },
});

export const { setRevenue, setExpense } = financeSlice.actions;
export default financeSlice.reducer;
