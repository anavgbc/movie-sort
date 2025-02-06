<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <div class="w-80 lg:w-[60%] h-[95%] md:h-[90%] flex flex-col">
      <SortControl
        @onBack="selectedMovie = null"
        @showFilter=""
        v-if="selectedMovie"
      />

      <div
        class="h-full w-full flex flex-col items-center justify-center gap-3 mb-5"
      >
        <div
          v-if="!selectedMovie"
          class="w-full flex flex-col items-center justify-center gap-3"
        >
          <p class="font-medium text-5xl py-3">Não sabe o que assistir?</p>
          <SortButton @click="handleSortClick" />
        </div>

        <div class="w-full flex gap-2 items-center justify-center">
          <MySpinner v-if="isLoading" />
          <SortedMovie
            v-if="!isLoading && selectedMovie !== null"
            :movie="selectedMovie"
            :genres="genres"
            @tryAgain="tryAgain"
            @on-favorite="console.log('Favoritou')"
            @on-dislike="console.log('Descurtiu')"
            @get-genres=""
            @on-redirect="redirectToMovieDetails"
          />
        </div>
      </div>
    </div>
  </div>
  <SelectListDialog
    v-model:open="isOpenDialogList"
    :lists="lists"
    @createList="handleSelectList"
    @randomSort="sortRandomMovie"
  />
</template>

<script setup lang="ts">
import { ListService } from '@/shared/client/services/listService';
import { MoviesService } from '@/shared/client/services/moviesService';
import SelectListDialog from '@/shared/components/Dialog/SelectListDialog.vue';
import { useMoviesStore } from '@/shared/store/Movies';
import { onBeforeMount, ref } from 'vue';
import SortButton from '../components/SortButton/SortButton.vue';
import SortedMovie from '../components/SortedMovie/SortedMovie.vue';
import { Genre } from '@/shared/interfaces/Genre';
import { Movie } from '@/shared/interfaces/Movie';
import { useRouter } from 'vue-router';
import MySpinner from '@/shared/components/Spinner/MySpinner/MySpinner.vue';
import SortControl from '../components/SortControl/SortControl.vue';
import { getDataFromLocalStorage } from '@/shared/utils/localStorage/getDataFromLocalStorage';

const isOpenDialogList = ref(false);
const listServices = new ListService();
const movieService = new MoviesService();

const lists = ref([]);
const selectedList = ref<null | any>(null);
const selectedMovie = ref<Movie | null>(null);

const router = useRouter();
const movieStore = useMoviesStore();
const genres = ref<Genre[]>([]);

const isLoading = ref<boolean>(false);

const generateRandomIndex = (length: number) => Math.floor(Math.random() * length);

const toggleLoading = () => (isLoading.value = !isLoading.value);

const redirectToMovieDetails = (movieId: number) => {
  router.push({ name: 'movie', params: { id: movieId.toString() } });
};

const getLists = async () => {
  lists.value = await listServices.getLists();
};

const handleSortClick = () => {
  !selectedList.value ? (isOpenDialogList.value = true) : sortMovie();
};

const tryAgain = () => {
  !selectedList.value ? sortRandomMovie() : sortMovie();
};

const setGenres = () => {
  const isGenrePopulated = movieStore.getGenres.length > 0;

  isGenrePopulated
    ? (genres.value = movieStore.getGenres)
    : (genres.value = getDataFromLocalStorage()?.genres as Genre[]);
};

const getPopularMovies = async () => {
  const movies = await movieService.listPopularMovies();
  return movies;
};

const sortMovie = () => {
  toggleLoading();
  if (selectedList.value) {
    const randomIndex = generateRandomIndex(selectedList.value.movies.length);
    selectedMovie.value = selectedList.value.movies[randomIndex];
    toggleLoading();
  }
};

const handleSelectList = (list: any) => {
  selectedList.value = list;
  sortMovie();
  isOpenDialogList.value = false;
};

const sortRandomMovie = async () => {
  toggleLoading();
  const alreadySorted = [] as any[];

  const data = await getPopularMovies();
  const localData = getDataFromLocalStorage();

  const movies = data?.length
    ? data
    : localData && 'popularMovies' in localData
      ? localData.popularMovies
      : [];

  if (movies.length === 0) {
    console.log('Nenhum filme encontrado.');
    return;
  }

  let movie;

  do {
    const randomIndex = generateRandomIndex(movies.length);

    movie = movies[randomIndex];
  } while (alreadySorted.includes(movie));

  selectedMovie.value = movie;
  alreadySorted.push(movie);

  console.log(selectedMovie);
  isOpenDialogList.value ? (isOpenDialogList.value = false) : null;
  toggleLoading();
};

onBeforeMount(() => {
  getLists();
  setGenres();
});
</script>
