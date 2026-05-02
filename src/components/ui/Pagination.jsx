export default function Pagination({ page = 0, totalPages = 1, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index)

  if (totalPages <= 1) return null

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        className="shopsphere-button-ghost px-4 py-2 text-sm"
        onClick={() => onPageChange(Math.max(0, page - 1))}
        disabled={page === 0}
      >
        Prev
      </button>
      {pages.map((currentPage) => (
        <button
          key={currentPage}
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            currentPage === page
              ? 'bg-dark-800 text-white'
              : 'border border-surface-200 bg-white text-dark-700 hover:bg-surface-50'
          }`}
          onClick={() => onPageChange(currentPage)}
        >
          {currentPage + 1}
        </button>
      ))}
      <button
        type="button"
        className="shopsphere-button-ghost px-4 py-2 text-sm"
        onClick={() => onPageChange(Math.min(totalPages - 1, page + 1))}
        disabled={page >= totalPages - 1}
      >
        Next
      </button>
    </div>
  )
}