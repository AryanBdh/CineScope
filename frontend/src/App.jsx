import { FavoritesProvider } from './context/FavoritesContext';
import { SearchProvider } from './context/SearchContext';
import Navbar from './components/Navbar';
import RouterComponent from './routes/RouterComponent';

function App() {
  return (
    <FavoritesProvider>
      <SearchProvider>
        <Navbar />
        <RouterComponent />
      </SearchProvider>
    </FavoritesProvider>
  );
}

export default App;