import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let getTokenFn = null;
let logoutFn = null;

export const setAuthHelpers = ({ getToken, logout }) => {
  getTokenFn = getToken;
  logoutFn = logout;
};

api.interceptors.request.use((config) => {
  const token = getTokenFn?.();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) logoutFn?.();
    return Promise.reject(err);
  }
);

export default api;
