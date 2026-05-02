import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BarChart, Bar, ResponsiveContainer, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'
import { fetchRevenueReport, selectReport, selectReportLoading } from '../../store/adminSlice'
import Spinner from '../../components/ui/Spinner'
import { formatCurrency } from '../../utils/formatCurrency'

export default function ReportsPage() {
  const dispatch = useDispatch()
  const report = useSelector(selectReport) || {}
  const isLoading = useSelector(selectReportLoading)

  useEffect(() => {
    dispatch(fetchRevenueReport())
  }, [dispatch])

  // Transform revenueByStatus map from backend into an array for Recharts
  const chartData = useMemo(() => {
    if (!report.revenueByStatus) return []
    return Object.entries(report.revenueByStatus).map(([status, value]) => ({
      label: status,
      value: value
    }))
  }, [report.revenueByStatus])

  if (isLoading) return <Spinner className="py-20" />

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Reports</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Revenue insights</h1>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ['Total Revenue', formatCurrency(report.totalRevenue || 0)],
          ['Orders', report.totalOrders || 0],
          ['Average Order Value', formatCurrency(report.averageOrderValue || 0)],
          ['Customers', report.totalCustomers || 0],
        ].map(([label, value]) => (
          <div key={label} className="shopsphere-card p-5">
            <p className="text-sm text-dark-500">{label}</p>
            <p className="mt-3 text-2xl font-bold text-dark-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="shopsphere-card h-[420px] p-5">
        <h2 className="text-lg font-semibold text-dark-900">Revenue by status</h2>
        <div className="mt-4 h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eadcf6" />
              <XAxis dataKey="label" stroke="#6b5b95" />
              <YAxis stroke="#6b5b95" />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="value" fill="#c4b5fd" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}