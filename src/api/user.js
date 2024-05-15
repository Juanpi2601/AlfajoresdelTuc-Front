import axios from "./axios";

export const registerRequest = (user) => axios.post(`user/create`, user);

export const verifyTokenRequest = () => axios.get('user/verifyToken');

export const updatePasswordRequest = (user) => axios.patch('user/update-password', user);
