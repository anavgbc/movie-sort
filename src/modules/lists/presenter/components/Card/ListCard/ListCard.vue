<template>
  <div
    class="bg-primary-50 w-52 h-64 rounded-md px-4 py-4 hover:bg-primary-100 hover:cursor-pointer border border-[#181826] shadow-md hover:shadow-lg relative"
  >
    <div class="h-[70%] w-full">
      {{ console.log(`http://image.tmdb.org/t/p/w500${listCover}` ) }}
      <img v-if="listCover != ''"
        class="w-full h-full rounded-md object-cover opacity-70"
        :src="`http://image.tmdb.org/t/p/w500${listCover}`"
        alt="movie"
      />
    </div>
    <div class="h-[30%] w-full flex flex-col justify-between gap-2 pt-2">
      <p class="text-white text-sm font-display font-medium">{{ list.name }}</p>
      <button
        class="text-white text-xs w-10 py-1 bg-[#51488999] rounded-md flex items-center justify-center gap-2 px-2"
      >
        <i class="fa-solid fa-inbox fa-sm"></i>
        <p>{{ list.movies.length }}</p>
      </button>
      <!-- <div class="flex gap-2"> -->
      <!-- <button class="text-white text-xs bg-secondary px-2 py-1 rounded-md">Editar</button>
        <button class="text-white text-xs bg-secondary px-2 py-1 rounded-md">Excluir</button> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { MoviesService } from '@/shared/client/services/moviesService';
import { TvShowService } from '@/shared/client/services/tvShowService';
import { token } from '@/shared/utils/token';
import { onBeforeMount, ref } from 'vue';
const movieService = new MoviesService(token);
const tvShowService = new TvShowService(token);

interface Props {
  list: any;
};
const props = defineProps<Props>();

const listCover = ref('');

const getCover = async () => {
  if (props.list.movies.length > 0) {
    const movie = await movieService.getMovie(props.list.movies[0].title);
    console.log(movie);
    if(movie){
      listCover.value = movie[0].poster_path;
    }
  }
};

onBeforeMount(() => {
  getCover();
});

</script>
