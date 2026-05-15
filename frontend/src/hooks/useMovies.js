import { useState, useEffect, useCallback } from 'react';
import { movieService } from '../services/api';

export function useMovies({ query, genreId, year, sortBy, page = 1 }) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (query) {
        data = await movieService.searchMovies(query, page);
      } else if (genreId || year || sortBy) {
        data = await movieService.discoverMovies({
          genreId,
          year,
          sortBy,
          page,
        });
      } else {
        data = await movieService.getTrending(page);
      }
      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages || 1, 500));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [query, genreId, year, sortBy, page]);

  useEffect(() => { fetch(); }, [fetch]);

  return { movies, totalPages, loading, error, refetch: fetch };
}

export function useMovieDetail(id) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    movieService.getMovieDetail(id)
      .then(setMovie)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  return { movie, loading, error };
}

export function useGenres() {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    movieService.getGenres().then(d => setGenres(d.genres || [])).catch(() => {});
  }, []);
  return genres;
}