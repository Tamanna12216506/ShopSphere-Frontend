/* eslint-disable react-refresh/only-export-components */

import { lazy } from 'react'
import { useSelector } from 'react-redux'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { selectIsLoggedIn, selectIsAdmin } from '../store/authSlice'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import AdminSidebar from '../components/layout/AdminSidebar'

const HomePage = lazy(() => import('../pages/public/HomePage'))
const ProductListPage = lazy(() => import('../pages/public/ProductListPage'))
const ProductDetailPage = lazy(() => import('../pages/public/ProductDetailPage'))
const LoginPage = lazy(() => import('../pages/public/LoginPage'))
const RegisterPage = lazy(() => import('../pages/public/RegisterPage'))
const AccessDeniedPage = lazy(() => import('../pages/public/AccessDeniedPage'))
const ContactPage = lazy(() => import('../pages/public/ContactPage'))
const FAQPage = lazy(() => import('../pages/public/FAQPage'))
const PrivacyTermsPage = lazy(() => import('../pages/public/PrivacyTermsPage'))
const CartPage = lazy(() => import('../pages/customer/CartPage'))
const CheckoutPage = lazy(() => import('../pages/customer/CheckoutPage'))
const OrdersPage = lazy(() => import('../pages/customer/OrdersPage'))
const OrderDetailPage = lazy(() => import('../pages/customer/OrderDetailPage'))
const ReviewPage = lazy(() => import('../pages/customer/ReviewPage'))
const PaymentHistoryPage = lazy(() => import('../pages/customer/PaymentHistoryPage'))
const DashboardPage = lazy(() => import('../pages/admin/DashboardPage'))
const ProductsPage = lazy(() => import('../pages/admin/ProductsPage'))
const ProductFormPage = lazy(() => import('../pages/admin/ProductFormPage'))
const CategoriesPage = lazy(() => import('../pages/admin/CategoriesPage'))
const AdminOrdersPage = lazy(() => import('../pages/admin/AdminOrdersPage'))
const AdminOrderDetailPage = lazy(() => import('../pages/admin/AdminOrderDetailPage'))
const ReportsPage = lazy(() => import('../pages/admin/ReportsPage'))

const RootLayout = () => (
  <div className="min-h-screen">
    <Navbar />
    <main className="mx-auto w-full max-w-[95%] px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <Outlet />
    </main>
    <Footer />
  </div>
)

const AdminLayout = () => (
  <div className="flex min-h-screen bg-surface-50">
    <AdminSidebar />
    <div className="flex min-w-0 flex-1 flex-col">
      <Navbar adminMode />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  </div>
)

const ProtectedRoute = ({ adminOnly = false }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isAdmin = useSelector(selectIsAdmin)

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/access-denied" replace />
  }

  return <Outlet />
}

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductListPage /> },
      { path: 'products/:id', element: <ProductDetailPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'access-denied', element: <AccessDeniedPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FAQPage /> },
      { path: 'privacy', element: <PrivacyTermsPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'cart', element: <CartPage /> },
          { path: 'checkout', element: <CheckoutPage /> },
          { path: 'orders', element: <OrdersPage /> },
          { path: 'orders/:id', element: <OrderDetailPage /> },
          { path: 'orders/:orderId/review', element: <ReviewPage /> },
          { path: 'payment/history', element: <PaymentHistoryPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute adminOnly />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: 'admin', element: <DashboardPage /> },
          { path: 'admin/products', element: <ProductsPage /> },
          { path: 'admin/products/new', element: <ProductFormPage /> },
          { path: 'admin/products/:id/edit', element: <ProductFormPage /> },
          { path: 'admin/categories', element: <CategoriesPage /> },
          { path: 'admin/orders', element: <AdminOrdersPage /> },
          { path: 'admin/orders/:id', element: <AdminOrderDetailPage /> },
          { path: 'admin/reports', element: <ReportsPage /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])