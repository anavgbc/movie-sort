import { listFeedbacks } from '@/modules/lists/presenter/utils/feedbacks';
import { ListService } from '@/shared/client/services/listService';
import { toast } from 'vue-sonner';
import { Movie } from '../interfaces/Movie';
import { useListStore } from '../store/Lists';

export function useLists() {
  const listService = new ListService();

  const listStore = useListStore();

  const getLists = async () => {
    const lists = await listService.getLists();

    if (lists) {
      listStore.setLists(lists);
    } else {
      toast.error(listFeedbacks.ERROR_FETCH_LISTS);
    }
  };

  const createList = async (input: any) => {
    const list = await listService.createList(input);

    if (list) {
      toast.success(listFeedbacks.SUCCESS_LIST_CREATED);
      return list;
    } else {
      toast.error(listFeedbacks.ERROR_LIST_CREATED);
    }
  };

  const addMovieToList = async (listId: string, movies: Movie[]) => {
    const response = await listService.updateMoviesList(listId, movies);

    if (response) {
      toast.success(listFeedbacks.SUCCESS_LIST_MOVIE_UPDATED);
      return response;
    }
  };

  const deleteList = async (listId: string) => {
    await listService.deleteList(listId).then(() => {
      toast.success(listFeedbacks.SUCCESS_LIST_DELETED);
    });
  };

  const getList = async (listId: string) => {
    const response = await listService.getList(listId as string);

    if (response) {
      listStore.setSelectedList(response);
      return response;
    }
  };

  return {
    getLists,
    createList,
    addMovieToList,
    deleteList,
    getList,
  };
}
