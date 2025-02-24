import { Genre } from '@/shared/interfaces/Genre';
import { Movie } from '@/shared/interfaces/Movie';

export interface HomeData {
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  popularTvShows: Movie[];
  favoriteMovies: Movie[];
  trendingMovies: Movie[];
  upcomingMovies: Movie[];
  lists: any[];
  genres: Genre[];
}
