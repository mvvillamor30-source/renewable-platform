// src/services/authService.js
import api from '@/services/axios';

// Login user
export const login = (credentials) => {
  return api.post('/login', credentials);
};

// Logout user
export const logout = () => {
  return api.post('/logout');
};

// Register user (if needed)
export const register = (data) => {
  return api.post('/register', data);
};

export const refreshCsrf = async () => {
  await api.get('/sanctum/csrf-cookie')
}
