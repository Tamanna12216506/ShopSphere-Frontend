import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getHome, getProducts, getProductById, getCategories } from '../api/catalog'

export const fetchHome = createAsyncThunk('products/fetchHome', async () => {
  const response = await getHome()
  return response.data.data
})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (params) => {
  const response = await getProducts(params)
  return response.data.data
})

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
  const response = await getProductById(id)
  return response.data.data ?? response.data
})

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await getCategories()
  return response.data.data ?? response.data
})

const initialState = {
  home: null,
  products: [],
  productDetail: null,
  categories: [],
  currentParams: null,
  loading: {
    home: false,
    products: false,
    productDetail: false,
    categories: false,
  },
  error: {
    home: null,
    products: null,
    productDetail: null,
    categories: null,
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductDetail: (state) => {
      state.productDetail = null
      state.error.productDetail = null
    },
  },
  extraReducers: (builder) => {
    // Fetch Home
    builder
      .addCase(fetchHome.pending, (state) => {
        state.loading.home = true
        state.error.home = null
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.loading.home = false
        state.home = action.payload
      })
      .addCase(fetchHome.rejected, (state, action) => {
        state.loading.home = false
        state.error.home = action.error.message
      })

    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading.products = true
        state.error.products = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading.products = false
        state.products = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading.products = false
        state.error.products = action.error.message
      })

    // Fetch Product Detail
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading.productDetail = true
        state.error.productDetail = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading.productDetail = false
        state.productDetail = action.payload
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading.productDetail = false
        state.error.productDetail = action.error.message
      })

    // Fetch Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading.categories = true
        state.error.categories = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading.categories = false
        state.categories = action.payload
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading.categories = false
        state.error.categories = action.error.message
      })
  },
})

export const { clearProductDetail } = productsSlice.actions
export default productsSlice.reducer

// Selectors
export const selectHome = (state) => state.products.home
export const selectHomeLoading = (state) => state.products.loading.home
export const selectHomeError = (state) => state.products.error.home

export const selectProducts = (state) => state.products.products
export const selectProductsLoading = (state) => state.products.loading.products
export const selectProductsError = (state) => state.products.error.products

export const selectProductDetail = (state) => state.products.productDetail
export const selectProductDetailLoading = (state) => state.products.loading.productDetail
export const selectProductDetailError = (state) => state.products.error.productDetail

export const selectCategories = (state) => state.products.categories
export const selectCategoriesLoading = (state) => state.products.loading.categories
export const selectCategoriesError = (state) => state.products.error.categories
