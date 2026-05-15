import { Heart, Star, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getPosterUrl } from '../services/api'
import { useFavorites } from '../context/FavoritesContext'

export default function MovieCard({ movie }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const navigate = useNavigate()
  const fav = isFavorite(movie.id)
  const posterUrl = getPosterUrl(movie.poster_path)
  const year = movie.release_date?.slice(0, 4)
  const rating = movie.vote_average?.toFixed(1)

  const handleFav = (e) => {
    e.stopPropagation()
    toggleFavorite(movie)
  }

  return (
    <article
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="group cursor-pointer animate-fade-in"
    >
      <div className="relative rounded-2xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 aspect-[2/3]">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
            className="w-full h-full object-cover "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-4xl">
            🎬
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {rating && parseFloat(rating) > 0 && (
          <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm text-yellow-400 text-xs font-semibold px-2 py-1 rounded-full">
            <Star size={10} fill="currentColor" />
            {rating}
          </div>
        )}
        <button
          onClick={handleFav}
          aria-label={fav ? 'Remove from watchlist' : 'Add to watchlist'}
          className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200
            ${fav
              ? 'bg-orange-500 text-white scale-110'
              : 'bg-black/40 text-white opacity-0 group-hover:opacity-100 hover:bg-orange-500'
            }`}
        >
          <Heart size={13} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="mt-2.5 px-0.5">
        <h3 className="font-medium text-sm leading-snug line-clamp-2 group-hover:text-orange-500 transition-colors duration-200">
          {movie.title}
        </h3>
        {year && (
          <p className="flex items-center gap-1 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
            <Calendar size={10} />
            {year}
          </p>
        )}
      </div>
    </article>
  )
}