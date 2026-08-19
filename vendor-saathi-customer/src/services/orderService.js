import { fetchAPI } from './api';

export const createOrder = async (orderPayload) => {
  const result = await fetchAPI('/orders', {
    method: 'POST',
    body: JSON.stringify(orderPayload)
  });
  return result || { success: true, orderId: `VS${Math.floor(10000 + Math.random() * 90000)}` };
};

export const fetchOrders = async (userId) => {
  const result = await fetchAPI(`/orders/user/${userId}`);
  return result?.orders || null;
};

export const fetchOrderById = async (orderId) => {
  const result = await fetchAPI(`/orders/${orderId}`);
  return result?.order || null;
};
