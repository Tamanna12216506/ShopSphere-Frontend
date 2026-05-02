import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { signup, login } from '../../api/auth'
import { setAuth } from '../../store/authSlice'
import Button from '../../components/ui/Button'

export default function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    defaultValues: { role: 'CUSTOMER' },
  })

  const onSubmit = async (values) => {
    try {
      await signup(values)
      const { data } = await login({ email: values.email, password: values.password })
      dispatch(setAuth({
        token: data.token,
        user: {
          email: data.user.email,
          role: data.user.role,
          userId: data.user.id,
        },
      }))
      toast.success('Account created successfully! Welcome to ShopSphere.')
      navigate(data.user.role === 'ADMIN' ? '/admin' : '/')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid w-full gap-8 lg:grid-cols-2">
        <div className="shopsphere-card overflow-hidden bg-gradient-to-br from-pastel-pink/30 via-white to-pastel-violet/25 p-8 sm:p-10 lg:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-dark-500">Join ShopSphere</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-dark-900 lg:text-6xl">
            Create your customer account to start shopping.
          </h1>
          <p className="mt-6 max-w-lg text-dark-600">
            The frontend is designed to match the backend contract while staying easy to extend.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="shopsphere-card p-8 sm:p-10">
          <h2 className="font-display text-3xl font-bold text-dark-900">Register</h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-sm font-semibold text-dark-700">Username</span>
              <input className="shopsphere-input" {...register('username', { required: 'Username is required' })} />
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username.message}</p>}
            </label>
            <label>
              <span className="mb-2 block text-sm font-semibold text-dark-700">Phone number</span>
              <input className="shopsphere-input" {...register('phoneNumber', { required: 'Phone number is required' })} />
              {errors.phoneNumber && <p className="mt-1 text-xs text-red-600">{errors.phoneNumber.message}</p>}
            </label>
          </div>

          <label className="mt-5 block">
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
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </Button>

          <p className="mt-6 text-center text-sm text-dark-500">
            Already registered? <Link to="/login" className="font-semibold text-dark-900 underline-offset-4 hover:underline">Login</Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}