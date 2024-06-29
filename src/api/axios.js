import axios from 'axios';

const URL_BASE = import.meta.env.VITE_URL_BASE;

const instance = axios.create({
  baseURL: URL_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (user) {
    config.headers['User-Data'] = user; 
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default instance;
