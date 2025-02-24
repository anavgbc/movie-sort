import { defineStore } from 'pinia';

interface ListsState {
  lists: any[];
}

export const useListStore = defineStore('lists', {
  state: (): ListsState => ({
    lists: [],
  }),
  actions: {
    setLists(lists: any) {
      this.lists = lists;
    },
  },
  getters: {
    getLists(state) {
      return state.lists;
    },
  },
  persist: true,
});
