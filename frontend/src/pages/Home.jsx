import { useState, useEffect } from 'react'
import { TrendingUp, AlertCircle } from 'lucide-react'
import { movieService } from '../services/api'
import { useSearch } from '../context/SearchContext'
import MovieCard from '../components/MovieCard'
import SkeletonCard from '../components/SkeletonCard'
import Filters from '../components/Filters'
import Pagination from '../components/Pagination'

export default function Home() {
  const { searchQuery } = useSearch()
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({ page: 1 })

  // Reset to page 1 on new search
  useEffect(() => {
    setFilters(f => ({ ...f, page: 1 }))
  }, [searchQuery])

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const fetch = async () => {
      try {
        let data
        if (searchQuery?.trim()) {
          data = await movieService.searchMovies(searchQuery, filters.page)
        } else if (filters.genreId || filters.year || filters.sortBy || filters.minRating) {
          data = await movieService.discoverMovies(filters)
        } else {
          data = await movieService.getTrending(filters.page)
        }
        setMovies(data.results || [])
        setTotalPages(Math.min(data.total_pages || 1, 500))
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetch()
    return () => controller.abort()
  }, [searchQuery, filters])

  const handlePageChange = (p) => {
    setFilters(f => ({ ...f, page: p }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">

      {/* Page header */}
      {searchQuery ? (
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl sm:text-3xl">
            Results for{' '}
            <span className="text-orange-500">"{searchQuery}"</span>
          </h1>
          {!loading && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {movies.length} movies found
            </p>
          )}
        </div>
      ) : (
        <div className="mb-2">
          <h1 className="font-display font-bold text-3xl sm:text-4xl">
            Discover Movies
          </h1>
        </div>
      )}

      {/* Filters */}
      {!searchQuery && (
        <Filters filters={filters} onChange={setFilters} />
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm mb-6">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Failed to load movies</p>
            <p className="text-xs mt-0.5 opacity-75">{error}</p>
          </div>
        </div>
      )}

      {/* Movie grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-4 gap-4 sm:gap-5">
        {loading
          ? Array.from({ length: 18 }).map((_, i) => <SkeletonCard key={i} />)
          : movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        }
      </div>

      {!loading && !error && movies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <span className="text-6xl mb-4">🎬</span>
          <p className="text-xl font-semibold">No movies found</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Try a different search term or clear your filters
          </p>
        </div>
      )}

      <Pagination
        page={filters.page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </main>
  )
}