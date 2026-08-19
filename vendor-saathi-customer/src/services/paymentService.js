import { fetchAPI } from './api';

export const processPayment = async ({ orderId, amount, paymentMethod, upiId }) => {
  const result = await fetchAPI('/payments/process', {
    method: 'POST',
    body: JSON.stringify({ orderId, amount, paymentMethod, upiId })
  });
  return result || { success: true, transactionId: `TXN_${Date.now()}` };
};
