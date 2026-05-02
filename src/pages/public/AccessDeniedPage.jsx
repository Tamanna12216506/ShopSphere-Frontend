import { Link } from 'react-router-dom'

export default function AccessDeniedPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4">
      <div className="shopsphere-card w-full p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-pastel-violet">403</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-dark-900">Access denied</h1>
        <p className="mx-auto mt-4 max-w-xl text-dark-600">
          Your account does not have permission to reach this area.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="shopsphere-button-primary">
            Back to home
          </Link>
          <Link to="/login" className="shopsphere-button-ghost">
            Sign in again
          </Link>
        </div>
      </div>
    </div>
  )
}