<template>
  <Dialog>
    <DialogContent class="sm:max-w-[425px] bg-primary-100 text-white border-none">
      <DialogHeader>
        <DialogTitle>Criar lista</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4 py-4 w-full h-[90%]">
        <div class="flex flex-col gap-2">
          <label for="name" class="text-sm">Nome da lista</label>
          <Input
          class="bg-primary-100"
            placeholder="Nome da lista"
            variant="outline"
            label="Nome"
            id="name"
            v-model="listData.name"
          />
        </div>
        <div class="flex flex-col gap-2">
          <label for="description" class="text-sm">Descrição</label>
          <Input
          class="bg-primary-100"
            placeholder="Digite aqui"
            variant="outline"
            id="description"
            label="Descrição"
            v-model="listData.description"
          />
        </div>
        <div class="flex flex-col gap-3">
          <p>Adicione filmes a sua lista</p>
          <div class="grid grid-cols-4 grid-rows-2 gap-2">
            <div
              class="border h-24 w-20 rounded-md hover:cursor-pointer"
              v-for="movie in movieList.slice(0, 8)"
              @click="addMovieToList(movie)"
              :key="movie.id"
              :class="listData.movies.includes(movie) ? 'border-gray-500 border-2 opacity-100' : 'border-transparent opacity-60 hover:opacity-100'"
            >
              <img
                :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                alt="movie"
                class="h-full w-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          class="bg-secondary text-white px-3"
          @click="handleSubmit"
        >
          Criar lista
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Movie } from '@/shared/interfaces/Movie';
import { useMoviesStore } from '@/shared/store/Movies';
import { reactive } from 'vue';
import Input from '../ui/input/Input.vue';

const emit = defineEmits(['createList']);

const movieStore = useMoviesStore();
const movieList = movieStore.getPopularMovies;

  const listData = reactive({
  name: '',
  movies: [] as Movie[],
  description: '',
});

const selectedMovies = reactive([] as Movie[]);

const addMovieToList = (movie: Movie) => {
  if (listData.movies.includes(movie)) {
    listData.movies.splice(listData.movies.indexOf(movie), 1);
    return;
  }
  listData.movies.push(movie);

  console.log(listData.movies);
};

const handleSubmit = () => {
  emit('createList', listData);
};
</script>
