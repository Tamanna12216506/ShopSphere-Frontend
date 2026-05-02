import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Package, ListTree, ShoppingBag, BarChart3 } from 'lucide-react'

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
    isActive ? 'bg-dark-800 text-white shadow-lg' : 'text-dark-700 hover:bg-surface-100'
  }`

export default function AdminSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-surface-200 bg-white/90 p-4 backdrop-blur-md lg:block">
      <div className="mb-6 rounded-2xl bg-gradient-to-br from-dark-900 to-dark-700 p-5 text-white shadow-lg">
        <p className="text-xs uppercase tracking-[0.25em] text-white/70">Administration</p>
        <h2 className="mt-2 font-display text-2xl font-bold">ShopSphere Panel</h2>
      </div>
      <nav className="space-y-2">
        <NavLink to="/admin" className={linkClass}>
          <LayoutDashboard className="h-4 w-4" /> Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          <Package className="h-4 w-4" /> Products
        </NavLink>
        <NavLink to="/admin/categories" className={linkClass}>
          <ListTree className="h-4 w-4" /> Categories
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          <ShoppingBag className="h-4 w-4" /> Orders
        </NavLink>
        <NavLink to="/admin/reports" className={linkClass}>
          <BarChart3 className="h-4 w-4" /> Reports
        </NavLink>
      </nav>
    </aside>
  )
}