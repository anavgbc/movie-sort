<template>
  <div class="flex gap-8 px-8 w-full h-full min-h-full" style="height: 100%">
    <div
    style="min-height: 100%"
      v-if="isLoading"
      class="w-full flex items-center justify-center min-h-full h-full"
    >
      <MySpinner />
    </div>

    <div class="min-h-full w-full flex flex-col items-center justify-center gap-2" v-else>
      <p class="font-display text-lg font-normal w-full" v-if="hasMoviesToShow">
        Mostrando resultados em {{ selecetdCategory }} para: <b>{{ inputValue }}</b>
      </p>
      <div class="flex flex-wrap gap-3 w-full h-[90%]">
        <MovieCard
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
        <div
          class="w-full flex flex-col items-center justify-center gap-2"
          v-if="!hasMoviesToShow"
        >
          <img src="@/assets/images/Curious-rafiki.svg" class="w-1/4" />
          <p class="text-gray-500">
            Não foram encontrados resultados para <b>{{ inputValue }}</b>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import SearchOptions from '@/modules/home/presenter/utils/constants/searchOptions';
import MovieCard from '@/shared/components/Cards/MovieCard/MovieCard.vue';
import MySpinner from '@/shared/components/Spinner/MySpinner/MySpinner.vue';
import { Movie } from '@/shared/interfaces/Movie';
import { computed } from 'vue';
import { useSearch } from '../../../composables/useSearch';

const props = defineProps<{
  filteredMovies: Array<Movie>;
  category: number;
  loading: boolean;
}>();

const {inputValue} = useSearch();

const hasMoviesToShow = computed(() => props.filteredMovies.length > 0);

const isLoading = computed(() => props.loading);

const selecetdCategory = computed(
  () =>
    SearchOptions.SEARCH_OPTIONS.find((e) => e.value === props.category)?.label
);
</script>
