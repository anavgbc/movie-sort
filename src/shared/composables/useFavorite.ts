import { ListService } from '../client/services/listService';
import { Movie } from '../interfaces/Movie';
import { useFavoriteStore } from '../store/Favorites';

export function useFavorites() {
    const listService = new ListService();
  
  const favoritesStore = useFavoriteStore();

  const addToFavorite = async (movie: Movie) => {
    const response = await listService.addToFavorite(movie);

    return response;
  };

  const getFavorites = async () => {
    const favoriteMovies = await listService.getFavorites();

    if (favoriteMovies) {
      favoritesStore.setFavorites(favoriteMovies);
    }
  }
  return {
    addToFavorite,
    getFavorites,
  };
}
