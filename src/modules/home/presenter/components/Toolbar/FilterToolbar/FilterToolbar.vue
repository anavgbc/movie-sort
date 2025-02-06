<template>
  <div class="flex w-full justify-between px-12 pb-4 items-center">
    <div class="w-1/2 flex gap-3 items-center">
      <div class="w-[60%]">
        <SearchField
          :isFilled="Boolean(filteredMovies)"
          placeholder="Pesquisar por..."
          v-model="searchValue"
          @searchValue="handleSearch"
          @onFocus="showChips = true"
          @clear="clearSearchField"
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
  <div v-if="showGenres" class="flex flex-wrap gap-3 px-16">
    <GenreChip v-for="genre in genreList" @click="handleSelectGenre(genre)" :isActive="genre.id === selectedGenre?.id">
      {{ genre.name }}
    </GenreChip>
  </div>
</template>

<script setup lang="ts">
import MyButton from '@/shared/components/Button/MyButton/MyButton.vue';
import GenreChip from '@/shared/components/Chip/GenreChip/GenreChip.vue';
import SearchField from '@/shared/components/Input/SearchField/SearchField.vue';
import { Genre } from '@/shared/interfaces/Genre';
import { inject, ref } from 'vue';
import SearchChip from '../../Chip/SearchChip/SearchChip.vue';

const showChips = ref<boolean>(false);
const showGenres = ref<boolean>(false);

const searchValue = defineModel({ type: String });
const selectedGenre = ref<Genre | null>(null);

const handleSelectGenre = (genre: Genre) => {
  selectedGenre.value = genre;
  emit('filterGenre', genre);
};

interface Props {
  filteredMovies: any;
  genreList: any[];
  searchOptions: any[];
  selectedOption: number;
}

const props = defineProps<Props>();

console.log(props.genreList)

const emit = defineEmits(['searchValue', 'onFocus', 'clear', 'searchOption', 'filterGenre']);

const handleSearch = async () => {
  if (searchValue.value === '' && searchValue.value.length < 2) {
    return;
  }
  emit('searchValue', searchValue.value);
};

const clearSearchField = inject('clearSearchField') as
  | ((...args: any[]) => any)
  | undefined;
</script>
