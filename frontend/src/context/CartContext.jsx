import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import * as cartApi from '../api/cart';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) { setItems([]); setTotal(0); return; }
    setLoading(true);
    try {
      const data = await cartApi.getCart();
      setItems(data.items || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => { refreshCart(); }, [refreshCart]);

  const addItem = async (menuItemId, quantity = 1) => {
    const data = await cartApi.addToCart(menuItemId, quantity);
    setItems(data.items); setTotal(data.total);
  };

  const updateQuantity = async (menuItemId, quantity) => {
    const data = await cartApi.updateCartQuantity(menuItemId, quantity);
    setItems(data.items); setTotal(data.total);
  };

  const removeItem = async (menuItemId) => {
    const data = await cartApi.removeFromCart(menuItemId);
    setItems(data.items); setTotal(data.total);
  };

  const emptyCart = async () => {
    await cartApi.clearCart();
    setItems([]); setTotal(0);
  };

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, total, loading, cartCount, addItem, updateQuantity, removeItem, emptyCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
