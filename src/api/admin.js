import api from './axiosInstance'

export const getDashboard = () => api.get('/api/admin/dashboard')
export const getRevenueReport = () => api.get('/api/admin/reports/revenue')

export const createProduct = (data) => api.post('/api/admin/catalog/products', data)
export const updateProduct = (id, data) => api.put(`/api/admin/catalog/products/${id}`, data)
export const deleteProduct = (id) => api.delete(`/api/admin/catalog/products/${id}`)
export const markFeatured = (id) => api.patch(`/api/admin/catalog/products/${id}/featured`)

export const createCategory = (data) => api.post('/api/admin/catalog/categories', data)
export const updateCategory = (id, data) => api.put(`/api/admin/catalog/categories/${id}`, data)
export const deleteCategory = (id) => api.delete(`/api/admin/catalog/categories/${id}`)

export const getAllOrders = () => api.get('/api/admin/orders')
export const getAdminOrderById = (id) => api.get(`/api/admin/orders/${id}`)
export const updateOrderStatus = (id, status) => api.put(`/api/admin/orders/${id}/status`, { status })