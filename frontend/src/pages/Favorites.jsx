import { Heart, Trash2 } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';

export default function Favorites({ onMovieClick }) {
  const { favorites, toggle } = useFavorites();

  return (
    <main className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 text-orange-500 text-sm font-medium mb-1">
            <Heart size={14} fill="currentColor" /> Your Collection
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl">Watchlist</h1>
        </div>
        {favorites.length > 0 && (
          <span className="text-sm text-neutral-500">{favorites.length} movie{favorites.length !== 1 ? 's' : ''}</span>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-orange-50 dark:bg-orange-950 flex items-center justify-center mb-4">
            <Heart size={32} className="text-orange-300" />
          </div>
          <p className="text-xl font-semibold">Your watchlist is empty</p>
          <p className="text-sm text-neutral-500 mt-1 max-w-xs">
            Browse movies and tap the heart icon to save them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5">
          {favorites.map(m => (
            <MovieCard key={m.id} movie={m} onClick={onMovieClick} />
          ))}
        </div>
      )}
    </main>
  );
}