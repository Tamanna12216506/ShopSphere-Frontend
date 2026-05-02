import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { fetchAdminOrderById, selectAdminOrderDetail, selectAdminOrderDetailLoading } from '../../store/adminSlice'
import Spinner from '../../components/ui/Spinner'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge'
import { formatCurrency } from '../../utils/formatCurrency'

export default function AdminOrderDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const order = useSelector(selectAdminOrderDetail) || {}
  const isLoading = useSelector(selectAdminOrderDetailLoading)

  useEffect(() => {
    if (id) {
      dispatch(fetchAdminOrderById(id))
    }
  }, [dispatch, id])

  if (isLoading && !order.orderId) return <Spinner className="py-20" />

  return (
    <div className="space-y-6">
      <Link to="/admin/orders" className="inline-flex items-center text-sm font-semibold text-dark-500 hover:text-dark-900">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to orders
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="shopsphere-card p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-dark-500">Order #{order.orderId}</p>
              <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Order details</h1>
            </div>
            <OrderStatusBadge status={order.orderStatus} />
          </div>

          <div className="mt-6 space-y-4">
            {(order.orderItems || []).map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-4 rounded-2xl border border-surface-200 p-4">
                <div>
                  <p className="font-semibold text-dark-900">{item.productName}</p>
                  <p className="text-sm text-dark-500">Qty {item.quantity}</p>
                </div>
                <span className="font-semibold text-dark-900">{formatCurrency(item.subtotal)}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="shopsphere-card h-fit space-y-4 p-6 sm:p-8">
          <h2 className="font-semibold text-dark-900">Summary</h2>
          <div className="space-y-2 text-sm text-dark-600">
            <p><span className="font-semibold text-dark-900">Total:</span> {formatCurrency(order.totalAmount)}</p>
            <p><span className="font-semibold text-dark-900">Payment:</span> {order.paymentMode}</p>
            <p><span className="font-semibold text-dark-900">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleString() : '—'}</p>
            <p><span className="font-semibold text-dark-900">Address:</span> {order.deliveryAddress?.addressLine1 || '—'} {order.deliveryAddress?.city || ''}</p>
            <p><span className="font-semibold text-dark-900">User:</span> {order.userId}</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
