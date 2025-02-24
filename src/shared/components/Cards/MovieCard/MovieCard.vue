<template>
  <div
    @mouseenter="isCardHovered = true"
    @mouseleave="isCardHovered = false"
    class="md:w-40 md:h-60 w-60 hover:cursor-pointer rounded-md overflow-visible relative group transform transition-transform duration-300 group-hover:scale-105"
  >
    <img
      @click="handleRedirectDetails(movie.id)"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      alt="movie"
      class="w-full h-full rounded-md group-hover:opacity-50"
    />
    <Button 
      v-if="isCardHovered"
      class="drop-shadow-xl hover:cursor-pointer shadow-md hover:shadow-lg hover:scale-105 duration-300 flex items-center justify-center absolute left-1/2 bottom-2 transform -translate-x-1/2 bg-[#ebebeb] hover:bg-white rounded-full px-0 py-0 w-7 h-7 text-black z-10"
      @mouseenter="isPosterHovered = true"
      @mouseleave="isPosterHovered = false"
      @click="emit('favoriteItem', movie)"
    >
      <i
        class="fa-regular fa-heart text-gray-400 fa-sm transition-colors duration-300"
        v-if="!isPosterHovered"
      ></i>
      <i
        class="fa-solid fa-heart text-red-500 fa-sm transition-colors duration-300"
        v-else
      ></i>
    </Button>

    <DropdownMenu @addToList="handleClick">
      <Button
        class="absolute right-1 top-2 drop-shadow-xl hover:cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center bg-secondary rounded-full px-0 py-0 w-5 h-5"
      >
        <i class="fa-solid fa-ellipsis"></i>
      </Button>
    </DropdownMenu>
  </div>
</template>

<script setup lang="ts">
import { DialogTypes, useDialog } from '@/shared/composables/useDialog';
import { useMoviesStore } from '@/shared/store/Movies';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import DropdownMenu from '../../DropdownMenu/DropdownMenu.vue';
import Button from '../../ui/button/Button.vue';

const router = useRouter();
const movieStore = useMoviesStore();

interface Props {
  movie: any;
}

const props = defineProps<Props>();

const {toggleDialog} = useDialog();

const handleClick = () => {
  toggleDialog(DialogTypes.ADD);
  movieStore.setSelectedMovie(props.movie);
};

const isPosterHovered = ref(false);
const isCardHovered = ref(false);
const emit = defineEmits(['favoriteItem']);

const handleRedirectDetails = (itemId: string) => {
  router.push(`/movie/${itemId}`)
}
</script>

<style scoped></style>
