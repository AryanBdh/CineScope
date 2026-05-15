import { createContext, useContext, useEffect, useState } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('movieflix-favorites') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('movieflix-favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (movie) => {
    setFavorites(prev =>
      prev.some(m => m.id === movie.id)
        ? prev.filter(m => m.id !== movie.id)
        : [...prev, movie]
    )
  }

  const isFavorite = (id) => favorites.some(m => m.id === id)

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}