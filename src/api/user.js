import instance from "./axios";


export const registerRequest = (user) => {
  return instance.post('/user/create', user);  
};

export const verifyTokenRequest = async () => {
  try {
    const res = await instance.get('/user/verify-token');  
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordRequest = (user) => {
  return instance.patch('/user/update-password', user);  
}