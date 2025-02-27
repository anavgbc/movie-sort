<template>
  <div class="w-full h-full flex flex-col p-5 gap-4">
    <PageControl
      :title="currentList.name"
      btnIcon="fa-solid fa-shuffle"
      v-if="currentList"
      @click="sortMovieByList"
      @onSearch="handlefilter"
    >
    <MyButton v-if="!isEditMode" @click="setEditMode(false)">
        Adicionar filmes
      </MyButton>
      <MenuDropdown
        @onDelete="toggleDialogAlert"
        @onEdit="setEditMode(true)"
        v-if="!isEditMode"
      >
        <MyButton variant="ghost">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </MyButton>
      </MenuDropdown>
      <MyButton v-if="isEditMode" @click="setEditMode(false)">
        <i class="fa-solid fa-check"></i>
      </MyButton>
    </PageControl>
    <p class="text-sm text-gray-500 pb-3">
      Criado em: {{ formatDate(currentList.created_at) }}
    </p>

    <div class="w-full flex flex-wrap gap-4" v-if="currentList">
      <MovieCard
        v-for="movie in currentList.movies"
        :movie="movie"
        :key="movie.id"
        :is-show-options="false"
        :isEditable="isEditMode"
        @onDelete="toggleDialogAlert"
      />
    </div>
  </div>

  <MyAlertDialog
    v-model="alertDialogState"
    v-if="alertDialogState"
    :content="currentAlertDialogText"
    @onConfirm="handleDelete"
  />
</template>

<script setup lang="ts">
import MyButton from '@/shared/components/Button/MyButton/MyButton.vue';
import MovieCard from '@/shared/components/Cards/MovieCard/MovieCard.vue';
import MyAlertDialog from '@/shared/components/Dialog/MyAlertDialog.vue';
import { useDialog } from '@/shared/composables/useDialog';
import { useLists } from '@/shared/composables/useLists';
import { List } from '@/shared/interfaces/List';
import { useListStore } from '@/shared/store/Lists';
import { useMoviesStore } from '@/shared/store/Movies';
import { formatDate } from '@/shared/utils/helpers/date/dateFormat';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageControl from '../components/Card/PageControl/PageControl.vue';
import MenuDropdown from '../components/Menu/MenuDropdown/MenuDropdown.vue';
import { useEditMode } from '../composables/useEditMode';
import { alertDialog } from '../utils/constants/alertDialog';

const router = useRouter();

const listId = useRoute().params.id as string;

const listStore = useListStore();
const movieStore = useMoviesStore();

const { getList, deleteList, addMovieToList } = useLists();
const { isEditMode, setEditMode } = useEditMode();
const { alertDialogState, toggleDialogAlert } = useDialog();

const currentList = ref<List | null>(listStore.getSelectedList);

const currentAlertDialogText = computed(() =>
  isEditMode.value ? alertDialog.DELETE_MOVIE : alertDialog.DELETE_LIST
);

const handlefilter = (val: string) => {
  if (currentList.value) {
    const filteredMovies = listStore.getSelectedList.movies.filter((movie) =>
      movie.title.toLowerCase().includes(val.toLowerCase())
    );
    currentList.value.movies = filteredMovies ? filteredMovies : listStore.getSelectedList.movies;
  }
};

const getCurrentList = async () => {
  await getList(listId);
  currentList.value = listStore.getSelectedList;
};

const handleDeleteList = async () => {
  await deleteList(listId as string).then(() => {
    router.push('/lists');
    toggleDialogAlert();
  });
};

const handleDeleteMovie = async (movieId: number) => {
  if (currentList.value) {
    const removeMovieFromList = currentList.value.movies.filter(
      (movie) => movie.id !== movieId
    );
    await addMovieToList(listId, removeMovieFromList);
    getCurrentList();
  }
};

const handleDelete = () => {
const currentMovie = movieStore.getSelectedMovie;

  isEditMode.value && currentMovie?.id
    ? handleDeleteMovie(currentMovie.id)
    : handleDeleteList();
};

const sortMovieByList = () => {
  router.push('/sorter');
};

onMounted(() => {
  getCurrentList();
});
</script>
