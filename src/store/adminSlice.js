import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getDashboard,
  getRevenueReport,
  createProduct,
  updateProduct,
  deleteProduct,
  markFeatured,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllOrders,
  getAdminOrderById,
  updateOrderStatus,
} from '../api/admin'

export const fetchDashboard = createAsyncThunk('admin/fetchDashboard', async () => {
  const response = await getDashboard()
  return response.data.data ?? response.data
})

export const fetchRevenueReport = createAsyncThunk('admin/fetchRevenueReport', async () => {
  const response = await getRevenueReport()
  return response.data.data ?? response.data
})

export const removeProduct = createAsyncThunk('admin/deleteProduct', async (id) => {
  await deleteProduct(id)
  return id
})

export const markProductFeatured = createAsyncThunk('admin/markFeatured', async (id) => {
  const response = await markFeatured(id)
  return response.data.data ?? response.data
})

export const createAdminProduct = createAsyncThunk('admin/createProduct', async (data) => {
  const response = await createProduct(data)
  return response.data.data ?? response.data
})

export const updateAdminProduct = createAsyncThunk('admin/updateProduct', async ({ id, data }) => {
  const response = await updateProduct(id, data)
  return response.data.data ?? response.data
})

export const createAdminCategory = createAsyncThunk('admin/createCategory', async (data) => {
  const response = await createCategory(data)
  return response.data.data ?? response.data
})

export const updateAdminCategory = createAsyncThunk('admin/updateCategory', async ({ id, data }) => {
  const response = await updateCategory(id, data)
  return response.data.data ?? response.data
})

export const deleteAdminCategory = createAsyncThunk('admin/deleteCategory', async (id) => {
  await deleteCategory(id)
  return id
})

export const fetchAdminOrders = createAsyncThunk('admin/fetchAdminOrders', async () => {
  const response = await getAllOrders()
  return response.data.data ?? response.data
})

export const fetchAdminOrderById = createAsyncThunk('admin/fetchAdminOrderById', async (id) => {
  const response = await getAdminOrderById(id)
  return response.data.data ?? response.data
})

export const updateAdminOrderStatus = createAsyncThunk('admin/updateOrderStatus', async ({ id, status }) => {
  const response = await updateOrderStatus(id, status)
  return { id, data: response.data.data ?? response.data }
})

