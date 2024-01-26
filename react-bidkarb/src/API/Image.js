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

export function uploadImage(file) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return axiosInstance.post('/image', file);
}

export function downloadImage(fileName) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.get(`/image/${fileName}`);
}

export function uploadImageFromFileSystem(file) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.post(`/image/fileSystem/image`, file);
}

export function downloadImageFromFileSystem(fileName) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.get(`/image/fileSystem/${fileName}`);
}