const statusConfig = {
  PENDING: { className: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
  CONFIRMED: { className: 'bg-blue-100 text-blue-700', label: 'Confirmed' },
  PACKED: { className: 'bg-violet-100 text-violet-700', label: 'Packed' },
  SHIPPED: { className: 'bg-orange-100 text-orange-700', label: 'Shipped' },
  DELIVERED: { className: 'bg-green-100 text-green-700', label: 'Delivered' },
  CANCELLED: { className: 'bg-red-100 text-red-700', label: 'Cancelled' },
  FAILED: { className: 'bg-gray-100 text-gray-600', label: 'Failed' },
}

export default function OrderStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.PENDING

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}>
      {config.label}
    </span>
  )
}