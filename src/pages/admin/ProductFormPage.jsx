import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useCategories, useProduct } from '../../hooks/useProducts'
import { createAdminProduct, updateAdminProduct, selectSaveProductLoading } from '../../store/adminSlice'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

export default function ProductFormPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const editing = Boolean(id)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const saveProductLoading = useSelector(selectSaveProductLoading)

  const { data: productData, isLoading: productLoading } = useProduct(id)
  const { data: categoriesData } = useCategories()

  useEffect(() => {
    if (productData) {
      reset({
        productName: productData.productName,
        productDescription: productData.productDescription,
        productPrice: productData.productPrice,
        productStock: productData.productStock,
        brand: productData.brand,
        imageUrl: productData.imageUrl,
        categoryId: productData.categoryId,
      })
    }
  }, [productData, reset])

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      productPrice: Number(values.productPrice),
      productStock: Number(values.productStock),
      categoryId: Number(values.categoryId),
    }

    try {
      if (editing) {
        await dispatch(updateAdminProduct({ id, data: payload })).unwrap()
      } else {
        await dispatch(createAdminProduct(payload)).unwrap()
      }
      toast.success(editing ? 'Product updated' : 'Product created')
      navigate('/admin/products')
    } catch (error) {
      toast.error(error || 'Unable to save product')
    }
  }

  if (productLoading) return <Spinner className="py-20" />

  const categories = categoriesData || []

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shopsphere-card mx-auto max-w-4xl space-y-6 p-6 sm:p-8">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">{editing ? 'Edit product' : 'New product'}</p>
        <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Product form</h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {[
          ['productName', 'Product name'],
          ['brand', 'Brand'],
          ['productPrice', 'Price'],
          ['productStock', 'Stock'],
          ['imageUrl', 'Image URL'],
        ].map(([name, label]) => (
          <label key={name} className={name === 'imageUrl' ? 'sm:col-span-2' : ''}>
            <span className="mb-2 block text-sm font-semibold text-dark-700">{label}</span>
            <input className="shopsphere-input" {...register(name, { required: `${label} is required` })} />
            {errors[name] && <p className="mt-1 text-xs text-red-600">{errors[name].message}</p>}
          </label>
        ))}
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-dark-700">Description</span>
          <textarea rows="5" className="shopsphere-input" {...register('productDescription', { required: 'Description is required' })} />
          {errors.productDescription && <p className="mt-1 text-xs text-red-600">{errors.productDescription.message}</p>}
        </label>
        <label className="sm:col-span-2">
          <span className="mb-2 block text-sm font-semibold text-dark-700">Category</span>
          <select className="shopsphere-input" {...register('categoryId', { required: 'Category is required' })}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
            ))}
          </select>
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting || saveProductLoading}>
        {editing ? 'Update product' : 'Create product'}
      </Button>
    </form>
  )
}