import { useEffect, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { movieService } from '../services/api'

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'revenue.desc', label: 'Box Office' },
]

const RATING_OPTIONS = [
  { value: '5', label: '5+' },
  { value: '6', label: '6+' },
  { value: '7', label: '7+' },
  { value: '8', label: '8+' },
]

const YEARS = Array.from({ length: 35 }, (_, i) => 2025 - i)

const selectCls = `
  bg-neutral-100 dark:bg-neutral-800
  text-neutral-700 dark:text-neutral-200
  border-0 rounded-xl px-3 py-2 text-sm
  outline-none cursor-pointer
  focus:ring-2 focus:ring-orange-400
  transition-all
`

export default function Filters({ filters, onChange }) {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    movieService.getGenres()
      .then(d => setGenres(d.genres || []))
      .catch(() => {})
  }, [])

  const set = (key, value) => onChange({ ...filters, [key]: value || null, page: 1 })
  const hasFilters = filters.genreId || filters.year || filters.sortBy || filters.minRating

  return (
    <div className="flex flex-wrap items-center gap-2 py-4">
      <div className="flex items-center gap-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 mr-1 shrink-0">
        <SlidersHorizontal size={14} />
        <span>Filter</span>
      </div>

      {/* Genre */}
      <select
        value={filters.genreId || ''}
        onChange={e => set('genreId', e.target.value)}
        className={selectCls}
      >
        <option value="">All Genres</option>
        {genres.map(g => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>

      {/* Year */}
      <select
        value={filters.year || ''}
        onChange={e => set('year', e.target.value)}
        className={selectCls}
      >
        <option value="">Any Year</option>
        {YEARS.map(y => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={filters.sortBy || ''}
        onChange={e => set('sortBy', e.target.value)}
        className={selectCls}
      >
        <option value="">Sort By</option>
        {SORT_OPTIONS.map(s => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>

      {/* Rating */}
      <select
        value={filters.minRating || ''}
        onChange={e => set('minRating', e.target.value)}
        className={selectCls}
      >
        <option value="">Min Rating</option>
        {RATING_OPTIONS.map(r => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>

      {hasFilters && (
        <button
          onClick={() => onChange({ page: 1 })}
          className="flex items-center gap-1 text-sm font-medium text-orange-500 hover:text-orange-600 px-1 transition-colors"
        >
          <X size={13} />
          Clear
        </button>
      )}
    </div>
  )
}