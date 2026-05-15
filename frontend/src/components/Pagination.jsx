import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null

  const start = Math.max(1, page - 2)
  const end = Math.min(totalPages, page + 2)
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i)

  const btnBase = 'w-9 h-9 rounded-xl text-sm font-medium flex items-center justify-center transition-all'
  const active = `${btnBase} bg-orange-500 text-white shadow-sm`
  const inactive = `${btnBase} bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-orange-100 dark:hover:bg-neutral-700`
  const disabled = `${btnBase} bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-600 cursor-not-allowed opacity-50`

  return (
    <div className="flex items-center justify-center gap-1.5 py-10">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className={page === 1 ? disabled : inactive}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className={inactive}>1</button>
          {start > 2 && <span className="text-neutral-400 px-1 text-sm">…</span>}
        </>
      )}

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={p === page ? active : inactive}
          aria-label={`Page ${p}`}
          aria-current={p === page ? 'page' : undefined}
        >
          {p}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="text-neutral-400 px-1 text-sm">…</span>}
          <button onClick={() => onPageChange(totalPages)} className={inactive}>{totalPages}</button>
        </>
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className={page === totalPages ? disabled : inactive}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}