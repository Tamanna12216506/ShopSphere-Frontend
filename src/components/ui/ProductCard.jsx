import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import Badge from './Badge'
import Button from './Button'
import { formatCurrency } from '../../utils/formatCurrency'

export default function ProductCard({ product, onAddToCart, showAddButton = true }) {
  return (
    <article className="shopsphere-card shopsphere-card-hover flex h-full flex-col overflow-hidden p-4">
      <Link to={`/products/${product.productId}`} className="flex h-full flex-1 flex-col">
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-surface-100 to-white">
          <img
            src={product.imageUrl || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'}
            alt={product.productName}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-dark-500/70">
              {product.categoryName || 'Curated pick'}
            </p> */}
            <p className="h-8 text-xs font-semibold uppercase tracking-[0.1em] text-dark-500/70 line-clamp-2">
              {product.categoryName || 'Curated pick'}
            </p>
            <h3 className="mt-1 h-14 text-lg font-semibold text-dark-900 line-clamp-2">
              {product.productName}
            </h3>
          </div>
          {product.isAvailable === false ? (
            <Badge className="bg-red-100 text-red-700">Out</Badge>
          ) : (
            <Badge className="bg-green-100 text-green-700">In stock</Badge>
          )}
        </div>
        <p className="mt-3 h-10 line-clamp-2 text-sm text-dark-500">
          {product.productDescription || 'A premium product with a clean storefront presentation.'}
        </p>
        <div className="mt-4 flex items-center justify-between gap-4 pt-1">
          <span className="text-xl font-bold text-dark-900">{formatCurrency(product.productPrice || product.price)}</span>
          {/* <span className="text-sm text-dark-500">Stock {product.productStock ?? '—'}</span> */}
        </div>
      </Link>

      {showAddButton && (
        <div className="mt-4 flex items-center gap-3">
          <Button className="flex-1" onClick={() => onAddToCart?.(product)}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      )}
    </article>
  )
}