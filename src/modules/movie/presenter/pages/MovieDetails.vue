<template>
  <div v-if="currentMovie" class="font-display flex flex-col gap-2 relative">
    <img :src="moviePoster" class="h-screen object-cover bg-poster" v-if="moviePoster" />
    <div v-else>carregando</div>
    <div class="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-[#000000] to-transparent" />
    <div class="absolute bottom-[15%] left-10 w-1/2 flex flex-col">
      <img :src="movieLogo" class="w-[75%]" />
      <p>{{ currentMovie.overview }}</p>
      <div class="flex justify-between my-2">
        <span class="flex gap-3">
          <p>{{ formattedRuntime }}</p>
          <span class="flex gap-1 items-center">
            <p>{{ currentMovie.vote_average.toFixed(2) }}</p>
            <i class="fa-solid fa-star text-xs"></i>
          </span>
        </span>
        <p>{{ formattedReleaseYer }}</p>
      </div>
    </div>
  </div>
  <div v-else class="w-full h-full flex justify-center items-center">
    carregando
  </div>
</template>

<script setup lang="ts">
import { MoviesService } from '@/shared/client/services/moviesService';
import { MovieDetail, MovieImages } from '@/shared/interfaces/Movie';
import { token } from '@/shared/utils/token';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const originalImageUrl = 'http://image.tmdb.org/t/p/original';
const galleryImageUrlBase = 'http://image.tmdb.org/t/p/w500';

const movieId = useRoute().params.id;

const currentMovie = ref<MovieDetail | null>(null);
const movieImages = ref<MovieImages | null>(null);

const movieService = new MoviesService(token);

const formattedRuntime = computed(() => {
  const hours = Math.floor(currentMovie.value!.runtime / 60);
  const minutes = currentMovie.value?.runtime! % 60;
  return `${hours}h ${minutes}m`;
});

const formattedReleaseYer = computed(() => {
  return currentMovie.value?.release_date.split('-')[0];
});

const moviePoster = computed(() => {
  const poster = movieImages.value?.posters.sort(
    (a, b) => b.vote_average - a.vote_average
  )[0];

  return `${originalImageUrl}${poster?.file_path}`;
});

const movieLogo = computed(() => {
  const logo = movieImages.value?.logos
    .filter((e) => e.iso_639_1 === 'en')
    .sort((a, b) => b.vote_average - a.vote_average)[0];

  return `${originalImageUrl}${logo?.file_path}`;
});

const getMovie = async() => {
  const foundMovie = await movieService.getMovieById(movieId as string);

  if (foundMovie) {
    currentMovie.value = foundMovie;
  }
}

const getMovieImages = async () => {
  const images = await movieService.getMovieImages(movieId as string);
  images ? movieImages.value = images : movieImages.value = null;
}

onMounted(async () => {
  await getMovie();
  await getMovieImages();
});
</script>

<style scoped>
.bg-poster{
  filter: blur(3px);
  opacity: 0.4;
}
</style>