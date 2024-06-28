import axios from 'axios';

const URL_BASE = import.meta.env.VITE_URL_BASE;

const instance = axios.create({
  baseURL: URL_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': '/',
    'Cache-Control': 'no-cache',
  },
});

const token = localStorage.getItem('token');
if (token) {
  instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default instance;
