import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('/products.json');
  const products = await response.json();
  return products;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {
    decrementStock: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.productId);
      if (index !== -1) {
        state.items[index].inStock -= action.payload.quantity;
      }
    },
    incrementStock: (state, action) => {
      const index = state.items.findIndex(product => product.id === action.payload.productId);
      if (index !== -1) {
        state.items[index].inStock += action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { decrementStock, incrementStock } = productsSlice.actions;
export default productsSlice.reducer;