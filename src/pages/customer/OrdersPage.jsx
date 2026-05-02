import { Link } from 'react-router-dom'
import { useOrders } from '../../hooks/useOrders'
import Spinner from '../../components/ui/Spinner'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

export default function OrdersPage() {
  const { data, isLoading } = useOrders()
  const orders = data || []

  if (isLoading && orders.length === 0) return <Spinner className="py-20" />

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Orders</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Your purchase history</h1>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link key={order.orderId} to={`/orders/${order.orderId}`} className="shopsphere-card shopsphere-card-hover flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-dark-500">Order #{order.orderId}</p>
              <h2 className="mt-1 text-lg font-semibold text-dark-900">{formatDate(order.createdAt)}</h2>
              <p className="mt-1 text-sm text-dark-500">{order.paymentMode} payment</p>
            </div>
            <div className="flex items-center gap-4">
              <OrderStatusBadge status={order.orderStatus} />
              <span className="font-semibold text-dark-900">{formatCurrency(order.totalAmount)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}