import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingBag, ShoppingCart, User, LogOut, Shield, Menu, X } from 'lucide-react'
import { selectUser, selectIsLoggedIn, logout } from '../../store/authSlice'
import { selectCartCount } from '../../store/cartSlice'

const navClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-all ${isActive ? 'bg-dark-800 text-white' : 'text-dark-700 hover:bg-surface-100'
  }`

export default function Navbar({ adminMode = false }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const cartCount = useSelector(selectCartCount)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleClick = () => setOpen(false)
    window.addEventListener('resize', handleClick)
    return () => window.removeEventListener('resize', handleClick)
  }, [])

  const links = adminMode
    ? [
      { to: '/admin', label: 'Dashboard' },
      { to: '/admin/products', label: 'Products' },
      { to: '/admin/categories', label: 'Categories' },
      { to: '/admin/orders', label: 'Orders' },
      { to: '/admin/reports', label: 'Reports' },
    ]
    : [
      { to: '/products', label: 'Products' },
      { to: '/orders', label: 'My Orders' },
      { to: '/payment/history', label: 'Payments' },
    ]

  return (
    <header className="sticky top-0 z-40 border-b border-surface-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-dark-800 to-pastel-violet text-white shadow-lg shadow-pastel-violet/20">
            <ShoppingBag className="h-5 w-5" />
          </span>
          <span className="font-display text-2xl font-extrabold tracking-tight text-dark-900">
            ShopSphere
          </span>
        </Link>

        <nav className="hidden flex-1 items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          {!adminMode && (
            <Link
              to="/cart"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-200 bg-white text-dark-800 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          {isLoggedIn ? (
            <div className="flex items-center gap-3 rounded-full border border-surface-200 bg-white px-3 py-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-100 text-dark-800">
                <User className="h-4 w-4" />
              </div>
              <div className="text-left text-sm">
                <p className="font-semibold text-dark-900">{user?.email || 'Account'}</p>
                <p className="text-dark-500">{user?.role || 'CUSTOMER'}</p>
              </div>
              {user?.role === 'ADMIN' && (
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full bg-dark-800 px-3 py-2 text-xs font-semibold text-white"
                  onClick={() => navigate('/admin')}
                >
                  <Shield className="h-3.5 w-3.5" /> Admin
                </button>
              )}
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-surface-200 text-dark-500 transition-all hover:bg-surface-50"
                onClick={() => {
                  dispatch(logout())
                  navigate('/login')
                }}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="shopsphere-button-ghost px-5 py-2.5 text-sm">
                Login
              </Link>
              <Link to="/register" className="shopsphere-button-primary px-5 py-2.5 text-sm">
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface-200 bg-white text-dark-800 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-surface-200 bg-white px-4 py-4 md:hidden sm:px-6 lg:px-8">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navClass} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            {!adminMode && (
              <Link to="/cart" className={navClass} onClick={() => setOpen(false)}>
                Cart ({cartCount})
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}