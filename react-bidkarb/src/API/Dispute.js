import axios from 'axios';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
      config.headers.Authorization = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function openDispute(dispute, userId, auctId, image) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  const formData = new FormData();
  formData.append('description', dispute.description);
  formData.append('imageURL', image.imageURL);

  return axiosInstance.post(`/dispute/open-dispute/${auctId}/${userId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}