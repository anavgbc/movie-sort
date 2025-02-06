<template>
  <div
    @mouseenter="isCardHovered = true"
    @mouseleave="isCardHovered = false"
    class="w-40 h-60 hover:cursor-pointer rounded-md overflow-visible relative group transform transition-transform duration-300 group-hover:scale-105"
  >
    <img
      @click="handleRedirectDetails(movie.id)"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      alt="movie"
      class="w-full h-full rounded-md group-hover:opacity-50"
    />
    <!-- <p
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    >
      {{ movie.title }}
    </p> -->

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
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import DropdownMenu from '../../DropdownMenu/DropdownMenu.vue';
import Button from '../../ui/button/Button.vue';

const router = useRouter();

interface Props {
  movie: any;
}

const props = defineProps<Props>();

const toggleDialog = inject<() => void>('toggleDialog');
const handleSelectedMovie = inject<(movie: any) => void>('handleSelectedMovie');

const handleClick = () => {
  toggleDialog!();
  handleSelectedMovie!(props.movie);
};

const isPosterHovered = ref(false);
const isCardHovered = ref(false);
const emit = defineEmits(['favoriteItem']);

const handleRedirectDetails = (itemId: string) => {
  router.push(`/movie/${itemId}`)
}
</script>

<style scoped></style>
