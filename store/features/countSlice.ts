import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  total: number;
}

const initialState: CounterState = {
  total: 1,
};

const countSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.total += 1;
    },
    decrement: (state) => {
      if (state.total > 1) {
        state.total -= 1;
      }
    },
  },
});

export const { increment, decrement } = countSlice.actions;
export default countSlice.reducer;
