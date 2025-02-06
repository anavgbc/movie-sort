<template>
  <div class="flex flex-col gap-8 px-8 w-full">
    <p
      class="font-display text-lg font-normal w-full"
      v-if="hasMoviesToShow"
    >
      Mostrando resultados em {{ selecetdCategory }} para: <b>{{ query }}</b>
    </p>
    <div class="flex flex-wrap gap-3 w-full">
      <p v-if="loading">loading</p>
      <MovieCard
        v-else
        v-for="movie in filteredMovies"
        :key="movie.id"
        :movie="movie"
      />
      <div class="w-full flex flex-col items-center justify-center gap-2">
        <img
          src="@/assets/images/Curious-rafiki.svg"
          v-if="!hasMoviesToShow"
          class="w-1/4"
        />
        <p class="text-gray-500">
          Não foram encontrados resultados para <b>{{ query }}</b>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchOptions from '@/modules/home/presenter/utils/constants/searchOptions';
import MovieCard from '@/shared/components/Cards/MovieCard/MovieCard.vue';
import { Movie } from '@/shared/interfaces/Movie';
import { computed } from 'vue';

const props = defineProps<{
  filteredMovies: Array<Movie>;
  query: string;
  category: number;
  loading: boolean;
}>();

const hasMoviesToShow = computed(() => props.filteredMovies.length > 0);

const selecetdCategory = computed(
  () =>
    SearchOptions.SEARCH_OPTIONS.find((e) => e.value === props.category)?.label
);
</script>
