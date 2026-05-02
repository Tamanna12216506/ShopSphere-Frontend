import axios from 'axios'
import { store } from '../store/store'
import { logout } from '../store/authSlice'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const state = store.getState()
  const token = state.auth.token || localStorage.getItem('shopsphere_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('shopsphere_token')
      localStorage.removeItem('shopsphere_user')
      store.dispatch(logout())

      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(error)
  },
)

export default api