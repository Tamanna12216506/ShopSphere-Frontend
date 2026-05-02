import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { login } from '../../api/auth'
import { setAuth } from '../../store/authSlice'
import Button from '../../components/ui/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    document.title = 'ShopSphere | Login'
  }, [])

  const onSubmit = async (values) => {
    try {
      const { data } = await login(values)
      dispatch(setAuth({
        token: data.token,
        user: {
          email: data.user.email,
          role: data.user.role,
          userId: data.user.id,
        },
      }))
      toast.success('Welcome back to ShopSphere')
      navigate(data.user.role === 'ADMIN' ? '/admin' : '/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid w-full gap-8 lg:grid-cols-2">
        <div className="rounded-3xl bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 p-8 text-white shadow-[0_24px_80px_rgba(15,10,30,0.45)] lg:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-white/60">ShopSphere</p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-bold leading-tight lg:text-6xl">
            Sign in to manage orders, carts, and storefront workflows.
          </h1>
          <p className="mt-6 max-w-lg text-white/75">
            A polished commerce dashboard for customers and administrators with fast navigation and clear state.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="shopsphere-card p-8 sm:p-10">
          <h2 className="font-display text-3xl font-bold text-dark-900">Login</h2>
          <p className="mt-2 text-dark-500">Use the account created on the ShopSphere backend.</p>

          <label className="mt-8 block">
            <span className="mb-2 block text-sm font-semibold text-dark-700">Email</span>
            <input className="shopsphere-input" {...register('email', { required: 'Email is required' })} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-semibold text-dark-700">Password</span>
            <input type="password" className="shopsphere-input" {...register('password', { required: 'Password is required' })} />
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </label>

          <Button type="submit" className="mt-8 w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>

          <p className="mt-6 text-center text-sm text-dark-500">
            New here? <Link to="/register" className="font-semibold text-dark-900 underline-offset-4 hover:underline">Create an account</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}