import SearchOptions from '@/modules/home/presenter/utils/constants/searchOptions';
import { ListService } from '@/shared/client/services/listService';
import { MoviesService } from '@/shared/client/services/moviesService';
import { TvShowService } from '@/shared/client/services/tvShowService';
import { ref } from 'vue';
import { Movie } from '../interfaces/Movie';
import { useMoviesStore } from '../store/Movies';

export function useMovies() {
  const movieService = new MoviesService();
  const tvShowService = new TvShowService();
  const listService = new ListService();

  const movieStore = useMoviesStore();

  const isLoading = ref<boolean>(false);

  const getPopularMovies = async () => {
    const movies = await movieService.listPopularMovies();
    if (movies) {
      movieStore.setPopularMovies(movies);
    }
  };
  const getTopRatedMovies = async () => {
    const topRatedMovies = await movieService.listTopRatedMovies();
    if (topRatedMovies) {
      movieStore.setTopRatedMovies(topRatedMovies);
    }
  };
  const getPopularShows = async () => {
    const popularShows = (await tvShowService.listPopularShows()).results;
    if (popularShows) {
      movieStore.setPopularTvShows(popularShows);
    }
  };
  const getFavorites = async () => {
    const favoriteMovies = await listService.getFavorites();
    if (favoriteMovies) {
      movieStore.setFavoriteMovies(favoriteMovies);
    }
  };
  const getTrendingMovies = async () => {
    const trendingMovies = await movieService.getTrendingMovies();
    if (trendingMovies) {
      movieStore.setTrendingMovies(trendingMovies);
    }
  };
  const getUpcomingMovies = async () => {
    const upcomingMovies = await movieService.getUpcomingMovies();
    if (upcomingMovies) {
      movieStore.setUpcomingMovies(upcomingMovies);
    }
  };
  const getGenres = async () => {
    const genres = await movieService.getGenres();
    if (genres) {
      movieStore.setGenres(genres);
    }
  };

  const getMoviesByGenreId = async (genreId: number): Promise<Movie[]> => {
    const movies = await movieService.getMovieByGenre(genreId);
    if (movies) {
      return movies;
    }
    return [];
  };

  const getMovie = async (title: string) => {
    const movie = await movieService.getMovie(title);
    if (movie) {
      return movie;
    }
  };

  const getTvShow = async (title: string) => {
    const tvShow = await tvShowService.getShow(title);
    if (tvShow) {
      return tvShow;
    }
  };

  const setFilteredMovies = (movies: Movie[]) => {
    movieStore.setFilteredMovies(movies);
  };

  const getMovieByQuery = async (searchTerm: string, searchOption: number) => {
    if (searchOption === SearchOptions.MOVIES) {
      return await getMovie(searchTerm);
    } else {
      return await getTvShow(searchTerm);
    }
  };

  const searchMovie = async (searchTerm: string, option: number) => {
    const movies = await getMovieByQuery(searchTerm, option);

    if (movies) {
      setFilteredMovies(movies);
    }
  };

  const clearFilteredMovies = () => {
    movieStore.setFilteredMovies([]);
  };

  const getAllData = async () => {
    isLoading.value = true;
    await Promise.all([
      getPopularMovies(),
      getTopRatedMovies(),
      getPopularShows(),
      getFavorites(),
      getTrendingMovies(),
      getUpcomingMovies(),
      getGenres(),
    ]);
    isLoading.value = false;
  };

  return {
    isLoading,
    getAllData,
    getMoviesByGenreId,
    getMovie,
    getTvShow,
    getMovieByQuery,
    setFilteredMovies,
    searchMovie,
    clearFilteredMovies,
  };
}
