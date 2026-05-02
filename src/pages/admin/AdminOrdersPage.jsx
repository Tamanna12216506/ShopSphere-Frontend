import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { fetchAdminOrders, updateAdminOrderStatus, selectAdminOrders, selectAdminOrdersLoading, selectAdminOrderStatusUpdating } from '../../store/adminSlice'
import Spinner from '../../components/ui/Spinner'
import OrderStatusBadge from '../../components/ui/OrderStatusBadge'
import Button from '../../components/ui/Button'
import { formatCurrency } from '../../utils/formatCurrency'

const statuses = ['PENDING', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'FAILED']

export default function AdminOrdersPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const orders = useSelector(selectAdminOrders)
  const isLoading = useSelector(selectAdminOrdersLoading)
  const updatingStatus = useSelector(selectAdminOrderStatusUpdating)

  useEffect(() => {
    dispatch(fetchAdminOrders())
  }, [dispatch])

  const handleStatusChange = async (orderId, status) => {
    try {
      await dispatch(updateAdminOrderStatus({ id: orderId, status })).unwrap()
      toast.success('Order updated')
    } catch (error) {
      toast.error(error || 'Failed to update order')
    }
  }

  if (isLoading && orders.length === 0) return <Spinner className="py-20" />


  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Admin orders</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Order control</h1>
      </div>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.orderId} className="shopsphere-card flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-dark-500">Order #{order.orderId}</p>
              <p className="mt-1 font-semibold text-dark-900">{formatCurrency(order.totalAmount)}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <OrderStatusBadge status={order.orderStatus} />
              <select className="shopsphere-input w-auto" defaultValue={order.orderStatus} onChange={(event) => handleStatusChange(order.orderId, event.target.value)} disabled={updatingStatus}>
                {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
              <Button variant="ghost" className="px-4 py-2 text-sm" onClick={() => navigate(`/admin/orders/${order.orderId}`)}>View</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}