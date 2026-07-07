import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const client = axios.create({ baseURL: API_BASE_URL });

// Attach JWT to every request if the user is logged in
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('halycon_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Centralized error unwrapping
client.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err?.response?.data?.error || err.message || 'Something went wrong.';
    return Promise.reject(new Error(message));
  }
);

export default client;
