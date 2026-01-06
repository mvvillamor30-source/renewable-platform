import api from '@/services/axios';

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token') // must save token after login
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const createAdmin = (payload) => api.post('/admins', payload)
export const getAdmins = () => api.get('/admins')
export const updateAdmin = (id, payload) =>
  api.put(`/admins/${id}`, payload)

export const deleteAdmin = (id) =>
  api.delete(`/admins/${id}`)

export const getCustomers = () => api.get('/admin/customers')
export const deleteCustomer = (id) => api.delete(`/admin/customers/${id}`)

// Providers
export const getProviders = () => api.get('/admin/providers')
export const getProvider = (id) => api.get(`/admin/providers/${id}`)
export const updateProviderStatus = (id, payload) => api.put(`/admin/providers/${id}/status`, payload)


