<template>
    <div class="bg-primary w-full h-full flex flex-col justify-start gap-5 p-5 px-12">

<PageControl
      title="Favoritos"
      btnText="Sortear"
      @click=""
    />
  <div class="flex flex-wrap gap-4 w-full h-full">
    <MovieCard v-for="item in favorites" :movie="item" />
  </div>
  </div>
</template>

<script setup lang="ts">
import PageControl from '@/modules/lists/presenter/components/Card/PageControl/PageControl.vue';
import { ListService } from '@/shared/client/services/listService';
import MovieCard from '@/shared/components/Cards/MovieCard/MovieCard.vue';
import { token } from '@/shared/utils/token';
import { onMounted, ref } from 'vue';


const favoritesService = new ListService(token);
const favorites = ref([]);


const getFavorites = async () => {
  const response = await favoritesService.getFavorites();
  console.log('response: ', response)
  favorites.value = response;
};

onMounted(() => {
  getFavorites();
  console.log('FavoritesMovies mounted');
});
</script>