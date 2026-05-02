import { useEffect, useState } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Search, SlidersHorizontal } from 'lucide-react'
import toast from 'react-hot-toast'
import { useProducts, useCategories } from '../../hooks/useProducts'
import { selectIsLoggedIn } from '../../store/authSlice'
import { addCartItem } from '../../store/cartSlice'
import ProductCard from '../../components/ui/ProductCard'
import SkeletonCard from '../../components/ui/SkeletonCard'
import Pagination from '../../components/ui/Pagination'
import Button from '../../components/ui/Button'

const defaultFilters = {
  search: '',
  categoryId: '',
  page: '0',
  size: '10',
  sortBy: 'createdAt',
  sortDir: 'desc',
}

export default function ProductListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({ ...defaultFilters, ...Object.fromEntries(searchParams.entries()) })
  const { data, isLoading } = useProducts(filters)
  const { data: categoriesData } = useCategories()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)

  useEffect(() => {
    document.title = 'ShopSphere | Products'
  }, [])

  const categories = categoriesData || []
  const products = data?.content || []

  const updateParam = (name, value) => setFilters((current) => ({ ...current, [name]: value }))

  const applyFilters = () => {
    setSearchParams(filters)
  }

  const clearFilters = () => {
    setSearchParams(defaultFilters)
    setFilters(defaultFilters)
  }

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      toast('Login required to add items to cart')
      navigate('/login')
      return
    }
    dispatch(addCartItem({ productId: product.productId, quantity: 1 }))
      .unwrap()
      .then(() => toast.success('Added to cart'))
      .catch(() => toast.error('Failed to add to cart'))
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
      <aside className="shopsphere-card h-fit p-5 lg:sticky lg:top-24">
        <div className="flex items-center gap-3 text-dark-900">
          <SlidersHorizontal className="h-5 w-5 text-pastel-violet" />
          <h1 className="text-xl font-bold">Filters</h1>
        </div>

        <label className="mt-5 block">
          <span className="mb-2 block text-sm font-semibold text-dark-700">Search</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dark-400" />
            <input
              className="shopsphere-input pl-10"
              value={filters.search}
              onChange={(event) => updateParam('search', event.target.value)}
              placeholder="Search products"
            />
          </div>
        </label>

        <div className="mt-5 space-y-3">
          <p className="text-sm font-semibold text-dark-700">Categories</p>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm text-dark-600">
              <input type="radio" checked={!filters.categoryId} onChange={() => updateParam('categoryId', '')} /> All
            </label>
            {categories.map((category) => (
              <label key={category.categoryId} className="flex items-center gap-2 text-sm text-dark-600">
                <input
                  type="radio"
                  checked={String(filters.categoryId) === String(category.categoryId)}
                  onChange={() => updateParam('categoryId', String(category.categoryId))}
                />
                {category.categoryName}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <label>
            <span className="mb-2 block text-sm font-semibold text-dark-700">Sort by</span>
            <select className="shopsphere-input" value={filters.sortBy} onChange={(event) => updateParam('sortBy', event.target.value)}>
              <option value="createdAt">Newest</option>
              <option value="productPrice">Price</option>
              <option value="productName">Name</option>
            </select>
          </label>
          <label>
            <span className="mb-2 block text-sm font-semibold text-dark-700">Direction</span>
            <select className="shopsphere-input" value={filters.sortDir} onChange={(event) => updateParam('sortDir', event.target.value)}>
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <Button className="flex-1" onClick={applyFilters}>Apply</Button>
          <Button variant="ghost" className="flex-1" onClick={clearFilters}>Reset</Button>
        </div>
      </aside>

      <section>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Catalog</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-dark-900">Discover the product range</h2>
          </div>
          <Link to="/cart" className="shopsphere-button-ghost">View cart</Link>
        </div>

        {isLoading && products.length === 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)}
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.productId} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
            <Pagination
              page={Number(data?.number || filters.page || 0)}
              totalPages={data?.totalPages || 1}
              onPageChange={(page) => setSearchParams({ ...filters, page: String(page) })}
            />
          </>
        )}
      </section>
    </div>
  )
}