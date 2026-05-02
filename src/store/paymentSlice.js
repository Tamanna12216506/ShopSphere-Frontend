import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPaymentHistory } from '../api/payment'

export const fetchPaymentHistory = createAsyncThunk('payments/fetchPaymentHistory', async () => {
  const response = await getPaymentHistory()
  return response.data.data ?? response.data
})

const initialState = {
  payments: [],
  loading: false,
  error: null,
}

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action) => {
        state.loading = false
        state.payments = action.payload
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default paymentSlice.reducer

// Selectors
export const selectPayments = (state) => state.payments.payments
export const selectPaymentsLoading = (state) => state.payments.loading
export const selectPaymentsError = (state) => state.payments.error
