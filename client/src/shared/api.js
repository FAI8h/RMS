import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },

  timeout: 10000
});

// Call once from store.js (avoids a circular import with the auth slice).
// Any 401 outside /api/auth/* means the cookie is gone or expired -> log out in Redux.
export const setupInterceptors = (store, logout) => {
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      const url = error.config?.url || '';
      const isAuthCall = url.includes('/api/auth/');
      if (error.response?.status === 401 && !isAuthCall) store.dispatch(logout());
      return Promise.reject(error);
    }
  );
};

export default api;