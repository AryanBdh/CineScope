import { X, Star, Calendar, Clock, Heart, Play, ExternalLink } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetail } from '../hooks/useMovies';
import { useFavorites } from '../context/FavoritesContext';
import { poster, backdrop } from '../services/api';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetail(id);
  const { isFavorite, toggleFavorite } = useFavorites();
  
  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  if (!movie) return <div className="flex items-center justify-center min-h-screen">Movie not found</div>;
  
  const data = movie;
  const fav = isFavorite(data.id);

  const trailer = movie?.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const cast = movie?.credits?.cast?.slice(0, 8) || [];
  const similar = movie?.similar?.results?.slice(0, 4) || [];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => navigate(-1)}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative bg-white dark:bg-neutral-900 w-full sm:max-w-5xl max-h-[92vh] sm:max-h-[88vh] rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col animate-slide-up"
        onClick={e => e.stopPropagation()}
      >
        {/* Backdrop */}
        <div className="relative h-48 sm:h-56 shrink-0">
          {backdrop(data.backdrop_path) ? (
            <img src={backdrop(data.backdrop_path)} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-neutral-900 via-transparent to-transparent" />

          {/* Close */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70"
          >
            <X size={16} />
          </button>

          {/* Poster + title row */}
          <div className="absolute bottom-0 left-4 right-4 flex items-end gap-3 pb-3">
            {poster(data.poster_path) && (
              <img
                src={poster(data.poster_path, 'w185')}
                alt=""
                className="w-16 sm:w-20 rounded-xl shadow-xl shrink-0"
              />
            )}
            <div className="min-w-0 pb-1">
              <h2 className="font-display font-bold text-lg sm:text-xl leading-tight">{data.title}</h2>
              {data.tagline && <p className="text-xs text-neutral-500 dark:text-neutral-400 italic mt-0.5 line-clamp-1">{data.tagline}</p>}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-4 pb-6">
          <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            {data.vote_average > 0 && (
              <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                <Star size={13} fill="currentColor" /> {data.vote_average?.toFixed(1)}
              </span>
            )}
            {data.release_date && (
              <span className="flex items-center gap-1"><Calendar size={12} />{data.release_date?.slice(0, 4)}</span>
            )}
            {movie?.runtime > 0 && (
              <span className="flex items-center gap-1"><Clock size={12} />{movie.runtime}m</span>
            )}
          </div>

          {/* Genres */}
          {(movie?.genres || []).length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {movie.genres.map(g => (
                <span key={g.id} className="text-xs px-2.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950 text-orange-600 dark:text-orange-400 font-medium">
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {/* Overview */}
          {data.overview && (
            <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{data.overview}</p>
          )}

          {loading && (
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map(i => <div key={i} className="h-3 skeleton rounded-full" style={{ width: `${90 - i * 10}%` }} />)}
            </div>
          )}

          {/* Trailer */}
          {trailer && (
            <div className="mt-5">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-1.5"><Play size={13} /> Trailer</h3>
              <div className="rounded-xl overflow-hidden aspect-video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          )}

          {/* Cast */}
          {cast.length > 0 && (
            <div className="mt-5">
              <h3 className="font-semibold text-sm mb-3">Cast</h3>
              <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
                {cast.map(c => (
                  <div key={c.id} className="shrink-0 w-16 text-center">
                    <p className="text-xs font-medium mt-1 leading-tight line-clamp-2">{c.name}</p>
                    <p className="text-xs text-neutral-400 line-clamp-1">{c.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {similar.length > 0 && (
            <div className="mt-5">
              <h3 className="font-semibold text-sm mb-3">You Might Also Like</h3>
              <div className="grid grid-cols-4 gap-2">
                {similar.map(m => (
                  <div key={m.id} className="cursor-pointer group" onClick={() => navigate(`/movie/${m.id}`)}>
                    <div className="rounded-xl overflow-hidden aspect-[2/3] bg-neutral-200 dark:bg-neutral-800">
                      {poster(m.poster_path, 'w185')
                        ? <img src={poster(m.poster_path, 'w185')} alt={m.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                        : <div className="w-full h-full flex items-center justify-center">🎬</div>
                      }
                    </div>
                    <p className="text-xs mt-1 line-clamp-2 group-hover:text-orange-500 transition-colors">{m.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-4 py-3 border-t border-neutral-100 dark:border-neutral-800 flex gap-2 shrink-0">
          <button
            onClick={() => toggleFavorite(data)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all
              ${fav
                ? 'bg-orange-500 text-white'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-orange-50 dark:hover:bg-neutral-700'
              }`}
          >
            <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
            {fav ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
}