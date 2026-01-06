import api from '@/services/axios';

export const createCustomer = (payload) => api.post('/register/customer', payload)