export default function Spinner({ className = '' }) {
  return (
    <div className={`inline-flex items-center gap-2 text-dark-500 ${className}`.trim()}>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      Loading
    </div>
  )
}