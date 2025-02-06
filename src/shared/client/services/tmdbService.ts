import ApiService from '../apiService';

const TOKEN = import.meta.env.VITE_SECRET_TOKEN;

export class TMDBService extends ApiService implements TMDBService {
  constructor() {
    super('', TOKEN);
  }

  public async getGenres(): Promise<any> {
    try {
      const { data } = await this.apiInstance.get('/genre/movie/list');

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async searchAll(query: string) {
    try {
      const { data } = await this.apiInstance.get(
        `search/multi?query=${query}`
      );

      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
