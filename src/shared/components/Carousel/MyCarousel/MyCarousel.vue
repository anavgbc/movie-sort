<template>
  <div class="flex flex-col gap-4 w-full items-start justify-center">
    <p class="font-display font-semibold text-xl text-gray-200">{{ title }}</p>
    <Carousel class="max-w-full">
      <CarouselContent>
        <CarouselItem
          v-for="movie in items"
          :key="movie.id"
          class="lg:basis-1/7 basis-auto"
          v-if="!isLoading && items"
        >
          <MovieCard
            :movie="movie"
            @openDialog="emit('onSelect')"
            @onFavorite="emit('favoriteMovie', movie)"
          />
        </CarouselItem>
        <CarouselItem v-for="_ in 8" class="lg:basis-1/7 basis-auto" v-else>
          <MySkeleton />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/ui/carousel';
import { Movie } from '@/shared/interfaces/Movie';
import MovieCard from '../../Cards/MovieCard/MovieCard.vue';
import MySkeleton from '../../Skeleton/MySkeleton.vue';

interface Props {
  items: Movie[];
  title: string;
  isLoading: boolean;
}

defineProps<Props>();

const emit = defineEmits(['selectedItem', 'onSelect', 'favoriteMovie']);
</script>
