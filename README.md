# CineScope - Movie Discovery App

A modern, responsive movie browsing application built with React and Tailwind CSS.

## Features

- **Movie Discovery**: Browse trending, popular, and top-rated movies
- **Search**: Real-time search across TMDB's entire movie database
- **Filters**: Filter by genre, release year, and minimum rating
- **Detailed Views**: Full movie information including cast, budget, runtime, overview
- **Favorites Management**: Add/remove favorite movies with localStorage persistence
- **Responsive Design**: 2 card mobile → 4 cards on large screens

## Tech Stack

**React 18** • **Vite** • **React Router v6** • **Tailwind CSS** • **TMDB API** • **Context API**

## Quick Start

```bash
cd frontend
npm install

npm run dev
```

Visit [http://localhost:5173]


## Architecture

**State Management**: Context API (Favorites, Search) + localStorage
**API Layer**: Custom hooks + axios + TMDB API v3
**UI**: React components + Tailwind CSS responsive grid
**Routing**: React Router v6 with dynamic routes

## Key Implementation Details

### Search State Management
- **SearchContext**: Centralized state to avoid prop drilling
- Navbar and Home communicate through context instead of props

### Favorites System
- **FavoritesContext** with localStorage persistence
- Add/remove movies instantly synced to storage

### API Integration
- TMDB API v3 with query parameter authentication
- Custom movieService with methods for each endpoint
- Error handling with AbortController

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| **API 401 Errors** | Proper axios config with api_key query parameter |
| **Prop Drilling** | SearchContext prevents passing through 4+ levels |
| **Responsive Grid** | Tailwind: grid-cols-1 sm:2 md:3 lg:4 xl:5 |
| **Favorites Persistence** | localStorage sync in context with JSON |
| **Image Loading** | Skeleton cards + lazy loading attributes |

## Technologies & Learning

✅ React Hooks for state management
✅ Context API to avoid prop drilling
✅ Custom hooks to abstract API logic
✅ Tailwind CSS responsive design
✅ React Router v6 for SPA navigation
✅ TMDB API integration
✅ localStorage for persistence
✅ Component composition best practices

---


