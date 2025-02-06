<template>
  <div
    class="w-full h-full flex flex-col lg:flex-row items-center lg:items-start justify-center md:justify-start gap-3"
  >
    <div
      class="relative flex flex-col justify-between w-80 h-full lg:w-[60%] group pr-1 pb-2"
      @click="redirecToMovieDetails"
    >
      <p
        class="text-3xl lg:text-4xl lg:font-semibold text-center lg:text-start pb-4 w-full overflow-hidden text-nowrap text-ellipsis"
      >
        {{ movie.title }} ({{ releaseDate }})
      </p>
      <img
        :src="galleryImageUrlBase + movie.poster_path"
        alt="movie poster"
        class="w-full h-[22rem] lg:h-[23rem] object-cover rounded-md selected-poster z-0"
        @load="isLoadingImg = false"
      />
      <div
        v-if="!isLoadingImg"
        class="absolute top-1/2 left-1/2 text-white px-4 py-2 rounded-md z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <i class="fa-solid fa-info"></i>
      </div>
    </div>
    <div
      class="flex flex-col md:h-full justify-between lg:items-center w-80 lg:w-[40%] xl:w-[35%] pl-3 pb-2"
    >
      <div class="flex flex-col">
        <div class="flex justify-between w-full gap-2 my-2">
          <span class="flex gap-1 items-center">
            <i class="fa-regular fa-star fa-sm"></i>
            <p>{{ movieVoteAverage }}</p>
          </span>
          <div class="flex items-center justify-end">
            <GenreChip :isActive="false">
              <p>{{ mainGenre?.name }}</p>
            </GenreChip>
            <MyButton
              variant="ghost"
              v-for="action in movieActions"
              :key="action.icon"
              :class="action.color"
              @click="action.emit"
              class="px-3"
            >
              <i :class="action.icon" />
            </MyButton>
          </div>
        </div>
        <div>
          <p class="text-sm text-justify px-2 hidden lg:flex pt-2">
            {{ movie.overview }}
          </p>
        </div>
      </div>
      <MyButton @click="emit('tryAgain')">Tentar novamente</MyButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyButton from '@/shared/components/Button/MyButton/MyButton.vue';
import GenreChip from '@/shared/components/Chip/GenreChip/GenreChip.vue';
import { computed, onMounted, ref } from 'vue';

interface Props {
  movie: any;
  genres: any[];
}
const props = defineProps<Props>();
const emit = defineEmits([
  'tryAgain',
  'onDislike',
  'onFavorite',
  'getGenres',
  'onRedirect',
]);

const isLoadingImg = ref(true);

const movieActions = [
  {
    icon: 'fa-regular fa-heart',
    color: 'text-white',
    emit: () => emit('onFavorite'),
  },
  {
    icon: 'fa-solid fa-ban',
    color: 'text-red-800',
    emit: () => emit('onDislike'),
  },
];

console.log(props.movie);
const galleryImageUrlBase = 'http://image.tmdb.org/t/p/w500';

const findGenreById = (id: number) => {
  return props.genres.find((genre) => genre.id === id);
};

const redirecToMovieDetails = () => {
  emit('onRedirect', props.movie.id);
};

const mainGenre = computed(() => {
  if (props.movie) {
    return findGenreById(props.movie.genre_ids[0]);
  }
});

const releaseDate = computed(() => {
  console.log(new Date(props.movie.release_date).getFullYear());
  return new Date(props.movie.release_date).getFullYear();
});

const movieVoteAverage = computed(() => {
  return props.movie.vote_average.toFixed(2);
});

onMounted(() => {
  props.genres.length > 0 ? props.genres : emit('getGenres');
});
</script>

<style scoped>
.selected-poster:hover {
  opacity: 0.2;
  cursor: pointer;
}

.info-section {
  border-left: 1px solid gray;
}
</style>
