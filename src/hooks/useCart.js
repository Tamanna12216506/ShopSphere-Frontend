import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart, selectCartItems, selectCartTotal, selectCartLoading, selectCartError } from '../store/cartSlice'

export const useCart = () => {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const totalAmount = useSelector(selectCartTotal)
  const isLoading = useSelector(selectCartLoading)
  const error = useSelector(selectCartError)

  useEffect(() => {
    dispatch(fetchCart())
  }, [dispatch])

  return {
    data: { items, totalAmount },
    isLoading,
    error,
  }
}