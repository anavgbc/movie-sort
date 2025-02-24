<template>
  <div class="flex w-full justify-between pb-4 items-center">
    <div class="w-1/2 flex gap-3 items-center">
      <div class="lg:w-[60%] w-[80%]">
        <SearchField
          placeholder="Pesquisar por..."
          @searchValue="(val) => handleSearch(val)"
          @onFocus="showChips = true"
          @clear="handleClearField"
        />
      </div>
      <SearchChip
        v-if="showChips"
        :label="option.label"
        :isActive="selectedOption === option.value"
        v-for="option in searchOptions"
        @click="emit('searchOption', option.value)"
        :key="option.value"
      />
    </div>
    <div class="flex gap-2 h-full">
      <MyButton class="p-0 h-full w-8 px-6" variant="outline">
        <i class="fa-solid fa-list" />
      </MyButton>
      <MyButton
        class="p-0 h-full w-8 px-6"
        :variant="!showGenres ? 'outline' : 'solid'"
        @click="showGenres = !showGenres"
      >
        <i class="fa-solid fa-chevron-down" />
      </MyButton>
    </div>
  </div>
  <div
    v-if="showGenres"
    class="flex gap-3 overflow-x-auto max-w-full w-full pb-4"
  >
    <GenreChip
      v-for="genre in genreList"
      @click="handleSelectGenre(genre)"
      :isActive="genre.id === selectedGenre?.id"
    >
      {{ genre.name }}
    </GenreChip>
  </div>
</template>

<script setup lang="ts">
import MyButton from '@/shared/components/Button/MyButton/MyButton.vue';
import GenreChip from '@/shared/components/Chip/GenreChip/GenreChip.vue';
import SearchField from '@/shared/components/Input/SearchField/SearchField.vue';
import { useMovies } from '@/shared/composables/useMovies';
import { Genre } from '@/shared/interfaces/Genre';
import { ref } from 'vue';
import { useSearch } from '../../../composables/useSearch';
import SearchChip from '../../Chip/SearchChip/SearchChip.vue';

interface Props {
  genreList: any[];
  searchOptions: any[];
  selectedOption: number;
}

defineProps<Props>();

const { clearSearchField, inputValue, isInputFilled } = useSearch();
const { clearFilteredMovies } = useMovies();

const emit = defineEmits([
  'searchValue',
  'onFocus',
  'clear',
  'searchOption',
  'filterGenre',
]);

const showChips = ref<boolean>(false);
const showGenres = ref<boolean>(false);

const selectedGenre = ref<Genre | null>(null);

const handleSelectGenre = (genre: Genre) => {
  selectedGenre.value = genre;
  emit('filterGenre', genre);
};

const handleSearch = async (val) => {
  console.log('chegou aqui? ', val)
  if (val === '' && val.length < 2) {
    return;
  }
  emit('searchValue', val);
};

const handleClearField = () => {
  clearSearchField();
  clearFilteredMovies();
};
</script>
