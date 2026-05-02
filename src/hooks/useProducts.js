import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchHome,
  fetchProducts,
  fetchProductById,
  fetchCategories,
  selectHome,
  selectHomeLoading,
  selectProducts,
  selectProductsLoading,
  selectProductDetail,
  selectProductDetailLoading,
  selectCategories,
  selectCategoriesLoading,
} from '../store/productsSlice'

export const useHome = () => {
  const dispatch = useDispatch()
  const data = useSelector(selectHome)
  const isLoading = useSelector(selectHomeLoading)

  useEffect(() => {
    dispatch(fetchHome())
  }, [dispatch])

  return { data, isLoading }
}

export const useProducts = (params) => {
  const dispatch = useDispatch()
  const data = useSelector(selectProducts)
  const isLoading = useSelector(selectProductsLoading)

  useEffect(() => {
    dispatch(fetchProducts(params))
  }, [dispatch, params])

  return { data, isLoading }
}

export const useProduct = (id) => {
  const dispatch = useDispatch()
  const data = useSelector(selectProductDetail)
  const isLoading = useSelector(selectProductDetailLoading)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id])

  return { data, isLoading }
}

export const useCategories = () => {
  const dispatch = useDispatch()
  const data = useSelector(selectCategories)
  const isLoading = useSelector(selectCategoriesLoading)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  return { data, isLoading }
}