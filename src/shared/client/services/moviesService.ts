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
  public async getMovie(name: string): Promise<any | void> {
    try {
      const { data } = await this.apiInstance.get<Response>(
        `/search/movie?query=${name}`
      );

      return data.results;
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
  public async getMovieByGenre(genreId: string): Promise<any> {
    try {
      const { data } = await this.apiInstance.get(
        `discover/movie?with_genres=${genreId}`
      );

      return data;
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

  public async getTrendingMovies() {
    try {
      const { data } = await this.apiInstance.get('/trending/movie/day');

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async getUpcomingMovies() {
    try {
      const { data } = await this.apiInstance.get('/movie/upcoming');

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async getNowPlayingMovies() {
    try {
      const { data } = await this.apiInstance.get('/movie/now_playing');

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async getGenres(): Promise<any> {
    try {
      const { data } = await this.apiInstance.get('/genre/movie/list');

      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
