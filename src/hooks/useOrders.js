import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchOrders,
  fetchOrderById,
  selectOrders,
  selectOrdersLoading,
  selectOrderDetail,
  selectOrderDetailLoading,
} from '../store/ordersSlice'

export const useOrders = () => {
  const dispatch = useDispatch()
  const data = useSelector(selectOrders)
  const isLoading = useSelector(selectOrdersLoading)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [dispatch])

  return { data, isLoading }
}

export const useOrder = (id) => {
  const dispatch = useDispatch()
  const data = useSelector(selectOrderDetail)
  const isLoading = useSelector(selectOrderDetailLoading)

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id))
    }
  }, [dispatch, id])

  return { data, isLoading }
}