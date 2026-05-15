const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const IMAGE_BASE = 'https://image.tmdb.org/t/p'

export const getPosterUrl = (path, size = 'w500') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null

export const getBackdropUrl = (path, size = 'original') =>
  path ? `${IMAGE_BASE}/${size}${path}` : null

// Aliases for shorter naming
export const poster = getPosterUrl
export const backdrop = getBackdropUrl

async function request(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', API_KEY)
  Object.entries(params).forEach(([key, val]) => {
    if (val !== null && val !== undefined && val !== '') {
      url.searchParams.set(key, val)
    }
  })
  const res = await fetch(url)
  if (!res.ok) throw new Error(`TMDB Error ${res.status}: ${res.statusText}`)
  return res.json()
}

export const movieService = {
  getTrending: (page = 1) =>
    request('/trending/movie/week', { page }),

  getPopular: (page = 1) =>
    request('/movie/popular', { page }),

  getTopRated: (page = 1) =>
    request('/movie/top_rated', { page }),

  searchMovies: (query, page = 1) =>
    request('/search/movie', { query, page }),

  getMovieDetail: (id) =>
    request(`/movie/${id}`, { append_to_response: 'credits,videos,similar' }),

  getGenres: () =>
    request('/genre/movie/list'),

  discoverMovies: ({ genreId, year, sortBy, minRating, page = 1 }) =>
    request('/discover/movie', {
      with_genres: genreId || undefined,
      primary_release_year: year || undefined,
      sort_by: sortBy || 'popularity.desc',
      vote_average_gte: minRating || undefined,
      page,
    }),
}