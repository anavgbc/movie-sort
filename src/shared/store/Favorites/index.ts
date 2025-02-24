import { Movie } from '@/shared/interfaces/Movie';
import { defineStore } from 'pinia';

interface FavoriteState {
  favorites: Movie[];
}

export const useFavoriteStore = defineStore('favorites', {
  state: (): FavoriteState => ({
    favorites: [],
  }),
  actions: {
    setFavorites(favorites: Movie[]) {
      this.favorites = favorites;
    },
  },
  getters: {
    getFavorites(state) {
      return state.favorites;
    },
  },
  persist: true,
});
