import api from './axiosInstance'

export const getCart = () => api.get('/api/orders/cart')

export const addToCart = (data) => api.post('/api/orders/cart/items', data)

export const updateCartItem = (id, data) => api.put(`/api/orders/cart/items/${id}`, data)

export const removeCartItem = (id) => api.delete(`/api/orders/cart/items/${id}`)

export const clearCart = () => api.delete('/api/orders/cart')