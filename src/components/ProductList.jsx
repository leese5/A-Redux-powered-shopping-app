import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartActions'; // Updated import
import styled from '@emotion/styled';


const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const ProductItem = styled.div`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 20px;
  width: 200px;
  text-align: center;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }
`;

const AddToCartButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector(state => state.products);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const handleAddToCart = (product, quantity) => {
    dispatch(addToCart(product, quantity));
  };

  return (
    <ListContainer>
      <h2>Available Products</h2>
      {products.map(product => (
        <ProductItem key={product.id}>
          <img src={product.photoUrl} alt={product.name} />
          <div>
            <h3>{product.name}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>In Stock: {product.inStock}</p>
            <input type="number" defaultValue="1" min="1" max={product.inStock} />
            <AddToCartButton 
              onClick={(e) => handleAddToCart(product, parseInt(e.target.previousSibling.value, 10))}
              disabled={product.inStock === 0}>
              {product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </AddToCartButton>
          </div>
        </ProductItem>
      ))}
    </ListContainer>
  );
};

export default ProductList;