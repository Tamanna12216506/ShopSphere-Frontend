import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../../hooks/useCart'
import { createOrder, selectCheckoutLoading } from '../../store/ordersSlice'
import { fetchCart } from '../../store/cartSlice'
import AddressForm from '../../components/forms/AddressForm'
import PaymentForm from '../../components/forms/PaymentForm'
import Button from '../../components/ui/Button'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data: cart } = useCart()
  const isCheckingOut = useSelector(selectCheckoutLoading)
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { paymentMode: 'CARD', country: 'India' },
  })

  const paymentMode = useWatch({ control, name: 'paymentMode' })
  const totalAmount = useMemo(() => cart?.totalAmount || 0, [cart])

  const onSubmit = (values) => {
    const deliveryAddress = {
      fullName: values.fullName,
      addressLine: values.addressLine2 ? `${values.addressLine1}, ${values.addressLine2}` : values.addressLine1,
      city: values.city,
      state: values.state,
      pinCode: values.postalCode,
      phoneNumber: values.phone,
    }

    const payload = { deliveryAddress, paymentMode }

    if (paymentMode !== 'COD') {
      payload.cardHolderName = values.cardHolderName
      payload.cardPin = values.cardPin
    }

    dispatch(createOrder(payload))
      .unwrap()
      .then(() => {
        toast.success('Order placed successfully')
        dispatch(fetchCart())
        navigate('/orders')
      })
      .catch(() => toast.error('Checkout failed'))
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={handleSubmit(onSubmit)} className="shopsphere-card space-y-8 p-6 sm:p-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Checkout</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Delivery address</h1>
        </div>
        <AddressForm register={register} errors={errors} />
        <div>
          <h2 className="mb-4 font-display text-2xl font-bold text-dark-900">Payment</h2>
          <PaymentForm paymentMode={paymentMode} register={register} errors={errors} />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting || isCheckingOut}>
          Place order
        </Button>
      </form>

      <aside className="shopsphere-card h-fit space-y-5 p-6 sm:p-8 lg:sticky lg:top-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Order summary</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-dark-900">Review your cart</h2>
        </div>
        <div className="space-y-3 text-sm text-dark-600">
          {(cart?.items || []).map((item) => (
            <div key={item.cartItemId} className="flex items-center justify-between gap-3">
              <span className="line-clamp-1">{item.productName} x {item.quantity}</span>
              <span>{formatCurrency(item.subtotal)}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-surface-200 pt-4 text-lg font-bold text-dark-900">
          <span>Total</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
      </aside>
    </div>
  )
}