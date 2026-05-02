import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getMyOrders, getOrderById, checkout, cancelOrder } from '../api/orders'

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await getMyOrders()
  return response.data.data ?? response.data
})

export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (id) => {
  const response = await getOrderById(id)
  return response.data.data ?? response.data
})

export const createOrder = createAsyncThunk('orders/createOrder', async (data) => {
  const response = await checkout(data)
  return response.data.data ?? response.data
})

export const cancelOrderAction = createAsyncThunk('orders/cancelOrder', async (id) => {
  const response = await cancelOrder(id)
  return response.data.data ?? response.data
})

const initialState = {
  orders: [],
  orderDetail: null,
  loading: {
    orders: false,
    orderDetail: false,
    checkout: false,
    cancel: false,
  },
  error: {
    orders: null,
    orderDetail: null,
    checkout: null,
    cancel: null,
  },
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderDetail: (state) => {
      state.orderDetail = null
      state.error.orderDetail = null
    },
  },
  extraReducers: (builder) => {
    // Fetch Orders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading.orders = true
        state.error.orders = null
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading.orders = false
        state.orders = action.payload
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading.orders = false
        state.error.orders = action.error.message
      })

    // Fetch Order Detail
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading.orderDetail = true
        state.error.orderDetail = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading.orderDetail = false
        state.orderDetail = action.payload
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading.orderDetail = false
        state.error.orderDetail = action.error.message
      })

    // Checkout
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading.checkout = true
        state.error.checkout = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading.checkout = false
        state.orders = [...(state.orders || []), action.payload]
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading.checkout = false
        state.error.checkout = action.error.message
      })

    // Cancel Order
    builder
      .addCase(cancelOrderAction.pending, (state) => {
        state.loading.cancel = true
        state.error.cancel = null
      })
      .addCase(cancelOrderAction.fulfilled, (state, action) => {
        state.loading.cancel = false
        state.orderDetail = action.payload
        if (state.orders) {
          const index = state.orders.findIndex((o) => o.orderId === action.payload.orderId)
          if (index !== -1) {
            state.orders[index] = action.payload
          }
        }
      })
      .addCase(cancelOrderAction.rejected, (state, action) => {
        state.loading.cancel = false
        state.error.cancel = action.error.message
      })
  },
})

export const { clearOrderDetail } = ordersSlice.actions
export default ordersSlice.reducer

// Selectors
export const selectOrders = (state) => state.orders.orders
export const selectOrdersLoading = (state) => state.orders.loading.orders
export const selectOrdersError = (state) => state.orders.error.orders

export const selectOrderDetail = (state) => state.orders.orderDetail
export const selectOrderDetailLoading = (state) => state.orders.loading.orderDetail
export const selectOrderDetailError = (state) => state.orders.error.orderDetail

export const selectCheckoutLoading = (state) => state.orders.loading.checkout
export const selectCheckoutError = (state) => state.orders.error.checkout

export const selectCancelLoading = (state) => state.orders.loading.cancel
export const selectCancelError = (state) => state.orders.error.cancel
