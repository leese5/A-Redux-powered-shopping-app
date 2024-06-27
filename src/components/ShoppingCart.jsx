import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, checkout } from '../features/cart/cartSlice';
import { incrementStock } from '../features/products/productsSlice';
import styled from '@emotion/styled';

const CartContainer = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 20px;
`;

const CartItem = styled.li`
  list-style: none;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const RemoveButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #c82333;
  }
`;

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Correctly referencing the cart items

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart({ productId: item.productId }));
    dispatch(incrementStock({ productId: item.productId, quantity: item.quantity }));
  };

  const handleCheckout = () => {
    dispatch(checkout());
  };

  console.log(cartItems)

  // Corrected variable name for cartItems
  const totalCost = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContainer>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => ( // Corrected variable name for cartItems
          <CartItem key={index}>
            <h3>{item.name}</h3>
            <p>Price per Unit: ${item.price}</p>
            <p>Total Units: {item.quantity}</p>
            <p>Total Cost: ${(item.price * item.quantity).toFixed(2)}</p>
            <RemoveButton onClick={() => handleRemoveFromCart(item)}>Remove</RemoveButton>
          </CartItem>
        ))}
      </ul>
      <p>Total Cost: ${totalCost.toFixed(2)}</p>
      <button onClick={handleCheckout}>Checkout</button>
    </CartContainer>
  );
};

export default ShoppingCart;