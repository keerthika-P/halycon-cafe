import client from './client';

export const placeOrder = (payload) => client.post('/orders', payload).then((r) => r.data);
export const getMyOrders = () => client.get('/orders').then((r) => r.data);
export const getOrder = (orderId) => client.get(`/orders/${orderId}`).then((r) => r.data);
