import { Genre } from '@/shared/interfaces/Genre';
import { Movie, MovieDetail, MovieImages } from '../../interfaces/Movie';
import ApiService from '../apiService';

interface Response {
  results: Movie[] | Movie | MovieDetail;
}

const TOKEN = import.meta.env.VITE_SECRET_TOKEN;

export class MoviesService extends ApiService implements MoviesService {
  constructor() {
    super('', TOKEN);
  }

  public async listPopularMovies(): Promise<Movie[] | void> {
    try {
      const { data } = await this.apiInstance.get<Response>('/movie/popular');

      return data.results as Movie[];
    } catch (err) {
      console.error(err);
    }
  }
  public async listTopRatedMovies(): Promise<Movie[] | void> {
    try {
      const { data } = await this.apiInstance.get<Response>('/movie/top_rated');

      return data.results as Movie[];
    } catch (err) {
      console.error(err);
    }
  }
  public async getMovie(name: string): Promise<Movie | void> {
    try {
      const { data } = await this.apiInstance.get<Response>(
        `/search/movie?query=${name}`
      );

      return data.results as Movie;
    } catch (err) {
      console.error(err);
    }
  }
  public async getMovieById(id: string): Promise<MovieDetail | void> {
    try {
      const response = await this.apiInstance.get<MovieDetail>(
        `/movie/${id}?append_to_response=credits,similar,reviews`
      );

      return response.data as MovieDetail;
    } catch (err) {
      console.error(err);
    }
  }
  public async getMovieByGenre(genreId: number): Promise<Movie[] | void> {
    try {
      const { data } = await this.apiInstance.get<Response>(
        `discover/movie?with_genres=${genreId}`
      );

      return data.results as Movie[];
    } catch (err) {
      console.error(err);
    }
  }
  public async getMovieCredits(id: string): Promise<any> {
    try {
      const response = await this.apiInstance.get(`/movie/${id}/credits`);

      return response;
    } catch (err) {
      console.error(err);
    }
  }
  public async getMovieImages(id: string): Promise<MovieImages | void> {
    try {
      const response = await this.apiInstance.get<MovieImages>(
        `/movie/${id}/images`
      );

      return response.data as MovieImages;
    } catch (err) {
      console.error(err);
    }
  }
  public async getMovieSimilar(id: string): Promise<any> {
    try {
      const response = await this.apiInstance.get(`/movie/${id}/similar`);

      return response;
    } catch (err) {
      console.error(err);
    }
  }
  public async getMovieReviews(id: string): Promise<any> {
    try {
      const response = await this.apiInstance.get(`/movie/${id}/reviews`);

      return response;
    } catch (err) {
      console.error(err);
    }
  }

  public async getTrendingMovies(): Promise<Movie[] | void> {
    try {
      const { data } = await this.apiInstance.get<Response>(
        '/trending/movie/day'
      );

      return data.results as Movie[];
    } catch (err) {
      console.error(err);
    }
  }

  public async getUpcomingMovies(): Promise<Movie[] | void> {
    try {
      const { data } = await this.apiInstance.get('/movie/upcoming');

      return data.results as Movie[];
    } catch (err) {
      console.error(err);
    }
  }

  public async getNowPlayingMovies(): Promise<Movie[] | void> {
    try {
      const { data } =
        await this.apiInstance.get<Movie[]>('/movie/now_playing');

      return data as Movie[];
    } catch (err) {
      console.error(err);
    }
  }

  public async getGenres(): Promise<Genre[] | void> {
    try {
      const { data } = await this.apiInstance.get('/genre/movie/list');

      return data.genres as Genre[];
    } catch (err) {
      console.error(err);
    }
  }
}
