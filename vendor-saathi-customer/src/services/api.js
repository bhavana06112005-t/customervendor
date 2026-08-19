const API_BASE_URL = 'http://localhost:5000/api';

export const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn(`API call failed for ${endpoint}, using local fallback.`, error);
    return null;
  }
};
