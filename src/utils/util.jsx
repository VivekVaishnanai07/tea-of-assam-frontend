import axios from "axios";

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