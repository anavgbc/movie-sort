<!-- <template>
  <div class="flex flex-col gap-2 w-[92%] items-start justify-center">
    <p class="font-display font-semibold text-xl text-gray-200">Filmes populares</p>
    <MyCarousel :items="popularMovies" v-if="popularMovies?.length > 0 && !isLoading" @selectedItem="handleFavorite" />
    <div class="flex justify-between w-full" v-else-if="isLoading">
      <MySkeleton v-for="_ in 7" />
    </div>
  </div>
</template>

<script setup lang="ts">
import MyCarousel from '@/shared/components/Carousel/MyCarousel/MyCarousel.vue';
import MySkeleton from '@/shared/components/Skeleton/MySkeleton.vue';

interface Props {
  popularMovies: any[];
  isLoading: boolean;
  handleFavorite: (movie: any) => void;
};

defineProps<Props>();
</script> -->
