import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useCategories } from '../../hooks/useProducts'
import { fetchCategories } from '../../store/productsSlice'
import { createAdminCategory, updateAdminCategory, deleteAdminCategory, selectSaveCategoryLoading, selectDeleteCategoryLoading } from '../../store/adminSlice'
import Button from '../../components/ui/Button'
import Spinner from '../../components/ui/Spinner'

export default function CategoriesPage() {
  const dispatch = useDispatch()
  const [form, setForm] = useState({ categoryName: '', description: '', imageUrl: '' })
  const [editingId, setEditingId] = useState(null)
  const { data, isLoading } = useCategories()
  const savingCategory = useSelector(selectSaveCategoryLoading)
  const deletingCategory = useSelector(selectDeleteCategoryLoading)

  useEffect(() => {
    document.title = 'ShopSphere | Categories'
  }, [])

  const handleSave = async () => {
    try {
      if (editingId) {
        await dispatch(updateAdminCategory({ id: editingId, data: form })).unwrap()
      } else {
        await dispatch(createAdminCategory(form)).unwrap()
      }
      toast.success(editingId ? 'Category updated' : 'Category created')
      setForm({ categoryName: '', description: '', imageUrl: '' })
      setEditingId(null)
      dispatch(fetchCategories())
    } catch (error) {
      toast.error(error || 'Unable to save category')
    }
  }

  const handleDelete = async (categoryId) => {
    try {
      await dispatch(deleteAdminCategory(categoryId)).unwrap()
      toast.success('Category deleted')
      dispatch(fetchCategories())
    } catch (error) {
      toast.error(error || 'Unable to delete category')
    }
  }

  const categories = data || []

  if (isLoading && categories.length === 0) return <Spinner className="py-20" />

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <form
        className="shopsphere-card space-y-4 p-6"
        onSubmit={(event) => {
          event.preventDefault()
          handleSave()
        }}
      >
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-dark-500">Category admin</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-dark-900">Manage categories</h1>
        </div>
        {['categoryName', 'description', 'imageUrl'].map((name) => (
          <label key={name} className="block">
            <span className="mb-2 block text-sm font-semibold text-dark-700">{name}</span>
            <input
              className="shopsphere-input"
              value={form[name]}
              onChange={(event) => setForm((current) => ({ ...current, [name]: event.target.value }))}
            />
          </label>
        ))}
        <Button type="submit" className="w-full" disabled={savingCategory}>{editingId ? 'Update category' : 'Create category'}</Button>
      </form>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.categoryId} className="shopsphere-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-dark-900">{category.categoryName}</h2>
              <p className="text-sm text-dark-500">{category.description || 'No description'}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="px-4 py-2 text-sm"
                onClick={() => {
                  setEditingId(category.categoryId)
                  setForm({
                    categoryName: category.categoryName || '',
                    description: category.description || '',
                    imageUrl: category.imageUrl || '',
                  })
                }}
              >
                Edit
              </Button>
              <button
                type="button"
                className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700"
                onClick={() => window.confirm('Delete this category?') && handleDelete(category.categoryId)}
                disabled={deletingCategory}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}