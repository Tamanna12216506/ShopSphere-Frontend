import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function Footer() {
  const [email, setEmail] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    setEmail('')
    toast.success('Subscribed! Check your inbox for exclusive deals.')
  }

  const SocialIcon = ({ href, label, icon }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="h-10 w-10 rounded-lg bg-pastel-violet/20 flex items-center justify-center text-pastel-violet hover:text-pastel-pink hover:bg-pastel-pink/20"
    >
      {icon}
    </a>
  )

  const NavLink = ({ to, href, children }) => {
    const className = 'text-surface-300 hover:text-pastel-pink text-sm'
    if (to) {
      return (
        <Link to={to} className={className}>
          {children}
        </Link>
      )
    }
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <footer className="border-t border-dark-700 bg-[#231840]">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Branding */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-lg bg-pastel-violet flex items-center justify-center text-dark-900 font-bold">
                S
              </div>
              <span className="text-lg font-bold text-surface-50">ShopSphere</span>
            </Link>
            <p className="text-sm text-surface-300 mb-5">
              Premium shopping experience with curated products and exceptional service.
            </p>
            <div className="flex gap-3">
              <SocialIcon
                href="https://twitter.com"
                label="Twitter"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-1 9-1z" />
                  </svg>
                }
              />
              <SocialIcon
                href="https://instagram.com"
                label="Instagram"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <circle cx="17.5" cy="6.5" r="1.5" />
                  </svg>
                }
              />
              <SocialIcon
                href="https://facebook.com"
                label="Facebook"
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a6 6 0 00-6 6v3H7v4h2v8h4v-8h3l1-4h-4V8a2 2 0 012-2h3z" />
                  </svg>
                }
              />
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-surface-50 mb-4 text-sm uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-3">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/products">Collections</NavLink></li>
              <li><NavLink to="/cart">Shopping Cart</NavLink></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-surface-50 mb-4 text-sm uppercase tracking-wide">Support</h3>
            <ul className="space-y-3">
              <li><NavLink to="/contact">Contact Us</NavLink></li>
              <li><NavLink to="/faq">FAQ & Help</NavLink></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-surface-50 mb-4 text-sm uppercase tracking-wide">Newsletter</h3>
            <p className="text-sm text-surface-300 mb-4">Get exclusive deals and new arrivals.</p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-dark-800 border border-dark-700 text-surface-50 placeholder-surface-400 focus:border-pastel-violet focus:outline-none"
              />
              <Button type="submit" className="w-full text-sm">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-dark-700 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm text-surface-50 font-medium">© {new Date().getFullYear()} ShopSphere. All rights reserved.</p>
          <div className="flex gap-6">
            <NavLink to="/privacy">Privacy & Terms</NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
