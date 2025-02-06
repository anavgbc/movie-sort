import { Movie } from '@/shared/interfaces/Movie';

export interface CarouselItem {
  id: number;
  label: string;
  items: Movie[];
}
