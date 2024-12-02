import axios from "axios";
import { isBefore, isToday, parse } from "date-fns";

// role base 
export const roles = {
  Admin_Role: "admin",
  User_Role: "user"
}


const api = axios.create({
  baseURL: "http://localhost:3300/api"
});

// Request interceptor to add the token to headers
api.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("clientToken");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle expired tokens
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("clientToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;


export function generateTrackingNumber() {
  const prefix = '1Z'; // For UPS-style tracking numbers
  const randomPart = Array.from({ length: 16 }, () =>
    Math.floor(Math.random() * 10)).join(''); // 16 random digits
  return `${prefix}${randomPart}`;
}

export function generateTransactionID() {
  const prefix = 'txn_'; // Prefix to indicate transaction
  const randomPart = Array.from({ length: 12 }, () =>
    Math.random().toString(36).charAt(2) // Random alphanumeric characters
  ).join('').toUpperCase();
  return `${prefix}${randomPart}`;
}


export const formatPrice = (value) => {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0, // No decimal points
  }).format(value);
}

export function getDeliveryStatus(orderDateString) {
  // Parse the order date string into a Date object
  const currentYear = new Date().getFullYear();
  const orderDate = new Date(`${orderDateString} ${currentYear}`);
  const currentDate = new Date();

  // Remove time part for accurate comparison (only compare dates)
  currentDate.setHours(0, 0, 0, 0);
  orderDate.setHours(0, 0, 0, 0);

  // Compare dates and return the status
  if (currentDate.getTime() === orderDate.getTime()) {
    return "Today Delivered";
  }
  if (currentDate > orderDate) {
    return "Delivered";
  }
  return orderDateString;
}