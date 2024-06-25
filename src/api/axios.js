import axios from "axios";
import Cookies from "js-cookie";

const URL_BASE = import.meta.env.VITE_URL_BASE;

const instance = axios.create({
  baseURL: URL_BASE,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
instance.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
