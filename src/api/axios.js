import axios from 'axios';

const URL_BASE = import.meta.env.VITE_URL_BASE;

const instance = axios.create({
  baseURL: URL_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '/',
    'Cache-Control': 'no-cache',
  },
});

const token = sessionStorage.getItem('token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
