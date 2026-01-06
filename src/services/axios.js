import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Attach token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401 || error.response?.status === 419) {
      alert('Session expired. Please login again.')
      localStorage.clear()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export const getCustomerProfile = () => api.get('/customer/profile')
export const updateCustomerProfile = (payload) => api.put('/customer/profile', payload)

export const createProvider = (formData) => api.post('/providers', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})

export default api