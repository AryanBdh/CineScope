import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Film, Heart, Home, Search, Menu, X } from 'lucide-react'
import { useSearch } from '../context/SearchContext'
import { useFavorites } from '../context/FavoritesContext'

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useSearch()
  const { favorites } = useFavorites()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const handleSearch = (val) => {
    setSearchQuery(val)
    if (location.pathname !== '/') navigate('/')
  }

  const closeMenu = () => setMenuOpen(false)

  const navLinks = [
    { to: '/', label: 'Discover', icon: Home },
    { to: '/favorites', label: 'Watchlist', icon: Heart },
  ]

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">

        <Link to="/" className="flex items-center gap-2 mr-auto" onClick={closeMenu}>
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center shrink-0">
            <Film size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-lg hidden sm:block tracking-tight">
            CineScope
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all
                ${isActive(to)
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'text-neutral-300 hover:bg-neutral-800'
                }`}
            >
              <Icon size={14} />
              {label}
              {to === '/favorites' && favorites.length > 0 && (
                <span className={`text-xs rounded-full w-4 h-4 flex items-center justify-center font-semibold
                  ${isActive(to) ? 'bg-white text-orange-500' : 'bg-orange-500 text-white'}`}>
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 bg-neutral-800 rounded-full px-3 py-2 w-52 focus-within:ring-2 focus-within:ring-orange-400 transition-all">
          <Search size={14} className="text-neutral-400 shrink-0" />
          <input
            value={searchQuery}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search movies..."
            className="bg-transparent text-sm outline-none w-full placeholder-neutral-400 dark:placeholder-neutral-500"
          />
          {searchQuery && (
            <button onClick={() => handleSearch('')} className="shrink-0">
              <X size={13} className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300" />
            </button>
          )}
        </div>


        <button
          onClick={() => { setSearchOpen(o => !o); setMenuOpen(false) }}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
          aria-label="Search"
        >
          <Search size={17} />
        </button>

        {/* Mobile */}
        <button
          onClick={() => { setMenuOpen(o => !o); setSearchOpen(false) }}
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
          aria-label="Menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile search bar */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 animate-fade-in">
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-orange-400">
            <Search size={14} className="text-neutral-400 shrink-0" />
            <input
              autoFocus
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              placeholder="Search movies..."
              className="bg-transparent text-sm outline-none w-full placeholder-neutral-400"
            />
            {searchQuery && (
              <button onClick={() => handleSearch('')}>
                <X size={13} className="text-neutral-400" />
              </button>
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden border-t border-neutral-100 dark:border-neutral-800 py-2 px-3 animate-fade-in">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium
                ${isActive(to)
                  ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-500'
                  : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                }`}
            >
              <Icon size={16} />
              {label}
              {to === '/favorites' && favorites.length > 0 && (
                <span className="ml-auto bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}