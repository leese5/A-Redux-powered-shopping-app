import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCartReducer: (state, action) => {
      const { productId, quantity, price } = action.payload; // Destructure to get price
      const existingItem = state.items.find(item => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // Include price when pushing a new item
        state.items.push({ productId, quantity, price });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.productId !== action.payload.productId);
    },
    checkout: (state) => {
      state.items = [];
    },
  },
});

export const { addToCartReducer, removeFromCart, checkout } = cartSlice.actions;
export default cartSlice.reducer;