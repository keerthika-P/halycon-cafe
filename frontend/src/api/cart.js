import client from './client';

export const getCart = () => client.get('/cart').then((r) => r.data);
export const addToCart = (menuItemId, quantity = 1) =>
  client.post('/cart', { menuItemId, quantity }).then((r) => r.data);
export const updateCartQuantity = (menuItemId, quantity) =>
  client.put(`/cart/${menuItemId}`, null, { params: { quantity } }).then((r) => r.data);
export const removeFromCart = (menuItemId) => client.delete(`/cart/${menuItemId}`).then((r) => r.data);
export const clearCart = () => client.delete('/cart');
