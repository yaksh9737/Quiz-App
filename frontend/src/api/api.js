import axios from "axios";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: "https://swiftrut-task-10.onrender.com/api", // Replace with your backend URL
});

// Export baseURL for use in other components
export const BASE_URL = "https://swiftrut-task-10.onrender.com";

// Add a request interceptor to include token in requests (if necessary)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
