import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../components/ui/Spinner'
import { fetchPaymentHistory, selectPayments, selectPaymentsLoading } from '../../store/paymentSlice'
import { formatCurrency } from '../../utils/formatCurrency'
import { formatDate } from '../../utils/formatDate'

function getPaymentStatus(payment) {
  if (payment.status) return payment.status
  if (payment.paymentStatus) return payment.paymentStatus

  if (payment.orderStatus === 'CANCELLED') {
    return payment.paymentMode === 'COD' ? 'Cancelled' : 'Refunded'
  }

  return payment.paymentMode === 'COD' ? 'Pending' : 'Completed'
}

export default function PaymentHistoryPage() {
  const dispatch = useDispatch()
  const payments = useSelector(selectPayments)
  const isLoading = useSelector(selectPaymentsLoading)

  useEffect(() => {
    dispatch(fetchPaymentHistory())
  }, [dispatch])

  if (isLoading && payments.length === 0) return <Spinner className="py-20" />

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Payments</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Payment history</h1>
      </div>
      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment.paymentId || payment.orderId} className="shopsphere-card flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-dark-900">Order #{payment.orderId}</p>
              <p className="text-sm text-dark-500">{formatDate(payment.createdAt || payment.paymentDate)}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-dark-900">{formatCurrency(payment.amount || payment.totalAmount)}</p>
              <p className="text-sm text-dark-500">{getPaymentStatus(payment)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}