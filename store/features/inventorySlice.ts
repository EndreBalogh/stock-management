import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductHistory } from "../../types/inventoryTypes";

interface InventoryState {
  products: Product[];
}

const initialState: InventoryState = {
  products: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    insert: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    edit: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    updateStock: (
      state,
      action: PayloadAction<{ id: string; stockChange: number }>
    ) => {
      const product = state.products.find((p) => p.id === action.payload.id);
      if (product) {
        product.stock += action.payload.stockChange;
        product.history.push({
          date: new Date().toISOString(),
          field: "stock",
          oldValue: product.stock - action.payload.stockChange,
          newValue: product.stock,
        });
      }
    },
    del: (state, action: PayloadAction<{ id: string }>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
    },
  },
});

export const { insert, edit, updateStock, del } = inventorySlice.actions;
export default inventorySlice.reducer;
