import axios from "./axios";


export const registerRequest = (user) => {
  return axios.post('user/create', user);  
};

export const verifyTokenRequest = async () => {
  try {
    const res = await axios.get('user/verify-token');  
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordRequest = (user) => {
  return axios.patch('user/update-password', user);  
}