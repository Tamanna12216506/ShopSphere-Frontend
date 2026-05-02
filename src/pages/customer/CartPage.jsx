import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../../hooks/useCart'
import { updateCart, removeCart, clearReduxCart, selectCartItems, selectCartTotal, selectCartLoading } from '../../store/cartSlice'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import { formatCurrency } from '../../utils/formatCurrency'

export default function CartPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const isLoading = useSelector(selectCartLoading)

  useCart()

  const handleUpdateQuantity = (cartItemId, quantity) => {
    dispatch(updateCart({ id: cartItemId, data: { quantity } }))
      .unwrap()
      .catch(() => toast.error('Failed to update quantity'))
  }

  const handleRemoveItem = (cartItemId) => {
    dispatch(removeCart(cartItemId))
      .unwrap()
      .then(() => toast.success('Item removed'))
      .catch(() => toast.error('Failed to remove item'))
  }

  const handleClearCart = () => {
    dispatch(clearReduxCart())
      .unwrap()
      .then(() => toast.success('Cart cleared'))
      .catch(() => toast.error('Failed to clear cart'))
  }

  const subtotal = cartItems?.reduce((sum, item) => sum + item.subtotal, 0) || 0

  if (isLoading && (!cartItems || cartItems.length === 0)) return <Spinner className="py-20" />

  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      <section className="shopsphere-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-5 w-5 text-pastel-violet" />
          <h1 className="text-2xl font-bold text-dark-900">Your cart</h1>
        </div>

        {cartItems?.length ? (
          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.cartItemId} className="flex flex-col gap-4 rounded-2xl border border-surface-200 p-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <img src={item.productImageUrl || item.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'} alt={item.productName} className="h-20 w-20 rounded-2xl object-cover" />
                  <div>
                    <h3 className="font-semibold text-dark-900">{item.productName}</h3>
                    <p className="text-sm text-dark-500">{formatCurrency(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" className="shopsphere-button-ghost h-10 w-10 px-0" onClick={() => item.quantity <= 1 ? handleRemoveItem(item.cartItemId) : handleUpdateQuantity(item.cartItemId, item.quantity - 1)}>
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-10 text-center font-semibold">{item.quantity}</span>
                  <button type="button" className="shopsphere-button-ghost h-10 w-10 px-0" onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity + 1)}>
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-dark-900">{formatCurrency(item.subtotal)}</span>
                  <button type="button" className="text-red-600" onClick={() => handleRemoveItem(item.cartItemId)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-surface-200 p-10 text-center">
            <p className="text-dark-500">Your cart is empty.</p>
            <Link to="/products" className="shopsphere-button-primary mt-4">Continue shopping</Link>
          </div>
        )}
      </section>

      <aside className="shopsphere-card h-fit p-6 sm:p-8 lg:sticky lg:top-24">
        <h2 className="text-xl font-bold text-dark-900">Summary</h2>
        <div className="mt-6 space-y-3 text-sm text-dark-600">
          <div className="flex items-center justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex items-center justify-between"><span>Shipping</span><span>Free</span></div>
          <div className="flex items-center justify-between text-base font-bold text-dark-900"><span>Total</span><span>{formatCurrency(cartTotal || subtotal)}</span></div>
        </div>
        <Button className="mt-6 w-full" onClick={() => navigate('/checkout')} disabled={!cartItems?.length}>
          Proceed to checkout
        </Button>
        <Button variant="ghost" className="mt-3 w-full" onClick={handleClearCart} disabled={!cartItems?.length}>
          Clear cart
        </Button>
      </aside>
    </div>
  )
}