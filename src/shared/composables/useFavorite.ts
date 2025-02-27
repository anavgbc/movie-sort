import { ListService } from '../client/services/listService';
import { Movie } from '../interfaces/Movie';
import { useFavoriteStore } from '../store/Favorites';
import { useMoviesStore } from '../store/Movies';

export function useFavorites() {
  const listService = new ListService();

  const favoritesStore = useFavoriteStore();
  const movieStore = useMoviesStore();

  const addToFavorite = async (movie: Movie) => {
    const response = await listService.addToFavorite(movie);

    return response;
  };

  const removeFromFavorite = async (movie: Movie) => {
    const response = await listService.removeFromFavorite(movie.id);
    return response;
  };

  const getFavorites = async () => {
    const favoriteMovies = await listService.getFavorites();

    console.log(favoriteMovies);

    if (favoriteMovies) {
      movieStore.setFavoriteMovies(favoriteMovies);
    }
  };
  return {
    addToFavorite,
    getFavorites,
    removeFromFavorite,
  };
}
