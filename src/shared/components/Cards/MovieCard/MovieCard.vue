<template>
  <div
    @mouseenter="isCardHovered = true"
    @mouseleave="isCardHovered = false"
    class="md:w-40 md:h-60 w-60 hover:cursor-pointer rounded-md overflow-visible relative group transform transition-transform duration-300 group-hover:scale-105"
  >
    <DeleteMovieBtn v-if="isEdit" @on-click="handleDelete" />
    <img
      @click="handleRedirectDetails(movie.id)"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      alt="movie"
      class="w-full h-full rounded-md group-hover:opacity-50"
    />
    <Button
      v-if="isCardHovered"
      class="bg-secondary-100 drop-shadow-xl hover:cursor-pointer shadow-md hover:shadow-lg hover:scale-105 duration-300 flex items-center justify-center absolute left-1/2 bottom-2 transform -translate-x-1/2 rounded-full px-0 py-0 w-7 h-7 text-black z-10"
      @mouseenter="isPosterHovered = true"
      @mouseleave="isPosterHovered = false"
      @click="handleFavorite(movie)"
    >
      <i
        class="fa-regular fa-heart text-gray-400 fa-sm transition-colors duration-300"
        v-if="!isPosterHovered && !isFavorited()"
      ></i>
      <i
        class="fa-solid fa-heart text-red-500 fa-sm transition-colors duration-300"
        v-else-if="isFavorited()"
      ></i>
    </Button>
    <Button
      @click="handleClick"
      v-if="isShowOptions"
      class="absolute right-1 top-2 drop-shadow-xl hover:cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center bg-secondary-100 rounded-full px-0 py-0 w-5 h-5"
    >
      <i class="fa-solid fa-ellipsis"></i>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { Movie } from '@/shared/interfaces/Movie';
import { useMoviesStore } from '@/shared/store/Movies';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import DeleteMovieBtn from '../../Button/DeleteMovieBtn/DeleteMovieBtn.vue';
import Button from '../../ui/button/Button.vue';

const router = useRouter();
const movieStore = useMoviesStore();

const isFavorited = () => {
  const favoritesItems = movieStore.getFavoriteMovies;

  return favoritesItems.some((item: Movie) => item.id === props.movie.id);
};

const props = defineProps({
  movie: {
    type: Object as () => Movie,
    required: true,
  },
  isShowOptions: {
    type: Boolean,
    default: true,
  },
  isEditable: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['onFavorite', 'openDialog', 'onDelete']);

const isEdit = computed(() => props.isEditable);

const handleFavorite = (movie: Movie) => {
  emit('onFavorite', movie);
};

const handleDelete = (movie: Movie) => {
  movieStore.setSelectedMovie(props.movie);
  emit('onDelete', movie);
};

const handleClick = () => {
  movieStore.setSelectedMovie(props.movie);
  emit('openDialog');
};

const isPosterHovered = ref(false);
const isCardHovered = ref(false);

const handleRedirectDetails = (itemId: number) => {
  router.push(`/movie/${itemId}`);
};
</script>
