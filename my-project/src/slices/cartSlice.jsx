// src/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    loadCart: (state, action) => {
      state.items = action.payload || [];
    },
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item._id !== id);
    },
  },
});

export const { loadCart, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
