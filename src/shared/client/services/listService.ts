import ApiService from '../apiService';

export class ListService extends ApiService implements ListService {
  constructor() {
    super('', null);
  }

  public async addToFavorite(input: any): Promise<any> {
    try {
      const { data } = await this.apiInstance.post('/favorites', input);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async getFavorites(): Promise<any> {
    try {
      const { data } = await this.apiInstance.get('/favorites');
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async getLists(): Promise<any> {
    try {
      const { data } = await this.apiInstance.get('/lists');
      console.log(data);
      return data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  public async createList(input: any): Promise<any> {
    const created_at = new Date().toISOString();
    const id = Math.random().toString(36).substring(7);

    const payload = {
      ...input,
      created_at: created_at,
      id: id,
    };

    try {
      const { data } = await this.apiInstance.post('/lists', payload);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async updateMoviesList(listId: string, movies: any[]): Promise<any> {
    try {
      const { data } = await this.apiInstance.patch(`/lists/${listId}`, {
        movies: movies,
      });
      console.log(data, 'RESPONSE AQUI');
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async getList(listId: string): Promise<any> {
    try {
      const { data } = await this.apiInstance.get(`/lists/${listId}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }

  public async deleteList(listId: string): Promise<any> {
    try {
      const { data } = await this.apiInstance.delete(`/lists/${listId}`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
}
