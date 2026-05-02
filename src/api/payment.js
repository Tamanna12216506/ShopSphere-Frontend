import api from './axiosInstance'

export const getPaymentByOrder = (orderId) => api.get(`/api/payment/order/${orderId}`)

export const getPaymentHistory = () => api.get('/api/payment/history')