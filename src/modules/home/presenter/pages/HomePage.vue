<template>
  <div
    class="bg-primary min-h-screen flex flex-col items-center overflow-x-hidden"
  >
    <div class="w-[92%] flex flex-col justify-start py-5 px-5 gap-8 mt-8">
      <FilterToolbar
        :genreList="genres"
        :searchOptions="SearchOptions.SEARCH_OPTIONS"
        @searchValue="handleSearch"
        @searchOption="handleChangeCategory"
        :selectedOption="selectedSearchOption"
        @filterGenre="(genre) => setMoviesByGenre(genre)"
      />
      <div class="flex justify-start items-start flex-col gap-2 h-[90%] w-full">
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
            @onSelect="openDialog(DialogTypes.ADD)"
            :isLoading="isLoading"
          />
        </div>
        <SearchResultList
          v-else-if="inputValue !== ''"
          :category="selectedSearchOption"
          :filteredMovies="filteredMovies"
          @selectedItem="handleSelectedMovie"
          :loading="isLoadingQuery"
        />
      </div>
    </div>
    <Footer />
  </div>

  <MyDialog
    v-if="isDialogOpen(DialogTypes.ADD)"
    v-model:open="dialogState"
    :lists="lists"
    @addToList="handleAddMovieToList"
    @createList="openCreateListDialog"
  />
  <CreateListDialog
    v-if="isDialogOpen(DialogTypes.CREATE)"
    v-model:open="dialogState"
    @createList="handleCreateList"
  />
</template>

<script setup lang="ts">
import SearchResultList from '@/modules/home/presenter/components/List/SearchResultList/SearchResultList.vue';
import SearchOptions from '@/modules/home/presenter/utils/constants/searchOptions';
import MyCarousel from '@/shared/components/Carousel/MyCarousel/MyCarousel.vue';
import CreateListDialog from '@/shared/components/Dialog/CreateListDialog.vue';
import MyDialog from '@/shared/components/Dialog/MyDialog.vue';
import { DialogTypes, useDialog } from '@/shared/composables/useDialog';
import { useFavorites } from '@/shared/composables/useFavorite';
import { useLists } from '@/shared/composables/useLists';
import { useMovies } from '@/shared/composables/useMovies';
import { Genre } from '@/shared/interfaces/Genre';
import { Movie } from '@/shared/interfaces/Movie';
import { useListStore } from '@/shared/store/Lists';
import { useMoviesStore } from '@/shared/store/Movies';
import { computed, onMounted, ref } from 'vue';
import Footer from '../components/Footer/Footer.vue';
import FilterToolbar from '../components/Toolbar/FilterToolbar/FilterToolbar.vue';
import { useSearch } from '../composables/useSearch';
import { CAROUSEL_LIST } from '../utils/constants/carouselList';

const movieStore = useMoviesStore();
const listStore = useListStore();

const {
  isLoading,
  getAllData,
  getMoviesByGenreId,
  searchMovie,
  setFilteredMovies,
} = useMovies();

const { addToFavorite } = useFavorites();

const { addMovieToList, createList } = useLists();

const { toggleDialog, dialogState, isDialogOpen, closeDialog, openDialog } =
  useDialog();

const { inputValue } = useSearch();

const isLoadingQuery = ref<boolean>(false);
const selectedSearchOption = ref(SearchOptions.MOVIES);

const isPageDefaultState = computed(
  () => !filteredMovies.value || inputValue.value === ''
);

const carouselList = computed(() => {
  return CAROUSEL_LIST.map((item) => ({
    ...item,
    items: movieStore[item.method as keyof typeof movieStore],
  }));
});

const genres = computed(() => movieStore.getGenres);
const lists = computed(() => listStore.getLists);
const filteredMovies = computed(() => movieStore.getFilteredMovies);

const handleAddMovieToList = async (list: any) => {
  const updatedList = [...list.movies, movieStore.getSelectedMovie];
  await addMovieToList(list.id, updatedList);
};

const handleCreateList = async (list: any) => {
  await createList(list);
  toggleDialog(DialogTypes.CREATE);
};

const openCreateListDialog = () => {
  closeDialog(DialogTypes.ADD);
  openDialog(DialogTypes.CREATE);
};

const handleSelectedMovie = (movie: Movie) => {
  movieStore.setSelectedMovie(movie);
};

const handleFavorite = async (movie: Movie) => {
  await addToFavorite(movie);
};

const setMoviesByGenre = async (genre: Genre) => {
  const data = await getMoviesByGenreId(genre.id);
  setFilteredMovies(data);
};

const handleChangeCategory = (newCategory: number) => {
  selectedSearchOption.value = newCategory;
  if (filteredMovies.value) handleSearch();
};

const handleSearch = async () => {
  searchMovie(inputValue.value, selectedSearchOption.value);
};

onMounted(async () => {
  await getAllData();
});
</script>
