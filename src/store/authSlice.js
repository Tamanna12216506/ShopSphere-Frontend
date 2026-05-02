import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('shopsphere_token') || null,
  user: localStorage.getItem('shopsphere_user')
    ? JSON.parse(localStorage.getItem('shopsphere_user'))
    : null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const { token, user } = action.payload
      state.token = token
      state.user = user
      localStorage.setItem('shopsphere_token', token)
      localStorage.setItem('shopsphere_user', JSON.stringify(user))
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('shopsphere_token')
      localStorage.removeItem('shopsphere_user')
    },
  },
})

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer

// Selectors
export const selectToken = (state) => state.auth.token
export const selectUser = (state) => state.auth.user
export const selectIsLoggedIn = (state) => !!state.auth.token
export const selectIsAdmin = (state) => state.auth.user?.role === 'ADMIN'