const initialState = {
  dashboard: null,
  report: null,
  adminOrders: [],
  adminOrderDetail: null,
  loading: {
    dashboard: false,
    report: false,
    deleteProduct: false,
    markFeatured: false,
    saveProduct: false,
    saveCategory: false,
    deleteCategory: false,
    adminOrders: false,
    adminOrderDetail: false,
    updateOrderStatus: false,
  },
  error: {
    dashboard: null,
    report: null,
    deleteProduct: null,
    markFeatured: null,
    saveProduct: null,
    saveCategory: null,
    deleteCategory: null,
    adminOrders: null,
    adminOrderDetail: null,
    updateOrderStatus: null,
  },
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  extraReducers: (builder) => {
    // Fetch Dashboard
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading.dashboard = true
        state.error.dashboard = null
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading.dashboard = false
        state.dashboard = action.payload
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading.dashboard = false
        state.error.dashboard = action.error.message
      })

    // Fetch Revenue Report
    builder
      .addCase(fetchRevenueReport.pending, (state) => {
        state.loading.report = true
        state.error.report = null
      })
      .addCase(fetchRevenueReport.fulfilled, (state, action) => {
        state.loading.report = false
        state.report = action.payload
      })
      .addCase(fetchRevenueReport.rejected, (state, action) => {
        state.loading.report = false
        state.error.report = action.error.message
      })

    // Delete Product
    builder
      .addCase(removeProduct.pending, (state) => {
        state.loading.deleteProduct = true
        state.error.deleteProduct = null
      })
      .addCase(removeProduct.fulfilled, (state) => {
        state.loading.deleteProduct = false
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.loading.deleteProduct = false
        state.error.deleteProduct = action.error.message
      })

    // Mark Featured
    builder
      .addCase(markProductFeatured.pending, (state) => {
        state.loading.markFeatured = true
        state.error.markFeatured = null
      })
      .addCase(markProductFeatured.fulfilled, (state) => {
        state.loading.markFeatured = false
      })
      .addCase(markProductFeatured.rejected, (state, action) => {
        state.loading.markFeatured = false
        state.error.markFeatured = action.error.message
      })

    // Save Product
    builder
      .addCase(createAdminProduct.pending, (state) => {
        state.loading.saveProduct = true
        state.error.saveProduct = null
      })
      .addCase(createAdminProduct.fulfilled, (state) => {
        state.loading.saveProduct = false
      })
      .addCase(createAdminProduct.rejected, (state, action) => {
        state.loading.saveProduct = false
        state.error.saveProduct = action.error.message
      })
      .addCase(updateAdminProduct.pending, (state) => {
        state.loading.saveProduct = true
        state.error.saveProduct = null
      })
      .addCase(updateAdminProduct.fulfilled, (state) => {
        state.loading.saveProduct = false
      })
      .addCase(updateAdminProduct.rejected, (state, action) => {
        state.loading.saveProduct = false
        state.error.saveProduct = action.error.message
      })

    // Category Operations
    builder
      .addCase(createAdminCategory.pending, (state) => {
        state.loading.saveCategory = true
        state.error.saveCategory = null
      })
      .addCase(createAdminCategory.fulfilled, (state) => {
        state.loading.saveCategory = false
      })
      .addCase(createAdminCategory.rejected, (state, action) => {
        state.loading.saveCategory = false
        state.error.saveCategory = action.error.message
      })
      .addCase(updateAdminCategory.pending, (state) => {
        state.loading.saveCategory = true
        state.error.saveCategory = null
      })
      .addCase(updateAdminCategory.fulfilled, (state) => {
        state.loading.saveCategory = false
      })
      .addCase(updateAdminCategory.rejected, (state, action) => {
        state.loading.saveCategory = false
        state.error.saveCategory = action.error.message
      })
      .addCase(deleteAdminCategory.pending, (state) => {
        state.loading.deleteCategory = true
        state.error.deleteCategory = null
      })
      .addCase(deleteAdminCategory.fulfilled, (state) => {
        state.loading.deleteCategory = false
      })
      .addCase(deleteAdminCategory.rejected, (state, action) => {
        state.loading.deleteCategory = false
        state.error.deleteCategory = action.error.message
      })

    // Fetch Admin Orders
    builder
      .addCase(fetchAdminOrders.pending, (state) => {
        state.loading.adminOrders = true
        state.error.adminOrders = null
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.loading.adminOrders = false
        state.adminOrders = action.payload
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.loading.adminOrders = false
        state.error.adminOrders = action.error.message
      })

    // Fetch Admin Order Detail
    builder
      .addCase(fetchAdminOrderById.pending, (state) => {
        state.loading.adminOrderDetail = true
        state.error.adminOrderDetail = null
      })
      .addCase(fetchAdminOrderById.fulfilled, (state, action) => {
        state.loading.adminOrderDetail = false
        state.adminOrderDetail = action.payload
      })
      .addCase(fetchAdminOrderById.rejected, (state, action) => {
        state.loading.adminOrderDetail = false
        state.error.adminOrderDetail = action.error.message
      })

    // Update Admin Order Status
    builder
      .addCase(updateAdminOrderStatus.pending, (state) => {
        state.loading.updateOrderStatus = true
        state.error.updateOrderStatus = null
      })
      .addCase(updateAdminOrderStatus.fulfilled, (state, action) => {
        state.loading.updateOrderStatus = false
        state.adminOrders = state.adminOrders.map((order) => {
          if (order.orderId !== action.meta.arg.id) {
            return order
          }
          const newStatus = action.meta.arg.status
          return {
            ...order,
            orderStatus: newStatus || order.orderStatus,
          }
        })
      })
      .addCase(updateAdminOrderStatus.rejected, (state, action) => {
        state.loading.updateOrderStatus = false
        state.error.updateOrderStatus = action.error.message
      })
  },
})

export default adminSlice.reducer

// Selectors
export const selectDashboard = (state) => state.admin.dashboard
export const selectDashboardLoading = (state) => state.admin.loading.dashboard

export const selectReport = (state) => state.admin.report
export const selectReportLoading = (state) => state.admin.loading.report

export const selectDeleteProductLoading = (state) => state.admin.loading.deleteProduct
export const selectMarkFeaturedLoading = (state) => state.admin.loading.markFeatured
export const selectSaveProductLoading = (state) => state.admin.loading.saveProduct
export const selectSaveCategoryLoading = (state) => state.admin.loading.saveCategory
export const selectDeleteCategoryLoading = (state) => state.admin.loading.deleteCategory

export const selectAdminOrders = (state) => state.admin.adminOrders
export const selectAdminOrdersLoading = (state) => state.admin.loading.adminOrders
export const selectAdminOrderStatusUpdating = (state) => state.admin.loading.updateOrderStatus

export const selectAdminOrderDetail = (state) => state.admin.adminOrderDetail
export const selectAdminOrderDetailLoading = (state) => state.admin.loading.adminOrderDetail
