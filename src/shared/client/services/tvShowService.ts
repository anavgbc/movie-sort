import ApiService from '../apiService';

const TOKEN = import.meta.env.VITE_SECRET_TOKEN;

export class TvShowService extends ApiService implements TvShowService {
  constructor() {
    super('', TOKEN);
  }

  public async listPopularShows(): Promise<any> {
    try {
      const { data } = await this.apiInstance.get('/tv/popular');

      return data;
    } catch (err) {
      console.error(err);
    }
  }
  public async listTopRatedShows(): Promise<any> {
    try {
      const { data } = await this.apiInstance.get('/tv/top_rated');

      return data;
    } catch (err) {
      console.error(err);
    }
  }
  public async getShow(name: string): Promise<any> {
    try {
      const { data } = await this.apiInstance.get(`/search/tv?query=${name}`);

      return data.results;
    } catch (err) {
      console.error(err);
    }
  }
  public async getShowById(id: string): Promise<any> {
    try {
      const response = await this.apiInstance.get(
        `/tv/${id}?append_to_response=credits,similar,reviews`
      );

      return response;
    } catch (err) {
      console.error(err);
    }
  }
  public async getShowCredits(id: string): Promise<any> {
    try {
      const response = await this.apiInstance.get(`/tv/${id}/credits`);

      return response;
    } catch (err) {
      console.error(err);
    }
  }
  public async getShowImages(id: string): Promise<any> {
    try {
      const response = await this.apiInstance.get(`/tv/${id}/images`);

      return response;
    } catch (err) {
      console.error(err);
    }
  }
  public async getShowSimilar(id: string): Promise<any> {
    try {
      const response = await this.apiInstance.get(`/tv/${id}/similar`);

      return response;
    } catch (err) {
      console.error(err);
    }
  }
  public async getShowReviews(id: string): Promise<any> {
    try {
      const response = await this.apiInstance.get(`/tv/${id}/reviews`);

      return response;
    } catch (err) {
      console.error(err);
    }
  }
}
