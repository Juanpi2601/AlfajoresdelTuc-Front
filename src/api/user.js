import axios from "./axios";

const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    "Accept": "/",                       
    "Cache-Control": "no-cache",        
              
  },
  withCredentials: true,                 
};

export const registerRequest = (user) => {
  return axios.post('user/create', user, axiosConfig);  
};

export const verifyTokenRequest = async () => {
  try {
    const res = await axios.post('user/verify-token', {}, axiosConfig);  
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordRequest = (user) => {
  return axios.patch('user/update-password', user, axiosConfig);  
}