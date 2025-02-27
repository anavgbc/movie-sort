import { List } from '@/shared/interfaces/List';
import { defineStore } from 'pinia';

interface ListsState {
  lists: List[];
  selectedList: List;
}

export const useListStore = defineStore('lists', {
  state: (): ListsState => ({
    lists: [],
    selectedList: {} as List,
  }),
  actions: {
    setLists(lists: List[]) {
      this.lists = lists;
    },
    setSelectedList(list: List) {
      this.selectedList = list;
    },
  },
  getters: {
    getLists(state) {
      return state.lists;
    },
    getSelectedList(state) {
      return state.selectedList;
    },
  },
  persist: true,
});
