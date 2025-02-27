<template>
  <div class="flex w-full justify-between pb-4 items-start">
    <div class="w-full sm:w-1/2 flex flex-col sm:flex-row gap-3 items-start">
      <div class="lg:w-[60%] sm:w-[80%] w-full pr-2">
        <SearchField
          placeholder="Pesquisar por..."
          @searchValue="(val) => handleSearch(val)"
          @onFocus="toggleShowChips"
          @clear="handleClearField"
          v-model="searchValue"
        />
      </div>
      <div class="flex justify-start w-full sm:w-auto gap-2 pt-3">
        <SearchChip
          v-if="showChips"
          :label="option.label"
          :isActive="selectedOption === option.value"
          v-for="option in searchOptions"
          @click="emit('searchOption', option.value)"
          :key="option.value"
        />
      </div>
    </div>
    <div class="gap-2 h-12 sm:h-full flex">
      <!-- <MyButton class="p-0 h-full w-8 px-6 hidden" variant="outline">
        <i class="fa-solid fa-list" />
      </MyButton> -->
      <MyButton
        class="p-0 h-full w-3 px-6"
        variant="ghost"
        @click="showGenres = !showGenres"
      >
        <i v-if="!showGenres" class="fa-solid fa-chevron-down" />
        <i v-else class="fa-solid fa-chevron-up" />
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
import { Genre } from '@/shared/interfaces/Genre';
import { ref } from 'vue';
import SearchChip from '../../Chip/SearchChip/SearchChip.vue';

interface Props {
  genreList: any[];
  searchOptions: any[];
  selectedOption: number;
}

defineProps<Props>();

const searchValue = defineModel({ type: String });


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

const toggleShowChips = () => {
  showChips.value = !showChips.value;
};

const handleSelectGenre = (genre: Genre) => {
  selectedGenre.value = genre;
  emit('filterGenre', genre);
};

const handleSearch = async (val: string) => {
  if (val === '' && val.length < 2) {
    return;
  }
  emit('searchValue', val);
};

const handleClearField = () => {
  emit('clear');
  searchValue.value = '';
  showChips.value = false;
};
</script>
