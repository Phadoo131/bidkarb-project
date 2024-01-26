import axios from 'axios';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';
import { edit } from '@cloudinary/transformation-builder-sdk/actions/animated';

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

export function getAllAuction() {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return axiosInstance.get('/auctions/');
}

export function viewAuctionDetails(id) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return axiosInstance.get(`/auctions/${id}`);
}

export function createAuction(auction, userId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.post(`/auctions/new/${userId}`, auction);
}

export function editAuction(auctionId, edit) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.put(`/auctions/edit/${auctionId}`, edit);
}

export function viewAuctionBasedOnCategory(categoryId) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.get(`/auctions/category/${categoryId}`);
}

export function viewAuctionBasedOnProductName(productName) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.get(`/auctions/search/${productName}`);
}

export function cancelAuction(auction) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.put(`/auctions/cancel/${auction.id}`, auction);
}

export function updateRate(auctionId, rate) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.put(`/auctions/Rate/${auctionId}/${rate}`);
}

export function historyRequestSales(userID) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.get(`/auctions/history/${userID}/your-sales`);
}

export function historyRequestOngoing(userID) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.get(`/auctions/history/${userID}/ongoing`);
}

export function historyRequestCompleted(userID) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.get(`/auctions/history/${userID}/completed`);
}

export function historyRequestCancelled(userID) {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
      return Promise.reject('No access token set.');
    }
  
    return axiosInstance.get(`/auctions/history/${userID}/cancelled`);
}

export function searchAuctionByName(productName) {
  if (!localStorage.getItem(ACCESS_TOKEN)) {
    return Promise.reject('No access token set.');
  }

  return axiosInstance.get(`/auctions/search/${productName}`);
}