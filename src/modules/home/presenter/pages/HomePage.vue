<template>
  <div class="bg-primary w-screen h-full flex flex-col justify-start overflow-x-hidden">
    <div class="w-full flex flex-col justify-start py-5 px-5 gap-8 mt-8">
      <FilterToolbar
        :filteredMovies="filteredMovies"
        :genreList="homeData.genres"
        :searchOptions="SearchOptions.SEARCH_OPTIONS"
        @searchValue="handleSearch"
        @searchOption="handleChangeCategory"
        :selectedOption="selectedSearchOption"
        v-model="searchField"
        @filterGenre="(genre) => console.log(genre)"
      />
      <div class="flex justify-start items-start flex-col gap-2">
        <div
          class="flex flex-col gap-14 w-full max-w-full items-center justify-center"
          v-if="isPageDefaultState"
        >
          <MyCarousel
            v-for="list in carouselList"
            :key="list.id"
            :title="list.label"
            :items="list.items"
            @selectedItem="handleFavorite"
            @onSelect="console.log($event)"
            :isLoading="isLoading"
          />
        </div>
        <SearchResultList
          v-else-if="searchField !== ''"
          :category="selectedSearchOption"
          :query="searchField"
          :filteredMovies="filteredMovies"
          @selectedItem="handleSelectedMovie"
          :loading="isLoadingQuery"
        />
      </div>
    </div>
    <Footer />
  </div>

  <MyDialog
    v-if="isOpenDialog"
    v-model="isOpenDialog"
    :lists="homeData.lists"
    @addToList="addMovieToList"
    @createList="openCreateListDialog"
  />
  <CreateListDialog
    v-if="isOpenCreateListDialog"
    v-model:open="isOpenCreateListDialog"
    :movieList="homeData.popularMovies"
    @createList="createList"
  />
</template>

<script setup lang="ts">
import SearchResultList from '@/modules/home/presenter/components/List/SearchResultList/SearchResultList.vue';
import SearchOptions from '@/modules/home/presenter/utils/constants/searchOptions';
import { ListService } from '@/shared/client/services/listService';
import { MoviesService } from '@/shared/client/services/moviesService';
import { TvShowService } from '@/shared/client/services/tvShowService';
import MyCarousel from '@/shared/components/Carousel/MyCarousel/MyCarousel.vue';
import CreateListDialog from '@/shared/components/Dialog/CreateListDialog.vue';
import MyDialog from '@/shared/components/Dialog/MyDialog.vue';
import { Genre } from '@/shared/interfaces/Genre';
import { Movie } from '@/shared/interfaces/Movie';
import { useMoviesStore } from '@/shared/store/Movies';
import { computed, onMounted, provide, reactive, ref } from 'vue';
import { toast } from 'vue-sonner';
import Footer from '../components/Footer/Footer.vue';
import FilterToolbar from '../components/Toolbar/FilterToolbar/FilterToolbar.vue';
import { HomeData } from '../types';

const movieService = new MoviesService();
const tvShowService = new TvShowService();
const listService = new ListService();

console.log(import.meta.env)

const movieStore = useMoviesStore();

const homeData = reactive<HomeData>({
  popularMovies: [] as Movie[],
  topRatedMovies: [] as Movie[],
  popularTvShows: [] as Movie[],
  favoriteMovies: [] as Movie[],
  trendingMovies: [] as Movie[],
  upcomingMovies: [] as Movie[],
  lists: [] as any[],
  genres: [] as Genre[],
});

const filteredMovies = ref<Movie[]>([]);

const searchField = ref<string>('');
const selectedMovie = ref<Movie | null>(null);

// let genreList = ref<Genre[]>([]);

const isLoading = ref<boolean>(false);
const isLoadingQuery = ref<boolean>(false);
const isOpenDialog = ref<boolean>(false);
const isOpenCreateListDialog = ref<boolean>(false);
const selectedSearchOption = ref(SearchOptions.MOVIES);

const isPageDefaultState = computed(
  () => !filteredMovies.value || searchField.value === ''
);

const carouselList = computed(() => [
  { id: 1, label: 'Têndencias', items: homeData.trendingMovies },
  { id: 2, label: 'Filmes Populares', items: homeData.popularMovies },
  { id: 3, label: 'Em cartaz', items: homeData.upcomingMovies },
  { id: 4, label: 'Filmes bem avaliados', items: homeData.topRatedMovies },
  { id: 5, label: 'Séries de TV populares', items: homeData.popularTvShows },
]);

const toggleDialog = () => (isOpenDialog.value = !isOpenDialog.value);
provide ('toggleDialog', toggleDialog);

const openCreateListDialog = () => {
  isOpenDialog.value = false;
  isOpenCreateListDialog.value = true;
};

const handleSelectedMovie = (movie: Movie) => {
  selectedMovie.value = movie;
};

const handleFavorite = async (movie: Movie) => {
  const response = await listService.addToFavorite(movie);
  if (response) toast.success('Filme x foi adicionado a lista y!');
};

const handleSearch = async () => {
  isLoadingQuery.value = true;
  const data = selectedSearchOption.value === SearchOptions.MOVIES
    ?await movieService.getMovie(searchField.value)
    : await tvShowService.getShow(searchField.value);
  filteredMovies.value = data;
  isLoadingQuery.value = false;
};

const clearSearchField = () => {
  searchField.value = '';
  filteredMovies.value = [];
};

provide ('clearSearchField', clearSearchField);

const handleChangeCategory = (newCategory: number) => {
  selectedSearchOption.value = newCategory;
  if (filteredMovies.value) handleSearch();
};

const addMovieToList = async (list: any) => {
  const updatedList = [...list.movies, selectedMovie.value];
  const response = await listService.updateMoviesList(list.id, updatedList);
  if (response) toast.success('Filme adicionado com sucesso!');
};

const createList = async (list: any) => {
  const response = await listService.createList(list);
  if (response) toast.success('Lista criada com sucesso!');
};

const getPopularMovies = async () => {
  const movies = await movieService.listPopularMovies();
  if (movies) {
    homeData.popularMovies = movies; 
  }
};
const getTopRatedMovies = async () => {
  const movies = await movieService.listTopRatedMovies();
  if (movies) {
    homeData.topRatedMovies = movies;
  }
};
const getPopularShows = async () => {
  homeData.popularTvShows = (await tvShowService.listPopularShows()).results;
};
// const getLists = async () => {
//   homeData.lists = await listService.getLists();
// };
const getFavorites = async () => {
  homeData.favoriteMovies = await listService.getFavorites();
};
const getTrendingMovies = async () => {
  homeData.trendingMovies = (await movieService.getTrendingMovies()).results;
};
const getUpcomingMovies = async () => {
  homeData.upcomingMovies = (await movieService.getUpcomingMovies()).results;
};
const getGenres = async () => {
  homeData.genres = (await movieService.getGenres()).genres;
  movieStore.setGenres(homeData.genres);
};

const populateLocalStorage = (data: HomeData) => {
  localStorage.setItem('@filmio_movies', JSON.stringify(data));
};

const getAllData = async () => {
  isLoading.value = true;
  await Promise.all([
    getPopularMovies(),
    getTopRatedMovies(),
    getPopularShows(),
    getFavorites(),
    getTrendingMovies(),
    getUpcomingMovies(),
    getGenres(),
  ]);
  populateLocalStorage(homeData);
  isLoading.value = false;
};

onMounted(async () => {
  const savedData = localStorage.getItem('@filmio_movies');

  savedData ? Object.assign(homeData, JSON.parse(savedData)) : await getAllData();
});
</script>
