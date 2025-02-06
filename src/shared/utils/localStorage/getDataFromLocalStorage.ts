import { HomeData } from '@/modules/home/presenter/types';

export const getDataFromLocalStorage = (): HomeData | null => {
  const data = localStorage.getItem('@filmio_movies');

  return data ? (JSON.parse(data) as HomeData) : null;
};
