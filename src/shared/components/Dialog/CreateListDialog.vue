<template>
  <Dialog>
    <DialogContent
      class="w-[90%] sm:max-w-[425px] h-[80%] sm:h-[600px] bg-primary-100 text-white border-none flex flex-col justify-between"
    >
      <DialogHeader>
        <DialogTitle>{{ titleText }}</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col items-center justify-between gap-5 py-4 w-full h-[90%]" v-if="isFirstTab">
        <div class="flex flex-col gap-3 w-full">
          <label for="name" class="text-sm">Nome</label>
          <Input
            class="bg-primary-100"
            placeholder="Nome da lista"
            variant="outline"
            label="Nome"
            id="name"
            v-model="listData.name"
          />
        </div>
        <div class="flex flex-col gap-4 w-full">
          <label for="description" class="text-sm">Descrição</label>
          <Textarea
            class="bg-primary-100"
            placeholder="Digite aqui"
            variant="outline"
            id="description"
            label="Descrição"
            rows="5"
            v-model="listData.description"
          />
        </div>

        <img src="../../../assets/images/undraw_movie_night_re_9umk.svg" class="w-[80%] pt-5"/>
      </div>

      <div v-else-if="isMoviesTab">
        <div class="flex flex-col gap-3">
          <div class="grid grid-cols-4 grid-rows-4 gap-2">
            <div
              class="border h-24 w-20 rounded-md hover:cursor-pointer"
              v-for="movie in movieList.slice(0, 16)"
              @click="addMovieToList(movie)"
              :key="movie.id"
              :class="
                listData.movies.includes(movie)
                  ? 'border-gray-500 border-2 opacity-100'
                  : 'border-transparent opacity-60 hover:opacity-100'
              "
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
        <div class="flex w-full" :class="isMoviesTab ? 'justify-between' : 'justify-end'">
        <MyButton v-if="isMoviesTab" @click="goBackToFirstTab" variant="ghost">
          <i class="fa-solid fa-arrow-left"></i>
          voltar
        </MyButton>
        <MyButton type="submit" class="px-5" @click="handleSubmit">
          {{ submitBtnText }}
        </MyButton>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Movie } from '@/shared/interfaces/Movie';
import { useMoviesStore } from '@/shared/store/Movies';
import { computed, reactive, ref } from 'vue';
import MyButton from '../Button/MyButton/MyButton.vue';
import Input from '../ui/input/Input.vue';
import Textarea from '../ui/textarea/Textarea.vue';

const emit = defineEmits(['createList']);

const movieStore = useMoviesStore();
const movieList = movieStore.getPopularMovies;

const formTab = ref(0);

const listData = reactive({
  name: '',
  movies: [] as Movie[],
  description: '',
});

const addMovieToList = (movie: Movie) => {
  if (listData.movies.includes(movie)) {
    listData.movies.splice(listData.movies.indexOf(movie), 1);
    return;
  }
  listData.movies.push(movie);
};

const isFirstTab = computed(() => formTab.value === 0);
const isMoviesTab = computed(() => formTab.value === 1);

const submitBtnText = computed(() => {
  return isFirstTab.value ? 'Próximo' : 'Salvar';
});

const titleText = computed(() => {
  return isFirstTab.value ? 'Criar Lista' : 'Sugestão de Filmes para sua lista';
});

const goBackToFirstTab = () => {
  formTab.value = 0;
};

const handleSubmit = () => {
  if (formTab.value === 0) {
    formTab.value = 1;
    return;
  } else {
    emit('createList', listData);
  }
};
</script>
