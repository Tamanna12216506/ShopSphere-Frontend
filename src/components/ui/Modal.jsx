export default function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dark-900/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-dark-900">{title}</h3>
          <button type="button" className="text-sm text-dark-500" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}