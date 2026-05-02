import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Pencil, Star, Trash2, Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import { useProducts } from '../../hooks/useProducts'
import { removeProduct, markProductFeatured, selectDeleteProductLoading, selectMarkFeaturedLoading } from '../../store/adminSlice'
import { fetchProducts } from '../../store/productsSlice'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'
import { formatCurrency } from '../../utils/formatCurrency'

const defaultParams = { page: 0, size: 50, sortBy: 'createdAt', sortDir: 'desc' }

export default function ProductsPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { data, isLoading } = useProducts(defaultParams)
  const deleteLoading = useSelector(selectDeleteProductLoading)
  const featureLoading = useSelector(selectMarkFeaturedLoading)

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Delete this product?')) {
      dispatch(removeProduct(productId))
        .unwrap()
        .then(() => toast.success('Product deleted'))
        .catch(() => toast.error('Failed to delete product'))
    }
  }

  const handleMarkFeatured = (productId) => {
    dispatch(markProductFeatured(productId))
      .unwrap()
      .then(() => {
        toast.success('Feature status updated')
        dispatch(fetchProducts(defaultParams))
      })
      .catch(() => toast.error('Failed to update feature status'))
  }

  const products = data?.content || data || []

  if (isLoading && products.length === 0) return <Spinner className="py-20" />

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Catalog management</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Products</h1>
        </div>
        <Button onClick={() => navigate('/admin/products/new')}>
          <Plus className="mr-2 h-4 w-4" /> Add product
        </Button>
      </div>

      <div className="shopsphere-card overflow-hidden">
        <table className="min-w-full divide-y divide-surface-200 text-sm">
          <thead className="bg-surface-50 text-left text-dark-600">
            <tr>
              {['#', 'Thumbnail', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map((heading) => (
                <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-200 bg-white">
            {(Array.isArray(products) ? products : []).map((product, index) => (
              <tr key={product.productId}>
                <td className="px-4 py-4 text-dark-500">{index + 1}</td>
                <td className="px-4 py-4"><img src={product.imageUrl} alt={product.productName} className="h-14 w-14 rounded-xl object-cover" /></td>
                <td className="px-4 py-4 font-semibold text-dark-900">{product.productName}</td>
                <td className="px-4 py-4 text-dark-600">{product.categoryName || '—'}</td>
                <td className="px-4 py-4 text-dark-600">{formatCurrency(product.productPrice)}</td>
                <td className="px-4 py-4 text-dark-600">{product.productStock}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    <button type="button" className="shopsphere-button-ghost px-3 py-2 text-xs" onClick={() => navigate(`/admin/products/${product.productId}/edit`)}>
                      <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                    </button>
                    <button type="button" className="shopsphere-button-ghost px-3 py-2 text-xs" onClick={() => handleMarkFeatured(product.productId)} disabled={featureLoading}>
                      <Star className={`mr-1 h-3.5 w-3.5 ${product.featured ? 'fill-yellow-400 text-yellow-400' : ''}`} /> Feature
                    </button>
                    <button type="button" className="rounded-full bg-red-100 px-3 py-2 text-xs font-semibold text-red-700" onClick={() => handleDeleteProduct(product.productId)} disabled={deleteLoading}>
                      <Trash2 className="mr-1 inline h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}