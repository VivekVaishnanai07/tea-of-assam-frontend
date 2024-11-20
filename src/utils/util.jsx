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
