import { ListService } from '@/shared/client/services/listService';
import { Movie } from '../interfaces/Movie';
import { useListStore } from '../store/Lists';

export function useLists() {
  const listService = new ListService();

  const listStore = useListStore();

  const getLists = async () => {
    const lists = await listService.getLists();
    if (lists) {
      listStore.setLists(lists);
    }
  };

  const createList = async (input: any) => {
    const list = await listService.createList(input);

    if (list) {
      return list;
    }
  };

  const addMovieToList = async (listId: string, movies: Movie[]) => {
    const response = await listService.updateMoviesList(listId, movies);

    if (response) {
      return response;
    }
  };

  const deleteList = async (listId: string) => {
    const response = await listService.deleteList(listId);
  }

  return {
    getLists,
    createList,
    addMovieToList,
    deleteList,
  };
}
