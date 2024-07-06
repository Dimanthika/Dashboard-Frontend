import axios from "axios";
import { getToken } from "../services/auth";

// Create an Axios instance
const axiosInstance = axios.create({
  // baseURL: "http://localhost:8080/",
  baseURL: "http://52.54.109.5:8400/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers["x-access-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
