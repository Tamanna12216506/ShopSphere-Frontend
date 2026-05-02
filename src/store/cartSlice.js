import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '../api/cart'

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await getCart()
  return response.data.data ?? response.data
})

export const addCartItem = createAsyncThunk('cart/addCartItem', async (data) => {
  const response = await addToCart(data)
  return response.data.data ?? response.data
})

export const updateCart = createAsyncThunk('cart/updateCartItem', async ({ id, data }) => {
  const response = await updateCartItem(id, data)
  return response.data.data ?? response.data
})

export const removeCart = createAsyncThunk('cart/removeCartItem', async (id) => {
  const response = await removeCartItem(id)
  return response.data.data ?? response.data
})

export const clearReduxCart = createAsyncThunk('cart/clearCart', async () => {
  const response = await clearCart()
  return response.data.data ?? response.data
})

const initialState = {
  items: [],
  totalAmount: 0,
  cartCount: 0,
  loading: false,
  error: null,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartCount: (state, action) => {
      state.cartCount = action.payload
    },
  },
  extraReducers: (builder) => {
    // Fetch Cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload?.items || []
        state.totalAmount = action.payload?.totalPrice || 0
        state.cartCount = action.payload?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    // Add to Cart
    builder
      .addCase(addCartItem.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload?.items || []
        state.totalAmount = action.payload?.totalPrice || 0
        state.cartCount = action.payload?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    // Update Cart Item
    builder
      .addCase(updateCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload?.items || []
        state.totalAmount = action.payload?.totalPrice || 0
        state.cartCount = action.payload?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    // Remove Cart Item
    builder
      .addCase(removeCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeCart.fulfilled, (state, action) => {
        state.loading = false
        const removedId = action.meta.arg
        state.items = state.items.filter(item => item.cartItemId !== removedId)
        state.totalAmount = state.items.reduce((sum, item) => sum + item.subtotal, 0)
        state.cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0)
      })
      .addCase(removeCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    // Clear Cart
    builder
      .addCase(clearReduxCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(clearReduxCart.fulfilled, (state) => {
        state.loading = false
        state.items = []
        state.totalAmount = 0
        state.cartCount = 0
      })
      .addCase(clearReduxCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const { setCartCount } = cartSlice.actions
export default cartSlice.reducer

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) => state.cart.totalAmount
export const selectCartCount = (state) => state.cart.cartCount
export const selectCartLoading = (state) => state.cart.loading
export const selectCartError = (state) => state.cart.error

