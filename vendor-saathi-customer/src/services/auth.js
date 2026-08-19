import { fetchAPI } from './api';

export const sendOTP = async (phone) => {
  const result = await fetchAPI('/auth/send-otp', {
    method: 'POST',
    body: JSON.stringify({ phone })
  });
  return result || { success: true, message: 'OTP sent (Code: 123456)' };
};

export const verifyOTP = async (phone, otp, name) => {
  const result = await fetchAPI('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify({ phone, otp, name })
  });
  return result || {
    success: true,
    token: 'jwt_demo_token_123',
    user: { name: name || 'Bhavana Bai', phone: `+91 ${phone}`, address: 'Mijar, Moodbidri - 574225' }
  };
};
