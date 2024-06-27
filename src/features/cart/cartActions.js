import { addToCartReducer } from './cartSlice';
import { decrementStock } from '../products/productsSlice';

export const addToCart = (product, quantity) => (dispatch) => {
  dispatch(addToCartReducer({ productId: product.id, quantity, price: product.price }));
  dispatch(decrementStock({ productId: product.id, quantity }));
};