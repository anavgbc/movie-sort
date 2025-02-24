import { Movie } from '@/shared/interfaces/Movie';
import { defineStore } from 'pinia';

interface MoviesState {
  genres: any;
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  popularTvShows: Movie[];
  favoriteMovies: Movie[];
  trendingMovies: Movie[];
  upcomingMovies: Movie[];
  selectedMovie: Movie | null;
  filteredMovies: Movie[];
}

export const useMoviesStore = defineStore('movies', {
  state: (): MoviesState => ({
    genres: [],
    popularMovies: [],
    topRatedMovies: [],
    popularTvShows: [],
    favoriteMovies: [],
    trendingMovies: [],
    upcomingMovies: [],
    filteredMovies: [],
    selectedMovie: null,
  }),
  actions: {
    setGenres(genres: any) {
      this.genres = genres;
    },
    setPopularMovies(movies: Movie[]) {
      this.popularMovies = movies;
    },
    setTopRatedMovies(movies: Movie[]) {
      this.topRatedMovies = movies;
    },
    setPopularTvShows(movies: Movie[]) {
      this.popularTvShows = movies;
    },
    setFavoriteMovies(movies: Movie[]) {
      this.favoriteMovies = movies;
    },
    setTrendingMovies(movies: Movie[]) {
      this.trendingMovies = movies;
    },
    setUpcomingMovies(movies: Movie[]) {
      this.upcomingMovies = movies;
    },
    setSelectedMovie(movie: Movie) {
      this.selectedMovie = movie;
    },
    setFilteredMovies(movies: Movie[]) {
      this.filteredMovies = movies;
    },
  },
  getters: {
    getGenres(state) {
      return state.genres;
    },
    getPopularMovies(state) {
      return state.popularMovies;
    },
    getTopRatedMovies(state) {
      return state.topRatedMovies;
    },
    getPopularTvShows(state) {
      return state.popularTvShows;
    },
    getFavoriteMovies(state) {
      return state.favoriteMovies;
    },
    getTrendingMovies(state) {
      return state.trendingMovies;
    },
    getUpcomingMovies(state) {
      return state.upcomingMovies;
    },
    getSelectedMovie(state) {
      return state.selectedMovie;
    },
    getFilteredMovies(state) {
      return state.filteredMovies;
    },
  },
  persist: true,
});
