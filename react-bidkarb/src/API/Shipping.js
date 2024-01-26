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

export function findAllShipping() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return axiosInstance.get(`/shipping/`);
}

export function getShipping(auctId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.get(`/shipping/${auctId}`);
}
  
	
export function confirmShipping(shipping) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.post(`/shipping/confirm-shipping/`, shipping);
}

export function confirmReceived(auctionId, point, comment) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.put(`/shipping/confirm-received/${auctionId}/${point}`, comment);
}