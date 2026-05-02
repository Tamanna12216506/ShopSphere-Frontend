import api from './axiosInstance'

export const getHome = () => api.get('/api/catalog/home')

export const getProducts = (params) => api.get('/api/catalog/products', { params })

export const getProductById = (id) => api.get(`/api/catalog/products/${id}`)

export const getCategories = () => api.get('/api/catalog/categories')

export const getCategoryById = (id) => api.get(`/api/catalog/categories/${id}`)