import { axiosInstance } from "./axiosInstance";

export const fetchDataFromAPI = async (method, params) => {
  const requestBody = {
    action: method,
    params: params,
  };

  const response = await axiosInstance.post('', requestBody);
  if (response.data && response.data.result) {
    return response.data.result;
  } else {
    throw new Error('Неверный формат ответа от сервера');
  }
};