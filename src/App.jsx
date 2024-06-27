import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store'; // Corrected import statement
import ProductList from './components/ProductList';
import ShoppingCart from './components/ShoppingCart';
import { GlobalStyles } from './GlobalStyles';

export default function App() {
    return (
        <Provider store={store}>
            <GlobalStyles />
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h1 style={{ textAlign: 'center' }}>Your Shopping App</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                    <ProductList />
                    <ShoppingCart />
                </div>
            </div>
        </Provider>
    );
}