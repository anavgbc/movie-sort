import { defineStore } from 'pinia';

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    genres: [],
  }),
  actions: {
    setGenres(genres: any) {
      this.genres = genres;
    },
  },
  getters: {
    getGenres(state) {
      return state.genres;
    },
  },
});
