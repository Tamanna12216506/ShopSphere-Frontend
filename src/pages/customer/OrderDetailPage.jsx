import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { CheckCircle, Circle } from 'lucide-react'
import { useOrder } from '../../hooks/useOrders'
import { cancelOrderAction, selectOrderDetail, selectCancelLoading } from '../../store/ordersSlice'
import { getProductById } from '../../api/catalog'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/Button'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge'
import { formatCurrency } from '../../utils/formatCurrency'

function OrderTracker({ status }) {
  const stages = [
    { key: 'CONFIRMED', label: 'Confirmed', description: 'Order confirmed' },
    { key: 'PACKED', label: 'Packed', description: 'Ready to ship' },
    { key: 'SHIPPED', label: 'Shipped', description: 'On the way' },
    { key: 'DELIVERED', label: 'Delivered', description: 'Order delivered' }
  ]

  const statusOrder = ['CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED']
  const currentIndex = statusOrder.indexOf(status)

  return (
    <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
      <p className="mb-6 text-sm font-semibold text-dark-900 uppercase tracking-wider">Order Tracking</p>
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => (
          <div key={stage.key} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              {index > 0 && (
                <div className={`flex-1 h-1 mr-2 rounded-full ${index <= currentIndex ? 'bg-green-500' : 'bg-surface-200'}`}></div>
              )}
              {index <= currentIndex ? (
                <CheckCircle className="h-8 w-8 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="h-8 w-8 text-surface-300 flex-shrink-0" />
              )}
              {index < stages.length - 1 && (
                <div className={`flex-1 h-1 ml-2 rounded-full ${index < currentIndex ? 'bg-green-500' : 'bg-surface-200'}`}></div>
              )}
            </div>
            <p className="mt-3 text-xs font-semibold text-dark-900">{stage.label}</p>
            <p className="text-xs text-dark-500">{stage.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderItemRow({ item }) {
  const [description, setDescription] = useState('')

  useEffect(() => {
    getProductById(item.productId)
      .then(res => setDescription(res.data.data.productDescription))
      .catch(() => setDescription('Description unavailable'))
  }, [item.productId])

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-surface-200 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-4 sm:items-center">
        {item.productImageUrl && <img src={item.productImageUrl} alt={item.productName} className="h-16 w-16 rounded-lg object-cover" />}
        <div>
          <p className="font-semibold text-dark-900">{item.productName}</p>
          <p className="mt-1 max-w-md text-sm text-dark-600 line-clamp-2">{description || 'Loading...'}</p>
          <p className="mt-2 text-sm text-dark-500">Qty {item.quantity}</p>
        </div>
      </div>
      <span className="font-semibold text-dark-900">{formatCurrency(item.subtotal)}</span>
    </div>
  )
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading } = useOrder(id)
  const order = useSelector(selectOrderDetail) || {}
  const isCancelling = useSelector(selectCancelLoading)

  const handleCancelOrder = () => {
    dispatch(cancelOrderAction(id))
      .unwrap()
      .then(() => toast.success('Order cancelled'))
      .catch(() => toast.error('Unable to cancel order'))
  }

  if (isLoading) return <Spinner className="py-20" />

  const address = order.deliveryAddress 
    ? `${order.deliveryAddress.addressLine}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state} ${order.deliveryAddress.pinCode}`
    : '—'

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
      <section className="shopsphere-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-dark-500">Order #{order.orderId}</p>
            <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Order details</h1>
          </div>
          <OrderStatusBadge status={order.orderStatus} />
        </div>

        <OrderTracker status={order.orderStatus} />

        <div className="mt-6 space-y-4">
          {(order.orderItems || []).map((item) => (
            <OrderItemRow key={item.productId || item.orderItemId} item={item} />
          ))}
        </div>
      </section>

      <aside className="shopsphere-card h-fit space-y-4 p-6 sm:p-8">
        <div className="space-y-2 text-sm text-dark-600">
          <p><span className="font-semibold text-dark-900">Total:</span> {formatCurrency(order.totalAmount)}</p>
          <p><span className="font-semibold text-dark-900">Payment:</span> {order.paymentMode}</p>
          <p><span className="font-semibold text-dark-900">Address:</span> {address}</p>
        </div>
        <div className="rounded-lg bg-purple-100 p-3 text-sm text-purple-800">
          <p className="font-medium">Note:</p>
          <p>You cannot cancel the order once it's packed</p>
        </div>
        {order.orderStatus === 'CONFIRMED' && (
          <Button className="w-full" onClick={handleCancelOrder} disabled={isCancelling}>
            Cancel order
          </Button>
        )}
        {order.orderStatus === 'PACKED' && (
          <p className="rounded-lg bg-orange-50 p-3 text-sm text-orange-700 font-medium">
            You cannot cancel the order once it's packed
          </p>
        )}
        {order.orderStatus === 'DELIVERED' && (
          <Button className="w-full" onClick={() => navigate(`/orders/${id}/review`)}>
            Give Review
          </Button>
        )}
      </aside>
    </div>
  )
}