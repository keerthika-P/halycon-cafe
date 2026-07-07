import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { LikesProvider } from './context/LikesContext.jsx';
import './styles/theme.css';
import './styles/responsive.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <LikesProvider>
            <App />
          </LikesProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
