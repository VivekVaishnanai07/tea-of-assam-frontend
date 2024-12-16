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
    // Extract role or endpoint type from request (optional, for finer control)
    const isAdminRequest = req.url?.includes("/admin");
    // Decide which token to use
    const adminToken = localStorage.getItem("adminToken");
    const clientToken = localStorage.getItem("clientToken");

    if (isAdminRequest && adminToken) {
      // Add admin token for admin-related requests
      req.headers.Authorization = `Bearer ${adminToken}`;
    } else if (clientToken) {
      // Add client token for general requests
      req.headers.Authorization = `Bearer ${clientToken}`;
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
      const isAdminError = error.config.url?.includes("/admin");
      if (isAdminError) {
        // Clear admin token and redirect to admin login page
        localStorage.removeItem("adminToken");
        window.location.href = "/admin/login";
      } else {
        // Clear client token and redirect to user login page
        localStorage.removeItem("clientToken");
        window.location.href = "/login";
      }
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

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US");  // Converts to MM/DD/YYYY format
};

export const formatPrice = (value) => {
  let numericValue;
  if (typeof value === 'string') {
    numericValue = parseInt(value.replace(/[^0-9.-]+/g, ''), 10);
  } else if (typeof value === 'number') {
    numericValue = value;
  } else {
    return 'Invalid value';
  }
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0, // No decimal points
  }).format(numericValue);
};


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