import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { fetchDashboard, selectDashboard, selectDashboardLoading } from '../../store/adminSlice'
import Spinner from '../../components/ui/Spinner'
import { formatCurrency } from '../../utils/formatCurrency'

const statCards = [
  ['totalOrders', 'Total Orders'],
  ['totalRevenue', 'Total Revenue'],
  ['pendingOrders', 'Pending Orders'],
  ['lowStockProducts', 'Low Stock'],
]

export default function DashboardPage() {
  const dispatch = useDispatch()
  const dashboard = useSelector(selectDashboard) || {}
  const isLoading = useSelector(selectDashboardLoading)

  useEffect(() => {
    dispatch(fetchDashboard())
  }, [dispatch])

  if (isLoading) return <Spinner className="py-20" />

  const statusData = [
    { name: 'Confirmed', value: dashboard.confirmedOrders || 0 },
    { name: 'Packed', value: dashboard.packedOrders || 0 },
    { name: 'Shipped', value: dashboard.shippedOrders || 0 },
    { name: 'Delivered', value: dashboard.deliveredOrders || 0 },
  ]

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Admin dashboard</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Operations overview</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([key, label]) => (
          <div key={key} className="shopsphere-card p-5">
            <p className="text-sm text-dark-500">{label}</p>
            <p className="mt-3 text-3xl font-bold text-dark-900">
              {key === 'totalRevenue' ? formatCurrency(dashboard[key]) : dashboard[key] || 0}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="shopsphere-card p-5">
          <h2 className="text-lg font-semibold text-dark-900">Status breakdown</h2>
          <div className="mt-4 space-y-3">
            {statusData.map((item) => (
              <div key={item.name}>
                <div className="mb-1 flex items-center justify-between text-sm text-dark-600">
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-100">
                  <div className="h-2 rounded-full bg-gradient-to-r from-dark-500 to-pastel-violet" style={{ width: `${Math.min(100, item.value * 10)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shopsphere-card h-[360px] p-5">
          <h2 className="text-lg font-semibold text-dark-900">Orders by status</h2>
          <div className="mt-4 h-[290px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eadcf6" />
                <XAxis dataKey="name" stroke="#6b5b95" />
                <YAxis stroke="#6b5b95" />
                <Tooltip />
                <Bar dataKey="value" fill="#5b3f9a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}