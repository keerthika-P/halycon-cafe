import client from './client';

export const createRazorpayOrder = (orderId) =>
  client.post(`/payments/razorpay/create/${orderId}`).then((r) => r.data);

export const verifyPayment = (payload) =>
  client.post('/payments/razorpay/verify', payload).then((r) => r.data);
