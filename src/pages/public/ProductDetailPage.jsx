import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Minus, Plus, ShoppingCart, Zap } from 'lucide-react'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { useProduct } from '../../hooks/useProducts'
import { selectIsLoggedIn } from '../../store/authSlice'
import { addCartItem, selectCartLoading } from '../../store/cartSlice'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Spinner from '../../components/ui/Spinner'
import { formatCurrency } from '../../utils/formatCurrency'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const { data, isLoading } = useProduct(id)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const isAdding = useSelector(selectCartLoading)

  const product = data || {}

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    dispatch(addCartItem({ productId: product.productId || id, quantity }))
      .unwrap()
      .then(() => {
        toast.success('Added to cart')
        setQuantity(1)
      })
      .catch(() => toast.error('Failed to add to cart'))
  }

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      navigate('/login')
      return
    }
    dispatch(addCartItem({ productId: product.productId || id, quantity }))
      .unwrap()
      .then(() => {
        toast.success('Added to cart')
        navigate('/cart')
      })
      .catch(() => toast.error('Failed to add to cart'))
  }

  return isLoading ? (
    <Spinner className="py-20" />
  ) : (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 lg:grid-cols-2">
      <div className="shopsphere-card overflow-hidden p-4">
        <div className="rounded-[1.5rem] bg-gradient-to-br from-surface-100 via-white to-pastel-violet/20 p-4">
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'}
            alt={product.productName}
            className="h-full w-full rounded-[1.25rem] object-cover shadow-[0_20px_60px_rgba(15,10,30,0.18)]"
          />
        </div>
      </div>

      <div className="shopsphere-card p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-dark-500">Product detail</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-dark-900">{product.productName}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge className="bg-surface-100 text-dark-700">{product.brand || 'ShopSphere pick'}</Badge>
          <Badge className="bg-green-100 text-green-700">{product.isAvailable === false ? 'Out of stock' : 'In stock'}</Badge>
        </div>
        <p className="mt-6 text-3xl font-bold text-dark-900">{formatCurrency(product.productPrice)}</p>
        <p className="mt-4 leading-7 text-dark-600">{product.productDescription || 'A polished product page with clean purchase flow and responsive controls.'}</p>

        {product.isAvailable === false && (
          <div className="mt-6 rounded-lg bg-red-50 p-4 border border-red-200">
            <p className="text-red-700 font-semibold text-lg">⚠️ Out of Stock</p>
            <p className="text-red-600 text-sm mt-1">This product is currently unavailable. Please check back soon or explore similar items.</p>
          </div>
        )}

        <div className="mt-8 flex items-center gap-3">
          <button type="button" className="shopsphere-button-ghost h-12 w-12 px-0" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
            <Minus className="h-4 w-4" />
          </button>
          <div className="flex h-12 min-w-16 items-center justify-center rounded-full border border-surface-200 bg-white px-5 font-semibold text-dark-900">
            {quantity}
          </div>
          <button type="button" className="shopsphere-button-ghost h-12 w-12 px-0" onClick={() => setQuantity((value) => value + 1)}>
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button className="min-w-[180px]" onClick={handleAddToCart} disabled={isAdding || product.isAvailable === false}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
          </Button>
          <Button variant="ghost" className="min-w-[180px]" onClick={handleBuyNow} disabled={isAdding || product.isAvailable === false}>
            <Zap className="mr-2 h-4 w-4" /> Buy now
          </Button>
        </div>

        <div className="mt-10 rounded-2xl bg-surface-50 p-5 text-sm text-dark-600">
          <p><span className="font-semibold text-dark-900">Brand:</span> {product.brand || '—'}</p>
          <p className="mt-2"><span className="font-semibold text-dark-900">Stock:</span> {product.productStock ?? '—'}</p>
          <p className="mt-2"><span className="font-semibold text-dark-900">Category:</span> {product.categoryName || '—'}</p>
        </div>

        <div className="mt-6">
          <Link to="/products" className="text-sm font-semibold text-dark-700 underline-offset-4 hover:underline">Back to products</Link>
        </div>
      </div>
    </motion.div>
  )
}