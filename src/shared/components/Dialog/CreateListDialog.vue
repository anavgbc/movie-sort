<template>
  <Dialog>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Criar lista</DialogTitle>
      </DialogHeader>
      <div class="flex flex-col gap-4 py-4 w-full h-[90%]">
        <Input
          placeholder="Nome da lista"
          variant="outline"
          label="Nome"
          v-model="listData.name"
        />
        <Input
          placeholder="Digite aqui"
          variant="outline"
          label="Descrição"
          v-model="listData.description"
        />
        <div class="flex flex-col gap-3">
          <p>Adicione filmes a sua lista</p>
          <div class="grid grid-cols-4 grid-rows-2 gap-2">
            <div
              class="border h-24 w-20 rounded-md hover:cursor-pointer opacity-80 hover:opacity-100"
              v-for="movie in movieList.slice(0, 8)"
              @click="listData.movies = [...listData.movies, movie]"
              :key="movie.id"
              :class="{
                'border-secondary border-2 opacity-100 shadow-md':
                  listData.movies.includes(movie),
              }"
            >
              <img
                :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
                alt="movie"
                class="h-full w-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button
          type="submit"
          class="bg-secondary text-white px-3"
          @click="handleSubmit"
        >
          Criar lista
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { reactive } from 'vue';
import Input from '../ui/input/Input.vue';

const listData = reactive({
  name: '',
  movies: [] as any[],
  description: '',
});

const emit = defineEmits(['createList']);

interface Props {
  movieList: any[];
}

defineProps<Props>();

const handleSubmit = () => {
  emit('createList', listData);
};
</script>
