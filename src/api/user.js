import axios from "./axios";

export const registerRequest = (user) => axios.post(`user/create`, user);

export const verifyTokenRequest = async (token) => {
    try {
      const res = await axios.post('/user/verify-token', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return res;
    } catch (error) {
      throw error;
    }
  };
  
export const updatePasswordRequest = (user) => axios.patch('user/update-password', user);
