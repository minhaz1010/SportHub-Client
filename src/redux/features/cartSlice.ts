import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TCartItem = {
  id: string;
  slug?: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
  image: string;
};

interface CartState {
  items: TCartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<TCartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.stock = newItem.stock - existingItem.quantity;
      } else {
        state.items.push({ ...newItem, quantity: 1, stock: newItem.stock - 1 });
      }
    },
    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  clearCart,
  updateItemQuantity,
  removeItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
